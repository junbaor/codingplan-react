# 竞品横向总结

> 基于 01~07 七份单站报告 + 15 组 SERP 抽样（mmx search）。所有数据均有抓取证据；无法验证项在各单站报告 §9 列出。

## 0. 竞品画像速览

| 站点 | 本质 | 可索引页面 | 核心打法 | 实测排名信号 |
|---|---|---|---|---|
| codingplan.club | 三语 programmatic 矩阵站 | **292** | 55 模型评测 × 3 语种 + 21 国际工具套餐页，一词一页 | 未进抽样 SERP Top10 |
| codingplan.fyi | club 首页的镜像站 + 全站 soft-404 | ~1（有效） | 寄生克隆，无独立内容资产 | 未进抽样 SERP Top10 |
| coding-plan.org | 极简静态意图分层站 | 19 | 邀请码页/计算器/变更记录/帮我选 按搜索意图拆页 | **「coding plan 对比」#5、「AI 编程套餐」#5、「coding plan 推荐」#10、品牌词 #7** |
| coding.mcppla.net | 单页大表站 | 2 | 一张 22 平台排行表吃头部对比词，4 组 JSON-LD | 未进抽样 SERP Top10（用户报告其排名高于我们，可能在特定词/引擎） |
| coding.iamle.com | 老博客子站（单页） | 1 | 2017 年老域名 iamle.com 全站侧栏导流 | 未进抽样 SERP Top10 |
| creditsplan.cn | 国内 ICP 备案矩阵站 | **153** | 112 个套餐档位页逐页独立 + 榜单/对比/顾问页 | 未进抽样 SERP Top10（主攻百度） |
| dxnt.com | 模型聚合 SaaS 官网的转化页 | 13 | 单一对比页 + 全站导航锚文本输血 + 每日 dateModified | 未进抽样 SERP Top10 |

## 1. 竞品矩阵

| 维度 | codingplan.org（我们） | club | fyi | coding-plan.org | mcppla | iamle | creditsplan | dxnt |
|---|---|---|---|---|---|---|---|---|
| 内容深度（单页） | 高（详情页 5-10K 字符） | **薄**（详情 <2000 字符） | — | 中高（意图页内容扎实） | 高（首页大表） | 中（单页大表） | 中（档位页模板化） | 高（对比页长文） |
| 页面数量 | 19 | **292** | ~1 | 19 | 2 | 1 | **153** | 13 |
| 长尾关键词承接 | ✗（全堆首页） | **✓ 一词一页** | ✗ | **✓ 意图分页** | ✗ | ✗ | ✓ 档位页 | ✗（单页聚焦） |
| Title 质量 | 高（价格钩子） | 中（模板化） | — | **高（意图+年份）** | 高（年份+性价比） | 中 | 高（结论前置） | 高 |
| Description | 高 | 中 | — | 高 | 高 | 中 | **高（嵌自动结论）** | 中 |
| Structured Data | WebPage+ItemList+FAQ / Product+Offer+Breadcrumb+FAQ | Article 系 | — | **Product+offers + 三层 FAQPage + TechArticle** | **ItemList+Offer + FAQ + SearchAction + dateModified** | FAQPage | **Product+Offer+UnitPriceSpecification+FAQ** | 无 |
| 内链 | 首页↔详情 + footer | 三语互指 + blog 内链 | — | 导航锚文本统一 | 单页锚点 | 主站侧栏导流 | 23 品牌互链 | **全站导航锚文本「对比」** |
| FAQ | 10 问 + 逐页 FAQ | ✗ 无 schema | — | 三层 FAQ（站/页/平台） | ✓ | 10 问 | ✓ | ✓ |
| 专题页面（工具/教程/模型） | ✗ | **✓ 22 工具页 + 55 模型页** | ✗ | model-guides 仅 1 篇 | ✗ | ✗ | ✗ | ✗ |
| 更新频率信号 | ✗（硬编码脱节） | ✓（lastmod 到 2026-08-13 + 页面标注） | — | ✓ | ✓（页面可见日期） | **✗ 停更 4 个月** | ✓ | ✓（每日 dateModified） |
| 技术 SEO | SSG 直出，强 | 强但有 canonical 硬伤 | 差（全站 soft-404） | **极强（14.8KB gzip 零 JS）** | 强 | 中（soft-404） | 强（国内 CDN<250ms） | 差（除对比页外 CSR 空壳） |
| 页面性能 | 强（外链 Google Fonts 减分） | 强 | — | 极强 | 强 | 中 | 强（国内） | 中 |
| 外链/域名权重 | 年轻域名（无法验证） | 无法验证 | 寄生 | 无法验证 | 主域 301 输血（4 个月站龄） | **2017 老博客全站导流** | 无法验证（2026-06 新站） | SaaS 官网自有权重 |
| 双语 | **✓ zh+en** | ✓ zh/en/zh-TW | — | ✗ 仅中文 | ✗ | ✗ | ✗ | ✗ |
| 商业模式透明度 | 高（affiliate 声明） | 高 | — | 高 | 中 | 中 | 中 | **低（自家产品塞推荐位）** |

## 2. SERP 格局关键事实（mmx 抽样）

1. **codingplan.org 在 15 个查询的 Top 10 全部缺席**；唯一进 Top 10 的独立竞站是 **coding-plan.org**（4 个词）。
2. 头部词 SERP 由 **CSDN / 博客园 / 腾讯云社区 / qq.com 新闻 / runoob** 等 UGC 与高权重大站内容主导——说明这些词的内容门槛并不高（单篇博客即可进 Top 10），缺的是**承接页 + 域名信任度**。
3. **教程意图词是最大流量池**：「Claude Code 配置 GLM/Kimi Coding Plan」「ccswitch 配置火山引擎」类文章反复出现在 GLM/Kimi/火山/阿里云等多个查询的 Top 10。
4. **邀请码/优惠词存在明确集群**：GitHub 优惠码仓库、博客园邀请码帖稳定排名（coding-plan.org 邀请码页 sitemap priority 0.9 印证其流量价值）。
5. 英文「coding plan comparison」Top 1 是 SourceForge 的 GLM vs OpenCode 对比页——英文对比词竞争弱、可切入。
6. 数据源限制：mmx 为单一聚合数据源，绝对排名需在 Google/Bing/百度中人工二次验证。

## 3. 竞品普遍做得比我们好的地方

1. **一词一页的意图分层**（coding-plan.org、club、creditsplan 共有）：邀请码、计算器、变更记录、模型评测各有专属 URL，而我们全靠首页。
2. **显式新鲜度信号**（6/7 竞品）：页面可见「最后更新」日期 + schema dateModified + sitemap lastmod 三者联动，且随数据变化真实更新。
3. **结构化数据更完整**：mcppla 的 ItemList+Offer、coding-plan.org 的 Product 多 Offer、creditsplan 的 UnitPriceSpecification、club 的 Article datePublished/dateModified——我们缺 WebSite/Article，dateModified 还是硬编码。
4. **页面规模**：club 292 页 / creditsplan 153 页的长尾覆盖面是我们的 8~15 倍。
5. **robots.txt 显式欢迎 AI 爬虫**（coding-plan.org、club 反例屏蔽）：面向 AI 搜索引用的布局意识。

## 4. 我们已经领先竞品的地方

1. **双语站**：coding-plan.org/mcppla/iamle/creditsplan/dxnt 全部只有中文；我们 /en 有 6 个英文详情页，英文词（coding plan comparison 等）竞争弱。
2. **单页内容深度与准确性**：我们的详情页是类型化数据驱动、口径统一（额度单位、价格日），club 的详情页 <2000 字符、creditsplan 模板化、dxnt 价格自注停更。
3. **技术底子**：SSG 直出 + 极小 JS + 干净 canonical/404/301，好于 fyi（全站 soft-404）、dxnt（CSR 空壳）、club（canonical 硬伤）。
4. **中立性**：dxnt 把自家产品塞进推荐位，club/fyi 内容农场化；我们的横向对比中立性符合 Google 评测内容准则，是长期信任资产。
5. **基础设施**：IndexNow、llms.txt、类型化数据源（新页面边际成本低）。

## 5. 最值得学习的 10 个策略

1. **意图分页**（coding-plan.org）：邀请码/优惠页、变更记录页、帮我选、额度计算器——每个高意图词一个 URL，priority 0.9。
2. **教程矩阵**（SERP 反推）：Claude Code/Codex/OpenCode 配置各平台 Coding Plan 的教程页——被 CSDN/博客园霸占但都是弱页面，独立站可竞争。
3. **Product + 多 Offer schema**（coding-plan.org/club/mcppla）：每档套餐一条 Offer（price/currency/availability），争取价格富摘要。
4. **三重新鲜度**（dxnt/mcppla/club）：页面可见日期 + schema dateModified + sitemap lastmod 同源联动，随数据更新真实变化。
5. **模型评测页矩阵**（club 292 页的核心）：/models/glm-5.2、/models/kimi-k3 等按模型建页，承接「模型名 + coding plan/价格/怎么样」长尾。
6. **对比页 A-vs-B**（SourceForge 第一页佐证英文需求；creditsplan 只做了 5 个 = 空位）：glm-vs-kimi 等程序化生成。
7. **问题型 FAQ 页**（coding-plan.org 三层 FAQPage）：「Coding Plan 是什么」「哪家最便宜」「5 小时限额是什么」各自落地并配 FAQPage schema。
8. **榜单页**（mcppla 单页 22 平台榜 + ItemList schema 吃头部对比词；coding-plan.org 的 JS 渲染榜是半成品）：SSG 模型榜/性价比榜可正面反超。
9. **meta description 嵌结论**（creditsplan）：「第 1 名 CodeBuddy ￥0/月」「入门月费相同，均为 ¥49」——描述直接给答案，抬升 CTR。
10. **老域名/主站导流**（iamle/club 主站、mcppla 裸域 301）：我们可用 GitHub 开源数据仓库 + 技术社区内容获得等效外链。

## 6. 不建议照搬的策略

1. **club 的三语全量铺开**（292 页）：详情页 <2000 字符的薄内容 + 栏目页 canonical 错误，是「scaled content」风险区；我们应少而厚（每页 ≥1500 字实质内容），先 zh/en 双语。
2. **fyi 的镜像/克隆**：无独立内容资产，全站 soft-404，随时可被算法清零。
3. **dxnt 的自家产品塞推荐位**：违反 Google 评测内容准则的中立性要求，消耗信任。
4. **mcppla/iamle 的全堆单页**：头部词可赢但长尾零承接——我们已有详情页矩阵，走相反方向。
5. **creditsplan 的 112 档位页正面硬拼**：国内 + ICP 备案 + 国内 CDN 是它的护城河，正面性价比低；我们侧翼（教程/英文/对比/模型页）进攻。
6. **robots.txt 屏蔽 AI 爬虫**（club）：自断 AI 搜索引用渠道。
7. **每日自动刷新 dateModified**（dxnt）：无真实内容变化的日期作弊信号，应与数据真实更新绑定。

## 7. SEO Gap 总结（按影响排序）

| # | Gap | 证据 | 影响面 |
|---|---|---|---|
| 1 | 无教程/工具/问题/邀请码/对比/模型/changelog 页型，长尾词零承接 | SERP 教程词被 UGC 霸占；coding-plan.org 意图分页进 Top10 | 流量上限 |
| 2 | 无新鲜度信号且 dateModified/lastmod 硬编码脱节 | 6/7 竞品三重 freshness；我们 2026-08-03 vs 实际 08-17 | 时效性词 |
| 3 | 无 og:image、详情页无 hreflang、无 WebSite schema | 线上实测 | 富摘要/国际化 |
| 4 | 内链体系薄弱：无语境化相关链接、专题页孤岛 | 详情页仅 footer 兄弟链接 | 权重传递 |
| 5 | Google Fonts 外链 | layout.tsx:23-25 | 国内 FCP/LCP |
| 6 | 品牌词不在 Top10、域名年轻外链少 | mmx 抽样；外链数据无法验证 | 全局信任度 |
