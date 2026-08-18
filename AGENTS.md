# codingplan-react - AI 编程套餐价格对比站的可迭代重写版
Next.js 16 + React 19 + TypeScript 7 + Tailwind CSS 4

<directory>
app/ - Next.js App Router、静态页面、Metadata 与爬虫入口（2路由组: (zh), (en)）
src/ - 共享组件、类型化业务数据和全局样式（3子目录: components, data, styles）
scripts/ - IndexNow 索引提交与验证文件生成脚本
public/ - Bing 验证、LLM 说明与企业微信二维码等静态资源
docs/ - 运维与内容文档（内容更新 SOP、SEO 调研、代码审查记录、Gist 推广内容）
</directory>

<config>
package.json - Next.js 依赖、开发、类型检查和生产构建命令
package-lock.json - npm 依赖锁文件，固定可重复安装版本
next.config.ts - Next.js 严格模式、TypeScript 7 CLI、响应头和旧静态 URL 重定向
next-env.d.ts - Next.js 自动生成的框架与类型化路由声明，禁止手工编辑
postcss.config.mjs - Tailwind CSS 4 PostCSS 编译配置
tsconfig.json - Next.js 严格 TypeScript 编译配置与路径别名
vercel.json - Vercel 构建命令覆盖，强制执行 npm run build 以触发 postbuild 反抄袭注入
README.md - 开发命令、App Router 架构与内容维护入口
</config>

## 架构约定

- 页面使用 Server Components，首页与枚举详情路由在构建期静态生成，并保留未来 ISR 能力。
- 套餐、模型、FAQ、SEO 元数据统一从 `src/data` 读取，避免页面间重复和漂移。
- UI 由 `src/components` 共享组件渲染，后续视觉重构不修改业务数据结构。
- 浏览器状态仅进入 ThemeToggle、Analytics 和 ContactDialog 客户端岛。
- Title、H 标题、keywords 缺失状态、canonical、统计 Key 与推广参数以原站 HTML 为兼容基线。
- 主题通过语义色 token 和 `data-theme` 切换，不在组件中硬编码颜色。

## 当前数据要点（最近一次更新 2026-08-18）

- 全站模型与套餐大同步（2026/8/18）：智谱 GLM-5.3（8/14 发布，Terminal-Bench 3.0 开源第一 28.3、编程体感较 5.2 +50%、全员额度重置）上线全量用户，新增 /models/glm-5.3 评测页（模型集合 8→9）；Kimi K2.6 全站更新为 K2.7/K2.7-Code（CLI 默认、GitHub Copilot 已接入）并补充 7/19 起暂停 C 端新订阅、逐步恢复的状态提示；火山方舟模型池补 Kimi-K3；阿里云百炼 Coding Plan 全面升级为 Credits 制 Token Plan（个人版早鸟 ¥39/¥139/¥499，Qwen3.8-Max 2.4T 首发尝鲜 + DeepSeek-V4-Pro 新增，双窗口 Credits，团队版席位 ¥150 起），中英文详情页/首页/Qwen3.5 模型页同步改写；changelog 补 8/14 GLM-5.3、7/20 百炼 Token Plan、7/19 Kimi 暂停订阅事件。

- 移除「全部套餐」集合页 /plans（2026/8/18）：首页已承载平台对比，/plans hub 页删除并在 next.config.ts 301 至 /#platforms，头部导航改为 工具/模型/博客/优惠 四项（SiteChrome defaultHeaderLinks），详情页面包屑与 blogs/tools/models 相关内链、BreadcrumbList JSON-LD 同步改指 /#platforms，sitemap 移除该 URL（49→48）。
- SEO P0 + 内容矩阵（2026/8/18）：新增 DATA_UPDATED_AT 新鲜度信号（src/data/site-version.ts，贯通 JSON-LD/lastmod/页脚）、og:image 大卡（public/og/default.png）、WebSite/Organization/Article schema、详情页 zh↔en hreflang（src/data/plan-alternates.ts）、可见面包屑与相关内链、robots 放行 AI 爬虫、next/font 自托管字体；内容矩阵 25 篇 + 4 个集合 hub（/blogs、/tools、/models、/en/blogs；套餐集合由首页 #platforms 承接），URL 规范统一为「二级路径=集合列表页 + [slug] 详情页」（plans 仅保留 [slug] 详情页），文章类（对比/教程/问答）三合一进 /blogs，旧 compare/guides/questions/articles 路径 301，站点 19→48 URL。方案依据见 docs/seo-research/09-codingplan-org-seo-plan.md。
- ChatGPT 渠道模型与定价同步官方最新（2026/8/17）：heading 改 GPT-5.6 Sol（Plus/Pro 主推，2026/8/7），models 由虚构的 GPT-5.3 更新为 ['GPT-5.6', 'o4-mini', 'GPT-4o']；Go 套餐价格 $10→$8（2026/1 全球推广实际价），Go details 由 GPT-5.3 mini 改为 GPT-5.6 Luna（免费版默认，2026/8/6）；Plus details 中 DALL-E 3 替换为 ChatGPT Images 2.0（2026/4 发布，基于 gpt-image-2），note 由过时的"年付 $200"改为"Pro $200/月"。
- 英文站新增六个渠道详情页（/en/plans/claude|glm|minimax|kimi|qwen|opencode-go），英文首页平台 5→6，OpenCode Go 在中英文首页渠道卡片与快速对比表格行内使用专属特殊推荐标识（specialBadge：性价比之王 / BEST VALUE，渐变绿样式 + 行淡绿高亮，区别于通用"强烈推荐"）。
- 英文站全站顶部提示：订购中国套餐（GLM/MiniMax/Kimi/火山/小米）可邮件 support.codingplan.org。
- OpenCode Go（2026/8/11 新增）：首月 $5，之后 $10/月，18 款开源模型 6 倍用量（5h $12 / 周 $30 / 月 $60），OpenAI / Anthropic 兼容 API，详情页 /plans/opencode-go 与 /en/plans/opencode-go，推广链接带 ref=JBT5KJRCD4。
- 智谱 GLM Coding Plan 改版：连续包月价 ¥118/¥538/¥1078（年付 7 折后约 ¥94.4/¥430.4/¥862.4/月），每周 Credits 制度（Lite 10K / Pro 60K / Max 140K），GLM-5.2 LMArena 代码榜开源第一。
- MiniMax Token Plan 新增 M2.5 / H3 / Speech 2.8 / Music 3.0，M3 + 全模态共享额度。
- Kimi Code Plan K3 已正式上线（2026/7/17 发布，2.8T 参数，1M 上下文），5 档套餐。
- 火山引擎方舟 Coding Plan 新接入 Doubao-Seed-2.1-turbo / Kimi-K2.7 / MiniMax-M3 / Deepseek-V4，限时首购 9.9 元起，加量不加价，Pro 价格官网待更新。
- 小米 MiMo Token Plan 5/26 起全档 Credits 升级 5-8 倍（492-9,840 亿/年），MiMo Claw 正式版上线（加购 ¥233.80/年）。
- 阿里云百炼 Lite 已停售，Pro ¥200/月每日限量补货。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
