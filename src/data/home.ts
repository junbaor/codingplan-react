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
  { question: '5小时限额 / 每周积分是什么意思？', answer: '不同平台额度口径不同：智谱 GLM 采用 5 小时 + 每周双窗口积分制，Kimi Code 新会员采用 5 小时滚动频率窗口（已取消每周额度限制），MiniMax 采用月度 token 总量，阿里云百炼采用月度 Credits（11,500-180,000/月），小米 MiMo 采用年度 Credits 且无周限额与 5 小时限额，OpenCode Go 采用美元计价额度（5h $12 / 周 $30 / 月 $60）。' },
  { question: '一次提问会消耗多少额度？', answer: '一次用户提问通常会触发分析、搜索、生成和验证等多个模型调用，常见约 5 至 30 次，实际消耗取决于工具、模型和上下文长度。' },
  { question: '哪个平台性价比最高？', answer: '入门体验推荐 MiniMax Plus（¥49/月，6 亿+ token）、阿里云百炼 Token Plan Lite（¥39/月，11,500 Credits/月）或火山引擎方舟 Lite（首购 ¥9.9，刊例 ¥40，Pro 首购 ¥49.9）。看重模型多样性选火山引擎方舟或 OpenCode Go（$10/月含 32 款模型），看重 MCP 工具选智谱 GLM（视觉理解 / 联网搜索 / 网页读取 / 开源仓库 MCP 已包含），需要无周限额则看小米 MiMo。选购 Coding Plan 前先对照额度口径估算月消耗，避免档位买高或买低。' },
  { question: 'Kimi Code Plan 新版有哪些变化？', answer: 'Kimi 会员新套餐已正式上线（定价不变）：Free / Go ¥49 / Plus ¥99 / Pro ¥199 / Max ¥699。新会员取消每周额度限制、仅保留 5 小时滚动频率窗口；Go 档不含编程额度，Plus 及以上才能使用 Kimi Code，K3 门槛也由旧 Moderato 变为 Plus，1M 上下文与 K2.7 Code 高速版需 Pro 及以上。老套餐会员不受影响，档位名称、额度规则与自动续费均维持原样。' },
  { question: '可以退款吗？', answer: '各平台政策不同，大部分已激活订阅不支持退款。建议先从低档套餐开始体验，并在购买前确认自动续费和退款条款。' },
  { question: 'Coding Plan 能在手机上用吗？', answer: '可以。kkcode.app 是一款开源的 OpenCode 兼容移动客户端，支持 iOS 与 Android。订阅任意 Coding Plan 后，在 kkcode 里粘贴对应平台的 API Key 即可继续开发会话，支持会话历史、多模型切换，并兼容各平台 Coding Plan 的额度规则。' },
]

const zhPlatforms: PlatformSummary[] = [
  {
    id: 'chatgpt', name: 'ChatGPT', heading: 'ChatGPT OpenAI 官方 GPT-6 Astra / Sol / Luna', subtitle: 'OpenAI 官方旗舰 AI 助手', accent: 'green',
    models: ['GPT-6 Astra', 'GPT-6 Sol', 'GPT-6 Luna'], entryPrice: '$8/月', quota: '按套餐用量限制',
    plans: [
      { name: 'Go', badge: '轻度首选', price: '$8', unit: '/月', details: ['GPT-6 Luna（桌面端可用）', '高于免费版 10 倍消息额度', '文件上传与图像生成'] },
      { name: 'Plus', badge: '最受欢迎', price: '$20', unit: '/月', note: 'Pro $100-200/月（$200 档新购暂停）', details: ['GPT-6 Sol（ChatGPT Work 与 Codex）', 'GPT-6 Astra 分批开放（最强模型）', '扩展 Codex 与 Work 多智能体'], featured: true },
    ],
    tools: ['ChatGPT Web', 'Desktop', 'Mobile'], features: ['官方渠道', '网页浏览', '多模态'],
    cta: { label: '加企业微信咨询', contact: true },
  },
  {
    id: 'claude', name: 'Claude', heading: 'Claude Anthropic 官方 Fable 5.1 / Opus 5.5', subtitle: 'Fable 5.1 与 Opus 5.5 双新旗舰：Pro 用 Fable 需加购 Usage credits，Max 上限为周额度 50%', accent: 'red',
    models: ['Fable 5.1', 'Opus 5.5', 'Sonnet 5', 'Haiku 4.5'], entryPrice: '$20/月', quota: 'Pro 5× / Max 5×-20×',
    plans: [
      { name: 'Pro', price: '$20', unit: '/月', note: '年付折合 $17/月', details: ['Opus 5.5 / Sonnet 5 / Haiku 4.5 可用', 'Fable 5.1 按 Usage credits 额外计费', '上下文最高 1M（因模型而异）', '包含 Claude Code CLI'], featured: true },
      { name: 'Max', badge: '重度畅用', price: '$100-$200', unit: '/月', details: ['Fable 5.1 最多用周额度的 50%', '5× 或 20× Pro 用量', '高峰期优先保障'], featured: true },
    ],
    tools: ['Claude Code', 'Web', 'Desktop', 'VS Code'], features: ['Fable 5.1', 'Opus 5.5', 'Extended Thinking', 'MCP'],
    cta: { label: '加企业微信咨询', contact: true },
  },
  {
    id: 'aliyun', name: '阿里云百炼', heading: '阿里云百炼 Token Plan Qwen3.8-Max 0902 快照 · ¥39 起', subtitle: 'Credits 制 Token Plan，个人版新增 12 项 Harness 权益，覆盖多模态 18+ 旗舰模型，超额 88 折、夜间限时 4 折', accent: 'orange',
    models: ['Qwen3.8-Max (0902)', 'Qwen3.8-Flash', 'Kimi-K3', 'Deepseek-v4-pro', 'Qwen3-VL-Plus', 'Qwen-Image-3.0-Pro'], entryPrice: '¥39/月', quota: '11,500-180,000 Credits/月',
    plans: [
      { name: 'Lite', badge: '入门', price: '¥39', unit: '/月', note: '11,500 Credits/月 · 权益加码', details: ['11,500 Credits/月', '1-2 Agent 并发', '夜间 22:00 起限时 4 折'] },
      { name: 'Standard', badge: '推荐', price: '¥139', unit: '/月', note: '45,000 Credits/月 · 12 项 Harness', details: ['45,000 Credits/月（≈4× Lite）', '3-4 Agent 并发', '夜间 22:00 起限时 4 折'], featured: true },
      { name: 'Pro', badge: '重度', price: '¥499', unit: '/月', note: '180,000 Credits/月 · 超额 88 折', details: ['180,000 Credits/月', '6-8 Agent 并发', '超额调用 88 折'] },
    ],
    tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline'], features: ['加量不加价', '12 项 Harness 权益', '多模态共享', '夜间限时 4 折'],
    cta: { label: '查看详情', href: 'https://www.aliyun.com/benefit/scene/codingplan?source=5176.29345612&userCode=j0hv8tuh', detailHref: '/plans/aliyun', sponsored: true },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go $10/月 · 32 款模型 6 倍用量', subtitle: 'GPT 6 Luna / DeepSeek V4.1 Flash（限时 4 倍）/ Kimi K3 / GLM-5.3-Flash / MiMo-V2.6-Flash / MiniMax M3 全包含，OpenAI / Anthropic 兼容接口可接任意 Agent（首月 $5 优惠已下线）', accent: 'slate', specialBadge: '性价比之王',
    models: ['GPT 6 Luna', 'DeepSeek V4.1 Flash', 'Kimi K3', 'GLM-5.3-Flash', 'MiMo-V2.6-Flash', 'MiniMax M3', 'Qwen3.7 Plus', 'Space Bunny Free'], entryPrice: '$10/月', quota: '5h $12 / 周 $30 / 月 $60',
    plans: [
      { name: 'Go', badge: '$10/月', price: '$10', unit: '/月', note: '6 倍用量 · 随时取消', details: ['32 款模型（原 24 款）', '5h $12 / 周 $30 / 月 $60 额度', 'OpenAI / Anthropic 兼容 API', 'DeepSeek V4.1 Flash 限时 4 倍用量'], featured: true },
    ],
    tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code'], features: ['32 款模型', '6x 用量', '0 天数据保留', '峰谷计价'],
    cta: { label: '查看详情', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/plans/opencode-go', sponsored: true },
  },
  {
    id: 'zhipu', name: '智谱 GLM',     heading: '智谱 GLM Coding Plan 连续包月 ¥118 起', subtitle: '连续包月价，GLM-5.3 / GLM-5.3-Flash 全档可用（1M 上下文），非高峰积分 5 折；ZCode / AutoClaw 专享 150% 额度，9/3-10/7 夜间畅用', accent: 'blue',
    models: ['GLM-5.3', 'GLM-5.3-Flash'], entryPrice: '¥118/月', quota: '2,000-28,000 积分/5h · 10K-140K/周',
    plans: [
      { name: 'Lite', price: '¥118', unit: '/月', note: '年付 ¥94.4/月', details: ['5h 2,000 · 每周 10,000 积分', 'GLM-5.3 / 5.3-Flash 全档可用', '支持 ZCode / Claude Code 等 20+ 工具'] },
      { name: 'Pro', badge: '推荐', price: '¥538', unit: '/月', note: '年付 ¥430.4/月', details: ['5h 12,000 · 每周 60,000 积分', '更快生成速度与高峰保障', '精选 MCP 工具'], featured: true },
      { name: 'Max', price: '¥1,078', unit: '/月', note: '年付 ¥862.4/月', details: ['5h 28,000 · 每周 140,000 积分', '首发接入最新旗舰模型', '高峰期专属资源优先保障'] },
    ],
    tools: ['ZCode', 'AutoClaw', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'], features: ['GLM-5.3 系列', '4 类 MCP', '20+ 工具', '非高峰 5 折'],
    cta: { label: '查看详情', href: 'https://www.bigmodel.cn/glm-coding?ic=TOFGVCLIVG', detailHref: '/plans/zhipu', sponsored: true },
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
    cta: { label: '查看详情', href: 'https://platform.minimaxi.com/subscribe/token-plan?code=GhZIakShS0&source=link', detailHref: '/plans/minimax', sponsored: true },
  },
  {
    id: 'kimi', name: 'Kimi', heading: 'Kimi Code Plan 新会员体系上线 · Plus ¥99 起', subtitle: 'K3 旗舰（2.8T 参数 / 1M 上下文）+ K2.8 Preview；新会员取消每周额度限制，Plus 及以上可用 Kimi Code，Go ¥49 档不含编程额度', accent: 'purple',
    models: ['Kimi K3', 'K3-256K', 'K2.8 Preview', 'K2.7 Code 高速版'], entryPrice: '¥99/月', quota: '5 小时滚动窗口（新会员取消周限额）',
    plans: [
      { name: 'Plus', badge: '推荐 · K3 可用', price: '¥99', unit: '/月', note: '年付 ¥79/月', details: ['Kimi Code 可用（Plus 及以上）', 'K3 旗舰 + K3-256K 省额度版', '2 倍 Agent 额度 · 集群功能'], featured: true },
      { name: 'Pro', badge: '高级 · 1M 上下文', price: '¥199', unit: '/月', note: '年付 ¥159/月', details: ['K3 解锁百万 Tokens 超长上下文', 'K2.7 Code 高速版（Pro 及以上）', '4 倍 Agent 额度 · 目标模式'] },
      { name: 'Max', badge: '顶级 · 全能尊享', price: '¥699', unit: '/月', note: '年付 ¥559/月', details: ['14 倍 Agent 额度', '专享 Kimi Claw · 多 Agent 并行', '100 个项目 · 50GB 存储'] },
      { name: 'Go', badge: '不含编程额度', price: '¥49', unit: '/月', note: '年付 ¥39/月', details: ['更多 Agent 额度 · 深度研究', 'Office 文件处理 · 网站部署', '不支持 Kimi Code（需 Plus 及以上）'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'], features: ['K3', '取消周限额', 'Plus 起可用 Code', '新增加油包'],
    cta: { label: '查看详情', href: 'https://www.kimi.com/code', detailHref: '/plans/kimi' },
  },
  {
    id: 'volcengine', name: '火山引擎方舟', heading: '火山引擎 方舟 Coding Plan 限时 2.5 折 · Pro ¥49.9 首购', subtitle: '官方主推 DeepSeek-V4.1-Flash / GLM-5.3 系列 / Doubao-Seed-Evolving / Kimi-K3 / Kimi-K2.8-Preview，Auto 模式调度（2.5 折活动 6/10-11/8）', accent: 'cyan',
    models: ['DeepSeek-V4.1-Flash', 'GLM-5.3 系列', 'Doubao-Seed-Evolving', 'Kimi-K3', 'Kimi-K2.8-Preview', 'MiniMax-M3', 'Auto 模式'], entryPrice: '¥9.9/月起', quota: 'Lite 首购 ¥9.9 / Pro 首购 ¥49.9（前两月）', availability: 'limited',
    plans: [
      { name: 'Lite', badge: '限时首购 ¥9.9', price: '¥40', unit: '/月', note: '刊例价 ¥40/月 · 受邀再 9.5 折', details: ['Doubao / GLM / DeepSeek / Kimi / MiniMax', '支持 Auto 模式', '活动期至 11/8，名额有限', 'Lite 满足个人开发者轻量需求'] },
      { name: 'Pro', badge: '推荐 · 首购 ¥49.9', price: '¥200', unit: '/月', note: '刊例价 ¥200/月 · 5 倍 Lite 用量', details: ['首两月 2.5 折 ¥49.9/月', '5 倍于 Lite 套餐用量', '支持 Auto 模式', '满足高阶用户大规模编程需求'], featured: true },
    ],
    tools: ['Claude Code', 'Cursor', 'Cline', 'Codex CLI', 'Kilo Code', 'OpenCode'], features: ['6+ 模型', 'Auto 模式', '限时 2.5 折', '受邀 9.5 折'],
    cta: { label: '查看详情', href: 'https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=33BB3T98', detailHref: '/plans/volcengine', sponsored: true },
  },
  {
    id: 'xiaomi', name: '小米 MiMo', heading: '小米 MiMo V2.6 系列上线 + 新增团队版', subtitle: 'MiMo-V2.6 系列 3 款新模型 · 全档无周限额与 5 小时限额 · 首购 88 折 · MiMo Claw 加购 ¥233.80/年 · 团队版同价按席位', accent: 'orange',
    models: ['MiMo-V2.6 系列', 'MiMo-V2.6-Flash', 'MiMo TTS'], entryPrice: '¥39/月', quota: '492-9,840 亿 Credits/年',
    plans: [
      { name: 'Lite', price: '¥39', unit: '/月', note: '年付 ¥411.84（88折）', details: ['492 亿 Credits/年', 'V2.6 全新旗舰系列', '夜间 0.8x 消耗', 'TTS 限时免费'] },
      { name: 'Standard', price: '¥99', unit: '/月', note: '年付 ¥1,045.44', details: ['1,320 亿 Credits/年', '2.7× Lite 用量', '夜间 0.8x 消耗'] },
      { name: 'Pro', badge: '推荐', price: '¥329', unit: '/月', note: '年付 ¥3,474.24', details: ['4,560 亿 Credits/年', '9.3× Lite 用量', 'MiMo Claw 加购可选'], featured: true },
      { name: 'Max', price: '¥659', unit: '/月', note: '年付 ¥6,959.04', details: ['9,840 亿 Credits/年', '20× Lite 用量', '团队/发烧友首选'] },
    ],
    tools: ['MiMo Desktop', 'MiMo Code', 'OpenCode', 'OpenClaw', 'Claude Code', 'Codex', 'Hermes Agent', 'Kilo Code', 'Cline', 'Qwen Code'], features: ['V2.6 系列', '无周限额', '夜间 0.8x', '新增团队版'],
    cta: { label: '查看详情', href: 'https://platform.xiaomimimo.com/token-plan', detailHref: '/plans/xiaomi' },
  },
]

const enFaqs: FaqItem[] = [
  { question: 'What is a Coding Plan?', answer: 'A Coding Plan is a subscription that gives developers access to AI models in tools such as Claude Code, Cursor and Cline. Plans use rolling quotas, weekly credits, monthly tokens or credits instead of simple pay-per-token billing.' },
  { question: 'Which coding tools are supported?', answer: 'Most plans support Claude Code, Cursor, Cline, Roo Code, Kilo Code, OpenCode, OpenClaw and ZCode. Exact integrations vary by provider.' },
  { question: 'What does the 5-hour rolling limit mean?', answer: 'Quota windows differ by provider: GLM uses a 5-hour + weekly dual Credits window, Kimi Code (new membership) uses a 5-hour rolling rate window with no weekly cap, MiniMax uses monthly tokens, Alibaba Cloud uses monthly Credits (11,500-180,000/mo), Xiaomi MiMo uses annual Credits with no weekly or 5-hour caps, and OpenCode Go uses dollar-based limits ($12/5h, $30/week, $60/month).' },
  { question: 'How many model calls does one prompt use?', answer: 'A single developer prompt may trigger 5 to 30 model calls for planning, search, tool use, generation and validation. Providers count this activity differently.' },
  { question: 'Which plan offers the best value?', answer: 'For budget-conscious developers, GLM Lite at $18/month or OpenCode Go at $10/month (32 models, 6x usage value) are excellent entry points. For heavy usage, MiniMax Max or GLM Pro offer strong value. Claude Code Pro at $20/month remains the gold standard for model quality with Opus 5.5, and Fable 5.1 on Max tiers.' },
  { question: 'What is the latest GLM Coding Plan pricing?', answer: 'GLM Coding Plan charges Lite $18/mo ($12.6/mo yearly), Pro $80/mo ($56/mo yearly), Max $168/mo ($117.6/mo yearly). Quarterly billing gives a 20% discount and yearly billing 30% off. Credits refresh on both a 5-hour window (2,000/12,000/28,000) and weekly (10K/60K/140K); off-peak usage deducts 50% fewer Credits.' },
  { question: 'What is new in Kimi Code Plan?', answer: 'Kimi shipped its new membership at unchanged pricing: Free / Go ¥49 / Plus ¥99 / Pro ¥199 / Max ¥699. New members lose the weekly cap and keep only a 5-hour rolling rate window; the Go tier carries no coding quota, so Kimi Code needs Plus or above (K3 also starts at Plus, while 1M context and K2.7 Code HighSpeed need Pro+). Existing subscribers keep their old tier names, quota rules and renewals unchanged.' },
  { question: 'Can I get a refund?', answer: 'Refund policies vary. Most activated subscriptions are non-refundable, so start with a lower tier and check renewal terms before purchase.' },
  { question: 'Can I use a Coding Plan on my phone?', answer: 'Yes. kkcode.app is an open-source mobile client for OpenCode-compatible providers, available on iOS and Android. After subscribing to any Coding Plan, paste the provider API Key into kkcode and continue coding on your phone with session history, multi-model switching, and the same quota rules as your desktop plan.' },
]

const enPlatforms: PlatformSummary[] = [
  {
    id: 'claude', name: 'Claude Code', heading: 'Claude Code Gold Standard: Fable 5.1 & Opus 5.5', subtitle: 'Fable 5.1 needs Usage credits on Pro and is capped at 50% of weekly limits on Max; Opus 5.5, Sonnet 5 and Haiku 4.5 included on paid plans', accent: 'red',
    models: ['Claude Fable 5.1', 'Claude Opus 5.5', 'Sonnet 5', 'Haiku 4.5'], entryPrice: '$20/mo', quota: 'Pro / Max 5x / Max 20x',
    plans: [
      { name: 'Pro', price: '$20', unit: '/mo', note: '$17/mo annually', details: ['Opus 5.5 / Sonnet 5 / Haiku 4.5 included', 'Fable 5.1 billed via Usage credits', 'Claude Code and Cowork', 'Context up to 1M (varies by model)'] },
      { name: 'Max 5x', badge: 'Popular', price: '$100', unit: '/mo', details: ['Fable 5.1 capped at 50% of weekly limits', '5x Pro usage', 'Priority access'], featured: true },
      { name: 'Max 20x', price: '$200', unit: '/mo', details: ['Fable 5.1 capped at 50% of weekly limits', '20x Pro usage', 'Peak-hour priority'] },
    ], tools: ['Terminal', 'VS Code', 'JetBrains', 'Web'], features: ['Fable 5.1', 'Opus 5.5', 'Extended Thinking', 'MCP'],
    cta: { label: 'View Claude plans', href: 'https://claude.com/pricing', detailHref: '/en/plans/claude' },
  },
  {
    id: 'glm', name: 'GLM Coding Plan', heading: 'GLM Coding Plan GLM-5.3 & 5.3-Flash from $18/mo', subtitle: 'Z.ai global plans · GLM-5.3 & 5.3-Flash for all tiers with 1M context · ZCode & AutoClaw 150% quota · Quarterly -20% · Yearly -30%', accent: 'blue',
    models: ['GLM-5.3', 'GLM-5.3-Flash'], entryPrice: '$18/mo', quota: '2K-28K Credits/5h · 10K-140K/week',
    plans: [
      { name: 'Lite', price: '$18', unit: '/mo', note: 'Yearly $12.6/mo (-30%)', details: ['2,000 Credits/5h · 10,000/week', 'GLM-5.3 & 5.3-Flash for all tiers', 'ZCode / Claude Code / 20+ tools'] },
      { name: 'Pro', badge: 'Best value', price: '$80', unit: '/mo', note: 'Yearly $56/mo (-30%)', details: ['12,000 Credits/5h · 60,000/week', 'Faster generation & peak priority', 'Curated MCP tools'], featured: true },
      { name: 'Max', price: '$168', unit: '/mo', note: 'Yearly $117.6/mo (-30%)', details: ['28,000 Credits/5h · 140,000/week', 'First access to new models', 'Peak-hour priority'] },
    ], tools: ['ZCode', 'AutoClaw', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'], features: ['GLM-5.3 series', '4 MCP tools', '20+ integrations', '50% off-peak Credits'],
    cta: { label: 'Subscribe to GLM', href: 'https://z.ai/subscribe?ic=Q2I4GGSKVU', detailHref: '/en/plans/glm', sponsored: true },
  },
  {
    id: 'opencode-go', name: 'OpenCode Go', heading: 'OpenCode Go $10/mo, 32 Models', subtitle: '32 models (GPT 6 Luna, DeepSeek V4.1 Flash with limited-time 4x, Kimi K3, GLM-5.3-Flash, MiMo-V2.6-Flash, MiniMax M3) with 6x usage value; first-month $5 promo removed', accent: 'slate', specialBadge: 'BEST VALUE',
    models: ['GPT 6 Luna', 'DeepSeek V4.1 Flash', 'Kimi K3', 'GLM-5.3-Flash', 'MiMo-V2.6-Flash', 'MiniMax M3', 'Qwen3.7 Plus', 'Space Bunny Free'], entryPrice: '$10/mo', quota: '$12/5h · $30/wk · $60/mo',
    plans: [
      { name: 'Go', badge: '$10/mo', price: '$10', unit: '/mo', note: '6x usage value · Cancel anytime', details: ['32 models (up from 24)', '$12/5h · $30/week · $60/month', 'OpenAI / Anthropic compatible APIs', 'DeepSeek V4.1 Flash limited-time 4x'], featured: true },
    ],
    tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code'], features: ['32 models', '6x value', '0-day retention', 'Peak/off-peak pricing'],
    cta: { label: 'View details', href: 'https://opencode.ai/go?ref=JBT5KJRCD4', detailHref: '/en/plans/opencode-go', sponsored: true },
  },
  {
    id: 'minimax', name: 'MiniMax Token Plan', heading: 'MiniMax Token Plan M3 Model', subtitle: 'International plans: Plus $20 / Max $50 / Ultra $120 per month, M3 flagship & 2 months free on annual', accent: 'orange',
    models: ['M3', 'M2.7', 'M2.7-highspeed'], entryPrice: '$20/mo', quota: '1.7B-12.5B tokens/mo',
    plans: [
      { name: 'Plus', price: '$20', unit: '/mo', details: ['~1.7B tokens/mo', '3-4 concurrent Agents', '$220/year'] },
      { name: 'Max', badge: 'Top pick', price: '$50', unit: '/mo', details: ['~5.1B tokens/mo', 'Hailuo video 3/day', '$550/year'], featured: true },
      { name: 'Ultra', price: '$120', unit: '/mo', details: ['~12.5B tokens/mo', '6-7 Agents · video 5/day', '$1,320/year'] },
    ], tools: ['Claude Code', 'Cursor', 'Cline', 'OpenCode', 'MiniMax Code'], features: ['M3 flagship', '1M context', 'Broad integrations'],
    cta: { label: 'Subscribe to MiniMax', href: 'https://platform.minimax.io/subscribe/token-plan', detailHref: '/en/plans/minimax' },
  },
  {
    id: 'kimi', name: 'Kimi Code', heading: 'Kimi Code Plan: New Membership Live, from ¥99/mo', subtitle: 'K3 flagship (2.8T params, 1M context) + K2.8 Preview; new members drop the weekly cap, Kimi Code requires Plus or above, and Go ¥49 carries no coding quota', accent: 'purple',
    models: ['Kimi K3', 'Kimi K3-256K', 'Kimi K2.8 Preview', 'K2.7 Code HighSpeed'], entryPrice: '¥99/mo', quota: '5-hour rolling window (no weekly cap)',
    plans: [
      { name: 'Plus', badge: 'Recommended · K3', price: '¥99', unit: '/mo', note: '¥79/mo annually', details: ['Kimi Code access (Plus and above)', 'Kimi K3 flagship (2.8T parameters)', 'K3-256K budget variant', '2x Agent allowance · cluster features'] },
      { name: 'Pro', badge: 'Advanced · 1M Context', price: '¥199', unit: '/mo', note: '¥159/mo annually', details: ['K3 unlocks 1M-token conversation capacity', 'K2.7 Code high-speed (Pro and above)', '4x Agent allowance · Goal Mode', 'Dedicated Kimi Claw'] },
      { name: 'Max', badge: 'Top tier', price: '¥699', unit: '/mo', note: '¥559/mo annually', details: ['14x Agent allowance', 'Dedicated Kimi Claw · parallel Agents', '100 projects · 50GB storage'] },
      { name: 'Go', badge: 'No coding quota', price: '¥49', unit: '/mo', note: '¥39/mo annually', details: ['More Agent allowance · deep research', 'Office file handling · site deployment', 'Kimi Code not included (needs Plus+)'] },
    ],
    tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'], features: ['Kimi K3', 'No weekly cap', 'Code needs Plus+', 'Extra Usage top-up'],
    cta: { label: 'Start with Kimi', href: 'https://www.kimi.com/code?track_id=a7532112-efe3-4c65-a4e5-ae441848b1c5', detailHref: '/en/plans/kimi', sponsored: true },
  },
  {
    id: 'qwen', name: 'Qwen Token Plan', heading: 'Qwen Token Plan: Qwen3.8-Max 0902 Snapshot', subtitle: 'Alibaba Cloud Credits-based Token Plan: 12 new Harness benefits, 18+ multimodal models, overage at 12% off, night traffic 60% off (limited time)', accent: 'orange',
    models: ['Qwen3.8-Max (0902)', 'Qwen3.8-Flash', 'Kimi-K3', 'Deepseek-v4-pro', 'Qwen3-VL-Plus', 'Qwen-Image-3.0-Pro'], entryPrice: '¥39/mo', quota: '11,500-180,000 Credits/mo',
    plans: [
      { name: 'Lite', badge: 'Entry', price: '¥39', unit: '/mo', note: '11,500 Credits/mo', details: ['11,500 Credits/month', '1-2 concurrent Agents', 'Night 60% off (limited time)'] },
      { name: 'Standard', badge: 'Recommended', price: '¥139', unit: '/mo', note: '45,000 Credits/mo · 12 Harness benefits', details: ['45,000 Credits/month (~4x Lite)', '3-4 concurrent Agents', 'Night 60% off (limited time)'], featured: true },
      { name: 'Pro', badge: 'Heavy duty', price: '¥499', unit: '/mo', note: '180,000 Credits/mo · overage 12% off', details: ['180,000 Credits/month', '6-8 concurrent Agents', 'Overage billed at 12% off'] },
    ], tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline'], features: ['12 Harness benefits', 'Credits-based', 'Overage 12% off', 'Night 60% off (limited)'],
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
