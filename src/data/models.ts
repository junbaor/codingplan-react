/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器与 plans/plans-en 的模型口径
 * [OUTPUT]: 对外提供 8 个旗舰模型评测页数据（GLM-5.2/K3/M3/Doubao/DeepSeek-V4/Qwen3.5/K2.7/GLM-5-Turbo）
 * [POS]: data 的模型长尾承接层，承接「模型名 + 怎么样/价格/coding plan」查询并导向可用套餐
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const modelSlugs = ['glm-5.2', 'kimi-k3', 'minimax-m3', 'doubao-seed-2.1-turbo', 'deepseek-v4', 'qwen3.5-plus', 'kimi-k2.7', 'glm-5-turbo'] as const

export const glm52 = defineContentPage({
  slug: 'glm-5.2',
  accent: 'blue',
  seo: {
    title: 'GLM-5.2 模型评测 2026 - LMArena 代码榜开源第一，哪些套餐能用、多少钱',
    description: '智谱 GLM-5.2 评测：LMArena 代码榜开源第一、全球第二（仅次于 Claude），1M 上下文全量开放；智谱 Coding Plan 年付 ¥94.4/月可用，火山方舟（¥9.9 起）限时加量 4 倍，OpenCode Go $10/月同享。',
    canonical: 'https://codingplan.org/models/glm-5.2',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 智谱 GLM-5.2',
    title: 'GLM-5.2',
    highlight: '开源代码之王',
    description: '2026 年 6 月 13 日全量开放的智谱旗舰：发布即登顶 LMArena 代码榜开源第一、全球第二，1M 上下文，面向代码生成、理解与重构的完整工程任务。',
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
      description: '按入门价排序，点击平台名查看套餐详情。',
      table: {
        columns: ['平台', '入门价', 'GLM-5.2 可用性'],
        featuredColumn: 1,
        rows: [
          ['火山引擎方舟', '¥9.9/月起', '可用 · 限时加量 4 倍'],
          ['OpenCode Go', '$10/月', '可用 · 5h 约 880 次请求'],
          ['智谱 GLM Coding Plan', '¥118/月（年付 ¥94.4）', '可用 · Pro 优先 / Max 首发，逐步向全档开放'],
          ['Z.ai 国际版', '$18/月（年付 $12.6）', '可用 · Lite 起全部档位'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/opencode-go', '/plans/zhipu', '/en/plans/glm'],
      },
    },
    {
      title: '怎么选套餐',
      highlights: [
        '最便宜体验：火山方舟首购 ¥9.9，还附带 8+ 款模型轮换与 Auto 调度',
        '重度主力使用：智谱 Pro 年付 ¥430.4/月（60K Credits/周），MCP 工具全配套',
        '混合国际模型：OpenCode Go $10/月，GLM-5.2 与 Grok 4.5/K3/DeepSeek V4 同池',
        '国际付款场景：Z.ai 国际版年付 $12.6/月',
      ],
    },
    {
      title: '与其他旗舰对比',
      paragraphs: [
        '对 Kimi K3：GLM-5.2 在 LMArena 代码榜名次更高（开源第一 vs 接近 Anthropic 前沿），K3 胜在 2.8T 参数规模与 Allegro 档的 1M 长对话独占；两者上下文同规格。',
        '对 MiniMax M3：M3 主打开源多模态（图像/视频输入）与 100+ TPS 高速；纯代码工程 GLM-5.2 更强，多模态场景 M3 互补。',
        '对 Claude Opus 4.7：全球榜上 GLM-5.2 位列第二仅次于 Claude，差距在复杂 Agent 长链路任务，日常出码已可互换。',
      ],
    },
  ],
  faqs: [
    { question: 'GLM-5.2 是开源模型吗？', answer: '是开源开放模型，也是当前 LMArena 代码榜排名最高的开源模型；智谱套餐与多家聚合平台（火山、OpenCode Go）均可调用。' },
    { question: 'GLM-5.2 和 GLM-5.1 差多少？', answer: 'GLM-5.2 是新一代旗舰（1M 上下文、榜单第一），GLM-5.1 定位均衡档；智谱套餐内两者均可选，重活交给 5.2、日常用 5.1 省 Credits。' },
    { question: '火山方舟的「限时加量 4 倍」是什么？', answer: '活动期间 GLM-5.2 在方舟套餐内的等效额度提升 4 倍且不加价，活动结束后恢复；关注官方公告时间窗。' },
    { question: '用 GLM-5.2 每月大概花多少？', answer: '走套餐最低约 ¥94.4/月（智谱年付 Lite 或火山首购）；按量 API 另行计费。重度 Agent 使用建议 Pro 档起步。' },
  ],
  related: [
    { kind: '详情', title: '智谱 GLM Coding Plan', description: 'GLM-5.2 的主场套餐。', href: '/plans/zhipu' },
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '用 GLM-5.2 跑 Claude Code。', href: '/blogs/claude-code-with-glm' },
    { kind: '模型', title: 'Kimi K3 评测', description: '另一个 1M 上下文旗舰。', href: '/models/kimi-k3' },
  ],
})

export const kimiK3 = defineContentPage({
  slug: 'kimi-k3',
  accent: 'purple',
  seo: {
    title: 'Kimi K3 模型评测 2026 - 2.8T 参数 1M 上下文，Moderato ¥99/月起可用',
    description: 'Moonshot Kimi K3 评测：2026/7/17 正式上线，2.8 万亿参数、100 万 token 上下文、原生视觉；Kimi Code Plan Moderato（¥99/月）起可用，Allegro（¥699/月）解锁 1M 长对话，OpenCode Go $10/月同享。',
    canonical: 'https://codingplan.org/models/kimi-k3',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · Moonshot Kimi K3',
    title: 'Kimi K3',
    highlight: '2.8T 参数旗舰',
    description: '2026 年 7 月 17 日正式上线的 Moonshot 旗舰：2.8 万亿参数、100 万 token 上下文、原生视觉能力，SWE-Bench 等编程评测接近 Anthropic 前沿水平。',
    stats: [
      { value: '2.8T', label: '参数规模' },
      { value: '1M', label: '上下文（Allegro）' },
      { value: '¥99/月', label: '起用档位' },
    ],
  },
  sections: [
    {
      title: '能力速览',
      cards: [
        { icon: '🧠', title: '2.8 万亿参数', description: '国产已上线模型中最大参数规模之一，复杂推理与长链路任务的基础。' },
        { icon: '📏', title: '1M 超长上下文', description: 'Allegro 档（¥699/月）独家解锁百万 token 长对话，大型代码库整体分析。' },
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
          ['Kimi Code Plan', '¥99/月（Moderato）', '可用 · 免费档/Andante 不可用'],
          ['Kimi Code Plan Allegro', '¥699/月（年付 ¥559）', '1M 上下文解锁 + 4 Agent 并行'],
        ],
        rowLinks: ['/plans/opencode-go', '/plans/kimi', '/plans/kimi'],
      },
    },
    {
      title: '使用规则要点',
      warning: 'K3 仅 Moderato（¥99/月）及以上可用；免费档 Adagio 与 Andante 只能访问 K2.6/K2。1M 长对话为 Allegro 独占。',
      highlights: [
        'K3 与 K2.6 共享 5h 配额与 7 天刷新周期',
        'Moderato 起支持 Agent 集群（2 子任务）、梦境记忆与自进化技能',
        'Allegretto 增加 Agent 集群 40 次/月与目标模式',
        '前端/UI 还原场景优先选 K3，配合 Claude Code 或 Roo Code',
      ],
    },
    {
      title: '与 GLM-5.2 怎么选',
      paragraphs: [
        '两者都是 1M 上下文旗舰：GLM-5.2 榜单名次更高（开源第一）、起步更便宜（¥94.4 年付可用）；K3 参数更大、视觉与前端正向能力突出、且有 Allegro 的 1M 独占档。',
        '预算有限二选一：通用工程选 GLM-5.2，前端/多模态选 K3。两者也可通过 OpenCode Go 一份 $10 订阅同池使用（K3 约 110 次/5h，GLM-5.2 约 880 次/5h）。',
      ],
    },
  ],
  faqs: [
    { question: 'K3 免费能用吗？', answer: '不能。K3 需 Moderato（¥99/月）及以上；免费档 Adagio 可用 K2.6 验证工作流后再升级。' },
    { question: 'K3 和 K2.6 差距大吗？', answer: 'K3 在参数规模（2.8T）、视觉能力与长上下文上限全面超越 K2.6；日常轻任务 K2.6 依然够用，且与 K3 共享额度。' },
    { question: '1M 上下文怎么才能用到？', answer: '需要 Allegro 档（¥699/月，年付 ¥559/月），该档还含 4 Agent 并行与集群 8 子任务。' },
    { question: 'OpenCode Go 里 K3 好用吗？', answer: '可用但单价较高（5h 约 110 次），适合把 K3 当「专家」按需调用，日常任务交给池内更便宜的 DeepSeek/MiMo。' },
  ],
  related: [
    { kind: '详情', title: 'Kimi Code Plan 详解', description: '五档套餐与 K3 规则。', href: '/plans/kimi' },
    { kind: '模型', title: 'GLM-5.2 评测', description: '正面对比的另一个旗舰。', href: '/models/glm-5.2' },
    { kind: '教程', title: 'Claude Code 配置 Kimi', description: '用 K3 跑 Claude Code。', href: '/blogs/claude-code-with-kimi' },
  ],
})

export const minimaxM3 = defineContentPage({
  slug: 'minimax-m3',
  accent: 'orange',
  seo: {
    title: 'MiniMax M3 模型评测 2026 - 原生多模态 1M 上下文，Plus ¥49/月起可用',
    description: 'MiniMax M3 评测：2026/5/31 发布的旗舰模型，原生图像/视频输入、1M 上下文；MiniMax Token Plan Plus ¥49/月起可用，OpenCode Go $10/月同享，M2.7-highspeed 达 100+ TPS。',
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
        { icon: '🔗', title: '共享配额', description: '与 M2.7/H3/Speech/Music 全系共享月度 token，一个套餐全模态。' },
        { icon: '⚡', title: '高速搭档', description: 'M2.7-highspeed 约 100+ TPS，追求响应速度时与 M3 搭配使用。' },
      ],
    },
    {
      title: '哪些套餐能用 M3',
      table: {
        columns: ['平台', '入门价', 'M3 可用性'],
        featuredColumn: 1,
        rows: [
          ['MiniMax Token Plan', '¥49/月（Plus）', '可用 · 6 亿+ token/月共享'],
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
        '纯文本出码 GLM-5.2/K3 榜单更强，M3 胜在全模态一池共享',
        '对速度敏感：M2.7-highspeed 100+ TPS（Max HS 档）',
        'Plus ¥49/月含 6 亿+ token，是全模态最便宜的入口',
      ],
    },
    {
      title: '背景与发布节奏',
      paragraphs: [
        'MiniMax 的订阅体系在 2026 年经历了一次重要转向：3 月把 Coding Plan 升级为 Token Plan，成为全球首个支持全模态模型的订阅计划；5 月 31 日 M3 旗舰上线，原生多模态输入与 1M 上下文同场发布。老用户的档位与权益在转向中完整保留，这也是 MiniMax 口碑较好的一个原因。',
        '在模型矩阵上，M3 之外还有 M2.7（标准/高速）、H3（推理与 Agent 编排）、M2.5/Speech 2.8/Music 3.0（图像/语音/音乐），全部共享月度 token 池——一个套餐覆盖从写码到生成宣传视频的完整链路，这在国产平台中独一份。',
      ],
    },
  ],
  faqs: [
    { question: 'M3 和 M2.7 怎么选？', answer: 'M3 是旗舰（多模态、1M 上下文），M2.7 是均衡主力且分标准/高速版；两者共享月度配额，按任务切换不额外付费。' },
    { question: 'M3 视频生成包含在套餐里吗？', answer: '视频生成是独立权益：Max 档 3 条/日、Ultra 5 条/日、Plus 不含；M3 的视频能力指「视频输入理解」。' },
    { question: 'M3 写代码比 GLM-5.2 强吗？', answer: '纯代码工程 GLM-5.2 榜单更强；M3 的优势是多模态输入与全模态共享额度。混合场景两者互补。' },
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
    description: '字节跳动 Doubao-Seed-2.1-turbo 评测：火山方舟 Coding Plan 新接入的高速代码模型，与 GLM-5.2/Kimi-K2.7/MiniMax-M3/Deepseek-V4 同池，Lite ¥9.9 首购起可用，适合高频补全与快速迭代。',
    canonical: 'https://codingplan.org/models/doubao-seed-2.1-turbo',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 字节 Doubao-Seed-2.1-turbo',
    title: 'Doubao-Seed-2.1-turbo',
    highlight: '高速代码模型',
    description: '字节跳动最新高速代码模型，火山方舟 Coding Plan 新接入。主打低延迟高频场景：代码补全、快速问答、批量小改动。',
    stats: [
      { value: '新接入', label: '方舟 Coding Plan' },
      { value: '¥9.9', label: '首购起价' },
      { value: 'Turbo', label: '低延迟定位' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '⚡', title: '高速推理', description: 'Turbo 后缀主打低延迟，适合高频补全与快速迭代，与旗舰模型形成快慢搭配。' },
        { icon: '🔄', title: '同池切换', description: '与 GLM-5.2 / Kimi-K2.7 / MiniMax-M3 / Deepseek-V4 共享方舟套餐额度。' },
        { icon: '🤖', title: 'Auto 模式搭档', description: '方舟 Auto 调度会把轻任务路由给高速档模型，省下旗舰额度。' },
      ],
    },
    {
      title: '哪里能用',
      table: {
        columns: ['平台', '入门价', '说明'],
        featuredColumn: 1,
        rows: [
          ['火山引擎方舟', '¥9.9/月起（首购两月）', '唯一官方渠道 · Lite/Pro 均可用'],
        ],
        rowLinks: ['/plans/volcengine'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '日常补全/小改动交给 turbo，复杂架构改动切 GLM-5.2 或 Kimi-K2.7',
        '配合 Auto 模式全自动分层，无需手动选模型',
        '方舟 Lite 与 Pro 区别只在用量倍数（Pro 为 5 倍），模型阵容一致',
        '首购 ¥9.9 两个月窗口适合完整评估 turbo 的速度收益',
      ],
    },
    {
      title: '背景与命名解读',
      paragraphs: [
        'Doubao-Seed 是字节跳动豆包大模型家族的「种子」系列，命名里的 Seed 指代从预训练到对齐的完整自研链路。2.1-turbo 是 2.0-Code 之后的迭代：参数规模未大幅变化，重点在推理延迟与高频场景的吞吐优化，这也是方舟把它作为 Coding Plan 主力型号之一的原因。',
        '在方舟的模型矩阵里，turbo 扮演「快档」：Auto 模式将简单任务路由过来，把 GLM-5.2、Kimi-K2.7 等旗舰额度留给难任务。如果你的日常请求以补全、小范围改动、批量机械修改为主，turbo 的实际体感会明显快于旗舰模型。',
      ],
    },
  ],
  faqs: [
    { question: 'Doubao-Seed-2.1-turbo 和 2.0-Code 什么区别？', answer: '2.1-turbo 是新一代高速版本，延迟更低；2.0-Code 是上一代代码专用模型，方舟内仍可用。' },
    { question: '只有火山方舟能用吗？', answer: 'Doubao 系列模型目前仅通过火山方舟 Coding Plan / API 提供，其他平台暂未接入。' },
    { question: '写大型项目合适吗？', answer: 'turbo 定位高速档，复杂工程建议同池切换 GLM-5.2 / Kimi-K2.7 / Deepseek-V4，把 turbo 留给高频轻任务。' },
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
    title: 'DeepSeek V4 评测 2026 - Pro/Flash 双档，OpenCode Go 5h 3 万+ 次请求',
    description: 'DeepSeek V4 系列评测：V4 Pro 旗舰与 V4 Flash 超高性价比（OpenCode Go 5h 约 31,650 次请求、限时 2 倍额度），火山方舟新接入，0 天数据保留，适合作为 Agent 任务的高频底座模型。',
    canonical: 'https://codingplan.org/models/deepseek-v4',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · DeepSeek V4 系列',
    title: 'DeepSeek V4',
    highlight: '性价比之王',
    description: 'DeepSeek 最新开源旗舰系列：V4 Pro 面向复杂工程，V4 Flash 主打超低单价——在 OpenCode Go 内 5 小时可跑约 31,650 次请求，是全池最高频次。',
    stats: [
      { value: '31,650', label: 'Flash 次/5h（Go）' },
      { value: '2x', label: 'Flash 限时额度' },
      { value: '0 天', label: '数据保留' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '🚀', title: 'V4 Pro', description: '旗舰档，复杂推理与大型重构，OpenCode Go 内 5h 约 3,450 次请求。' },
        { icon: '💨', title: 'V4 Flash', description: '超低单价高速档，限时 2 倍额度（5h 约 63,300 次上限口径），批量任务底座。' },
        { icon: '🔒', title: '零数据保留', description: '零数据保留协议按月续期，隐私敏感场景友好。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '可用性'],
        featuredColumn: 1,
        rows: [
          ['OpenCode Go', '$10/月', 'V4 Pro/Flash 均含 · Flash 性价比最高'],
          ['火山引擎方舟', '¥9.9/月起', 'V4 系列新接入'],
        ],
        rowLinks: ['/plans/opencode-go', '/plans/volcengine'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '高频 Agent 任务（批量重构/自动化）首选 Flash，单位成本全池最低',
        '复杂单次任务用 V4 Pro 或切 GLM-5.2',
        'OpenCode Go 月度 $60 额度下 Flash 月上限约 15.8 万次请求',
        '隐私敏感代码优先 DeepSeek（0 天保留）+ OpenCode Go（不用于训练）',
      ],
    },
    {
      title: '背景与开源影响',
      paragraphs: [
        'DeepSeek 的 V3/R1 系列曾在 2025 年以极低训练成本和开源权重震动行业，V4 系列延续同一路线：旗舰能力 + 开放权重 +激进的低价。对订阅市场的影响是间接但深远的——聚合型套餐（OpenCode Go、火山方舟）能以极低的单位成本把它打包进来，Flash 档的高频次正是这种红利的直接体现。',
        '需要注意的是「限时 2 倍额度」属于活动口径，Flash 的常态额度约为活动期一半；即便如此，它的单位成本仍是全池最低档之一，把 V4 Flash 当作 Agent 工作流的默认模型、难任务手动升级，是被社区广泛验证的省钱打法。',
      ],
    },
  ],
  faqs: [
    { question: 'V4 Flash 的 2 倍额度到什么时候？', answer: '限时活动，官方按月续期口径公示；以 OpenCode Go 控制台与官方公告为准，本站监测到变化会同步更新。' },
    { question: 'DeepSeek V4 有官方订阅吗？', answer: 'DeepSeek 官方目前以开源模型 + API 为主，无自有 Coding Plan；走 OpenCode Go 或火山方舟套餐是最优路径。' },
    { question: 'Flash 质量够写代码吗？', answer: 'Flash 定位高速档，日常补全与小改动够用；复杂架构任务建议 V4 Pro 或 GLM-5.2。' },
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
    title: 'Qwen3.5-Plus 评测 2026 - 阿里千问新系列，百炼 ¥200/月与国际版 $10 起',
    description: '阿里 Qwen3.5-Plus 评测：千问 Qwen3.5 系列通用旗舰，阿里云百炼 Coding Plan（Pro ¥200/月限量补货）与国际版 Qwen Coding Plan（$10/月起）可用，支持 Qwen3.5/Qwen3-Max/Coder 全系与第三方模型。',
    canonical: 'https://codingplan.org/models/qwen3.5-plus',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 阿里 Qwen3.5-Plus',
    title: 'Qwen3.5-Plus',
    highlight: '千问通用旗舰',
    description: 'Qwen3.5 系列的通用旗舰型号：平衡能力与成本，搭配 Qwen3-Max（复杂任务）与 Coder 系列（软件工程），构成百炼 Coding Plan 的模型主轴。',
    stats: [
      { value: '¥200/月', label: '百炼 Pro 起用' },
      { value: '$10/月', label: '国际版起用' },
      { value: '11+', label: '支持工具数' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '⚖️', title: '通用均衡', description: 'Qwen3.5-Plus 定位日常主力，能力/成本均衡。' },
        { icon: '🧠', title: 'Qwen3-Max', description: '系列内复杂推理档，难任务升级选择。' },
        { icon: '⌨️', title: 'Coder-Next/Plus', description: '软件工程专用型号，补全与重构优化。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '说明'],
        featuredColumn: 1,
        rows: [
          ['阿里云百炼', '¥200/月（Pro）', 'Qwen3.5 全系 + 第三方模型 · 每日限量补货'],
          ['Qwen 国际版', '$10/月', '国际版 Coding Plan · Qwen3.5-Plus 起'],
        ],
        rowLinks: ['/plans/aliyun', '/en/plans/qwen'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '阿里生态（通义系工具/Qwen Code CLI）用户首选百炼',
        '百炼 Pro 三重额度（6,000 次/5h）适合全天候重度，但每日 9:30 限量补货要抢',
        '国际用户走 Qwen 国际版 $10/月起，含第三方模型混搭',
        'Lite 已停售，新购只有 Pro 档',
      ],
    },
    {
      title: '背景与供货现状',
      paragraphs: [
        'Qwen（通义千问）是国内最完整的开源模型家族之一，从 0.5B 到旗舰全尺寸开放权重，Qwen3.5 是 2026 年的最新一代。百炼 Coding Plan 的卖点是「自家旗舰 + 第三方模型」混池：GLM、Kimi、MiniMax 都在可选列表里，一个套餐拿到多家模型。',
        '供货是当前最大变量：算力紧张导致 Lite 停售、Pro 每日 9:30 限量补货且很快售罄，仅主账号可用。如果你不执着于阿里生态，火山方舟提供类似的多模型混池且 ¥9.9 起购；把百炼当作「抢到才用」的高配选项更合理。',
      ],
    },
  ],
  faqs: [
    { question: '百炼 Pro 为什么总买不到？', answer: 'Pro 每日 9:30 限量补货且通常很快售罄；仅主账号可用、不支持 RAM 用户。可关注补货时间或先看其他平台。' },
    { question: 'Qwen3.5 和 Qwen3 差别大吗？', answer: 'Qwen3.5 是新一代系列（含 qwen3.5-plus 与 qwen3-coder-next 等），整体能力与工具适配更新；qwen3-max/qwen3-coder-plus 仍在列可选。' },
    { question: '国际版和百炼内容一样吗？', answer: '模型主线一致（Qwen3.5 系列），但国际版另含第三方模型组合且按美元计价（$10/月起）；百炼为人民币 ¥200/月单 Pro 档。' },
  ],
  related: [
    { kind: '详情', title: '阿里云百炼详解', description: 'Qwen3.5 主场套餐。', href: '/plans/aliyun' },
    { kind: '工具', title: 'Cursor 配置指南', description: '百炼官方支持 Cursor。', href: '/agents/cursor' },
    { kind: '榜单', title: '性价比排行榜', description: '百炼所处价位段。', href: '/leaderboard' },
  ],
})

export const kimiK27 = defineContentPage({
  slug: 'kimi-k2.7',
  accent: 'purple',
  seo: {
    title: 'Kimi K2.7 评测 2026 - 上代旗舰仍是性价比主力，K2.7 Code 与高速版全解',
    description: 'Kimi K2.7 评测：Moonshot 上代旗舰编程模型（含 K2.7 Code 与高速版），Kimi 免费档/Andante 即可用，火山方舟新接入，OpenCode Go 5h 约 1,150-1,350 次请求，仍是日常出码的性价比主力。',
    canonical: 'https://codingplan.org/models/kimi-k2.7',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · Moonshot Kimi K2.7',
    title: 'Kimi K2.7',
    highlight: '性价比主力',
    description: 'K3 之前的上一代旗舰：K2.7 标准版、K2.7 Code（代码优化）与高速版三个形态，免费档即可使用，是入门 Kimi 生态的零成本起点。',
    stats: [
      { value: '¥0', label: '免费档可用' },
      { value: '3 形态', label: '标准/Code/高速' },
      { value: '1,150+', label: '次/5h（Go）' },
    ],
  },
  sections: [
    {
      title: '能力与定位',
      cards: [
        { icon: '📦', title: '标准版', description: '通用旗舰底座，K3 发布后成为均衡档。' },
        { icon: '⌨️', title: 'K2.7 Code', description: '代码场景优化版，补全/重构效率更高。' },
        { icon: '⚡', title: '高速版', description: '低延迟形态，高频交互场景适用。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '可用性'],
        featuredColumn: 1,
        rows: [
          ['Kimi Code Plan', '¥0（Adagio 免费档）', 'K2.6/K2 可用 · Andante 起体验完整'],
          ['OpenCode Go', '$10/月', 'K2.7/K2.6 · 5h 约 1,150-1,350 次'],
          ['火山引擎方舟', '¥9.9/月起', 'K2.7 新接入 · 与豆包/GLM 同池'],
        ],
        rowLinks: ['/plans/kimi', '/plans/opencode-go', '/plans/volcengine'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '零成本验证：Kimi 免费档先用 K2.6 跑通工作流',
        '日常出码主力：K2.7 Code 优于标准版，无需为轻任务升 K3',
        '与 K3 共享额度：升级 Moderato 后两者按任务混用',
        '跨平台比价：OpenCode Go 内 K2.7 频次（1,150+/5h）远高于 K3（约 110）',
      ],
    },
    {
      title: '背景与迭代脉络',
      paragraphs: [
        'K2.5 → K2.6 → K2.7 的迭代节奏体现了 Moonshot 的策略：在 K3 大版本攻关期间，持续小幅升级上代架构保持可用性。K2.7 的代码形态（K2.7 Code）在补全与重构效率上做了专项优化，这也是方舟把它作为新接入型号的原因——多模型套餐需要这种「便宜好用」的均衡档。',
        '对消费者而言，K2.7 的存在让「升级 K3」变成按需决策而非被迫：轻中度任务留在 K2.7，省下的额度留给真正需要 1M 上下文或重度推理的场景。如果你的月度消耗从没触顶过，就没有必要为 K3 付费升档。',
      ],
    },
  ],
  faqs: [
    { question: 'K2.7 还值得用吗？', answer: '值得。K3 面向重度与 1M 场景，K2.7 在日常出码上性价比更高，且免费档/低档位即可使用。' },
    { question: 'K2.7 和 K2.6 什么关系？', answer: 'K2.7 是 K2.6 的迭代（含 Code 与高速形态）；Kimi 免费档当前访问 K2.6/K2 系，Andante 起用完整 K2.7 能力。' },
    { question: '火山方舟里的 K2.7 和 Kimi 官方的一样吗？', answer: '同一基础模型，由方舟侧部署与计量；额度走方舟套餐池（与豆包/GLM 等共享），价格口径与 Kimi 官方不同。' },
  ],
  related: [
    { kind: '模型', title: 'Kimi K3 评测', description: '升级档旗舰对比。', href: '/models/kimi-k3' },
    { kind: '详情', title: 'Kimi Code Plan 详解', description: '免费档与档位规则。', href: '/plans/kimi' },
    { kind: '优惠', title: '邀请码与优惠汇总', description: 'Kimi 年付折扣入口。', href: '/deals' },
  ],
})

export const glm5Turbo = defineContentPage({
  slug: 'glm-5-turbo',
  accent: 'green',
  seo: {
    title: 'GLM-5-Turbo 评测 2026 - 高速推理档，智谱全档与 Go $10/月可用',
    description: '智谱 GLM-5-Turbo 评测：GLM 系高速推理版本，适合高频代码补全与快速问答，智谱 Coding Plan 全档位可用（Credits 消耗低于旗舰），OpenCode Go $10/月同享，省额度策略的首选。',
    canonical: 'https://codingplan.org/models/glm-5-turbo',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '模型 · 智谱 GLM-5-Turbo',
    title: 'GLM-5-Turbo',
    highlight: '高速省额档',
    description: 'GLM 系列的高速推理版本：响应快、Credits 消耗低于旗舰，是智谱套餐内「把旗舰留给难任务」策略的搭档模型。',
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
        { icon: '💰', title: '省 Credits', description: '单次调用消耗低于 GLM-5.2/5.1，让每周 Credits 更耐用。' },
        { icon: '🌐', title: '全平台覆盖', description: '智谱套餐全档可用；Z.ai 国际版与 OpenCode Go 同样在列。' },
      ],
    },
    {
      title: '哪些套餐能用',
      table: {
        columns: ['平台', '入门价', '可用性'],
        featuredColumn: 1,
        rows: [
          ['OpenCode Go', '$10/月', '可用 · 与 GLM-5.2 同池'],
          ['智谱 GLM Coding Plan', '¥118/月（年付 ¥94.4）', '全档可用 · 无档位限制'],
          ['Z.ai 国际版', '$18/月（年付 $12.6）', 'Lite 起可用'],
        ],
        rowLinks: ['/plans/opencode-go', '/plans/zhipu', '/en/plans/glm'],
      },
    },
    {
      title: '使用建议',
      highlights: [
        '组合策略：日常补全用 5-Turbo，复杂改动切 GLM-5.2，每周 Credits 消耗可降一半以上',
        'Claude Code 内 /model 预设默认 5-Turbo，重任务手动升级即可',
        '对延迟敏感的交互式重构优先 Turbo',
        'Go 订阅内 GLM-5.2（880 次/5h）与 Turbo 形成快慢双档',
      ],
    },
    {
      title: '背景与档位逻辑',
      paragraphs: [
        '智谱是国产厂商中较早把「多档位模型 + 差异化计量」做清晰的：同一套餐内旗舰（5.2/5.1）、均衡（5-Turbo）、稳定（4.7）并存，Credits 消耗随档位递减。这套设计在切换到每周 Credits 制后更有价值——用户可以自主在质量与用量之间做预算分配。',
        '实操上建议把 5-Turbo 设为默认：Claude Code / Cursor 的日常补全、问答、小型改动对模型上限不敏感，Turbo 的低消耗能让 10K Credits（Lite 档）支撑完整的周度节奏；真正需要 5.2 的架构级改动再手动切换，Credits 花在刀刃上。',
      ],
    },
  ],
  faqs: [
    { question: 'GLM-5-Turbo 和 GLM-5.2 差多少？', answer: '5.2 是旗舰（1M 上下文、榜单第一），5-Turbo 是高速均衡档；日常补全差距小，复杂工程 5.2 明显更强。' },
    { question: 'Turbo 消耗多少 Credits？', answer: '低于旗舰档位；智谱按调用与模型档计 Credits，官方未公布逐模型系数，可在控制台观察实际扣减。' },
    { question: '免费能用到 Turbo 吗？', answer: '智谱无免费档；最便宜路径是 OpenCode Go $10/月（池内含 Turbo 系）或等待智谱限售活动。' },
  ],
  related: [
    { kind: '模型', title: 'GLM-5.2 评测', description: '同系旗舰对比。', href: '/models/glm-5.2' },
    { kind: '教程', title: 'Claude Code 配置 GLM', description: '模型切换实操。', href: '/blogs/claude-code-with-glm' },
    { kind: '详情', title: '智谱 GLM 详解', description: 'Credits 制度说明。', href: '/plans/zhipu' },
  ],
})
