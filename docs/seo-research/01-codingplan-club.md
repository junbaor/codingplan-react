# codingplan.club 竞品调研

> 调研日期：2026-08-18
> 调研方法：curl 抓取原始 HTML / 响应头 / robots.txt / sitemap.xml（以 sitemap 为准统计页面），逐页分析 title/description/H 结构/JSON-LD/内链/正文渲染。全部证据来自实际抓取，抓不到的数据在 §9 明确标注"无法验证"。

---

## 1. 网站定位

**目标用户**：
- 中文站（/zh-CN，默认语言）：正在选型"国产 AI Coding Plan 套餐"的中国开发者，关注智谱 GLM、Kimi、MiniMax、火山方舟、阿里百炼、腾讯混元、百度千帆、京东云、讯飞星火、小米 MiMo 十一家厂商的包月套餐。
- 英文站（/en）：订阅国际 AI 编程工具（Claude Code、Codex CLI、Cursor、GitHub Copilot、Windsurf、Cline、Kiro、Trae 等 19+ 工具）的全球开发者。

**核心价值**：把分散在各厂商官网的套餐价格、模型、限额信息集中做"横向对比表格"，一页看全。首页 meta description 原文：

> "全面比较火山引擎方舟、阿里云百炼、腾讯云、百度千帆、京东云、讯飞星火、MiniMax、小米MiMo、Kimi、智谱GLM等10大平台的AI Coding Plan价格、模型与额度，帮你选出最划算的编程套餐。"

**首页表达**：首页 title「AI Coding Plan 对比 - 国内10大平台编程套餐横评 | CodingPlan Club」，H1「国内 AI Coding Plan 对比」，下分三个 H2 区块：快速对比（表格）/ 详细方案（11 个平台 H3 卡片）/ 常见问题（6 条 FAQ H3）。首页即完整落地页，12 个 `<table>`。

**转化目标**（双变现）：
1. **联盟推广佣金**：全站每页 footer 固定输出 11-12 个厂商套餐官网外链（如 `https://www.bigmodel.cn/glm-coding?ic=CIJWV3EKMB` 带推广参数），详情页正文内的"前往官方"按钮也是推广链接。
2. **展示广告**：每页加载第三方 CPM 广告脚本 `pl30823356.effectivecpmnetwork.com/.../a4e27dd1095be52bb85ede848ca8afc7.js`。
3. 流量分析用 Plausible（自托管或云版，未见 GA/GTM）。

**与 codingplan.org 差异**：
| 维度 | codingplan.club | codingplan.org（我们） |
|---|---|---|
| 语言 | zh-CN / en / **zh-TW 三语**，zh-CN 为默认 | 中英双语 |
| 页面规模 | sitemap 292 个 URL | 约 19 个页面 |
| 内容形态 | 对比表 + plans/blog/tools 三大频道（模型评测、工具配置教程） | 对比表 + plans 详情 + 2 个专题页 |
| 国际工具覆盖 | en 站 21 个国际工具套餐页（Kiro、Trae、Zed、Factory、Amp、Antigravity 等长尾都覆盖） | 以中国厂商为主 |
| 商业化 | 佣金外链 + CPM 广告 | 佣金外链 |
| 品牌 | 站名"AI Coding Plan 对比导航站"/ CodingPlan Club，与 codingplan.org 高度撞名 |

---

## 2. 页面清单与信息架构

**总量：292 个 URL**（sitemap.xml 实测 `<loc>` 计数），按类型统计：

| 类型 | 数量 | 说明 |
|---|---|---|
| 首页 | 4 | `/`、`/zh-CN`、`/en`、`/zh-TW`（注意 `/` 与 `/zh-CN` 为重复内容，见 §8） |
| /plans 套餐详情 | 54 | zh-CN 12 个（zhipu/kimi/minimax/volcengine/aliyun/tencent/baidu/jdcloud/xunfei/xiaomi/opencode）+ en 21 个（claude-code/codex-cli/cursor/github-copilot/windsurf/cline/factory/augment/z-ai/minimax-global/kimi-code-global/kiro/qoder/trae/opencode/zed/kilo/antigravity/gemini-cli/amp）+ zh-TW 21 个 |
| /blog 模型评测 | 165 | 55 篇 × 3 语言（kimi-k3、glm-5、gpt-5-6-sol、deepseek-v4、minimax-m2-7、qwen3-coder-plus、grok-code-fast-1 等） |
| /tools 工具页 | 69 | 23 个 × 3 语言（claude-code、cursor、windsurf、cline、roo-code、kilo-code、continue、github-copilot、ccusage、codex-bar、trae、amazon-q-developer、goose、augment-code、zed-editor、replit-agent、sourcegraph-cody、kimi-code、tavily、claude-bar、cc-switch、opencode） |
| 列表页 | 3+ | `/zh-CN/plans`、`/zh-CN/blog`、`/zh-CN/tools`（及对应 en/zh-TW，blog/tools 列表页未列入 sitemap） |

**URL 层级设计**：`/{locale}/{channel}/{slug}`，扁平两极频道制：

```
/zh-CN                      ← 语言首页（与 / 重复）
/zh-CN/plans                ← 套餐频道列表
/zh-CN/plans/zhipu          ← 单厂商套餐详情（priority 0.75）
/zh-CN/blog                 ← 模型评测列表（H1"模型评测"）
/zh-CN/blog/kimi-k3         ← 单模型文章
/zh-CN/tools                ← 工具频道列表（H1"工具频道"）
/zh-CN/tools/claude-code    ← 单工具配置教程
```

**sitemap 特征**：
- 每条 URL 带 `lastmod`（plans/tools 为 2026-08-13，blog 为 2026-07-13 ~ 2026-08-09）、`changefreq`（weekly/monthly）、`priority`（首页 1.0 / plans 0.75 / blog·tools 0.7）。
- blog/tools 页每条带 `xhtml:link rel="alternate"` 三语互指（hreflang 在 sitemap 而非 HTML head 中声明）；**zh-CN/plans/* 没有 alternate 互指**（因为 en/plans 与 zh-CN/plans 内容体系不同：en 覆盖国际工具、zh-CN 覆盖中国厂商，两套 slug 不同名）。

---

## 3. 关键词策略

**核心打法：一个关键词一个专门页面（programmatic SEO），不是全堆首页**。三层关键词矩阵：

### 3.1 核心大词 → 首页
- 中文首页 title：「AI Coding Plan 对比 - 国内10大平台编程套餐横评」（打"AI Coding Plan 对比/横评"）
- 英文首页 title：「AI Coding Plans Compared — Claude Code, Codex, Cursor & more」（打"AI Coding Plans Compared / AI coding subscription"）
- keywords meta（中文站全站共用）：`Coding Plan,AI编程,代码助手,阿里云百炼,智谱GLM,MiniMax,Kimi Code,腾讯云混元,火山引擎方舟,百度千帆,京东云,讯飞星火,小米MiMo`

### 3.2 厂商/工具购买意图词 → /plans/{slug} 详情页
每页 title 精确匹配"品牌词 + 套餐"意图，证据：
- 「智谱 GLM — 详细方案 | AI Coding Plan 对比导航站」→ 打"智谱 GLM Coding Plan / 套餐"
- 「Claude Code — Detailed plans | AI Coding Plans Compared」→ 打"Claude Code plan/pricing"
- en 站把 Z.AI、MiniMax Global、Kimi Code Global、Kiro、Qoder、Trae、Zed、Kilo、Factory、Amp、Antigravity、Gemini CLI 全部做成独立套餐页——**每个国际工具订阅词都有专属 landing page，共 21 个**，这是它英文侧覆盖面远超我们的直接原因。

### 3.3 模型名长尾词 → /blog/{模型slug}（55 篇 × 3 语）
新模型发布即抢词，证据（实际 title）：
- 「Kimi-K3 — 编码能力 | AI Coding Plan 对比导航站」（Kimi-K3 是 2026/7 发布热词）
- 「DeepSeek-V4-Flash」「GPT-5.6 Sol」「GLM-5.1」「MiniMax-M2.7」「Qwen3-Coder-Plus」「Grok-Code-Fast-1」「Doubao-Seed-2.0」……
- 全部是"模型名"搜索意图（开发者搜模型名了解能力/价格），文章 H2 统一为「模型介绍 / 优点 / 缺点 / 编码能力」，模板化生产，Article schema 带 datePublished（如 kimi-k3 为 2026-07-21）。

### 3.4 工具配置教程词 → /tools/{slug}（23 个 × 3 语）
- 「Claude Code — 工具频道 | AI Coding Plan 对比导航站」，H2「使用方法 / 配置指南 / 平台配置」→ 打"Claude Code 配置 GLM / Claude Code 换平台"类教程词
- 还覆盖 cc-switch、ccusage、Claude Bar、CodexBar 等**周边小工具词**（这些词竞争极低但精准）。

### 3.5 问题型词
首页 FAQ 区（H3）：「什么是 AI Coding Plan？」「支持哪些编程工具？」「'5h 限额'是什么意思？」「首月特惠价格后续会恢复原价吗？」「通过这些链接购买会额外收费吗？」「价格信息多久更新一次？」——问题型词只集中在首页，**未做独立 FAQ 页，也未标 FAQPage schema**。

**结论**：它的策略是"首页吃大词 + 3 个频道 × 几十个 slug 吃品牌词/模型词/教程词"，每个 slug 一页、三语复制，292 页全是围绕"coding plan 选型"这一个搜索意图族展开的。

---

## 4. 内容 SEO

- **页面数量**：292（sitemap），单语约 100 个实质内容页。
- **单页信息量（去标签正文实测）**：
  - 中文首页：6,408 字符正文 + 12 个表格
  - 英文首页：14,136 字符正文 + 21 个表格、26 个 H3（每个工具一个 H3 段落，信息密度极高）
  - plans 详情页（zhipu）：**仅 858 字符** + 1 表格（很薄）
  - blog 详情页（kimi-k3）：1,805 字符，H2 四段式（模型介绍/优点/缺点/编码能力）+ H3（技术规格/擅长语言/擅长领域/相关平台）
  - tools 详情页（claude-code）：1,405 字符，H2（使用方法/配置指南/平台配置）
- **H 结构**：严格单一 H1；H2 做区块；H3 做卡片/FAQ 题。列表页 H2 直接铺满所有子项标题（plans 列表 11 个 H2、blog 列表 54 个 H2、tools 列表 22 个 H2），形成密集的关键词内链矩阵。
- **表格**：对比表格是核心内容形态（首页 12 个、英文首页 21 个），符合"价格对比"搜索意图，也易被 Google 理解为结构化数据丰富的页面。
- **更新时间标注**：详情页正文标注"更新于 2026-08-09"；sitemap lastmod 最新 2026-08-13（tools/plans）；Article schema 带 datePublished/dateModified。**紧跟新模型节奏**（blog 里 GPT-5.6 系列、DeepSeek-V4-Flash、Kimi-K3 都是近期发布的模型，lastmod 到 2026-08-09）。
- **原创度**：plans/blog/tools 详情页均为模板化生成（标题模式、H2 结构、schema 完全一致），正文短、信息来自厂商官网，原创深度低；主要靠**广度（292 页）和及时性（新模型抢发）**取胜，而非单篇质量。
- **无独立 FAQ 页 / 无教程频道独立目录 / 无博客深度长文**：blog 全部是"单模型介绍"一种体裁。

---

## 5. 页面级 SEO（逐页实测）

### 5.1 head 标签清单（实测汇总）

| 页面 | title | canonical | og/twitter | hreflang(head) | JSON-LD |
|---|---|---|---|---|---|
| `/`（中文首页） | AI Coding Plan 对比 - 国内10大平台编程套餐横评 \| CodingPlan Club | `href="/"`（相对路径） | **无** | 无 | WebSite |
| `/en` | AI Coding Plans Compared — Claude Code, Codex, Cursor & more \| CodingPlan Club | `href="/en"` | **无** | 无 | WebSite |
| `/zh-CN/plans/zhipu` | 智谱 GLM — 详细方案 \| AI Coding Plan 对比导航站 | `href="/zh-CN/plans/zhipu"` | **无** | 无 | WebSite + **BreadcrumbList** + **Product** |
| `/en/plans/claude-code` | Claude Code — Detailed plans \| AI Coding Plans Compared | `href="/en/plans/claude-code"` | **无** | 无 | WebSite + BreadcrumbList + Product |
| `/zh-CN/blog/kimi-k3` | Kimi-K3 — 编码能力 \| AI Coding Plan 对比导航站 | `href="/zh-CN/blog/kimi-k3"` | **无** | 无 | WebSite + BreadcrumbList + **Article**（datePublished/dateModified/author=月之暗面） + **Review** |
| `/zh-CN/tools/claude-code` | Claude Code — 工具频道 \| AI Coding Plan 对比导航站 | `href="/zh-CN/tools/claude-code"` | **无** | 无 | WebSite + BreadcrumbList + **SoftwareApplication** |
| `/zh-CN/plans`（列表） | 套餐频道 \| AI Coding Plan 对比导航站 | 正确指向自身 | **无** | 无 | WebSite + BreadcrumbList + **ItemList**（11 项全列出） |
| `/zh-CN/blog`（列表） | **错误：与首页 title 完全相同** | **错误：指向 `/zh-CN`** | **无** | 无 | 仅 WebSite |
| `/zh-CN/tools`（列表） | **错误：与首页 title 完全相同** | **错误：指向 `/zh-CN`** | **无** | 无 | 仅 WebSite |

### 5.2 值得 codingplan.org 借鉴的点
1. **按页面类型定制 schema**：Product（套餐）/ Article+Review（模型评测）/ SoftwareApplication（工具）/ ItemList（列表）/ BreadcrumbList（全部详情页）——类型化结构化数据齐全，能争抢 SERP 富摘要。
2. **BreadcrumbList 全覆盖**，且面包屑文字（首页 > 套餐频道 > 智谱 GLM）与 URL 层级一致。
3. **Article schema 标注 datePublished + dateModified + 原厂 author**，配合正文"更新于"日期，强化时效信号。
4. **title 模式统一且关键词前置**：「{品牌} — {页面类型} | {站名}」，description 短而含关键事实（如智谱页 desc 直接写"含免费MCP · GLM-5.1 · ⚠️ GLM-5高峰3倍/非高峰2倍消耗"）。
5. **sitemap 带 lastmod/changefreq/priority 且 hreflang 用 xhtml:link 互指**（blog/tools 三语互指是规范做法）。
6. **详情页正文内嵌"相关平台/支持工具"双向内链**（blog 文章链 plans、plans 链 tools、tools 链各厂商配置），频道间互链稠密。

### 5.3 它做错 / 没做的（详见 §8）
canonical 相对路径、列表页 canonical 指向首页、无 og/twitter 卡片、head 无 hreflang、FAQ 未标 FAQPage、无 x-default。

---

## 6. 技术 SEO

- **渲染方式**：Next.js SSG/SSR（HTML 内 88 处 `/_next/static` 引用；`curl` 裸抓即得完整正文，首页正文 6,408 字符全部在 HTML 里，非 CSR）。
- **CDN/缓存**：Cloudflare，`server: cloudflare`、`cf-cache-status: HIT`、HTTP/2 + `alt-svc: h3`（HTTP/3）。`cache-control: public, max-age=0, must-revalidate`（HTML 短缓存策略，靠 CF 边缘 HIT）。
- **页面大小**：首页 HTML 231 KB（/zh-CN 224 KB、/en 351 KB、blog 列表 391 KB）——HTML 偏大但正文完整、无瀑布依赖。
- **图片**：首页 28 个 `<img>`，**均无 loading="lazy"**；logo 类 SVG 本地托管（/logos/*.svg）。
- **移动端**：每页均有 viewport meta；响应式布局。
- **robots.txt**：Cloudflare 托管的 Content Signal 声明——`search=yes, ai-train=no, use=reference`，**屏蔽 GPTBot、ClaudeBot、Google-Extended、CCBot、Bytespider、Amazonbot、Applebot-Extended、meta-externalagent 等 AI 爬虫**（只放行传统搜索引擎）；声明 `Sitemap: https://codingplan.club/sitemap.xml`。
- **404**：`/zh-CN/nonexistent-page-404test` 正确返回 HTTP 404。
- **重定向**：`http://codingplan.club/` 直接返回 200 而非 301 强制跳 https（Cloudflare "Always Use HTTPS" 似乎未开，小问题）；`/plans/zhipu`（无语言前缀）返回 404，未做语言前缀兜底重定向。
- **无 GA/GTM**，用 Plausible；第三方 CPM 广告脚本每页加载（`pl30823356.effectivecpmnetwork.com`）。
- **sitemap**：单文件 292 URL，格式合法，含 xhtml:link 命名空间的 hreflang 互指。

---

## 7. Google 为什么可能给它比 codingplan.org 更好的排名

以下均基于本次抓取的实证差异（外链/流量等站外因素无法验证，见 §9）：

1. **页面数量级碾压（292 vs ~19）且每个高意图词都有专属页面**：例如英文侧"Claude Code / Codex CLI / Cursor / Kiro / Trae / Zed / Factory / Amp"等 21 个国际工具订阅词，每个词一页独立 title + Product schema + 面包屑；中文侧 55 个模型词（Kimi-K3、GLM-5.1、DeepSeek-V4…）× 3 语言。可索引面约是我们的 15 倍，命中长尾的总概率天然更高。
2. **三语站点 + sitemap hreflang 互指**：zh-CN/en/zh-TW 每个内容页在 sitemap 内三语互指，等价页面集合的权重互相传递，能同时参与中英繁三组 SERP；我们只有中英两语且页面少。
3. **内容更新频率与新鲜度信号强**：sitemap lastmod 到 2026-08-13，blog 覆盖到最新发布的模型（GPT-5.6 Sol、DeepSeek-V4-Flash、Kimi-K3），Article schema 带 datePublished/dateModified，正文标注更新日期。"AI 套餐价格"类查询高度依赖新鲜度，Google 会优待 lastmod 近、模型最新的页面。
4. **首页表格密度高、直击查询意图**：中文首页 12 个对比表格、英文首页 21 个表格 + 26 个工具 H3 段落（正文 1.4 万字符），对"对比/价格"类 query 的信息满足度极高；且全站内链矩阵（首页 → 全部 54 plans + 165 blog + 69 tools，列表页 H2 铺满子项链接）使爬虫抓取深度浅、权重流动顺畅。
5. **结构化数据类型化齐全**：Product / Article+Review / SoftwareApplication / ItemList / BreadcrumbList 按页型配置，比"只有 WebSite"或 schema 单薄的竞品更容易拿到富摘要与轮播展示（我们的站目前 schema 也偏少，这是直接差距）。

---

## 8. 弱点与可乘之机

1. **canonical 配置灾难（最大弱点）**：`/zh-CN/blog` 与 `/zh-CN/tools` 两个列表页的 title 与首页完全相同、canonical 均指向 `/zh-CN`（首页）——等于主动声明这两个频道页是首页副本，它们无法独立积累排名，还可能干扰首页规范信号。**我们的两个专题页务必保证 title/description/canonical 独立且自指。**
2. **`/` 与 `/zh-CN` 完全重复且各自自指 canonical**：同 title、同 H1、同正文，两个 URL 都返回 200 且 canonical 互不指向对方，属于典型重复内容，权重被稀释。我们的中英首页 + `/en` 结构必须保证一组规范唯一（或用 hreflang+x-default 明确关系）。
3. **canonical 全部使用相对路径**（`href="/zh-CN/plans/zhipu"`）而非绝对 URL，不符合 Google 推荐写法，极端情况下会产生歧义。
4. **head 里完全没有 hreflang / og / twitter 标签**：语言互指只靠 sitemap；社交分享零卡片（og:image/og:title 全无）。我们补齐 og/twitter + head hreflang + x-default 即可在此项全面反超。
5. **详情页内容极薄**：plans 详情页正文仅 ~858 字符，大量页面同构模板（H2 结构逐字相同），Google 若加强"thin/templated content"打击（如站点质量分判定），整站可能塌方。**我们的 plans 详情页做到 2000+ 字 + 独立评测观点（优缺点、实测、买谁不买谁），单页质量可以显著胜出。**
6. **FAQ 无 FAQPage schema、无独立 FAQ 页**；问题型词只躺在首页 H3 里。
7. **无品牌与信任资产**：站内无"关于我们"、无作者介绍（Article author 用厂商名"月之暗面"而非真人/本站编辑）、无用户评论，E-E-A-T 信号弱；robots.txt 屏蔽了 GPTBot/ClaudeBot/Google-Extended 等 AI 爬虫，**在 AI 搜索/LLM 引用渠道零存在感**——我们若允许 AI 爬虫（至少部分），可在 Perplexity/ChatGPT 搜索等新渠道获得先发优势。
8. **图片无 lazy、HTML 350KB+**：性能有余量，Core Web Vitals 有被反超空间。
9. **无语言前缀兜底**：`/plans/zhipu` 返回 404 而非 301 到 `/zh-CN/plans/zhipu`，外链若漏写语言前缀即丢权重。
10. **商业化噪音**：第三方 CPM 广告脚本（effectivecpmnetwork）每页加载，体验和信任感差；我们保持干净的转化路径（官方渠道 + 企业微信客服）是差异化卖点。

---

## 9. 无法验证的数据

以下数据本次调研**无法验证**（无 Ahrefs/Semrush/GSC 权限，mmx search 的 `site:` 语法不生效、品牌词搜索未返回该站结果）：

- 域名年龄 / WHOIS 注册时间（域名疑似套了 Cloudflare 隐私保护）
- 外链总数、引用域、锚文本分布
- DA/DR/PA 等任何第三方权威分
- 自然流量、点击量、具体关键词排名位置（用户前提"它在 Google/Bing/百度排名比我们高"按输入条件采信，本次未能独立复核）
- Google / Bing / 百度各自的实际收录条数
- GSC 抓取频次、索引覆盖率、Core Web Vitals 实测字段数据
- 联盟佣金收入、广告收入
- 站长身份 / 团队规模 / 内容生产流程（是否全自动生成）

---

## 附：调研证据存档

原始 HTML 均以 curl 抓取分析（首页、/en、/zh-CN、/zh-CN/plans、/zh-CN/plans/zhipu、/en/plans/claude-code、/zh-CN/blog、/zh-CN/blog/kimi-k3、/zh-CN/tools、/zh-CN/tools/claude-code、robots.txt、sitemap.xml）。关键数字复现命令：

```bash
curl -s https://codingplan.club/sitemap.xml | grep -c '<loc>'   # → 292
curl -sI https://codingplan.club/ | grep -i cf-cache-status      # → HIT (cloudflare)
curl -s https://codingplan.club/zh-CN/blog | grep -o '<link rel="canonical"[^>]*>'  # → href="/zh-CN"（错误指向首页）
```
