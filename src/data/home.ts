/**
 * [INPUT]: 依赖 types 的首页领域类型与 seo 的结构化数据构造函数
 * [OUTPUT]: 对外提供中文、英文首页的原站兼容标题、推广参数与全部类型化内容（含 kkcode 移动端 FAQ）
 * [POS]: data 的首页唯一数据源，同时驱动可见内容、标题结构与 JSON-LD
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { FaqItem, HomePageData, PlatformSummary } from '../types'
import { buildFaqJsonLd, buildHomeJsonLd } from './seo'

const zhFaqs: FaqItem[] = [
  { question: 'GLM Coding Plan 支持哪些模型？', answer: '智谱 GLM Coding Plan 支持 GLM-5.2（6月13日全量开放，发布即获 LMArena 代码榜开源模型第一、全球第二）、GLM-5.1、GLM-5-Turbo、GLM-5 和 GLM-4.7 等旗舰型号。GLM-5.2 支持 1M 上下文，面向长程任务。套餐使用每周积分（Credits）制度，逐步开放最新旗舰模型与功能。' },
  { question: 'GLM Coding Plan 现在的价格是多少？', answer: 'GLM Coding Plan 已改版为连续包月价：Lite ¥118/月（年付 ¥94.4/月）、Pro ¥538/月（年付 ¥430.4/月）、Max ¥1078/月（年付 ¥862.4/月）；连续包季 8 折、包年 7 折。Lite 每周 10,000 积分，Pro 6 倍 Lite 用量，Max 14 倍 Lite 用量。' },
  { question: '什么是 Coding Plan？', answer: 'Coding Plan 是面向 AI 编程工具的订阅套餐。订阅后可在 Claude Code、Cursor、Cline 等工具中使用模型，通常按月、季或年付费，并按滚动窗口、周积分、月度 token 或 Credits 总量管理额度。' },
  { question: 'Coding Plan 支持哪些编程工具？', answer: '大多数平台支持 Claude Code、Cursor、Cline、Roo Code、Kilo Code、OpenCode、OpenClaw、ZCode 等。具体支持范围因平台而异。' },
  { question: '5小时限额 / 每周积分是什么意思？', answer: '早期 Coding Plan 多采用滚动 5 小时窗口（如 GLM Pro/Max）。新版 GLM Coding Plan 改为每周积分（Credits）制，额度按周刷新；其他平台仍采用 5 小时窗口（如 Kimi Code、MiniMax M2.7）。' },
  { question: '一次提问会消耗多少额度？', answer: '一次用户提问通常会触发分析、搜索、生成和验证等多个模型调用，常见约 5 至 30 次，实际消耗取决于工具、模型和上下文长度。' },
  { question: '哪个平台性价比最高？', answer: '入门体验推荐 MiniMax Plus（¥49/月，6 亿+ token）或火山引擎方舟 Lite（首购 ¥9.9，刊例 ¥40）。看重模型多样性选火山引擎方舟，看重 MCP 工具选智谱 GLM（视觉理解 / 联网搜索 / 网页读取 / 开源仓库 MCP 已包含）。注意阿里云 Lite 已停售。' },
  { question: 'Kimi Code Plan 新版有哪些变化？', answer: 'Kimi 已上线 K3 旗舰（2.8T 参数 / 1M 上下文，2026/7/17 发布），套餐从 3 档扩展为 5 档：Adagio 免费、Andante ¥49、Moderato ¥99（K3 可用）、Allegretto ¥199（K3 + 集群 4 子任务）、Allegro ¥699（K3 解锁 1M 超长对话）。' },
  { question: '可以退款吗？', answer: '各平台政策不同，大部分已激活订阅不支持退款。建议先从低档套餐开始体验，并在购买前确认自动续费和退款条款。' },
  { question: 'Coding Plan 能在手机上用吗？', answer: '可以。kkcode.app 是一款开源的 OpenCode 兼容移动客户端，支持 iOS 与 Android。订阅任意 Coding Plan 后，在 kkcode 里粘贴对应平台的 API Key 即可继续开发会话，支持会话历史、多模型切换，并兼容各平台 Coding Plan 的额度规则。' },
]

const zhPlatforms: PlatformSummary[] = [
  {
    id: 'chatgpt', name: 'ChatGPT', heading: 'ChatGPT OpenAI 官方 GPT-5.3', subtitle: 'OpenAI 官方旗舰 AI 助手', accent: 'green',
    models: ['GPT-5.3', 'o4-mini', 'GPT-4o'], entryPrice: '$10/月', quota: '按套餐用量限制',
    plans: [
      { name: 'Go', badge: '轻度首选', price: '$10', unit: '/月', details: ['GPT-5.3 mini', '浏览与文件上传', '高于免费版的用量'] },
      { name: 'Plus', badge: '最受欢迎', price: '$20', unit: '/月', note: '年付 $200', details: ['GPT-5.3 / o4-mini / GPT-4o', '高级语音与 DALL-E 3', '深度研究与自定义 GPTs'], featured: true },
    ],
    tools: ['ChatGPT Web', 'Desktop', 'Mobile'], features: ['官方渠道', '网页浏览', '多模态'],
    cta: { label: '加企业微信咨询', contact: true },
  },
  {
    id: 'claude', name: 'Claude', heading: 'Claude Anthropic 官方 Opus 4.7', subtitle: 'Anthropic Opus 4.7 编程能力碾压', accent: 'red',
    models: ['Opus 4.7', 'Sonnet 4.6', 'Sonnet 4.5', 'Haiku 4.5'], entryPrice: '$20/月', quota: 'Pro 5× / Max 5×-20×',
    plans: [
      { name: 'Pro', price: '$20', unit: '/月', note: '年付折合 $17/月', details: ['比免费版多 5 倍用量', 'Opus 4.7 & Sonnet 4.6 全部可用', '200K 上下文', '包含 Claude Code CLI'] },
      { name: 'Max', badge: '重度畅用', price: '$100-$200', unit: '/月', details: ['5× 或 20× Pro 用量', '高峰期优先保障', '新模型与功能优先'], featured: true },
    ],
    tools: ['Claude Code', 'Web', 'Desktop', 'VS Code'], features: ['Opus 4.7', 'Extended Thinking', 'MCP'],
    cta: { label: '加企业微信咨询', contact: true },
  },
  {
    id: 'aliyun', name: '阿里云百炼', heading: '阿里云百炼 Coding Plan Qwen3.5 限量补货', subtitle: 'Qwen3.5 系列与第三方模型统一接入', accent: 'orange',
    models: ['Qwen3.5', 'Qwen3-Max', 'Qwen3-Coder-Next', 'Qwen3-Coder-Plus', 'GLM-5', 'GLM-4.7', 'Kimi-K2.5', 'MiniMax-M2.5'], entryPrice: '¥200/月', quota: '6,000 次/5h', availability: 'limited',
    plans: [
      { name: 'Lite', badge: '已停售', price: '¥40', unit: '/月', details: ['历史套餐', '18,000 次/月', '已停止新购和续费'], disabled: true },
      { name: 'Pro', badge: '每日限量', price: '¥200', unit: '/月', details: ['6,000 次/5h', '45,000 次/周', '90,000 次/月'], featured: true },
    ],
    tools: ['Claude Code', 'Cursor', 'Cline'], features: ['Qwen3.5 系列', '8+ 模型', '三重额度'],
    cta: { label: '查看详情', href: 'https://www.aliyun.com/benefit/scene/codingplan?source=5176.29345612&userCode=j0hv8tuh', detailHref: '/plans/aliyun' },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go 首月 $5 起 · 18 款开源模型 6 倍用量', subtitle: 'Grok 4.5 / GLM-5.2 / Kimi K3 / Qwen3.8 Max / DeepSeek V4 / MiniMax M3 全包含，OpenAI / Anthropic 兼容接口可接任意 Agent', accent: 'slate', specialBadge: '性价比之王',
    models: ['Grok 4.5', 'GLM-5.2', 'Kimi K3', 'Qwen3.8 Max', 'DeepSeek V4', 'MiniMax M3', 'MiMo-V2.5', 'Hy3'], entryPrice: '$5/首月', quota: '5h $12 / 周 $30 / 月 $60',
    plans: [
      { name: 'Go', badge: '首月 $5', price: '$10', unit: '/月', note: '6 倍用量 · 随时取消', details: ['18 款开源模型', '5h $12 / 周 $30 / 月 $60 额度', 'OpenAI / Anthropic 兼容 API', '邀请好友双方各得 $5'], featured: true },
    ],
    tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code'], features: ['18 款模型', '6x 用量', '$5 首月', '0 天数据保留'],
    cta: { label: '查看详情', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/plans/opencode-go' },
  },
  {
    id: 'zhipu', name: '智谱 GLM', heading: '智谱 GLM Coding Plan 连续包月 ¥118 起', subtitle: 'GLM-5.2 全量开放 1M 上下文，连续包季 8 折 / 包年 7 折；GLM-5.2 发布即获 LMArena 代码榜开源第一', accent: 'blue',
    models: ['GLM-5.2', 'GLM-5.1', 'GLM-5-Turbo', 'GLM-5', 'GLM-4.7'], entryPrice: '¥118/月', quota: '10,000-140,000 Credits/周',
    plans: [
      { name: 'Lite', price: '¥118', unit: '/月', note: '年付 ¥94.4/月', details: ['每周 10,000 Credits', '逐步开放最新旗舰模型', '支持 ZCode / Claude Code 等 20+ 工具'] },
      { name: 'Pro', badge: '推荐', price: '¥538', unit: '/月', note: '年付 ¥430.4/月', details: ['6× Lite 用量', '优先体验最新旗舰模型', '覆盖多款精选 MCP 工具', '更快生成速度'], featured: true },
      { name: 'Max', price: '¥1,078', unit: '/月', note: '年付 ¥862.4/月', details: ['14× Lite 用量', '首发接入最新旗舰模型', '高峰期专属资源优先保障'] },
    ],
    tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'], features: ['1M 上下文', '4 类 MCP', '20+ 工具', '每周 Credits'],
    cta: { label: '查看详情', href: 'https://www.bigmodel.cn/glm-coding?ic=TOFGVCLIVG', detailHref: '/plans/zhipu' },
  },
  {
    id: 'minimax', name: 'MiniMax', heading: 'MiniMax Token Plan M3 旗舰 + 全模态共享', subtitle: 'M3 旗舰 5/31 上线，月度 token 用量制；新增 M2.5 / H3 / Speech 2.8 / Music 3.0，老用户权益完整保留', accent: 'orange',
    models: ['MiniMax M3', 'M2.7', 'M2.7-highspeed', 'M2.5', 'H3', 'Speech 2.8', 'Music 3.0'], entryPrice: '¥49/月', quota: '6亿-71亿+ token/月',
    plans: [
      { name: 'Plus', price: '¥49', unit: '/月', note: '年付 ¥490', details: ['6亿+ token/月', '3-4 Agent 并发', '全模态共享额度'] },
      { name: 'Max', badge: '推荐', price: '¥119', unit: '/月', note: '年付 ¥1,190', details: ['18亿+ token/月', '4-5 Agent 并发', '视频 3 条/日'], featured: true },
      { name: 'Ultra', price: '¥469', unit: '/月', note: '年付 ¥4,690', details: ['71亿+ token/月', '6-7 Agent 并发', '视频 5 条/日'] },
    ],
    tools: ['Claude Code', 'Cursor', 'OpenCode', 'TRAE', 'OpenClaw', 'Cline'], features: ['全模态', '1M 上下文', 'Agent 并发', 'M3 + M2.7 共享'],
    cta: { label: '查看详情', href: 'https://platform.minimaxi.com/subscribe/token-plan?code=GhZIakShS0&source=link', detailHref: '/plans/minimax' },
  },
  {
    id: 'kimi', name: 'Kimi', heading: 'Kimi Code Plan K3 五档套餐', subtitle: 'K3 旗舰 7/17 发布（2.8T 参数 / 1M 上下文），Moderato 起可使用 K3，Allegro 解锁 1M 超长对话', accent: 'purple',
    models: ['Kimi K3', 'Kimi K2.6', 'Kimi Turbo'], entryPrice: '¥49/月', quota: '5h token 配额 / 7天刷新',
    plans: [
      { name: 'Adagio', badge: '免费', price: '¥0', unit: '/月', details: ['Kimi K2.6 / K2 可访问', '1 Agent 任务并行', '2 个项目 / 500MB 存储', 'K3 需 Moderato 及以上'] },
      { name: 'Andante', badge: '基础', price: '¥49', unit: '/月', note: '年付 ¥39/月', details: ['约 300-1,200 API 调用/5h', '每 7 天刷新', '20 个项目 / 20GB 存储', 'K3 需 Moderato 及以上'] },
      { name: 'Moderato', badge: '推荐 · K3 可用', price: '¥99', unit: '/月', note: '年付 ¥79/月', details: ['更大 token 配额', '可使用 Kimi K3 (2.8T 参数)', '2 Agent 并行 · 4 倍速度', '集群 2 子任务 · 完整会员权益'], featured: true },
      { name: 'Allegretto', badge: '高级 · K3 可用', price: '¥199', unit: '/月', note: '年付 ¥159/月', details: ['K3 + Agent 集群 40 次/月', '2 Agent 并行 · 4 倍速度', '集群 4 子任务 · 目标模式', 'Kimi Claw 群聊 10 个'] },
      { name: 'Allegro', badge: '顶级 · 1M 上下文', price: '¥699', unit: '/月', note: '年付 ¥559/月', details: ['K3 解锁 1M token 超长对话', 'Agent 4 任务并行 · 集群 8 子任务', 'Kimi Claw 群聊 10 个', '目标模式 · 云端/安卓/桌面端'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'], features: ['K3', '7天周期刷新', '5档套餐', 'AI 建站/文档/PPT'],
    cta: { label: '查看详情', href: 'https://www.kimi.com/code', detailHref: '/plans/kimi' },
  },
  {
    id: 'volcengine', name: '火山引擎方舟', heading: '火山引擎 方舟 Coding Plan 限时 9.9 元起 · 加量不加价', subtitle: '模型最丰富，新接入 GLM-5.2 / Doubao-Seed-2.1-turbo / Kimi-K2.7 / MiniMax-M3 / Deepseek-V4', accent: 'cyan',
    models: ['Doubao-Seed-2.1-turbo', 'Doubao-Seed-2.0-Code', 'Kimi-K2.7', 'Kimi-K2.5', 'GLM-5.2', 'DeepSeek-V4', 'MiniMax-M3', 'Auto 模式'], entryPrice: '¥9.9/月起', quota: 'GLM-5.2 等热门模型限时加量 4 倍', availability: 'limited',
    plans: [
      { name: 'Lite', badge: '限时首购 ¥9.9', price: '¥40', unit: '/月', note: '刊例价 ¥40/月 · 受邀再 9.5 折', details: ['Doubao / GLM / DeepSeek / Kimi / MiniMax', '支持 Auto 模式', 'GLM-5.2 限时加量 4 倍', 'Lite 满足个人开发者轻量需求'] },
      { name: 'Pro', badge: '推荐 · 价格查询中', price: '价格查询中', unit: '', note: '官网价格待更新 · 5 倍于 Lite 用量', details: ['5 倍于 Lite 套餐用量', 'Claude Max 数倍', '支持 Auto 模式', '满足高阶用户大规模编程需求'], featured: true },
    ],
    tools: ['Claude Code', 'Cursor', 'Cline', 'Codex CLI', 'Kilo Code', 'OpenCode'], features: ['8+ 模型', 'Auto 模式', '限时 9.9 元', '受邀 9.5 折'],
    cta: { label: '查看详情', href: 'https://volcengine.com/L/3sD5Ne_yUyk/', detailHref: '/plans/volcengine' },
  },
  {
    id: 'xiaomi', name: '小米 MiMo', heading: '小米 MiMo Coding Plan 5/26 全档 Credits 升级 5-8 倍', subtitle: 'MiMo-V2.5-Pro 旗舰 · MiMo Claw 正式版上线 · 加购 ¥233.80/年 · V2 系列已下线', accent: 'orange',
    models: ['MiMo-V2.5-Pro', 'MiMo-V2.5', 'MiMo 全模态', 'MiMo TTS'], entryPrice: '¥39/月', quota: '492-9,840 亿 Credits/年',
    plans: [
      { name: 'Lite', price: '¥39', unit: '/月', note: '年付 ¥411.84（88折）', details: ['492 亿 Credits/年', 'V2.5 全系列模型', '夜间 0.8x 消耗', 'TTS 限时免费'] },
      { name: 'Standard', price: '¥99', unit: '/月', note: '年付 ¥1,045.44', details: ['1,320 亿 Credits/年', '2.7× Lite 用量', '夜间 0.8x 消耗'] },
      { name: 'Pro', badge: '推荐', price: '¥329', unit: '/月', note: '年付 ¥3,474.24', details: ['4,560 亿 Credits/年', '9.3× Lite 用量', 'MiMo Claw 加购可选'], featured: true },
      { name: 'Max', price: '¥659', unit: '/月', note: '年付 ¥6,959.04', details: ['9,840 亿 Credits/年', '20× Lite 用量', '团队/发烧友首选'] },
    ],
    tools: ['OpenClaw', 'Codex', 'Claude Code', 'MiMo Code', 'OpenCode', 'Kilo Code', 'Cline', 'Cherry Studio', 'Qwen Code'], features: ['6 款模型', '5/26 升级 5-8 倍', '夜间 0.8x', 'MiMo Claw 可加购'],
    cta: { label: '查看详情', href: 'https://platform.xiaomimimo.com/token-plan', detailHref: '/plans/xiaomi' },
  },
]

const enFaqs: FaqItem[] = [
  { question: 'What is a Coding Plan?', answer: 'A Coding Plan is a subscription that gives developers access to AI models in tools such as Claude Code, Cursor and Cline. Plans use rolling quotas, weekly credits, monthly tokens or credits instead of simple pay-per-token billing.' },
  { question: 'Which coding tools are supported?', answer: 'Most plans support Claude Code, Cursor, Cline, Roo Code, Kilo Code, OpenCode, OpenClaw and ZCode. Exact integrations vary by provider.' },
  { question: 'What does the 5-hour rolling limit mean?', answer: 'Older plans used a rolling 5-hour window. The new GLM Coding Plan now uses weekly Credits that refresh every 7 days. Other providers (Kimi Code, MiniMax M2.7) still enforce a 5-hour window.' },
  { question: 'How many model calls does one prompt use?', answer: 'A single developer prompt may trigger 5 to 30 model calls for planning, search, tool use, generation and validation. Providers count this activity differently.' },
  { question: 'Which plan offers the best value?', answer: 'For budget-conscious developers, GLM Lite at $18/month or MiniMax Plus at $49/month (~$8 annual equivalent) are excellent entry points. For heavy usage, MiniMax Max or GLM Pro offer strong value. Claude Code Pro at $20/month remains the gold standard for model quality with Claude Opus 4.7.' },
  { question: 'What is the latest GLM Coding Plan pricing?', answer: 'GLM Coding Plan now charges Lite $18/mo ($12.6/mo yearly), Pro $80/mo ($56/mo yearly), Max $168/mo ($117.6/mo yearly). Quarterly billing gives a 20% discount and yearly billing 30% off. Lite ships with 10,000 weekly Credits, Pro is 6× Lite and Max is 14× Lite.' },
  { question: 'What is new in Kimi Code Plan?', answer: 'Kimi launched the K3 flagship (2.8T parameters, released 2026/7/17) and expanded the plan from 3 to 5 tiers: Adagio free, Andante ¥49, Moderato ¥99 (K3 unlocked), Allegretto ¥199 (K3 + 4 cluster subtasks), Allegro ¥699 (K3 with 1M-token conversations).' },
  { question: 'Can I get a refund?', answer: 'Refund policies vary. Most activated subscriptions are non-refundable, so start with a lower tier and check renewal terms before purchase.' },
  { question: 'Can I use a Coding Plan on my phone?', answer: 'Yes. kkcode.app is an open-source mobile client for OpenCode-compatible providers, available on iOS and Android. After subscribing to any Coding Plan, paste the provider API Key into kkcode and continue coding on your phone with session history, multi-model switching, and the same quota rules as your desktop plan.' },
]

const enPlatforms: PlatformSummary[] = [
  {
    id: 'claude', name: 'Claude Code', heading: 'Claude Code Gold Standard Opus 4.7', subtitle: 'Anthropic Claude Opus 4.7 programming powerhouse', accent: 'red',
    models: ['Claude Opus 4.7', 'Sonnet 4.6', 'Sonnet 4.5'], entryPrice: '$20/mo', quota: 'Pro / Max 5x / Max 20x',
    plans: [
      { name: 'Pro', price: '$20', unit: '/mo', note: '$17/mo annually', details: ['Claude Code and Cowork', 'Opus 4.7 & Sonnet 4.6 all available', 'Unlimited projects', 'Cross-conversation memory'] },
      { name: 'Max 5x', badge: 'Popular', price: '$100', unit: '/mo', details: ['5x Pro usage', 'Priority access', 'Higher output limits'], featured: true },
      { name: 'Max 20x', price: '$200', unit: '/mo', details: ['20x Pro usage', 'Early feature access', 'Peak-hour priority'] },
    ], tools: ['Terminal', 'VS Code', 'JetBrains', 'Web'], features: ['Claude Opus 4.7', 'Extended Thinking', 'MCP'],
    cta: { label: 'View Claude plans', href: 'https://claude.com/pricing', detailHref: '/en/plans/claude' },
  },
  {
    id: 'glm', name: 'GLM Coding Plan', heading: 'GLM Coding Plan GLM-5.2 from $18/mo', subtitle: 'Z.ai global plans with strong MCP support · Quarterly -20% · Yearly -30%', accent: 'blue',
    models: ['GLM-5.2', 'GLM-5.1', 'GLM-5-Turbo', 'GLM-5', 'GLM-4.7'], entryPrice: '$18/mo', quota: '10,000-140,000 Credits/week',
    plans: [
      { name: 'Lite', price: '$18', unit: '/mo', note: 'Yearly $12.6/mo (-30%)', details: ['10,000 Credits / week', 'Gradual access to latest flagship', 'ZCode / Claude Code / 20+ tools'] },
      { name: 'Pro', badge: 'Best value', price: '$80', unit: '/mo', note: 'Yearly $56/mo (-30%)', details: ['6× Lite usage', 'Priority flagship access', 'Curated MCP tools', 'Faster generation'], featured: true },
      { name: 'Max', price: '$168', unit: '/mo', note: 'Yearly $117.6/mo (-30%)', details: ['14× Lite usage', 'First access to new models', 'Peak-hour priority'] },
    ], tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'], features: ['1M context', '4 MCP tools', '20+ integrations', 'Weekly Credits'],
    cta: { label: 'Subscribe to GLM', href: 'https://z.ai/subscribe?ic=Q2I4GGSKVU', detailHref: '/en/plans/glm' },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go from $5/mo', subtitle: '18 open models (Grok 4.5, GLM-5.2, Kimi K3, DeepSeek V4, MiniMax M3) with 6x usage value, OpenAI / Anthropic compatible', accent: 'slate', specialBadge: 'BEST VALUE',
    models: ['Grok 4.5', 'GLM-5.2', 'Kimi K3', 'Qwen3.8 Max', 'DeepSeek V4', 'MiniMax M3', 'MiMo-V2.5', 'Hy3'], entryPrice: '$5 first mo', quota: '$12/5h · $30/wk · $60/mo',
    plans: [
      { name: 'Go', badge: '$5 first month', price: '$10', unit: '/mo', note: '6x usage value · Cancel anytime', details: ['18 open-source models', '$12/5h · $30/week · $60/month', 'OpenAI / Anthropic compatible APIs', 'Invite friends - both get $5'], featured: true },
    ],
    tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code'], features: ['18 models', '6x value', '$5 first month', '0-day retention'],
    cta: { label: 'View details', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/en/plans/opencode-go' },
  },
  {
    id: 'minimax', name: 'MiniMax Token Plan', heading: 'MiniMax Token Plan M3 Model', subtitle: 'International coding plans and high-speed models', accent: 'orange',
    models: ['M3', 'M2.7', 'M2.7-highspeed'], entryPrice: '$10/mo', quota: '100-2,000 prompts/5h',
    plans: [
      { name: 'Starter', price: '$10', unit: '/mo', details: ['100 prompts/5h', 'M2.7 standard speed', '$100/year'] },
      { name: 'Plus', price: '$20', unit: '/mo', details: ['300 prompts/5h', 'M2.7 standard speed', '$200/year'] },
      { name: 'Max', price: '$50', unit: '/mo', details: ['1,000 prompts/5h', 'M2.7 standard speed', '$500/year'] },
      { name: 'Max HS', badge: 'Top pick', price: '$80', unit: '/mo', details: ['1,000 prompts/5h', '100+ TPS high speed', '$800/year'], featured: true },
    ], tools: ['Claude Code', 'Cursor', 'Cline', 'OpenCode'], features: ['High-speed option', 'Long context', 'Broad integrations'],
    cta: { label: 'Subscribe to MiniMax', href: 'https://platform.minimax.io/subscribe/coding-plan', detailHref: '/en/plans/minimax' },
  },
  {
    id: 'kimi', name: 'Kimi Code', heading: 'Kimi Code Plan K3 New Model', subtitle: 'K3 flagship (2.8T parameters, 1M context, released 2026/7/17) + K2.6 across five tiers', accent: 'purple',
    models: ['Kimi K3', 'Kimi K2.6'], entryPrice: '¥49/mo', quota: '300-1,200 API calls/5h',
    plans: [
      { name: 'Adagio', badge: 'Free', price: '¥0', unit: '/mo', details: ['Kimi K2.6 / K2 access', '1 concurrent Agent task', '2 projects · 500MB storage', 'K3 requires Moderato or above'] },
      { name: 'Andante', price: '¥49', unit: '/mo', note: '¥39/mo annually', details: ['~300-1,200 API calls/5h', 'Quota refreshes every 7 days', '20 projects · 20GB storage', 'K3 requires Moderato or above'] },
      { name: 'Moderato', badge: 'Recommended · K3', price: '¥99', unit: '/mo', note: '¥79/mo annually', details: ['Larger quota', 'Kimi K3 flagship (2.8T parameters)', '2 concurrent Agent tasks', '2 cluster subtasks'], featured: true },
      { name: 'Allegretto', badge: 'Advanced · K3', price: '¥199', unit: '/mo', note: '¥159/mo annually', details: ['K3 + Agent cluster 40 times/mo', '2 concurrent Agent tasks', '4 cluster subtasks · Goal Mode', '10 Kimi Claw group chats'] },
      { name: 'Allegro', badge: 'Top · 1M Context', price: '¥699', unit: '/mo', note: '¥559/mo annually', details: ['K3 with 1M-token conversation capacity', '4 concurrent Agent tasks · 8 cluster subtasks', '10 Kimi Claw group chats', 'Goal Mode · Cloud / Android / Desktop'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'], features: ['Kimi K3', '5 tiers', '1M Context on Allegro', 'Weekly Refresh'],
    cta: { label: 'Start with Kimi', href: 'https://www.kimi.com/code?track_id=a7532112-efe3-4c65-a4e5-ae441848b1c5', detailHref: '/en/plans/kimi' },
  },
  {
    id: 'qwen', name: 'Qwen Coding Plan', heading: 'Qwen Coding Plan Limited Restock', subtitle: 'Alibaba Cloud plan with Qwen3.5 series and third-party models', accent: 'orange',
    models: ['Qwen3.5', 'Qwen3-Max', 'Qwen3-Coder-Next', 'Qwen3-Coder-Plus', 'GLM-5', 'GLM-4.7', 'Kimi-K2.5', 'MiniMax-M2.5'], entryPrice: '$50/mo', quota: '6,000 requests/5h', availability: 'limited',
    plans: [
      { name: 'Lite', badge: 'Discontinued', price: '$10', unit: '/mo', details: ['Historical plan', '1,200 requests/5h', '18,000/month'], disabled: true },
      { name: 'Pro', badge: 'Limited stock', price: '$50', unit: '/mo', details: ['6,000 requests/5h', '45,000/week', '90,000/month'], featured: true },
    ], tools: ['Claude Code', 'Cursor', 'Cline'], features: ['Qwen3.5 Series', '8+ models', 'Triple quota'],
    cta: { label: 'Subscribe to Qwen', href: 'https://www.alibabacloud.com/en/campaign/ai-scene-coding?_p_lc=1', detailHref: '/en/plans/qwen' },
  },
]

function makeHome(locale: 'zh-CN' | 'en', platforms: PlatformSummary[], faqs: FaqItem[]): HomePageData {
  const isEn = locale === 'en'
  const title = isEn
    ? 'AI Coding Plan Comparison 2026 — Claude, GLM, MiniMax & More | codingplan.org'
    : 'AI Coding Plan 对比 2026 - ChatGPT / Claude / GLM / MiniMax / Kimi 等套餐横评'
  const description = isEn
    ? 'Compare AI coding subscriptions: Claude Code, GLM, MiniMax, Kimi and Qwen. Pricing, models, usage limits and tools side by side.'
    : '对比 ChatGPT、Claude、智谱 GLM、MiniMax、Kimi、Qwen 等 9 款 AI 编程订阅套餐。涵盖价格、模型阵容、用量额度与支持工具一站式横评，帮你选到最划算的 AI 编码订阅。'
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
      ? { compare: 'Compare', platforms: 'Plans', faq: 'FAQ', language: '中文', languageHref: '/' }
      : { compare: '快速对比', platforms: '套餐详情', faq: '常见问题', language: 'EN', languageHref: '/en' },
    hero: isEn
      ? { badge: '2026 AI CODING SUBSCRIPTIONS', title: 'AI Coding Plans', highlight: 'Compared Side by Side', description: 'A practical comparison of price, model access, quotas and tool support, built from provider plan details.', stats: [{ value: '6', label: 'Platforms' }, { value: '$5', label: 'Lowest entry' }, { value: '20+', label: 'Coding tools' }] }
      : { badge: '2026 AI 编程订阅指南', title: 'AI Coding Plan', highlight: '全面对比', description: '把价格、模型、额度口径和工具支持放到同一张地图里，减少在不同官网之间反复核对的时间。', stats: [{ value: '9', label: '平台横评' }, { value: '¥10', label: '活动最低月付' }, { value: '20+', label: '支持工具' }] },
    comparison: isEn
      ? { title: 'Quick Comparison', description: 'Current entry points and quota models at a glance.', columns: ['Platform', 'Entry price', 'Models', 'Usage', 'Status'] }
      : { title: '快速对比', description: '先看起步价、核心模型和额度口径，再进入详情页核对限制。', columns: ['平台', '起步价', '核心模型', '额度口径', '状态'] },
    platformsTitle: isEn ? 'Detailed Plans' : '详细方案',
    platformsDescription: isEn ? 'Compare tiers, limits and supported tools.' : '同一份类型化数据驱动首页摘要和详情页，后续更新不再维护多份副本。',
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
