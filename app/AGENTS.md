# app/
> L2 | 父级: /AGENTS.md

## 成员清单
(zh)/: zh-CN 根布局（含 WebSite/Organization 站点级 JSON-LD）、中文首页、九个静态套餐详情路由、deals 优惠汇总与 changelog 变更记录两个 hub 页、compare/guides/questions 三个参数化内容路由、deepseek-hermes 框架介绍与 deepseek-harness-plgins 插件合集两个独立专题页
(en)/: en 根布局（含中国套餐订购提示 banner 与站点级 JSON-LD）、英文首页、六个英文静态套餐详情路由与 en/compare 英文对比路由
robots.ts: Next.js MetadataRoute 爬虫策略，输出 `/robots.txt`（显式放行 GPTBot/ClaudeBot/PerplexityBot 等 AI 爬虫）
sitemap.ts: Next.js MetadataRoute 站点地图，lastmod 与 DATA_UPDATED_AT 同源，收录 plans/en-plans/deals/changelog/compare/guides/questions 全部路由

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
