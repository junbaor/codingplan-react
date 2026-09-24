/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器与 plans/plans-en 的模型口径
 * [OUTPUT]: 对外提供 9 个旗舰模型评测页数据（GLM-5.3/GLM-5.2/K3/M3/Doubao/DeepSeek-V4/Qwen3.5/K2.7/GLM-5-Turbo）
 * [POS]: data 的模型长尾承接层，承接「模型名 + 怎么样/价格/coding plan」查询并导向可用套餐
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const modelSlugs = ['glm-5.3', 'glm-5.2', 'kimi-k3', 'minimax-m3', 'doubao-seed-2.1-turbo', 'deepseek-v4', 'qwen3.5-plus', 'kimi-k2.7', 'glm-5-turbo'] as const

export const glm53 = defineContentPage({
  slug: 'glm-5.3',
  accent: 'blue',
  seo: {
    title: 'GLM-5.3 模型评测 2026 - Terminal-Bench 3.0 开源第一，智谱 Coding Plan 全量可用',
    description: '智谱 GLM-5.3 评测：8/14 发布并上线 GLM Coding Plan 全量用户，编程体感较 5.2 提升 50%、DeepSWE v1.1 达 66.9；官方口径支持「真正可用的 1M 上下文」，非高峰时段积分 5 折，9/3-10/7 夜间 ZCode / AutoClaw 端调用 GLM-5.3-Flash 不限量。',
    canonical: 'https://codingplan.org/models/glm-5.3',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 智谱 GLM-5.3',
    title: 'GLM-5.3',
    highlight: '新晋开源编程王',
    description: '2026 年 8 月 14 日发布的智谱新旗舰：与 GLM-5.2 同基座，靠更大规模后训练 Scaling 将编程与 Agent 能力再拉高一档，发布当天上线 ZCode、AutoClaw 与 GLM Coding Plan 全量用户，并重置全员额度；GLM-5.3 与 GLM-5.3-Flash 均支持官方口径的「真正可用的 1M 上下文」。',
    stats: [
      { value: '#1', label: 'Terminal-Bench 3.0 开源' },
      { value: '+50%', label: '编程体感较 5.2' },
      { value: '¥94.4/月', label: '最低可用套餐' },
    ],
  },
  sections: [
    {
      title: '能力速览',
      cards: [
        { icon: '🏆', title: 'Terminal-Bench 3.0', description: '得分从 5.2 的 4.6 跃升至 28.3，开源第一；Agents\' Last Exam (CLI) 同榜领先。' },
        { icon: '🛠️', title: 'DeepSWE v1.1', description: '长程软件工程得分 46.2 → 66.9，超过 DeepSeek-V4 Pro-0813。' },
        { icon: '🛡️', title: '安全能力涌现', description: 'CyberGym 漏洞发现 84.5 分居参评模型之首，ExploitBench 24.4 翻倍至 54.4。' },
        { icon: '📏', title: '真正可用的 1M 上下文', description: '官方口径强调上下文「真正可用」：GLM-5.3 与 GLM-5.3-Flash 均支持，大型代码库可整体载入。' },
        { icon: '🔓', title: '权重已开源', description: 'GLM-5.3 旗舰权重 8/28 在 HuggingFace 放出；GLM-5.3-Flash 已提前以 MIT 协议开源。' },
      ],
    },
    {
      title: '后训练 Scaling：同基座怎么变强的',
      paragraphs: [
        'GLM-5.3 最反直觉的地方是基座模型与 GLM-5.2 完全相同，性能提升 100% 来自后训练扩展：数十倍规模的长程任务环境、更多样的环境类型和超长训练周期。在普遍堆参数的行业节奏下，智谱用这条路线验证了「基座潜力远未触顶」。',
        '官方口径其编程与 Agent 能力已接近 Claude Fable 5；内部自建体感评测（Z.ai Code Bench）较 GLM-5.2 提升 50%。对日常工程的意义：复杂多步 Agent 任务、跨文件重构和持续代码修改场景的成功率明显提高。',
      ],
    },
    {
      title: '哪些套餐能用 GLM-5.3',
      description: '按入门价排序，点击平台名查看套餐详情。',
      table: {
        columns: ['平台', '入门价', 'GLM-5.3 可用性'],
        featuredColumn: 1,
        rows: [
          ['智谱 GLM Coding Plan', '¥118/月（年付 ¥94.4）', '8/14 起全量用户可用；含 GLM-5.3-Flash（支持真正可用的 1M 上下文）'],
          ['Z.ai 国际版', '$18/月（年付 $12.6）', '同步上线全量档位，积分制'],
          ['火山引擎方舟', '¥9.9/月起', '模型池含 GLM-5.3 系列（支持 1M 上下文）；GLM-5.2 已于 8/31 下线'],
          ['OpenCode Go', '$10/月', 'GLM-5.3 与 GLM-5.3-Flash 均已收录（Flash 5h 约 6,320 次）'],
        ],
        rowLinks: ['/plans/zhipu', '/en/plans/glm', '/plans/volcengine', '/plans/opencode-go'],
      },
    },
    {
      title: '怎么选套餐',
      highlights: [
        '首发尝鲜：智谱 Lite 年付 ¥94.4/月即可用上 5.3 与 5.3-Flash，非高峰时段积分 5 折',
        '重度主力：智谱 Pro 年付 ¥430.4/月（60K 积分/周），MCP 工具全配套',
        '国际付款场景：Z.ai 国际版年付 $12.6/月，与国内版同额度',
        '多模型轮换：火山方舟或 OpenCode Go 也能用上 GLM-5.3（后者含 GLM-5.3-Flash，5h 约 6,320 次）',
      ],
    },
    {
      title: '9 月限时活动与新增权益',
      highlights: [
        '夜间畅用（9/3-10/7）：每日 23:00-次日 09:00，ZCode / AutoClaw 端调用 GLM-5.3-Flash 不限量，其他 Agent 额度翻倍',
        '庆双节（9/25-10/7）：全天按非高峰时段规则消耗额度，相当于整段假期都在 5 折',
        '非高峰 5 折仍有效：高峰为周一至五 14:00-18:00（UTC+8），其余时段按 50% 抵扣',
        'ZCode 为常设权益：订阅用户专享 150% 额度、闲时任务免费、专业级数据 MCP',
        '新增官方办公助手 AutoClaw：订阅用户专享 150% 额度及 AutoClaw 专属权益',
        '抵扣系数（官方口径）：GLM-5.3 为 6.9 / 1.7 / 24，GLM-5.3-Flash 为 2.3 / 0.56 / 8；4 类 MCP 每次 1.2 积分',
        '官方称用满非高峰较按量调用 GLM-5.3 API 最高省 92%；团队版仍在售',
      ],
    },
  ],
  faqs: [
    { question: 'GLM-5.3 和 GLM-5.2 该用哪个？', answer: 'GLM-5.3 是 5.2 的同基座升级版，编程体感提升 50% 且已上线全量用户，新任务建议直接用 5.3；5.2 仍在各套餐可用，稳定性经过两个月大规模验证，两者共享套餐额度。' },
    { question: 'GLM-5.3 开源吗？', answer: '是。旗舰权重已于 8/28 在 HuggingFace 放出（兑现发布后两周内开源的承诺）；同系的 GLM-5.3-Flash（8/26 上线的原生多模态版）已提前以 MIT 协议开源。' },
    { question: 'GLM-5.3 上下文多长？', answer: '官方口径为「真正可用的 1M 上下文」，GLM-5.3 与 GLM-5.3-Flash 两个档位均支持，大型代码库整体分析能力不变。' },
    { question: '用 GLM-5.3 每月大概花多少？', answer: '走智谱套餐最低约 ¥94.4/月（年付 Lite），非高峰时段按 50% 抵扣、官方称用满非高峰较按量调用 API 最高省 92%；重度 Agent 使用建议 Pro 档起步。' },
    { question: '9 月的活动怎么用？', answer: '9/3-10/7 每日 23:00-09:00，ZCode / AutoClaw 端调用 GLM-5.3-Flash 不限量，其他 Agent 额度翻倍；9/25-10/7 全天按非高峰规则消耗额度。' },
  ],
  related: [
    { kind: '详情', title: '智谱 GLM Coding Plan', description: 'GLM-5.3 的主场套餐。', href: '/plans/zhipu' },
    { kind: '模型', title: 'GLM-5.2 评测', description: '上一代开源第一旗舰。', href: '/models/glm-5.2' },
    { kind: '模型', title: 'Kimi K3 评测', description: '另一个 1M 上下文旗舰。', href: '/models/kimi-k3' },
  ],
})

export const glm52 = defineContentPage({
  slug: 'glm-5.2',
  accent: 'blue',
  seo: {
    title: 'GLM-5.2 模型评测 2026 - LMArena 代码榜开源第一，哪些套餐能用、多少钱',
    description: '智谱 GLM-5.2 评测：LMArena 代码榜开源第一、全球第二（仅次于 Claude），1M 上下文全量开放；智谱 Coding Plan 年付 ¥94.4/月可用（调用自动路由至 GLM-5.3），OpenCode Go $10/月同享。火山方舟侧 GLM-5.2 已于 8/31 下线，未迁移调用自动路由至 GLM-5.3。',
    canonical: 'https://codingplan.org/models/glm-5.2',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 智谱 GLM-5.2',
    title: 'GLM-5.2',
    highlight: '开源代码之王',
    description: '2026 年 6 月 13 日全量开放的智谱旗舰：发布即登顶 LMArena 代码榜开源第一、全球第二，1M 上下文。8/14 智谱发布同基座的新旗舰 GLM-5.3（Terminal-Bench 3.0 开源第一），5.2 仍为套餐内在售主力模型。',
    stats: [
      { value: '#1', label: 'LMArena 开源榜' },
      { value: '1M', label: '上下文窗口' },
      { value: '¥94.4/月', label: '最低可用套餐' },
    ],
  },
  sections: [
    {
      title: '能力速览',
      cards: [
        { icon: '🏆', title: 'LMArena 代码榜', description: '开源模型第一、全球第二，仅次于 Claude Fable 5，是国产模型的历史最好成绩。' },
        { icon: '📏', title: '1M 上下文', description: '全量开放百万 token 窗口，大型代码库整体分析成为可能。' },
        { icon: '🧩', title: 'MCP 原生配合', description: '智谱套餐内置视觉/搜索/网页/仓库 4 类 MCP，GLM-5.2 可直接调用。' },
        { icon: '⚡', title: '工程定位', description: '代码生成、理解、重构三线并重，Agent 多步任务稳定性强。' },
      ],
    },
    {
      title: '哪些套餐能用 GLM-5.2',
      description: '按入门价排序，点击平台名查看套餐详情。智谱侧调用 5.2 已自动路由至 GLM-5.3。',
      table: {
        columns: ['平台', '入门价', 'GLM-5.2 可用性'],
        featuredColumn: 1,
        rows: [
          ['火山引擎方舟', '¥9.9/月起', '已于 8/31 下线，未迁移调用自动路由至 GLM-5.3'],
          ['OpenCode Go', '$10/月', '可用 · 5h 约 880 次请求'],
          ['智谱 GLM Coding Plan', '¥118/月（年付 ¥94.4）', '调用自动切换至 GLM-5.3（同基座更强）'],
          ['Z.ai 国际版', '$18/月（年付 $12.6）', '调用自动切换至 GLM-5.3'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/opencode-go', '/plans/zhipu', '/en/plans/glm'],
      },
    },
    {
      title: '怎么选套餐',
      highlights: [
        '最便宜体验：火山方舟首购 ¥9.9，还附带多款模型轮换与 Auto 调度（GLM-5.2 已于 8/31 下线）',
        '重度主力使用：智谱 Pro 年付 ¥430.4/月（60K 积分/周），MCP 工具全配套',
        '混合国际模型：OpenCode Go $10/月，GLM-5.2 与 Grok 4.6/K3/DeepSeek V4 同池',
        '国际付款场景：Z.ai 国际版年付 $12.6/月',
      ],
    },
    {
      title: '与其他旗舰对比',
      paragraphs: [
        '对 Kimi K3：GLM-5.2 在 LMArena 代码榜名次更高（开源第一 vs 接近 Anthropic 前沿），K3 胜在 2.8T 参数规模与 Pro 档的 1M 长对话；两者上下文同规格。',
        '对 MiniMax M3：M3 主打开源多模态（图像/视频输入）与 100+ TPS 高速；纯代码工程 GLM-5.2 更强，多模态场景 M3 互补。',
        '对 Claude Opus 5：全球榜上 GLM-5.2 曾位列第二仅次于 Claude，差距在复杂 Agent 长链路任务，日常出码已可互换；智谱口径 GLM-5.3 编程体感已接近 Claude Fable 5。',
      ],
    },
  ],
  faqs: [
    { question: 'GLM-5.2 是开源模型吗？', answer: '是开源开放模型（MIT），也是 LMArena 代码榜排名最高的开源模型之一；智谱套餐与多家聚合平台（火山、OpenCode Go）均可调用。' },
    { question: 'GLM-5.3 发布后还该用 GLM-5.2 吗？', answer: 'GLM-5.3（8/14 发布）与 5.2 同基座，靠后训练 Scaling 将编程能力再提升 50%（Terminal-Bench 3.0 开源第一），追求最强编程能力直接用 5.3；5.2 仍在各套餐内可用且稳定性经过验证，重活也可按需切换。' },
    { question: 'GLM-5.2 和 GLM-5.1 差多少？', answer: 'GLM-5.2 是新一代旗舰（1M 上下文、榜单第一），GLM-5.1 定位均衡档；智谱套餐内两者均可选，重活交给 5.2/5.3、日常用 5.1 省 Credits。' },
    { question: '火山方舟的 GLM-5.2 还能用吗？', answer: '已下线。方舟侧 GLM-5.2 于 2026/8/31 到期（此前限时加量 4 倍的活动已于 8/8 结束，8/17 起停止对新用户提供），未迁移的调用会自动路由至 GLM-5.3。' },
    { question: '用 GLM-5.2 每月大概花多少？', answer: '走套餐最低约 ¥94.4/月（智谱年付 Lite 或火山首购）；按量 API 另行计费。重度 Agent 使用建议 Pro 档起步。' },
  ],
  related: [
    { kind: '模型', title: 'GLM-5.3 评测', description: '8/14 发布的新旗舰。', href: '/models/glm-5.3' },
    { kind: '详情', title: '智谱 GLM Coding Plan', description: 'GLM-5.2 的主场套餐。', href: '/plans/zhipu' },
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '用 GLM-5.2 跑 Claude Code。', href: '/blogs/claude-code-with-glm' },
    { kind: '模型', title: 'Kimi K3 评测', description: '另一个 1M 上下文旗舰。', href: '/models/kimi-k3' },
  ],
})

export const kimiK3 = defineContentPage({
  slug: 'kimi-k3',
  accent: 'purple',
  seo: {
    title: 'Kimi K3 模型评测 2026 - 2.8T 参数 1M 上下文，Plus ¥99/月起可用',
    description: 'Moonshot Kimi K3 评测：2.8 万亿参数、100 万 token 上下文、最高 260 Tokens/s；新会员体系下 Kimi Code 需 Plus（¥99/月）及以上，1M 上下文与高速版需 Pro（¥199/月）及以上，K2.8 Preview 已上线，OpenCode Go $10/月同享。',
    canonical: 'https://codingplan.org/models/kimi-k3',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · Moonshot Kimi K3',
    title: 'Kimi K3',
    highlight: '2.8T 参数旗舰',
    description: '2026 年 7 月 17 日正式上线的 Moonshot 旗舰（模型 ID k3）：2.8 万亿参数、100 万 token 上下文、原生视觉能力，输出速度最高 260 Tokens/s，SWE-Bench 等编程评测接近 Anthropic 前沿水平。',
    stats: [
      { value: '2.8T', label: '参数规模' },
      { value: '1M', label: '上下文（Pro 起）' },
      { value: '¥99/月', label: '起用档位' },
    ],
  },
  sections: [
    {
      title: '能力速览',
      cards: [
        { icon: '🧠', title: '2.8 万亿参数', description: '国产已上线模型中最大参数规模之一，输出速度最高 260 Tokens/s，复杂推理与长链路任务的基础。' },
        { icon: '📏', title: '1M 超长上下文', description: 'Pro 档（¥199/月，年付 ¥159/月）及以上解锁百万 token 长对话；256K 以内可改用 k3-256k 省额度版。' },
        { icon: '💠', title: 'k3-256k 省额度版', description: '模型 ID k3-256k：256K 内效果与 K3 相同、消耗约为其一半，不支持视频输入，适合日常问答与单文件修改。' },
        { icon: '🆕', title: 'K2.8 Preview', description: '新增编程型号 kimi-for-coding（最高 1M 上下文），是 K2 线在新会员体系下的接续型号。' },
        { icon: '👁️', title: '原生视觉', description: 'UI 截图还原、设计稿转代码是 K3 的招牌场景，前端开发者重点。' },
        { icon: '📊', title: '编程评测', description: 'SWE-Bench 等评测接近 Anthropic 前沿水平，与 GLM-5.2 同属国产第一梯队。' },
      ],
    },
    {
      title: '哪些套餐能用 K3',
      table: {
        columns: ['平台', '入门价', 'K3 可用性'],
        featuredColumn: 1,
        rows: [
          ['OpenCode Go', '$10/月', '可用 · 5h 约 110 次请求'],
          ['Kimi Code Plan', '¥99/月（Plus）', '可用 · 免费档与 Go 档无 coding 额度'],
          ['Kimi Code Plan Pro', '¥199/月（年付 ¥159）', '解锁 1M 上下文 + 高速版（需 Pro 及以上）'],
          ['Kimi Code Plan Max', '¥699/月（年付 ¥559）', '最高档 · 年付最高立省 ¥1,680'],
        ],
        rowLinks: ['/plans/opencode-go', '/plans/kimi', '/plans/kimi', '/plans/kimi'],
      },
    },
    {
      title: '使用规则要点',
      warning: 'K3 仅 Plus（¥99/月）及以上可用；免费档与 Go 档无 Kimi Code 额度。1M 长对话与 K2.7 Code 高速版为 Pro（¥199/月）及以上独占。',
      highlights: [
        'K3 与 K2.7 共享额度：新会员取消每周额度限制，仅保留每 5 小时的滚动频率窗口',
        '所有设备与 API Key 共享同一份配额；额度用尽可按「加油包」兜底（单次最低 ¥25）',
        'Plus 起可调用 Kimi Code 与 K3，Pro 及以上解锁 1M 上下文与高速版',
        '月总额度仍然存在：达到月上限时 Kimi Code 额度会冻结，需等待月额度重置或升级',
        '前端/UI 还原场景优先选 K3，配合 Claude Code 或 Roo Code',
      ],
    },
    {
      title: '与 GLM-5.2 怎么选',
      paragraphs: [
        '两者都是 1M 上下文旗舰：GLM-5.2 榜单名次更高（开源第一）、起步更便宜（¥94.4 年付可用）；K3 参数更大、视觉与前端正向能力突出，其 1M 上下文需要 Pro 档（¥199/月）。',
        '预算有限二选一：通用工程选 GLM-5.2，前端/多模态选 K3。两者也可通过 OpenCode Go 一份 $10 订阅同池使用（K3 约 110 次/5h，GLM-5.2 约 880 次/5h）。',
      ],
    },
  ],
  faqs: [
    { question: 'K3 免费能用吗？', answer: '不能。K3 需 Plus（¥99/月）及以上；免费档与 Go 档均无 Kimi Code 额度，可先用 K2.7 验证工作流再升级。' },
    { question: 'K3 和 K2.7 差距大吗？', answer: 'K3 在参数规模（2.8T）、视觉能力与长上下文上限全面超越 K2.7；日常轻任务 K2.7 依然够用，且与 K3 共享额度。' },
    { question: '1M 上下文怎么才能用到？', answer: '需要 Pro（¥199/月，年付 ¥159/月）及以上档位；Pro 与 Max 均可调用 1M 超长对话。' },
    { question: 'K2.8 Preview 是什么？', answer: 'Kimi 新增的编程型号（模型 ID kimi-for-coding），最高支持 1M 上下文，与 K3、k3-256k 同池可选；K2.7 Code 高速版（kimi-for-coding-highspeed）负责高吞吐场景，需 Pro 及以上。' },
    { question: '额度用完了怎么办？', answer: '官方新增「加油包」（Extra Usage）：订阅额度用尽后按量扣费兜底，单次最低 ¥25，每日最多 10 次、累计 ¥3,000，余额上限 ¥10,000，余额不过期可叠加，并与网页端 Kimi 共享。' },
    { question: 'OpenCode Go 里 K3 好用吗？', answer: '可用但单价较高（5h 约 110 次），适合把 K3 当「专家」按需调用，日常任务交给池内更便宜的 DeepSeek/MiMo。' },
  ],
  related: [
    { kind: '详情', title: 'Kimi Code Plan 详解', description: '新会员体系与 K3 规则。', href: '/plans/kimi' },
    { kind: '模型', title: 'GLM-5.2 评测', description: '正面对比的另一个旗舰。', href: '/models/glm-5.2' },
    { kind: '教程', title: 'Claude Code 配置 Kimi', description: '用 K3 跑 Claude Code。', href: '/blogs/claude-code-with-kimi' },
  ],
})

export const minimaxM3 = defineContentPage({
  slug: 'minimax-m3',
  accent: 'orange',
  seo: {
    title: 'MiniMax M3 模型评测 2026 - 原生多模态 1M 上下文，Plus ¥49/月起可用',
    description: 'MiniMax M3 评测：2026/5/31 发布的旗舰模型，原生图像/视频输入、1M 上下文；MiniMax Token Plan Plus ¥49/月起可用（月度约 6 亿+ M3 token），OpenCode Go $10/月同享；官方 Agent 应用 MiniMax Code 开箱即用，额度用尽可购买积分兜底。',
    canonical: 'https://codingplan.org/models/minimax-m3',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · MiniMax M3',
    title: 'MiniMax M3',
    highlight: '原生多模态旗舰',
    description: '2026 年 5 月 31 日发布的 MiniMax 旗舰：原生支持图像与视频输入，1M 超长上下文，与全系模型共享 Token Plan 月度配额。',
    stats: [
      { value: '5/31', label: '发布日期' },
      { value: '1M', label: '上下文窗口' },
      { value: '¥49/月', label: '起用套餐' },
    ],
  },
  sections: [
    {
      title: '能力速览',
      cards: [
        { icon: '🎥', title: '原生多模态', description: '图像与视频直接输入，UI 截图、设计稿、录屏理解无需转换。' },
        { icon: '📏', title: '1M 上下文', description: '大型代码库与超长文档分析。' },
        { icon: '🔗', title: '共享配额', description: '与 M2.7/H3/Speech 2.8 全系共享月度 token，一个套餐全模态；Music 全系列已于 8/20 停止服务。' },
        { icon: '⚡', title: '高速搭档', description: 'M2.7-highspeed 每 5 小时 750 / 2,250 / 7,500 次（Plus/Max/Ultra），追求响应速度时与 M3 搭配使用。' },
        { icon: '🖥️', title: '官方应用 MiniMax Code', description: 'MiniMax 官方 Agent 应用（桌面端 + 网页版），Token Plan 开箱即用。' },
        { icon: '➕', title: '积分购买兜底', description: '套餐额度用尽时可自动由已购积分补充：入门版 ¥30/4,489 积分、进阶版 ¥150/22,460、高级版 ¥500/74,900，购买之日起 1 年内有效。' },
      ],
    },
    {
      title: '哪些套餐能用 M3',
      table: {
        columns: ['平台', '入门价', 'M3 可用性'],
        featuredColumn: 1,
        rows: [
          ['MiniMax Token Plan', '¥49/月（Plus）', '可用 · 月度约 6 亿+/18 亿+/71 亿+ M3 token（Plus/Max/Ultra）'],
          ['OpenCode Go', '$10/月', '可用 · 5h 约 3,200 次请求'],
          ['MiniMax 国际版', '$20/月（Plus）', '可用 · M3 access'],
          ['火山引擎方舟', '¥9.9/月起', '新接入 · 与豆包/Kimi/GLM 同池'],
        ],
        rowLinks: ['/plans/minimax', '/plans/opencode-go', '/en/plans/minimax', '/plans/volcengine'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '多模态编码（截图还原/视频理解）是 M3 的独有场景',
        '纯文本出码 GLM-5.3/K3 榜单更强，M3 胜在全模态一池共享',
        '额度受 5 小时固定窗口 + 周窗口双控，未用完不结转；高峰动态限流通常出现在工作日 15:00-17:30',
        '额度用尽可购买积分兜底（入门版 ¥30/4,489 积分起，1 年内有效），可自动补充',
        'Plus ¥49/月含 6 亿+ token，是全模态最便宜的入口',
        '官方 Agent 应用 MiniMax Code（桌面端 + 网页版）对 Token Plan 开箱即用',
      ],
    },
    {
      title: '背景与发布节奏',
      paragraphs: [
        'MiniMax 的订阅体系在 2026 年经历了一次重要转向：3 月把 Coding Plan 升级为 Token Plan，成为全球首个支持全模态模型的订阅计划；5 月 31 日 M3 旗舰上线，原生多模态输入与 1M 上下文同场发布。老用户的档位与权益在转向中完整保留，这也是 MiniMax 口碑较好的一个原因。',
        '在模型矩阵上，M3 之外还有 M2.7（标准/高速）、H3（推理与 Agent 编排）与 Speech 2.8 等语音/图像系列，共享月度 token 池——一个套餐覆盖从写码到语音的完整链路。需要留意的是 Music 全系列已于 8/20 停止服务（开源版 MiniMax-Music3 可在 Hugging Face / 魔搭获取）。官方 Agent 应用 MiniMax Code（桌面端 + 网页版）对 Token Plan 开箱即用。',
      ],
    },
  ],
  faqs: [
    { question: 'M3 和 M2.7 怎么选？', answer: 'M3 是旗舰（多模态、1M 上下文），M2.7 是均衡主力且分标准/高速版；两者共享月度配额，按任务切换不额外付费。' },
    { question: 'M3 视频生成包含在套餐里吗？', answer: '视频生成为独立权益（Hailuo 2.3）：Max 档 3 条/日、Ultra 5 条/日、Plus 不含；M3 的视频能力指「视频输入理解」。' },
    { question: 'M3 写代码比 GLM-5.3 强吗？', answer: '纯代码工程 GLM-5.3 榜单更强；M3 的优势是多模态输入与全模态共享额度。混合场景两者互补。' },
    { question: '额度用完了怎么办？', answer: '可以购买积分兜底：入门版 ¥30/4,489 积分、进阶版 ¥150/22,460 积分、高级版 ¥500/74,900 积分，购买之日起 1 年内有效，套餐额度用尽时可自动由已购积分补充。' },
    { question: 'MiniMax Code 是什么？', answer: 'MiniMax 官方推出的 Agent 应用（桌面端 + 网页版），Token Plan 用户开箱即用，无需自行接 API。' },
  ],
  related: [
    { kind: '详情', title: 'MiniMax Token Plan 详解', description: 'M3 的主场套餐。', href: '/plans/minimax' },
    { kind: '模型', title: 'GLM-5.2 评测', description: '纯代码更强的选择。', href: '/models/glm-5.2' },
    { kind: '榜单', title: '性价比排行榜', description: '全模态套餐排名。', href: '/leaderboard' },
  ],
})

export const doubaoSeed21Turbo = defineContentPage({
  slug: 'doubao-seed-2.1-turbo',
  accent: 'cyan',
  seo: {
    title: 'Doubao-Seed-2.1-turbo 评测 2026 - 字节高速代码模型，方舟 ¥9.9 起可用',
    description: '字节跳动 Doubao-Seed-2.1-turbo 评测：火山方舟 Coding Plan 的高速代码模型，池内含 DeepSeek-V4.1-Flash、GLM-5.3 系列、Kimi-K3 与 Kimi-K2.8-Preview，Lite 首购 ¥9.90 起、Pro 首购 ¥49.90，适合高频补全与快速迭代。',
    canonical: 'https://codingplan.org/models/doubao-seed-2.1-turbo',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 字节 Doubao-Seed-2.1-turbo',
    title: 'Doubao-Seed-2.1-turbo',
    highlight: '高速代码模型',
    description: '字节跳动高速代码模型，火山方舟 Coding Plan 在售。主打低延迟高频场景：代码补全、快速问答、批量小改动。',
    stats: [
      { value: '¥9.90', label: 'Lite 首购价' },
      { value: '¥49.90', label: 'Pro 首购价' },
      { value: 'Turbo', label: '低延迟定位' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '⚡', title: '高速推理', description: 'Turbo 后缀主打低延迟，适合高频补全与快速迭代，与旗舰模型形成快慢搭配。' },
        { icon: '🔄', title: '同池切换', description: '与 GLM-5.3 系列 / Kimi-K3 / Kimi-K2.8-Preview / DeepSeek-V4.1-Flash 共享方舟套餐额度。' },
        { icon: '🤖', title: 'Auto 模式搭档', description: '方舟 Auto 调度会把轻任务路由给高速档模型，省下旗舰额度；夜间 00:00-08:00 Kimi-K3 的路由比例大幅提升。' },
        { icon: '📏', title: '池内 1M 上下文', description: '方舟支持 1M 上下文的型号：glm-5.3、glm-5.3-flash、deepseek-v4.1-flash、deepseek-v4-flash、deepseek-v4-pro、kimi-k3、kimi-k2.8-preview。' },
      ],
    },
    {
      title: '哪里能用',
      table: {
        columns: ['平台', '入门价', '说明'],
        featuredColumn: 1,
        rows: [
          ['火山引擎方舟', '¥9.90/月起（首购，Pro ¥49.90）', '唯一官方渠道 · 刊例 Lite ¥40 / Pro ¥200，受邀再享 9.5 折'],
        ],
        rowLinks: ['/plans/volcengine'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '日常补全/小改动交给 turbo，复杂架构改动切 GLM-5.3 系列或 Kimi-K3',
        '配合 Auto 模式全自动分层，无需手动选模型',
        '方舟 Lite 与 Pro 区别只在用量倍数（Pro 为 5 倍），模型阵容一致',
        '首购限时价 Lite ¥9.90 / Pro ¥49.90（2.5 折活动期 6/10-11/8），适合完整评估 turbo 的速度收益',
        '限时抵扣系数：deepseek-v4.1-flash 5 折（9/15-10/30）、kimi-k2.8-preview 6 折（9/17-9/30）',
        'doubao-seed-2.0-lite 即将下线，2.1-lite / 2.1-pro 已上线承接',
      ],
    },
    {
      title: '背景与命名解读',
      paragraphs: [
        'Doubao-Seed 是字节跳动豆包大模型家族的「种子」系列，命名里的 Seed 指代从预训练到对齐的完整自研链路。2.1-turbo 是 2.0 系列之后的迭代：参数规模未大幅变化，重点在推理延迟与高频场景的吞吐优化，这也是方舟把它作为 Coding Plan 主力型号之一的原因。',
        '在方舟的模型矩阵里，turbo 扮演「快档」：Auto 模式将简单任务路由过来，把 GLM-5.3 系列、Kimi-K3 等旗舰额度留给难任务。如果你的日常请求以补全、小范围改动、批量机械修改为主，turbo 的实际体感会明显快于旗舰模型。',
        '方舟当前主推 DeepSeek-V4.1-Flash、GLM-5.3 系列、Doubao-Seed-Evolving、Kimi-K3 与 Kimi-K2.8-Preview，支持自由切换或 Auto 模式调度；doubao-seed-2.0-lite 即将下线，doubao-seed-2.1-lite / 2.1-pro 与 deepseek-v4-pro 正式版已上线。邀请方面，好友首单额外 9.5 折，邀请人每单得下单金额 5% 代金券（上不封顶）。',
      ],
    },
  ],
  faqs: [
    { question: 'Doubao-Seed-2.1-turbo 和 2.0 系列什么区别？', answer: '2.1-turbo 是新一代高速版本，延迟更低；同代还有 2.1-lite / 2.1-pro 已上线，2.0-lite 即将下线。' },
    { question: '只有火山方舟能用吗？', answer: 'Doubao 系列模型目前仅通过火山方舟 Coding Plan / API 提供，其他平台暂未接入。' },
    { question: '写大型项目合适吗？', answer: 'turbo 定位高速档，复杂工程建议同池切换 GLM-5.3 / Kimi-K3 / DeepSeek-V4.1-Flash，把 turbo 留给高频轻任务。' },
    { question: '首购优惠怎么算？', answer: 'Lite 刊例 ¥40/月、Pro ¥200/月；首购限时价 Lite ¥9.90/月、Pro ¥49.90/月（限时 9.9 元起，名额有限先到先得），受邀下单再享 9.5 折。' },
  ],
  related: [
    { kind: '详情', title: '火山引擎方舟详解', description: 'Doubao 全系所在套餐。', href: '/plans/volcengine' },
    { kind: '教程', title: 'Claude Code 接入方舟', description: '用 Doubao 跑 Claude Code。', href: '/blogs/claude-code-with-volcengine' },
    { kind: '模型', title: 'DeepSeek V4 评测', description: '同池的另一个新接入。', href: '/models/deepseek-v4' },
  ],
})

export const deepseekV4 = defineContentPage({
  slug: 'deepseek-v4',
  accent: 'slate',
  seo: {
    title: 'DeepSeek V4 评测 2026 - V4.1-Flash 支持图像理解，Go 内 5h 6,500 次',
    description: 'DeepSeek V4 系列评测：官方现役两个模型 ID——deepseek-flash（V4.1-Flash）与 deepseek-v4-pro（V4-Pro-0813）；V4.1-Flash 提供 1M 上下文、384K 输出与图像理解，空闲时段未命中缓存 ¥1/百万 token、输出 ¥4，0 天数据保留，适合作为 Agent 任务的高频底座。',
    canonical: 'https://codingplan.org/models/deepseek-v4',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · DeepSeek V4 系列',
    title: 'DeepSeek V4',
    highlight: '性价比之王',
    description: 'DeepSeek 官方现役两个模型 ID：deepseek-flash（V4.1-Flash，1M 上下文 + 图像理解）与 deepseek-v4-pro（V4-Pro-0813，旗舰档）；空闲时段价格恰为高峰的一半，V4.1-Flash 在 OpenCode Go 内 5 小时可跑 6,500 次请求。',
    stats: [
      { value: '6,500', label: 'V4.1-Flash 次/5h（Go）' },
      { value: '1M', label: 'V4.1-Flash 上下文' },
      { value: '0 天', label: '数据保留' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '🚀', title: 'V4-Pro-0813', description: '旗舰档（模型 ID deepseek-v4-pro）：复杂推理与大型重构，空闲时段缓存命中 ¥0.15、未命中 ¥4.5、输出 ¥13.5 每百万 token；不支持图像理解。' },
        { icon: '💨', title: 'V4.1-Flash', description: '超低单价高速档（模型 ID deepseek-flash）：1M 上下文、最大 384K 输出，空闲时段未命中缓存 ¥1、输出 ¥4 每百万 token，批量任务底座。' },
        { icon: '👁️', title: '支持图像理解', description: 'V4.1-Flash 支持图像输入，并有非思考与思考双模式（默认思考）、并发 2500；V4-Pro-0813 并发 500 且不支持图像。' },
        { icon: '🔁', title: '旧 ID 自动承接', description: 'deepseek-v4-flash 与 deepseek-v4-flash-vision-exp 仍可调用，但对应模型已下线，请求由 V4.1-Flash 承接并按 Flash 价格计费。' },
        { icon: '🔒', title: '零数据保留', description: '零数据保留协议按月续期，隐私敏感场景友好。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '可用性'],
        featuredColumn: 1,
        rows: [
          ['OpenCode Go', '$10/月', 'DeepSeek V4.1 Flash（4 倍用量）已收录 · 5h 6,500 / 26,000 次（月额度 $15 / $60）'],
          ['火山引擎方舟', '¥9.9/月起', '模型池含 DeepSeek-V4.1-Flash · 9/15-10/30 抵扣系数 5 折'],
        ],
        rowLinks: ['/plans/opencode-go', '/plans/volcengine'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '高频 Agent 任务（批量重构/自动化）首选 V4.1-Flash，空闲时段单价直接减半',
        '复杂单次任务用 V4-Pro-0813 或切 GLM-5.3',
        '高峰时段为北京时间周一至五 9:00-12:00 与 14:00-18:00（法定节假日除外），批量任务排到非高峰等于省一半',
        '图像输入场景（截图、设计稿）现在也能交给 V4.1-Flash（384K 输出上限）',
        '隐私敏感代码优先 DeepSeek（0 天保留）+ OpenCode Go（不用于训练）',
      ],
    },
    {
      title: '背景与开源影响',
      paragraphs: [
        'DeepSeek 的 V3/R1 系列曾在 2025 年以极低训练成本和开源权重震动行业，V4 系列延续同一路线：旗舰能力 + 开放权重 +激进的低价。对订阅市场的影响是间接但深远的——聚合型套餐（OpenCode Go、火山方舟）能以极低的单位成本把它打包进来，Flash 档的高频次正是这种红利的直接体现。',
        '需要注意的是「空闲 / 高峰」双档计价：空闲价恰为高峰价的一半，把批量任务排到非高峰时段等于直接砍掉一半成本；V4.1-Flash 与 V4-Pro-0813 分属两个档位，把 Flash 当作 Agent 工作流的默认模型、难任务手动升级到 Pro，是当前最省心的用法。',
      ],
    },
  ],
  faqs: [
    { question: 'V4.1-Flash 支持图像理解吗？', answer: '支持。V4.1-Flash 支持图像输入与非思考/思考双模式（默认思考），最大 384K 输出；V4-Pro-0813 不支持图像理解。' },
    { question: '旧的 deepseek-v4-flash 还能调用吗？', answer: '可以。deepseek-v4-flash 与 deepseek-v4-flash-vision-exp 仍可调用，但对应模型已下线，请求由 V4.1-Flash 承接并按 Flash 价格计费。' },
    { question: 'DeepSeek V4 有官方订阅吗？', answer: 'DeepSeek 官方目前以开源模型 + API 为主，无自有 Coding Plan；走 OpenCode Go 或火山方舟套餐是最优路径。' },
    { question: 'Flash 质量够写代码吗？', answer: 'Flash 定位高速档，日常补全与小改动够用；复杂架构任务建议 V4-Pro-0813 或 GLM-5.3。' },
  ],
  related: [
    { kind: '详情', title: 'OpenCode Go 详解', description: 'V4 性价比最高的载体。', href: '/plans/opencode-go' },
    { kind: '模型', title: 'GLM-5.2 评测', description: '质量上限更高的选择。', href: '/models/glm-5.2' },
    { kind: '工具', title: 'OpenCode 工具指南', description: '配 V4 的首选工具。', href: '/agents/opencode' },
  ],
})

export const qwen35Plus = defineContentPage({
  slug: 'qwen3.5-plus',
  accent: 'orange',
  seo: {
    title: 'Qwen3.5-Plus 评测 2026 - 千问世代速查（3.5/3.7/3.8），百炼 Token Plan ¥39 起可用',
    description: '阿里 Qwen3.5-Plus 评测与千问新一代动态：Qwen3.8-Max（0902 快照版本）与 Qwen3.8-Flash 已在百炼，Night Plan 3.8-Max / Flash 限时 4 折（22:00 后开跑）；个人版 ¥39/月起 Credits 制（Lite 11,500/月起），官方称覆盖多模态 18+ 旗舰模型。',
    canonical: 'https://codingplan.org/models/qwen3.5-plus',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 阿里 Qwen3.5-Plus',
    title: 'Qwen3.5-Plus',
    highlight: '千问均衡主力',
    description: 'Qwen3.5 系列的通用旗舰型号，仍是日常主力档；2026 年中以来千问快速迭代：Qwen3.7-Plus（多模态）、Qwen3.8-Max（0902 快照版本）与新增的 Qwen3.8-Flash 均已上线百炼，本页一并速查。',
    stats: [
      { value: '¥39/月', label: 'Token Plan 起用价' },
      { value: '2.4T', label: 'Qwen3.8-Max 参数' },
      { value: '18+', label: '池内旗舰模型' },
    ],
  },
  sections: [
    {
      title: '千问世代速查',
      cards: [
        { icon: '⚖️', title: 'Qwen3.5-Plus', description: '通用均衡主力：能力/成本平衡，日常补全与重构的默认档。' },
        { icon: '🧠', title: 'Qwen3.7-Plus / Max', description: '多模态混合智能体升级（6/2 上线），看懂图片视频并自主迭代；Max 为推理旗舰。' },
        { icon: '🚀', title: 'Qwen3.8-Max（0902 快照）', description: '新一代旗舰，官方现以 0902 快照版本提供；Night Plan 限时 4 折（22:00 后开跑）。' },
        { icon: '💨', title: 'Qwen3.8-Flash（新）', description: '3.8 系高速低成本档，与 3.8-Max 同享 Night Plan 限时 4 折。' },
        { icon: '🧩', title: '多模态 18+ 旗舰', description: '官方称套餐覆盖多模态 18+ 旗舰模型：Qwen3-VL-Plus、Kimi-K3、Deepseek-v4-pro、GLM-5.2、Qwen-Image-3.0-Pro、Qwen3-TTS-Flash、Cosyvoice-V3-Flash、Fun-ASR 等。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '说明'],
        featuredColumn: 1,
        rows: [
          ['阿里云百炼 Token Plan', '¥39/月', 'Qwen3.8-Max 0902 快照 + 3.8-Flash/3.7/3.5 全系与第三方模型，Credits 按月计量'],
          ['Qwen 国际版', '¥139/月（Standard）', '国际版同源 Token Plan，多模态共享额度'],
        ],
        rowLinks: ['/plans/aliyun', '/en/plans/qwen'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '阿里生态（Qoder/Qwen Code CLI）用户首选百炼 Token Plan，¥39/月起',
        '尝鲜新旗舰：Qwen3.8-Max 现为 0902 快照版本；Night Plan 22:00 后 3.8-Max / 3.8-Flash 限时 4 折',
        'Credits 按月计量：Lite ¥39/11,500、Standard ¥139/45,000、Pro ¥499/180,000（每月），价格未变',
        '新增 12 项 Harness 权益（模型 + Agent 能力一次配齐），超额调用 88 折',
        '团队版降价：标准版 ¥150/月起（25,000 月 Credits）、高级版 ¥550/月起（100,000 月 Credits）、尊享版 ¥1398（250,000 月 Credits）',
        '补充通道：加油包（自研 MCP 抵扣包 ¥10、知识库 RAG ¥20、AutoModel ¥20、个人版用量包 ¥100、团队版 ¥5000）与 Token Plan × Qoder CN 组合购（¥98 / ¥308）',
        '专属 API Key 格式 sk-sp-xxxxx + 专属 Base URL；通用百炼 API Key 不抵扣套餐额度',
      ],
    },
    {
      title: '背景：从 Coding Plan 到 Token Plan',
      paragraphs: [
        'Qwen（通义千问）是国内最完整的开源模型家族之一，从 0.5B 到旗舰全尺寸开放权重。2026 年千问以「天」为单位快速迭代：Qwen3.5（2 月上新）→ Qwen3.7-Plus 多模态（6/2）→ Qwen3.8-Max（现以 0902 快照版本提供），能力对标国际第一梯队。',
        '承载方式也变了：原按次数计费的 Coding Plan（Pro ¥200 每日限量补货）已于 7 月全面升级为 Credits 计量的 Token Plan——不再需要每天 9:30 抢购，起售价 ¥39/月，Credits 改为按月发放（Lite 11,500 / Standard 45,000 / Pro 180,000），模型池扩展到 Qwen3.8-Max（0902 快照）+ Qwen3.8-Flash + Qwen3-VL-Plus + Kimi-K3 + Deepseek-v4-pro + GLM-5.2 与图像/音频多模态，官方称覆盖 18+ 旗舰模型。原来「抢到才用」的供货焦虑基本消除。',
      ],
    },
  ],
  faqs: [
    { question: 'Qwen3.5-Plus 还值得用吗？', answer: '值得。3.5-Plus 仍是均衡主力档，Credits 消耗低于 3.7/3.8 旗舰；日常补全用 3.5-Plus 或 3.8-Flash、难任务升级 3.8-Max（Night Plan 限时 4 折）是当前最省的组合。' },
    { question: 'Qwen3.8-Max 现在是什么版本？', answer: '官方现以 0902 快照版本提供，参数 2.4T、1M 上下文，官方称可自主编程十数天交付完整项目；同池还有 Qwen3.8-Flash、Qwen3-VL-Plus、Kimi-K3、Deepseek-v4-pro、GLM-5.2 等。' },
    { question: '原来的每日 9:30 补货还有吗？', answer: '没有了。Coding Plan 已升级为 Token Plan，可直接订阅，Lite ¥39 / Standard ¥139 / Pro ¥499 三档，Credits 按月发放（11,500 / 45,000 / 180,000）。' },
    { question: '国际版和百炼内容一样吗？', answer: '同源 Token Plan（个人版三档 + 团队席位），国际版按对应币种计价；模型主线一致，均含 Qwen3.8-Max（0902 快照）。' },
    { question: '额度不够用怎么办？', answer: '官方新增加油包可叠加：自研 MCP 抵扣包 ¥10、百炼知识库（RAG）标准版 ¥20、AutoModel 抵扣包 ¥20、个人版用量包 ¥100、团队版用量包 ¥5000；超额调用按 88 折计费。' },
  ],
  related: [
    { kind: '详情', title: '阿里云百炼 Token Plan 详解', description: '千问主场套餐。', href: '/plans/aliyun' },
    { kind: '工具', title: 'Cursor 配置指南', description: '百炼官方支持 Cursor。', href: '/agents/cursor' },
    { kind: '榜单', title: '性价比排行榜', description: '百炼所处价位段。', href: '/leaderboard' },
  ],
})

export const kimiK27 = defineContentPage({
  slug: 'kimi-k2.7',
  accent: 'purple',
  seo: {
    title: 'Kimi K2.7 评测 2026 - 上代旗舰仍是性价比主力，高速版需 Pro 及以上',
    description: 'Kimi K2.7 评测：Moonshot 上代旗舰编程模型（含 K2.7 Code 与高速版）；新会员体系下 Kimi Code 需 Plus（¥99/月）及以上、高速版需 Pro（¥199/月）及以上，其位置由新增的 K2.8 Preview（kimi-for-coding）接续，OpenCode Go 5h 约 1,350 次请求。',
    canonical: 'https://codingplan.org/models/kimi-k2.7',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · Moonshot Kimi K2.7',
    title: 'Kimi K2.7',
    highlight: '性价比主力',
    description: 'K3 之前的上一代旗舰：K2.7 标准版、K2.7 Code（代码优化）与高速版（kimi-for-coding-highspeed）三个形态；新会员体系下 Kimi Code 需 Plus（¥99/月）及以上，高速版需 Pro 及以上，其位置已由新增的 K2.8 Preview 接续。',
    stats: [
      { value: 'Pro+', label: '高速版门槛' },
      { value: '3 形态', label: '标准/Code/高速' },
      { value: '1,350', label: '次/5h（Go）' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '📦', title: '标准版', description: '通用旗舰底座，K3 发布后成为均衡档。' },
        { icon: '⌨️', title: 'K2.7 Code', description: '代码场景优化版，补全/重构效率更高。' },
        { icon: '⚡', title: '高速版', description: '低延迟形态（模型 ID kimi-for-coding-highspeed），高频交互场景适用；新会员体系下需 Pro 及以上档位。' },
        { icon: '🆕', title: '被 K2.8 Preview 接续', description: 'Kimi 新增的 kimi-for-coding（K2.8 Preview，最高 1M 上下文）接续了这条线的位置，与 K3、k3-256k 同池可选。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '可用性'],
        featuredColumn: 1,
        rows: [
          ['Kimi Code Plan', '¥99/月（Plus）', 'K2.7 可用 · 免费档与 Go 档无 coding 额度'],
          ['Kimi Code Plan Pro', '¥199/月（年付 ¥159）', 'K2.7 Code 高速版需 Pro 及以上'],
          ['OpenCode Go', '$10/月', 'K2.7 Code · 5h 约 1,350 次'],
          ['火山引擎方舟', '¥9.9/月起', 'Kimi 侧主推 K3 与 K2.8-Preview · 与豆包/GLM 同池'],
        ],
        rowLinks: ['/plans/kimi', '/plans/kimi', '/plans/opencode-go', '/plans/volcengine'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '新会员体系：Kimi Code 需 Plus（¥99/月）及以上，Go 档（¥49/月）无 coding 额度',
        '日常出码主力：K2.7 Code 优于标准版，无需为轻任务升 K3',
        '与 K3 共享额度：新会员取消每周额度限制，仅保留每 5 小时滚动频率窗口',
        '跨平台比价：OpenCode Go 内 K2.7 Code 频次（1,350 次/5h）远高于 K3（约 110）',
        '高速版需 Pro 及以上；若不升档，可用接续上来的 K2.8 Preview（kimi-for-coding，最高 1M 上下文）',
      ],
    },
    {
      title: '背景与迭代脉络',
      paragraphs: [
        'K2.5 → K2.6 → K2.7 的迭代节奏体现了 Moonshot 的策略：在 K3 大版本攻关期间，持续小幅升级上代架构保持可用性。K2.7 的代码形态（K2.7 Code）在补全与重构效率上做了专项优化，这也让多模型套餐有了「便宜好用」的均衡档；Kimi 新会员体系上线后，这条线的位置由 K2.8 Preview（kimi-for-coding）接续。',
        '对消费者而言，K2.7 的存在让「升级 K3」变成按需决策而非被迫：轻中度任务留在 K2.7，省下的额度留给真正需要 1M 上下文或重度推理的场景。如果你的月度消耗从没触顶过，就没有必要为 K3 付费升档。',
      ],
    },
  ],
  faqs: [
    { question: 'K2.7 还值得用吗？', answer: '值得。K3 面向 1M 上下文与重度推理，K2.7 在日常出码上性价比更高；两者同为 Plus 档（¥99/月）即可调用，只有 K2.7 Code 高速版需要 Pro 及以上。' },
    { question: 'K2.7 和 K2.6 什么关系？', answer: 'K2.7 是 K2.6 的迭代（含 Code 与高速形态）；新会员体系下 Kimi Code 需 Plus（¥99/月）及以上，Go 档无编程额度。' },
    { question: '高速版要什么档位？', answer: 'K2.7 Code 高速版（kimi-for-coding-highspeed）需 Pro（¥199/月，年付 ¥159/月）及以上；K3 的 1M 上下文同样从 Pro 档起，两者门槛一致。' },
    { question: '火山方舟里还能用到 Kimi 系列吗？', answer: '可以。方舟侧现主推 Kimi-K3 与 Kimi-K2.8-Preview（后者 9/17-9/30 限时抵扣系数 6 折），由方舟侧部署与计量；额度走方舟套餐池（与豆包/GLM 等共享），价格口径与 Kimi 官方不同。' },
  ],
  related: [
    { kind: '模型', title: 'Kimi K3 评测', description: '升级档旗舰对比。', href: '/models/kimi-k3' },
    { kind: '详情', title: 'Kimi Code Plan 详解', description: '新会员体系与档位规则。', href: '/plans/kimi' },
    { kind: '优惠', title: '邀请码与优惠汇总', description: 'Kimi 年付折扣入口。', href: '/deals' },
  ],
})

export const glm5Turbo = defineContentPage({
  slug: 'glm-5-turbo',
  accent: 'green',
  seo: {
    title: 'GLM-5-Turbo 评测 2026 - 高速推理档，智谱全档与 Go $10/月可用',
    description: '智谱 GLM-5-Turbo 评测：GLM 系高速推理版本。8/26 起智谱套餐内调用 GLM-5-Turbo 已自动切换至新上线的 GLM-5.3-Flash（原生多模态、编码近 Opus 4.8），OpenCode Go $10/月仍可直接调用。',
    canonical: 'https://codingplan.org/models/glm-5-turbo',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 智谱 GLM-5-Turbo',
    title: 'GLM-5-Turbo',
    highlight: '高速省额档',
    description: 'GLM 系列的高速推理版本。8/26 智谱上线 GLM-5.3-Flash 后，套餐内调用 GLM-5-Turbo 会自动切换至 5.3-Flash——原生多模态、编码能力接近 Claude Opus 4.8，且用量仅为 GLM-5.3 的 3 倍口径（积分系数更低），高速省额的定位由新模型直接继承。',
    stats: [
      { value: '全档', label: '智谱套餐可用' },
      { value: '低消耗', label: 'Credits 计费' },
      { value: '$10/月', label: 'Go 内同享' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '⚡', title: '高频补全', description: '低延迟形态，代码补全与快速问答的主力。' },
        { icon: '💰', title: '省 Credits', description: '继任者 GLM-5.3-Flash 积分系数显著低于旗舰，让 5h/每周双窗口积分更耐用。' },
        { icon: '🌐', title: '全平台覆盖', description: '智谱套餐全档可用；Z.ai 国际版与 OpenCode Go 同样在列。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '可用性'],
        featuredColumn: 1,
        rows: [
          ['OpenCode Go', '$10/月', '可用 · 与 GLM-5.3/5.2 同池'],
          ['智谱 GLM Coding Plan', '¥118/月（年付 ¥94.4）', '调用自动切换至 GLM-5.3-Flash'],
          ['Z.ai 国际版', '$18/月（年付 $12.6）', 'Lite 起可用'],
        ],
        rowLinks: ['/plans/opencode-go', '/plans/zhipu', '/en/plans/glm'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '组合策略（智谱侧）：日常补全交给自动路由后的 GLM-5.3-Flash，复杂改动切 GLM-5.3，非高峰时段再省一半积分',
        'Claude Code 内 /model 预设默认 5-Turbo，重任务手动升级即可',
        '对延迟敏感的交互式重构优先 Turbo',
        'Go 订阅内 GLM-5.3-Flash（5h 约 6,320 次）与 GLM-5.3 形成快慢双档',
      ],
    },
    {
      title: '背景与档位逻辑',
      paragraphs: [
        '智谱是国产厂商中较早把「多档位模型 + 差异化计量」做清晰的：套餐在位模型已收敛为旗舰（GLM-5.3）与多模态均衡档（GLM-5.3-Flash）两款，历史模型（5.2/5.1/5-Turbo/4.7）作为自动路由入口保留。这套设计在切换到每周 Credits 制后更有价值——用户可以自主在质量与用量之间做预算分配。',
        '实操上建议把 GLM-5.3-Flash 设为默认：日常补全、问答、小型改动对模型上限不敏感，其更低的积分系数能让 Lite 档的积分支撑完整周度节奏；真正需要 GLM-5.3 的架构级改动再手动切换，积分花在刀刃上。',
      ],
    },
  ],
  faqs: [
    { question: 'GLM-5-Turbo 现在还能调用吗？', answer: '可以，但智谱套餐内的调用会自动切换至 GLM-5.3-Flash（8/26 上线）：原生多模态、DeepSWE v1.1 63.4 超越 GLM-5.2、编码能力接近 Claude Opus 4.8，定位就是新一代「高速省额档」。OpenCode Go 内仍可直接调用 GLM 系列各版本。' },
    { question: 'GLM-5.3-Flash 消耗多少积分？', answer: '官方抵扣系数：GLM-5.3-Flash 为 2.3 / 0.56 / 8，GLM-5.3 为 6.9 / 1.7 / 24（同档显著更低，用量为 GLM-5.3 的 3 倍口径）；4 类 MCP 每次 1.2 积分。非高峰时段（周一至五 14:00-18:00 以外）再按 50% 抵扣，9/3-10/7 夜间 ZCode / AutoClaw 端调用 GLM-5.3-Flash 还不限量。' },
    { question: '免费能用到 Turbo 吗？', answer: '智谱无免费档；最便宜路径是 OpenCode Go $10/月（池内含 Turbo 系）或等待智谱限售活动。' },
  ],
  related: [
    { kind: '模型', title: 'GLM-5.2 评测', description: '同系旗舰对比。', href: '/models/glm-5.2' },
    { kind: '教程', title: 'Claude Code 配置 GLM', description: '模型切换实操。', href: '/blogs/claude-code-with-glm' },
    { kind: '详情', title: '智谱 GLM 详解', description: 'Credits 制度说明。', href: '/plans/zhipu' },
  ],
})
