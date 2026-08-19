# data/
> L2 | 父级: /src/AGENTS.md

## 成员清单
home.ts: 中文 9 平台与英文 6 平台首页数据、SEO 优化标题（zh 57 字符含 5 品牌）、推广参数、FAQ 和 SEO（中文导航含优惠入口）
metadata.ts: 将 SeoData 转换为 Next.js Metadata（含 og:image 大卡与 twitter summary_large_image），并提供全站 Metadata/Viewport
plans.ts: 九个中文平台详情数据、原站标题顺序、推广参数、套餐、模型、区块、FAQ 与 slug（definePlan 统一注入 zh 侧 hreflang）
plans-en.ts: 六个英文平台详情数据（Claude/GLM/MiniMax/Kimi/Qwen/OpenCode Go），与中文共用 PlanPage 模板（definePlan 统一注入 en 侧 hreflang）
compares.ts: 双语对比文章数据（glm-vs-kimi / claude-vs-glm），挂载于 /blogs 与 /en/blogs
guides.ts: Claude Code × 国产 Coding Plan 配置教程文章数据（GLM/Kimi/火山方舟，挂载于 /blogs）
questions.ts: 问题型长文数据（是什么/最便宜/哪个好，挂载于 /blogs）
blogs.ts: 博客集合索引（blogSlugs/blogsBySlug 与英文索引），把对比/教程/问答三类文章归一到 /blogs 命名空间
hubs.ts: 4 个集合首页数据（/blogs、/tools、/models、/en/blogs），保证每个二级路径都有 200 列表页（套餐集合由首页 #platforms 承接，/plans 已 301 至首页）
deals.ts: /deals 邀请码与优惠汇总页数据，聚合各平台首购/邀请/年付优惠
changelog.ts: /changelog 变更记录页数据，按月倒序的时间线表格
leaderboard.ts: /leaderboard 性价比榜单页数据（入门价排行 + 分项冠军），服务端直出全量表格
agents.ts: 6 个 AI 编程智能体页数据（Claude Code/Codex/OpenCode/Cursor/Cline/Roo Code），承接智能体×套餐查询
models.ts: 9 个旗舰模型评测页数据（GLM-5.3/GLM-5.2/K3/M3/Doubao/DeepSeek-V4/Qwen3.5/K2.7/GLM-5-Turbo），承接模型长尾查询
content-page.ts: defineContentPage 装配器，为内容页统一装配 Article/Breadcrumb/FAQ JSON-LD
content-links.ts: 详情页→内容矩阵的相关内链关系（getRelatedLinks 按 slug 与 locale）
plan-alternates.ts: zh↔en 跨语言等效套餐 slug 映射与 hreflang alternates 构造器
site-version.ts: DATA_UPDATED_AT 全站数据更新日期常量与 siteUrl，贯通 JSON-LD/lastmod/页脚时间戳
topic-deepseek-hermes.ts: DeepSeek Hermes 框架中文介绍页数据（架构、核心包、Turn 流程、事件系统与快速上手，含 zh↔en hreflang），由 /deepseek-hermes 路由消费
topic-deepseek-hermes-en.ts: DeepSeek Hermes 框架英文介绍页数据（与中文版同构，插件库外链指向英文版 deepseek-plugin.org/plugins），由 /en/deepseek-hermes 路由消费
seo.ts: WebSite/Organization/Article、WebPage、ItemList、Product/Service、Breadcrumb、FAQ 与内容页 JSON-LD 构造器（支持中英双语，日期信号统一取自 site-version）

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
