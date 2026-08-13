# data/
> L2 | 父级: /src/AGENTS.md

## 成员清单
home.ts: 中文 9 平台与英文 6 平台首页数据、原站标题基线、推广参数、FAQ 和 SEO
metadata.ts: 将 SeoData 转换为 Next.js Metadata，并提供全站 Metadata/Viewport
plans.ts: 九个中文平台详情数据、原站标题顺序、推广参数、套餐、模型、区块、FAQ 与 slug
plans-en.ts: 六个英文平台详情数据（Claude/GLM/MiniMax/Kimi/Qwen/OpenCode Go），与中文共用 PlanPage 模板
topic-dsh-hermes.ts: DeepSeek Hermes Plugin 插件合集页数据（含收录插件、分类、验证流程与开发指南），由 /dsh-hermes 路由消费
topic-deepseek-hermes.ts: DeepSeek Hermes 框架介绍页数据（架构、核心包、Turn 流程、事件系统与快速上手），由 /deepseek-hermes 路由消费
seo.ts: WebPage、ItemList、Product/Service、Breadcrumb 与 FAQ JSON-LD 构造器（支持中英双语）

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
