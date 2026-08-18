# codingplan.org SEO 基线报告

> 调研时间：2026-08-18。证据来源：本仓库源码（codingplan-react）+ 线上 curl 实测（响应头 / robots.txt / sitemap.xml / 首页与详情页原始 HTML）。

## 1. 技术栈与渲染策略

| 项 | 现状 | 证据 |
|---|---|---|
| 框架 | Next.js 16.2 (App Router) + React 19 + TypeScript 7 + Tailwind CSS 4 | package.json |
| 渲染 | **纯 SSG**：`generateStaticParams` + `dynamicParams = false`，构建期静态生成 | app/(zh)/plans/[slug]/page.tsx:18-22 |
| 部署 | Vercel（`x-vercel-cache: HIT`、`x-nextjs-prerender: 1`），前置 Cloudflare | curl -sI 响应头 |
| 客户端 JS | 极少：仅 ThemeToggle / Analytics / ContactPopover / AntiPiracy 客户端岛 | src/components/ |
| 正文渲染 | HTML 直出完整正文（curl 抓取即可见全部表格与文案），无 CSR 依赖 | /tmp 抓取实测 |

**结论：渲染策略没有短板。** 与竞品（coding-plan.org 纯静态 14.8KB、dxnt 纯 CSR 空壳）相比，我们属于第一梯队。

## 2. 路由结构与页面清单（共 19 个 URL）

```text
/                          中文首页（9 平台横评）
/en                        英文首页（6 平台横评）
/plans/zhipu               智谱 GLM 详解
/plans/minimax             MiniMax Token Plan 详解
/plans/kimi                Kimi Code Plan 详解
/plans/volcengine          火山引擎方舟详解
/plans/aliyun              阿里云百炼详解
/plans/xiaomi              小米 MiMo 详解
/plans/baiyunzhisuan       白云智算（按量 API）
/plans/opencode-go         OpenCode Go
/plans/tencentcloud        腾讯云 [已下线归档]
/en/plans/claude           Claude（英文 6 页）
/en/plans/glm              GLM Coding Plan（Z.ai 国际版）
/en/plans/minimax          MiniMax（英文）
/en/plans/kimi             Kimi（英文）
/en/plans/qwen             Qwen（英文）
/en/plans/opencode-go      OpenCode Go（英文）
/deepseek-hermes           DeepSeek Hermes 框架专题
/deepseek-harness-plgins   DSH 插件合集专题
```

- 页面模板：首页 1 套（HomePage）+ 详情页 1 套（PlanPage）+ 专题页 2 套（DshHermes 系列）。
- **没有**：对比页（A vs B）、工具页（claude-code/codex/opencode）、教程页、问题型页面、邀请码/优惠页、模型页、博客/资讯、changelog。
- 两个 deepseek 专题页与站点主题（Coding Plan 对比）关联弱，属于孤立内容岛（仅靠 footer 链接）。

## 3. Metadata 生成方式

`src/data/metadata.ts` 的 `buildMetadata(seo)` 统一投影：

- ✅ title / description（逐页手写，质量高，含价格与关键词）
- ✅ canonical（逐页显式声明）
- ✅ hreflang：**仅首页**有 zh-CN/en/x-default 互指；**全部 /plans 与 /en/plans 详情页无 hreflang**（curl 实测 /plans/zhipu 无 hreflang 标签）
- ⚠️ OpenGraph：有 title/description/type/url/siteName/locale，**无 og:image**
- ⚠️ Twitter Card：`summary`（无图小卡），无 twitter:image
- ✅ robots: index/follow；图标为内联 SVG emoji

## 4. JSON-LD / 结构化数据（线上实测）

| 页面 | 实测 schema |
|---|---|
| 首页 / | WebPage（含 Organization publisher + ItemList 9 项）+ FAQPage（10 问） |
| /plans/zhipu | Product（3 档 Offer 带 price/availability）+ BreadcrumbList（2 级）+ FAQPage（5 问） |
| /en、其余详情页 | 同上模式 |

**缺失**：
- 无独立 WebSite schema（含潜在 Sitelinks searchbox 资格——但站内无搜索功能，暂不做 SearchAction）
- 无 Article/TechArticle schema（详情页 ogType 是 article 却没有 Article schema）
- 首页 WebPage 的 `dateModified` 硬编码为 `2026-08-03`（src/data/seo.ts:41），与实际数据更新（2026-08-17）脱节
- Product 缺 aggregateRating/lowPrice-highPrice 汇总（无评分数据，不造假，可不加；但可用 AggregateOffer 表达多档价格区间）

## 5. sitemap / robots / 索引推送

- `app/sitemap.ts`：19 个 URL，**lastModified 硬编码 `2026-08-14`**（与数据实际更新日期脱节，每次发版需手改）；hreflang alternate 仅首页两条；priority 手工分级（tencentcloud 0.4 / baiyunzhisuan 0.7 / 其余 0.8）。
- `app/robots.ts`：`Allow: /` + sitemap 指引，干净。
- 未显式声明 AI 爬虫（GPTBot/ClaudeBot/PerplexityBot 等）策略（默认放行，但无显式欢迎信号，也无 llms.txt 与 robots 的联动更新机制）。
- ✅ 有 IndexNow 提交脚本（scripts/indexnow-submit.ts）。
- ✅ public/llms.txt 内容质量高，但需随页面新增手动维护。
- ✅ 旧 URL（/index.html、/plans/*.html）301→canonical（实测 308 permanent，等效）。
- ✅ 404 正确返回 404 状态码（实测 /plans/nonexist）。

## 6. H 标签与内容结构

- 首页：H1 = 「AI Coding Plan 全面对比」；每个平台卡 H2（zh）/H3（en），结构语义正确。
- 详情页：H1 = 「智谱 GLM + Coding Plan」式双行标题；区块 H2、卡片 H3。
- 每页均含 FAQ 区块（与 FAQPage schema 一一对应）✅。
- **页面无可见"更新于"日期**——所有竞品头部玩家（club/coding-plan.org/mcppla/creditsplan/dxnt）都有显式新鲜度信号。

## 7. 内部链接

- 首页 → 各详情页（快速对比表格 + 平台卡片双入口）✅
- 详情页 → 首页（顶部返回）+ footer 全部兄弟套餐链接 ✅
- **缺失**：详情页正文内无语境化相关内链（如「与 Kimi 对比」「Claude Code 配置教程」）；无面包屑 UI（只有 JSON-LD）；专题页孤岛化；首页无任何指向教程/工具/对比内容的入口（因为不存在）。

## 8. 性能与 Core Web Vitals

- 首页 HTML 237KB（未压缩）；详情页 88KB；静态 HTML + 极少 JS，TBT/CLS 预期优秀。
- ⚠️ **Google Fonts 外链**（fonts.googleapis.com CSS，3 个字体族），对国内用户是跨境阻塞请求，拖慢 FCP/LCP；未用 next/font 自托管。
- 图片仅 kkcode.app icon（96×96，lazy）✅；无大图资源。
- 实际 PSI/CWV 分数：**无法验证**（本报告未跑 Lighthouse，推断风险低）。

## 9. SERP 现状（mmx search 单一数据源，15 个查询抽样）

**codingplan.org 在全部 15 个测试查询的 Top 10 中均未出现**，包括：

- coding plan / coding plan 对比 / 推荐 / 价格 / 哪个好
- AI coding plan / AI 编程套餐
- GLM / Kimi / MiniMax / 火山 / 阿里云 coding plan
- coding plan comparison（英）/ GLM coding plan price / codingplan（品牌词）

品牌词「codingplan」Top 8 也无本站（被 runoob/CSDN/腾讯新闻占据）——说明站点整体权重与索引信任度尚在冷启动期。

> ⚠️ 数据源声明：以上来自 mmx search 聚合搜索（单一数据源，引擎归属不确定），非 Google/Bing/百度官方 API；绝对排名需在真实引擎中二次验证。但「多个高频词全部缺席 Top 10」的结论方向可靠。

## 10. 基线结论：优势与短板

### 优势（需保持）
1. 纯 SSG + 直出正文 + 极小 JS，技术 SEO 底子是竞品第一梯队
2. 逐页手写的高质量 title/description（含价格钩子）
3. Product+Offer / FAQPage / Breadcrumb schema 已有骨架
4. 中英双语站 + canonical/hreflang（首页）/301/404/IndexNow/llms.txt 基础设施齐备
5. 类型化数据源（src/data）使规模化扩展新页面的边际成本低

### 短板（按严重度排序）
1. **可索引面太小**：19 页 vs coding-plan.org 19 页（但意图分层）vs club 292 页 vs creditsplan 153 页——几乎所有长尾词没有承接页
2. **关键词全堆首页**：对比/推荐/哪个好/价格全靠首页一张表承接，无「一词一页」的意图分层（coding-plan.org 正靠此排名）
3. **无教程内容**：SERP 中「Claude Code 配置 XX Coding Plan」类教程词量大且被 CSDN/博客园霸占，我们零承接
4. **无新鲜度信号**：页面不可见更新日期、dateModified/lastmod 硬编码脱节
5. **无 og:image**、详情页无 hreflang、无 WebSite schema
6. **Google Fonts 外链**影响国内 FCP/LCP
7. 品牌词不在 Top 10，域名年轻、外链与权威度低（外链数据：无法验证）
