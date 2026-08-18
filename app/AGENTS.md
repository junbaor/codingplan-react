# app/
> L2 | 父级: /AGENTS.md

## 成员清单
(zh)/: zh-CN 根布局（含 WebSite/Organization 站点级 JSON-LD 与 next/font 自托管字体）、中文首页；二级路径统一为「集合根列表页 + [slug] 详情页」：plans（9 平台）、blogs（7 篇对比/教程/问答）、tools（6 工具）、models（8 模型）、deals/leaderboard/changelog 三个单页 hub；另含 deepseek-hermes 与 deepseek-harness-plgins 两个独立专题页。旧 compare/guides/questions/articles 路径在 next.config.ts 301 至 /blogs
(en)/: en 根布局（含中国套餐订购提示 banner 与站点级 JSON-LD）、英文首页、六个英文静态套餐详情路由与 en/blogs（hub + claude-vs-glm）英文博客路由
robots.ts: Next.js MetadataRoute 爬虫策略，输出 `/robots.txt`（显式放行 GPTBot/ClaudeBot/PerplexityBot 等 AI 爬虫）
sitemap.ts: Next.js MetadataRoute 站点地图，lastmod 与 DATA_UPDATED_AT 同源，收录全部集合 hub 与详情路由（49 URL）

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
