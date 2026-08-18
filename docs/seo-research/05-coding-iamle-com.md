# coding.iamle.com 竞品调研

> 调研日期：2026-08-18
> 调研方法：curl 抓取原始 HTML / 响应头 / robots.txt / sitemap 逐项分析；主站关系通过 www.iamle.com 抓取验证；收录情况尝试 mmx search 验证。
> 一句话结论：这是一个挂在老博客 iamle.com 下的**单页 Astro 静态站**（品牌"码力榜"），把全部内容与权重聚焦在一个 URL 上打"Coding Plan 对比"核心词，靠主站全站侧栏导流 + 返佣链接变现，但数据已 4 个月未更新，长尾覆盖为零——是"一根尖针"，不是"一张网"。

---

## 1. 网站定位

**目标用户**：已在使用 Claude Code / Cursor / Cline 等工具、想用国产模型订阅替代 Anthropic 官方订阅的中国开发者（对价格敏感、关注"5h 额度""倍数用量"等概念）。

**核心价值**：一站式横向对比 5 家国内 Coding Plan（智谱 GLM、MiniMax、Kimi、火山引擎方舟、阿里云百炼）+ GLM 国际版 Z.ai，覆盖价格、模型、限额、工具兼容性四维信息。

**首页表达**（抓取自 hero 区）：
- H1：`国内 Coding Plan 一站式对比平台`
- 口号：`看码力，选套餐 — 找到最适合你的 AI 编程方案`
- 数据点：`5 大平台 / ¥7.9起 首月 / 14+ 模型 / 20+ 工具`

**转化目标**：联盟返佣。首页全部 6 个平台出站链接均带返佣参数：
- 智谱：`bigmodel.cn/glm-coding?ic=Q3XTFPGAFJ`
- MiniMax：`platform.minimaxi.com/subscribe/token-plan?code=HmafKY6sAw`
- 火山：`volcengine.com/L/9owHQ-B8OQc/`（页面明示"通过此链接享9折"）
- 阿里云：`help.aliyun.com/...?source=5176.29345612&userCode=bux8jezm`
- Z.ai：`z.ai/subscribe?ic=RDZOIAUQCN`
- Kimi：`kimi.com/code?utm_source=coding.iamle.com`

**与 codingplan.org 的差异**：
| 维度 | coding.iamle.com | codingplan.org |
|---|---|---|
| 页面规模 | 1 页 | 约 19 页（中英双语 + /plans/[slug]） |
| 语言 | 仅中文 | 中英双语 |
| 关键词策略 | 全部堆首页（单点突破） | 一词一页（网状覆盖） |
| 数据新鲜度 | 2026-03-19（footer 标注），last-modified 2026-04-14 | 2026-08-17 |
| 变现 | 返佣 | 返佣 |
| 品牌人格 | 个人博客附属工具站 | 独立站点 |

**与主站 iamle.com 的关系**（已抓取验证，非猜测）：
- 主站 www.iamle.com 是 WordPress 7.0.4 博客"流水理鱼"（作者 wwek），generator 标签确认。
- 主站**全站侧栏 widget** 链向子站，锚文本：`码力榜-找便宜的AI编程套餐方案`——即博客每一个页面都在给 coding.iamle.com 传递内链。
- 主站存在 Coding Plan 长文导流，文末原文："**最后插个广告**：我搞了个对比网站 **码力榜**，把这 5 家平台的价格、模型、支持工具都整理成了表格……P.S. 文中有些链接带了（返佣）"——站长 openly 承认这是其博客的变现延伸。
- 备案：苏ICP备17011285号-1（来源 ip138 搜索结果快照），2017 年备案，域名站龄老。
- 技术细节：裸域 iamle.com **无 DNS A 记录**（dig 为空，curl 报 Could not resolve host），主站仅在 www，属配置瑕疵。

## 2. 页面清单与信息架构

**完整 URL 列表（以 sitemap 为准）**：

`https://coding.iamle.com/sitemap-index.xml` → `sitemap-0.xml`，urlset 中**仅 1 个 URL**：
```
https://coding.iamle.com/
```

**页面类型统计：首页 ×1，其余全为锚点分区。** 无对比页、无平台详情页、无教程页、无博客、无 FAQ 独立页、无工具页、无价格独立页。

**URL 层级设计**：不存在层级，导航全部为页内锚点：
```
#compare（快速对比表） / #global（GLM 国际版） / #platforms（平台详情）
#tools（工具兼容矩阵） / #recommendations（选购推荐） / #faq（常见问题）
```

**重要佐证**：任意路径（/about、/blog、/faq、/glm、/plans、/a/b/c/xyz123）均返回 HTTP 200 且内容与首页**逐字节相同**（md5 一致：`57c28939...`）——nginx try_files 全部回退 index.html，即**全站软 404**。

**页面内部结构**（首页六大区块，H2 实录）：
1. `快速对比` —— 5 平台榜单表（#1-#5 排名徽章、价格、模型 tag、用量、亮点、CTA）
2. `GLM 国际版 · Z.ai` —— 3 档卡片 + "价格快照 2026-04-14"
3. `平台详情` —— 5 张平台卡，每卡含 H3 平台名、核心模型、分档套餐
4. `工具兼容性矩阵` —— 15 工具 × 5 平台 ✓/— 表格 + "兼容性统计"汇总
5. `选购推荐` —— 6 张场景卡（新手尝鲜/日常编程/高速生成/多模型切换/重度使用/国际版）
6. `常见问题` —— 10 组 `<details>/<summary>` 折叠问答

## 3. 关键词策略

**策略定性：典型的"一个关键词集群全堆首页"**，与 codingplan.org 的"一词一页"完全相反。

- **首页 title**：`码力榜 | Coding Plan 对比 - 国内 AI 编程套餐横评`
  - 同时押注：`Coding Plan 对比`（核心词）、`国内 AI 编程套餐横评`（长尾）、品牌词`码力榜`前置。
- **meta description**：`国内 AI 编程套餐横向对比 - 智谱 GLM、MiniMax、Kimi、火山引擎方舟、阿里云百炼 Coding Plan 对比评测`——把 5 个平台品牌词全部塞进 description 增加 SERP 匹配面。
- **meta keywords**（仍在写，虽已被 Google 忽略）：`Coding Plan, AI编程套餐, 编程套餐对比, 智谱GLM, MiniMax, Kimi, 火山引擎, 阿里云百炼, Claude Code, Cursor`。

**关键词落点分析**：
| 关键词类型 | 落点页面 | 证据 |
|---|---|---|
| 核心词（Coding Plan 对比/横评） | 首页 title + H1 | title 实录见上；H1 `国内 Coding Plan 一站式对比平台` |
| 品牌词（智谱 GLM/MiniMax/Kimi/方舟/百炼） | 首页 H3 + description | H3 `智谱 GLM`、`MiniMax`、`火山引擎方舟`、`阿里云百炼`、`Kimi（月之暗面）` |
| 问题型词（什么是 Coding Plan/5小时额度/退款吗） | 首页 FAQ 区 + FAQPage schema | schema 实录 `什么是 Coding Plan？`、`5小时额度是什么意思？`、`套餐支持退款吗？` 等 10 问 |
| 对比型词（工具兼容性/平台支持哪些工具） | 首页 #tools 区块 | H2 `工具兼容性矩阵` |
| 购买意图词（性价比最高/哪个平台好/首月最低） | 首页 FAQ + 选购推荐卡 | FAQ `哪个平台性价比最高？`；推荐卡 `首月 ¥7.9` |
| 国际版词（GLM 国际版/Z.ai） | 首页 #global 区块 | H2 `GLM 国际版 · Z.ai` |

**没有的能力**：无 `/glm-coding-plan` 类独立详情页、无 "GLM vs MiniMax" 类对比页、无 "Claude Code 配置教程" 类内容页——所有长尾只能靠首页一个 URL 的段落竞争，"一个词一个专门页面"的策略完全不存在。

## 4. 内容 SEO

- **页面数量**：1（sitemap 为准）。约 5,586 个可见中文字符全部堆在单页，单页信息密度高但总量天花板明显。
- **内容深度亮点**（值得承认的原创内容）：
  - 15 工具 × 5 平台兼容矩阵，并附免责说明："以下兼容信息为各平台官方宣称支持的工具……"
  - 原创洞察型内容：FAQ 中"一次提问会消耗多少次请求？（5-30 次模型调用折算）"、"第三方模型延迟可能达到 10 秒级（官方渠道是秒级）"——这是真实使用经验，非通稿。
  - 排名化表达："#1 为性价比综合排名最高的平台"，制造"榜单"权威感。
- **H 结构**：H1 ×1 → H2 ×6（区块）→ H3（平台名/场景卡）→ H4（卡片内"核心模型/套餐方案"），层级干净规范。
- **表格**：2 张大表（快速对比表、工具兼容矩阵）——对"对比"搜索意图的匹配度极高，且表格是 LLM/Google 提取事实的友好结构。
- **FAQ**：10 问，页面用 `<details>/<summary>` 实现且内容与 JSON-LD 逐条一致（合规，无"schema 里有页面上没有"的作弊风险）。
- **更新时间标注**：footer `数据更新时间：2026年3月19日`；但正文另有 `价格快照 2026-04-14` 徽章，且 HTTP `last-modified: Tue, 14 Apr 2026`——两处标注不一致（footer 忘了更新），真实最后更新为 **2026-04-14，至今约 4 个月未更新**。
- **数据过时实例**（对比 codingplan.org 2026-08-17 数据）：其页面停留在 GLM-5/GLM-4.7、MiniMax M2.7、Kimi K2.5、Doubao-Seed-2.0-Code、`qwen3-max-2026-01-23` 时点；无小米 MiMo、无 OpenCode Go；智谱价格写 ¥49/¥149/¥469（旧价），与现行 ¥118 档新体系不符。
- **原创度**：表格数据来自官方公开信息重组，但"5h 额度折算""第三方延迟"等经验性内容具备原创性；无 AI 味通稿痕迹。

## 5. 页面级 SEO

首页 head 实测（curl 原始 HTML）：

| 项目 | 实测值 | 评价 |
|---|---|---|
| title | `码力榜 \| Coding Plan 对比 - 国内 AI 编程套餐横评`（约 24 字） | 品牌+核心词+长尾，结构佳 |
| meta description | 51 字，含 5 平台名 | 佳 |
| meta keywords | 10 个词 | 无用但无害 |
| canonical | `https://coding.iamle.com`（无尾斜杠） | 正确；结合软 404 全路径回首页，规范化集中权重——歪打正着 |
| og | type=website / title / description / url / image / locale=zh_CN，完整 | 但 og:image 实际 **404**（见下） |
| twitter | card=summary_large_image + title/description/image | 声明了但图片 404 等于白配 |
| hreflang | 无 | 纯中文站，合理 |

**og:image 404 证据**：meta 声明 `https://coding.iamle.com/og-image.png`，实测 `curl -o /dev/null -w` 返回 `404, size=153`——社交分享/部分 SERP 场景无图，是可直接利用的对手缺陷。

**JSON-LD 结构化数据清单**（共 2 个）：
1. `WebPage`：name/description/url/inLanguage=zh_CN。
2. `FAQPage`：10 组 Question/AcceptedAnswer，与页面可见内容逐条一致——**这是其最有机会拿 SERP 富摘要（FAQ 折叠展开）的资产**。

**缺失的 schema**：无 BreadcrumbList（单页无从面包屑）、无 Article、无 Product/Offer、无ItemList（其"榜单"表格本可用 ItemList 强化，未用）。

**对 codingplan.org 的可借鉴点**：
- FAQPage schema + 页面可见 `<details>/<summary>` 折叠 FAQ 的组合（如果我们 FAQ 数据在 src/data 中已有，加 schema 成本极低）。
- description 里堆平台品牌词扩大 SERP 匹配面。
- "价格快照 日期"徽章式的数据时效标注（但要避免其 footer/正文双日期不一致的翻车）。
- 可超越点：为每平台详情页加 Product/Offer + AggregateRating 类 schema、榜单页用 ItemList——对手全都没有。

## 6. 技术 SEO

- **框架**：Astro 静态生成（HTML 满是 `data-astro-cid-*` 作用域属性；0 个 `astro-island`，即 0 客户端水合组件，交互仅靠原生 details/summary + 少量内联 JS）。
- **SSR/SSG/CSR**：纯 SSG。HTML 79,856 字节，**完整正文服务端直出**，无 CSR 空壳问题；无 hydration JS，首屏即全内容。
- **响应头实测**：
  ```
  server: nginx
  content-length: 79856
  last-modified: Tue, 14 Apr 2026 04:26:30 GMT
  etag: "69ddc1f6-137f0"
  accept-ranges: bytes
  vary: Accept-Encoding
  ```
  **无 cache-control**（仅 etag/last-modified 协商缓存）；HTTP/2；IP 112.124.15.137（阿里云）。
- **资源**：单 CSS 文件 31,918 字节（`/_astro/index.BUkWO-F-.css`）；**全页 0 张 `<img>`**（无图片加载/lazy 问题，LCP 必然是文本，极快）；7 个 script 全部内联（6 inline + 0 外链 JS 文件）——首屏性能上限很高。
- **移动端**：viewport meta 正常；表格有 `table-container` 横滚容器适配。
- **robots.txt**：`User-agent: * / Allow: /`，指向 sitemap-index.xml——规范。
- **sitemap**：sitemap-index → sitemap-0，但 URL 条目**无 lastmod 字段**（放弃了向引擎声明更新频率的机会）。
- **404**：**无真 404**，任意路径 200 回首页（软 404），抓取预算与重复内容风险由 Google 自行判别。
- **重定向**：无可测重定向链；主站裸域 iamle.com DNS 不解析属主站配置问题。

## 7. Google 为什么可能给它比 codingplan.org 更好的排名

1. **老域名 + 主站全站内链权重注入（最可能的主因）**：iamle.com 是 2017 年备案、WordPress 架构下有 83+ 分页存量的个人博客，域名历史信任度高。其**全站侧栏 widget**（每个页面都存在）以锚文本"码力榜-找便宜的AI编程套餐方案"链向 coding.iamle.com，等于博客全站权重持续灌注一个子域 URL；另有 Coding Plan 主题长文正文内链。codingplan.org 是新独立域名，无此冷启动资源。
2. **权重绝对聚焦单 URL**：仅 1 个可排名页面，所有内外链、所有关键词（核心词+5 个平台品牌词+FAQ 问题词）全部汇聚首页，无内链稀释；对照 codingplan.org 约 19 页分摊权重，在"Coding Plan 对比"这个具体查询上其单页相关性/锚文本集中度更高。
3. **FAQPage 结构化数据带来 SERP 展示面积优势**：10 问 FAQ schema 与页面内容一致，有机会触发 FAQ 富摘要，占据 SERP 版面、抬升 CTR——codingplan.org 目前未部署等价 schema。
4. **搜索意图的表格化精准匹配**：查询"Coding Plan 对比/横评"的用户要的就是一张对比表，其首屏即时 5 平台榜单表（含价格/模型/用量/排名徽章），意图匹配度近乎满分；纯静态 0 图片 0 水合的页面性能（LCP 极低）进一步强化页面体验信号。
5. **"榜单+日期+免责声明"的 E-E-A-T 包装**：`#1-#5` 排名徽章、"数据更新时间"标注、"免责声明：本站信息仅供参考"与"整理不易"的人味署名，在个人开发者查询场景下可信度信号完整；且主站博主本人是真实开发者（原创经验内容如"第三方模型 10 秒延迟"），具备经验信号。

## 8. 弱点与可乘之机

**弱点（全部有实证）**：
1. **数据停更约 4 个月**：last-modified 2026-04-14；footer 写 2026-03-19；模型清单（GLM-5/GLM-4.7、M2.7、K2.5）与现行价格体系已过时，无小米 MiMo、无 OpenCode Go。Google 的 QDF（Query Deserves Freshness）与用户跳出会逐步反噬。
2. **长尾覆盖为零**：没有平台详情页、没有 "GLM vs MiniMax" 对比页、没有配置教程。codingplan.org 的 /plans/[slug] 体系可逐词收割其拿不到的流量。
3. **全站软 404**：任意路径 200 返回首页，重复内容风险 + 抓取预算浪费。
4. **og:image 404**：社交分享无图，白配了 twitter large image 卡片。
5. **无英文版**：英文市场完全空置（codingplan.org 已有 /en 全套）。
6. **无 ItemList/Breadcrumb/Product schema**：榜单表格本可用 ItemList 强化未用。
7. **sitemap 无 lastmod**：不向引擎声明更新。
8. **主站裸域 DNS 不解析**：外链若打到 iamle.com 裸域全部失效。

**可乘之机（codingplan.org 行动清单）**：
1. **以更新频率打时效战**：页面显著位置标注"数据更新于 2026-08-17"，并覆盖对手没有的渠道（小米、OpenCode Go、火山新模型），争夺"最新"心智与 QDF。
2. **逐平台详情页吃长尾**：对手无 /plans/glm 独立页，我们 6+ 详情页对"GLM Coding Plan 价格""Kimi Code Plan 套餐"类词形成页面数碾压。
3. **补 FAQPage schema**：对手用此拿富摘要而我们没有——把 src/data 中的 FAQ 生成 schema + details/summary 可见结构，直接对齐。
4. **加对比型专题页**："GLM vs MiniMax 哪个好"类对比词双方都无专门页面，先做先得。
5. **榜单页用 ItemList schema**：把首页快速对比表结构化，在 SERP 上反超其展示面积。
6. **确保 og:image 真实存在、全站无软 404**：对手翻车点即我们的卫生底线。

## 9. 无法验证的数据

以下数据本次调研手段无法获取，**不做任何编造**：
- 域名注册年龄（WHOIS 未查；仅有备案号 苏ICP备17011285号-1 的第三方快照佐证约 2017 年备案）
- 外链总数 / 引用域数 / DA / DR（无 Ahrefs/Majestic 数据）
- 自然搜索流量、排名关键词数、CTR（无 GSC/Semrush 数据）
- Google 实际收录量与收录页面列表：mmx search 不支持 `site:` 语法（实测返回无关结果），改搜品牌词"码力榜"前 8 条结果中**未出现** coding.iamle.com（出现了 coding-plan.org、cnblogs 横评文章等），但其真实收录与排名无法以此定论——用户侧观察"排名比我们高"作为输入采信
- 其各返佣链接的实际转化收入
- Google 是否已因其软 404 做出抓取惩罚（需 GSC 数据）

---

## 附：关键原始证据摘录

**sitemap-0.xml 全文（完整页面清单）**：
```xml
<urlset ...><url><loc>https://coding.iamle.com/</loc></url></urlset>
```

**首页 title / canonical / og**：
```html
<title>码力榜 | Coding Plan 对比 - 国内 AI 编程套餐横评</title>
<link rel="canonical" href="https://coding.iamle.com">
<meta property="og:image" content="https://coding.iamle.com/og-image.png">  <!-- 实测 404 -->
```

**主站导流锚文本（www.iamle.com 侧栏 widget，全站存在）**：
```html
<a href="https://coding.iamle.com" target="_blank"
   alt="国内 Coding Plan 一站式对比平台,看码力，选套餐...">码力榜-找便宜的AI编程套餐方案</a>
```

**主站博文导流原文**：
> 最后插个广告：我搞了个对比网站 码力榜，把这 5 家平台的价格、模型、支持工具都整理成了表格……P.S. 文中有些链接带了（返佣）

**HTTP 响应头**：
```
HTTP/2 200 | server: nginx | last-modified: Tue, 14 Apr 2026 04:26:30 GMT | etag: "69ddc1f6-137f0"
（无 cache-control）
```
