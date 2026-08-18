# dxnt.com/coding-plan-comparison 竞品调研

> 调研日期：2026-08-18
> 调研方法：curl 抓取原始 HTML / 响应头 / robots.txt / sitemap.xml + mmx 聚合搜索交叉验证
> 抓取样本：对比页（347,237 字节原始 HTML）、主站首页、/tokenplan、/pricing、/tutorials、/blog、robots.txt、sitemap.xml

---

## 1. 网站定位

**dxnt.com 不是电商/导航/资讯综合站，而是 "DX TOKEN" 这个 AI 模型聚合/中转服务（SaaS）的官方产品站。**

实际抓取证据：

- 首页 `<title>`：`DX Token Plan-coding plan|agent plan|生图套餐|生视频套餐`
- 首页 meta description：`DX TOKEN平台专注于提供各种token套餐(token plan)，包括coding plan和agent plan，以及AI生图套餐和AI生视频套餐，统一接口+智能路由，并提供特价按量付费token。`
- 首页 H1：`Coding Plan Token 聚合平台`
- 页脚品牌语：`DX TOKEN 智能 AI 模型中转网关`
- 对比页 FAQ 中的自述：`DX TOKEN 使用标准 OpenAI 协议，兼容上述所有主流工具`、`将 Base URL 替换为 Coding Plan 平台提供的代理地址（如 https://www.dxnt.com/v1）`

**业务模式**：DX TOKEN 卖的是"聚合套餐"（¥9.9/¥20/¥40/¥100 四档，一个 API Key 调用 GLM-5.2、Kimi-K2.6、MiniMax、Claude、DeepSeek 等 44+ 模型），本质是模型中转/聚合网关，与智谱 GLM Coding Plan、火山方舟 Coding Plan 是"渠道商 vs 厂商"关系。

**对比页在主站中的角色**：这是它的**转化漏斗核心页**——以"中立横评"外衣包装，把自家产品 DX TOKEN 塞进每一个对比表格并打上"推荐"标签。抓取统计：正文中 `DX TOKEN` 出现 **33 次**；总览表最后一行是 `DX TOKEN|推荐|¥9.9 / ¥20 / ¥40 / ¥100|聚合 44+ 主流模型|全工具兼容`；"不同人群推荐"三个人群（个人开发者/团队/企业）全部首推 DX TOKEN；页面右侧悬浮"免费试用"CTA；文末 H2 专门有一节 `DX TOKEN 的差异化能力`（多平台聚合/智能路由调度/故障自动切换三条 H3 纯产品卖点）。

**与 codingplan.org 的核心差异**：

| 维度 | dxnt.com/coding-plan-comparison | codingplan.org |
|---|---|---|
| 身份 | 利益相关方（自营产品对比竞品） | 中立第三方对比站（带推广链接） |
| 内容架构 | 单页打尽（1 个 URL 承载全部对比词） | 19 页矩阵（首页 + /plans/[slug] 详情 + 专题页） |
| 语言 | 仅中文（`lang="zh-CN"`） | 中英双语 |
| 转化目标 | 引导注册自家聚合套餐（¥9.9 起） | 推广链接跳转各厂商 |
| 内容形态 | 纯文字 + 4 表格，0 图片 | 卡片 + 表格 + 组件化 UI |

---

## 2. 相关页面清单与信息架构

**整站规模极小：sitemap.xml 仅 13 个 URL**（无子页面、无文章 URL），全部列出：

| URL | priority | changefreq | 角色 |
|---|---|---|---|
| `/` | 1.0 | daily | 首页 |
| `/tokenplan` | 0.9 | daily | 自家套餐产品页（title: `Coding Plan 对比推荐 2026｜GLM/Kimi/MiniMax/Claude 套餐低至¥9.9起｜DX TOKEN 聚合平台`） |
| `/coding-plan-comparison` | **0.9** | weekly | **本次调研对象** |
| `/pricing` | 0.8 | weekly | 模型按量价格页 |
| `/plans` | 0.8 | weekly | 套餐页 |
| `/free` | 0.7 | monthly | 免费额度页 |
| `/experts` | 0.7 | weekly | 专家/智能体页 |
| `/setup` | 0.7 | monthly | 一键配置生成器 |
| `/blog` | 0.6 | daily | 博客（纯 CSR，HTML 内无任何文章数据） |
| `/tutorials` | 0.6 | weekly | 教程列表（纯 CSR，无文章 slug 可见） |
| `/docs` | 0.5 | monthly | 文档 |
| `/about` | 0.4 | monthly | 关于 |
| `/status` | 0.3 | hourly | 服务状态 |

**关键信息架构事实**：

1. **coding-plan-comparison 位于全站主导航**。抓取首页/定价页/教程页等所有页面 HTML，header 导航均有 `<a href="/coding-plan-comparison">对比</a>`（桌面导航 + 移动端抽屉两处）。即：全站 13 页每一页都在给它传递内链权重，锚文本统一为"对比"。
2. **URL 层级为扁平一级**（`/coding-plan-comparison` 无父目录），与 /tokenplan 平级，sitemap priority 0.9 并列全站第二高，仅次于首页。
3. **对比页正文内链**：指向 `/pricing`（"DX TOKEN 套餐价格页"）和 `/setup`（"一键配置生成器"），其余 18 个内链基本是导航/页脚骨架。
4. **没有厂商详情页矩阵**：sitemap 中不存在 /plans/glm、/plans/kimi 之类的分厂商页面——与 codingplan.org 的 17 个详情页结构完全不同。它的"详情"就是表格里的单元格。
5. robots.txt 正常（`Allow: /`，仅 Disallow /api/ /v1/ /admin/ /console/ /auth/），声明 Sitemap: `https://www.dxnt.com/sitemap.xml`。
6. 裸域 `dxnt.com` 301 → `www.dxnt.com`，canonical 一致指向 www 版本，无重复收录问题。

**兄弟页面实测（均 curl 抓取）**：`/tokenplan`（title 含"Coding Plan 对比推荐 2026"和"低至¥9.9起"，与对比页争抢同一批词，见第 8 节）、`/pricing`（`模型价格-GLM/MINIMAX/KIMI价格｜特价`）、`/tutorials`（`Ai大模型接入ide教程`）、`/blog`（`博客 - DX TOKEN | AI技术文章与产品动态`）。**除对比页外，这些页面 HTML 正文文字仅 175~238 字符**（导航壳 + 客户端渲染），说明全站只有 coding-plan-comparison 一个页面做了完整的 SEO 内容输出。

---

## 3. 关键词策略

**Title（实测）**：
```
2026年Coding Plan对比推荐｜AI编程套餐横评｜聚合平台选购指南
```
三段管道符分隔，一次覆盖：`coding plan 对比`（核心词）+ `coding plan 推荐`（核心词）+ `AI编程套餐横评`（同义改写）+ `选购指南`（意图词）+ `2026年`（时效性修饰）。

**Meta keywords（实测，9 个）**：
```
coding plan 对比,coding plan 推荐,coding plan 聚合,token 聚合平台,AI 编程套餐对比,coding plan 哪家好,AI 编程套餐推荐,2026 coding plan,AI 编程 套餐 横评
```

**关键词布局方式：全部堆在这一页，没有专题矩阵。** 具体 coverage：

- **核心词**：coding plan 对比 / 推荐 / 横评（title + H1 + keywords 三处重复强化）
- **问题型词**（FAQ 6 问，同时进了 FAQPage schema）：
  1. `Coding Plan 是什么？`（定义词）
  2. `Coding Plan 和按量付费有什么区别？`（vs 对比词）
  3. `哪家 Coding Plan 最便宜？`（哪家好/最便宜——高频决策词）
  4. `Coding Plan 支持哪些编程工具？`（工具兼容词）
  5. `如何选择适合自己的 Coding Plan？`（选购决策词）
  6. `如何配置 Cursor 使用 Coding Plan？`（教程型长尾，同时是转化词）
- **厂商 × 价格长尾**：每个表格行都是 `平台名 + 具体价格` 组合（火山引擎方舟 ¥40/¥200、智谱 ¥49/¥149/¥469、MiniMax ¥49/¥119/¥469、阿里云百炼 Token Plan ¥39 起…），天然覆盖 "GLM coding plan 价格"、"火山方舟 coding plan 多少钱" 这类搜索。
- **工具词**：Cursor（8 次）、Claude（10 次）、Cline、OpenCode、CodeBuddy、TRAE、Roo Code 均在正文与表格中出现。
- **模型词**：GLM（22 次）、MiniMax（18 次）、Kimi（12 次）、百炼（12 次）、火山（15 次）、DeepSeek（6 次）、豆包（2 次）。

**H2/H3 结构即关键词地图**（实测）：

- H1：`2026 年 Coding Plan 对比推荐主流 AI 编程套餐横评榜单（每月更新）`——一个 H1 同时压"对比推荐/横评/榜单/每月更新"四个信号
- H2：`什么是 Coding Plan？` / `2026 主流 Coding Plan 平台清单` / `核心维度横向对比` / `不同人群推荐` / `常见问题 FAQ` / `DX TOKEN 的差异化能力`
- H3：`3.1 价格对比` / `3.2 模型覆盖对比` / `3.3 编程工具兼容性对比` / `个人开发者` / `团队协作` / `企业级用户`

注意它的 H2/H3 编号体系（`3.1/3.2/3.3`）模仿"章节化长文"，把 Google 喜欢的 "X vs Y / 价格 / 哪个好" 全部结构化为表格标题。

---

## 4. 内容 SEO

**内容长度**：正文可见文字（去空格、去 script/style）**约 5,364 字符**（≈5,300 汉字级别），28 个段落 + 4 个表格。属于"中等深度单页"，比典型 AI 生成万字长文短，比产品官网页长得多。

**H 结构**：1 个 H1 / 6 个 H2 / 9 个 H3，层级严格不跳级，H3 用编号分节。右侧带页面内目录（TOC：`什么是 Coding Plan / 主流平台清单 / 核心维度对比 / 不同人群推荐 / 常见问题 / DX TOKEN 优势`）——这是 Google 检测"结构化长内容"的加分 UI。

**4 个数据表格**（实测内容摘要）：

1. **总览表**：平台 ×（月费/支持模型/工具兼容/亮点），6 平台 + DX TOKEN
2. **价格档位明细表**（7,458 字节，全页最大表格）：平台 × 套餐档位 × 月费 × 调用次数，19 行级别的细颗粒度数据（如 `智谱 BigModel|GLM Coding Plan Lite|¥49/月|约 80 prompts/5h`）
3. **模型覆盖表**：主推模型/第三方接入/模型总数（如 `DX TOKEN|聚合 44+ 模型`）
4. **工具兼容表**：Cursor/Claude Code/Codex CLI/Cline/OpenCode/CodeBuddy/TRAE/Roo Code × 协议 × 支持情况

**FAQ**：页面可见 6 条问答（与 FAQPage JSON-LD 一一对应），每条答案 80~150 字，答案内自然植入 DX TOKEN（如"DX TOKEN 的 Coding Plan 起价约 ¥9.9/月"）。

**更新时间标注（三重信号，做得非常刻意但有效）**：

- 页面可见文字：`每月自动更新`（H1 后副标）+ 页脚 `本榜单对比数据均来自各平台官方公开文档，最近一次核实时间 2026 年`
- Article schema：`datePublished: 2026-01-15`，`dateModified: 2026-08-18`（**抓取当天**）
- sitemap.xml：该 URL `lastmod 2026-08-18T00:41:00.220Z`（注意：全站 13 个 URL 的 lastmod 是**同一个毫秒级时间戳**，说明是每次构建/请求自动生成的"当日时间戳"，并非真实内容编辑时间——这是程序化 freshness 信号）

**原创度**：非纯洗稿。表格中的调用次数、5h 限额、积分规则等数据有整理痕迹（含"阿里云 Token Plan Lite 为限时优惠价，Lite 已停售"这类时效注释），但所有结论段落明显导向自家产品，属于"半原创数据聚合 + 商业化点评"。

**人群分层推荐**：个人开发者/团队协作/企业级用户三段 H3，每段给出明确推荐组合——精准承接"XX 套餐适合谁"类搜索意图。

---

## 5. 页面级 SEO

实测 head 标签清单：

| 项目 | 实测值 | 评价 |
|---|---|---|
| title | `2026年Coding Plan对比推荐｜AI编程套餐横评｜聚合平台选购指南` | 多关键词 + 年份，标准打法 |
| meta description | 110 字左右，含 7 个平台名 + "每月更新" | 信息密度高，覆盖厂商名搜索的摘要命中 |
| meta keywords | 9 个词 | Google 已不使用，但写全了（可能照顾国产搜索引擎） |
| canonical | `https://www.dxnt.com/coding-plan-comparison` | 正确，与 www 301 一致 |
| lang | `zh-CN` | 单语 |
| **og: 标签** | **0 个** | **缺失**（无 og:title/og:description/og:image） |
| **twitter: 标签** | **0 个** | **缺失** |
| robots meta | 无（默认 index,follow） | 正常 |
| JSON-LD | **3 个**：Article + FAQPage(6 问) + BreadcrumbList | **全站最大亮点** |

三个 JSON-LD 实测摘要：

1. `Article`：headline/datePublished `2026-01-15`/dateModified `2026-08-18`/author `{"@type":"Organization","name":"DX TOKEN"}`
2. `FAQPage`：6 条 Question/acceptedAnswer 完整结构化（可竞争 SERP 的 FAQ 富摘要位——注：Google 现仅在首位结果展示 FAQ rich result，但结构化数据本身仍参与理解）
3. `BreadcrumbList`：首页 → Coding Plan 对比，两级面包屑

**值得 codingplan.org 借鉴的点**：

- ✅ **FAQPage schema 与页面可见 FAQ 一一对应**（codingplan.org 已有 FAQ 数据，应确认每个详情页/首页都输出 FAQPage JSON-LD）
- ✅ **Article schema + dateModified 与页面可见"更新时间"互相印证**（三重 freshness：可见文字 / schema / sitemap lastmod）
- ✅ **title 用管道符分隔多组关键词**，且把年份放最前
- ✅ **meta description 里列出全部被对比厂商名**（摘要能命中更多厂商名查询）
- ❌ 它没有 og/twitter 卡片——这是它的问题，codingplan.org 应该保持并领先（社交分享卡对 CTR 有间接帮助）

---

## 6. 技术 SEO

实测数据（curl -sI + 传输测量）：

| 项目 | 实测值 | 评价 |
|---|---|---|
| 框架 | Next.js（`X-Powered-By: Next.js`，响应头含 `Vary: rsc, next-router-state-tree...` RSC 特征） | 与 codingplan.org 同栈 |
| 服务器 | nginx | — |
| HTTP 版本 | **HTTP/1.1**（未启用 h2） | 落后，多请求场景下慢于 h2 站 |
| 渲染 | 对比页**完整 SSR/SSR 输出正文**（5,364 字符在 HTML 内），其余页面（tokenplan/pricing/tutorials/blog）仅导航壳，正文 CSR | 只有对比页做了内容 SEO |
| 页面大小 | 原始 347,237 字节，gzip 传输 102,326 字节 | 偏大（大量内联 Tailwind 类 + RSC payload） |
| 加载 | 全量下载 3.58s（含网络 RTT，本次测试线路） | TTFB 偏慢 |
| 缓存 | **`Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`** | **对所有页面（含静态内容页）禁缓存**，爬虫与用户每次回源，浪费抓取预算 |
| 图片 | **0 个 img 标签**，无 loading=lazy 问题 | 纯文字表格页，LCP 天然快 |
| 字体 | 2 个 woff2 `rel=preload; as=font`（Next.js 内置 geist 字体优化） | 标准 |
| CSS/JS | CSS 两个 chunk 均 `rel=preload; as=style` | 标准 |
| 安全头 | HSTS / CSP / X-Frame-Options / nosniff / Referrer-Policy 齐全 | 完整 |
| 重定向 | 裸域 301 → www，Location 正确 | 无链路问题 |
| 404 | 不存在路径返回真 404 状态码（nginx 层） | 正常 |
| 移动端 | 响应式（Tailwind 断点类 + 移动端抽屉导航在 HTML 中可见） | 正常 |

**结论**：技术 SEO 中等——对比页本身渲染与结构化数据合格，但 no-store 缓存策略、HTTP/1.1、无图纯文本大 HTML 都是硬伤；真正强的是"只对重点页面输出完整内容"的聚焦策略。

---

## 7. Google 为什么可能给它比 codingplan.org 更好的排名

> 以下基于抓到的证据推断，实际排名因素无法验证。

1. **真实商业实体带来的 E-E-A-T/信任优势**。dxnt.com 是有登录系统（/auth/login）、支付定价、服务状态页（/status，hourly 更新）、文档站的真实运营 SaaS。对"coding plan 对比"这类交易意图查询，Google 倾向于有真实实体、真实用户、真实运营记录的站点；纯联盟对比站的信任门槛天然更高。它的 Organization author、status 页、about 页构成了完整的实体信号。

2. **全站权重聚焦一个 URL，关键词不分散**。它整站只有 13 个 URL，coding-plan-comparison 拿到了 priority 0.9 + 全站 13 页 header 导航入口（统一锚文本"对比"）+ 正文内链。所有"对比/推荐/哪家好"权重全部汇聚到单一页面，没有关键词蚕食。codingplan.org 的 19 页矩阵（首页 + 17 个 /plans/[slug]）如果内链结构不当，"coding plan 对比"的权重会被详情页分走，主词页面竞争力被稀释。

3. **三重程序化 freshness 信号**。dateModified 每日刷新 + sitemap lastmod 全站当日时间戳（实测 13 个 URL 同一毫秒时间戳，纯程序生成）+ 页面可见"每月自动更新"文案 + changefreq weekly/daily。对于带年份的查询（"2026 coding plan 对比"），freshness 权重直接作用于排名。

4. **结果形态与搜索意图高度匹配**。对比类查询的 ideal result 是"表格 + 多厂商 + 价格 + 结论"，它一页给 4 个表格、19 行价格明细、人群推荐结论，零图片零干扰，信息密度/字节比极高，pogo-sticking 风险低。

5. **FAQPage schema 精准截流问题型查询**。6 条 FAQ 覆盖"是什么/哪家便宜/怎么选/怎么配置 Cursor"等高频长尾，配合 Breadcrumb 和 Article 形成 rich result 竞争力（codingplan.org 若未在每个页面输出完整三件套 schema，这一项就落后）。

（注意：任务背景假设 dxnt.com 是"综合大站靠内链权重取胜"——**实测不成立**，它只是个 13 URL 的小站。它赢在聚焦、实体信任和结构化执行，而不是规模。）

---

## 8. 弱点与可乘之机

1. **利益冲突是最大软肋**。每个表格都把 DX TOKEN 排最后但标"推荐"、"哪家最便宜"FAQ 答案首推自家、33 次自我提及、专设"DX TOKEN 的差异化能力"章节。按 Google 产品评测内容指南（self-interested review），这类页面在质量评估中有被压低的风险，且明眼用户跳出率高。**codingplan.org 的中立立场 + 真实优缺点 + 官方价格核对来源，是可以正面强调的差异化。**

2. **无厂商详情页矩阵 → 长尾全丢**。它没有 /plans/glm、/plans/kimi 这类页面，"GLM coding plan 怎么样 / kimi 套餐价格"等厂商词只能靠表格单元格命中。codingplan.org 的 17 个详情页 + 2 个专题页在长尾覆盖上是碾压级的，应把详情页做深（每厂商独立 FAQ、更新日志、优惠入口），并用清晰的 hub-and-spoke 内链把权重导向首页主词。

3. **内容深度其实有限**。5,364 字符、6 个 H2，就是"一页简介 + 4 张表 + 6 条 FAQ"。codingplan.org 可以在对比总览页做更多：各套餐真实额度换算（5h 窗口 vs 周窗口 vs 月额度折算成统一单价）、上下文长度/速率限制对比、适用人群测试结论等 DX TOKEN 没有的维度。

4. **无 og/twitter 卡片、无英文版**。codingplan.org 中英双语（英文站 6 个渠道详情页 + /en 首页）对它形成语言市场隔离；社交分享卡齐全也是低成本领先项。

5. **缓存策略糟糕 + HTTP/1.1 + blog/tutorials 纯 CSR 空壳**。它没有内容飞轮：博客无文章 URL 进 sitemap，教程页抓不到正文。codingplan.org 保持 SSG + 合理缓存头（immutable静态资源、HTML 短缓存）即可在抓取效率上领先。

6. **内部关键词自相残杀**：/tokenplan 的 title 是 `Coding Plan 对比推荐 2026｜GLM/Kimi/MiniMax/Claude 套餐低至¥9.9起`，与 /coding-plan-comparison 争抢完全相同的"coding plan 对比推荐"词根，且 /tokenplan 无正文内容（238 字符）。Google 若把权重错配到空壳的 /tokenplan，它自己会受伤。codingplan.org 应确保每个 URL 有唯一主词。

7. **价格数据有滞后风险**：页面自注"截至 2026 年 7 月"核实，而 sitemap 每日假装更新——若厂商调价（如智谱 7 折年付、火山加量），它的"每月更新"承诺会变成负面信任信号。codingplan.org 用 AGENTS.md 流程化同步价格（最近一次 2026-08-17）是真更新，可以显性标注"数据核对日期 + 变更记录"来拉开差距。

---

## 9. 无法验证的数据

以下数据本次调研手段无法获取，**不做任何编造**：

- 域名年龄 / WHOIS 注册信息
- 外链数量、引用域、锚文本分布（无 Ahrefs/Majestic 数据）
- DA/DR/PA 等第三方权重分
- 真实自然流量、排名位置、CTR（无 Search Console / 第三方流量数据）
- Google 实际索引量与收录时间（mmx 为聚合搜索非 Google 索引查询：`site:dxnt.com` 与 `dxnt.com coding-plan-comparison` 检索中仅确认 dxnt.com 首页出现，**未见 coding-plan-comparison 页的直接收录记录，无法确认该页当前索引状态**）
- 社交信号、品牌搜索量
- Core Web Vitals 实测值（未跑 Lighthouse，仅从 HTML/响应头推断）

---

## 附：本次抓取的关键命令与原始证据定位

```bash
curl -s https://www.dxnt.com/coding-plan-comparison   # 347,237 B 原始 HTML
curl -sI https://www.dxnt.com/coding-plan-comparison  # Next.js / nginx / no-store
curl -s https://www.dxnt.com/robots.txt               # Sitemap 声明
curl -s https://www.dxnt.com/sitemap.xml              # 13 URL，comparison priority 0.9
curl -s https://www.dxnt.com/                          # 主站定位证据
mmx search query --q "site:dxnt.com coding plan"      # 聚合搜索交叉验证
```

- 对比页 title：`2026年Coding Plan对比推荐｜AI编程套餐横评｜聚合平台选购指南`
- 对比页 H1：`2026 年 Coding Plan 对比推荐主流 AI 编程套餐横评榜单（每月更新）`
- 首页 title：`DX Token Plan-coding plan|agent plan|生图套餐|生视频套餐`
- 导航内链锚文本：`<a href="/coding-plan-comparison">对比</a>`（全站 header + 移动端菜单）
