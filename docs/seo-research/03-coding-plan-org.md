# coding-plan.org 竞品调研

> 调研日期：2026-08-18
> 调研方法：curl 抓取原始 HTML（首页 + 11 个代表性页面 + sitemap + robots + 响应头）+ mmx search 验证 SERP
> 抓取样本：19 个 sitemap URL 全部枚举，逐个抓取分析 12 个页面（/、/en/、/plans/zhipu、/plans/minimax、/invite-codes、/leaderboard、/changes、/plan-finder、/quota-calculator、/model-guides/deepseek-v4-flash、/data-sources、/editorial-policy）
> 结论可信度：页面级与技术级证据均来自原始 HTML；域名年龄/外链/流量未验证（见第 9 节）

---

## 1. 网站定位

**目标用户**：正在选型或已在使用国内 AI 编程套餐（智谱 GLM / MiniMax / Kimi / 火山方舟 / 阿里百炼 / 腾讯云 / 小米 MiMo）中文开发者，决策关注价格、额度口径、购买状态（售罄/候补/限量补货）与工具兼容性。

**核心价值**：首页 H1 直说「国内 AI Coding Plan 对比」，副标题强调「价格、模型、额度单位、购买状态与工具支持一页对比」。它有一个非常聪明的差异化切口——**计量单位口径**：首页快速对比表格上方明确写「保留厂商原始计量单位；不同单位不能直接视为等价额度」，额度计算器页更是把「不把 prompts、requests、Tokens、Credits 伪装成同一单位」写进 meta description。这是对市面上大量"换算成次数"对比文的反打。

**首页表达**：统计条（7 平台对比 / ¥39 正常月付起 / 10+ 模型 / 20+ 编程工具）→ 快速对比表 → 7 个平台各一个 H2 卡片（含状态徽章如「阿里云百炼 限量补货」「Kimi 候补登记」「腾讯云 当前售罄」）→ FAQ。导航含：帮我选、快速对比、详细方案、模型榜、邀请码、变更。

**转化目标**：推广链接佣金。首页外链直接带参数：`platform.minimaxi.com/...?code=3FATRwA0vx&source=link`、`platform.xiaomimimo.com?ref=X7GSNZ`、火山引擎短链 `volcengine.com/L/xNhKqE62OBE/`、腾讯 `curl.qcloud.com/7VAiG7iz`。邀请码页有明确「推广披露：本站部分链接为推广链接……本站可能获得佣金」。

**与 codingplan.org 差异**：
| 维度 | coding-plan.org（竞品） | codingplan.org（我们） |
|---|---|---|
| 覆盖平台 | 7 家国产（无 ChatGPT/Claude 等海外渠道） | 海外 + 国产混合（含 ChatGPT、Claude、OpenCode Go） |
| 核心叙事 | 单位口径诚实 + 购买状态实时性 | 价格对比 + 推荐标识 |
| 工具型页面 | 帮我选、额度计算器、模型榜、邀请码、变更记录 5 个 | 2 个专题页 |
| 信任建设 | data-sources / editorial-policy / changes 三件套 | 较少 |
| 语言 | 中英双语但英文仅首页 | 中英双语且英文有 6 个详情页 |

---

## 2. 页面清单与信息架构

sitemap.xml 共 **19 个 URL**（`grep -c '<loc>'` 实测），全部枚举：

| # | URL | 类型 | sitemap priority |
|---|---|---|---|
| 1 | `/` | 中文首页 | 1.0 |
| 2 | `/en` | 英文首页 | 0.9 |
| 3 | `/plans/zhipu` | 平台详情 | 0.8 |
| 4 | `/plans/minimax` | 平台详情 | 0.8 |
| 5 | `/plans/kimi` | 平台详情 | 0.8 |
| 6 | `/plans/volcengine` | 平台详情 | 0.8 |
| 7 | `/plans/aliyun` | 平台详情 | 0.8 |
| 8 | `/plans/tencentcloud` | 平台详情 | 0.8 |
| 9 | `/plans/xiaomi` | 平台详情 | 0.8 |
| 10 | `/invite-codes` | 邀请码汇总 | 0.9 |
| 11 | `/leaderboard` | 模型 Arena 榜 | 0.8 |
| 12 | `/plan-finder` | 帮我选工具 | 0.8 |
| 13 | `/quota-calculator` | 额度计算器 | 0.8 |
| 14 | `/changes` | 变更记录 | 0.7 |
| 15 | `/model-guides/deepseek-v4-flash` | 模型解读（仅 1 篇） | 0.7 |
| 16 | `/data-sources` | 数据来源与方法 | 0.7 |
| 17 | `/about` | 关于 | 0.5 |
| 18 | `/editorial-policy` | 编辑准则 | 0.5 |
| 19 | `/privacy` | 隐私 | 0.4 |

**页面类型统计**：7 详情 + 2首页 + 4工具页 + 1内容页 + 1方法页 + 3信任页 + 1隐私 ≈ **19 页**，与我们体量相同（约 19 页），但页面类型分布完全不同——它用 4 个工具页 + 1 个变更页换我们的 6 个英文详情页。

**URL 层级设计**：仅两层——`/slug`（扁平，功能页）+ `/plans/{platform}`（详情）。没有日期型 URL，没有 blog 目录。`/model-guides/` 是预留的内容扩展位（目前 1 篇）。hreflang 只覆盖两个首页（详情页 sitemap 里只有 zh-CN alternate，实际英文详情页不存在）。

**内链结构**（以 zhipu 详情页实测）：详情页互链其余 6 家 + `/leaderboard` + `/invite-codes` + `/data-sources` + `/#compare` `/#faq` 锚点，形成"详情页 ↔ 工具页"环。全站 19 个 URL 全部出现在首页导航或 footer。

---

## 3. 关键词策略

**策略总评：一词一页、意图分页承接**，不是全堆首页。每一类搜索意图都有专门页面 + 专门 title：

**核心对比词 → 首页**
- title：`Coding Plan 对比 - GLM/MiniMax/Kimi/方舟等国内 AI 编程套餐横评`（关键词前置 + 平台名枚举）
- H1：`国内 AI Coding Plan 对比`
- 值得注意：正文中"coding plan 对比"完整词组出现 0 次，靠 title/H1 承载主词，正文用"对比""横评""一页对比"等变体（"套餐"23 次、"AI 编程"9 次）——语义相关而非堆砌。

**品牌词 + 购买意图 → 7 个详情页**（模板化但每页定制模型名和档位名）
- `/plans/zhipu`：`智谱 GLM Coding Plan 详解 - GLM-5.2/5-Turbo/4.7 套餐价格与用量对比`
- `/plans/minimax`：`MiniMax Token Plan 详解 - M3 Plus/Max/Ultra 套餐价格与用量对比`
- 模式 = `{品牌} {产品名} 详解 - {模型列表} 套餐价格与用量对比`，同时命中"品牌词"“产品词"“价格"“对比"四类查询。

**交易词/优惠词 → 邀请码页**（sitemap priority 0.9，仅次于首页）
- title：`AI Coding Plan 邀请码与优惠码汇总（2026年持续更新）`
- 页面顶部有「直接答案」段：MiniMax 邀请码是 `3FATRwA0vx`……（明显针对 AI 搜索/精选摘要优化）
- FAQ 逐平台问："MiniMax Token Plan 邀请码是什么？""火山引擎方舟 Coding Plan 邀请码是什么？"——问题型长尾直接进 FAQPage schema。

**问题型/计算型词 → 2 个 WebApplication 工具页**
- `/quota-calculator`：`AI Coding Plan 额度计算器 - prompts、requests、Tokens、Credits 怎么比较`（title 本身就是问题型长尾）
- `/plan-finder`：`AI Coding Plan 帮我选 - 按预算、档位和编程工具筛选套餐`

**模型词/评测词 → model-guides**
- `/model-guides/deepseek-v4-flash`：`DeepSeek V4 Flash 0731 深度解读：定位、能力、短板与最佳使用方式`（TechArticle schema，唯一带 lastmod 2026-08-04 的页面）

**英文市场平替词 → /en**
- title：`AI Coding Plan Comparison 2026 — GLM, MiniMax, Kimi, Qwen`
- 英文页 "Claude Code" 出现 20 次、"subscription" 10 次——打的是"Claude Code 便宜替代/Asia coding subscription"方向，但没做英文详情页，英文覆盖很浅。

**借鉴判断**：它的"邀请码页 + 问题型 FAQ schema + 直接答案段"和"一词一页"的意图分层最值得抄；我们的英文详情页是它没有的资产。

---

## 4. 内容 SEO

**页面数量**：19 页（sitemap 为准）。

**内容深度（实测 body 纯文本长度）**：
| 页面 | 正文长度 | 表格 | 评价 |
|---|---|---|---|
| 中文首页 | 5,549 字符 | 1 大对比表 | 信息密度高 |
| 英文首页 | 7,746 字符 | 同上 | 中文首页的扩展版 |
| /plans/zhipu | 3,409 字符 | div 表格 | 深（含国际版 Z.ai 段落） |
| /plans/minimax | 2,255 字符 | div 表格 | 中 |
| model-guides/deepseek-v4-flash | 3,652 字符 | 5 表 28 行 | 全站最深，真评测文 |
| /invite-codes | 1,459 字符 | 1 表 | 短而精准 |
| /changes | 1,534 字符 | 2 表 10 行 | 结构化日志 |
| /data-sources | 1,359 字符 | 2 表 15 行 | 信任页 |
| /editorial-policy | 1,067 字符 | 1 表 | 信任页 |
| /quota-calculator | 1,365 字符 | 1 表 8 行 | 中 |
| /plan-finder | 605 字符 | 0 | **薄** |
| /leaderboard | 273 字符 | 仅表头（数据行 JS 渲染） | **最薄，CSR 缺陷** |

**H 结构**：首页 H1 唯一 → H2 分区（快速对比/详细方案/常见问题）→ 7 平台各占一个 H2（如「智谱 GLM Coding Plan 含 MCP 工具」「Kimi Code Plan 候补登记」——把状态写进标题，制造点击欲）。详情页 H2 = 模型介绍/当前套餐/工具支持/FAQ/国际版。

**FAQ**：三层覆盖——首页 FAQPage 6 问（含"什么是 Coding Plan？"科普词、"5小时限额是什么意思？"术语词、"可以退款吗？"交易词）、详情页各 3 问、邀请码页按平台问。FAQ 内容与页面 JSON-LD 一一对应。

**更新时间标注/变更记录机制（最大亮点）**：
- 全站普遍标注「最后更新 / 页面复核：2026-08-01」字样；
- `/changes` 独立页定义了「当前/历史」状态机、发布门槛（"只看到新值时不猜测生效日期""搜索摘要不能单独确认当前价格"）、变更类型清单（上线/停售/限购/补货/模型增删/倍率/工具兼容/邀请码）——这是把 Google E-E-A-T 的"经验+透明"直接做成了产品功能；
- JSON-LD 中普遍带 `dateModified`。

**原创度**：单位口径声明、状态徽章（售罄/候补/限量补货）、「三个最容易被营销带偏的说法」（model-guides）等内容有明确编辑观点，非通稿改写。

---

## 5. 页面级 SEO

**Title/Description**：19 页全配齐，抓取样本中无缺失。title 模式统一（主词前置 - 修饰），description 均为自然语句含具体数字（如「¥49/月起」「20+ 编程工具」）。

**Canonical**：每页自指 canonical（如 `/plans/zhipu` → `https://coding-plan.org/plans/zhipu`）。注意：首页 canonical 为 `https://coding-plan.org`（无尾斜杠），`/en` canonical 指向 `/en` 但实际 URL 307 到 `/en/`（轻微不一致）。

**OG/Twitter**：全配（og:title/og:description/og:type/og:url/og:site_name/og:locale=zh_CN；twitter:card=summary）。og:title 与 title 不同文案（"国内 AI Coding Plan 对比 - 7个平台套餐横评"），说明是有意区分社交与 SEO 文案。

**JSON-LD 类型清单（实测全站）**：
| 页面 | schema 类型 |
|---|---|
| 首页 | WebPage（mainEntity=ItemList 7 项）+ FAQPage（6 问）+ @graph[WebSite, Organization] |
| /en | WebPage + FAQPage |
| /plans/* | **Product（含 offers[] 三档价格 CNY）** + BreadcrumbList + FAQPage |
| /invite-codes | WebPage + BreadcrumbList + FAQPage |
| /plan-finder、/quota-calculator | WebApplication |
| /changes | CollectionPage |
| /model-guides/* | TechArticle（dateModified 2026-08-04） |
| /leaderboard | **无**（漏配） |

**值得 codingplan.org 借鉴的点**：
1. **详情页 Product + offers schema**：把每档套餐价格（如 Lite ¥94.4 / Pro ¥430.4 / Max ¥862.4，priceCurrency=CNY）直接结构化，可竞争价格富摘要；
2. **首页 ItemList**：把 7 平台列表结构化，利于 AI 引擎引用；
3. **BreadcrumbList 全站铺**（我们的详情页可加）；
4. **WebSite + Organization @graph**：建立实体，配合 data-sources/editorial-policy 的 About/信任信号；
5. **TechArticle 用于模型解读**（我们若做模型内容页可复用）。

---

## 6. 技术 SEO

- **渲染方式**：纯静态预渲染 SSG。curl 拿到的 HTML 即含完整正文（首页 5,549 字符中文正文、对比表、FAQ 全部在 HTML 内）。页面仅挂 `theme.js` + `analytics.js` 两个本地小脚本，**没有任何前端框架 runtime/水合 bundle**（HTML 中无 `__NEXT_DATA__`/`_next/static`/astro 标记，仅 inline 脚本中出现 "vite" 字样，判断为 Vite 构建的静态多页站）。极简栈 = 极快加载。
- **例外**：`/leaderboard` 榜单数据行是客户端 JS 渲染，HTML 里只有表头（SEO 缺陷）；`/plan-finder` 结果区同样依赖 JS。
- **页面大小**：首页原始 62.4KB，**gzip 后实测 14.8KB**；详情页 15-27KB。全站无 `<img>` 标签（0 图片 = 无图片优化负担），favicon 是内联 SVG data URI。
- **字体**：Google Fonts（Noto Sans SC + JetBrains Mono）用 `preload as=style + onload 切 stylesheet` 的异步加载模式，不阻塞渲染。注意：这对国内用户是可访问性风险（Google Fonts 在中国大陆不稳）。
- **缓存**：`cache-control: public, max-age=0, must-revalidate` + Cloudflare CDN（`cf-cache-status: HIT`，server: cloudflare，HTTP/2 + h3 alt-svc）。
- **移动端**：标准 viewport 标签，表格注明「左右滑动查看完整表格」。
- **robots.txt**：`User-agent: * Allow: /`，并**显式放行 GPTBot / ChatGPT-User / OAI-SearchBot / ClaudeBot / anthropic-ai / PerplexityBot / Google-Extended / Bingbot**，注释写明 "AI search bots — allow citation"——明确布局 AI 搜索引用（LLM 渠道流量）。
- **sitemap**：带 lastmod / changefreq / priority / xhtml:link hreflang（zh-CN/en/x-default 三向互指，仅首页）。缺陷：`<loc>` 写 `/en` 但服务器 307 到 `/en/`，sitemap 与 canonical 均未用带斜杠版本。
- **404/重定向**：随机路径实测返回真 404 状态码（不是软 404）；`/en` → `/en/` 307 一跳（可接受但多余）。
- **统计**：GA4（G-T3CL15RH84）+ **百度统计** + Microsoft Clarity + Cloudflare Insights——同时盯 Google 和百度两个生态的用户行为。

---

## 7. Google/百度 为什么可能给它比我们更好的排名

1. **主词页面专注度更高**：它首页 title/H1 全押「Coding Plan 对比/国内 AI Coding Plan 对比」这一个意图，7 家全是国产平台（SERP 里搜"coding plan 对比"的用户主要就在比国产套餐）；我们首页混合了 ChatGPT/Claude 等海外渠道，同一查询下的相关性密度被稀释。
2. **购买状态/时效信号是刚性差异化内容**：「Kimi 候补登记」「腾讯云 售罄」「阿里云 限量补货 09:30」这类实时状态 + `/changes` 变更日志 + 全站「复核日期」，让页面具备持续回访价值和 freshness 信号；对"价格类查询"（Google 对 YMYL/价格敏感）的信任加分明显。
3. **结构化数据全维覆盖**：FAQPage（首页+详情+邀请码共 3 层）+ Product/offers（价格直接进 rich result 候选）+ ItemList + Breadcrumb —— 我们若只有部分 FAQ/无 Product，富摘要占屏面积就输一截。
4. **关键词意图分页承接完整**："邀请码"（0.9 priority 专页 + 直接答案段）、"额度怎么算"（计算器页 title 即问题）、"帮我选"（工具页）每类意图都有独立可排名 URL；我们约 19 页里没有对等的交易词/问题词着陆页。
5. **技术极简带来的速度与稳定性**：14.8KB gzip 首页、零框架 JS、无图片、Cloudflare CDN——CWV 几乎不可能差；同时 robots 显式欢迎 AI 爬虫，在 Perplexity/ChatGPT 搜索等新兴引用渠道占位。

（mmx search 实测：查询「coding plan 对比」时 coding-plan.org 首页出现在自然结果第 6 位，快照日期 2026-08-15，前 5 位为 CSDN/博客园长文——该 SERP 由 UGC 长文主导，独立站里它已是最靠前的之一。）

---

## 8. 弱点与可乘之机

1. **/leaderboard 是半成品**：表格数据 JS 渲染、正文仅 273 字符、无任何 JSON-LD——我们的模型榜若做成 SSG 全量表格 + ItemList schema，可直接反超"coding plan 模型榜/哪个模型强"这类查询。
2. **model-guides 内容飞轮刚起步**：仅 1 篇（deepseek-v4-flash，lastmod 08-04）。模型解读是巨大的长尾池（每个新模型一款搜索词），快速铺"模型 X 评测/怎么用/在哪个套餐里"矩阵可以抢跑。
3. **英文市场近乎裸奔**：只有 `/en` 一个英文首页，无英文详情页、无英文 hreflang 详情覆盖。我们的 6 个英文详情页 + `/en/plans/*` 已领先，应继续加密英文长尾（英文"Claude Code alternative/cheap"词群它只碰了首页 20 次 Claude Code，没有落地页）。
4. **海外渠道完全空白**：不覆盖 ChatGPT/Claude/OpenCode Go——"chatgpt plus vs 国产""claude code 平替"等跨市场对比词无人承接。
5. **无博客/新闻栏目**：事件型流量（如"百度千帆 Coding Plan 下线"这类新闻词，SERP 里大量 CSDN 文章在吃）完全放弃，我们做 news/changelog 博客可吃事件词。
6. **小硬伤可攻击**：sitemap `/en` vs 实际 `/en/` 307 不一致；Google Fonts 对中国大陆用户不稳定（我们可用系统字体栈/自托管赢得国内体验）；详情页无真 `<table>`（div 仿表格，结构语义弱于真表格）。
7. **邀请码页可对标超越**：它已证明"邀请码"是高意图词（priority 0.9 + 直接答案段），我们若做同款页且覆盖它没有的平台（OpenCode Go ref、Kimi、智谱），可正面截流。

---

## 9. 无法验证的数据

以下数据本次调研手段无法验证，**不做任何估算**：
- 域名年龄 / WHOIS 注册时间（Cloudflare 代理，whois 不可见真实注册日期）
- 外链数量、引用域、锚文本分布（需 Ahrefs/Semrush，未访问）
- DA/DR/Authority 值
- 自然流量、点击量、关键词覆盖数（无 GSC/SearchConsole 权限；SimilarWeb 未查询）
- 百度收录量与百度 SERP 实际排名（mmx search 数据源对 `site:` 操作符不生效，`site:coding-plan.org` 查询未返回该站收录结果，无法验证其收录规模；仅 Google 系 SERP 通过「coding plan 对比」查询验证到首页第 6 位）
- GA4/百度统计/Clarity 背后的真实流量与用户行为数据
- Core Web Vitals 实测值（未跑 Lighthouse，仅从 HTML 结构推断加载性能上限）
- 收入/佣金转化数据

---

*报告基于 2026-08-18 的单次抓取快照，价格与活动信息以抓取时点为准。*
