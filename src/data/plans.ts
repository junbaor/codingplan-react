/**
 * [INPUT]: 依赖 types 的详情页领域类型、seo 的结构化数据构造函数与 plan-alternates 的 zh 侧 hreflang 映射
 * [OUTPUT]: 对外提供八个平台原站兼容标题顺序、推广参数、详情数据、slug 与查询函数
 * [POS]: data 的详情页唯一数据源，以内容顺序配置替代原站八份重复 HTML
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { PlanPageData, SeoData } from '../types'
import { zhPlanAlternates } from './plan-alternates'
import { buildPlanJsonLd } from './seo'

type PlanInput = Omit<PlanPageData, 'seo'> & { seo: Omit<SeoData, 'jsonLd'> }

function definePlan(input: PlanInput): PlanPageData {
  const plan = { ...input, seo: { ...input.seo, alternates: input.seo.alternates ?? zhPlanAlternates(input.slug), jsonLd: [] } } as PlanPageData
  plan.seo.jsonLd = buildPlanJsonLd(plan)
  return plan
}

const commonTools = ['Claude Code', 'Cursor', 'Cline', 'Roo Code', 'Kilo Code', 'OpenCode']

const zhipu = definePlan({
  slug: 'zhipu', accent: 'blue', availability: 'active',
  seo: { title: 'GLM Coding Plan 多少钱？智谱三档价格与非高峰 5 折省钱攻略（2026）', description: '智谱 GLM Coding Plan 多少钱？Lite ¥118 / Pro ¥538 / Max ¥1078 连续包月，包年 7 折低至 ¥94.4/月；GLM-5.3 与 GLM-5.3-Flash 全档可用，非高峰积分 5 折最高再省一半。附三档对比表与官方购买入口，帮你选对档位不浪费。', canonical: 'https://codingplan.org/plans/zhipu', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '智谱 AI · GLM Coding Plan', title: '智谱 GLM', highlight: 'Coding Plan', description: 'GLM-5.3-Flash（8/26 上线，GLM-5 系首个原生多模态模型，编码/Agent 接近 Claude Opus 4.8）与 GLM-5.3 已推送全量用户。套餐为连续包月价 + 5 小时/每周双窗口积分制，非高峰时段积分 5 折，连包季 8 折、包年 7 折。', stats: [{ value: '3', label: '套餐档位' }, { value: '¥118', label: '起步价/月' }, { value: '140K', label: 'Max 每周积分' }, { value: '5 折', label: '非高峰抵扣' }] },
  modelsTitle: '模型介绍', modelsDescription: '所有套餐均支持 GLM-5.3 与 GLM-5.3-Flash（8/26 新上线）；调用历史模型将自动切换到对应新版。',
  models: [
    { icon: '🚀', name: 'GLM-5.3', description: '新旗舰（8/14 发布并上线全量用户）。靠后训练 Scaling 将编程体感较 5.2 再提升 50%：Terminal-Bench 3.0 开源第一（4.6→28.3）、DeepSWE v1.1 达 66.9。权重于 8/28 在 HuggingFace 放出。', badge: '旗舰 · Terminal-Bench 开源第一' },
    { icon: '⚡', name: 'GLM-5.3-Flash', description: '8/26 上线的新模型：GLM-5 系首个原生多模态（320B 总参 / 18B 激活，线性+稀疏混合注意力），DeepSWE v1.1 63.4 超越 GLM-5.2，编码/Agent 能力接近 Claude Opus 4.8；用量为 GLM-5.3 的 3 倍（积分系数更低）。权重已 MIT 开源。', badge: '8/26 新上线 · 原生多模态' },
    { icon: '🔁', name: '历史模型自动路由', description: '调用 GLM-5.2 / GLM-5.1 将自动切换至 GLM-5.3，调用 GLM-5-Turbo / GLM-4.7 将自动切换至 GLM-5.3-Flash，无需改配置即可获得升级。' },
  ],
  plansTitle: '套餐详情', plansDescription: '连续包月价 ¥118/¥538/¥1078，连包季 8 折，连包年 7 折；积分按 5 小时 + 每周双窗口刷新，非高峰时段（周一至五 14:00-18:00 以外）5 折抵扣。', purchaseUrl: 'https://www.bigmodel.cn/glm-coding?ic=TOFGVCLIVG',
  plans: [
    { name: 'Lite', badge: '轻量级', price: '¥118', unit: '/月', discount: '连包季 8 折 · 连包年 7 折（年付约 ¥94.4/月）', features: ['5h 2,000 积分 · 每周 10,000 积分', 'GLM-5.3 / GLM-5.3-Flash 全档可用', '支持 ZCode / Claude Code 等 20+ 编程工具', '4 类 MCP 全套餐内置'], audience: '个人开发者、轻量级小型 Repo 迭代用户' },
    { name: 'Pro', badge: '推荐', price: '¥538', unit: '/月', discount: '连包季 8 折 · 连包年 7 折（年付约 ¥430.4/月）', features: ['5h 12,000 积分 · 每周 60,000 积分（6× Lite）', 'Lite 全部权益', '更快生成速度与高峰期保障', '覆盖多款精选 MCP 工具'], audience: '中型 Repo 日常开发、需要 MCP 工具的中高频用户', featured: true },
    { name: 'Max', badge: '重度畅用', price: '¥1,078', unit: '/月', discount: '连包季 8 折 · 连包年 7 折（年付约 ¥862.4/月）', features: ['5h 28,000 积分 · 每周 140,000 积分（14× Lite）', 'Pro 全部权益', '首发接入最新旗舰模型与功能', '高峰期专属资源优先保障'], audience: '高阶用户、中大型 Repo 深度开发、需要高峰保障的团队' },
  ],
  comparison: { title: '套餐横向对比', description: '额度按官网 5 小时 + 每周双窗口积分制度排列。', columns: ['功能', 'Lite', 'Pro', 'Max'], featuredColumn: 2, rows: [
    ['连续包月价', '¥118/月', '¥538/月', '¥1,078/月'],
    ['连续包年折算', '¥94.4/月', '¥430.4/月', '¥862.4/月'],
    ['5 小时积分', '2,000', '12,000', '28,000'],
    ['每周积分', '10,000', '60,000（6× Lite）', '140,000（14× Lite）'],
    ['GLM-5.3 / 5.3-Flash', '可用', '可用', '可用'],
    ['非高峰抵扣', '5 折', '5 折', '5 折'],
    ['生成速度', '标准', '更快', '高峰期优先'],
  ] },
  sections: [{ title: '积分与活动规则', description: '高峰时段为周一至周五 14:00-18:00，其余均为非高峰（积分 5 折抵扣）；官方称用满非高峰较按量调用 GLM-5.3 API 最高省 92%。', cards: [
    { icon: '👁️', title: 'MCP 内置', description: '视觉理解、联网搜索、网页读取、开源仓库 4 类 MCP 全档可用，每次调用消耗 1.2 积分。' },
    { icon: '🌙', title: '非高峰 5 折', description: '周末全天与工作日夜间积分按 50% 抵扣，重度任务挪到非高峰跑更省。' },
    { icon: '🎁', title: '限时活动', description: 'ZCode 工具额度限时 1.5×（至 8/31）；海淀注册企业团队套餐 5 折（官方活动页为准）。' },
    { icon: '🔓', title: '开源节奏', description: 'GLM-5.3-Flash 权重已 MIT 开源；GLM-5.3 旗舰权重 8/28 在 HuggingFace 放出。' },
  ] }],
  tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', ...commonTools, 'Crush', 'Factory'],
  faqs: [
    { question: 'GLM Coding Plan 最新价格是多少？', answer: '智谱 GLM Coding Plan 现采用连续包月价：Lite ¥118/月（年付约 ¥94.4/月）、Pro ¥538/月（年付约 ¥430.4/月）、Max ¥1078/月（年付约 ¥862.4/月）。连续包季 8 折，连续包年 7 折。' },
    { question: 'GLM Coding Plan 支持哪些模型？', answer: '所有套餐均支持 GLM-5.3（8/14 发布，Terminal-Bench 3.0 开源第一）与 GLM-5.3-Flash（8/26 上线，原生多模态，编码能力接近 Claude Opus 4.8）。调用历史模型 GLM-5.2/5.1 会自动切换到 GLM-5.3，GLM-5-Turbo/4.7 自动切换到 GLM-5.3-Flash。' },
    { question: 'GLM-5.3-Flash 是什么？', answer: '8/26 上线的新模型（原内测代号 OX Alpha）：GLM-5 系列首个原生多模态模型，总参 320B / 激活 18B，DeepSWE v1.1 得分 63.4 超越 GLM-5.2，编码/Agent 能力接近 Claude Opus 4.8。用量为 GLM-5.3 的 3 倍（积分消耗更低），已推送全部 Coding Plan 用户，权重以 MIT 协议开源。' },
    { question: '积分是怎么计算和刷新的？', answer: '套餐采用 5 小时 + 每周双窗口积分制：Lite 2,000/5h + 10,000/周，Pro 12,000/5h + 60,000/周，Max 28,000/5h + 140,000/周。每个 prompt 可能触发多次模型调用；非高峰时段（周一至五 14:00-18:00 以外）积分按 50% 抵扣。' },
    { question: 'GLM-5.3 开源了吗？', answer: 'GLM-5.3 旗舰权重按官方承诺于 8/28 在 HuggingFace 放出（发布后两周内）；GLM-5.3-Flash 权重已提前以 MIT 协议开源。' },
    { question: '可以随时升级套餐吗？', answer: '可以升级，差价通常按剩余天数折算，具体以结算页面为准。' },
  ],
})

const minimax = definePlan({
  slug: 'minimax', accent: 'orange', availability: 'active',
  seo: { title: 'MiniMax M Plan 套餐价格：Go、Explore、Build（2026）', description: 'MiniMax M Plan 国内三档月付、年付、模型与编程工具权益对比。', canonical: 'https://codingplan.org/plans/minimax', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'MiniMax · M Plan', title: 'MiniMax', highlight: 'M Plan', description: '国内 M Plan 提供 Go、Explore、Build 三档，包含 MiniMax Code 与 API Key 接入。', stats: [{ value: '3', label: '付费档位' }, { value: '¥49', label: '月付起' }, { value: 'M3.1 Flash', label: '文本模型' }, { value: 'H3', label: '视频模型' }] },
  modelsTitle: '模型与能力', models: [ { icon: '💻', name: 'M3.1 Flash', description: '三个付费档均包含文本模型、图像和语音能力、联网搜索与多模态理解。' }, { icon: '🎬', name: 'H3', description: 'Explore 与 Build 包含 H3 视频模型；Go 不含视频模型。' } ],
  plansTitle: '国内套餐', plansDescription: '连续包月价格；截至 2026 年 10 月 31 日首月五折，之后按原价续费。', purchaseUrl: 'https://platform.minimaxi.com/subscribe/token-plan?code=GhZIakShS0&source=link',
  plans: [
    { name: 'Go', price: '¥49', unit: '/月', discount: '首月 ¥24.5；年付 ¥490', features: ['M3.1 Flash、图像与声音模型', 'API Key 接入编程工具', '不含视频模型'], audience: '轻量使用' },
    { name: 'Explore', price: '¥119', unit: '/月', discount: '首月 ¥59.5；年付 ¥1,190', features: ['Go 3 倍用量', '包含 H3 视频模型', 'MiniMax Code 与 API Key'], audience: '日常使用', featured: true },
    { name: 'Build', price: '¥469', unit: '/月', discount: '首月 ¥234.5；年付 ¥4,690', features: ['Go 12 倍用量', '包含 H3 视频模型', '高峰优先及新功能抢先体验'], audience: '高频使用' },
  ],
  sections: [{ title: '额度与积分', highlights: ['订阅 Key 使用套餐额度及积分包，不会自动扣除按量 API 账户余额。', '积分包自购买起一年有效；具体额度及限制以官方页面为准。'] }],
  tools: ['MiniMax Code', 'Claude Code', 'Codex', 'Cursor', 'OpenCode'],
  faqs: [{ question: '哪些档位包含视频模型？', answer: 'Explore 和 Build 包含 H3 视频模型，Go 不包含。' }, { question: '额度用完会自动扣余额吗？', answer: '不会。订阅 Key 使用套餐额度和积分包；按量 API 余额独立。' }],
})

const kimi = definePlan({
  slug: 'kimi', accent: 'purple', availability: 'active',
  seo: { title: 'Kimi Coding Plan 多少钱？新会员套餐价格与额度（2026）', description: 'Kimi 国内会员 Go、Plus、Pro、Max、Ultra 价格与 Kimi Code 权益对比：Plus 起支持编程，新套餐保留 5 小时限额及月度共享额度。', canonical: 'https://codingplan.org/plans/kimi', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'Moonshot AI · Kimi Code', title: 'Kimi', highlight: 'Code Plan', description: 'Kimi 新会员套餐已上线，Plus 起支持 Kimi Code；会员功能共享月度额度，旧套餐可按原规则继续使用。', stats: [{ value: '5', label: '付费档位' }, { value: '¥99', label: '编程起步价/月' }, { value: '5h', label: '滚动频限' }, { value: '月度', label: '共享额度' }] },
  modelsTitle: '模型介绍', modelsDescription: '模型可用性与上下文长度以官方会员说明为准。', models: [
    { icon: '🌟', name: 'Kimi K3', description: '新套餐 Plus 起可调用，Pro 起可解锁最高 1M 上下文；k3-256k 提供较低额度消耗。' },
    { icon: '💻', name: 'Kimi Code', description: '通过 Kimi Code CLI、桌面端及支持的第三方工具使用编程模型。' },
  ],
  plansTitle: '国内新会员套餐', plansDescription: '以下为连续包月价格；Go 不含 Kimi Code，Plus 起可用。', purchaseUrl: 'https://www.kimi.com/code',
  plans: [
    { name: 'Go', price: '¥49', unit: '/月', discount: '连续包年 ¥468', features: ['不含 Kimi Code', '1 个 Agent 任务并行', '20 个项目 · 20GB 存储'], audience: '办公与轻量使用' },
    { name: 'Plus', price: '¥99', unit: '/月', discount: '连续包年 ¥948', features: ['包含 Kimi Code 和 K3', '2 个 Agent 任务并行', '20 个项目 · 20GB 存储'], audience: '日常编程', featured: true },
    { name: 'Pro', price: '¥199', unit: '/月', discount: '连续包年 ¥1,908', features: ['K3 最高 1M 上下文', '目标模式与专属 Kimi Claw', '2 个 Agent 任务并行'], audience: '进阶用户' },
    { name: 'Max', price: '¥699', unit: '/月', discount: '连续包年 ¥6,708', features: ['4 个 Agent 任务并行', '100 个项目 · 50GB 存储', '包含 Kimi Code'], audience: '高频用户' },
    { name: 'Ultra', price: '¥1,399', unit: '/月', discount: '连续包年 ¥13,428', features: ['4 个 Agent 任务并行', '100 个项目 · 50GB 存储', '包含 Kimi Code'], audience: '重度使用' },
  ],
  sections: [{ title: '新旧套餐和额度', highlights: ['新套餐 Kimi Code 保留滚动 5 小时限额，不设周限额；会员功能共享月度额度。', '旧套餐的名称、额度规则和自动续费保持不变，可继续使用或按官方选项升级。', '订阅额度用尽后，可按官方规则使用加油包。'] }],
  tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'OpenCode'],
  faqs: [
    { question: '哪个套餐支持 Kimi Code？', answer: '国内新套餐 Plus 及以上支持 Kimi Code，Go 不包含；旧套餐 Andante 及以上仍可使用。' },
    { question: '额度如何刷新？', answer: '新套餐受滚动 5 小时限额和月度共享额度约束，没有周限额；旧套餐仍有周限额。' },
    { question: '旧会员需要升级吗？', answer: '不需要强制迁移，旧套餐可继续使用、续费或按官方选项升级。' },
  ],
})

const volcengine = definePlan({
  slug: 'volcengine', accent: 'cyan', availability: 'limited',
  seo: { title: '火山引擎 Coding Plan 多少钱？方舟 2.5 折首购 ¥9.9 起 + 8 款模型（2026）', description: '火山引擎方舟 Coding Plan 多少钱？Lite 首购 ¥9.9 / Pro 首购 ¥49.9（刊例 ¥40/¥200，2.5 折活动至 11/8）；模型池含 GLM-5.3、Doubao-Seed-Evolving、DeepSeek-V4-Pro 等 8+ 款自由切换，Auto 模式智能调度。附首购入口与选档建议，入门一个月不到 10 块钱。', canonical: 'https://codingplan.org/plans/volcengine', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '火山引擎 · 方舟 Coding Plan', title: '火山引擎方舟', highlight: 'Coding Plan', description: '8+ 款模型自由切换 / Auto 模式智能调度；新接入 GLM-5.3（1M 上下文）、Doubao-Seed-Evolving 与 DeepSeek-V4-Pro 正式版。限时 2.5 折普惠活动至 11/8：Lite 首购 ¥9.9、Pro 首购 ¥49.9。', stats: [{ value: '8+', label: '可用模型' }, { value: '¥9.9', label: 'Lite 首购' }, { value: '¥49.9', label: 'Pro 首购' }, { value: 'Auto', label: '智能调度' }] },
  modelsTitle: '模型阵容', modelsDescription: '模型池 8 月密集更新：新增 GLM-5.3 / Doubao-Seed-Evolving / DeepSeek-V4-Pro 正式版；GLM-5.2 将于 8/31 下线。', models: [
    { icon: '🚀', name: 'Doubao-Seed-2.1-turbo', description: '字节跳动最新高速代码模型（256K 上下文），当前豆包主力档。', badge: '豆包主力' },
    { icon: '🌱', name: 'Doubao-Seed-Evolving', description: '8/21 新增：统一模型 ID 周级自动升级（无需改代码），1M 上下文 / 256K 输出，持续吃到豆包最新版本。', badge: '8/21 新增' },
    { icon: '🔷', name: 'GLM-5.3', description: '智谱新旗舰（8/14 接入），1M 上下文；抵扣系数较高，默认开启思考模式不可关闭。', badge: '新接入' },
    { icon: '🌙', name: 'Kimi-K3（Auto 路由）', description: 'K3 通过 Auto 模式路由调用（抵扣系数 1），夜间 00:00-08:00 路由比例大幅提升；Kimi-K2.7-Code（256K/32K）为模型池直选项。' },
    { icon: '🔥', name: 'MiniMax-M3', description: 'MiniMax 旗舰模型，1M 上下文 / 128K 输出，多模态输入。' },
    { icon: '🐋', name: 'DeepSeek-V4 系列', description: 'V4-Pro 正式版（8/26 上线，Agent 能力全面跃升）与 V4-Flash 正式版（1M/384K）。', badge: 'V4-Pro 8/26 上线' },
    { icon: '⏳', name: 'GLM-5.2（即将下线）', description: '将于 8/31 14:00 正式下线，到期未迁移自动路由至 GLM-5.3；此前的限时加量 4 倍活动已于 8/8 结束。' },
    { icon: '✨', name: 'Auto 模式', description: '根据任务类型自动选择合适模型（默认开启），Coding Plan 内抵扣系数 1。' },
  ],
  plansTitle: '套餐详情', plansDescription: '限时 2.5 折普惠（活动期 2026/6/8-11/8，首两个月，名额有限）：Lite 首购 ¥9.9、Pro 首购 ¥49.9；受邀再 9.5 折。', purchaseUrl: 'https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=33BB3T98',
  plans: [
    { name: 'Lite', badge: '首购 ¥9.9/月起', price: '¥40', unit: '/月', discount: '首两个月 2.5 折 ¥9.9 · 受邀再 9.5 折', features: ['刊例价 ¥40/月', '满足个人开发者轻量化需求', 'Doubao / GLM / DeepSeek / Kimi / MiniMax 等', '支持 Auto 模式', '适配 Claude Code、Cursor 等主流工具'], audience: '个人开发者和希望低成本体验多模型的用户' },
    { name: 'Pro', badge: '推荐 · 首购 ¥49.9/月', price: '¥200', unit: '/月', discount: '首两个月 2.5 折 ¥49.9 · 5 倍 Lite 用量', features: ['刊例价 ¥200/月，5 倍于 Lite 套餐用量', '满足高阶用户的大规模编程需求', '享受 Lite 套餐全部能力', '支持 Auto 模式'], audience: '高强度开发任务的专业团队', featured: true },
  ],
  comparison: { title: '套餐横向对比', description: '额度按 5 小时 / 周 / 月三级窗口刷新（周一 00:00 重置周额度）。', columns: ['功能', 'Lite', 'Pro'], featuredColumn: 2, rows: [
    ['刊例价', '¥40/月', '¥200/月'],
    ['限时首购价（前两月）', '¥9.9/月', '¥49.9/月'],
    ['用量倍率', '1×', '5× Lite'],
    ['模型池', '8+ 款 + Auto', '8+ 款 + Auto'],
  ] },
  sections: [
    { title: '优惠活动', headingLevel: 3, warning: '活动价格与库存会变化，请在支付前确认结算价。2.5 折普惠活动期 2026/6/8-11/8，名额有限先到先得。', highlights: ['Lite / Pro 首两个月 2.5 折（¥9.9 / ¥49.9 起），新购/续费/升配共享同一资格', '受邀下单再享 9.5 折，邀请人返 5% 代金券，邀请人数无上限', 'Auto 模式夜间（00:00-08:00）Kimi-K3 路由比例大幅提升', '另有 Agent Plan 产品线（Small ¥40 / Medium ¥200 / Large ¥500 / Max ¥1,000/月）覆盖全模态'] },
    { title: '套餐规则', headingLevel: 3, cards: [
      { title: '额度共享', description: '所有支持的工具共享同一套餐额度，跨工具不重复计算。' },
      { title: '三级窗口', description: '5 小时 / 周（每周一 00:00 重置）/ 月（每订阅月 1 日重置）三级限额。' },
      { title: '购买即开通', description: 'Coding Plan 购买即开通模型，无需单独创建接入点。' },
    ] },
  ],
  tools: ['Claude Code', 'Cursor', 'Cline', 'Codex CLI', 'Kilo Code', 'OpenCode'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'section:1', 'faq'],
  faqs: [
    { question: '可以随意切换模型吗？', answer: '可以手动切换，也可以使用 Auto 模式根据任务自动选择；Auto 模式抵扣系数为 1，夜间会大幅提升 Kimi-K3 的路由比例。' },
    { question: '限时 9.9 元起怎么享受？', answer: '「Coding Plan Lite & Pro 套餐 2.5 折普惠活动」活动期 2026/6/8-11/8：所有用户首两个月 2.5 折（Lite ¥9.9/月、Pro ¥49.9/月），名额有限先到先得，新购、升级、续费共享同一优惠资格，第三个月恢复刊例价。' },
    { question: 'Pro 套餐多少钱？', answer: '方舟 Coding Plan Pro 刊例价 ¥200/月，用量为 Lite 的 5 倍；活动期内首两个月 2.5 折（¥49.9/月），受邀下单再享 9.5 折。' },
    { question: '邀请好友的优惠怎么算？', answer: '每邀请一位好友下单可获得其订单金额 5% 的代金券，上不封顶；好友首次订阅可额外享 9.5 折。' },
    { question: 'GLM-5.2 还能用吗？', answer: 'GLM-5.2 将于 2026/8/31 14:00 从方舟 Coding Plan 下线，到期未迁移的调用会自动路由至 GLM-5.3；此前的限时加量 4 倍活动已于 8/8 结束。' },
    { question: '限购是什么意思？', answer: '套餐限量发售，库存售完后无法购买，库存状态以官网实时页面为准。' },
  ],
})

const aliyun = definePlan({
  slug: 'aliyun', accent: 'orange', availability: 'active',
  seo: { title: '阿里云 Qwen Coding Plan 多少钱？百炼 Token Plan 早鸟 ¥39 起（2026）', description: '阿里云 Coding Plan（现已升级为百炼 Token Plan）多少钱？个人版早鸟 ¥39 / ¥139 / ¥499 三档对比，Qwen3.8-Max 与 DeepSeek-V4-Pro 在列、18 款模型共享 Credits，夜间 22:00-08:00 五折。附早鸟购买入口与选档建议，早鸟价先锁一年不吃亏。', canonical: 'https://codingplan.org/plans/aliyun', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '阿里云百炼 · Token Plan', title: '阿里云百炼', highlight: 'Token Plan', description: 'Coding Plan 已全面升级为 Token Plan：Credits 计量、多模态旗舰共享额度。Qwen3.8-Max 预览版已转正（2.4T、1M 上下文），新增 qwen3.8-flash 与 deepseek-v4-pro-0813；个人版早鸟 ¥39/月起，夜间五折。', stats: [{ value: '¥39', label: '早鸟月付' }, { value: '18', label: '款模型' }, { value: '40,000', label: 'Pro Credits/7天' }, { value: '8', label: 'Agent 并发（Pro）' }] },
  modelsTitle: '模型阵容', modelsDescription: 'Qwen3.8-Max 已转正为正式版，新增 qwen3.8-flash、deepseek-v4-pro-0813 与图像/音频模型；Qwen / DeepSeek / GLM / Wan 多模态共享 Credits。', models: [
    { icon: '☁️', name: 'Qwen3.8-Max（已转正）', description: '阿里 2.4T 参数新一代旗舰，预览版已结束并转正（旧 ID 自动路由）；1M 上下文，官方称可自主编程十数天交付完整项目。', badge: '正式版' },
    { icon: '💨', name: 'qwen3.8-flash（新）', description: '千问 3.8 高速版，新增的低成本档。', badge: '新增' },
    { icon: '🧠', name: 'deepseek-v4-pro-0813', description: 'DeepSeek-V4-Pro 的 0813 版本快照，新接入。', badge: '新增' },
    { icon: '⌨️', name: 'qwen3.7-max / qwen3.7-plus', description: '千问 3.7 系列推理与通用旗舰。' },
    { icon: '🖥️', name: 'qwen3-coder / qwen3.6-flash', description: '面向软件工程的代码模型与高速档。' },
    { icon: '🎨', name: 'qwen-image-3.0-pro / qwen-audio-3.0 系列', description: '新增的图像生成与实时音频/ASR 模型，另有 wan2.7 图像、happyhorse-1.1 视频与 TTS，与文本共享 Credits。' },
    { icon: '🔷', name: 'GLM 系列', description: '智谱旗舰模型（glm-5.2）。' },
  ],
  plansTitle: '个人版套餐', plansDescription: '早鸟限时价（Lite 6.5 折 / Standard 7.7 折 / Pro 8.3 折），Credits 按 7 天窗口刷新；另有团队版席位（¥150/席/月起）。', purchaseUrl: 'https://www.aliyun.com/benefit/scene/codingplan?source=5176.29345612&userCode=j0hv8tuh',
  plans: [
    { name: 'Lite', badge: '早鸟 ¥39/月', price: '¥39', unit: '/月', discount: '早鸟 6.5 折（原价 ¥60/月）', features: ['2,500 Credits/7天', '1-2 个 Agent 并发', '全模态模型共享额度', '夜间五折更省'], audience: '轻度使用与尝鲜用户' },
    { name: 'Standard', badge: '推荐', price: '¥139', unit: '/月', discount: '早鸟 7.7 折（原价 ¥180/月）· 4× Lite 用量', features: ['10,000 Credits/7天', '3-4 个 Agent 并发', 'Lite 全部权益', '夜间五折更省'], audience: '日常开发的主力档位', featured: true },
    { name: 'Pro', badge: '重度畅用', price: '¥499', unit: '/月', discount: '早鸟 8.3 折（原价 ¥600/月）· 16× Lite 用量', features: ['40,000 Credits/7天', '6-8 个 Agent 并发', 'Standard 全部权益', '夜间五折更省'], audience: '高频、大型项目和专业开发者' },
  ],
  comparison: { title: '套餐横向对比', description: '早鸟限时价与 7 天 Credits 额度，实际消耗取决于模型 Credits 倍率。', columns: ['套餐', '早鸟月付', '原价', 'Credits/7天', 'Agent 并发'], featuredColumn: 2, rows: [['Lite', '¥39', '¥60', '2,500', '1-2'], ['Standard', '¥139', '¥180', '10,000', '3-4'], ['Pro', '¥499', '¥600', '40,000', '6-8'], ['用量包', '¥100/个', '—', '20,000/个', '无限']] },
  sections: [{ title: '额度与接入规则', warning: '早鸟价为限时优惠；夜间 22:00-次日 08:00 调用 qwen3.8-max 与 deepseek-v4-pro-0813 享 Credits 五折，活动以官网为准。', cards: [
    { title: '专属 API Key', description: '套餐提供 sk-sp- 开头的专属 API Key 与 Base URL，通用百炼 Key 不抵扣额度。' },
    { title: '7 天滚动窗口', description: '自首次调用起开启 7 天计时窗口，累计消耗达到限额后暂停服务，窗口结束后恢复。' },
    { title: '夜间五折', description: '每晚 22:00-次日 08:00，qwen3.8-max 与 deepseek-v4-pro-0813 的 Credits 消耗享 5 折，重度任务可挪到夜间跑。' },
    { title: '数据不训练', description: '计划内调用承诺不用于模型训练。' },
  ] }, { title: '旧 Coding Plan 去向', headingLevel: 3, highlights: ['按次数计费的 Coding Plan（Lite ¥40 / Pro ¥200）已升级为 Credits 计量的 Token Plan', '旧 Lite 此前已停售，Pro 每日 9:30 限量补货的模式不再适用', '老用户按官方指引迁移，历史额度口径以订单页为准'] }],
  tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'OpenCode'],
  contentOrder: ['models', 'plans', 'section:0', 'comparison', 'section:1', 'faq'],
  faqs: [
    { question: 'Token Plan 和原来的 Coding Plan 是什么关系？', answer: '阿里云百炼已将按次数计费的 Coding Plan 全面升级为 Credits 计量的 Token Plan：模型从 Qwen3.5 扩展到 Qwen3.8-Max（已转正）+ deepseek-v4-pro-0813 等多模态旗舰，额度从「次数」改为按模型倍率抵扣的 Credits，并新增个人版/团队版双版本。' },
    { question: '个人版三档怎么选？', answer: 'Lite ¥39/月（2,500 Credits/7天）适合轻度；Standard ¥139/月（10,000 Credits/7天，4× Lite）是日常主力；Pro ¥499/月（40,000 Credits/7天，16× Lite）面向重度与多 Agent 并发。均为早鸟限时价。' },
    { question: 'Credits 是怎么消耗的？', answer: '不同模型有不同的 Credits 倍率，自首次调用起按 7 天滚动窗口累计消耗；夜间 22:00-次日 08:00 调用 qwen3.8-max 与 deepseek-v4-pro-0813 享五折。' },
    { question: '还有团队版吗？', answer: '有。团队版按席位订阅：标准席位 ¥150/席/月（25,000 Credits/月）、高级席位 ¥550/席/月（100,000）、尊享席位 ¥1,398/席/月（250,000，早鸟价），模型池 29 款，适合企业统一管理。' },
    { question: '旧的每日 9:30 补货还有吗？', answer: '不再适用。旧 Coding Plan Pro 的限量补货模式已随产品升级取消，Token Plan 可直接订阅。' },
    { question: '支持退款吗？', answer: '已激活套餐通常不支持退款，请在购买前确认规则。' },
  ],
})

const tencentcloud = definePlan({
  slug: 'tencentcloud', accent: 'blue', availability: 'archived',
  seo: { title: '腾讯云 Coding Plan [已下线] - 历史参考 - HY 2.0/GLM-5/Kimi-K2.5/MiniMax', description: '腾讯云 Coding Plan 已于 2026-04-22 下线并转向 Credits 计量的 Token Plan。本页归档 Lite ¥40 / Pro ¥200 历史价格、1,200-6,000 次/5h 额度、HY 2.0、GLM-5、Kimi-K2.5、MiniMax 支持模型与工具接入记录，仅供历史参考。', canonical: 'https://codingplan.org/plans/tencentcloud', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '已下线 · 历史归档', title: '腾讯云', highlight: 'Coding Plan', description: '2026-04-22 全面下线并转向 Credits 计量的 Token Plan，本页仅保留历史资料。', stats: [{ value: '2026-04-22', label: '下线日期' }, { value: '2', label: '历史档位' }, { value: '4', label: '历史模型' }] },
  modelsTitle: '模型阵容', modelsDescription: '下列信息不代表当前可购买产品。', models: [
    { icon: '☁️', name: 'Tencent HY 2.0 Instruct', description: '腾讯混元历史模型。' }, { icon: '🔷', name: 'GLM-5', description: '智谱旗舰模型。' }, { icon: '🌙', name: 'Kimi-K2.5', description: 'Moonshot AI 模型。' }, { icon: '🔥', name: 'MiniMax-M2.5', description: '详情页历史记录型号。' },
    { icon: '✨', name: '更多模型接入中', description: '原页面保留的历史接入说明。' },
  ],
  plansTitle: '套餐详情', plansDescription: '均已下架，不提供购买入口。',
  plans: [
    { name: 'Lite', badge: '已下架', price: '¥40', unit: '/月', discount: '历史首月 ¥7.9 · 次月 ¥20', features: ['1,200 次/5h', '9,000 次/周', '18,000 次/月'], audience: '历史轻度套餐', disabled: true },
    { name: 'Pro', badge: '已下架', price: '¥200', unit: '/月', discount: '历史首月 ¥39.9 · 次月 ¥100', features: ['6,000 次/5h', '45,000 次/周', '90,000 次/月'], audience: '历史专业套餐', disabled: true },
  ],
  comparison: { title: '用量对比', columns: ['套餐', '5 小时', '每周', '每月'], rows: [['Lite', '1,200', '9,000', '18,000'], ['Pro', '6,000', '45,000', '90,000']] },
  sections: [{ title: '🚀 如何在 Claude Code 中使用腾讯云 Coding Plan？', headingLevel: 3, warning: '产品页面已不可用，请勿依据本页历史价格做购买决策。', highlights: ['Coding Plan 已全面下线', '本节仅保留历史接入说明'] }],
  tools: ['OpenClaw', 'CodeBuddy', 'Claude Code', 'Cline', 'Cursor'],
  toolsTitle: '支持工具',
  contentOrder: ['models', 'plans', 'tools', 'section:0', 'comparison', 'faq'],
  faqs: [
    { question: '腾讯云 Coding Plan 还能购买吗？', answer: '不能，产品已于 2026-04-22 全面下线。' },
    { question: '为什么保留这个页面？', answer: '用于保留历史价格、模型和额度信息，方便比较市场变化。' },
    { question: '历史套餐支持哪些工具？', answer: '历史记录包括 OpenClaw、CodeBuddy、Claude Code、Cline 和 Cursor。' },
  ],
})

const xiaomi = definePlan({
  slug: 'xiaomi', accent: 'orange', availability: 'active',
  seo: { title: '小米 MiMo Coding Plan 详解 - 5/26 全档 Credits 升级 5-8 倍，MiMo Claw 正式上线', description: '小米 MiMo Token Plan Lite、Standard、Pro、Max 价格、Credits（492-9,840 亿/年）、首购优惠、夜间折扣、TTS 权益与 MiMo Claw 加购。5/26 起全档 Credits 升级 5-8 倍，V2 系列已下线。', canonical: 'https://codingplan.org/plans/xiaomi', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '小米 · MiMo Token Plan', title: '小米 MiMo', highlight: 'Coding Plan', description: 'MiMo-V2.6 系列模型。5/26 起全档 Credits 额度升级 5-8 倍，MiMo Claw 正式版上线（加购 ¥233.80/年），夜间 0.8 倍消耗，TTS 限时免费。', stats: [{ value: '4', label: '套餐档位' }, { value: '¥39', label: '起步价/月' }, { value: 'V2.6', label: '模型系列' }, { value: '0.8x', label: '夜间消耗' }] },
  modelsTitle: '模型介绍', modelsDescription: 'V2.5 与 V2.5-Pro 已于 2026/10/21 下线，现提供 V2.6 系列；支持 TTS 限时免费。', models: [
    { icon: '🔥', name: 'MiMo-V2.6-Pro', description: '面向复杂编程与推理任务的旗舰型号。', badge: '旗舰' },
    { icon: '⚡', name: 'MiMo-V2.6-Flash / 全模态', description: '日常编程与通用任务模型，具体模态支持以官方文档为准。' },
    { icon: '🔊', name: 'MiMo TTS 系列', description: '语音合成模型，活动期内限时免费。', badge: '限时免费' },
  ],
  plansTitle: '套餐详情', plansDescription: '月价不变、首购 8.8 折、年付 88 折；5/26 起全档 Credits 升级 5-8 倍；MiMo Claw 首次 ¥14.9/月 或加购 ¥233.80/年。', purchaseUrl: 'https://platform.xiaomimimo.com/token-plan',
  plans: [
    { name: 'Lite', badge: '尝鲜入门', price: '¥39', unit: '/月', discount: '首购 ¥34.32 · 年付 ¥411.84（立省 ¥56.16）', features: ['492 亿 Credits/年（约 41 亿/月）', '支持 V2.6 系列模型（文本旗舰 / 全模态 / 语音）', '支持 OpenClaw、Codex、ClaudeCode、MiMoCode 等', '非高峰期（00:00-08:00）0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '轻度尝鲜用户', ctaLabel: '立即订阅 Lite →' },
    { name: 'Standard', badge: '日常', price: '¥99', unit: '/月', discount: '首购 ¥87.12 · 年付 ¥1,045.44（立省 ¥142.56）', features: ['1,320 亿 Credits/年（2.7× Lite）', '支持 V2.6 系列模型', '支持 OpenClaw、Codex、ClaudeCode、MiMoCode 等', '非高峰期 0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '日常中等频率用户', ctaLabel: '立即订阅 Standard →' },
    { name: 'Pro', badge: '推荐', price: '¥329', unit: '/月', discount: '首购 ¥289.52 · 年付 ¥3,474.24（立省 ¥473.76）', features: ['4,560 亿 Credits/年（9.3× Lite）', '支持 V2.6 系列模型', '支持 OpenClaw、Codex、ClaudeCode、MiMoCode 等', '非高峰期 0.8x 系数消耗', 'TTS 系列模型限时免费', '可加购 MiMo Claw ¥233.80/年'], audience: '专业高频用户', ctaLabel: '立即订阅 Pro →', featured: true },
    { name: 'Max', badge: '团队', price: '¥659', unit: '/月', discount: '首购 ¥579.92 · 年付 ¥6,959.04（立省 ¥948.96）', features: ['9,840 亿 Credits/年（20× Lite）', '支持 V2.6 系列模型', '支持 OpenClaw、Codex、ClaudeCode、MiMoCode 等', '非高峰期 0.8x 系数消耗', 'TTS 系列模型限时免费', '可加购 MiMo Claw ¥233.80/年'], audience: '发烧友与团队', ctaLabel: '立即订阅 Max →' },
  ],
  sections: [{ title: '套餐亮点', cards: [
    { icon: '🔥', title: 'MiMo-V2.6-Pro 旗舰模型', description: '面向复杂编程与推理任务的旗舰型号。' },
    { icon: '💸', title: '5/26 全档 Credits 升级 5-8 倍', description: '价格不变，Credits 额度大幅提升，相当于变相降价。' },
    { icon: '💰', title: '包年 88 折', description: '年付价格相比逐月订阅立省 56-948 元。' },
    { icon: '🦞', title: 'MiMo Claw 正式版上线', description: '可加购 MiMo Claw 服务：首次特惠 ¥14.9/月、限时 ¥19.9/月 或 ¥233.80/年，享受专属龙虾 7×24h + 金山办公生态。' },
    { icon: '🌙', title: '夜间调用享 8 折', description: '北京时间 00:00-08:00 按 0.8 倍 Credits 消耗。' },
    { icon: '🔊', title: 'TTS 模型限时免费', description: 'TTS 系列模型在活动期内免费使用。' },
    { icon: '🔁', title: '自动续费随时取消', description: '套餐到期自动续费，可按官方规则取消。' },
    { icon: '🧩', title: 'V2.6 系列可用', description: 'V2.6 系列及其他支持模型通过 API Key 与 Base URL 接入，具体清单以官网为准。' },
    { icon: '🤝', title: '邀请返利', description: '邀好友首单 9 折，邀请人最高返实付 20%（首单返 10%，年费会员翻倍）。' },
  ], warning: 'V2.5 与 V2.5-Pro 已于 2026/10/21 下线，请使用 V2.6 系列。月度价格不变，年付 88 折后分别为 ¥411.84/¥1,045.44/¥3,474.24/¥6,959.04。' }],
  tools: ['OpenClaw', 'Codex', 'Claude Code', 'MiMo Code', 'OpenCode', 'Kilo Code', 'Cline', 'Cherry Studio', 'Qwen Code'],
  faqs: [
    { question: '夜间折扣如何计算？', answer: '北京时间 00:00-08:00 调用按 0.8 倍 Credits 消耗。' },
    { question: '支持哪些模型？', answer: '支持 V2.6 系列模型（文本旗舰 / 全模态 / 语音）；MiMo-V2 系列已于 2026/6/30 下线。' },
    { question: '5/26 升级对 Token Plan 有什么影响？', answer: '全档 Credits 额度提升 5-8 倍，月价不变，年付 88 折。Lite 492 亿/年，Standard 1,320 亿/年，Pro 4,560 亿/年，Max 9,840 亿/年。' },
    { question: 'MiMo Claw 是什么？', answer: 'MiMo Claw 正式版已上线，可按首次特惠 ¥14.9/月、限时 ¥19.9/月 或 ¥233.80/年加购，享受专属龙虾 7×24h、多任务并行、金山办公深度服务等权益。' },
    { question: '邀请好友有优惠吗？', answer: '有。好友通过邀请首单享 9 折；邀请人最高返实付金额 20%（首单返 10%，Max/Standard 年费会员再翻倍），注册双方还可各得 ¥10（限前 30 人）。' },
    { question: '如何接入编程工具？', answer: '使用 API Key 和 Base URL 接入 Claude Code、OpenCode、Kilo Code 等兼容工具。' },
    { question: '是否自动续费？', answer: '套餐支持自动续费并可取消，退款和取消生效时间以官网条款为准。' },
  ],
})

const baiyunzhisuan = definePlan({
  slug: 'baiyunzhisuan', accent: 'cyan', availability: 'active',
  seo: { title: '白云智算 API 详解 - MiniMax/GLM/DeepSeek/Kimi/Qwen 注册送450元代金券', description: '白云智算按量 API 详解：注册实名领 ¥150、完成首调再领 ¥300 代金券（合计 ¥450）的步骤，MiniMax / GLM / DeepSeek / Kimi / Qwen 支持模型清单、按 token 计费规则与限制、OpenAI 兼容接口接入 Claude Code，以及与 AI 编程订阅套餐的差异。', canonical: 'https://codingplan.org/plans/baiyunzhisuan', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '白云智算 · 按量 API', title: '白云智算', highlight: '大模型 API', description: '按 token 用量付费，无月费门槛；通过推荐链接注册并完成首调，最高领取 ¥450 代金券。', stats: [{ value: '¥450', label: '最高代金券' }, { value: '0', label: '固定月费' }, { value: '5+', label: '模型系列' }, { value: 'OpenAI', label: '兼容 API' }] },
  modelsTitle: '支持的模型', modelsDescription: '多模型按量调用，具体型号和单价以控制台为准。', models: [
    { icon: '🔥', name: 'MiniMax-M2.5', description: 'MiniMax 模型 API。' }, { icon: '🔷', name: 'GLM-5 / GLM-4.7', description: '智谱模型 API。' }, { icon: '🐋', name: 'DeepSeek', description: 'DeepSeek 系列模型。' }, { icon: '🌙', name: 'Kimi', description: 'Kimi / Kimi-K2.5 系列。' }, { icon: '☁️', name: 'Qwen（千问）', description: '千问与 Qwen3-Coder 系列。' },
  ],
  plansTitle: '注册福利', plansDescription: '这是按量 API 福利，不是月度订阅套餐。',
  plans: [
    { name: '实名认证', badge: '即时到账', price: '¥150', unit: '代金券', features: ['通过推荐链接注册', '完成实名认证', '通常即时到账'], audience: '首次注册用户' },
    { name: '首次 API 调用', badge: '约3个工作日', price: '¥300', unit: '代金券', features: ['完成首次 API 调用', '进入审核流程', '约 3 个工作日到账'], audience: '完成首调的新用户', featured: true },
  ],
  sections: [
    { title: '如何领取', highlights: ['通过带 referralCode 的推荐链接注册', '完成实名认证领取 ¥150', '创建 API Key 并完成首次调用，审核后领取 ¥300'] },
    { title: '按量计费的优势', headingLevel: 3, cardHeadings: false, cards: [{ icon: '🪙', title: '无固定月费', description: '代金券用完后按实际 token 用量收费。' }, { icon: '🔀', title: '多模型切换', description: '一个兼容接口接入多个模型系列。' }, { icon: '🧩', title: 'OpenAI 兼容', description: '可配置到 Claude Code、Cursor 和 Cline。' }] },
    { title: '与订阅套餐的区别', warning: '低频使用时按量付费更灵活，高频重度使用时总成本可能高于订阅。', cards: [{ title: '白云智算（按量 API）', description: '按实际 token 付费，不绑定月度套餐。' }, { title: '订阅套餐（如智谱/MiniMax）', description: '固定月费，通常提供周期额度。' }] },
  ],
  tools: ['Claude Code', 'Cursor', 'Cline', 'OpenAI 兼容客户端'],
  contentOrder: ['plans', 'section:0', 'models', 'section:1', 'section:2', 'faq', 'final-cta'],
  finalCta: { title: '立即领取 ¥450 代金券', label: '立即注册领取', href: 'https://ai.baishan.com/auth/login?referralCode=KctW2lcraE' },
  faqs: [
    { question: '¥150 代金券何时到账？', answer: '完成实名认证后通常即时到账，具体以活动状态为准。' },
    { question: '¥300 代金券何时到账？', answer: '完成首次 API 调用后进入审核，通常约 3 个工作日到账。' },
    { question: '必须通过推荐链接注册吗？', answer: '是。直接访问官网可能无法获得页面所述福利。' },
    { question: '代金券用完后如何收费？', answer: '按模型实际 token 用量计费，没有强制月费。' },
  ],
})

const opencodeGo = definePlan({
  slug: 'opencode-go', accent: 'slate', availability: 'active',
  seo: { title: 'OpenCode Go 与 Go Plus 套餐价格与模型（2026）', description: 'OpenCode Go $10/月、Go Plus $40/月：支持模型、额度窗口与使用限制。', canonical: 'https://codingplan.org/plans/opencode-go', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'OpenCode · Go', title: 'OpenCode', highlight: 'Go', description: 'Go 与 Go Plus 面向单成员工作区，提供多模型订阅；模型额度因型号而异。', stats: [{ value: '$10', label: 'Go / 月' }, { value: '$40', label: 'Go Plus / 月' }, { value: '5h', label: '短期限额' }, { value: '单成员', label: '工作区' }] },
  modelsTitle: '支持模型', modelsDescription: '模型列表及地区、隐私限制可能变化，以官方文档为准。', models: [
    { icon: '💻', name: 'GLM、Kimi 与 DeepSeek', description: '包括 GLM-5.3、Kimi K3.1 Pro 和 DeepSeek V4.1 Flash 等。' },
    { icon: '⚡', name: 'MiMo 与 MiniMax', description: '包括 MiMo-V2.6 系列和 MiniMax M3.1 Flash。' },
    { icon: '🌍', name: '其他模型', description: '包括 Grok 4.7、GPT 6 Luna、Claude Haiku 5.5 与 Gemini 4 Argon；部分模型受地区或隐私设置限制。' },
  ],
  plansTitle: '套餐详情', purchaseUrl: 'https://opencode.ai/go?ref=JBT5KJRCD4', plans: [
    { name: 'Go', price: '$10', unit: '/月', features: ['支持多模型', '5 小时、每周和每月限额', '单成员工作区'], audience: '个人开发者', featured: true },
    { name: 'Go Plus', price: '$40', unit: '/月', features: ['支持同一模型列表', '各模型限额高于 Go', '单成员工作区'], audience: '高频使用者' },
  ],
  sections: [{ title: '额度说明', highlights: ['每个模型有各自的月度美元额度；5 小时和每周限额分别为该模型月额度的 20% 和 50%。', '不同模型额度和计费单价不同，不能将 $60/月视为所有模型的统一额度。', '部分模型需要调整地区或隐私设置。'] }],
  tools: ['OpenCode', 'Claude Code', 'Codex'],
  faqs: [{ question: 'Go Plus 有什么区别？', answer: 'Go Plus 为 $40/月，支持相同模型列表，提供更高用量限制；具体额度因模型而异。' }, { question: '可以多人共用吗？', answer: 'Go 与 Go Plus 适用于单成员工作区，订阅中的工作区不能邀请成员。' }],
})

export const plansBySlug: Record<string, PlanPageData> = {
  zhipu,
  minimax,
  kimi,
  volcengine,
  aliyun,
  tencentcloud,
  xiaomi,
  baiyunzhisuan,
  'opencode-go': opencodeGo,
}

export const planSlugs = Object.keys(plansBySlug)

export function getPlan(slug: string) {
  return plansBySlug[slug]
}
