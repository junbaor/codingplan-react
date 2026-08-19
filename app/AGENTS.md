# app/
> L2 | 父级: /AGENTS.md

## 成员清单
(zh)/: zh-CN 根布局（含 WebSite/Organization 站点级 JSON-LD 与 next/font 自托管字体）、中文首页；二级路径统一为「集合根列表页 + [slug] 详情页」：blogs（7 篇对比/教程/问答）、agents（6 个 AI 编程智能体）、models（8 模型）、deals/leaderboard/changelog 三个单页 hub；plans 仅保留 [slug] 详情页（集合入口由首页 #platforms 承接，/plans 在 next.config.ts 301 至 /#platforms）；另含 /deepseek-hermes 独立专题页（原 deepseek-harness-plugins 插件合集页已删除，旧 URL 与拼写错误变体均在 next.config.ts 301 至 https://deepseek-plugin.org/zh/plugin）。旧 compare/guides/questions/articles 路径 301 至 /blogs、/tools 路径 301 至 /agents
(en)/: en 根布局（含中国套餐订购提示 banner 与站点级 JSON-LD）、英文首页、六个英文静态套餐详情路由、en/blogs（hub + claude-vs-glm）英文博客路由与 en/deepseek-hermes 英文 DSH 专题页（与中文版互为 hreflang 姊妹页）
robots.ts: Next.js MetadataRoute 爬虫策略，输出 `/robots.txt`（显式放行 GPTBot/ClaudeBot/PerplexityBot 等 AI 爬虫）
sitemap.ts: Next.js MetadataRoute 站点地图，lastmod 与 DATA_UPDATED_AT 同源，收录全部集合 hub 与详情路由（48 URL）

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
