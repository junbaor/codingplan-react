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
  { question: 'GLM Coding Plan 现在的价格是多少？', answer: 'GLM Coding Plan 为连续包月价：Lite ¥118/月（年付 ¥94.4/月）、Pro ¥538/月（年付 ¥430.4/月）、Max ¥1078/月（年付 ¥862.4/月）；连续包季 8 折、包年 7 折。积分按 5 小时（2,000/12,000/28,000）+ 每周（10K/60K/140K）双窗口刷新，非高峰时段 5 折抵扣。' },
  { question: '什么是 Coding Plan？', answer: 'Coding Plan 是面向 AI 编程工具的订阅套餐。订阅后可在 Claude Code、Cursor、Cline 等工具中使用模型，通常按月、季或年付费，并按滚动窗口、周积分、月度 token 或 Credits 总量管理额度。' },
  { question: 'Coding Plan 支持哪些编程工具？', answer: '大多数平台支持 Claude Code、Cursor、Cline、Roo Code、Kilo Code、OpenCode、OpenClaw、ZCode 等。具体支持范围因平台而异。' },
  { question: '5小时限额 / 每周积分是什么意思？', answer: '不同平台额度口径不同：智谱 GLM 采用 5 小时 + 每周双窗口积分制，Kimi Code 采用 5 小时配额 + 7 天刷新，MiniMax 采用月度 token 总量，阿里云百炼采用 7 天 Credits 窗口，OpenCode Go 采用美元计价额度（5h $12 / 周 $30 / 月 $60）。' },
  { question: '一次提问会消耗多少额度？', answer: '一次用户提问通常会触发分析、搜索、生成和验证等多个模型调用，常见约 5 至 30 次，实际消耗取决于工具、模型和上下文长度。' },
  { question: '哪个平台性价比最高？', answer: '入门体验推荐 MiniMax Plus（¥49/月，6 亿+ token）、阿里云百炼 Token Plan Lite（早鸟 ¥39/月）或火山引擎方舟 Lite（首购 ¥9.9，刊例 ¥40，Pro 首购 ¥49.9）。看重模型多样性选火山引擎方舟，看重 MCP 工具选智谱 GLM（视觉理解 / 联网搜索 / 网页读取 / 开源仓库 MCP 已包含）。' },
  { question: 'Kimi Code Plan 新版有哪些变化？', answer: 'Kimi 已上线 K3 旗舰（2.8T 参数，Moderato ¥99 起可用）并新增 K3-256K 省额度版。官方公告「新会员体系即将上线」：Kimi 权益将与 Kimi Code 权益拆分、按需购买；订阅中用户不受影响，如需继续使用合并权益，可在新体系上线前购买当前套餐；新用户当前为「预约订阅」。' },
  { question: '可以退款吗？', answer: '各平台政策不同，大部分已激活订阅不支持退款。建议先从低档套餐开始体验，并在购买前确认自动续费和退款条款。' },
  { question: 'Coding Plan 能在手机上用吗？', answer: '可以。kkcode.app 是一款开源的 OpenCode 兼容移动客户端，支持 iOS 与 Android。订阅任意 Coding Plan 后，在 kkcode 里粘贴对应平台的 API Key 即可继续开发会话，支持会话历史、多模型切换，并兼容各平台 Coding Plan 的额度规则。' },
]

const zhPlatforms: PlatformSummary[] = [
  {
    id: 'chatgpt', name: 'ChatGPT', heading: 'ChatGPT OpenAI 官方 GPT-5.6 Sol', subtitle: 'OpenAI 官方旗舰 AI 助手', accent: 'green',
    models: ['GPT-5.6 Sol', 'GPT-5.6 Terra', 'GPT-5.6 Luna'], entryPrice: '$8/月', quota: '按套餐用量限制',
    plans: [
      { name: 'Go', badge: '轻度首选', price: '$8', unit: '/月', details: ['GPT-5.6 Luna（免费版同款无限聊）', '高于免费版 10 倍消息额度', '文件上传与图像生成'] },
      { name: 'Plus', badge: '最受欢迎', price: '$20', unit: '/月', note: 'Pro $100-200/月', details: ['GPT-5.6 Sol（可选 Terra/Luna）', '扩展深度研究与定时任务', '扩展 Codex 与 Work 多智能体'], featured: true },
    ],
    tools: ['ChatGPT Web', 'Desktop', 'Mobile'], features: ['官方渠道', '网页浏览', '多模态'],
    cta: { label: '加企业微信咨询', contact: true },
  },
  {
    id: 'claude', name: 'Claude', heading: 'Claude Anthropic 官方 Opus 5', subtitle: 'Anthropic Opus 5 编程能力碾压', accent: 'red',
    models: ['Fable 5', 'Opus 5', 'Sonnet 5', 'Haiku 4.5'], entryPrice: '$20/月', quota: 'Pro 5× / Max 5×-20×',
    plans: [
      { name: 'Pro', price: '$20', unit: '/月', note: '年付折合 $17/月', details: ['比免费版多 5 倍用量', 'Fable 5 / Opus 5 / Sonnet 5 全部可用', '200K 上下文', '包含 Claude Code CLI'], featured: true },
      { name: 'Max', badge: '重度畅用', price: '$100-$200', unit: '/月', details: ['5× 或 20× Pro 用量', '高峰期优先保障', '新模型与功能优先'], featured: true },
    ],
    tools: ['Claude Code', 'Web', 'Desktop', 'VS Code'], features: ['Opus 5', 'Extended Thinking', 'MCP'],
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
    cta: { label: '查看详情', href: 'https://www.aliyun.com/benefit/scene/codingplan?source=5176.29345612&userCode=j0hv8tuh', detailHref: '/plans/aliyun' },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go $10/月 · 24 款开源模型 6 倍用量', subtitle: 'Grok 4.6 / GLM-5.3 / Kimi K3 / Qwen3.8 / DeepSeek V4 / MiniMax M3 全包含，OpenAI / Anthropic 兼容接口可接任意 Agent（首月 $5 优惠已下线）', accent: 'slate', specialBadge: '性价比之王',
    models: ['Grok 4.6', 'GLM-5.3', 'GLM-5.3-Flash', 'Kimi K3', 'Qwen3.8 Max', 'DeepSeek V4', 'MiniMax M3', 'LongCat-2.0'], entryPrice: '$10/月', quota: '5h $12 / 周 $30 / 月 $60',
    plans: [
      { name: 'Go', badge: '$10/月', price: '$10', unit: '/月', note: '6 倍用量 · 随时取消', details: ['24 款开源模型', '5h $12 / 周 $30 / 月 $60 额度', 'OpenAI / Anthropic 兼容 API', 'GLM-5.3-Flash 限时 2 倍额度'], featured: true },
    ],
    tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code'], features: ['24 款模型', '6x 用量', '0 天数据保留', '峰谷计价'],
    cta: { label: '查看详情', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/plans/opencode-go' },
  },
  {
    id: 'zhipu', name: '智谱 GLM', heading: '智谱 GLM Coding Plan 连续包月 ¥118 起', subtitle: 'GLM-5.3-Flash（8/26 新上线，原生多模态）+ GLM-5.3 旗舰全档可用，非高峰积分 5 折', accent: 'blue',
    models: ['GLM-5.3', 'GLM-5.3-Flash'], entryPrice: '¥118/月', quota: '2,000-28,000 积分/5h · 10K-140K/周',
    plans: [
      { name: 'Lite', price: '¥118', unit: '/月', note: '年付 ¥94.4/月', details: ['5h 2,000 · 每周 10,000 积分', 'GLM-5.3 / 5.3-Flash 全档可用', '支持 ZCode / Claude Code 等 20+ 工具'] },
      { name: 'Pro', badge: '推荐', price: '¥538', unit: '/月', note: '年付 ¥430.4/月', details: ['5h 12,000 · 每周 60,000 积分', '更快生成速度与高峰保障', '精选 MCP 工具'], featured: true },
      { name: 'Max', price: '¥1,078', unit: '/月', note: '年付 ¥862.4/月', details: ['5h 28,000 · 每周 140,000 积分', '首发接入最新旗舰模型', '高峰期专属资源优先保障'] },
    ],
    tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'], features: ['GLM-5.3-Flash 新上线', '4 类 MCP', '20+ 工具', '非高峰 5 折'],
    cta: { label: '查看详情', href: 'https://www.bigmodel.cn/glm-coding?ic=TOFGVCLIVG', detailHref: '/plans/zhipu' },
  },
  {
    id: 'minimax', name: 'MiniMax', heading: 'MiniMax Token Plan M3 旗舰 + 全模态共享', subtitle: '月度 token 用量制；M2.7 / H3（已开源）/ Speech 2.8 共享额度，Music 全系列 8/20 起停服', accent: 'orange',
    models: ['MiniMax M3', 'M2.7', 'M2.7-highspeed', 'M2.5', 'H3', 'Speech 2.8'], entryPrice: '¥49/月', quota: '6亿-71亿+ token/月',
    plans: [
      { name: 'Plus', price: '¥49', unit: '/月', note: '年付 ¥490', details: ['6亿+ token/月', '3-4 Agent 并发', '全模态共享额度'] },
      { name: 'Max', badge: '推荐', price: '¥119', unit: '/月', note: '年付 ¥1,190', details: ['18亿+ token/月', '4-5 Agent 并发', 'Hailuo 视频 3 条/日'], featured: true },
      { name: 'Ultra', price: '¥469', unit: '/月', note: '年付 ¥4,690', details: ['71亿+ token/月', '6-7 Agent 并发', 'Hailuo 视频 5 条/日'] },
    ],
    tools: ['Claude Code', 'Cursor', 'OpenCode', 'TRAE', 'OpenClaw', 'Cline', 'MiniMax Code'], features: ['全模态', '1M 上下文', 'Agent 并发', 'M3 + M2.7 共享'],
    cta: { label: '查看详情', href: 'https://platform.minimaxi.com/subscribe/token-plan?code=GhZIakShS0&source=link', detailHref: '/plans/minimax' },
  },
  {
    id: 'kimi', name: 'Kimi', heading: 'Kimi Code Plan K3 五档套餐 · 新会员体系即将上线', subtitle: 'K3 旗舰（2.8T 参数 / 1M 上下文）+ 新增 K3-256K 省额度版，Moderato 起可用；权益拆分前购买可锁定合并权益', accent: 'purple',
    models: ['Kimi K3', 'K3-256K', 'Kimi K2.7', 'K2.7 Code'], entryPrice: '¥49/月', quota: '5h token 配额 / 7天刷新',
    plans: [
      { name: 'Adagio', badge: '免费', price: '¥0', unit: '/月', details: ['Kimi K2.7 / K2 可访问', '1 Agent 任务并行', '2 个项目 / 500MB 存储', 'K3 需 Moderato 及以上'] },
      { name: 'Andante', badge: '基础', price: '¥49', unit: '/月', note: '年付 ¥39/月', details: ['约 300-1,200 API 调用/5h', '每 7 天刷新', '20 个项目 / 20GB 存储', 'K3 需 Moderato 及以上'] },
      { name: 'Moderato', badge: '推荐 · K3 可用', price: '¥99', unit: '/月', note: '年付 ¥79/月', details: ['更大 token 配额', '可使用 Kimi K3 (2.8T 参数)', '2 Agent 并行 · 4 倍速度', '集群 2 子任务 · 完整会员权益'], featured: true },
      { name: 'Allegretto', badge: '高级 · K3 可用', price: '¥199', unit: '/月', note: '年付 ¥159/月', details: ['K3 + Agent 集群 40 次/月', 'K2.7 Code 高速版（5-6 倍速）', '集群 4 子任务 · 目标模式', 'Kimi Claw 群聊 10 个'] },
      { name: 'Allegro', badge: '顶级 · 1M 上下文', price: '¥699', unit: '/月', note: '年付 ¥559/月', details: ['K3 解锁 1M token 超长对话', 'Agent 4 任务并行 · 集群 8 子任务', 'Kimi Claw 群聊 10 个', '目标模式 · 云端/安卓/桌面端'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'], features: ['K3', '7天周期刷新', '5档套餐', 'AI 建站/文档/PPT'],
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
    cta: { label: '查看详情', href: 'https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=33BB3T98', detailHref: '/plans/volcengine' },
  },
  {
    id: 'xiaomi', name: '小米 MiMo', heading: '小米 MiMo Coding Plan 5/26 全档 Credits 升级 5-8 倍', subtitle: 'MiMo-V2.5-Pro 旗舰 · MiMo Claw 首次 ¥14.9/月 或加购 ¥233.80/年 · V2 系列已下线', accent: 'orange',
    models: ['MiMo-V2.5-Pro', 'MiMo-V2.5', 'MiMo 全模态', 'MiMo TTS'], entryPrice: '¥39/月', quota: '492-9,840 亿 Credits/年',
    plans: [
      { name: 'Lite', price: '¥39', unit: '/月', note: '年付 ¥411.84（88折）', details: ['492 亿 Credits/年', 'V2.5 全系列模型', '夜间 0.8x 消耗', 'TTS 限时免费'] },
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
  { question: 'Which plan offers the best value?', answer: 'For budget-conscious developers, GLM Lite at $18/month or MiniMax Plus at $49/month (~$8 annual equivalent) are excellent entry points. For heavy usage, MiniMax Max or GLM Pro offer strong value. Claude Code Pro at $20/month remains the gold standard for model quality with Claude Opus 5.' },
  { question: 'What is the latest GLM Coding Plan pricing?', answer: 'GLM Coding Plan charges Lite $18/mo ($12.6/mo yearly), Pro $80/mo ($56/mo yearly), Max $168/mo ($117.6/mo yearly). Quarterly billing gives a 20% discount and yearly billing 30% off. Credits refresh on both a 5-hour window (2,000/12,000/28,000) and weekly (10K/60K/140K); off-peak usage deducts 50% fewer Credits.' },
  { question: 'What is new in Kimi Code Plan?', answer: 'Kimi launched the K3 flagship (2.8T parameters) with a new K3-256K budget variant, across five tiers: Adagio free, Andante ¥49, Moderato ¥99 (K3 unlocked), Allegretto ¥199 (K3 + 4 cluster subtasks), Allegro ¥699 (K3 with 1M-token conversations). A new membership system is coming: Kimi benefits and Kimi Code benefits will be split; existing subscribers keep combined benefits.' },
  { question: 'Can I get a refund?', answer: 'Refund policies vary. Most activated subscriptions are non-refundable, so start with a lower tier and check renewal terms before purchase.' },
  { question: 'Can I use a Coding Plan on my phone?', answer: 'Yes. kkcode.app is an open-source mobile client for OpenCode-compatible providers, available on iOS and Android. After subscribing to any Coding Plan, paste the provider API Key into kkcode and continue coding on your phone with session history, multi-model switching, and the same quota rules as your desktop plan.' },
]

const enPlatforms: PlatformSummary[] = [
  {
    id: 'claude', name: 'Claude Code', heading: 'Claude Code Gold Standard Opus 5', subtitle: 'Anthropic Opus 5, Fable 5 and Sonnet 5 with Claude Code on every paid plan', accent: 'red',
    models: ['Claude Fable 5', 'Claude Opus 5', 'Sonnet 5', 'Haiku 4.5'], entryPrice: '$20/mo', quota: 'Pro / Max 5x / Max 20x',
    plans: [
      { name: 'Pro', price: '$20', unit: '/mo', note: '$17/mo annually', details: ['Claude Code and Cowork', 'Fable 5 / Opus 5 / Sonnet 5 all available', 'Unlimited projects', 'Cross-conversation memory'] },
      { name: 'Max 5x', badge: 'Popular', price: '$100', unit: '/mo', details: ['5x Pro usage', 'Priority access', 'Higher output limits'], featured: true },
      { name: 'Max 20x', price: '$200', unit: '/mo', details: ['20x Pro usage', 'Early feature access', 'Peak-hour priority'] },
    ], tools: ['Terminal', 'VS Code', 'JetBrains', 'Web'], features: ['Claude Opus 5', 'Extended Thinking', 'MCP'],
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
    cta: { label: 'Subscribe to GLM', href: 'https://z.ai/subscribe?ic=Q2I4GGSKVU', detailHref: '/en/plans/glm' },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go $10/mo, 24 Open Models', subtitle: '24 open models (Grok 4.6, GLM-5.3, Kimi K3, DeepSeek V4, MiniMax M3, LongCat-2.0) with 6x usage value; first-month $5 promo removed', accent: 'slate', specialBadge: 'BEST VALUE',
    models: ['Grok 4.6', 'GLM-5.3', 'GLM-5.3-Flash', 'Kimi K3', 'Qwen3.8 Max', 'DeepSeek V4', 'MiniMax M3', 'LongCat-2.0'], entryPrice: '$10/mo', quota: '$12/5h · $30/wk · $60/mo',
    plans: [
      { name: 'Go', badge: '$10/mo', price: '$10', unit: '/mo', note: '6x usage value · Cancel anytime', details: ['24 open-source models', '$12/5h · $30/week · $60/month', 'OpenAI / Anthropic compatible APIs', 'GLM-5.3-Flash limited-time 2x'], featured: true },
    ],
    tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code'], features: ['24 models', '6x value', '0-day retention', 'Peak/off-peak pricing'],
    cta: { label: 'View details', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/en/plans/opencode-go' },
  },
  {
    id: 'minimax', name: 'MiniMax Token Plan', heading: 'MiniMax Token Plan M3 Model', subtitle: 'International plans: Plus $22 / Max $55 / Ultra $132 per month, M3 flagship & 2 months free on annual', accent: 'orange',
    models: ['M3', 'M2.7', 'M2.7-highspeed'], entryPrice: '$22/mo', quota: '1.7B-12.5B tokens/月',
    plans: [
      { name: 'Plus', price: '$22', unit: '/mo', details: ['~1.7B tokens/mo', '3-4 concurrent Agents', '$220/year'] },
      { name: 'Max', badge: 'Top pick', price: '$55', unit: '/mo', details: ['~5.1B tokens/mo', 'Hailuo video 3/day', '$550/year'], featured: true },
      { name: 'Ultra', price: '$132', unit: '/mo', details: ['~12.5B tokens/mo', '6-7 Agents · video 5/day', '$1,320/year'] },
    ], tools: ['Claude Code', 'Cursor', 'Cline', 'OpenCode', 'MiniMax Code'], features: ['M3 flagship', '1M context', 'Broad integrations'],
    cta: { label: 'Subscribe to MiniMax', href: 'https://platform.minimax.io/subscribe/token-plan', detailHref: '/en/plans/minimax' },
  },
  {
    id: 'kimi', name: 'Kimi Code', heading: 'Kimi Code Plan K3 New Model', subtitle: 'K3 flagship (2.8T params) + new K3-256K across five tiers; new membership system coming with Kimi / Kimi Code benefits split', accent: 'purple',
    models: ['Kimi K3', 'Kimi K3-256K', 'Kimi K2.7'], entryPrice: '¥49/mo', quota: '300-1,200 API calls/5h',
    plans: [
      { name: 'Adagio', badge: 'Free', price: '¥0', unit: '/mo', details: ['Kimi K2.7 / K2 access', '1 concurrent Agent task', '2 projects · 500MB storage', 'K3 requires Moderato or above'] },
      { name: 'Andante', price: '¥49', unit: '/mo', note: '¥39/mo annually', details: ['~300-1,200 API calls/5h', 'Quota refreshes every 7 days', '20 projects · 20GB storage', 'K3 requires Moderato or above'] },
      { name: 'Moderato', badge: 'Recommended · K3', price: '¥99', unit: '/mo', note: '¥79/mo annually', details: ['Kimi K3 flagship (2.8T parameters)', 'K3-256K budget variant', '2 concurrent Agent tasks', '2 cluster subtasks'], featured: true },
      { name: 'Allegretto', badge: 'Advanced · K3', price: '¥199', unit: '/mo', note: '¥159/mo annually', details: ['K3 + Agent cluster 40 times/mo', 'K2.7 Code high-speed (5-6x)', '4 cluster subtasks · Goal Mode', '10 Kimi Claw group chats'] },
      { name: 'Allegro', badge: 'Top · 1M Context', price: '¥699', unit: '/mo', note: '¥559/mo annually', details: ['K3 with 1M-token conversation capacity', '4 concurrent Agent tasks · 8 cluster subtasks', '10 Kimi Claw group chats', 'Goal Mode · Cloud / Android / Desktop'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'], features: ['Kimi K3', '5 tiers', '1M Context on Allegro', 'Weekly Refresh'],
    cta: { label: 'Start with Kimi', href: 'https://www.kimi.com/code?track_id=a7532112-efe3-4c65-a4e5-ae441848b1c5', detailHref: '/en/plans/kimi' },
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
    : 'AI Coding Plan 对比 2026：ChatGPT/Claude/GLM/MiniMax/Kimi 横评'
  const description = isEn
    ? 'Compare AI coding subscriptions: Claude Code, GLM, MiniMax, Kimi and Qwen. Pricing, models, usage limits and tools side by side.'
    : '对比 ChatGPT、Claude、智谱 GLM、MiniMax、Kimi、Qwen、火山方舟、阿里云百炼等 9 款 AI 编程订阅套餐：入门价格、模型阵容、5 小时/每周额度口径、Claude Code 等工具支持与首购优惠一站式横评，附快速对比表格与常见问题解答，帮你选到最划算的 AI 编码订阅。'
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
