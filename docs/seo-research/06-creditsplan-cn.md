# creditsplan.cn 竞品调研

> 调研日期：2026-08-18。方法：curl 抓取原始 HTML / 响应头 / robots.txt / sitemap.xml，逐页分析 10+ 个代表性页面；mmx search 验证收录与排名。所有数据均来自实际抓取，无法验证项在第 9 节明确列出。

## 1. 网站定位

**目标用户**：中文开发者，想在国内用人民币购买/订阅 AI Coding 套餐（Claude Code / OpenCode 等工具 + 国产模型）的人。与 codingplan.org 覆盖 Claude/ChatGPT/OpenCode Go 等海外套餐不同，它**只做国产/国内可购套餐**。

**核心价值**（首页 H1 与首段原文）：
- H1：`中国 AI Coding 套餐价格与额度对比`
- 首段：`CreditsPlan 是中国 AI Coding 套餐价格与额度情报平台：对照官方来源核对 23 个品牌、112 个套餐的价格、额度、支持模型与使用条件，当前平均月付约 ¥626，提供完整价格历史、套餐比较与变动追踪，每条数据标注核对日期与官方来源。`

**转化目标**：不是联盟佣金导向。套餐页出站链接直接指向官方定价页（如 `https://bigmodel.cn/glm-coding`），且带 `rel="nofollow noopener noreferrer"` 与 `data-track="plan-out"` 埋点——转化目标是"被信任的数据源/决策工具"（配合付费开发者 API `developers.html`），而非导流佣金。robots.txt 里虽有 `/go/` 目录（Disallow），但抽查页面未发现 /go/ 推广链接。

**与 codingplan.org 差异**：

| 维度 | creditsplan.cn | codingplan.org |
|---|---|---|
| 覆盖范围 | 仅国产 23 品牌（火山/智谱/Kimi/MiniMax/千帆/腾讯云/华为云…） | 以海外套餐为主（Claude/ChatGPT/OpenCode Go）+ 中国套餐 |
| 页面规模 | 153+ 页（112 个套餐页 × 每档一页） | ~19 页 |
| 数据姿态 | "情报平台"：核对日期、官方来源、价格历史时间线 | 对比导购站 |
| 域名与托管 | .cn 域名 + 国内 CDN + ICP 备案 | .org + 海外托管（推断，未验证） |
| 语言 | 仅中文（hreflang 只有 zh-CN + x-default） | 中英双语 |
| 商业化 | 开发者 API（需申请 Key）+ GitHub 开源 | 推广链接 |

**ICP 备案情况**：有，且双备案——页脚显示 `湘ICP备2026019664号-1`（链接 beian.miit.gov.cn）和 `湘公网安备43062102000098号`（链接 beian.mps.gov.cn，带图片徽标）。这是百度/国内搜索引擎信任与收录的硬优势。

## 2. 页面清单与信息架构

**以 sitemap.xml 为准，共 153 个 URL**（`https://www.creditsplan.cn/sitemap.xml`，robots.txt 声明），全部带 lastmod（最新 2026-08-18）。

| 页面类型 | 数量 | URL 模式 | 示例 |
|---|---|---|---|
| 首页 | 1 | `/` | — |
| 静态内容页 | 4 | `/{name}.html` | `news.html`、`changelog.html`、`methodology.html`、`developers.html` |
| 栏目枢纽页 | 6 | `/{section}/` | `/brands/`、`/compare/`、`/price-changes/`、`/rankings/cheapest/`、`/advisor/`、`/reports/` |
| 价格月报 | 2 | `/reports/YYYY-MM/` | `/reports/2026-08/` |
| 品牌一对一对比页 | 5 | `/compare/{a}-vs-{b}/` | `kimi-vs-minimax`、`qoder-cn-vs-qwenwork`、`codebuddy-vs-trae`、`tencent-cloud-vs-volcengine`、`bigmodel-vs-kimi` |
| 品牌页 | 23 | `/brands/{slug}/` | `/brands/kimi/`、`/brands/volcengine/`、`/brands/deepseek/`… |
| 套餐详情页 | 112 | `/plans/{brand}-{tier}/` | `/plans/bigmodel-coding-pro/`、`/plans/kimi-k2.6-code-allegro/`、`/plans/xiaomi-mimo.pro/` |

**URL 层级设计**：扁平两极——枢纽页一层（`/brands/`），实体页两层（`/brands/{slug}/`、`/plans/{id}/`）。对比页放 `/compare/` 独立命名空间。静态页用 `.html` 后缀、动态数据页用目录形式，混用但一致性强。**每个套餐档位独立成页**（如 Kimi 的 Andante/Moderato/Allegretto/Allegro 四档四页），这是它页面量 8 倍于我们的根本原因。

**导航未入 sitemap 的页面**：`/deals/`（官方活动页，29KB，真实存在）和 `/model`（返回首页 HTML + canonical 指向 `/`）。/deals/ 无 canonical、未进 sitemap——这是它的 sitemap 覆盖漏洞。

## 3. 关键词策略

**核心打法：一个关键词一个专门页面，矩阵化覆盖，不堆首页。**

- **品牌词 → /brands/ 页**：title 模式 `{品牌名} AI Coding 套餐比较与价格 - CreditsPlan`。证据：`KIMI AI Coding 套餐比较与价格 - CreditsPlan`（/brands/kimi/）、`DeepSeek AI Coding 套餐比较与价格 - CreditsPlan`（/brands/deepseek/）。
- **品牌+档位长尾 → /plans/ 页**：title 模式 `{品牌} {档位} 价格 / 额度 / 权益 - CreditsPlan`。证据：`智谱 BigModel Pro 价格 / 额度 / 权益 - CreditsPlan`。112 页对应"智谱 Pro 多少钱""Kimi Allegro 额度"这类搜索。
- **对比型词（A vs B）→ /compare/ 页**：title 模式 `{A} vs {B}：AI Coding 套餐价格对比 - CreditsPlan`。证据：`KIMI vs MiniMax：AI Coding 套餐价格对比 - CreditsPlan`、`Qoder CN vs 千问办公：AI Coding 套餐价格对比 - CreditsPlan`。description 还内嵌数据钩子：`KIMI 与 MiniMax 的入门月费相同，均为 ￥49`（自动从数据生成）。
- **榜单型词（最便宜/多少钱）→ /rankings/cheapest/**：title `最便宜的国内 AI Coding 个人套餐排行榜（按月费） - CreditsPlan`，description 直接给出答案：`82 个公开月费的国产 AI Coding 个人套餐按价格从低到高排序：第 1 名 CodeBuddy 体验版（￥0/月）…`——针对"XX 套餐最便宜"类查询的摘要掠夺设计。
- **价格变动/历史词 → /price-changes/**：title `AI Coding 套餐价格变动时间线 - CreditsPlan`，description 强调差异化：`官方定价页只有当前价，CreditsPlan 保留历史`。148 条事件。
- **问题型词 → FAQPage JSON-LD + 页面 FAQ 区**：首页 6 问（`国内哪个 AI Coding 套餐最便宜？`、`国内 Coding Plan 支持 Claude Code 吗？`、`5 小时限额是什么意思？`、`首月优惠价划算吗？`），对比页/榜单页/套餐页各有 3 问 FAQPage schema。
- **选购意图词 → /advisor/**：title `AI Coding 套餐选购助手：哪个套餐最划算？ - CreditsPlan`（带 WebApplication schema）。
- **品牌词防御**：mmx search 搜"AI Coding 套餐对比"该站排第 1（工具型搜索代理，非百度实时排名）；搜"最便宜的 AI Coding 套餐"排第 2。

**关键词密度控制**：title 全部统一后缀 ` - CreditsPlan`，品牌词+品类词组合，无关键词堆砌。

## 4. 内容 SEO

**页面数量**：153（sitemap），其中 112 个数据详情页，内容生产是"数据驱动模板化生成"——一次数据更新，112 页同步再生。

**单页信息量（实测正文文本字符数）**：
- 首页 11,608 字符：23 张品牌表格（135 行 `<tr>`），每行含套餐名/月费/代表模型/**核对日期**，首段含实体数据（23 品牌、112 套餐、平均月付 ¥626）
- `/rankings/cheapest/` 6,115 字符：1 张 82 行大表 + FAQ
- `/price-changes/` 4,625 字符：按日期分组的 148 条涨降价事件（H2 = `2026-08-09 · 3 条涨价 · 新收录 7 个套餐`）
- 套餐页 `/plans/bigmodel-coding-pro/` 2,132 字符：11 个 H2（价格档位/套餐权益/适用人群/**风险提示**/计费与续费规则/月费价格变化/价格变动时间线/其它套餐/常见问题）
- 品牌页 717–1,277 字符（偏薄）
- 对比页 1,478–1,511 字符 + 2 张表

**H 结构**：严格单一 H1，H2 分节，首页 H2 直接用 23 个品牌名（品牌名本身是搜索词）。

**更新时间标注（杀手锏）**：每行数据、每个品牌页都标 `核对于 18 天前 · 2026-07-31` 式的相对+绝对双日期；sitemap lastmod 日更（首页 2026-08-17，deepseek 品牌页 2026-08-18）。这给搜索引擎持续的新鲜度信号。

**表格与榜单**：表格是核心形态（首页 23 张、榜单 82 行、对比页 2 张），完全服务端输出在 HTML 里。

**教程**：**没有**。无"怎么配置 Claude Code 接 GLM"类教程内容，news.html 是纯动态列表（HTML 正文仅 382 字符，靠 JS 加载）。这是它内容形态的空白。

**原创度**：品牌介绍直接引用官方文案（如 DeepSeek 页引用官方 slogan「不诱于誉，不恐于诽，率道而行，端然正己。」并注明来源）；核心原创价值在价格历史、核对日期、风险提示、对比结论（"入门月费相同，均为 ￥49"）——是数据原创而非文章原创。

## 5. 页面级 SEO

**全局一致（抽查 14 页全部命中）**：
- title：`{页面主题} - CreditsPlan`，含关键词前置
- meta description：每页独立撰写，且嵌入动态数据（价格、数量、排名、核对日期）
- canonical：每页自指（唯一例外：/deals/ 缺失）
- og: title/url/description/image（640×640 webp，带 og:image:type/width/height/alt 完整四件套）
- twitter:card=summary + title/description/image/alt
- hreflang：`zh-CN` + `x-default`（仅指自身，无 en 交替）

**JSON-LD 类型清单（按页面类型）**：

| 页面 | Schema 类型 |
|---|---|
| 首页 | Organization + WebSite（@graph）、FAQPage（6 问） |
| /brands/ | CollectionPage、Brand ×23、BreadcrumbList |
| 品牌页 | ItemList、BreadcrumbList（3 级：首页/品牌/品牌名） |
| 对比页 | ItemList、FAQPage（3 问）、BreadcrumbList |
| 套餐页 | **Product + Brand + Offer + UnitPriceSpecification**（真实价格 `price:"538", priceCurrency:"CNY"`，billingIncrement=1，unitCode=MON 月计费单位，availability=InStock）、FAQPage、BreadcrumbList |
| 榜单页 | ItemList（82 项）、FAQPage、BreadcrumbList |
| /advisor/ | WebApplication、Offer、BreadcrumbList |
| /price-changes/ | ItemList（148 事件）、BreadcrumbList |
| 月报页 | ItemList、BreadcrumbList |
| news/changelog/methodology/developers | 无 JSON-LD |

**值得 codingplan.org 借鉴**（按优先级）：
1. **套餐页 Product + Offer + UnitPriceSpecification**：我们把套餐做成数据页时，用 Product schema 携带真实月价，可获得价格富摘要；
2. **FAQPage 与正文 FAQ 双落地**：所有详情页配 3–6 个真问答（含 `5 小时限额是什么意思？` 这类概念解释题），同时输出 HTML 与 JSON-LD；
3. **对比页 description 嵌自动结论**（"入门月费相同，均为 ￥49"）——比"XX 与 YY 对比"干标题的点击率高；
4. **榜单页 title 直接给答案**（第 1 名/第 2 名/第 3 名写进 description）；
5. BreadcrumbList 全站覆盖 + 页面内可见面包屑（首页/品牌/智谱 BigModel/Pro）；
6. CollectionPage 用于品牌索引页。

## 6. 技术 SEO

**渲染方式**：**纯静态 HTML（SSG）+ 原生 JS 渐进增强**。无任何框架特征（无 _next/__nuxt/astro 标记）；脚本为手写模块 `./js/theme-init.js`、`./js/plans.e9ddd928ba01.js`、`/js/advisor.f7c4Be7b1ab4.js`（文件名带 hash，自建构建流水线）。样式为编译后的 Tailwind（`./styles.tailwind.0df29f050ab5.css`）。

**正文是否在 HTML**：是。首页 23 张表格、135 行全部在初始 HTML（93KB）内，`curl` 直接可见；另 preload 519KB `data.json` 供客户端筛选/排序（不影响 SEO，因为静态表已完整输出）。**例外**：news.html（382 字符）、changelog.html（475 字符）、/advisor/（712 字符）主要内容靠 JS 渲染——这三个页面对爬虫近乎空壳。

**性能（实测）**：
- 首页 TTFB 135–254ms / 总耗时 193–343ms（3 次）；套餐页 220ms/246ms
- Server: `ESA`（阿里云边缘安全加速 CDN，via 头显示 ens-cache 边缘节点）；图片走 `creditsplan.oss-cn-hangzhou.aliyuncs.com`（阿里云 OSS 杭州）
- 首页 93KB HTML、2 张图片（logo + 公安徽标，均 OSS webp/png）、无 loading=lazy（图片少到不需要）
- 缓存：`Cache-Control: no-cache` + ETag + Last-Modified（日更时间戳），`x-site-cache-status: DYNAMIC`——牺牲边缘缓存换数据即时性，但有 ETag 协商缓存兜底

**安全头（远超同行）**：完整 CSP（script-src 'self'，禁外链脚本）、CSP-Report-Only、HSTS(max-age 63072000)、X-Frame-Options: DENY、nosniff、Referrer-Policy、Permissions-Policy。

**sitemap/robots/404/重定向**：
- robots.txt：全站 Allow，明确**欢迎 13 个 AI/LLM 爬虫**（GPTBot、OAI-SearchBot、ClaudeBot、PerplexityBot、Google-Extended、Applebot、**Bytespider**、CCBot 等），Sitemap 指向 www 域
- **llms.txt 存在且高质量**：完整的站点地图 + 23 个品牌清单及摘要 + 数据集边界声明（"国际站是不同市场数据集，不是本网站的翻译版本"）——明确的 AI 搜索引用优化
- 404：返回真实 404 状态码（抽查 `/not-exist-page-xyz/`）
- www → 301 → 裸域；http → 301 → https，规范统一

**移动端**：Tailwind 响应式类（抽查 nav/表格），无独立 m 站。

**国内访问速度**：阿里云 ESA + 杭州 OSS，TTFB < 250ms，对国内三网用户快（本测试从海外/边缘节点测得，国内直连体验无法精确验证，但架构就是为国内优化的）。

## 7. 为什么它可能获得比 codingplan.org 更好的排名

1. **备案 + 国内 CDN 的合规优势**：湘ICP备2026019664号-1 + 公安备案 + 阿里云 ESA/OSS 全套国内基础设施。百度对备案站抓取更勤、信任权重更高，且国内访问毫秒级——这对百度排名是 codingplan.org（.org、海外托管、无备案）难以复制的结构性优势。
2. **153 页 vs 19 页的长尾矩阵**：112 个套餐页把"智谱 Pro 价格""Kimi Allegro 额度""火山方舟 Coding Lite 多少钱"等长尾查询逐一承接，每页独立 title/Product schema/canonical；5 个对比页承接 A-vs-B 词；榜单页承接"最便宜"词。我们 19 页无法覆盖这些长尾面。
3. **日更新鲜度信号 + 独占性数据资产**：sitemap lastmod 每天更新、每行数据带核对日期、148 条价格变动时间线 + 月报——搜索引擎对"持续更新的数据型页面"重抓频率高；"价格历史"是官方都没有的独占内容，天然吸引外链与引用。
4. **全静态 HTML 零框架开销**：93KB 单文件、表格全在 DOM、TTFB 250ms 内、LCP/CLS 几乎满分；对比我们 Next.js SSG 虽也是静态，但 JS bundle 更大，Core Web Vitals 极限速度略逊（且我们托管在海外）。
5. **AI 搜索双重优化（llms.txt + robots 白名单）**：明确欢迎 GPTBot/ClaudeBot/Bytespider/PerplexityBot 并提供结构化 llms.txt——在 AI 导流与百度 AI 搜索（文心引用生态）中抢占引用位，这在"AI Coding 套餐"这种技术向查询里尤其有效（用户常直接问 AI 助手）。

## 8. 弱点与可乘之机

1. **无教程/指南内容**：没有"Claude Code 接入国产套餐配置教程""学生认证优惠""发票/退款政策"等 how-to 内容。我们可以建教程+FAQ 内容层，抢问题型长尾。
2. **对比页只有 5 个**：23 个品牌理论上有 253 个两两组合，它只做了 5 个（自动化模板已就绪却没铺开）。我们的 /plans 详情页可系统化铺"A vs B"页。
3. **三个 CSR 空壳页**：news.html（382 字符）、changelog.html（475 字符）、/advisor/（712 字符）正文靠 JS 加载，爬虫抓不到内容——我们的对应页面做纯 SSG 即可反超。
4. **品牌页偏薄且文案照抄官方**：/brands/deepseek/ 仅 717 字符，品牌介绍直接引用官方文案（原创度低），Google/百度都可能判补充性内容。我们可写深度评测式品牌页。
5. **sitemap 覆盖漏洞**：/deals/（官方活动页）未进 sitemap 且无 canonical；/model 直接返回首页 HTML（软 404 式处理）。
6. **无英文版/无海外套餐**：只做中国市场。codingplan.org 的双语 + 海外套餐（Claude/ChatGPT/OpenCode Go）是其完全不覆盖的差异化空间——不必在它的主场（国产套餐长尾）硬拼，可用"国产套餐 × 英文市场"交叉词（如 "GLM coding plan pricing for overseas"）侧翼切入。
7. **站点极新、外链薄弱**（GitHub repo 2026-06-22 创建，6 stars）：权威度仍在爬坡期，codingplan.org 若尽快在中国套餐关键词上发布更深的对比内容仍有机会卡位。
8. **可借鉴后超越**：它的 Product/Offer/UnitPriceSpecification + FAQPage + 榜单 schema 组合我们可直接实现（Next.js SSG 完全支持），再加上我们的设计/双语优势。

## 9. 无法验证的数据

- **域名注册时间/年龄**：.cn WHOIS/RDAP 查询超时失败（仅能以 GitHub 仓库创建时间 2026-06-22 作为站点上线时间的近似证据）
- **百度实际收录量与排名**：无法直接查询百度索引（mmx search 为通用搜索代理，测得"AI Coding 套餐对比"第 1、"最便宜的 AI Coding 套餐"第 2，仅供方向性参考，非百度实时 SERP）
- **外链数量/质量、DA/DR**：未使用 Ahrefs/Semrush，无法验证
- **自然流量、点击量、热门页面**：无Similarweb等第三方数据，无法验证
- **百度站长平台提交/收录状态**：无法验证
- **国内直连访问速度**：测试发起地为非国内网络，仅能从架构（阿里云 ESA + 杭州 OSS）推断国内体验
- **creditsplan.com 国际站的流量与关系细节**：仅确认 sameAs 关联与导航互链，未深入调研（不在本次范围）
