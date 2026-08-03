/**
 * [INPUT]: 依赖 types 的详情页领域类型与 seo 的结构化数据构造函数
 * [OUTPUT]: 对外提供八个平台原站兼容标题顺序、推广参数、详情数据、slug 与查询函数
 * [POS]: data 的详情页唯一数据源，以内容顺序配置替代原站八份重复 HTML
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { PlanPageData, SeoData } from '../types'
import { buildPlanJsonLd } from './seo'

type PlanInput = Omit<PlanPageData, 'seo'> & { seo: Omit<SeoData, 'jsonLd'> }

function definePlan(input: PlanInput): PlanPageData {
  const plan = { ...input, seo: { ...input.seo, jsonLd: [] } } as PlanPageData
  plan.seo.jsonLd = buildPlanJsonLd(plan)
  return plan
}

const commonTools = ['Claude Code', 'Cursor', 'Cline', 'Roo Code', 'Kilo Code', 'OpenCode']

const zhipu = definePlan({
  slug: 'zhipu', accent: 'blue', availability: 'active',
  seo: { title: '智谱 GLM Coding Plan 详解 - GLM-5.2/5.1/5-Turbo/5/4.7 套餐价格与用量对比', description: '智谱 GLM Coding Plan 套餐详解：Lite、Pro、Max 价格、模型、5小时与周额度、MCP 工具和支持的编程工具。2/12 已取消首购优惠，保留包季9折 / 包年7折订阅优惠。', canonical: 'https://codingplan.org/plans/zhipu', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '智谱 AI · GLM Coding Plan', title: '智谱 GLM', highlight: 'Coding Plan', description: 'GLM-5.2 已全量开放，1M 上下文。2/12 已取消首购优惠，保留包季9折 / 包年7折订阅优惠。', stats: [{ value: '3', label: '套餐档位' }, { value: '¥49', label: '起步价/月' }, { value: '5', label: '可用模型' }, { value: '20+', label: '支持工具' }] },
  modelsTitle: '模型介绍', modelsDescription: '套餐的模型可用范围不同，购买前请核对当前官方说明。',
  models: [
    { icon: '🚀', name: 'GLM-5.2', description: '最新旗舰模型（6月13日全量开放），支持 1M 上下文，面向代码生成、理解与重构。', badge: '新模型' },
    { icon: '🌟', name: 'GLM-5.1', description: '平衡能力与速度，适合中重度编程场景。' },
    { icon: '⚡', name: 'GLM-5-Turbo', description: '高速推理版本，适合高频代码补全和快速问答。' },
    { icon: '🧠', name: 'GLM-5', description: '旗舰模型，面向复杂软件工程任务，调用消耗 3 倍额度。' },
    { icon: '🔧', name: 'GLM-4.7', description: '成熟稳定的上一代型号，适合日常编程任务。' },
  ],
  plansTitle: '套餐详情', plansDescription: '连续包季享 9 折，包年享 7 折；首购优惠已于 2026/2/12 取消。', purchaseUrl: 'https://www.bigmodel.cn/glm-coding?ic=TOFGVCLIVG',
  plans: [
    { name: 'Lite', badge: '轻量级', price: '¥49', unit: '/月', discount: '包季 ¥44/月 · 包年 ¥34/月', features: ['约 80 prompts/5h · 约 400 prompts/周', 'GLM-4.7 可用，旗舰模型可用性需核对', 'MCP 搜索+读取 100 次/月', '支持 20+ 编程工具'], audience: '个人开发者、轻度 AI 编程用户、国产模型入门用户' },
    { name: 'Pro', badge: '推荐', price: '¥149', unit: '/月', discount: '包季 ¥134/月 · 包年 ¥104/月', features: ['约 400 prompts/5h · 约 2,000 prompts/周', 'MCP 搜索+读取 1,000 次/月', '视觉理解 MCP', 'GLM-5.2 / 5.1 / 5-Turbo / 5 / 4.7'], audience: '日常高频编程、需要 MCP 的开发者和中小团队', featured: true },
    { name: 'Max', badge: '重度畅用', price: '¥469', unit: '/月', discount: '包季 ¥422/月 · 包年 ¥328/月', features: ['约 1,600 prompts/5h · 约 8,000 prompts/周', 'MCP 搜索+读取 4,000 次/月', '新模型首发升级', '高峰期优先保障'], audience: '重度 AI 编程、大型项目和需要高峰保障的团队' },
  ],
  sections: [{ title: 'MCP 工具', description: '包含在套餐内，各档位额度不同。', cards: [
    { icon: '👁️', title: '视觉理解', description: '理解 UI 截图、架构图和流程图，辅助代码生成。' },
    { icon: '🔍', title: '联网搜索', description: '检索最新技术文档、API 参考和解决方案。' },
    { icon: '🌐', title: '网页读取', description: '读取网页中的文档、教程和代码示例。' },
    { icon: '📦', title: '开源仓库', description: '访问开源仓库的代码、Issue 和 PR 信息。' },
  ] }],
  tools: [...commonTools, 'Crush', 'Goose', '等 20+ 工具'],
  faqs: [
    { question: 'GLM Coding Plan 支持哪些模型？', answer: '智谱 GLM Coding Plan 目前支持 GLM-5.2（6月13日全量开放，2月12日起取消首购优惠，保留包季9折 / 包年7折订阅优惠）、GLM-5.1、GLM-5-Turbo、GLM-5 和 GLM-4.7 等多个版本。GLM-5.2 支持 1M 上下文。' },
    { question: 'MCP 工具是否需要额外付费？', answer: 'MCP 包含在套餐内，但有月度额度。搜索+读取为 Lite 100 次、Pro 1,000 次、Max 4,000 次/月，视觉理解共享套餐额度。' },
    { question: '用量是如何计算的？', answer: '采用 5 小时滚动窗口与 7 天周期双重限制。每个 prompt 可能触发多次模型调用，GLM-5.2 和 GLM-5 的消耗倍率更高。' },
    { question: '可以随时升级套餐吗？', answer: '可以升级，差价通常按剩余天数折算，具体以结算页面为准。' },
  ],
})

const minimax = definePlan({
  slug: 'minimax', accent: 'orange', availability: 'active',
  seo: { title: 'MiniMax Token Plan 详解 - M3 旗舰模型套餐价格与用量对比', description: 'MiniMax Token Plan Plus、Max、Ultra 套餐价格、M3 月度 token、Agent 并发、全模态额度和工具支持对比。', canonical: 'https://codingplan.org/plans/minimax', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'MiniMax · Token Plan', title: 'MiniMax', highlight: 'Coding Plan', description: 'M3 旗舰模型（5/31 发布）、月度 token 用量制、全模态共享额度与 1M 超长上下文；7/22 起 API-vlm 调价至 ¥0.025/次。', stats: [{ value: '3', label: '套餐档位' }, { value: '¥49', label: '起步价/月' }, { value: '6亿+', label: 'Plus token/月' }, { value: '1M', label: '长上下文' }] },
  modelsTitle: '模型介绍', modelsDescription: 'M3 原生多模态，兼容 M2.7 系列。',
  models: [
    { icon: '🚀', name: 'MiniMax M3（旗舰版）', description: '旗舰模型（5/31 发布），支持图像与视频输入，1M 超长上下文，适合大型代码库。', badge: '旗舰新模型' },
    { icon: '⚡', name: 'M2.7 / M2.7-highspeed（兼容）', description: '与 M3 共享月度配额，标准版约 50 TPS，高速版约 100+ TPS。' },
    { icon: '🎨', name: '全模态共享额度', description: '文本、图像、语音、音乐共享同一月度 token 配额。' },
  ],
  plansTitle: '套餐详情', plansDescription: '月度 token 用量制，连续包年立省 2 个月。7/22 起 API-vlm 调价至 ¥0.025/次。', purchaseUrl: 'https://platform.minimaxi.com/subscribe/token-plan?code=GhZIakShS0&source=link',
  plans: [
    { name: 'Plus', badge: '入门', price: '¥49', unit: '/月', discount: '¥490/年（立省 ¥98）', features: ['6亿+ token/月', '3-4 个 Agent 并发', 'M3 原生多模态', 'M2.7 参考约 1,500 次/5h'], audience: '个人开发者和日常 AI 编程工作流' },
    { name: 'Max', badge: '推荐', price: '¥119', unit: '/月', discount: '¥1,190/年（立省 ¥238）', features: ['18亿+ token/月', '4-5 个 Agent 并发', '视频生成 3 条/日', 'M2.7 参考约 4,500 次/5h'], audience: '每天使用的专业开发者', featured: true },
    { name: 'Ultra', badge: '重度畅用', price: '¥469', unit: '/月', discount: '¥4,690/年（立省 ¥938）', features: ['71亿+ token/月', '6-7 个 Agent 并发', '视频生成 5 条/日', 'M2.7 参考约 15,000 次/5h'], audience: '多项目并行与重度高频场景' },
  ],
  comparison: { title: '套餐横向对比', description: '额度为页面公开口径，实际消耗取决于上下文。', columns: ['功能', 'Plus', 'Max', 'Ultra'], featuredColumn: 2, rows: [
    ['月度 token', '6亿+', '18亿+', '71亿+'], ['估算编程调用/月', '~12,000', '~36,000', '~140,000'], ['Agent 并发', '3-4', '4-5', '6-7'], ['M2.7 / 5h', '1,500', '4,500', '15,000'], ['M2.7-highspeed / 5h', '750', '2,250', '7,500'], ['视频生成', '不支持', '3 条/日', '5 条/日'],
  ] },
  sections: [{ title: 'MCP 工具支持', headingLevel: 3, highlights: ['Understand_image：理解截图和 UI 设计稿', 'Web_search：实时获取技术文档和解决方案'] }],
  tools: [...commonTools, 'Codex CLI', 'Droid', 'TRAE', 'Grok CLI', 'OpenClaw'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'M3 和 M2.7 有什么区别？', answer: 'M3 支持原生图像/视频理解与 1M 上下文；M2.7 可继续使用，并与 M3 共享月度配额。' },
    { question: '月度 token 配额如何估算？', answer: '以单次约 50K token 粗略估算，Plus、Max、Ultra 分别约 12,000、36,000、140,000 次/月，实际取决于上下文长度。' },
    { question: 'API-vlm 调价后是什么价格？', answer: '自 2026/7/22 起，API-vlm 调价至 ¥0.025/次；Token Plan 套餐额度不受影响。' },
    { question: '连续包年有什么优惠？', answer: 'Plus、Max、Ultra 年付分别为 ¥490、¥1,190、¥4,690，相当于立省约两个月。' },
    { question: 'Plus 套餐包含视频生成吗？', answer: 'Plus 不包含视频生成；Max 为 3 条/日，Ultra 为 5 条/日。图像、语音和音乐三档均支持。' },
  ],
})

const kimi = definePlan({
  slug: 'kimi', accent: 'purple', availability: 'active',
  seo: { title: 'Kimi Code Plan 详解 - K3 旗舰套餐价格与会员权益对比（5 档覆盖入门到顶级）', description: 'Kimi Code Plan 全面解析：Adagio/Andante/Moderato/Allegretto/Allegro 五档套餐详细对比（¥49-¥699/月），Kimi K3 旗舰（2.8T 参数，1M 上下文，2026/7/17 发布），Moderato 起可使用 K3，Allegro 解锁 1M 超长对话，含会员权益。', canonical: 'https://codingplan.org/plans/kimi', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'Moonshot AI · Kimi Code Plan', title: 'Kimi', highlight: 'Code Plan', description: 'Kimi K3 旗舰上线（2026/7/17 发布，2.8T 参数，1M 上下文），Moderato 起可使用 K3，Allegro 解锁 1M 超长对话。5 档套餐 + AI 建站/文档/PPT 会员权益。', stats: [{ value: '5', label: '套餐档位' }, { value: '¥49', label: '起步价/月' }, { value: 'K3', label: '新旗舰' }, { value: '4+', label: '会员权益' }] },
  modelsTitle: '模型介绍', modelsDescription: 'Kimi K3 旗舰（2026/7/17 发布）+ K2.6，新一代编程双模型组合。', models: [
    { icon: '🌟', name: 'Kimi K3（2026/7/17 发布）', description: 'Moonshot AI 最新旗舰模型，2.8 万亿参数，支持 100 万 token 超长上下文，原生视觉能力。Moderato 及以上套餐可用，Allegro 解锁 1M 超长对话容量。在 SWE-Bench 等编程评测中接近 Anthropic 前沿水平。', badge: 'K3 旗舰 · Moderato 起可用' },
    { icon: '🌙', name: 'Kimi K2.6', description: '上一代旗舰编程模型，Adagio/Andante 套餐默认可访问，Moderato 起与 K3 同享额度。' },
  ],
  plansTitle: '套餐详情', plansDescription: '5 档套餐覆盖入门到顶级 · Moderato 起可使用 K3 · 年付最高立省 ¥1,680。', purchaseUrl: 'https://www.kimi.com/code',
  plans: [
    { name: 'Adagio', badge: '免费', price: '¥0', unit: '/月', discount: '免费体验档 · 1 Agent 任务并行', features: ['Kimi K2.6 / K2 模型可访问', '1 Agent 任务并行 · 无优先生成队列', '2 个项目 · 500MB 存储', '2 个定时/小组件任务', 'AI 建站 / AI 文档 / AI PPT 权益', 'K3 模型不可用（需 Moderato 及以上）'], audience: '轻度试用用户、临时需求、想先体验 Kimi 生态的新用户', ctaLabel: '免费开通 Adagio →' },
    { name: 'Andante', badge: '基础', price: '¥49', unit: '/月', discount: '年付 ¥39/月（¥468/年）', features: ['约 300-1,200 API 调用/5h', '每 7 天刷新，未用完不累积', 'Kimi K2.6 旗舰模型', '4 倍速度 Agent 优先生成队列', '20 个项目 · 20GB 存储', 'AI 建站 / AI 文档 / AI PPT 权益', 'K3 模型不可用（需 Moderato 及以上）'], audience: '个人开发者与编程办公一体化用户', ctaLabel: '立即购买 Andante →' },
    { name: 'Moderato', badge: '推荐 · K3 可用', price: '¥99', unit: '/月', discount: '年付 ¥79/月（¥948/年，省 ¥240）', features: ['更大 token 配额 · 每 7 天刷新', 'Kimi K3 旗舰（2.8T 参数）', '2 Agent 任务并行 · 4 倍速度', '集群功能 · 2 子任务 · 梦境记忆 · 自进化技能', '20 个项目 · 20GB 存储', '支持 Kimi CLI / Claude Code / Roo Code', 'AI 建站 / AI 文档 / AI PPT 权益'], audience: '日常高频编程用户、多设备开发者、需要 K3 能力的专业用户', featured: true, ctaLabel: '立即购买 Moderato →' },
    { name: 'Allegretto', badge: '高级 · K3 可用', price: '¥199', unit: '/月', discount: '年付 ¥159/月（¥1,908/年，省 ¥480）', features: ['更大 token 配额 · 每 7 天刷新', 'Kimi K3 旗舰（2.8T 参数）+ Agent 集群 40 次/月', '2 Agent 任务并行 · 4 倍速度', '集群 4 子任务 · 目标模式 · Kimi Claw 10 群聊', '支持 Kimi CLI / Claude Code / Roo Code', 'AI 建站 / AI 文档 / AI PPT 权益'], audience: '重度 Agent 工作流用户、团队协作场景、需要 K3 + 目标模式的进阶用户', ctaLabel: '立即购买 Allegretto →' },
    { name: 'Allegro', badge: '顶级 · 1M 上下文', price: '¥699', unit: '/月', discount: '年付 ¥559/月（¥6,708/年，省 ¥1,680）', features: ['K3 解锁 1M token 超长对话', 'Agent 4 任务并行 · 集群 8 子任务', 'Kimi Claw 群聊 10 个', '目标模式 · 云端/安卓/桌面端', '完整会员权益 + 优先客服'], audience: '顶级编程用户、需要 1M 上下文进行大型代码库分析与多 Agent 编排', featured: true, ctaLabel: '立即购买 Allegro →' },
  ],
  sections: [{ title: '会员权益', description: '不只是编程，还有更多 AI 能力。', cards: [
    { icon: '💻', title: 'Kimi Code', description: '使用 K3 / K2.6 进行代码生成、重构和调试。' },
    { icon: '🌐', title: 'AI 建站', description: '快速生成网站原型与落地页。' },
    { icon: '📄', title: 'AI 文档', description: '生成技术文档与 API 文档。' },
    { icon: '📊', title: 'AI PPT', description: '快速制作分享和汇报演示稿。' },
  ] }, { title: 'K3 模型使用规则', headingLevel: 3, highlights: ['K3 模型仅 Moderato 及以上可用，Adagio/Andante 不可访问', 'Allegro 独家解锁 1M token 超长上下文', 'K3 与 K2.6 共享 5h 配额与 7 天刷新周期'] }],
  tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'],
  contentOrder: ['models', 'plans', 'section:0', 'tools', 'section:1', 'faq'],
  faqs: [
    { question: '五档套餐有什么区别？', answer: 'Adagio 免费可访问 K2.6；Andante（¥49）是付费入门档；Moderato（¥99）起可使用 K3；Allegretto（¥199）增加 Agent 集群 40 次/月与目标模式；Allegro（¥699）独家解锁 1M 超长上下文与 4 Agent 并行。' },
    { question: 'K3 和 K2.6 怎么选？', answer: 'K3 是 2026/7/17 发布的 2.8T 参数旗舰，支持 100 万 token 上下文，原生视觉能力；K2.6 仍是稳定主力。K3 仅 Moderato 及以上可用，Adagio/Andante 仍可使用 K2.6。' },
    { question: '额度怎么刷新？', answer: '采用 5 小时 token 配额，并从激活日起每 7 天刷新；未用完额度不累积，最大并发为 30。' },
    { question: 'Agent 集群是什么？', answer: 'Moderato 起支持 Agent 集群：Allegretto 40 次/月 + 4 子任务，Allegro 8 子任务 + 4 Agent 并行。' },
    { question: '支持哪些编程工具？', answer: '支持 Kimi CLI、Kimi Code for VS Code、Claude Code 和 Roo Code，工具共享套餐额度。' },
  ],
})

const volcengine = definePlan({
  slug: 'volcengine', accent: 'cyan', availability: 'limited',
  seo: { title: '火山引擎方舟 Coding Plan 详解 - 8款模型自由切换，含 GLM-5.2，限时 9.9 元起', description: '火山引擎方舟 Coding Plan Lite/Pro 套餐，支持豆包、DeepSeek、Kimi、GLM 等 6+ 款模型自由切换（含 GLM-5.2 / Doubao-Seed-2.1-turbo），Auto 模式智能调度，限时 9.9 元起。', canonical: 'https://codingplan.org/plans/volcengine', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '火山引擎 · 方舟 Coding Plan', title: '火山引擎方舟', highlight: 'Coding Plan', description: '模型最丰富，6+ 款模型自由切换 / Auto 模式智能调度；新接入 GLM-5.2 与 Doubao-Seed-2.1-turbo，限时 9.9 元起。', stats: [{ value: '6+', label: '可用模型' }, { value: '¥10', label: '首两月特惠' }, { value: '2', label: '套餐档位' }, { value: 'Auto', label: '智能调度' }] },
  modelsTitle: '模型阵容', modelsDescription: '支持手动切换，也可交给 Auto 模式调度。', models: [
    { icon: '🚀', name: 'Doubao-Seed-2.1-turbo', description: '字节跳动自研的最新高速代码模型，新接入。', badge: '最新' },
    { icon: '🌱', name: 'Doubao-Seed-2.0-Code', description: '字节跳动自研的最新代码模型。' },
    { icon: '🫘', name: 'Doubao-Seed-Code', description: '稳定的日常编程模型。' },
    { icon: '🌙', name: 'Kimi-K2.6', description: 'Moonshot AI 当前旗舰模型。' },
    { icon: '🌗', name: 'Kimi-K2.5', description: 'Moonshot AI 上一代旗舰。' },
    { icon: '🔷', name: 'GLM-5.2', description: '智谱最新旗舰模型，支持 1M 上下文。', badge: '新接入' },
    { icon: '🔹', name: 'GLM-5', description: '智谱稳定主力模型。' },
    { icon: '🐋', name: 'DeepSeek-V3.2', description: 'DeepSeek 开源模型。' },
    { icon: '✨', name: 'Auto 模式', description: '根据任务类型自动选择合适模型。' },
  ],
  plansTitle: '套餐详情', plansDescription: '限时 9.9 元起，5 月起限购。', purchaseUrl: 'https://volcengine.com/L/3sD5Ne_yUyk/',
  plans: [
    { name: 'Lite', badge: '首两月 2.5 折', price: '¥40', unit: '/月', discount: '限时 9.9 元起，第三个月恢复原价', features: ['数倍 Claude Pro 用量', '6+ 款模型含 GLM-5.2 / Doubao-Seed-2.1-turbo', 'Auto 模式', '限量发售'], audience: '低成本体验多模型与日常编程用户' },
    { name: 'Pro', badge: '推荐', price: '¥200', unit: '/月', discount: '首两月 ¥50/月，第三个月恢复原价', features: ['5 倍 Lite 用量', 'Claude Max 数倍', '6+ 款模型含 GLM-5.2 / Doubao-Seed-2.1-turbo', 'Auto 模式'], audience: '高频、大型项目和专业团队', featured: true },
  ],
  sections: [{ title: '优惠活动', headingLevel: 3, warning: '活动价格与库存会变化，请在支付前确认结算价。', highlights: ['限时 9.9 元起，首两月 2.5 折', '5 月起限购，售完即止', '新增 GLM-5.2 / Doubao-Seed-2.1-turbo'] }],
  tools: ['Claude Code', 'Cursor', 'Cline', 'Codex CLI', 'Kilo Code'],
  contentOrder: ['models', 'plans', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: '可以随意切换模型吗？', answer: '可以手动切换，也可以使用 Auto 模式自动选择。' },
    { question: '限时 9.9 元起怎么享受？', answer: '新购、升级、续费首两月可享 9.9 元起的 2.5 折促销价，第三个月恢复原价，最终以活动页规则为准。' },
    { question: '用量如何计算？', answer: '页面采用相对用量描述：Lite 为数倍 Claude Pro，Pro 为 5 倍 Lite。具体 token 以官方说明为准。' },
    { question: '限购是什么意思？', answer: '套餐限量发售，库存售完后无法购买，库存状态以官网实时页面为准。' },
  ],
})

const aliyun = definePlan({
  slug: 'aliyun', accent: 'orange', availability: 'limited',
  seo: { title: '阿里云百炼 Coding Plan 详解 - Qwen3.5 系列+第三方模型，Pro 限量补货', description: '阿里云百炼 Coding Plan 模型、Pro 套餐三重额度、每日补货、Lite 停售信息与购买限制。', canonical: 'https://codingplan.org/plans/aliyun', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '阿里云百炼 · Coding Plan', title: '阿里云百炼', highlight: 'Coding Plan', description: 'Qwen3.5 系列与第三方模型统一接入。Lite 已停售，Pro 每日限量补货。', stats: [{ value: '8+', label: '模型' }, { value: '¥200', label: '当前月付' }, { value: '6,000', label: '请求/5h' }, { value: '9:30', label: '每日补货' }] },
  modelsTitle: '模型阵容', modelsDescription: 'Qwen3.5 系列与第三方旗舰模型。', models: [
    { icon: '☁️', name: 'qwen3.5-plus', description: '千问 Qwen3.5 系列通用旗舰型号。', badge: '新系列' },
    { icon: '🧠', name: 'qwen3-max', description: '复杂任务与推理型号。' },
    { icon: '⌨️', name: 'qwen3-coder-next', description: 'Qwen3.5 系列下一代代码模型。', badge: '新接入' },
    { icon: '🖥️', name: 'qwen3-coder-plus', description: '面向软件工程的代码模型。' },
    { icon: '🔷', name: 'glm-5', description: '智谱旗舰模型。' },
    { icon: '🔹', name: 'glm-4.7', description: '智谱稳定主力模型。' },
    { icon: '🌙', name: 'kimi-k2.5', description: 'Moonshot AI 模型。' },
    { icon: '🔥', name: 'minimax-m2.5', description: 'MiniMax 模型。' },
  ],
  plansTitle: '套餐详情', plansDescription: 'Lite 已停售，Pro 限量供应。', purchaseUrl: 'https://www.aliyun.com/benefit/scene/codingplan?source=5176.29345612&userCode=j0hv8tuh',
  plans: [
    { name: 'Lite', badge: '已停售', price: '¥40', unit: '/月', discount: '历史首月 ¥7.9，次月 ¥20', features: ['1,200 次/5h', '9,000 次/周', '18,000 次/月', '已停止新购和续费'], audience: '历史轻度套餐，仅供参考', disabled: true },
    { name: 'Pro', badge: '每日限量', price: '¥200', unit: '/月', features: ['6,000 次/5h', '45,000 次/周', '90,000 次/月', '每日 9:30 补货', 'Qwen3.5 系列 + 第三方模型'], audience: '高频、大型项目和专业开发者', ctaLabel: '立即抢购 Pro →', featured: true },
  ],
  comparison: { title: '用量对比', description: '任一额度耗尽都会暂停服务。', columns: ['套餐', '5 小时', '每周', '每月'], featuredColumn: 1, rows: [['Lite（停售）', '1,200', '9,000', '18,000'], ['Pro', '6,000', '45,000', '90,000']] },
  sections: [{ title: '额度规则详解', warning: 'Pro 库存通常很快售罄；仅主账号可用，不支持 RAM 用户。', cards: [
    { title: '5小时动态刷新', description: '采用滚动 5 小时窗口，旧请求移出窗口后恢复额度。' },
    { title: '每周一重置', description: '周额度按官方周期重新计算。' },
    { title: '月度订阅日重置', description: '月额度按套餐订阅周期重新计算。' },
  ] }],
  tools: ['Claude Code', 'Cursor', 'Cline', 'Roo Code'],
  contentOrder: ['models', 'plans', 'section:0', 'comparison', 'faq'],
  faqs: [
    { question: '三重额度如何生效？', answer: '5 小时、周、月三个限制同时生效，任一额度耗尽都会暂停，分别按各自周期恢复。' },
    { question: 'Lite 还能购买吗？', answer: '不能。Lite 已停止新购与续费，目前仅有 Pro 限量补货。' },
    { question: 'Pro 如何购买？', answer: '每日 9:30 限量补货，库存可能在数分钟内售罄。' },
    { question: '支持退款吗？', answer: '已激活套餐通常不支持退款，请在购买前确认规则。' },
  ],
})

const tencentcloud = definePlan({
  slug: 'tencentcloud', accent: 'blue', availability: 'archived',
  seo: { title: '腾讯云 Coding Plan [已下线] - 历史参考 - HY 2.0/GLM-5/Kimi-K2.5/MiniMax', description: '腾讯云 Coding Plan 已于 2026-04-22 下线。本页保留历史模型、Lite/Pro 价格和额度，仅供参考。', canonical: 'https://codingplan.org/plans/tencentcloud', locale: 'zh-CN', ogType: 'article' },
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
  seo: { title: '小米 MiMo Coding Plan 详解 - MiMo V2.5 Pro 月¥39/年¥468 4档套餐对比', description: '小米 MiMo Token Plan Lite、Standard、Pro、Max 价格、Credits、首购优惠、夜间折扣和 TTS 权益。5/27 API 永久降价最高 99%，Token Plan 用量提升 5-8 倍。', canonical: 'https://codingplan.org/plans/xiaomi', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '小米 · MiMo Token Plan', title: '小米 MiMo', highlight: 'Coding Plan', description: 'MiMo-V2.5-Pro 旗舰模型，6 款模型可用。5/27 API 永久降价最高 99%，Token Plan 用量提升 5-8 倍，夜间调用按 0.8 倍消耗。', stats: [{ value: '4', label: '套餐档位' }, { value: '¥39', label: '起步价/月' }, { value: '6', label: '款可用模型' }, { value: '0.8x', label: '夜间消耗' }] },
  modelsTitle: '模型介绍', modelsDescription: '一次订阅，畅用 MiMo 系列 6 款模型。', models: [
    { icon: '🔥', name: 'MiMo-V2.5-Pro', description: '面向复杂编程与推理任务的旗舰型号。', badge: '旗舰' },
    { icon: '⚡', name: 'MiMo-V2.5', description: '日常编程与通用任务模型。' },
  ],
  plansTitle: '套餐详情', plansDescription: '首购价格与 Credits 额度以结算页为准。5/27 API 永久降价最高 99%。', purchaseUrl: 'https://platform.xiaomimimo.com/token-plan',
  plans: [
    { name: 'Lite', badge: '轻度', price: '¥39', unit: '/月', discount: '首购 ¥34.32 · 年付 ¥468', features: ['6,000万 Credits/月（7.2亿/年）', '支持 MiMo-V2.5-Pro、MiMo-V2.5 等 6 款模型', '支持 OpenClaw、Claude Code、OpenCode、KiloCode 等', '非高峰期（00:00-08:00）0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '轻度尝鲜用户', ctaLabel: '立即订阅 Lite →' },
    { name: 'Standard', badge: '日常', price: '¥99', unit: '/月', discount: '首购 ¥87.12 · 年付 ¥1,188', features: ['2亿 Credits/月（24亿/年，3.3倍Lite）', '支持 MiMo-V2.5-Pro、MiMo-V2.5 等 6 款模型', '支持 OpenClaw、Claude Code、OpenCode、KiloCode 等', '非高峰期（00:00-08:00）0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '日常中等频率用户', ctaLabel: '立即订阅 Standard →' },
    { name: 'Pro', badge: '推荐', price: '¥329', unit: '/月', discount: '首购 ¥289.52 · 年付 ¥3,948', features: ['7亿 Credits/月（84亿/年，11.7倍Lite）', '支持 MiMo-V2.5-Pro、MiMo-V2.5 等 6 款模型', '支持 OpenClaw、Claude Code、OpenCode、KiloCode 等', '非高峰期（00:00-08:00）0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '专业高频用户', ctaLabel: '立即订阅 Pro →', featured: true },
    { name: 'Max', badge: '团队', price: '¥659', unit: '/月', discount: '首购 ¥579.92 · 年付 ¥7,908', features: ['16亿 Credits/月（192亿/年，26.7倍Lite）', '支持 MiMo-V2.5-Pro、MiMo-V2.5 等 6 款模型', '支持 OpenClaw、Claude Code、OpenCode、KiloCode 等', '非高峰期（00:00-08:00）0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '发烧友与团队', ctaLabel: '立即订阅 Max →' },
  ],
  sections: [{ title: '套餐亮点', cards: [
    { icon: '🔥', title: 'MiMo-V2.5-Pro 旗舰模型', description: '面向复杂编程与推理任务的旗舰型号。' },
    { icon: '💸', title: '5/27 API 永久降价最高 99%', description: 'API 价格大幅下调，Token Plan 用量提升 5-8 倍。' },
    { icon: '💰', title: '包年最高立省 948.96 元', description: '年付价格相比逐月订阅更优惠。' },
    { icon: '🌙', title: '夜间调用享 8 折', description: '北京时间 00:00-08:00 按 0.8 倍 Credits 消耗。' },
    { icon: '🔊', title: 'TTS 模型限时免费', description: 'TTS 系列模型在活动期内免费。' },
    { icon: '🔁', title: '自动续费随时取消', description: '套餐到期自动续费，可按官方规则取消。' },
    { icon: '🧩', title: '6 款模型可用', description: '通过 API Key 与 Base URL 接入多款模型。' },
  ], warning: '页面中的"包年 88 折"与展示年价口径不完全一致，最终价格以官网结算页为准。' }],
  tools: [...commonTools, 'Codex CLI', 'Droid', 'TRAE', 'Grok CLI', 'OpenClaw'],
  faqs: [
    { question: '夜间折扣如何计算？', answer: '北京时间 00:00-08:00 调用按 0.8 倍 Credits 消耗。' },
    { question: '支持哪些模型？', answer: '支持 6 款模型，包括 MiMo-V2.5-Pro、MiMo-V2.5 与多款 TTS 型号；完整清单以官网为准。' },
    { question: '5/27 降价对 Token Plan 有什么影响？', answer: 'API 永久降价最高 99%，Token Plan 各档位用量换算后相当于提升 5-8 倍。' },
    { question: '如何接入编程工具？', answer: '使用 API Key 和 Base URL 接入 Claude Code、OpenCode、Kilo Code 等兼容工具。' },
    { question: '是否自动续费？', answer: '套餐支持自动续费并可取消，退款和取消生效时间以官网条款为准。' },
  ],
})

const baiyunzhisuan = definePlan({
  slug: 'baiyunzhisuan', accent: 'cyan', availability: 'active',
  seo: { title: '白云智算 API 详解 - MiniMax/GLM/DeepSeek/Kimi/Qwen 注册送450元代金券', description: '白云智算按量 API、注册和首调代金券、支持模型、领取步骤、限制和与订阅套餐的差异。', canonical: 'https://codingplan.org/plans/baiyunzhisuan', locale: 'zh-CN', ogType: 'article' },
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

export const plansBySlug: Record<string, PlanPageData> = {
  zhipu,
  minimax,
  kimi,
  volcengine,
  aliyun,
  tencentcloud,
  xiaomi,
  baiyunzhisuan,
}

export const planSlugs = Object.keys(plansBySlug)

export function getPlan(slug: string) {
  return plansBySlug[slug]
}
