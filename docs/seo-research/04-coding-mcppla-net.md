# coding.mcppla.net 竞品调研

> 调研日期：2026-08-18
> 调研方法：curl 抓取原始 HTML / 响应头（-sI）/ robots.txt / sitemap.xml，逐页分析 title/description/H 结构/JSON-LD/内链/正文渲染；Wayback Machine CDX API 查域名历史；mmx search 与 Bing 尝试验证收录（失败，见 §9）。全部证据来自实际抓取，抓不到的数据在 §9 明确标注"无法验证"。

---

## 0. 一句话总结

**一个只有 2 个页面的 Next.js SSG 单页站，靠一张 22 家平台的"Coding Plan 性价比排行"超级对比表 + 一个 API 测速工具页，在站龄仅约 4 个月的情况下拿到了比我们更好的排名。** 它赢在关键词-内容形态-搜索意图的极致匹配，而不是域名权重或内容规模。主域 mcppla.net 已 301 整体迁移到该子域。

---

## 1. 网站定位

**目标用户**：正在选型"国内 AI Coding Plan 套餐"的中国开发者。覆盖 22 家平台（比我们多约一倍）：阿里云百炼、字节火山方舟、腾讯云、智谱 GLM、Kimi、MiniMax、华为云码道、小米 MiMo、京东云、百度千帆、科大讯飞、无问芯穹、摩尔线程、快手 KwaiKAT、UCloud、联通云、中科曙光、快手、Cursor、OpenCode Go、讯飞星辰、UCloud 优刻得、Infini 等，纯中文站（`lang="zh-CN"`），无英文版。

**核心价值**：一张超级对比大表，横向对比 22 家平台的价格、计费单位、5 小时限额、每月限额、模型数、工具数，并首创"每元请求数"性价比维度。首页 meta description 原文：

> "国内AI Coding Plan（AI编程套餐）性价比对比，2026年持续更新：覆盖阿里云百炼、字节火山方舟、腾讯云、智谱GLM、Kimi、MiniMax、华为云等22家平台，逐项对比月付/年付价格、可用模型、用量限制、首月优惠与每元请求数，并给出性价比排行，帮你快速选出最划算的国内AI编程订阅方案。"

**首页表达**：首页即全部——title「国内 Coding Plan 性价比排行 2026 | 价格·模型·用量对比」，H1「国内 Coding Plan 性价比排行」，副标题"价格、模型、用量限制、每元请求数全面横评，助你选出最划算的编程套餐"。正文为 22 平台卡片/表格双视图（客户端可切换、可按"价格从低到高/性价比/模型数量"排序），下接"注意事项"科普段 + 6 条 FAQ + "关于本站"。表格数据密度极高：每平台含入门价、首月/次月价、计费单位、5h 限额、月限额、模型数、工具数等 8+ 字段。

**转化目标**（纯佣金模式，无广告）：
1. **联盟/返利佣金**：首页实测 46 个带推广参数的厂商官网外链，几乎每家平台都有追踪码——阿里云 `userCode=y44p2mtf`、腾讯云 `cps_key=b1b782d9...`、智谱 `ic=R8RQ6LQCRJ`、MiniMax `code=JRiikacsOL`、小米 `ref=SRTY5N`、OpenCode `ref=KZCWENKJQ4`、无问芯穹 `invite_code=BewkvUYk`、Kimi `invitation_code=F9YGD5`、讯飞 `ch=maas-cg-kol-120`（KOL 渠道码）、火山方舟 `utm_medium=CakeGrowth&utm_source=OWO`（CPS 联盟标记），每行均有"立即购买"按钮。
2. 统计用 Plausible（自托管脚本 `/script.js`，实测确认为 Plausible 开源探针），无 GA/GTM、无广告脚本。

**与 codingplan.org 差异**：

| 维度 | coding.mcppla.net | codingplan.org（我们） |
|---|---|---|
| 页面规模 | **2 页**（sitemap 实测） | 约 19 页 |
| 平台覆盖 | 22 家（含 Cursor、摩尔线程、快手、联通云、曙光等长尾厂商） | 约 10 家 |
| 内容形态 | 单页超级排行大表 + API 测速工具页 | 首页对比 + /plans/[slug] 详情页 + 专题页 |
| 语言 | 仅中文 | 中英双语 |
| 关键词打法 | 全部词堆一个首页（榜单型） | 一个关键词一个详情页 |
| 独有功能 | API 测速（24 接口延迟实测）、"每元请求数"指标 | 平台详情页深度内容 |
| 商业化 | 返利外链（无广告） | 返利外链 |
| 品牌 | footer「© 2026 MCP Planet」，品牌词弱 | codingplan.org 域名即品类词 |

**与主站 mcppla.net 的关系**：**mcppla.net 不是主站，而是旧域名**——实测 `curl -sI https://mcppla.net/` 返回 `HTTP/2 301 → Location: https://coding.mcppla.net/`（经 Cloudflare 承载跳转）。即整个项目把裸域 301 到了 coding 子域，旧域权重（若有）直接继承。另有姊妹站 office.mcppla.net（「办公AI导航 — 精选AI办公工具」，同为单页站，sitemap 仅 1 URL），其页面回链 `https://coding.mcppla.net` 1 次，与 coding 站导航栏"办公AI工具"入口形成双向互链——三个域名组成的小网络，但互链规模极小。

---

## 2. 页面清单与信息架构

**总量：2 个 URL**（sitemap.xml 实测，非猜测）：

| URL | priority | changefreq | lastmod | 类型 |
|---|---|---|---|---|
| `https://coding.mcppla.net` | 1.0 | weekly | 2026-08-11 | 首页 = 22 平台性价比排行大表 |
| `https://coding.mcppla.net/ping` | 0.6 | monthly | 2026-08-11 | 工具页 = 24 接口 API 测速 |

**URL 层级设计**：完全扁平，无层级。站内可索引链接只有 `/` 和 `/ping` 两个（首页导航"套餐 / 测速 / 办公AI工具 / 说明"中，"套餐"指 `/`，"测速"指 `/ping`，"办公AI工具"是 office.mcppla.net 外链）。sitemap 规范干净：`weekly` + `priority 1` 用于高频更新的排行页，语义正确。

**信息架构评价**：这是"一页打天下"的极端案例——22 家平台的对比数据、FAQ、关于本站全部压缩进一个 URL，唯一的第二页面 `/ping` 是自带工具属性的自然外链磁铁（测速工具页容易被开发者收藏、在社区分享）。没有 plans 详情页、没有博客、没有教程、没有 tag/分类页。

---

## 3. 关键词策略

**核心打法：不做一个词一个页面，而是把所有关键词全部压进一个超级首页 + 首页内结构化数据。** 这与我们"一个关键词一个详情页"的打法完全相反。

**核心词（导航/对比型）**——落在首页 title/H1：
- title「国内 **Coding Plan 性价比排行** 2026 | **价格·模型·用量对比**」一次性命中"Coding Plan 对比""Coding Plan 排行""性价比"三类查询，还带年份词"2026"吃时效性流量。
- H1「国内 Coding Plan 性价比排行」与 title 前半段完全一致，关键词信号高度收敛。

**品牌词矩阵（22 家平台词）**——全部塞进首页：
- meta keywords（虽然 Google 不用，但暴露了词库意图）：`AI Coding Plan,国内AI编程套餐,Coding Plan对比,Claude Code替代,百炼Coding Plan,火山方舟Coding Plan,GLM Coding Plan,Kimi Code Plan,MiniMax Token Plan,Step Plan,阶跃星辰,AI编程工具价格`
- description 里罗列"阿里云百炼、字节火山方舟、腾讯云、智谱GLM、Kimi、MiniMax、华为云等22家平台"——每家平台品牌词都在首页正文的表格行里以"厂商 + 套餐名"形式出现（如"字节跳动 火山方舟 Coding Plan"、"智谱华章 GLM Coding Plan"），等于 22 个长尾词"XX Coding Plan 价格"的变体全部在同一个页面有实体内容匹配。
- ItemList JSON-LD 的每个 ListItem name 就是品牌词模板："百炼 Coding Plan — 阿里云""GLM Coding Plan — 智谱华章"，description 还带模型名与最低价（"支持Qwen3.6 Plus、Kimi K2.5、GLM 5等模型，最低¥200/月"）。

**替代词（Claude Code 替代品意图）**：keywords 中的"Claude Code替代"+ FAQ 第 3 问"国内Coding Plan支持Claude Code吗？"（H3 原文）——问题型词直接落在首页 FAQ 区块，并有 FAQPage schema 加持。

**问题型词**——全部落在首页 6 条 FAQ（H3 原文引用）：
1. "国内哪家AI Coding Plan性价比最高？"（购买决策词）
2. "API请求和请求次数有什么区别？"（概念科普词）
3. "国内Coding Plan支持Claude Code吗？"（兼容性疑问词）
4. "5小时限额是什么意思？"（GLM/火山套餐高频疑问词）
5. "哪家平台模型选择最多？"
6. "Token计费和按请求次数计费哪个划算？"（对比决策词）

**工具型词**——落在 /ping：title「AI Coding Plan API 测速 | Coding Plan 对比」吃"API 测速""接口延迟测试"词，description 覆盖"24 个国内与海外平台接口…浏览器免登录一键测速"。

**策略判断**：它赌的是"Coding Plan 对比"这个品类的总词流量高度集中在少数头部查询上——一张覆盖 22 家、字段齐全、排序可玩的榜单页，对头部对比词的相关性评分天然高于我们任何单页（我们首页只有约 10 家）。代价是：任何具体平台的深度长尾词（如"GLM Coding Plan 怎么开通""Kimi Code Plan 限额"）它都没有专门页面，只在表格里有一行——这正是我们的机会。

---

## 4. 内容 SEO

**页面数量**：2（sitemap 实测）。

**内容深度与单页信息量**：
- 首页纯文本约 2,900 中文字符（166KB 原始 HTML，gzip 后 30KB），但**数据密度极高**：22 平台 × 8+ 字段的结构化表格数据（平台/入门价/首月次月价/计费单位/5h 限额/月限额/模型数/工具数/套餐档），是"每字符信息价值"最高的内容形态。例如正文原样输出："字节跳动 火山方舟 Coding Plan ¥ 40 /月 首月 ¥ 9.4 次月 ¥ 9.9 API请求 ~1,200 次 18,000 次 10 11 + 2 ¥9.4 立即购买"。
- 表格上方有聚合统计带（"22 平台对比 ¥58.2 平均月付 102+ 可选模型 20+ 编程工具"），下方有"注意事项"科普段（"1次请求约等于15-20次API请求。5小时/周/月限额可能存在陷阱，例如5小时100次不等于一天500次"）——这段原创观点内容是表格之外唯一的文字增量。
- /ping 页纯文本约 5,900 字符：24 个 API 接口端点的完整清单（含国际站端点如 `ark.ap-southeast.bytepluses.com`、`token-plan-sgp.xiaomimimo.com`），本身就是难得的独家资料（各家 Coding Plan 的 base URL 全网很少有人整理）。

**H 结构**：H1 唯一且与 title 一致；H2 仅 2 个（"常见问题""关于本站"）；6 个 FAQ 问题用 H3。整体 H 层级浅，语义清晰，表格用 `<table>` 真实标签渲染（非 div 套壳）。

**FAQ**：6 条，全部是对应品类的真实搜索疑问（见 §3），每条答案 2-3 句、观点明确（如"首月优惠只适合短期体验，不适合长期对比"），不是敷衍的凑数答案。

**表格与榜单**：首页核心就是榜单+表格双形态（客户端可切换卡片/表格视图、多维排序），"性价比排行"的榜单框架是 Google 对 comparison 意图最偏爱的内容框架。

**更新时间标注**：三重更新信号，做得很到位——
1. 页面可见文本"最后更新：2026年8月11日"，用 `<time dateTime="2026-08-11">` 语义标签；
2. JSON-LD WebPage `"datePublished":"2026-01-01","dateModified":"2026-08-11"`；
3. title 带"2026"年份 + sitemap lastmod 同步 2026-08-11。
slogan"2026 持续更新 · 22 家平台全面对比"直接放在首屏副标题。

**原创度**：价格数据本身各站都有，但"每元请求数"性价比指标、注意事项的口径科普（API 请求 vs 请求次数换算）、24 接口测速清单是其独家增量。无 AI 洗稿痕迹，内容克制、信息浓度高。

---

## 5. 页面级 SEO

**首页逐项清单**（全部实测）：

| 项目 | 实际值 | 评价 |
|---|---|---|
| title | 国内 Coding Plan 性价比排行 2026 \| 价格·模型·用量对比 | 榜单词+年份+对比词，优秀 |
| meta description | 160 字符左右，罗列 22 家平台名与对比维度 | 平台品牌词全覆盖 |
| canonical | `<link rel="canonical" href="https://coding.mcppla.net"/>` | 正确 |
| og:* | title/description/url/site_name/locale(zh_CN)/type(website)/**og:image 1200×630（og-image.png 实测存在，62KB）**/image:alt | 完整规范 |
| twitter:* | card=summary_large_image + title/description/image | 完整 |
| robots meta | index, follow | 正常 |
| H1 | 国内 Coding Plan 性价比排行（唯一） | 与 title 收敛 |

**JSON-LD 类型清单（首页 4 组，是全站最值得学习的部分）**：
1. **WebSite** + SearchAction（`target: https://coding.mcppla.net/?q={search_term_string}`）——争夺品牌站点链接搜索框。
2. **WebPage** + datePublished/dateModified/inLanguage/author(Organization)—— freshness 信号。
3. **ItemList（22 个 ListItem）**——每个 ListItem 含 `name`（品牌词模板）、`description`（模型名+最低价）、`url`（厂商官网）、**`offers: {Offer, price, priceCurrency: CNY, priceValidUntil: 2026-12-31}`**。把 22 个套餐全部按带价格的结构化商品输出，有机会在 SERP 上获得价格富摘要。
4. **FAQPage（6 Question）**——FAQ 富摘要资格 + AI 引用友好。

**/ping 页瑕疵**：/ping 的 JSON-LD **原样复用了首页的 WebSite/WebPage/ItemList/FAQPage 四组**——其中 WebPage 的 url/name 仍指向首页，FAQ 内容也是套餐对比 FAQ 而非测速 FAQ，与页面内容错配（轻微 schema spam 风险，但 Google 大概率忽略）。

**无 BreadcrumbList**（2 页站点无需面包屑，合理）、无 Article/Product 独立 schema（ItemList 内嵌 Offer 已部分覆盖 Product 语义）。

**值得 codingplan.org 借鉴**（按优先级）：
1. **ItemList + 内嵌 Offer（price/priceCurrency/priceValidUntil）**：我们的首页渠道卡片完全可以输出同款 ItemList schema，把每家套餐的入门价结构化，争取 SERP 价格富摘要。
2. **title 带年份 + 页面可见"最后更新"日期 + JSON-LD dateModified 三重 freshness 信号**：我们的页面数据更新频繁但没有显式输出 dateModified。
3. **FAQPage schema**：我们已有 FAQ 组件，若尚未输出 FAQPage JSON-LD 应补上。
4. **og:image 1200×630 实图**（确认我们自己是否已有）。
5. **robots.txt 专门放行 AI 爬虫**（见 §6）。

---

## 6. 技术 SEO

**渲染方式**：**Next.js SSG，部署在 Netlify**。证据：响应头 `x-nextjs-prerender: 1, 1`、`x-nextjs-date: Fri, 14 Aug 2026 00:23:50 GMT`、`server: Netlify`、`netlify-vary` 含 `__nextDataReq|_rsc`。与我们（Next.js 16 SSG）同技术栈，无技术代差。

**HTML 完整性**：首页 166KB 未压缩 HTML 中，22 家平台全部表格数据、FAQ 答案、关于本站正文**全部服务端输出**（curl 直接可见），仅排序/筛选/视图切换是客户端行为（RSC payload 内嵌）。无内容靠 JS 二次拉取。/ping 页 24 个接口清单同样完整 SSR（测速结果当然是客户端运行时数据，但页面主体内容完整）。

**页面大小**：首页 gzip 后 **30.4KB**、/ping **19.7KB**——极轻量，LCP 友好。无自定义 web 字体（系统字体栈），无阻塞资源。

**图片**：next/image 统一优化（`/_next/image?url=%2Flogos%2F*.png&w=32|48&q=75`），22 家平台 logo 全部 20×20 小图；首屏第一个 logo `loading="eager"` + `<link rel="preload" as="image">`，其余全部 `loading="lazy"` + `decoding="async"`，均带 alt（用平台中文名做 alt）。

**缓存**：`cache-control: public,max-age=0,must-revalidate` + Netlify Edge `hit`、`age: 596744`（约 7 天的边缘缓存）、`etag` 协商缓存——静态页缓存策略健康。另有 `strict-transport-security: max-age=31536000`、`x-content-type-options: nosniff` 安全头。

**sitemap/robots**：robots.txt 极简且**专门为 6 家 AI 爬虫写了放行规则：GPTBot、ChatGPT-User、CCBot、anthropic-ai、Claude-Web、PerplexityBot**——明确的 GEO（生成式引擎优化）布局，赌 AI 助手回答"国内 Coding Plan 怎么选"时引用它（它的 FAQPage 结构化问答正好是 AI 最爱引用的形态）。sitemap 干净规范（见 §2）。

**404**：实测返回正确的 `HTTP/2 404` 状态码（Netlify Durable 渲染 404 页），无软 404。

**重定向**：mcppla.net 裸域 301 → coding.mcppla.net（继承旧域权重）；站内无多余重定向链。

**移动端**：viewport 标准（`width=device-width, initial-scale=1`），Tailwind 响应式（sm: 断点），表格在小屏有卡片视图兜底。

**移动/桌面无分离 URL，无 hreflang**（单语言站，合理）。

---

## 7. Google 为什么可能给它比 codingplan.org 更好的排名

1. **头部词的内容匹配度碾压**：对"Coding Plan 对比/性价比/排行"这类头部查询，它的一张 22 家平台、8+ 对比维度、可排序的榜单页在相关性上是"最完整的答案"；我们首页只有约 10 家平台，且 title 未含"排行"这类榜单词。22 个平台品牌词（含 Cursor、摩尔线程、快手、联通云、中科曙光这些我们不覆盖的厂商）在同一页面全有实体内容，长尾品牌词的召回面天然是我们的 2 倍以上。

2. **单页权重零分散 + 老域 301 继承**：全站只有 2 页，所有外链、所有内部链接信号全部灌入首页一个 URL，没有列表页/详情页分权；同时裸域 mcppla.net 301 过来，若旧域（MCP 生态站，mcppla = MCP Planet）有历史外链与信任度，则直接叠加到这个页面上。我们的权重分散在 19 个页面 + 中英双语两套。

3. **freshness 信号三重叠加**：title 带"2026"、页面可见"最后更新：2026年8月11日"（语义 time 标签）、JSON-LD dateModified 与 sitemap lastmod 同步——对一个价格频繁变动的品类，Google 明显偏好持续更新的页面。对比类查询 SERP 里"时效性"是重要排序因子。

4. **富摘要占位与 CTR 优势**：ItemList（22 项带 Offer 价格）+ FAQPage 双 schema 给了它价格富摘要和 FAQ 折叠位两块 SERP 不动产，点击率高于普通蓝链，而 CTR 反馈又强化排名——我们目前（若）只有 description 普通展示。

5. **GEO/AI 引用回流的先发卡位**：robots.txt 专门放行 GPTBot/PerplexityBot/Claude 等 6 家 AI 爬虫 + FAQPage 结构化问答，是"让 ChatGPT/Perplexity 推荐它"的明确布局；AI 答案带来的品牌曝光与外链回流正在成为新的排名信号。它的 FAQ 六问精确对准品类最高频疑问。

---

## 8. 弱点与可乘之机

1. **没有任何平台详情页——长尾词门户大开**："火山方舟 Coding Plan 价格""GLM Coding Plan 怎么开通""Kimi Code Plan 支持哪些模型"等单平台深度词，它只有表格里一行数据，我们每个 /plans/[slug] 详情页都是整页深度内容。坚持"一关键词一页面"打法，逐词蚕食它的长尾流量。
2. **没有英文版**：国际版套餐（Cursor、OpenCode Go、GLM 国际版它只在表格里带过一行）的英文搜索流量完全空白，我们的 /en 是现成护城河。
3. **没有教程/配置指南内容**："Claude Code 配置 GLM""Kimi Code Plan 接入 Cursor"等 how-to 词（搜索量大于对比词）零覆盖——我们可以用教程矩阵引流再转化到对比页。
4. **平台覆盖虽广但深度浅**：22 家每家只有一行表格，无优缺点分析、无适用人群推荐、无真实使用评测；我们的详情页可以做"深度 × 观点"差异化。
5. **schema 错配瑕疵**：/ping 复用首页 JSON-LD（WebPage url 指向首页、FAQ 与页面内容无关），说明 SEO 执行粗糙，存在被判定结构化数据 spam 的风险敞口。
6. **品牌词几乎不存在**（"MCP Planet"无用户认知，title 里连品牌名都没有），站龄仅约 4 个月（Wayback 首快照 2026-04-22）——它的排名靠 on-page 匹配而非域名权威，意味着我们**复制其 on-page 优点后可以正面反超**，不需要等待"权重积累"。
7. **单页关键词天花板**：一张表格页无法承接"评测/教程/新闻"等内容型查询，Google 对同一域名同一 URL 能排名的查询簇有上限；我们的页面矩阵没有这个天花板。
8. **互链网络薄弱**：office.mcppla.net 回链仅 1 条，三个域的小网络权重传递量可忽略，无 PBN 级别的支撑。

**可直接执行的行动项**（按 ROI 排序）：
- 首页/对比页补 ItemList + Offer schema（含价格与 priceValidUntil）与 FAQPage schema；
- title 注入榜单/年份词（如"2026 国内 AI Coding Plan 对比排行"）并加"最后更新"可见日期 + dateModified；
- robots.txt 增加 GPTBot/PerplexityBot/Claude 等 AI 爬虫放行段；
- 扩充首页对比平台数（把 Cursor、摩尔线程、联通云等长尾厂商至少以表格行形式纳入）；
- 上线测速/工具类页面（它已验证该品类工具页有真实需求）。

---

## 9. 无法验证的数据

| 数据项 | 状态 | 说明 |
|---|---|---|
| Google/Bing 实际收录量 | 无法验证 | mmx search 不支持 `site:` 语法（返回无关结果）；Bing `site:coding.mcppla.net` 经 webfetch 被反爬返回无关内容，无法计数 |
| 域名注册时间（WHOIS） | 无法验证 | 本机 whois 查询超时无输出 |
| 域名上线时间 | 部分可验证 | Wayback CDX 最早快照 **2026-04-22**（即不早于 2026 年 4 月，站龄约 4 个月；更早历史无快照） |
| 外链数量 / DA / DR | 无法验证 | 无 Ahrefs/Semrush/Majestic 数据源 |
| 自然搜索流量 / 点击量 | 无法验证 | 无 Similarweb/Search Console 权限；Plausible 数据为其私有 |
| 具体关键词排名位置 | 无法验证 | 用户陈述"排名比我们高"，本次调研未实测 SERP 位置（搜索结果个性化且本机环境不可控） |
| mcppla.net 旧域历史权重 | 无法验证 | Wayback 无 mcppla.net 的历史快照记录（CDX 返回空），无法判断旧域曾有何内容/权重 |

---

*报告完。所有引用的 title/H1/URL/meta/JSON-LD 均来自 2026-08-18 实际 curl 抓取的原始 HTML。*
