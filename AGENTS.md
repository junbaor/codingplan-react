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

## 当前数据要点（最近一次更新 2026-08-31）

- GSC P0 低 CTR 页 Title/Description 改造（2026/8/31，依据 8 月 GSC 数据）：glm coding plan（30,095 曝光/CTR 0.5%/排 7.7）、火山引擎 coding plan（13,542/0.8%/6.4）、智谱 coding plan（7,115/1.2%/6.5）、阿里云 coding plan（2,702/0.5%/8.5）四个已进前 10 但 CTR<2% 的词对应承接页（/plans/zhipu、volcengine、aliyun、kimi）title 按「完整搜索词前置 + 多少钱问句 + 价格数字 +（2026）」模板重写，description 改为「搜索词 + 数字承诺 + 行动指引」结构；两个关键修复：aliyun 页 title 此前只有官方名「Token Plan」完全不含「Coding Plan」（现补入「阿里云 Qwen Coding Plan」前置），kimi 页用官方名「Code Plan」而用户实际搜「coding plan」（现以「Kimi Coding Plan」前置、官方名括注保留）；英文侧同步改造（P1 卡位词）：/en/plans/glm title 补入 subscription（承接 glm subscription 1,729 曝光/排 9.2，改为「GLM Coding Plan Pricing 2026: Subscription Cost from $18/mo」），/en/plans/qwen title 此后无「Alibaba」与「Coding Plan」双缺失（现「Alibaba Coding Plan 2026: Qwen Token Plan from ¥39/mo」前置，承接 alibaba coding plan 1,315/10.4）；首页 title 8/19 刚做过体检优化本轮不动，页面内容与价格事实未变更。
- 全站渠道大同步（2026/8/28，DATA_UPDATED_AT 8/19→8/28）：六个调研线索（智谱、Kimi、MiniMax、百炼+火山、小米+OpenCode Go、Claude+ChatGPT）当日官网核实后全站更新。
- 智谱：GLM-5.3-Flash 8/26 上线全档（GLM-5 系首个原生多模态，320B/18B 激活，DeepSWE v1.1 63.4 超 5.2，编码近 Claude Opus 4.8，用量为 5.3 的 3 倍/积分系数更低，权重已 MIT 开源）；历史模型 5.2/5.1 调用自动路由至 5.3、5-Turbo/4.7 路由至 5.3-Flash；积分口径补 5h 档（2,000/12,000/28,000）+ 非高峰（周一至五 14:00-18:00 以外）5 折；GLM-5.3 旗舰权重 8/28 在 HF 放出；ZCode 1.5× 额度至 8/31；价格三档与海外 $18/$80/$168 不变。
- 火山：Pro 刊例 ¥200/首购 ¥49.9 上线（原「价格查询中」补齐），2.5 折普惠活动期 2026/6/8-11/8（Lite ¥9.9/Pro ¥49.9 前两月）；模型池大改：新增 GLM-5.3（8/14）、Doubao-Seed-Evolving（8/21，统一 ID 周级升级）、DeepSeek-V4-Pro 正式版（8/26），Kimi-K3 改为 Auto 模式路由（夜间 00:00-08:00 路由比例提升），GLM-5.2 将于 8/31 14:00 下线（加量 4 倍活动 8/8 已结束），Doubao-Seed-2.0-Code/Doubao-Seed-Code 已移除；推广链接更换为 activity/codingplan 长链。
- 百炼：Qwen3.8-Max 预览版转正（旧 ID 自动路由），新增 qwen3.8-flash、deepseek-v4-pro-0813、qwen-image-3.0-pro 与 qwen-audio-3.0 系（个人版 18 款/团队版 29 款）；官方文档口径仅 7 天 Credits 窗口（撤销站内 5h 档数字），优惠改为夜间 22:00-08:00 五折（qwen3.8-max + deepseek-v4-pro-0813）；早鸟价与团队席位不变。
- Kimi：价格五档不变；官方公告「新会员体系即将上线」（Kimi 权益与 Kimi Code 权益拆分、按需购买，订阅中用户不受影响、上线前购买锁定合并权益），新用户购买按钮变为「预约订阅」；模型侧新增 k3-256k 省额度版（256K 内效果同 K3、消耗约省一半、不支持视频输入）与 K2.7 Code 高速版（Allegretto 起，5-6 倍速）；Kimi CLI 8 月密集迭代（远程 Web 会话、多 Agent 编排）。
- MiniMax：国内三档不变；国际区重排为 Plus $22 / Max $55 / Ultra $132（Starter $10 与 Max HS $80 退役为遗留档，Ultra ~12.5B token/月）；Music 全系列 8/20 停止服务（开源版 MiniMax-Music3 在 HF/魔搭）；H3 8/3 开源；受邀 9 折/邀请返 10% 活动至 8/31；新增官方 Agent 应用 MiniMax Code。
- OpenCode Go：首月 $5 优惠 8/24 官方移除（changelog v1.18.24），统一 $10/月，「邀请双方各得 $5」官方页已不可见（全站撤销）；模型 18→24 款：新增 GLM-5.3、GLM-5.3-Flash（限时 2×）、LongCat-2.0、Muse Spark 1.2 Contributor（限地区）、Qwen3.8 Flash、DeepSeek V4 Flash Vision Exp，Grok 4.5→4.6；DeepSeek V4 系改峰谷计价；Go 提供商 8/20 起启用网页搜索。
- 小米：四档价格/Credits/夜间 0.8× 不变，无新模型；MiMo Claw 补首次 ¥14.9/月、限时 ¥19.9/月两档月付；新增邀请返利活动（好友首单 9 折、邀请人最高返 20%）。
- Claude/ChatGPT（英文站+首页卡片）：Claude 旗舰更替为 Fable 5（顶级）/Opus 5（7/24）/Sonnet 5（6/30）/Haiku 4.5（Opus 4.8 进 Legacy），价格不变，免费档升级为无限聊天，8/25 Cowork 内置浏览器、Claude in Chrome GA；ChatGPT Pro 改为 5x $100/20x $200 两档（From $100），GPT-5.6 家族（Sol/Terra/Luna）实为 7/9 GA（站内 8/6、8/7 日期修正），o4-mini/GPT-4o 归 Legacy，Luna API 7/30 降价 80%。
- 遗留修复：百炼旧价 ¥200/每日 9:30 补货在 leaderboard/deals/questions/agents 的残留全部改为 Token Plan 口径；Kimi「K2.6 可用」笔误全站改 K2.7；Grok 4.5/Opus 4.7/「18 款」引用同步更新；changelog 8 月段补 8/3、8/20、8/24、8/26、8/27、8/28 事件并修正 GPT-5.6 发布日期、7 月段补 Opus 5。
- 工具页合并（2026/8/21）：/ai-tools 独立页删除并在 next.config.ts 301 至 /agents（站点 50→49 URL），Qoder（本站邀请码 eoGXJ3J7rC3r1faxoxVeoERBoXnbLCxl）、Trae/TraeWork（本站邀请链接 work-fission/VUPSYKYLX55Y）、WorkBuddy（本站邀请码 boeaodw2co0）三款自带免费额度的国产工具以「自带免费额量的国产工具」表格低调并入 /agents 集合页，行链接直达官方下载页（带邀请参数，不展示活动规则文案），agentsHub 同步修复 canonical 误指 /tools 与 related 链已 301 的 /plans 两个遗留问题；页脚「工具新人礼」入口移除，deals.ts 撤销 /ai-tools 互链，hero 改为「9 款工具 · 怎么选怎么省」并新增两类工具差异 FAQ；CodeBuddy 曾短暂收录后按需求移除。
- DSH 介绍页英文版上线（2026/8/19）：新增 /en/deepseek-hermes（app/(en)/en/deepseek-hermes + topic-deepseek-hermes-en.ts，站点 47→48 URL），与中文版 /deepseek-hermes 互为 hreflang 姊妹页（zh↔en↔x-default 三向 alternates），DshHermesIntroPage 组件按 seo.locale 切换全部 UI 文案、页脚内链（en 页页脚链 /en/plans/glm|kimi|opencode-go）与插件库外链语言版本（中文→deepseek-plugin.org/zh/plugin，英文→deepseek-plugin.org/plugins），并新增头部语言切换入口；301 目标同步修正为中文版 zh/plugin（旧页内容为中文，语言一致）。
- 首页 SEO 体检修复（2026/8/19）：中文首页 title 由 70 字符压至 57 字符「AI Coding Plan 对比 2026：ChatGPT/Claude/GLM/MiniMax/Kimi 横评」（保留 5 品牌词，脱离原站 70 字符基线）；FaqList 问题由纯文本升级为 h3（原生 summary 内，全站 5 个使用方 FAQ 区标题均为 h2，层级正确，zh 首页 H3 由 1→11）；description 此前已在源码修至 151 字符（b51fc0e，线上仍为旧 101 字符版本，待部署生效）；DATA_UPDATED_AT 8/18→8/19。
- DSH 插件合集页下线并外迁（2026/8/19）：删除 /deepseek-harness-plugins 页面（含 DshHermesPage.tsx 与 topic-dsh-hermes.ts），站点 48→47 URL；新旧两个旧 URL（含拼写错误变体 plgins）在 next.config.ts 301 至姊妹站 https://deepseek-plugin.org/zh/plugin 传递权重（该站区分中英文版本，zh/plugin 为中文版，plugins 为英文版；/deepseek-hermes 为纯中文页，故全站链接与 301 均指向中文版）；/deepseek-hermes 介绍页 Hero 主按钮与页脚均外链至 DeepSeek 插件库；FaqList 升级支持 [text](url) 链接语法（渲染为可点击外链，JSON-LD 中转纯文本），介绍页 FAQ「在哪里可以找到 DSH 插件」以可点击链接指向插件库。
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
