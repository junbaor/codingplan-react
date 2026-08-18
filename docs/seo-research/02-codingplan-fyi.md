# codingplan.fyi 竞品调研

> 调研日期：2026-08-18
> 调研方法：curl 抓取原始 HTML / 响应头 / robots.txt / sitemap.xml，mmx search 验证收录
> 调研对象：https://www.codingplan.fyi/ （含其镜像源站 codingplan.club 与关联站 vibecoding.dreamfree.space）

## 0. 调研中的重大发现（必读）

**codingplan.fyi 不是一个常规独立站点，而是一个"双域名镜像 + 静态门页"混合体**，涉及三个域名：

| 域名 | 角色 | 证据 |
|---|---|---|
| `www.codingplan.fyi` | 镜像/门页站 | 首页 HTML 与 codingplan.club 首页**逐字节相同**（均为 315,502 bytes / 221,655 chars），JSON-LD 中 `"url":"https://codingplan.club"` 原样保留，plausible 统计 `data-domain="codingplan.club"` 未改 |
| `codingplan.club` | 真实主站（Next.js 全功能站） | sitemap 共 **292 个 URL**，404 正常返回，各页面内容各异 |
| `vibecoding.dreamfree.space` | 关联静态文章站（腾讯云 COS 托管） | fyi 的 robots.txt 中 `Sitemap:` 指向该域名；fyi 所有非首页路径 fallback 到的"31 大平台对比工具"静态页与该站首页同源（同样的 `baidu-site-verification codeva-LiaxYnxu2a`、同样标题） |

**fyi 的实际行为（已验证）**：
- `GET /` → 返回 codingplan.club 首页的完整克隆（Next.js SSR HTML）
- `GET /zh-CN/plans/zhipu`、`/en`、甚至 `/nonexistent-page-xyz` → **全部返回 HTTP 200 + 同一份 315,502 字节的中文静态页**《AI Coding Plan 平台评测与对比 - Coding Plan 对比工具》（MD5 全部相同：`69d3f1ff974f3a336e566b616ef54b28`），即全站 soft-404
- 页面 preload 了第三方广告脚本 `pl30823356.effectivecpmnetwork.com`（低质 CPM 广告联盟，典型的流量变现行为）

结论：**用户在 Google/Bing 看到排名的"codingplan.fyi"，其内容资产实际来自 codingplan.club（292 页）+ vibecoding.dreamfree.space（15 篇文章）**。fyi 域名本身的价值是 exact-match 关键词域名（"coding plan"）。本报告对三者一并分析。

---

## 1. 网站定位

**目标用户**：使用 Claude Code / Cursor / Cline / OpenCode 等 AI 编程工具、想以订阅制（而非按量付费）获取模型额度的中文开发者；英文版（/en）另覆盖评估 Claude Code、Codex、Cursor、GitHub Copilot 等国际订阅的国际用户。

**核心价值**：把分散在各云厂商官网的 Coding Plan 价格/限额/模型/支持工具做成统一对比表，帮用户"选到最划算的编程套餐"。

**首页表达**（fyi/club 中文首页）：
- title：`AI Coding Plan 对比 - 国内10大平台编程套餐横评 | CodingPlan Club`
- H1：`国内 AI Coding Plan 对比`
- 副标题："全面比较火山引擎、阿里云、腾讯云、MiniMax、Kimi、智谱、讯飞等10大平台的价格、模型与额度限制，帮你找到最划算的编程套餐。"
- 首页即包含：11 平台快速对比表 → 每平台详细方案卡片（3 档价格 + 5h/周限额 + 模型 + 工具）→ 6 条 FAQ

**转化目标**：联盟佣金。每个平台卡片带"立即购买"推广链接（如 `bigmodel.cn/glm-coding?ic=CIJWV3EKMB`、`platform.minimaxi.com/subscribe/token-plan?code=3dPzNy69NQ&source=link`、`opencode.ai/go?ref=67KNGQK1K9`、阿里云带 `userCode` 参数），FAQ 中明确披露佣金模式（"通过此链接购买，你享受的价格与官网完全一致……本站可能获得少量佣金"）。另有广告联盟脚本变現（fyi 域）。

**与 codingplan.org 的差异**：
- 覆盖平台更多：中文 11 家（多出腾讯云混元、百度千帆、京东云、讯飞星火）vs 我们中文站的 6-7 家；英文站 20 个国际产品（Claude Code、Codex CLI、Cursor、GitHub Copilot、Windsurf、Cline、Kiro、Qoder、Trae、Zed、Gemini CLI、Augment、Factory、z-ai、Antigravity、Amp 等）
- 页面规模差一个数量级：292 URL vs 约 19 页
- 三语（zh-CN / en / zh-TW）hreflang 矩阵
- 商业化更激进：佣金链接 + 广告脚本 + 多域名镜像导流

## 2. 页面清单与信息架构

**以 codingplan.club 官方 sitemap.xml 为准（292 个 URL，带 hreflang alternate + lastmod + changefreq + priority）**：

| 页面类型 | 数量 | URL 模式 | 示例 |
|---|---|---|---|
| 首页 | 1 | `/` | `https://codingplan.club/` |
| 语言首页 | 3 | `/{lang}` | `/zh-CN`、`/en`、`/zh-TW` |
| 栏目页 | 9 | `/{lang}/{channel}` | `/zh-CN/plans`（套餐频道）、`/zh-CN/blog`（模型评测）、`/zh-CN/tools`（工具频道） |
| 中文平台详情页 | 11 | `/zh-CN/plans/{slug}` | zhipu、kimi、minimax、volcengine、aliyun、tencent、baidu、jdcloud、xunfei、xiaomi、opencode |
| 英文产品详情页 | 20 | `/en/plans/{slug}` | claude-code、codex-cli、cursor、github-copilot、windsurf、cline、factory、augment、z-ai、minimax-global、kimi-code-global、kiro、qoder、trae、opencode、zed、kilo、antigravity、gemini-cli、amp |
| 繁中产品详情页 | 20 | `/zh-TW/plans/{slug}` | 同英文的 20 个国际产品 |
| 模型评测页 | 54×3 | `/{lang}/blog/{model-slug}` | kimi-k3、glm-5-1、minimax-m2-7、deepseek-v4、qwen3-coder-next、gpt-5-6-luna、doubao-seed-2-0、spark-x2、mimo-v2-tts 等 |
| 工具页 | 22×3 | `/{lang}/tools/{slug}` | claude-code、cursor、cline、roo-code、kilo-code、goose、opencode、windsurf、continue、github-copilot、ccusage、trae、zed-editor 等 |

**URL 层级设计**：`/{lang}/{channel}/{slug}` 三段式，语言前缀 + 语义化 channel（plans/blog/tools）+ 短横线 slug。sitemap 中每个 URL 都带 3 条 `xhtml:link rel="alternate" hreflang` 互指，`lastmod` 精确到毫秒（最新 2026-08-13），首页 priority=1、语言首页 0.9、栏目页 0.8。

**vibecoding.dreamfree.space（15 个 URL，另一套独立 IA）**：
- `/`（31 平台对比工具单页，83 行表格，22,609 字符正文）
- `/articles/model_comparisons/{yyyymmdd}/`（4 篇模型横评）
- `/articles/plan_comparisons/{yyyymmdd}/`（4 篇套餐月度横评）
- `/articles/news/{yyyymmdd}_{topic}/`（7 篇新闻解读，如 `20260719_gpt_5_6`、`20260718_kimi_k3`）
文章 URL 用日期做版本化（同一主题每月新开 URL，如 plan_comparisons 有 20260603/20260628/20260810 三篇），是"时效性内容持续新增页面"策略。

**fyi 域本身**：无有效 sitemap（robots.txt 指向的 sitemap 全部是 vibecoding 域的 URL，跨域 sitemap 会被 Google 忽略）。

## 3. 关键词策略

**核心打法：一个关键词一个专门页面，矩阵化铺长尾**，不堆首页。

| 关键词类型 | 落地页 | title 证据 |
|---|---|---|
| 核心词「AI Coding Plan 对比」 | 中文首页 | `AI Coding Plan 对比 - 国内10大平台编程套餐横评 \| CodingPlan Club` |
| 英文核心词 | /en 首页 | `AI Coding Plans Compared — Claude Code, Codex, Cursor & more \| CodingPlan Club` |
| 平台品牌词（购买意图） | `/zh-CN/plans/{slug}` | `智谱 GLM — 详细方案 \| AI Coding Plan 对比导航站`、`Claude Code — Detailed plans \| AI Coding Plans Compared` |
| 模型品牌词（信息意图） | `/zh-CN/blog/{model}` | `Kimi-K3 — 编码能力 \| AI Coding Plan 对比导航站`（54 个模型 × 3 语种） |
| 工具品牌词（导航意图） | `/zh-CN/tools/{tool}` | `Claude Code — 工具频道 \| AI Coding Plan 对比导航站`（22 个工具 × 3 语种） |
| 时效性对比词 | vibecoding 文章 | `2026年8月10日 Coding Plan平台全面对比｜智谱新套餐涨价、Kimi限购、DeepSeek新模型、字节方舟2.5折持续` |
| 新闻热点词 | vibecoding 文章 | `GPT-5.6 来了：更强能力、更省Token！Sol、Terra、Luna 三档怎么选？` |
| 问题型词 | 首页 FAQ | H3 问题式小标题：`什么是 AI Coding Plan？`、`「5h 限额」是什么意思？`、`首月特惠价格后续会恢复原价吗？`、`价格信息多久更新一次？` |

**title 模板统一为 `{实体名} — {频道名} | {站名}`**，所有详情页尾巴一致（"| AI Coding Plan 对比导航站"），把"AI Coding Plan"这个核心词植入全站每一页 title。

**关键词布局细节**：
- meta keywords 明确罗列 13 个词：`Coding Plan,AI编程,代码助手,阿里云百炼,智谱GLM,MiniMax,Kimi Code,腾讯云混元,火山引擎方舟,百度千帆,京东云,讯飞星火,小米MiMo`
- 首页描述把 10 个平台名全部塞进 description（连带平台名搜索流量）
- vibecoding 的 description 塞入模型名清单："涵盖DeepSeek V4，GLM-5.2，Qwen-3.8-Max，Kimi-K3，MiniMax-M3，Doubao-Seed-2.0，MiMo-V2.5-Pro，GPT-5.6等模型"
- 首页→详情页的 modelSlugs 映射把表格里的每个模型名自动链接到对应模型评测页（如 GLM-5.1 → /zh-CN/blog/glm-5-1），形成"平台页↔模型页"双向内链矩阵
- 每个平台的 `source_note` 标注数据来源和核验日期（如"来源：Kimi Code 官方页与文档（2026-07-13 查询）"），是 E-E-A-T 信号

**与 codingplan.org 对比**：我们约 19 页只覆盖"核心词 + 平台词"，竞品额外吃掉模型词（54 个）、工具词（22 个）、国际产品词（20 个）和时效词（月度对比文），长尾流量入口是我们的 15 倍以上。

## 4. 内容 SEO

**页面数量**：club 292 页 + vibecoding 15 页 ≈ 307 页（vs codingplan.org 约 19 页）。

**单页信息量（服务端渲染文本实测）**：

| 页面 | 正文文本量 | 表格 | 内容构成 |
|---|---|---|---|
| club 中文首页 | 7,299 字符 | 12 表 54 行 | 11 平台×(价格/首月/模型/5h限额/档数/亮点) + 每平台详细卡片 + 6 条 FAQ |
| club /en 首页 | **15,672 字符** | 21 表 99 行 | 20 个国际产品完整对比（英文首页比中文首页厚一倍） |
| club /zh-CN/plans/zhipu | 935 字符 | 1 表 | 套餐价格表 + 支持模型/工具列表（**薄页**） |
| club /zh-CN/blog/kimi-k3 | 1,872 字符 | 0 | 模型介绍/优点/缺点/编码能力（**薄页**） |
| club /zh-CN/tools/claude-code | 1,478 字符 | 0 | 使用方法/配置指南/平台配置 |
| vibecoding 首页 | 22,609 字符 | 1 表 83 行 | 31 平台全参数表 + 推荐位 + "别只盯月费，额度口径更关键"等选型方法论 + 快讯 |
| vibecoding 对比文章 | 18,831 字符 | — | 六章结构：计费方式/前沿模型平台/其他平台/国际平台/分场景选型/总结 |
| vibecoding 新闻文章 | 17,559 字符 | — | 五章结构 + 独立评测引用 + 对比表 |

**H 结构**：首页 H1(1) → H2(频道名：快速对比/详细方案/常见问题) → H3(平台名/FAQ 问题)；详情页 H1(实体名) → H2(方面：支持模型/支持工具、优点/缺点/编码能力、使用方法/配置指南)；vibecoding 文章 H1(时效标题) → H2(中文章节"一、二、三…")。层级干净，无跳级。

**FAQ**：中文首页 6 条问答直接渲染在 HTML（H3 问题 + 段落答案），但**未输出 FAQPage JSON-LD**。

**榜单/表格**：对比表格是核心内容形态（首页 12 表、en 首页 21 表、vibecoding 83 行大表），数据密度远超段落文字。

**更新时间标注**：footer 全站输出"数据更新于 2026-08-09 · 11 大平台"；sitemap lastmod 2026-08-13；vibecoding 静态文件 Last-Modified 2026-08-16（COS 响应头）；文章标题直接带日期。**"持续更新"本身被当作内容卖点**（首页 badge："2026 持续更新"）。

**原创度**：对比表格为自有整理（附来源核验日期）；vibecoding 文章为原创分析文（引用 Artificial Analysis 等第三方评测、带观点："智谱把旗舰模型的购买门槛从抢购改成直接购买，代价是价格翻倍"）。fyi 域则完全是克隆内容。

## 5. 页面级 SEO

**Head 标签实测**（以 /zh-CN/plans/zhipu 为例）：

```
title:    智谱 GLM — 详细方案 | AI Coding Plan 对比导航站
desc:     含免费MCP · GLM-5.1 · ⚠️ GLM-5高峰3倍/非高峰2倍消耗
canonical: <link rel="canonical" href="/zh-CN/plans/zhipu"/>   ← 相对路径
og:       og:title / og:description / og:url(绝对) / og:type=website（详情页才有，首页无 og）
twitter:  twitter:card=summary / twitter:title / twitter:description（详情页才有，首页无）
```

**JSON-LD 类型清单**：

| 页面类型 | schema 类型 | 要点 |
|---|---|---|
| 全站 | WebSite | name/url/inLanguage |
| 平台详情页 | **Product + AggregateOffer** | lowPrice=49 / highPrice=469 / offerCount=3，每个套餐档位一条 Offer（name/price/priceCurrency/url/availability），offers.url 直接指向推广链接 |
| 平台详情页 | BreadcrumbList | 首页 → 套餐频道 → 智谱 GLM |
| 栏目页 /zh-CN/plans | ItemList | 11 个平台列表 |
| 模型评测页 | **Article + Review** | 新闻/评测双 schema |
| 工具页 | SoftwareApplication | name/description/applicationCategory |
| 首页 FAQ | （无） | FAQ 只有 HTML，缺 FAQPage schema |

**值得 codingplan.org 借鉴**：
1. **Product + AggregateOffer**：把每个套餐档位作为 Offer 输出（lowPrice/highPrice/offerCount），有机会获得搜索结果价格富摘要——这是订阅比价站最该抄的 schema
2. **BreadcrumbList 全站覆盖**（我们目前缺）
3. **Article + Review 用于模型评测内容**（若我们做模型页）
4. **sitemap 每条 URL 带 hreflang 互指 + lastmod + priority**
5. **footer 输出"数据更新于 {date} · {N} 大平台"**，把新鲜度做成页面可见信号

**竞品自身缺陷（我们应避免）**：
- canonical 全站用相对路径（Next.js metadataBase 未配置），镜像到 fyi 域后 canonical 变成 `href="/"` 指向 fyi 自身，失去归一作用
- `/zh-CN/blog` 与 `/zh-CN/tools` 两个栏目页的 title/description/canonical **全部错误复制首页**（canonical 竟指向 `/zh-CN`），三页互抢 canonical——明显的 Next.js metadata 配置 bug
- 首页完全没有 og:/twitter: 标签
- 无 FAQPage schema

## 6. 技术 SEO

**渲染方式**：
- club：Next.js App Router SSR/SSG（HTML 内含 `/_next/static/` 资源与 `self.__next_f` RSC payload），**正文完整服务端渲染**——12 个对比表格、54 行数据、FAQ 问答全部在初始 HTML 中，不依赖 JS
- fyi：Cloudflare 前置（`server: cloudflare`，`cf-cache-status: DYNAMIC`），无 `x-nextjs-cache`/`x-vercel` 等头；首页为静态化克隆 HTML
- vibecoding：纯静态 HTML + 手写 CSS（`styles/shared.css?v=260725b` 版本号缓存），托管于腾讯云 COS（`server: tencent-cos`，带 ETag/Last-Modified/Accept-Ranges）

**页面大小**：首页 315 KB（未压缩传输约 308 K，含 RSC payload 重复数据）；详情页 81-91 KB；vibecoding 文章 34-44 KB。首页偏大，但字体全部 `preload as="font"`（4 个 woff2）+ 7 个平台 logo `preload as="image"`，LCP 资源优先级处理到位。

**缓存**：`cache-control: public, max-age=0, must-revalidate`；静态资源经 Cloudflare/COS CDN。

**移动端**：viewport 正常；对比表在移动端转为卡片式字段（mobileLabels 结构在 RSC 数据中可见）。

**sitemap/robots/404/重定向**：

| 项 | fyi | club | vibecoding |
|---|---|---|---|
| robots.txt | Allow all；**Sitemap 指向 vibecoding 域（跨域无效）** | Cloudflare 托管版：`Content-Signal: search=yes, ai-train=no`，**禁止 GPTBot/ClaudeBot/Bytespider/CCBot/Google-Extended 等抓取**；Host+Sitemap 指向自身 | （未单独验证，同 fyi 指向） |
| sitemap | 无有效 sitemap | 292 URL + hreflang + lastmod，规范 | 15 URL，无 lastmod |
| 404 | **无 404，任意路径 200 返回静态门页（全站 soft-404）** | HTTP 404 正常 | 未验证 |
| hreflang | 声明 en/zh-TW，但 `/en` 实际返回中文内容（声明与内容不符） | 三语真实存在，sitemap 互指 | 无 |

**统计**：plausible 自托管（`plausible.toolrain.com`），无 GA/GTM。

## 7. Google 为什么可能给它比 codingplan.org 更好的排名

1. **关键词矩阵规模碾压**：292 页 vs 我们约 19 页。每个平台/模型/工具/国际产品都是独立 URL + 独立 title，54 个模型词（"kimi-k3"、"glm-5.1"）、22 个工具词、20 个国际产品词全部有专门落地页，长尾进站入口是我们的 15 倍量级。
2. **exact-match 域名 + 首页内容完全服务搜索意图**：`codingplan.fyi` 域名即核心词；首页 H1=「国内 AI Coding Plan 对比」+ 12 张对比表格直接回答"哪个套餐划算"，信息密度高、无废话段落，与搜索意图匹配度极高。
3. **结构化数据带来富摘要与语义优势**：Product+AggregateOffer（含 lowPrice/highPrice）可能直接在 SERP 展示价格区间，点击率天然高于普通结果；配合 Review/Article/SoftwareApplication/BreadcrumbList，实体覆盖完整。我们目前没有这套 schema。
4. **持续新鲜度信号**：sitemap lastmod（2026-08-13）、footer「数据更新于 2026-08-09」、月度新开 URL 的对比文（plan_comparisons/20260810）、vibecoding 文件 Last-Modified 2026-08-16——价格类查询对新鲜度极敏感，Google 会偏好明确展示更新信号的结果。
5. **三层内链矩阵传递权重**：首页对比表 → 平台详情页 → 模型页/工具页（modelSlugs 把表格中每个模型名自动链接到对应 blog 页），292 页全部在 3 次点击内互通，且锚文本就是关键词（模型名/平台名/工具名）。

## 8. 弱点与可乘之机

**竞品硬伤（已验证）**：
1. **fyi 全站 soft-404**：除首页外所有 URL 返回同一静态页 + HTTP 200，无有效 sitemap，robots 指向跨域——Google 最终会把 fyi 的大多数页面判为低质/重复；其排名资产随时可能随算法更新清零
2. **club 栏目页 canonical bug**：`/zh-CN/blog`、`/zh-CN/tools` 的 canonical 指向 `/zh-CN`，三页内容互抢归一，这两大栏目页很难获得独立排名
3. **详情页内容极薄**：平台详情页仅 ~935 字符、模型页 ~1,872 字符，本质是"表格+列表"，缺乏深度选型建议——我们可以在对应页面做 3-5 倍深度的内容（真实使用建议、场景推荐、坑点提示）碾压
4. **无 FAQPage schema、首页无 og/twitter 卡片**——富摘要机会空着
5. **vibecoding 文章是内链孤岛**：15 篇文章之间 0 内链（实测 `href="/articles/"` 内链数为 0），权重不流通
6. **club robots 屏蔽主流 AI 爬虫**（GPTBot/ClaudeBot/Google-Extended 等）：在 AI 助手/LLM 搜索（ChatGPT Search、Perplexity 引用）渠道完全缺席——这正是我们 AGENTS.md 里"面向 LLM 的爬虫入口"策略可以差异化反超的渠道
7. **多域名镜像是双刃剑**：fyi 克隆页连 plausible 域名都没改，若被判定为恶意镜像/门页（叠加 effectivecpmnetwork 低质广告），可能连累品牌信誉

**可乘之机（给 codingplan.org 的行动建议）**：
- 补 Product + AggregateOffer schema 到全部 /plans/[slug] 页（竞价富摘要）
- 为模型词/工具词建专题页（对标其 blog/tools 频道），但内容做厚（选型建议+真实限额口径解读，其对"额度口径"的解读只在 vibecoding 有，club 站没有）
- 修我们自己的短板同时，在"腾讯云/百度千帆/京东云/讯飞星火"这几个竞品覆盖但更薄弱的平台词上优先扩页
- 保持 LLM 可抓取（不屏蔽 AI 爬虫），抢占竞品主动放弃的 AI 搜索引用渠道
- 输出月度横评文章（时效性标题带日期），抢"2026年X月 coding plan 对比"类查询

## 9. 无法验证的数据

以下数据本次调研无法获取，不作任何臆测：

- **域名年龄 / WHOIS 注册时间**：未查询 WHOIS（三个域名均未知）
- **DA/DR/外链数/外链来源**：无 Ahrefs/Semrush/Majestic 数据
- **自然流量 / 点击量 / 排名关键词数**：无 SimilarWeb/Search Console 数据
- **Google/Bing 实际收录量与排名位置**：mmx search `site:codingplan.fyi` 与品牌词搜索的前 10 结果中均未出现 codingplan.fyi 或 codingplan.club 自身页面（结果全是 CSDN/博客园等第三方内容），无法确认其在通用搜索源中的收录与排名表现——用户所述"fyi 排名高于我们"的具体关键词与位置未独立复现，标注为无法验证
- **fyi 与 club 是否同一站长**：fyi 完整克隆 club 且复用其统计/JSON-LD/联盟参数，强烈暗示同源，但无注册人信息佐证
- **plausible 后台的真实流量数据**
- **IndexNow / Bing 收录推送情况**
