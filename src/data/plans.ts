/**
 * [INPUT]: 依赖 types 的详情页领域类型、seo 的结构化数据构造函数与 plan-alternates 的 zh 侧 hreflang 映射
 * [OUTPUT]: 对外提供九个平台原站兼容标题顺序、推广参数、详情数据、slug 与查询函数
 * [POS]: data 的详情页唯一数据源，以内容顺序配置替代原站多份重复 HTML
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
  hero: { badge: '智谱 AI · GLM Coding Plan', title: '智谱 GLM', highlight: 'Coding Plan', description: 'GLM-5.3 与 GLM-5.3-Flash（8/26 上线，GLM-5 系首个原生多模态）已推送全量用户，官方称支持真正可用的 1M 上下文。套餐为连续包月价 + 5 小时/每周双窗口积分制，非高峰时段积分 5 折，连包季 8 折、包年 7 折；ZCode 与 AutoClaw 订阅用户专享 150% 额度。', stats: [{ value: '3', label: '套餐档位' }, { value: '¥118', label: '起步价/月' }, { value: '140K', label: 'Max 每周积分' }, { value: '5 折', label: '非高峰抵扣' }] },
  modelsTitle: '模型介绍', modelsDescription: '所有套餐均支持 GLM-5.3 与 GLM-5.3-Flash（8/26 新上线，官方称支持真正可用的 1M 上下文）；调用历史模型将自动切换到对应新版。',
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
    { icon: '🎁', title: '限时活动', description: '夜间畅用：9 月 3 日–10 月 7 日每日 23:00–09:00，ZCode / AutoClaw 端调用 GLM-5.3-Flash 不限量，其他 Agent 额度翻倍；庆双节：9 月 25 日–10 月 7 日全天按非高峰规则消耗。' },
    { icon: '🛠️', title: 'ZCode 与 AutoClaw', description: '两款官方工具深度适配 GLM 模型：订阅用户专享 150% 额度；ZCode 另享闲时任务免费与专业级数据 MCP，AutoClaw 享专属办公权益。' },
    { icon: '🔓', title: '开源节奏', description: 'GLM-5.3-Flash 权重已 MIT 开源；GLM-5.3 旗舰权重 8/28 在 HuggingFace 放出。' },
  ] }],
  tools: ['ZCode', 'AutoClaw', 'Claude Code', 'Codex', 'Cursor', 'OpenClaw', 'OpenCode', ...commonTools, 'Crush', 'Factory'],
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
  seo: { title: 'MiniMax Token Plan 详解 - M3 旗舰 + 全模态共享，Plus ¥49/Max ¥119/Ultra ¥469', description: 'MiniMax Token Plan Plus、Max、Ultra 套餐价格、M3 月度 token、Agent 并发、全模态额度和工具支持对比。涵盖 M3 / M2.7 / H3（已开源）/ Speech 2.8 全系模型，Music 全系列 8/20 起停止服务，老用户权益完整保留。', canonical: 'https://codingplan.org/plans/minimax', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'MiniMax · Token Plan', title: 'MiniMax', highlight: 'Coding Plan', description: 'M3 旗舰（原生多模态、1M 超长上下文）、全模态共享额度；M2.7 / H3（8/3 开源）/ Speech 2.8 在列，Music 全系列 8/20 起停止服务。额度受 5 小时 + 周窗口双控，新增积分购买可按量兜底。', stats: [{ value: '3', label: '套餐档位' }, { value: '¥49', label: '起步价/月' }, { value: '6亿+', label: 'Plus token/月' }, { value: '1M', label: '长上下文' }] },
  modelsTitle: '模型介绍', modelsDescription: 'M3 原生多模态旗舰，M2.7 / H3 / Speech 2.8 共享额度；Music 全系列已停止服务（8/20）。',
  models: [
    { icon: '🚀', name: 'MiniMax M3（旗舰版）', description: '旗舰模型，原生多模态，支持图像与视频输入，1M 超长上下文，适合大型代码库。', badge: '旗舰模型' },
    { icon: '⚡', name: 'M2.7 / M2.7-highspeed', description: '与 M3 共享月度配额，标准版约 50 TPS，高速版约 100+ TPS；5h 窗口参考 1,500 / 4,500 / 15,000 次。' },
    { icon: '🤖', name: 'MiniMax H3', description: '推理与 Agent 编排增强型号，与 M3 共享额度；8/3 已在 Hugging Face 开源。', badge: '8/3 开源' },
    { icon: '🎨', name: 'M2.5 / Speech 2.8 / 图像系列', description: '图像、语音全模态型号，与文本共享同一月度配额。Music 全系列已于 8/20 停止服务（开源版 MiniMax-Music3 可在 HuggingFace / 魔搭获取）。' },
  ],
  plansTitle: '套餐详情', plansDescription: '月度 token 用量制，连续包年立省 2 个月；老用户权益完整保留，额度受 5 小时 + 周窗口双控。', purchaseUrl: 'https://platform.minimaxi.com/subscribe/token-plan?code=GhZIakShS0&source=link',
  plans: [
    { name: 'Plus', badge: '入门', price: '¥49', unit: '/月', discount: '¥490/年（立省 ¥98）', features: ['6亿+ token/月', '3-4 个 Agent 并发', 'M3 原生多模态', 'M2.7 参考约 1,500 次/5h'], audience: '个人开发者和日常 AI 编程工作流' },
    { name: 'Max', badge: '推荐', price: '¥119', unit: '/月', discount: '¥1,190/年（立省 ¥238）', features: ['18亿+ token/月', '4-5 个 Agent 并发', 'Hailuo 2.3 视频生成 3 条/日', 'M2.7 参考约 4,500 次/5h'], audience: '每天使用的专业开发者', featured: true },
    { name: 'Ultra', badge: '重度畅用', price: '¥469', unit: '/月', discount: '¥4,690/年（立省 ¥938）', features: ['71亿+ token/月', '6-7 个 Agent 并发', 'Hailuo 2.3 视频生成 5 条/日', 'M2.7 参考约 15,000 次/5h'], audience: '多项目并行与重度高频场景' },
  ],
  comparison: { title: '套餐横向对比', description: '额度为页面公开口径，实际消耗取决于上下文。', columns: ['功能', 'Plus', 'Max', 'Ultra'], featuredColumn: 2, rows: [
    ['月度 token', '6亿+', '18亿+', '71亿+'], ['估算编程调用/月', '~12,000', '~36,000', '~140,000'], ['Agent 并发', '3-4', '4-5', '6-7'], ['M2.7 / 5h', '1,500', '4,500', '15,000'], ['M2.7-highspeed / 5h', '750', '2,250', '7,500'], ['Hailuo 视频生成', '不支持', '3 条/日', '5 条/日'],
  ] },
  sections: [
    { title: 'MCP 工具支持', headingLevel: 3, highlights: ['Understand_image：理解截图和 UI 设计稿', 'Web_search：实时获取技术文档和解决方案', '官方 Agent 应用 MiniMax Code：订阅者免 API Key 直接使用（桌面端 + 网页版）'] },
    { title: '积分购买', headingLevel: 3, highlights: ['套餐额度达到 5 小时或周窗口上限时，可由已购积分自动补充支付', '积分自购买之日起 1 年内有效，适合偶发超额场景'], cards: [
      { title: '入门版 ¥30', description: '4,489 积分' },
      { title: '进阶版 ¥150', description: '22,460 积分' },
      { title: '高级版 ¥500', description: '74,900 积分' },
    ] },
  ],
  tools: [...commonTools, 'Codex CLI', 'Droid', 'TRAE', 'Grok CLI', 'OpenClaw', 'MiniMax Code'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'section:1', 'faq'],
  faqs: [
    { question: 'M3 和 M2.7 有什么区别？', answer: 'M3 支持原生图像/视频理解与 1M 上下文；M2.7 可继续使用，并与 M3 共享月度配额。老用户权益完整保留。' },
    { question: 'Token Plan 支持哪些模型？', answer: '支持 M3 / M2.7 / M2.7-highspeed / M2.5 / H3（8/3 已开源）/ Speech 2.8 与图像系列，共享同一月度配额。注意：Music 全系列模型自 2026/8/20 起停止服务，开源版 MiniMax-Music3 可在 HuggingFace / 魔搭自行部署。' },
    { question: '月度 token 配额如何估算？', answer: '以单次约 50K token 粗略估算，Plus、Max、Ultra 分别约 12,000、36,000、140,000 次/月，实际取决于上下文长度。' },
    { question: 'API-vlm 调价后是什么价格？', answer: '自 2026/7/22 起，API-vlm 调价至 ¥0.025/次；Token Plan 套餐额度不受影响。' },
    { question: '连续包年有什么优惠？', answer: 'Plus、Max、Ultra 年付分别为 ¥490、¥1,190、¥4,690，相当于立省约两个月。' },
    { question: 'Plus 套餐包含视频生成吗？', answer: 'Plus 不包含视频生成；Max 为 Hailuo 2.3 视频生成 3 条/日，Ultra 为 5 条/日。图像、语音三档均支持。' },
  ],
})

const kimi = definePlan({
  slug: 'kimi', accent: 'purple', availability: 'active',
  seo: { title: 'Kimi Coding Plan 多少钱？Code Plan 三档价格 ¥99-¥699（2026）', description: 'Kimi Coding Plan 多少钱？新会员体系已上线，Plus ¥99 / Pro ¥199 / Max ¥699 三档可用 Kimi Code（年付低至 ¥79/月起）：K3 旗舰（2.8T 参数）Plus 起可用，新会员取消每周额度限制、仅保留 5 小时滚动窗口，Go 档（¥49）不含编程额度。附价格表与购买入口，帮你选到刚好够用的档。', canonical: 'https://codingplan.org/plans/kimi', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'Moonshot AI · Kimi Code Plan', title: 'Kimi', highlight: 'Code Plan', description: 'Kimi 会员新套餐已正式上线（定价不变）：Free / Go ¥49 / Plus ¥99 / Pro ¥199 / Max ¥699，其中 Go 档不含编程额度，Plus 及以上才能使用 Kimi Code。新会员取消每周额度限制、仅保留 5 小时滚动频率窗口，老套餐会员不受影响。', stats: [{ value: '3', label: 'Code 可用档位' }, { value: '¥99', label: 'K3 起步价/月' }, { value: '取消', label: '每周额度限制' }, { value: '1M', label: 'K3 上下文' }] },
  modelsTitle: '模型介绍', modelsDescription: 'Kimi K3 旗舰（2.8T 参数）+ K3-256K 省额度版 + K2.8 Preview + K2.7 Code 高速版。', models: [
    { icon: '🌟', name: 'Kimi K3（k3 / k3-256k）', description: 'Moonshot AI 旗舰：2.8 万亿参数、1M 上下文、最高 260 Tokens/s，支持 low/high/max 三档思考强度。k3-256k 版在 256K 上下文内效果与 K3 相同、消耗约为其一半，适合日常问答与单文件修改（不支持视频输入）。Plus 及以上可调用 K3，Pro 及以上解锁 100 万上下文。', badge: 'K3 旗舰 · Plus 起可用' },
    { icon: '🌙', name: 'Kimi K2.8 Preview（kimi-for-coding）', description: '新一代主力编程模型，最高支持 1M 上下文与 low/high/max 三档思考强度，Plus 及以上可用；K2.7 Code 高速版（kimi-for-coding-highspeed）负责高吞吐场景，Pro 及以上可用。' },
  ],
  plansTitle: '套餐详情', plansDescription: 'Kimi Code 需 Plus 及以上档位 · 年付最高立省 ¥1,680 · 新会员取消每周额度限制、仅保留 5 小时滚动窗口。', purchaseUrl: 'https://www.kimi.com/code',
  plans: [
    { name: 'Plus', badge: '推荐 · K3 可用', price: '¥99', unit: '/月', discount: '年付 ¥79/月（¥948/年，省 ¥240）', features: ['Kimi Code 可调用（Plus 及以上）', 'Kimi K3 旗舰 + K3-256K 省额度版', 'K2.8 Preview 可用', '2 倍 Agent 额度', '集群功能 · 多 Agent 并行', '20 个项目 · 20GB 存储'], audience: '日常高频编程用户、需要 K3 能力又想控制预算的专业开发者', featured: true, ctaLabel: '订阅 Plus →' },
    { name: 'Pro', badge: '高级 · 1M 上下文', price: '¥199', unit: '/月', discount: '年付 ¥159/月（¥1,908/年，省 ¥480）', features: ['K3 解锁百万 Tokens 超长对话容量', 'K2.7 Code 高速版（Pro 及以上）', '4 倍 Agent 额度 · Agent 多任务并行', '目标模式，Agent 自主推进完成', '集群功能 · 专属 Kimi Claw', '20 个项目 · 20GB 存储'], audience: '重度 Agent 工作流用户、需要 1M 上下文与高速版的专业开发者', ctaLabel: '订阅 Pro →' },
    { name: 'Max', badge: '顶级 · 全能尊享', price: '¥699', unit: '/月', discount: '年付 ¥559/月（¥6,708/年，省 ¥1,680）', features: ['14 倍 Agent 额度', 'K3 百万 Tokens 超长对话容量', 'Agent 多任务并行 · 目标模式', '集群功能 · 专属 Kimi Claw', '100 个项目 · 50GB 存储', '完整会员权益 + 优先客服'], audience: '顶级编程用户、大型代码库分析与多 Agent 编排', featured: true, ctaLabel: '订阅 Max →' },
    { name: 'Go', badge: '不含编程额度', price: '¥49', unit: '/月', discount: '年付 ¥39/月（¥468/年）', features: ['更多 Agent 额度', 'Office 文件处理 · 深度研究 · 网站部署', '制作并发布带数据库的网站', '精选插件（同花顺、天眼查等付费数据库）', '不支持 Kimi Code（需 Plus 及以上）'], audience: '只想使用 Kimi 通用能力做办公与研究的用户', ctaLabel: '订阅 Go →' },
  ],
  sections: [{ title: '会员权益', description: '不只是编程，还有更多 AI 能力。', cards: [
    { icon: '💻', title: 'Kimi Code', description: '使用 K3 / K2.8 Preview 进行代码生成、重构和调试（Plus 及以上）。' },
    { icon: '🌐', title: 'AI 建站', description: '快速生成网站原型与落地页。' },
    { icon: '📄', title: 'AI 文档', description: '生成技术文档与 API 文档。' },
    { icon: '📊', title: 'AI PPT', description: '快速制作分享和汇报演示稿。' },
  ] }, { title: 'K3 模型使用规则', headingLevel: 3, highlights: ['K3 模型需 Plus 及以上档位（旧体系为 Moderato 及以上）', 'K3-256K 版为省额度选择：256K 内效果相同、消耗约省一半（不支持视频输入）', 'K3 的 1M 超长上下文与 K2.7 Code 高速版需 Pro 及以上', '老套餐会员不受影响：档位名称、额度规则与自动续费均维持原样'] }, { title: '新会员体系说明', headingLevel: 3, warning: '官方口径：「Kimi 会员新套餐正式发布，定价不变。新会员取消每周额度限制，仅保留每 5 小时的滚动频率窗口；Go 档无 coding 额度，Plus 及以上档位可使用 Kimi Code。老套餐会员不受影响。」', highlights: ['月总额度仍然存在：达到月上限时 Kimi Code 额度会冻结，需等待月额度重置或升级订阅', '所有登录设备与 API Key 共享同一套配额；超过 30 天未活跃的设备会自动解绑', '新增「加油包」：订阅额度用尽后按量扣费兜底，单次最低 ¥25，余额上限 ¥10,000，余额不过期可叠加'] }],
  tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'],
  contentOrder: ['models', 'plans', 'section:0', 'tools', 'section:1', 'section:2', 'faq'],
  faqs: [
    { question: 'Kimi Coding Plan 现在有几档？多少钱？', answer: 'Kimi 会员新套餐已上线，Kimi Code 需 Plus 及以上档位：Plus ¥99/月（年付 ¥79/月，¥948/年）、Pro ¥199/月（年付 ¥159/月，¥1,908/年）、Max ¥699/月（年付 ¥559/月，¥6,708/年）。此外还有 Free 与 Go ¥49/月（年付 ¥39/月）档，但不含编程额度，不能使用 Kimi Code。' },
    { question: '老套餐（Andante / Moderato / Allegretto / Allegro）还能继续用吗？', answer: '官方明确「老套餐会员不受影响」：档位名称、额度规则与自动续费均维持原样，无需升级。新体系档位与老档位的对应关系为 Andante→Go、Moderato→Plus、Allegretto→Pro、Allegro→Max，定价不变。' },
    { question: 'K3 和 K3-256K 怎么选？', answer: 'K3 是 2.8T 参数旗舰，支持最高 1M 上下文（需 Pro 及以上）与 low/high/max 三档思考强度；k3-256k 在 256K 以内效果与 K3 相同，但消耗约为其一半（k3 1M 约为其两倍），不支持视频输入。日常/单文件任务用 k3-256k 省额度，大型代码库分析再切回完整 K3，两者均需 Plus 及以上。' },
    { question: '新会员的额度怎么刷新？', answer: '官方口径：新会员取消每周额度限制，不再每 7 天刷新，仅保留每 5 小时的滚动频率窗口——短时间请求过多会触发限流，等窗口滚动后自动恢复。月总额度仍然存在，达到月上限时 Kimi Code 额度会冻结，需等待月额度重置或升级订阅。' },
    { question: '额度用尽还能继续用吗？', answer: '官方新增「加油包」（Extra Usage）：订阅额度用尽后可按实际用量扣费继续发起请求，不必等待刷新。单次充值最低 ¥25，每日最多 10 次、累计 ¥3,000，余额上限 ¥10,000，余额不过期可叠加，并与网页端 Kimi 共享同一份额度。' },
    { question: 'Agent 集群和新模型有哪些？', answer: 'Plus 起支持集群功能与多 Agent 并行，Pro 起额外提供目标模式（Agent 自主推进完成）与专属 Kimi Claw。模型侧提供 K2.8 Preview（kimi-for-coding，最高 1M 上下文）与 K2.7 Code 高速版（kimi-for-coding-highspeed，Pro 及以上）。' },
    { question: '支持哪些编程工具？', answer: '支持 Kimi CLI、Kimi Code for VS Code、Claude Code、Roo Code 等工具；API 同时兼容 OpenAI 与 Anthropic 双协议（国内 api.kimi.com/coding，海外 api.kimi.ai/coding）。所有登录设备与 API Key 共享同一套套餐额度。' },
  ],
})

const volcengine = definePlan({
  slug: 'volcengine', accent: 'cyan', availability: 'limited',
  seo: { title: '火山引擎 Coding Plan 多少钱？方舟 2.5 折首购 ¥9.9 起 + 多模型自由切换（2026）', description: '火山引擎方舟 Coding Plan 多少钱？Lite 首购 ¥9.9 / Pro 首购 ¥49.9（刊例 ¥40/¥200，2.5 折活动 6/10-11/8）；模型池含 DeepSeek-V4.1-Flash、GLM-5.3 系列、Doubao-Seed-Evolving、Kimi-K3 与 Kimi-K2.8-Preview，自由切换或 Auto 模式调度。附首购入口与选档建议，入门一个月不到 10 块钱。', canonical: 'https://codingplan.org/plans/volcengine', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '火山引擎 · 方舟 Coding Plan', title: '火山引擎方舟', highlight: 'Coding Plan', description: '官方主推 DeepSeek-V4.1-Flash、GLM-5.3 系列、Doubao-Seed-Evolving、Kimi-K3 与 Kimi-K2.8-Preview 自由切换 / Auto 模式智能调度。限时 2.5 折普惠活动 6/10-11/8：Lite 首购 ¥9.9、Pro 首购 ¥49.9。', stats: [{ value: '6+', label: '可用模型' }, { value: '¥9.9', label: 'Lite 首购' }, { value: '¥49.9', label: 'Pro 首购' }, { value: 'Auto', label: '智能调度' }] },
  modelsTitle: '模型阵容', modelsDescription: '官方当前主推：DeepSeek-V4.1-Flash、GLM-5.3 系列、Doubao-Seed-Evolving、Kimi-K3、Kimi-K2.8-Preview；GLM-5.2 已于 8/31 下线，未迁移调用自动路由至 GLM-5.3。', models: [
    { icon: '🐋', name: 'DeepSeek-V4.1-Flash', description: '新接入主力：1M 上下文、384K 输出，支持图像理解；9/15-10/30 限时抵扣系数 5 折。', badge: '新接入 · 限时 5 折' },
    { icon: '🆕', name: 'Kimi-K2.8-Preview', description: '新接入的 Kimi 新一代编程模型，最高 1M 上下文；9/17-9/30 限时抵扣系数 6 折。', badge: '限时 6 折' },
    { icon: '🌱', name: 'Doubao-Seed-Evolving', description: '统一模型 ID 周级自动升级（无需改代码），1M 上下文 / 256K 输出，持续吃到豆包最新版本。', badge: '高频迭代' },
    { icon: '🚀', name: 'Doubao-Seed-2.1-turbo', description: '字节跳动高速代码模型（256K 上下文），当前豆包主力档；Doubao-Seed-2.0-lite 即将下线。' },
    { icon: '🔷', name: 'GLM-5.3 系列', description: '智谱新旗舰（含 GLM-5.3-Flash），1M 上下文，抵扣系数较高。' },
    { icon: '🌙', name: 'Kimi-K3（Auto 路由）', description: 'K3 通过 Auto 模式路由调用，夜间 00:00-08:00 路由比例大幅提升。' },
    { icon: '🔥', name: 'MiniMax-M3', description: 'MiniMax 旗舰模型，1M 上下文 / 128K 输出，多模态输入。' },
    { icon: '⏳', name: 'GLM-5.2（已下线）', description: '已于 2026/8/31 从 Coding Plan 下线，未迁移的调用自动路由至 GLM-5.3。' },
    { icon: '✨', name: 'Auto 模式', description: '根据任务类型自动选择合适模型（默认开启），Coding Plan 内抵扣系数 1。' },
  ],
  plansTitle: '套餐详情', plansDescription: '限时 2.5 折普惠（活动期 2026/6/10-11/8，首两个月，名额有限）：Lite 首购 ¥9.9、Pro 首购 ¥49.9；受邀再 9.5 折。', purchaseUrl: 'https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=33BB3T98',
  plans: [
    { name: 'Lite', badge: '首购 ¥9.9/月起', price: '¥40', unit: '/月', discount: '首两个月 2.5 折 ¥9.9 · 受邀再 9.5 折', features: ['刊例价 ¥40/月', '满足个人开发者轻量化需求', 'Doubao / GLM / DeepSeek / Kimi / MiniMax 等', '支持 Auto 模式', '适配 Claude Code、Cursor 等主流工具'], audience: '个人开发者和希望低成本体验多模型的用户' },
    { name: 'Pro', badge: '推荐 · 首购 ¥49.9/月', price: '¥200', unit: '/月', discount: '首两个月 2.5 折 ¥49.9 · 5 倍 Lite 用量', features: ['刊例价 ¥200/月，5 倍于 Lite 套餐用量', '满足高阶用户的大规模编程需求', '享受 Lite 套餐全部能力', '支持 Auto 模式'], audience: '高强度开发任务的专业团队', featured: true },
  ],
  comparison: { title: '套餐横向对比', description: '额度按 5 小时 / 周 / 月三级窗口刷新（周一 00:00 重置周额度）。', columns: ['功能', 'Lite', 'Pro'], featuredColumn: 2, rows: [
    ['刊例价', '¥40/月', '¥200/月'],
    ['限时首购价（前两月）', '¥9.9/月', '¥49.9/月'],
    ['用量倍率', '1×', '5× Lite'],
    ['模型池', '6+ 款 + Auto', '6+ 款 + Auto'],
  ] },
  sections: [
    { title: '优惠活动', headingLevel: 3, warning: '活动价格与库存会变化，请在支付前确认结算价。2.5 折普惠活动期 2026/6/10-11/8，名额有限先到先得。', highlights: ['Lite / Pro 首两个月 2.5 折（¥9.9 / ¥49.9 起），新购/续费/升配共享同一资格', '受邀下单再享 9.5 折，邀请人返 5% 代金券，邀请人数无上限', '限时抵扣系数活动：deepseek-v4.1-flash 5 折（9/15-10/30）、kimi-k2.8-preview 6 折（9/17-9/30）', 'Auto 模式夜间（00:00-08:00）Kimi-K3 路由比例大幅提升', '另有 Agent Plan 产品线（Small ¥40 / Medium ¥200 / Large ¥500 / Max ¥1,000/月）覆盖全模态与 Harness'] },
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
    { question: '限时 9.9 元起怎么享受？', answer: '「Coding Plan Lite & Pro 套餐 2.5 折普惠活动」活动期 2026/6/10-11/8：所有用户首两个月 2.5 折（Lite ¥9.9/月、Pro ¥49.9/月），名额有限先到先得，新购、升级、续费共享同一优惠资格，第三个月恢复刊例价。另有按模型的限时抵扣系数活动：deepseek-v4.1-flash 5 折（9/15-10/30）、kimi-k2.8-preview 6 折（9/17-9/30）。' },
    { question: 'Pro 套餐多少钱？', answer: '方舟 Coding Plan Pro 刊例价 ¥200/月，用量为 Lite 的 5 倍；活动期内首两个月 2.5 折（¥49.9/月），受邀下单再享 9.5 折。' },
    { question: '邀请好友的优惠怎么算？', answer: '每邀请一位好友下单可获得其订单金额 5% 的代金券，上不封顶；好友首次订阅可额外享 9.5 折。' },
    { question: 'GLM-5.2 还能用吗？', answer: 'GLM-5.2 已于 2026/8/31 从方舟 Coding Plan 下线，未迁移的调用会自动路由至 GLM-5.3；此前的限时加量 4 倍活动已于 8/8 结束。' },
    { question: '限购是什么意思？', answer: '套餐限量发售，库存售完后无法购买，库存状态以官网实时页面为准。' },
  ],
})

const aliyun = definePlan({
  slug: 'aliyun', accent: 'orange', availability: 'active',
  seo: { title: '阿里云 Qwen Coding Plan 多少钱？百炼 Token Plan ¥39 起（2026）', description: '阿里云 Coding Plan（现已升级为百炼 Token Plan）多少钱？个人版 ¥39 / ¥139 / ¥499 三档对比，月度 Credits 11,500 / 45,000 / 180,000，新增 12 项 Harness 权益，覆盖多模态 18+ 旗舰模型，Qwen3.8-Max（0902 快照）与 Kimi-K3 在列，夜间 22:00 起限时 4 折。附购买入口与选档建议。', canonical: 'https://codingplan.org/plans/aliyun', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '阿里云百炼 · Token Plan', title: '阿里云百炼', highlight: 'Token Plan', description: '个人版新增 12 项 Harness 权益，「模型 + Agent 能力」一次配齐；加量不加价，超额调用 88 折。Qwen3.8-Max（0902 快照）、Qwen3.8-Flash、Kimi-K3 等多模态 18+ 旗舰模型共享月度 Credits，夜间 22:00 起限时 4 折。', stats: [{ value: '¥39', label: '起售价/月' }, { value: '18+', label: '款模型' }, { value: '180,000', label: 'Pro Credits/月' }, { value: '12', label: '项 Harness 权益' }] },
  modelsTitle: '模型阵容', modelsDescription: 'Qwen3.8-Max 已更新至 0902 快照版本，另有 Qwen3.8-Flash、Kimi-K3、Deepseek-v4-pro、GLM-5.2 与 Qwen-Image-3.0-Pro 等；官方称覆盖多模态 18+ 旗舰模型，共享月度 Credits。', models: [
    { icon: '☁️', name: 'Qwen3.8-Max（0902 快照）', description: '阿里 2.4T 参数新一代旗舰，官方称「智能体时代全能旗舰模型」；0902 快照版本重磅更新，1M 上下文。', badge: '0902 快照' },
    { icon: '💨', name: 'Qwen3.8-Flash（新）', description: '千问 3.8 高速版，百万级上下文窗口，可一次性处理超长文档和代码仓库。', badge: '新增' },
    { icon: '🌙', name: 'Kimi-K3', description: 'Kimi 最新旗舰模型，长程编程与推理利器。' },
    { icon: '🐋', name: 'Deepseek-v4-pro', description: '旗舰 MoE 大模型，百万上下文与顶尖推理能力，可通过 model name 或控制台选择访问。' },
    { icon: '👁️', name: 'Qwen3-VL-Plus', description: '视觉 Coding、空间感知、多模态思考等全面升级。' },
    { icon: '🎨', name: 'Qwen-Image-3.0-Pro（新）', description: '细节真实、知识厚实的图像生成模型；另有 Qwen3-TTS-Flash、Cosyvoice-V3-Flash 与 Fun-ASR 等语音模型，与文本共享 Credits。', badge: '新增' },
    { icon: '🔷', name: 'GLM-5.2', description: '智谱旗舰模型，1M 上下文，专为长程任务能力而生。' },
  ],
  plansTitle: '个人版套餐', plansDescription: '月度 Credits 计量（Lite 11,500 / Standard 45,000 / Pro 180,000 每月），加量不加价；个人版新增 12 项 Harness 权益，超额调用 88 折。另有团队版席位（¥150/席/月起）。', purchaseUrl: 'https://www.aliyun.com/benefit/scene/codingplan?source=5176.29345612&userCode=j0hv8tuh',
  plans: [
    { name: 'Lite', badge: '入门', price: '¥39', unit: '/月', discount: '11,500 Credits/月 · 权益加码', features: ['11,500 Credits/月', '1-2 个 Agent 并发', '全模态模型共享额度', '夜间 22:00 起限时 4 折'], audience: '轻度使用与尝鲜用户' },
    { name: 'Standard', badge: '推荐', price: '¥139', unit: '/月', discount: '45,000 Credits/月 · 含 12 项 Harness 权益', features: ['45,000 Credits/月（≈4× Lite）', '3-4 个 Agent 并发', '12 项 Harness 权益', '夜间 22:00 起限时 4 折'], audience: '日常开发的主力档位', featured: true },
    { name: 'Pro', badge: '重度畅用', price: '¥499', unit: '/月', discount: '180,000 Credits/月 · 超额调用 88 折', features: ['180,000 Credits/月', '6-8 个 Agent 并发', '超额调用 88 折', '夜间 22:00 起限时 4 折'], audience: '高频、大型项目和专业开发者' },
  ],
  comparison: { title: '套餐横向对比', description: '个人版月度 Credits 额度与官方标注权益，实际消耗取决于模型 Credits 倍率。', columns: ['套餐', '月付', 'Credits/月', 'Agent 并发', '备注'], featuredColumn: 2, rows: [['Lite', '¥39', '11,500', '1-2', '权益加码'], ['Standard', '¥139', '45,000', '3-4', '12 项 Harness 权益'], ['Pro', '¥499', '180,000', '6-8', '超额调用 88 折'], ['团队版标准席位', '¥150 起', '25,000', '—', '刊例 ¥198'], ['团队版高级席位', '¥550 起', '100,000', '—', '刊例 ¥698'], ['团队版尊享席位', '¥1,398', '250,000', '—', '—']] },
  sections: [{ title: '额度与接入规则', warning: '价格与活动可能变化，请在支付前确认结算页。夜间优惠为限时活动：每晚 22:00 起，qwen3.8-max 与 qwen3.8-flash 按 4 折消耗，Qoder / Meoo 客户直接生效。', cards: [
    { title: '专属 API Key', description: '套餐提供 sk-sp- 开头的专属 API Key 与 Base URL，通用百炼 Key 不抵扣额度。' },
    { title: '月度 Credits', description: '个人版按月刷新 Credits 额度：Lite 11,500 / Standard 45,000 / Pro 180,000 每月。' },
    { title: '12 项 Harness 权益', description: '个人版新增 12 项 Harness 权益，千问桌面端、Qoder CN、Qwen Code 等应用统一额度与账单。' },
    { title: '超额 88 折', description: '额度用尽后可继续调用，超出部分按 88 折计费；也可加购用量包（个人版 ¥100/月、团队版 ¥5,000/月）与 MCP / 知识库 / AutoModel 抵扣包。' },
  ] }, { title: '旧 Coding Plan 去向', headingLevel: 3, highlights: ['按次数计费的 Coding Plan（Lite ¥40 / Pro ¥200）已升级为 Credits 计量的 Token Plan', '旧 Lite 此前已停售，Pro 每日 9:30 限量补货的模式不再适用', '老用户按官方指引迁移，历史额度口径以订单页为准'] }],
  tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'OpenCode'],
  contentOrder: ['models', 'plans', 'section:0', 'comparison', 'section:1', 'faq'],
  faqs: [
    { question: 'Token Plan 和原来的 Coding Plan 是什么关系？', answer: '阿里云百炼已将按次数计费的 Coding Plan 全面升级为 Credits 计量的 Token Plan：模型扩展到 Qwen3.8-Max（0902 快照）、Qwen3.8-Flash、Kimi-K3、Deepseek-v4-pro 等多模态 18+ 旗舰模型，额度从「次数」改为按模型倍率抵扣的月度 Credits，并新增个人版/团队版双版本与 12 项 Harness 权益。' },
    { question: '个人版三档怎么选？', answer: 'Lite ¥39/月（11,500 Credits/月）适合轻度；Standard ¥139/月（45,000 Credits/月，约 4× Lite）是日常主力并含 12 项 Harness 权益；Pro ¥499/月（180,000 Credits/月）面向重度与多 Agent 并发，超额调用 88 折。' },
    { question: 'Credits 是怎么消耗的？', answer: '不同模型有不同的 Credits 倍率，个人版按月刷新额度；每晚 22:00 起，qwen3.8-max 与 qwen3.8-flash 按限时 4 折消耗（Qoder / Meoo 客户直接生效），重度任务可挪到夜间跑。' },
    { question: '还有团队版吗？', answer: '有。团队版按席位订阅：标准版 ¥150/席/月起（刊例 ¥198，25,000 Credits/月）、高级版 ¥550/席/月起（刊例 ¥698，100,000 Credits/月）、尊享版 ¥1,398/席/月（250,000 Credits/月），共享同一套多模态旗舰模型，适合企业统一管理。' },
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
  seo: { title: '小米 MiMo Coding Plan 详解 - V2.6 系列上线 + 团队版，Credits 492-9,840 亿/年', description: '小米 MiMo Token Plan Lite、Standard、Pro、Max 价格、Credits（492-9,840 亿/年）、首购 88 折、夜间 0.8x 折扣、TTS 权益与 MiMo Claw 加购。MiMo-V2.6 系列 3 款新模型上线，全档无周限额与 5 小时限额，并新增团队版按席位订阅。', canonical: 'https://codingplan.org/plans/xiaomi', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: '小米 · MiMo Token Plan', title: '小米 MiMo', highlight: 'Coding Plan', description: 'MiMo-V2.6 系列 3 款全新模型上线（官方口径：旗舰性能 · 全模态 · 面向专业场景优化），全档已支持；畅快使用无周限额、无 5 小时限额。月价不变，首购 88 折、年付 88 折，新增同价按席位的团队版。', stats: [{ value: '4', label: '套餐档位' }, { value: '¥39', label: '起步价/月' }, { value: 'V2.6', label: '新旗舰系列' }, { value: '0.8x', label: '夜间消耗' }] },
  modelsTitle: '模型介绍', modelsDescription: 'MiMo-V2.6 系列（3 款）为当前旗舰，全档套餐均已支持；支持 TTS 限时免费。', models: [
    { icon: '🔥', name: 'MiMo-V2.6 系列（3 款新模型）', description: '官方 9 月发布：旗舰性能 · 全模态 · 面向专业场景优化，个人版与团队版全档均已支持。', badge: '新旗舰 · 全模态' },
    { icon: '⚡', name: 'MiMo-V2.6-Flash', description: 'V2.6 系列的高速档，用于高频日常开发与低延迟交互场景。', badge: '高速档' },
    { icon: '🔊', name: 'MiMo TTS 系列', description: '语音合成模型，活动期内限时免费。', badge: '限时免费' },
  ],
  plansTitle: '套餐详情', plansDescription: '月价不变、首购 88 折（每账号 1 次，不参与包年）、年付 88 折；全档 Credits 492-9,840 亿/年，无周限额与 5 小时限额；MiMo Claw 加购 ¥233.80/年，另有同价按席位的团队版。', purchaseUrl: 'https://platform.xiaomimimo.com/token-plan',
  plans: [
    { name: 'Lite', badge: '尝鲜入门', price: '¥39', unit: '/月', discount: '首购 ¥34.32 · 年付 ¥411.84（立省 ¥56.16）', features: ['492 亿 Credits/年（约 41 亿/月）', '支持 V2.6 全新旗舰系列（文本旗舰 / 全模态 / 语音）', '无周限额 · 无 5 小时限额', '支持 OpenClaw、Codex、Claude Code、MiMo Code 等', '非高峰期（00:00-08:00）0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '轻度尝鲜用户', ctaLabel: '立即订阅 Lite →' },
    { name: 'Standard', badge: '日常', price: '¥99', unit: '/月', discount: '首购 ¥87.12 · 年付 ¥1,045.44（立省 ¥142.56）', features: ['1,320 亿 Credits/年（2.7× Lite）', '支持 V2.6 全新旗舰系列', '无周限额 · 无 5 小时限额', '支持 OpenClaw、Codex、Claude Code、MiMo Code 等', '非高峰期 0.8x 系数消耗', 'TTS 系列模型限时免费'], audience: '日常中等频率用户', ctaLabel: '立即订阅 Standard →' },
    { name: 'Pro', badge: '推荐', price: '¥329', unit: '/月', discount: '首购 ¥289.52 · 年付 ¥3,474.24（立省 ¥473.76）', features: ['4,560 亿 Credits/年（9.3× Lite）', '支持 V2.6 全新旗舰系列', '无周限额 · 无 5 小时限额', '支持 OpenClaw、Codex、Claude Code、MiMo Code 等', '非高峰期 0.8x 系数消耗', 'TTS 系列模型限时免费', '可加购 MiMo Claw ¥233.80/年'], audience: '专业高频用户', ctaLabel: '立即订阅 Pro →', featured: true },
    { name: 'Max', badge: '发烧友', price: '¥659', unit: '/月', discount: '首购 ¥579.92 · 年付 ¥6,959.04（立省 ¥948.96）', features: ['9,840 亿 Credits/年（20× Lite）', '支持 V2.6 全新旗舰系列', '无周限额 · 无 5 小时限额', '支持 OpenClaw、Codex、Claude Code、MiMo Code 等', '非高峰期 0.8x 系数消耗', 'TTS 系列模型限时免费', '可加购 MiMo Claw ¥233.80/年'], audience: '发烧友与团队', ctaLabel: '立即订阅 Max →' },
  ],
  sections: [{ title: '套餐亮点', cards: [
    { icon: '🔥', title: 'MiMo-V2.6 系列上线', description: '3 款全新模型（官方口径：旗舰性能 · 全模态 · 面向专业场景优化），个人版与团队版全档均已支持。' },
    { icon: '🏢', title: '新增团队版', description: '与个人版同价、按席位订阅：Standard ¥99 / Pro ¥329 / Max ¥659 每席每月，年付低至 ¥87/¥289/¥579，含成员用量分析与统一账单。' },
    { icon: '💸', title: '5/26 全档 Credits 升级 5-8 倍', description: '价格不变，Credits 额度大幅提升，相当于变相降价。' },
    { icon: '💰', title: '包年 88 折', description: '年付价格相比逐月订阅立省 56-948 元。' },
    { icon: '🦞', title: 'MiMo Claw 正式版上线', description: '可加购 MiMo Claw 服务：首次特惠 ¥14.9/月、限时 ¥19.9/月 或 ¥233.80/年，享受专属龙虾 7×24h + 金山办公生态。' },
    { icon: '🌙', title: '夜间调用享 8 折', description: '北京时间 00:00-08:00 按 0.8 倍 Credits 消耗。' },
    { icon: '🔊', title: 'TTS 模型限时免费', description: 'TTS 系列模型在活动期内免费使用。' },
    { icon: '🔁', title: '自动续费随时取消', description: '套餐到期自动续费，可按官方规则取消。' },
    { icon: '🧩', title: '模型支持', description: 'MiMo-V2.6 系列 3 款新模型 + TTS 系列，通过 API Key 与 Base URL 接入主流编程工具。' },
    { icon: '🤝', title: '邀请返利', description: '邀好友首单 9 折，邀请人最高返实付 20%（首单返 10%，年费会员翻倍）。' },
  ], warning: 'MiMo-V2.6 系列 3 款新模型为当前旗舰，月价不变；年付 88 折后分别为 ¥411.84 / ¥1,045.44 / ¥3,474.24 / ¥6,959.04。全档无周限额与 5 小时限额，夜间 00:00-08:00 按 0.8 倍 Credits 消耗。' }],
  tools: ['MiMo Desktop', 'MiMo Code', 'OpenCode', 'OpenClaw', 'Claude Code', 'Codex', 'Hermes Agent', 'Kilo Code', 'Chatbox AI', 'Cline', 'Cherry Studio', 'Qwen Code', 'CodeBuddy'],
  faqs: [
    { question: '夜间折扣如何计算？', answer: '北京时间 00:00-08:00 调用按 0.8 倍 Credits 消耗。' },
    { question: '支持哪些模型？', answer: '支持 MiMo-V2.6 系列 3 款新模型（官方口径：旗舰性能 · 全模态 · 面向专业场景优化）与 TTS 系列（活动期内限时免费）。个人版与团队版全档均已支持 V2.6。' },
    { question: '有周限额或 5 小时限额吗？', answer: '没有。官方明确全档「畅快使用：无周限额 · 无 5 小时限额」，额度按年总量（个人版）或月总量（团队版）计量，夜间 00:00-08:00 按 0.8 倍 Credits 消耗。' },
    { question: '团队版和个人版有什么区别？', answer: '团队版与个人版同价、按席位订阅：Standard ¥99 / Pro ¥329 / Max ¥659 每席每月（年付低至 ¥87/¥289/¥579），席位 Credits 分别为 110 亿 / 380 亿 / 820 亿每月。团队版额外提供成员用量分析与控制、空间席位统一管理、集中式账单与发票管理，并继承个人版全部权益。团队版不参与首购 88 折。' },
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
  seo: { title: 'OpenCode Go 详解 - $10/月，32 款模型 6 倍用量', description: 'OpenCode Go 订阅详解：$10/月（首月 $5 优惠已于 8/24 取消）；5 小时 $12 / 周 $30 / 月 $60 美元计价额度（6 倍用量）；GPT 6 Luna、DeepSeek V4.1 Flash（限时 4 倍用量）、Kimi K3、GLM-5.3-Flash、MiMo-V2.6-Flash、MiniMax M3 等 32 款模型；OpenAI / Anthropic 兼容 API，OpenCode 或任意 Agent 均可接入。', canonical: 'https://codingplan.org/plans/opencode-go', locale: 'zh-CN', ogType: 'article' },
  hero: { badge: 'OpenCode · Anomaly', title: 'OpenCode', highlight: 'Go 订阅', description: '低成本编码模型订阅：$10/月（原首月 $5 优惠已于 8/24 下线），可享受约 6 倍订阅金额的模型用量。模型阵容已扩至 32 款并经过 Agent 编程实测，OpenCode 或任意兼容 Agent 均可接入。', stats: [{ value: '32', label: '款模型' }, { value: '$10', label: '月付价' }, { value: '6x', label: '用量倍率' }, { value: '6,500', label: 'V4.1 Flash 5h 请求' }] },
  modelsTitle: '模型阵容', modelsDescription: '官方页面展示 32 款模型，全部经过 Agent 编程实测与基准验证；9 月新增 GPT 6 Luna、DeepSeek V4.1 Flash（限时 4 倍用量）、MiMo-V2.6-Flash、Muse Spark 1.3 Contributor 与限时匿名模型 Space Bunny Free。',
  models: [
    { icon: '🐰', name: 'Space Bunny Free（限时）', description: '全新匿名模型，限时上线，额度不限量。', badge: '限时不限量' },
    { icon: '✨', name: 'Muse Spark 1.3 Contributor', description: '新接入的 Contributor 档模型，5 小时约 45,300 次请求，性价比极高。', badge: '新接入' },
    { icon: '⚡', name: 'MiMo-V2.6-Flash', description: '小米 V2.6 系列高速档，5 小时约 30,100 次请求。', badge: '新接入' },
    { icon: '🐋', name: 'DeepSeek V4.1 Flash', description: '新接入主力：5 小时约 6,500 次请求，限时 4 倍用量后可达 26,000 次。', badge: '限时 4 倍用量' },
    { icon: '🔷', name: 'GLM-5.3-Flash', description: '智谱多模态高速版，5 小时约 6,320 次请求。' },
    { icon: '☁️', name: 'Qwen3.7 Plus', description: '阿里千问通用档，5 小时约 4,300 次请求。' },
    { icon: '🧠', name: 'GPT 6 Luna', description: 'OpenAI GPT-6 家族成员（9 月新接入），5 小时约 4,230 次请求。', badge: '新接入' },
    { icon: '🔥', name: 'MiniMax M3', description: 'MiniMax 旗舰多模态模型，5 小时约 3,200 次请求。' },
    { icon: '🌙', name: 'Kimi K2.7 Code / Kimi K3', description: 'K2.7 Code 5 小时约 1,350 次；K3 旗舰（2.8T 参数、1M 上下文）约 110 次。', badge: '旗舰' },
  ],
  plansTitle: '套餐详情', plansDescription: '单档订阅，$10/月享受约 6 倍用量；可随时取消，用量不足可充值补足（原首月 $5 优惠已下线）。', purchaseUrl: 'https://opencode.ai/go?ref=JBT5KJRCD4',
  plans: [
    { name: 'Go', badge: '$10/月', price: '$10', unit: '/月', discount: '订阅即用 · 用量不足可充值补足', features: ['5 小时 $12 / 周 $30 / 月 $60 美元计价额度', '32 款模型（GPT 6 Luna / DeepSeek V4.1 Flash / Kimi K3 等）', 'OpenAI / Anthropic 兼容 API，任意 Agent 可接入', '额度用尽后可使用 Zen 余额兜底（可开关）', '不用于模型训练，多数模型 0 天数据保留', '随时取消，无锁定'], audience: '想以低成本使用最强开源模型的开发者、需要大额度跑 Agent 任务的重度用户', featured: true, recommended: true, ctaLabel: '立即订阅 Go →' },
  ],
  comparison: { title: '模型用量对比', description: '官方页面公布的「预估请求数 / 5 小时」与「每月使用额度」，实际取决于上下文长度与模型单价。', columns: ['模型', '预估请求数 / 5 小时', '每月使用额度'], featuredColumn: 1, rows: [
    ['Space Bunny Free（限时）', '不限量', '不限量'],
    ['Muse Spark 1.3 Contributor', '45,300', '$60'],
    ['MiMo-V2.6-Flash', '30,100', '$60'],
    ['DeepSeek V4.1 Flash', '6,500（限时 4 倍 26,000）', '$15 / $60'],
    ['GLM-5.3-Flash', '6,320', '$60'],
    ['Qwen3.7 Plus', '4,300', '$60'],
    ['GPT 6 Luna', '4,230', '$15'],
    ['MiniMax M3', '3,200', '$60'],
    ['Kimi K2.7 Code', '1,350', '$60'],
    ['Kimi K3', '110', '$15'],
  ] },
  sections: [
    { title: '额度制度', warning: '额度以美元计价：5 小时 $12 / 周 $30 / 月 $60，越贵的模型消耗越快。额度达到上限后仍可使用免费模型（如限时上线的 Space Bunny Free）。DeepSeek V4 系列为峰谷计价，非高峰时段单价更低。', cards: [
      { icon: '⏱️', title: '5 小时滚动窗口', description: '$12 用量，按滚动窗口恢复，适合日常持续编码。' },
      { icon: '📅', title: '每周限制', description: '$30 用量，按周重置，未用完不累积。' },
      { icon: '🗓️', title: '每月限制', description: '$60 用量，约为订阅费的 6 倍，是套餐的核心价值。' },
      { icon: '💳', title: '余额兜底', description: '控制台开启 Use balance 后，超额自动从 Zen 余额扣费，不会中断请求。' },
    ] },
    { title: '接入方式', headingLevel: 3, highlights: ['在 opencode.ai 登录并订阅 Go，复制 API Key', 'OpenCode TUI 中运行 /connect 选择 OpenCode Go 并粘贴 Key', '模型 ID 格式 opencode-go/<model-id>（如 opencode-go/kimi-k3）', 'API 端点兼容 OpenAI / Anthropic / Responses 协议，Claude Code、Cursor 等工具同样可接入', 'Go 提供商已启用网页搜索（8/20 起）'] },
    { title: '隐私与数据', headingLevel: 3, highlights: ['全部模型不用于模型训练', '多数模型 0 天数据保留（GLM / Kimi / Qwen / DeepSeek / MiniMax / MiMo 等）', '部分第三方模型因平台滥用监控保留 30 天', 'DeepSeek 系列零数据保留协议按月续期'] },
  ],
  tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'Kilo Code', 'Cherry Studio'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'section:1', 'section:2', 'faq', 'final-cta'],
  finalCta: { title: '立即订阅 OpenCode Go', label: '前往 opencode.ai/go →', href: 'https://opencode.ai/go?ref=JBT5KJRCD4' },
  faqs: [
    { question: 'OpenCode Go 是什么？', answer: 'OpenCode Go 是 Anomaly 推出的低成本模型订阅：$10/月，提供 32 款模型约 6 倍于订阅金额的用量，可在 OpenCode 或任意 OpenAI / Anthropic 兼容 Agent 中使用。' },
    { question: '首月 $5 优惠还有吗？', answer: '没有了。OpenCode 已于 8/24 正式移除 Go 首月 $5 优惠（changelog v1.18.24），现在统一为 $10/月，可随时取消。' },
    { question: '用量额度怎么计算？', answer: '额度以美元计价：5 小时 $12、每周 $30、每月 $60。实际请求次数取决于模型单价，例如 DeepSeek V4.1 Flash 5 小时约 6,500 次（限时 4 倍用量期间可达 26,000 次），而 Kimi K3 约 110 次。超额后可在控制台开启余额兜底，或改用免费模型。' },
    { question: '包含哪些模型？', answer: '官方页面展示 32 款模型，代表模型包括：Space Bunny Free（限时匿名、额度不限量）、Muse Spark 1.3 Contributor、MiMo-V2.6-Flash、DeepSeek V4.1 Flash（限时 4 倍用量）、GLM-5.3-Flash、Qwen3.7 Plus、GPT 6 Luna、MiniMax M3、Kimi K2.7 Code 与 Kimi K3。模型列表持续更新，以官网为准。' },
    { question: '数据隐私如何保证？', answer: '所有模型均不用于训练，多数模型 0 天数据保留（GLM / Kimi / Qwen / DeepSeek / MiniMax / MiMo 等）；部分第三方模型因平台滥用监控保留 30 天日志。DeepSeek 系列零数据保留协议按月续期。' },
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
  'opencode-go': opencodeGo,
}

export const planSlugs = Object.keys(plansBySlug)

export function getPlan(slug: string) {
  return plansBySlug[slug]
}
