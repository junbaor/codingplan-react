# codingplan.org SEO 改进方案

> 基线：00 报告；竞品证据：01~08 报告；SERP 抽样：08 报告 §2。
> 原则：只改可验证的问题；内容页宁少勿薄；所有日期信号与真实数据更新绑定。

---

## 一、P0：立即修改（1~2 天，明显影响 SEO）

### P0-1 新鲜度信号同源化（dateModified / lastmod / 页面可见日期）

```text
问题：首页 JSON-LD dateModified 硬编码 2026-08-03，sitemap lastmod 硬编码 2026-08-14，页面无可见更新日期；实际数据 2026-08-17 已更新
证据：src/data/seo.ts:41、app/sitemap.ts:12；竞品 6/7 有三重 freshness（08 报告 §3.2）
竞品案例：dxnt 每日 dateModified + 页面「每月更新」；club 页面标注「更新于 2026-08-09」
修改方案：新建 src/data/site-version.ts 导出 DATA_UPDATED_AT 常量（发版改数据时同 commit 更新）；buildHomeJsonLd/buildPlanJsonLd、sitemap lastmod、首页/详情页页脚「数据更新于 {DATA_UPDATED_AT}」全部引用该常量
涉及页面：全站 19 页
涉及源码文件：src/data/site-version.ts(新)、src/data/seo.ts、app/sitemap.ts、src/components/HomePage.tsx、src/components/PlanPage.tsx、src/data/plans.ts、src/data/plans-en.ts
实现方式：常量替换硬编码；页脚渲染可见时间戳（<time dateTime> 标签）
目标关键词：全部时效性词（XX coding plan 价格/更新/上线）
预期 SEO 收益：时效性查询的排名资格 + CTR（SERP 日期展示）；消除「数据陈旧」信号
开发成本：0.5 天
优先级：P0
```

### P0-2 og:image + twitter 大卡

```text
问题：全站无 og:image，twitter card 为 summary 小卡
证据：src/data/metadata.ts:38-51；curl 实测首页无 og:image 标签
竞品案例：多数竞品也缺（club/dxnt 无 og）——反超机会而非追赶
修改方案：public/og/default.png 生成 1200×630 品牌图（站名 + 「AI Coding Plan 对比 2026」+ 9 平台 logo 色块）；buildMetadata 增加 openGraph.images 与 twitter.card='summary_large_image'；详情页先用默认图
涉及页面：全站
涉及源码文件：src/data/metadata.ts、public/og/default.png(新)
实现方式：buildMetadata 固定注入 images: ['/og/default.png']，metadataBase 已配置自动转绝对 URL
目标关键词：—（CTR 与社交分享）
预期 SEO 收益：SERP/社交分享卡片带图，品牌词与直访 CTR 提升；间接信号
开发成本：0.5 天（图制作 + 代码）
优先级：P0
```

### P0-3 补 WebSite + Organization 独立 schema

```text
问题：无 WebSite/Organization 顶层 schema，站点实体定义不完整
证据：src/data/seo.ts:9-13 仅有内嵌 Organization；无 SearchAction（站内无搜索，不造假）
竞品案例：mcppla 首页 4 组 JSON-LD 含 WebSite+SearchAction
修改方案：app/(zh)/layout.tsx 与 (en)/layout.tsx 注入 WebSite（name/url/inLanguage）+ Organization（name/url/logo）；详情页补 Article/TechArticle schema（ogType 已是 article）关联现有 Product
涉及页面：全站
涉及源码文件：src/data/seo.ts（新增 buildSiteJsonLd/buildArticleJsonLd）、两个 layout.tsx、src/data/metadata.ts
实现方式：layout 级渲染一次站点级 schema；plan 页 seo.jsonLd 数组追加 Article（datePublished=上线日、dateModified=DATA_UPDATED_AT）
目标关键词：品牌词 codingplan / codingplan.org（争取品牌 SERP 富展示）
预期 SEO 收益：品牌词与站点实体识别；知识面板资格（长期）
开发成本：0.5 天
优先级：P0
```

### P0-4 详情页 hreflang 补齐（跨语言等效页映射）

```text
问题：/plans/* 与 /en/plans/* 无 hreflang 互指；zh zhipu↔en glm、zh aliyun↔en qwen、minimax/kimi/opencode-go 同名可互指却未声明
证据：curl 实测 /plans/zhipu 无 hreflang；src/data/plans.ts seo 无 alternates 字段
竞品案例：club 在 sitemap 做三语互指；我们首页已有正确示范
修改方案：建立 zh↔en slug 映射表（zhipu↔glm、aliyun↔qwen、minimax↔minimax、kimi↔kimi、opencode-go↔opencode-go；无等效的页面加 x-default 指向 /），plans/plans-en 的 seo.alternates 补数据，sitemap 同步 alternate
涉及页面：15 个详情页
涉及源码文件：src/data/plans.ts、src/data/plans-en.ts、app/sitemap.ts
实现方式：数据驱动，buildMetadata 已支持 alternates
目标关键词：GLM coding plan（中英）、MiniMax/Kimi coding plan（中英）
预期 SEO 收益：中英页面权重互传、去重声明明确，英文页在 google.com 的收录与排名
开发成本：0.5 天
优先级：P0
```

### P0-5 可见面包屑 + 详情页语境化内链

```text
问题：面包屑只存在于 JSON-LD 无 UI；详情页正文无相关内容链接（仅 footer 兄弟链接）；deepseek 两个专题页孤岛
证据：src/components/PlanPage.tsx:38 仅有「返回全部对比」；Breadcrumbs schema 已有 2 级
竞品案例：club/coding-plan.org 导航层级清晰
修改方案：PlanPage 顶部加可见面包屑（首页 / 套餐详情 / 当前平台），与 BreadcrumbList schema 层级一致；页尾 footer 前加「相关对比」模块（链接到 /compare/* 与 /guides/*，上线 P1 页面后填充）；专题页加入导航
涉及页面：15 个详情页
涉及源码文件：src/components/PlanPage.tsx
实现方式：静态 JSX + 语义 nav[aria-label=breadcrumb]；相关链接模块数据驱动（relatedLinks 字段，P1 页面上线前先指向兄弟详情页）
目标关键词：—（内链权重与抓取深度）
预期 SEO 收益：权重传递路径缩短、新页面更快收录
开发成本：0.5 天
优先级：P0
```

### P0-6 robots.txt 显式放行 AI 爬虫 + llms.txt 自动化

```text
问题：robots 未声明 AI 爬虫策略；llms.txt 需手工同步新页面
证据：app/robots.ts；club 屏蔽 GPTBot/ClaudeBot 是反面教材，coding-plan.org 显式放行
修改方案：robots.ts 增加对 GPTBot/ClaudeBot/PerplexityBot/Bytespider/Google-Extended 的显式 Allow；llms.txt 的 Pages 列表改为由构建脚本从 planSlugs/enPlanSlugs+新路由生成（或至少在 AGENTS.md 数据更新 checklist 中加入 llms.txt 项）
涉及源码文件：app/robots.ts、scripts/maintain-llms-txt.ts(新，可选)
开发成本：0.5 天（简单版）/ 1 天（脚本版）
预期 SEO 收益：AI 搜索引用渠道（ChatGPT/Claude/Perplexity 问答引用流量，竞品 club 自断此路）
优先级：P0
```

---

## 二、P1：近期优化（1~2 周）

### P1-1 /deals 邀请码与优惠页（意图分页·最高购买意图）

- **证据**：SERP 中 GitHub 优惠码仓库（tmyiezsr/GLM-Coding）、博客园邀请码帖稳定排名；coding-plan.org 邀请码页 sitemap priority 0.9；本站已有 affiliate 参数体系。
- **方案**：聚合各平台当前活动价/邀请返利/首购折扣（数据来自现有 plans.ts 的优惠字段，新增 deals 数据模块），含 FAQPage schema + ItemList；首页导航与各详情页内链进入。
- **文件**：app/(zh)/deals/page.tsx、src/data/deals.ts、sitemap.ts。
- **目标词**：coding plan 邀请码 / GLM coding plan 邀请码 / coding plan 优惠 / 9.9 元 coding plan。
- **收益**：高转化词直接承接；**成本 1~2 天**。

### P1-2 /changelog 变更记录页

- **证据**：coding-plan.org 变更记录页承接时效词；SERP 大量「XX 涨价/上新/回归」资讯型查询。
- **方案**：倒序列表页（日期 + 平台 + 变更摘要 + 跳转详情页），Article/ItemList schema，首页「最近变更」模块同步展示最近 3 条。
- **文件**：app/(zh)/changelog/page.tsx、src/data/changelog.ts。
- **目标词**：GLM coding plan 涨价 / Kimi K3 上线 / coding plan 变更。
- **成本 1 天**。

### P1-3 /compare/[a-vs-b] 对比页模板 + 首批 6 组

- **证据**：英文「coding plan comparison」Top1 是 SourceForge 的 GLM vs OpenCode；creditsplan 只做 5 个对比页留有空间；「glm vs kimi」类词商业调研意图明确。
- **方案**：从 plans 数据程序化生成双栏对比（价格表/额度口径/模型/工具支持/适用人群/结论），每页 ≥1500 字差异化的「怎么选」结论 + FAQPage schema + BreadcrumbList；zh 首批：glm-vs-kimi、glm-vs-minimax、kimi-vs-minimax、glm-vs-volcengine、glm-vs-claude（用 en 数据的 claude 对比国产）、minimax-vs-kimi；en 首批：claude-vs-glm、glm-vs-minimax。
- **文件**：app/(zh)/compare/[slug]/page.tsx、src/data/compares.ts、sitemap.ts。
- **目标词**：glm vs kimi / kimi 和 minimax 哪个好 / glm 对比 minimax。
- **成本 2~3 天**（模板 1 天 + 数据 6 组）。

### P1-4 /guides/[slug] 教程页（最大流量池）

- **证据**：SERP 中「Claude Code 配置 GLM/Kimi Coding Plan」「ccswitch 配置火山引擎」类教程反复进 Top 10（08 报告 §2.3）；runoob 的「OpenCode Coding Plan 菜鸟教程」排在泛词「coding plan」#4。
- **方案**：教程模板（前置条件/配置步骤/验证/常见报错/额度口径提示），与平台详情页互链。首批 6 篇：claude-code-with-glm、claude-code-with-kimi、claude-code-with-volcengine、codex-with-glm、opencode-with-any-plan（含 OpenCode Go）、claude-code-with-minimax。HowTo/Article schema。
- **文件**：app/(zh)/guides/[slug]/page.tsx、src/data/guides/*.md 或 ts。
- **目标词**：claude code 配置 glm / claude code coding plan / kimi claude code / 火山引擎 claude code。
- **成本 3~5 天**（含写作）。

### P1-5 /questions/[slug] 问题型页面

- **证据**：coding-plan.org 三层 FAQPage（含「什么是 Coding Plan」「5 小时限额是什么」）+ SERP 常见问题词。
- **方案**：首批 4 篇：what-is-coding-plan（是什么）、cheapest-coding-plan（哪家最便宜）、best-coding-plan（哪个好/怎么选）、coding-plan-vs-api（对比 Token API——CSDN 同题材文在「coding plan 对比」#3）。每篇 ≥1500 字 + FAQPage schema + 内链全部详情页。
- **文件**：app/(zh)/questions/[slug]/page.tsx、src/data/questions/。
- **成本 2~3 天**。

### P1-6 /tools/[slug] 工具页

- **证据**：club 22 个工具页是其矩阵支柱；「Claude Code 用哪个 coding plan」类问题词存在。
- **方案**：每工具一页（是什么/价格/支持哪些套餐/怎么选套餐），首批：claude-code、codex、opencode、cursor、cline、roo-code。与 guides、plans 互链。
- **文件**：app/(zh)/tools/[slug]/page.tsx、src/data/tools.ts。
- **成本 2~3 天**。

### P1-7 性能：next/font 自托管字体

- **证据**：layout.tsx:23-25 外链 Google Fonts；国内用户 FCP 受阻。
- **方案**：改 next/font/google（构建期自动自托管 + unicode-range 子集化），或 fontsource。视觉不变。
- **文件**：app/(zh)/layout.tsx、app/(en)/layout.tsx、src/styles/global.css。
- **成本 0.5~1 天**。注意构建环境需可访问 Google Fonts（Vercel 可）。

### P1-8 详情页动态 og:image（可选）

- next/og ImageResponse 按套餐生成 1200×630（平台名 + 起步价 + 更新日期）。成本 1 天，富分享效果，优先级低于内容页。

---

## 三、P2：长期内容建设（1~3 个月）

### P2-1 /models/[slug] 模型评测页（程序化矩阵核心）

- **证据**：club 用 55 模型页 ×3 语种构成 292 页矩阵的主体；「GLM-5.2 coding plan」「Kimi K3 怎么样」长尾词面广。
- **方案**：从现有 plans 数据的 models 字段扩展为独立模型页（能力/跑分/上下文/哪个套餐可用/价格推算）。首批 8 个：glm-5.2、kimi-k3、minimax-m3、doubao-seed-2.1-turbo、deepseek-v4、qwen3.5-plus、kimi-k2.7、glm-5-turbo。**每页必须有 ≥1200 字独立评测内容**，避免 club 式薄页。
- **目标词**：GLM-5.2 怎么样 / K3 coding plan / minimax m3 价格。

### P2-2 /leaderboard 模型榜 / 性价比榜（SSG）

- **证据**：mcppla 单页 22 平台榜 + ItemList schema 吃头部词；coding-plan.org 的 /leaderboard 是 JS 渲染半成品（正文 273 字符）——正面反超机会。
- **方案**：SSG 全量表格（平台/模型/起步价/单位额度成本/更新日期）+ ItemList schema；description 按 creditsplan 打法嵌结论（「当前最低入门 ¥9.9/月」）。

### P2-3 平台覆盖扩展

- **证据**：SERP 横评文章覆盖 13 家（CSDN 头条）而我们有详情页的仅 9 家；无问芯穹/百度千帆/优云智算/摩尔线程/CodeBuddy 反复出现。
- **方案**：按流量热度逐月新增详情页：baichuan-qianfan（百度千帆）、infini（无问芯穹）、unicloud（优云智算）、codebuddy（腾讯）、mthreads（摩尔线程）。每页保持现有详情页深度。

### P2-4 英文站扩展

- **证据**：coding-plan.org/creditsplan 等无英文内容；SourceForge 单页排英文 Top1 竞争弱；我们已有 /en 6 详情页。
- **方案**：/en/compare、/en/guides/claude-code-with-glm、/en/deals（Black Friday 等节令词）、/en/questions 同步建设中文化模板（成本≈中文的 50%，模板复用）。

### P2-5 站外与品牌（持续）

- 开源数据仓库（GitHub codingplan-data，MIT，含 llms.txt 数据）吸引外链——对标 SERP 中 GitHub 仓库的排名与引用。
- 新模型发布 24~48 小时内出 changelog + 详情页更新（时效战；iamle 停更 4 个月即掉队的反面教材）。
- 知乎/掘金/V2EX 发布深度对比长文引流（引用本站数据，获真实外链）。外链效果：无法验证，只能定性执行。

---

## 四、第十一阶段结论：是否发展为垂直内容站

**结论：值得做，但按「意图分层优先、程序化矩阵靠后、每页做厚」的顺序做。**

支持证据：
1. **唯一进 SERP Top 10 的独立竞站 coding-plan.org 恰是意图分页的代表**（19 页 vs 我们 19 页，页面数相同却排名领先——差距在页型而非数量）。
2. SERP 被 UGC 单篇文章霸占（CSDN/博客园），说明词门槛低，专题页可竞争。
3. club（292 页）/creditsplan（153 页）证明矩阵规模有效但内容薄；长期应避免其薄页风险，以「厚页 × 意图矩阵」差异化。

约束（不照搬的理由）：
- 单页站 mcppla/iamle 证明头部词可靠 on-page 吃下——我们的首页大表已具备，不需要推倒重来。
- Google scaled-content 政策风险：批量生成 <1000 字页面会拖累整站质量评分。**新页面准入线：每页 ≥1200~1500 字独立内容 + 至少 3 条语境化内链。**
- creditsplan 在国内长尾有 ICP+CDN 结构性优势——不正面拼国产档位页，侧翼打教程/英文/对比/模型页。

---

## 五、第十二阶段：最终信息架构与 3 个月页面清单

### 最终信息架构（zh，en 同构 +/en 前缀）

```text
/                                Pillar：AI Coding Plan 对比（现有）
/deals                           邀请码/优惠聚合（P1）
/changelog                       变更记录/资讯（P1）
/leaderboard                     模型榜/性价比榜（P2）
/plans/[slug]                    平台详情（现有 9 → P2 扩至 14）
/compare/[slug]                  A vs B 对比（P1）
/guides/[slug]                   配置教程（P1）
/questions/[slug]                问题型长文（P1）
/tools/[slug]                    工具页（P1）
/models/[slug]                   模型评测（P2）
/deepseek-hermes                    现有专题（保留，纳入导航；插件合集页已删除，harness-plugins 新旧 URL 301 至 deepseek-plugin.org/plugins）
```

内链规则：首页 ↔ 全部 hub 页；详情页 ↔ 相关 compare/guides/models（语境化链接）；changelog → 详情页（时效入口）；面包屑全站覆盖；hub 页互链形成 topic cluster（以 /plans/[slug] 为 pillar，compare/guides/models/tools 为 cluster）。

### 未来 3 个月新增页面清单（按 SEO 价值排序）

| # | URL | 页面 | Target Keyword | Intent | 模板 | 月 |
|---|---|---|---|---|---|---|
| 1 | /deals | 邀请码与优惠 | coding plan 邀请码/优惠 | Transactional | deals | 1 |
| 2 | /guides/claude-code-with-glm | Claude Code 配置 GLM | claude code 配置 glm | Informational | guide | 1 |
| 3 | /guides/claude-code-with-kimi | Claude Code 配置 Kimi | kimi claude code | Info | guide | 1 |
| 4 | /questions/what-is-coding-plan | Coding Plan 是什么 | coding plan 是什么 | Info | question | 1 |
| 5 | /compare/glm-vs-kimi | GLM vs Kimi | glm vs kimi / glm kimi 哪个好 | Commercial | compare | 1 |
| 6 | /changelog | 变更记录 | XX coding plan 涨价/上新 | Info(时效) | changelog | 1 |
| 7 | /questions/cheapest-coding-plan | 哪家最便宜 | coding plan 哪家最便宜/便宜 | Commercial | question | 1 |
| 8 | /guides/claude-code-with-volcengine | Claude Code 配置方舟 | ccswitch 火山引擎 | Info | guide | 1 |
| 9 | /compare/glm-vs-minimax | GLM vs MiniMax | glm minimax 对比 | Comm | compare | 2 |
| 10 | /questions/best-coding-plan | 哪个好/怎么选 | coding plan 哪个好/推荐 | Comm | question | 2 |
| 11 | /tools/claude-code | Claude Code 工具页 | claude code 价格/订阅 | Comm/Nav | tool | 2 |
| 12 | /tools/codex | Codex 工具页 | codex coding plan | Comm | tool | 2 |
| 13 | /tools/opencode | OpenCode 工具页 | opencode coding plan | Comm | tool | 2 |
| 14 | /compare/kimi-vs-minimax | Kimi vs MiniMax | kimi minimax 哪个好 | Comm | compare | 2 |
| 15 | /guides/codex-with-glm | Codex 配置 GLM | codex glm | Info | guide | 2 |
| 16 | /guides/opencode-with-any-plan | OpenCode 接入套餐 | opencode 配置/接入 | Info | guide | 2 |
| 17 | /models/glm-5.2 | GLM-5.2 评测 | glm-5.2 怎么样 | Info | model | 2 |
| 18 | /models/kimi-k3 | K3 评测 | kimi k3 coding plan | Info | model | 2 |
| 19 | /en/compare/claude-vs-glm | Claude vs GLM(英) | claude vs glm coding | Comm(EN) | compare | 2 |
| 20 | /leaderboard | 模型榜 | coding plan 模型榜/性价比 | Comm | leaderboard | 3 |
| 21 | /models/minimax-m3 | M3 评测 | minimax m3 | Info | model | 3 |
| 22 | /models/doubao-seed-2.1-turbo | 豆包评测 | doubao coding plan | Info | model | 3 |
| 23 | /plans/qianfan | 百度千帆详情 | 百度千帆 coding plan | Comm | plan(现有) | 3 |
| 24 | /plans/infini | 无问芯穹详情 | 无问芯穹 coding plan | Comm | plan | 3 |
| 25 | /en/guides/claude-code-with-glm | 英文教程 | claude code glm setup | Info(EN) | guide | 3 |
| 26 | /questions/coding-plan-vs-api | Plan vs API | coding plan token api 区别 | Info | question | 3 |
| 27 | /compare/glm-vs-volcengine | GLM vs 方舟 | glm 火山方舟 | Comm | compare | 3 |
| 28 | /en/deals | 英文优惠页 | glm coding plan discount | Trans(EN) | deals | 3 |
| 29 | /tools/cursor | Cursor 工具页 | cursor coding plan | Comm | tool | 3 |
| 30 | /plans/unicloud | 优云智算详情 | 优云智算 coding plan | Comm | plan | 3 |

3 个月后总页面量：19 → 约 65（zh+en），全部复用 5 套新模板。

---

## 六、第十三阶段：可执行开发任务（按依赖排序）

> 通用验收标准（适用于所有新页面任务）：tsc --noEmit 通过；npm run build 通过且页面静态生成；sitemap/llms.txt 同步收录；canonical/hreflang 正确；含 FAQPage + BreadcrumbList schema；正文 ≥1200 字；≥3 条语境化内链；页脚带数据更新日期。

| Task | 目标 | 修改文件 | 实现方案（摘要） | 验收标准（专属） | SEO 目的 | 依赖 |
|---|---|---|---|---|---|---|
| TASK-001 | 数据版本常量与三重 freshness | src/data/site-version.ts(新)、src/data/seo.ts、app/sitemap.ts、HomePage/PlanPage | DATA_UPDATED_AT 常量贯通 JSON-LD/lastmod/页脚 | schema dateModified = 页脚日期 = sitemap lastmod | 时效性信号 | — |
| TASK-002 | og:image + 大卡 | src/data/metadata.ts、public/og/default.png(新) | buildMetadata 注入 images + summary_large_image | 全站页面 head 含 og:image/twitter:image | CTR/分享 | — |
| TASK-003 | WebSite/Organization/Article schema | src/data/seo.ts、两个 layout.tsx、plans 数据 | buildSiteJsonLd + 详情页追加 Article | 结构化数据测试通过，无重复声明 | 品牌实体 | TASK-001 |
| TASK-004 | 详情页 hreflang 映射 | plans.ts、plans-en.ts、sitemap.ts | zh↔en slug 映射表 + alternates | 详情页 head 含 hreflang；无等效页 x-default→/ | 国际权重 | — |
| TASK-005 | 可见面包屑 + 相关内链模块 | src/components/PlanPage.tsx、src/types.ts | nav 面包屑（对齐现有 BreadcrumbList）+ relatedLinks 数据字段 | 移动端可见；面包屑 3 级 schema 同步 | 抓取/权重流动 | — |
| TASK-006 | robots 放行 AI 爬虫 + llms.txt 维护 | app/robots.ts、scripts/(新) | 显式 Allow GPTBot 等；llms.txt 与路由清单同步 | robots.txt 含 AI 爬虫 Allow；llms.txt 列全页面 | AI 搜索引用 | — |
| TASK-007 | next/font 自托管 | 两个 layout.tsx、global.css | next/font/google 替换外链 | head 无 fonts.googleapis.com 外链 | FCP/LCP | — |
| TASK-008 | /deals 优惠页 | app/(zh)/deals/page.tsx、src/data/deals.ts、sitemap.ts | 聚合优惠字段 + ItemList + FAQPage | 页面含每平台现价/活动/入口 | 交易词承接 | TASK-001,005 |
| TASK-009 | /changelog 变更记录 | app/(zh)/changelog/page.tsx、src/data/changelog.ts | 倒序变更条目 + 首页「最近变更」模块 | 每条链接详情页；带日期 | 时效词 | TASK-001 |
| TASK-010 | /compare 模板 + 首批 6 组 | app/(zh)/compare/[slug]/、src/data/compares.ts | 双栏数据驱动对比 + 结论段 | 每页 ≥1500 字；含结论 | 对比词 | TASK-001,005 |
| TASK-011 | /guides 教程模板 + 首批 6 篇 | app/(zh)/guides/[slug]/、src/data/guides/ | 步骤化教程 + HowTo/Article schema | 每篇含可复制的配置代码块 | 教程词（最大流量池） | TASK-001,005 |
| TASK-012 | /questions 模板 + 首批 4 篇 | app/(zh)/questions/[slug]/、src/data/questions/ | 长文 + FAQPage + 全详情页内链 | 每篇 ≥1500 字 | 问题词 | TASK-001,005 |
| TASK-013 | /tools 模板 + 首批 6 个 | app/(zh)/tools/[slug]/、src/data/tools.ts | 工具介绍 + 支持套餐矩阵表 | 表格内链全部详情页 | 工具词 | TASK-010,011 |
| TASK-014 | /leaderboard SSG 榜单 | app/(zh)/leaderboard/page.tsx | SSG 全量表 + ItemList + description 嵌结论 | 表格服务端直出（区别于竞品 JS 渲染） | 榜单词 | TASK-001 |
| TASK-015 | /models 模板 + 首批 8 个 | app/(zh)/models/[slug]/、src/data/models.ts | 模型评测 + 可用套餐内链 | 每页 ≥1200 字独立内容 | 模型长尾 | TASK-013 |
| TASK-016 | 英文 compare/guides/deals | app/(en)/en/... 对应文件 | 复用中文模板 + en 数据 | hreflang 与中文互指 | 英文蓝海 | TASK-010~012 |
| TASK-017 | 平台扩展（千帆/无问芯穹/优云智算） | src/data/plans.ts、sitemap.ts | 新增 3 个 PlanPageData | 保持现有详情页深度标准 | 平台词扩展 | TASK-001 |
| TASK-018 | IndexNow 覆盖新路由 | scripts/indexnow-submit.ts | 从 sitemap 读取全部 URL 自动提交 | 新页面发布当日提交成功 | 收录加速 | 各内容任务 |

执行顺序建议：第一周 TASK-001~007（全部 P0 + 字体）；第二三周 TASK-008~012；第二个月 TASK-013~016；第三个月 TASK-017 持续 + TASK-018 常态化。

---

## 七、衡量方式

- 收录：`site:codingplan.org`（Google/Bing）页面数周环比；新页面 7 天内收录率。
- 排名：15 个基准词（08 报告 §2 列表）每两周人工记录 Google/Bing/百度位置（无 API，人工验证优先于 mmx 抽样）。
- 流量：现有 Analytics 自然搜索会话数与新页面 landing 会话数。
- 明确不做：购买外链、批量薄页、虚假 dateModified、虚假 aggregateRating。
