# data/
> L2 | 父级: /src/AGENTS.md

## 成员清单
home.ts: 中文 9 平台与英文 6 平台首页数据、原站标题基线、推广参数、FAQ 和 SEO（中文导航含优惠入口）
metadata.ts: 将 SeoData 转换为 Next.js Metadata（含 og:image 大卡与 twitter summary_large_image），并提供全站 Metadata/Viewport
plans.ts: 九个中文平台详情数据、原站标题顺序、推广参数、套餐、模型、区块、FAQ 与 slug（definePlan 统一注入 zh 侧 hreflang）
plans-en.ts: 六个英文平台详情数据（Claude/GLM/MiniMax/Kimi/Qwen/OpenCode Go），与中文共用 PlanPage 模板（definePlan 统一注入 en 侧 hreflang）
compares.ts: 中英对比页数据（glm-vs-kimi / claude-vs-glm），承接「A vs B」商业调研查询
guides.ts: 三篇 Claude Code × 国产 Coding Plan 配置教程数据（GLM/Kimi/火山方舟）
questions.ts: 三篇问题型长文数据（是什么/最便宜/哪个好），承接信息型查询
deals.ts: /deals 邀请码与优惠汇总页数据，聚合各平台首购/邀请/年付优惠
changelog.ts: /changelog 变更记录页数据，按月倒序的时间线表格
content-page.ts: defineContentPage 装配器，为内容页统一装配 Article/Breadcrumb/FAQ JSON-LD
content-links.ts: 详情页→内容矩阵的相关内链关系（getRelatedLinks 按 slug 与 locale）
plan-alternates.ts: zh↔en 跨语言等效套餐 slug 映射与 hreflang alternates 构造器
site-version.ts: DATA_UPDATED_AT 全站数据更新日期常量与 siteUrl，贯通 JSON-LD/lastmod/页脚时间戳
topic-dsh-hermes.ts: DeepSeek Hermes Plugin 插件合集页数据（含收录插件、分类、验证流程与开发指南），由 /dsh-hermes 路由消费
topic-deepseek-hermes.ts: DeepSeek Hermes 框架介绍页数据（架构、核心包、Turn 流程、事件系统与快速上手），由 /deepseek-hermes 路由消费
seo.ts: WebSite/Organization/Article、WebPage、ItemList、Product/Service、Breadcrumb、FAQ 与内容页 JSON-LD 构造器（支持中英双语，日期信号统一取自 site-version）

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
