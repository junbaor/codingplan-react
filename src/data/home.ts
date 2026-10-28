/**
 * [INPUT]: 依赖 types 的首页领域类型与 seo 的结构化数据构造函数
 * [OUTPUT]: 对外提供中文、英文首页的原站兼容标题、推广参数与全部类型化内容（含 kkcode 移动端 FAQ）
 * [POS]: data 的首页唯一数据源，同时驱动可见内容、标题结构与 JSON-LD
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { FaqItem, HomePageData, PlatformSummary } from '../types'
import { buildFaqJsonLd, buildHomeJsonLd } from './seo'

const zhFaqs: FaqItem[] = [
  { question: 'GLM Coding Plan 支持哪些模型？', answer: '智谱 GLM Coding Plan 所有套餐均支持 GLM-5.3（2026/8/14 发布，Terminal-Bench 3.0 开源第一）与 GLM-5.3-Flash（8/26 上线，GLM-5 系首个原生多模态模型，编码能力接近 Claude Opus 4.8）。调用历史模型 GLM-5.2/5.1 会自动切换到 GLM-5.3，GLM-5-Turbo/4.7 自动切换到 GLM-5.3-Flash。' },
  { question: 'GLM Coding Plan 现在的价格是多少？', answer: '智谱 GLM Coding Plan 连续包月价：Lite ¥118/月（年付 ¥94.4/月）、Pro ¥538/月（年付 ¥430.4/月）、Max ¥1078/月（年付 ¥862.4/月）；连续包季 8 折、包年 7 折。积分按 5 小时（2,000/12,000/28,000）+ 每周（10K/60K/140K）双窗口刷新，非高峰时段 5 折抵扣。' },
  { question: '什么是 Coding Plan？', answer: 'Coding Plan 是面向 AI 编程工具的订阅套餐。订阅后可在 Claude Code、Cursor、Cline 等工具中使用模型，通常按月、季或年付费，并按滚动窗口、周积分、月度 token 或 Credits 总量管理额度。挑选 Coding Plan 时，先确认常用工具与月用量，再对比各平台详情页的档位价格与额度口径。' },
  { question: 'Coding Plan 支持哪些编程工具？', answer: '大多数 Coding Plan 支持 Claude Code、Cursor、Cline、Roo Code、Kilo Code、OpenCode、OpenClaw、ZCode 等工具，具体支持范围因平台而异，详见各平台详情页。' },
  { question: '5小时限额 / 每周积分是什么意思？', answer: '不同平台额度口径不同：智谱 GLM 采用 5 小时 + 每周双窗口积分制，Kimi 新套餐采用 5 小时限额与月度共享额度，MiniMax 采用月度 token 总量，阿里云百炼采用 7 天 Credits 窗口，OpenCode Go 按模型分别设置美元额度与 5 小时、每周和每月限额。' },
  { question: '一次提问会消耗多少额度？', answer: '一次用户提问通常会触发分析、搜索、生成和验证等多个模型调用，常见约 5 至 30 次，实际消耗取决于工具、模型和上下文长度。' },
  { question: '哪个平台性价比最高？', answer: '入门体验推荐 MiniMax Go（¥49/月）、阿里云百炼 Token Plan Lite（早鸟 ¥39/月）或火山引擎方舟 Lite（首购 ¥9.9，刊例 ¥40，Pro 首购 ¥49.9）。看重模型多样性选火山引擎方舟，看重 MCP 工具选智谱 GLM（视觉理解 / 联网搜索 / 网页读取 / 开源仓库 MCP 已包含）。选购 Coding Plan 前先对照额度口径估算月消耗，避免档位买高或买低。' },
  { question: 'Kimi Code Plan 新版有哪些变化？', answer: '新会员套餐已上线，国内 Plus 起支持 Kimi Code。新套餐保留滚动 5 小时限额和月度共享额度，不设周限额；旧套餐可按原规则继续使用。' },
  { question: '可以退款吗？', answer: '各平台政策不同，大部分已激活订阅不支持退款。建议先从低档套餐开始体验，并在购买前确认自动续费和退款条款。' },
  { question: 'Coding Plan 能在手机上用吗？', answer: '可以。kkcode.app 是一款开源的 OpenCode 兼容移动客户端，支持 iOS 与 Android。订阅任意 Coding Plan 后，在 kkcode 里粘贴对应平台的 API Key 即可继续开发会话，支持会话历史、多模型切换，并兼容各平台 Coding Plan 的额度规则。' },
]

const zhPlatforms: PlatformSummary[] = [
  {
    id: 'chatgpt', name: 'ChatGPT', heading: 'ChatGPT · Codex 支持 GPT-6.1 Sol', subtitle: 'OpenAI 官方 AI 助手与编程智能体，模型随套餐和功能而异', accent: 'green',
    models: ['GPT-6.1 Sol（Codex / Work）', 'GPT-6 Luna（Codex）', 'GPT-6 Astra（Codex / Work）'], entryPrice: '$8/月', quota: '按套餐用量限制',
    plans: [
      { name: 'Go', badge: '轻度首选', price: '$8', unit: '/月', details: ['Codex 桌面端可用 GPT-6 Luna（逐步开放）', '适合轻量编程任务', '文件上传与图像生成'] },
      { name: 'Plus', badge: '最受欢迎', price: '$20', unit: '/月', note: 'Pro $100 / $200 / $500 每月', details: ['Codex / Work 支持 GPT-6.1 Sol 与 GPT-6 Luna', '支持深度研究与定时任务', '模型与额度以账号可用情况为准'], featured: true },
    ],
    tools: ['ChatGPT Web', 'Desktop', 'Mobile'], features: ['官方渠道', '网页浏览', '多模态'],
    cta: { label: '加企业微信咨询', contact: true },
  },
  {
    id: 'claude', name: 'Claude', heading: 'Claude · Opus 5.5 与 Claude Code', subtitle: 'Anthropic 官方订阅，模型与额度因套餐而异', accent: 'red',
    models: ['Fable 5.1', 'Opus 5.5', 'Sonnet 5.5', 'Haiku 5.5'], entryPrice: '$20/月', quota: 'Max 为 Pro 用量的 5× 或 20×',
    plans: [
      { name: 'Pro', price: '$20', unit: '/月', note: '年付折合 $17/月', details: ['包含 Claude Code', 'Opus、Sonnet 与 Haiku', 'Fable 使用额外用量积分', '上下文因模型而异'], featured: true },
      { name: 'Max', badge: '重度畅用', price: '$100-$200', unit: '/月', details: ['5× 或 20× Pro 用量', '高峰期优先保障', '新模型与功能优先'], featured: true },
    ],
    tools: ['Claude Code', 'Web', 'Desktop', 'VS Code'], features: ['Opus 5.5', 'Extended Thinking', 'MCP'],
    cta: { label: '加企业微信咨询', contact: true },
  },
  {
    id: 'aliyun', name: '阿里云百炼', heading: '阿里云百炼 Token Plan Qwen3.8-Max 转正 ¥39 起', subtitle: 'Credits 制 Token Plan，Qwen3.8-Max 正式版 + 18 款多模态模型共享额度，夜间五折', accent: 'orange',
    models: ['Qwen3.8-Max', 'qwen3.8-flash', 'deepseek-v4-pro-0813', 'qwen3.7-plus', 'qwen-image-3.0-pro', 'GLM'], entryPrice: '¥39/月', quota: '2,500-40,000 Credits/7天',
    plans: [
      { name: 'Lite', badge: '早鸟', price: '¥39', unit: '/月', note: '原价 ¥60 · 6.5 折', details: ['2,500 Credits/7天', '1-2 Agent 并发', '夜间 22:00-08:00 五折'] },
      { name: 'Standard', badge: '推荐', price: '¥139', unit: '/月', note: '原价 ¥180 · 7.7 折', details: ['10,000 Credits/7天', '3-4 Agent 并发', '夜间五折更省'], featured: true },
      { name: 'Pro', badge: '重度', price: '¥499', unit: '/月', note: '原价 ¥600 · 8.3 折', details: ['40,000 Credits/7天', '6-8 Agent 并发', '夜间五折更省'] },
    ],
    tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline'], features: ['Qwen3.8-Max 转正', 'Credits 制', '多模态共享', '夜间五折'],
    cta: { label: '查看详情', href: 'https://www.aliyun.com/benefit/scene/codingplan?source=5176.29345612&userCode=j0hv8tuh', detailHref: '/plans/aliyun', sponsored: true },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go 与 Go Plus · 多模型订阅', subtitle: 'Go $10/月、Go Plus $40/月；模型与额度按官方清单更新', accent: 'slate',
    models: ['GLM-5.3', 'Kimi K3.1 Pro', 'MiMo-V2.6', 'MiniMax M3.1 Flash', 'DeepSeek V4.1 Flash'], entryPrice: '$10/月', quota: '各模型额度不同 · 5 小时 / 每周 / 每月',
    plans: [{ name: 'Go', price: '$10', unit: '/月', details: ['多模型访问', '单成员工作区'], featured: true }, { name: 'Go Plus', price: '$40', unit: '/月', details: ['相同模型列表', '更高用量限额'] }],
    tools: ['OpenCode', 'Claude Code', 'Codex'], features: ['多模型', '按模型限额', '单成员工作区'],
    cta: { label: '查看详情', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/plans/opencode-go', sponsored: true },
  },
  {
    id: 'zhipu', name: '智谱 GLM',     heading: '智谱 GLM Coding Plan 连续包月 ¥118 起', subtitle: 'GLM Coding Plan 连续包月，GLM-5.3-Flash（8/26 新上线，原生多模态）+ GLM-5.3 旗舰全档可用，非高峰积分 5 折', accent: 'blue',
    models: ['GLM-5.3', 'GLM-5.3-Flash'], entryPrice: '¥118/月', quota: '2,000-28,000 积分/5h · 10K-140K/周',
    plans: [
      { name: 'Lite', price: '¥118', unit: '/月', note: '年付 ¥94.4/月', details: ['5h 2,000 · 每周 10,000 积分', 'GLM-5.3 / 5.3-Flash 全档可用', '支持 ZCode / Claude Code 等 20+ 工具'] },
      { name: 'Pro', badge: '推荐', price: '¥538', unit: '/月', note: '年付 ¥430.4/月', details: ['5h 12,000 · 每周 60,000 积分', '更快生成速度与高峰保障', '精选 MCP 工具'], featured: true },
      { name: 'Max', price: '¥1,078', unit: '/月', note: '年付 ¥862.4/月', details: ['5h 28,000 · 每周 140,000 积分', '首发接入最新旗舰模型', '高峰期专属资源优先保障'] },
    ],
    tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'], features: ['GLM-5.3-Flash 新上线', '4 类 MCP', '20+ 工具', '非高峰 5 折'],
    cta: { label: '查看详情', href: 'https://www.bigmodel.cn/glm-coding?ic=TOFGVCLIVG', detailHref: '/plans/zhipu', sponsored: true },
  },
  {
    id: 'minimax', name: 'MiniMax', heading: 'MiniMax M Plan · M3.1 Flash', subtitle: 'Go、Explore、Build 三档；包含 MiniMax Code，支持 API Key 接入编程工具', accent: 'orange',
    models: ['M3.1 Flash', 'H3', '图像与声音模型'], entryPrice: '¥49/月', quota: 'Explore 3 倍 / Build 12 倍 Go 用量',
    plans: [
      { name: 'Go', price: '¥49', unit: '/月', note: '首月 ¥24.5（至 10/31）', details: ['M3.1 Flash', '图像与声音模型', '不含视频模型'] },
      { name: 'Explore', price: '¥119', unit: '/月', note: '首月 ¥59.5（至 10/31）', details: ['3 倍 Go 用量', '含 H3 视频'], featured: true },
      { name: 'Build', price: '¥469', unit: '/月', note: '首月 ¥234.5（至 10/31）', details: ['12 倍 Go 用量', '含 H3 视频', '高峰优先'] },
    ],
    tools: ['MiniMax Code', 'Claude Code', 'Codex', 'Cursor', 'OpenCode'], features: ['M3.1 Flash', '多模态', 'API 接入'],
    cta: { label: '查看详情', href: 'https://platform.minimaxi.com/subscribe/token-plan?code=GhZIakShS0&source=link', detailHref: '/plans/minimax', sponsored: true },
  },
  {
    id: 'kimi', name: 'Kimi', heading: 'Kimi 新会员套餐 · Plus 起支持 Kimi Code', subtitle: '国内新套餐 Go 至 Ultra；编程权益与其他会员功能共享月度额度', accent: 'purple',
    models: ['Kimi K3', 'K3-256K'], entryPrice: '¥99/月起（编程）', quota: '滚动 5 小时限额 · 月度共享额度',
    plans: [
      { name: 'Go', price: '¥49', unit: '/月', details: ['不含 Kimi Code', '1 个 Agent 任务并行'] },
      { name: 'Plus', price: '¥99', unit: '/月', details: ['支持 Kimi Code 与 K3', '2 个 Agent 任务并行'], featured: true },
      { name: 'Pro', price: '¥199', unit: '/月', details: ['K3 最高 1M 上下文', '目标模式与 Kimi Claw'] },
      { name: 'Max', price: '¥699', unit: '/月', details: ['4 个 Agent 并行', '100 个项目'] },
      { name: 'Ultra', price: '¥1,399', unit: '/月', details: ['4 个 Agent 并行', '100 个项目'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'OpenCode'], features: ['K3', '5 小时限额', '月度共享额度'],
    cta: { label: '查看详情', href: 'https://www.kimi.com/code', detailHref: '/plans/kimi' },
  },
  {
    id: 'volcengine', name: '火山引擎方舟', heading: '火山引擎 方舟 Coding Plan 限时 2.5 折 · Pro ¥49.9 首购', subtitle: '模型最丰富：新接入 GLM-5.3 / Doubao-Seed-Evolving / DeepSeek-V4-Pro 正式版，Auto 调度可路由 Kimi-K3（活动至 11/8）', accent: 'cyan',
    models: ['Doubao-Seed-2.1-turbo', 'Doubao-Seed-Evolving', 'GLM-5.3', 'Kimi-K2.7-Code', 'DeepSeek-V4', 'MiniMax-M3', 'Auto 模式'], entryPrice: '¥9.9/月起', quota: 'Lite 首购 ¥9.9 / Pro 首购 ¥49.9（前两月）', availability: 'limited',
    plans: [
      { name: 'Lite', badge: '限时首购 ¥9.9', price: '¥40', unit: '/月', note: '刊例价 ¥40/月 · 受邀再 9.5 折', details: ['Doubao / GLM / DeepSeek / Kimi / MiniMax', '支持 Auto 模式', '活动期至 11/8，名额有限', 'Lite 满足个人开发者轻量需求'] },
      { name: 'Pro', badge: '推荐 · 首购 ¥49.9', price: '¥200', unit: '/月', note: '刊例价 ¥200/月 · 5 倍 Lite 用量', details: ['首两月 2.5 折 ¥49.9/月', '5 倍于 Lite 套餐用量', '支持 Auto 模式', '满足高阶用户大规模编程需求'], featured: true },
    ],
    tools: ['Claude Code', 'Cursor', 'Cline', 'Codex CLI', 'Kilo Code', 'OpenCode'], features: ['8+ 模型', 'Auto 模式', '限时 2.5 折', '受邀 9.5 折'],
    cta: { label: '查看详情', href: 'https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=33BB3T98', detailHref: '/plans/volcengine', sponsored: true },
  },
  {
    id: 'xiaomi', name: '小米 MiMo', heading: '小米 MiMo Coding Plan 5/26 全档 Credits 升级 5-8 倍', subtitle: 'MiMo-V2.6-Pro 旗舰 · MiMo Claw 首次 ¥14.9/月 或加购 ¥233.80/年 · V2 系列已下线', accent: 'orange',
    models: ['MiMo-V2.6-Pro', 'MiMo-V2.6', 'MiMo 全模态', 'MiMo TTS'], entryPrice: '¥39/月', quota: '492-9,840 亿 Credits/年',
    plans: [
      { name: 'Lite', price: '¥39', unit: '/月', note: '年付 ¥411.84（88折）', details: ['492 亿 Credits/年', 'V2.6 系列模型', '夜间 0.8x 消耗', 'TTS 限时免费'] },
      { name: 'Standard', price: '¥99', unit: '/月', note: '年付 ¥1,045.44', details: ['1,320 亿 Credits/年', '2.7× Lite 用量', '夜间 0.8x 消耗'] },
      { name: 'Pro', badge: '推荐', price: '¥329', unit: '/月', note: '年付 ¥3,474.24', details: ['4,560 亿 Credits/年', '9.3× Lite 用量', 'MiMo Claw 加购可选'], featured: true },
      { name: 'Max', price: '¥659', unit: '/月', note: '年付 ¥6,959.04', details: ['9,840 亿 Credits/年', '20× Lite 用量', '团队/发烧友首选'] },
    ],
    tools: ['OpenClaw', 'Codex', 'Claude Code', 'MiMo Code', 'OpenCode', 'Kilo Code', 'Cline', 'Cherry Studio', 'Qwen Code'], features: ['6 款模型', '5/26 升级 5-8 倍', '夜间 0.8x', '邀请返利至 20%'],
    cta: { label: '查看详情', href: 'https://platform.xiaomimimo.com/token-plan', detailHref: '/plans/xiaomi' },
  },
]

const enFaqs: FaqItem[] = [
  { question: 'What is a Coding Plan?', answer: 'A Coding Plan is a subscription that gives developers access to AI models in tools such as Claude Code, Cursor and Cline. Plans use rolling quotas, weekly credits, monthly tokens or credits instead of simple pay-per-token billing.' },
  { question: 'Which coding tools are supported?', answer: 'Most plans support Claude Code, Cursor, Cline, Roo Code, Kilo Code, OpenCode, OpenClaw and ZCode. Exact integrations vary by provider.' },
  { question: 'What does the 5-hour rolling limit mean?', answer: 'Quota windows differ by provider: GLM uses a 5-hour + weekly dual Credits window, Kimi Code uses a 5-hour quota refreshed every 7 days, MiniMax uses monthly tokens, Alibaba Cloud uses a 7-day Credits window, and OpenCode Go uses dollar-based limits ($12/5h, $30/week, $60/month).' },
  { question: 'How many model calls does one prompt use?', answer: 'A single developer prompt may trigger 5 to 30 model calls for planning, search, tool use, generation and validation. Providers count this activity differently.' },
  { question: 'Which plan offers the best value?', answer: 'Compare the models and limits you need: GLM Lite starts at $18/month, international MiniMax Go at $22/month, and Claude Pro at $20/month includes Claude Code. Prices and availability depend on region.' },
  { question: 'What is the latest GLM Coding Plan pricing?', answer: 'GLM Coding Plan charges Lite $18/mo ($12.6/mo yearly), Pro $80/mo ($56/mo yearly), Max $168/mo ($117.6/mo yearly). Quarterly billing gives a 20% discount and yearly billing 30% off. Credits refresh on both a 5-hour window (2,000/12,000/28,000) and weekly (10K/60K/140K); off-peak usage deducts 50% fewer Credits.' },
  { question: 'What is new in Kimi Code Plan?', answer: 'New membership plans are available. China plans include Kimi Code from Plus; new plans have a rolling 5-hour limit and a monthly shared quota, while legacy plans retain their rules.' },
  { question: 'Can I get a refund?', answer: 'Refund policies vary. Most activated subscriptions are non-refundable, so start with a lower tier and check renewal terms before purchase.' },
  { question: 'Can I use a Coding Plan on my phone?', answer: 'Yes. kkcode.app is an open-source mobile client for OpenCode-compatible providers, available on iOS and Android. After subscribing to any Coding Plan, paste the provider API Key into kkcode and continue coding on your phone with session history, multi-model switching, and the same quota rules as your desktop plan.' },
]

const enPlatforms: PlatformSummary[] = [
  {
    id: 'claude', name: 'Claude Code', heading: 'Claude Code · Opus 5.5', subtitle: 'Claude Code is included in Pro and Max; model availability depends on plan and usage.', accent: 'red',
    models: ['Claude Fable 5.1', 'Claude Opus 5.5', 'Sonnet 5.5', 'Haiku 5.5'], entryPrice: '$20/mo', quota: 'Pro / Max 5x / Max 20x',
    plans: [
      { name: 'Pro', price: '$20', unit: '/mo', note: '$17/mo annually', details: ['Claude Code and Cowork', 'Opus, Sonnet and Haiku; Fable uses usage credits', 'Unlimited projects', 'Cross-conversation memory'] },
      { name: 'Max 5x', badge: 'Popular', price: '$100', unit: '/mo', details: ['5x Pro usage', 'Priority access', 'Higher output limits'], featured: true },
      { name: 'Max 20x', price: '$200', unit: '/mo', details: ['20x Pro usage', 'Early feature access', 'Peak-hour priority'] },
    ], tools: ['Terminal', 'VS Code', 'JetBrains', 'Web'], features: ['Claude Opus 5.5', 'Extended Thinking', 'MCP'],
    cta: { label: 'View Claude plans', href: 'https://claude.com/pricing', detailHref: '/en/plans/claude' },
  },
  {
    id: 'glm', name: 'GLM Coding Plan', heading: 'GLM Coding Plan GLM-5.3 & 5.3-Flash from $18/mo', subtitle: 'Z.ai global plans · GLM-5.3-Flash (native multimodal, Aug 26) live for all tiers · Quarterly -20% · Yearly -30%', accent: 'blue',
    models: ['GLM-5.3', 'GLM-5.3-Flash'], entryPrice: '$18/mo', quota: '2K-28K Credits/5h · 10K-140K/week',
    plans: [
      { name: 'Lite', price: '$18', unit: '/mo', note: 'Yearly $12.6/mo (-30%)', details: ['2,000 Credits/5h · 10,000/week', 'GLM-5.3 & 5.3-Flash for all tiers', 'ZCode / Claude Code / 20+ tools'] },
      { name: 'Pro', badge: 'Best value', price: '$80', unit: '/mo', note: 'Yearly $56/mo (-30%)', details: ['12,000 Credits/5h · 60,000/week', 'Faster generation & peak priority', 'Curated MCP tools'], featured: true },
      { name: 'Max', price: '$168', unit: '/mo', note: 'Yearly $117.6/mo (-30%)', details: ['28,000 Credits/5h · 140,000/week', 'First access to new models', 'Peak-hour priority'] },
    ], tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'], features: ['GLM-5.3-Flash new', '4 MCP tools', '20+ integrations', '50% off-peak Credits'],
    cta: { label: 'Subscribe to GLM', href: 'https://z.ai/subscribe?ic=Q2I4GGSKVU', detailHref: '/en/plans/glm', sponsored: true },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go and Go Plus', subtitle: 'Go $10/month and Go Plus $40/month, with model-specific usage limits.', accent: 'slate',
    models: ['GLM-5.3', 'Kimi K3.1 Pro', 'MiMo V2.6', 'MiniMax M3.1 Flash', 'DeepSeek V4.1 Flash'], entryPrice: '$10/mo', quota: 'Model-specific 5-hour, weekly and monthly limits',
    plans: [{ name: 'Go', price: '$10', unit: '/mo', details: ['Multiple models', 'Single-member workspace'], featured: true }, { name: 'Go Plus', price: '$40', unit: '/mo', details: ['Same models', 'Higher usage limits'] }],
    tools: ['OpenCode', 'Claude Code', 'Codex'], features: ['Multiple models', 'Model-specific limits'],
    cta: { label: 'Explore OpenCode Go', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/en/plans/opencode-go', sponsored: true },
  },
  {
    id: 'minimax', name: 'MiniMax', heading: 'MiniMax M Plan · M3.1 Flash', subtitle: 'International Go, Explore and Build plans with MiniMax Code and API access.', accent: 'orange',
    models: ['M3.1 Flash', 'H3', 'Image and speech models'], entryPrice: '$22/mo', quota: 'Explore 3× / Build 7.5× Go usage',
    plans: [{ name: 'Go', price: '$22', unit: '/mo', details: ['M3.1 Flash', 'No video'] }, { name: 'Explore', price: '$55', unit: '/mo', details: ['3× Go usage', 'H3 video'], featured: true }, { name: 'Build', price: '$132', unit: '/mo', details: ['7.5× Go usage', 'H3 video'] }],
    tools: ['MiniMax Code', 'Claude Code', 'Codex', 'Cursor', 'OpenCode'], features: ['M3.1 Flash', 'Multimodal', 'API access'],
    cta: { label: 'Subscribe to MiniMax', href: 'https://platform.minimax.io/subscribe/token-plan', detailHref: '/en/plans/minimax' },
  },
  {
    id: 'kimi', name: 'Kimi Code', heading: 'Kimi Code · New membership plans', subtitle: 'China plans include Kimi Code from Plus; international plans have separate pricing.', accent: 'purple',
    models: ['Kimi K3', 'K3-256K'], entryPrice: '¥99/mo for coding', quota: 'Rolling 5-hour limit · monthly shared quota',
    plans: [
      { name: 'Go', price: '¥49', unit: '/mo', details: ['No Kimi Code'] },
      { name: 'Plus', price: '¥99', unit: '/mo', details: ['Kimi Code and K3'], featured: true },
      { name: 'Pro', price: '¥199', unit: '/mo', details: ['K3 up to 1M context'] },
      { name: 'Max', price: '¥699', unit: '/mo', details: ['4 concurrent Agent tasks'] },
      { name: 'Ultra', price: '¥1,399', unit: '/mo', details: ['4 concurrent Agent tasks'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'OpenCode'], features: ['K3', '5-hour limit', 'Monthly shared quota'],
    cta: { label: 'Start with Kimi', href: 'https://www.kimi.com/code?track_id=a7532112-efe3-4c65-a4e5-ae441848b1c5', detailHref: '/en/plans/kimi', sponsored: true },
  },
  {
    id: 'qwen', name: 'Qwen Token Plan', heading: 'Qwen Token Plan Qwen3.8-Max GA', subtitle: 'Alibaba Cloud Credits-based Token Plan: Qwen3.8-Max now GA, 18 models, night 50% off', accent: 'orange',
    models: ['Qwen3.8-Max', 'qwen3.8-flash', 'deepseek-v4-pro-0813', 'qwen3.7-plus', 'qwen-image-3.0-pro', 'GLM'], entryPrice: '¥39/mo', quota: '2,500-40,000 Credits/week',
    plans: [
      { name: 'Lite', badge: 'Early bird', price: '¥39', unit: '/mo', note: 'List ¥60 · 35% off', details: ['2,500 Credits/week', '1-2 concurrent Agents', 'Night 50% off'] },
      { name: 'Standard', badge: 'Recommended', price: '¥139', unit: '/mo', note: 'List ¥180 · 23% off', details: ['10,000 Credits/week', '3-4 concurrent Agents', 'Night 50% off'], featured: true },
      { name: 'Pro', badge: 'Heavy duty', price: '¥499', unit: '/mo', note: 'List ¥600 · 17% off', details: ['40,000 Credits/week', '6-8 concurrent Agents', 'Night 50% off'] },
    ], tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline'], features: ['Qwen3.8-Max GA', 'Credits-based', 'Multimodal sharing', 'Night 50% off'],
    cta: { label: 'Subscribe to Qwen', href: 'https://www.alibabacloud.com/en/campaign/ai-scene-coding?_p_lc=1', detailHref: '/en/plans/qwen' },
  },
]

function makeHome(locale: 'zh-CN' | 'en', platforms: PlatformSummary[], faqs: FaqItem[]): HomePageData {
  const isEn = locale === 'en'
  const title = isEn
    ? 'AI Coding Plan Comparison 2026 - Claude, GLM, MiniMax & More'
    : 'Coding Plan 对比 2026：ChatGPT/Claude/GLM/Kimi 横评'
  const description = isEn
    ? 'Compare AI coding subscriptions: Claude Code, GLM, MiniMax, Kimi and Qwen. Pricing, models, usage limits and tools side by side.'
    : '2026 年 9 款 AI Coding Plan 横评：ChatGPT、Claude、智谱 GLM、Kimi、MiniMax 等订阅的入门价格、模型阵容与额度口径对比，帮你选到最划算的 Coding Plan。'
  const canonical = isEn ? 'https://codingplan.org/en' : 'https://codingplan.org'
  const seo = {
    title, description, canonical, locale,
    alternates: [
      { lang: 'zh-CN', href: 'https://codingplan.org' },
      { lang: 'en', href: 'https://codingplan.org/en' },
      { lang: 'x-default', href: 'https://codingplan.org' },
    ],
    jsonLd: [buildHomeJsonLd(title, description, canonical, locale, platforms), buildFaqJsonLd(faqs)],
  } satisfies HomePageData['seo']

  return {
    locale, seo,
    nav: isEn
      ? { language: '中文', languageHref: '/' }
      : { language: 'EN', languageHref: '/en' },
    hero: isEn
      ? { badge: '2026 AI CODING SUBSCRIPTIONS', title: 'AI Coding Plans', highlight: 'Compared Side by Side', description: 'A practical comparison of price, model access, quotas and tool support, built from provider plan details.', stats: [{ value: '6', label: 'Platforms' }, { value: '$5', label: 'Lowest entry' }, { value: '20+', label: 'Coding tools' }] }
      : { badge: '2026 AI 编程订阅指南', title: 'AI Coding Plan', highlight: '全面对比', description: '把 9 家平台的 Coding Plan 价格、模型阵容、额度口径和工具支持放到同一张对比表里，不用再在多个官网之间反复核对。', stats: [{ value: '9', label: '平台横评' }, { value: '¥10', label: '活动最低月付' }, { value: '20+', label: '支持工具' }] },
    comparison: isEn
      ? { title: 'Quick Comparison', description: 'Current entry points and quota models at a glance.', columns: ['Platform', 'Entry price', 'Models', 'Usage', 'Status'] }
      : { title: '快速对比', description: '先看各款 Coding Plan 的起步价、核心模型和额度口径，再进详情页核对限制。', columns: ['平台', '起步价', '核心模型', '额度口径', '状态'] },
    platformsTitle: isEn ? 'Detailed Plans' : '详细方案',
    platformsDescription: isEn ? 'Compare tiers, limits and supported tools.' : '展开查看每家 Coding Plan 的档位价格、额度口径与支持工具，数据与各平台详情页保持一致。',
    platforms,
    faqTitle: isEn ? 'Frequently Asked Questions' : '常见问题',
    faqs,
    promotion: isEn
      ? { eyebrow: 'MOBILE OPEN SOURCE CLIENT', title: 'Got your Coding Plan? Code on mobile with kkcode.app', description: 'kkcode.app connects OpenCode and compatible providers on iOS and Android.', features: ['iOS & Android', 'Multiple models', 'OpenCode compatible'], cta: 'Learn more about kkcode.app' }
      : { eyebrow: '移动端开源客户端', title: '选好了 Coding Plan？ 用 kkcode.app 在手机上写代码', description: 'kkcode.app 是 OpenCode 移动客户端，可在 iOS 和 Android 上连接兼容的模型服务。', features: ['iOS / Android', '多模型切换', '兼容 OpenCode'], cta: '了解 kkcode.app' },
    footerDisclaimer: isEn
      ? 'Prices and quotas can change. Verify current details on the provider website. Some links are affiliate links.'
      : '价格和额度可能随时变化，请以各平台官网为准。本站部分链接为推广链接。',
  }
}

export const zhHome = makeHome('zh-CN', zhPlatforms, zhFaqs)
export const enHome = makeHome('en', enPlatforms, enFaqs)
