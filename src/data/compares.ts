/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器与 plans/plans-en 的口径参照
 * [OUTPUT]: 对外提供 /articles/glm-vs-kimi 与 /en/articles/claude-vs-glm 双语对比文章数据
 * [POS]: data 的商业调研意图承接页，承接「A vs B / A 和 B 哪个好」类查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const glmVsKimi = defineContentPage({
  slug: 'glm-vs-kimi',
  accent: 'blue',
  seo: {
    title: 'GLM vs Kimi Coding Plan 对比 2026 - 智谱 ¥118 起 vs Kimi ¥49 起，怎么选？',
    description: '智谱 GLM Coding Plan 与 Kimi Code Plan 逐项对比：入门价（¥118/¥94.4 年付 vs ¥49/¥39 年付）、模型（GLM-5.2 vs K3/K2.6）、额度口径（每周 Credits vs 5h+7 天）、MCP 工具与年付折扣，附按人群的选购结论。',
    canonical: 'https://codingplan.org/articles/glm-vs-kimi',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '对比 · GLM vs Kimi',
    title: '智谱 GLM vs Kimi',
    highlight: 'Coding Plan 怎么选',
    description: '两家 2026 年都完成了旗舰更新与价格重排：GLM-5.2 登顶开源代码榜，K3 以 2.8T 参数 + 1M 上下文正式上线。核心差异在额度口径与档位设计。',
    stats: [
      { value: '¥94.4 vs ¥39', label: '年付入门月价' },
      { value: 'GLM-5.2 vs K3', label: '旗舰模型' },
      { value: '周 Credits vs 5h+7天', label: '额度口径' },
    ],
  },
  sections: [
    {
      title: '核心指标对比',
      description: '价格为 2026 年 8 月核实口径，点击平台名查看完整套餐。',
      table: {
        columns: ['指标', '智谱 GLM Coding Plan', 'Kimi Code Plan'],
        featuredColumn: 1,
        rows: [
          ['入门月费', '¥118（年付 ¥94.4）', '¥49（年付 ¥39），另有免费档 Adagio'],
          ['旗舰模型', 'GLM-5.2（LMArena 代码榜开源第一）', 'Kimi K3（2.8T 参数，1M 上下文，Moderato 起可用）'],
          ['模型数量', '5 款（GLM-5.2/5.1/5-Turbo/5/4.7）', 'K3 + K2.6 双档（免费档 K2/K2.6）'],
          ['额度口径', '每周 Credits（10K/60K/140K），按周刷新', '5 小时 token 配额 + 7 天刷新，不累积'],
          ['年付折扣', '连续包年 7 折（最高 ¥862.4/月 Max）', '年付最高省 ¥1,680（Allegro ¥559/月）'],
          ['MCP 工具', '全档内置 4 类（视觉/搜索/网页/仓库）', 'Moderato 起含集群/梦境记忆等 Agent 能力'],
          ['工具支持', 'ZCode、Claude Code、Cursor 等 20+', 'Kimi CLI、VS Code 插件、Claude Code、Roo Code'],
          ['附加权益', 'MCP 工具集', 'AI 建站 / 文档 / PPT 会员权益'],
        ],
        rowLinks: ['/plans/zhipu', '/plans/kimi'],
      },
    },
    {
      title: '选 GLM 的理由',
      cards: [
        { icon: '🏆', title: '开源第一的 GLM-5.2', description: 'LMArena 代码榜开源第一、全球第二，1M 上下文全量开放，Pro 优先体验、Max 首发接入。' },
        { icon: '🧰', title: '内置 MCP 工具链', description: '视觉理解、联网搜索、网页读取、开源仓库 4 类 MCP 全档内置，Agent 任务少写胶水代码。' },
        { icon: '📅', title: '每周 Credits 透明', description: '10K/60K/140K Credits 按周刷新，口径清晰，跨工具共享，重度周可预测消耗。' },
      ],
    },
    {
      title: '选 Kimi 的理由',
      cards: [
        { icon: '💸', title: '更低的入门价', description: '免费档 Adagio 可用 K2.6，Andante 年付 ¥39/月即入门，试错成本远低于 GLM Lite。' },
        { icon: '🌟', title: 'K3 1M 超长上下文', description: '2.8T 参数旗舰，Allegro 档解锁 1M token 长对话，大型代码库分析场景独有优势。' },
        { icon: '🤖', title: 'Agent 集群与会员权益', description: 'Moderato 起支持 Agent 集群/梦境记忆/自进化技能，附 AI 建站、文档、PPT 权益。' },
      ],
    },
    {
      title: '按人群的结论',
      highlights: [
        '预算敏感 / 先试水：Kimi 免费档 + Andante 年付 ¥39/月，成本最低',
        '要最强开源模型 + MCP：GLM Pro（年付 ¥430.4/月），GLM-5.2 + 精选 MCP 工具集',
        '前端 / UI 还原场景：Kimi K3 视觉能力突出，Moderato ¥99/月起',
        '大型仓库 1M 上下文分析：Kimi Allegro（¥699/月）或 GLM Max（年付 ¥862.4/月）二选一',
        '高频稳定出码：GLM 每周 Credits 口径更可预测，适合按周排期的工程节奏',
      ],
    },
    {
      title: '额度口径的差异要特别注意',
      warning: 'GLM 按「每周 Credits」计，Kimi 按「5 小时 + 7 天」双窗口计，两者数值不能直接换算，跨平台对比时请以各官网口径为准。',
      paragraphs: [
        'GLM 的 Credits 是平台内部积分：不同模型每次调用消耗的 Credits 不同，旗舰模型消耗更高，优点是单周总量明确。',
        'Kimi 的 5 小时窗口适合控制瞬时高频，7 天刷新适合控制周度总量；未用完的额度不累积，Andante 档参考约 300-1,200 次调用/5h。',
      ],
    },
  ],
  faqs: [
    { question: 'GLM Coding Plan 和 Kimi Code Plan 哪个便宜？', answer: '入门价 Kimi 更低：Andante 月付 ¥49、年付 ¥39/月，且免费档 Adagio 可零成本试用；GLM Lite 月付 ¥118、年付 ¥94.4/月。重度档位两者接近（GLM Max 年付 ¥862.4/月 vs Kimi Allegro 年付 ¥559/月）。' },
    { question: 'GLM-5.2 和 Kimi K3 哪个写代码更强？', answer: 'GLM-5.2 在 LMArena 代码榜开源第一、全球第二（仅次于 Claude）；K3 参数量 2.8T、支持 1M 上下文，在 SWE-Bench 等评测中接近 Anthropic 前沿水平。综合工程能力 GLM-5.2 略占优，超长上下文场景 K3 独有 1M 优势。' },
    { question: '两家可以同时订阅吗？', answer: '可以，且不少开发者这么做：Kimi 低档位承担轻量与长上下文任务，GLM Pro 档承担主力工程出码。两家都支持 Claude Code 接入，切换成本低。' },
    { question: '额度口径哪个更划算？', answer: '取决于使用节奏。每周固定强度开发选 GLM（周 Credits 明确）；突发型高峰使用选 Kimi（5h 窗口限瞬时、7 天限总量，跨工具共享）。无法直接换算，建议各试一个月再定。' },
  ],
  related: [
    { kind: '详情', title: '智谱 GLM Coding Plan 详解', description: '三档价格、每周 Credits 与 MCP 工具全解。', href: '/plans/zhipu' },
    { kind: '详情', title: 'Kimi Code Plan 详解', description: '五档套餐、K3 使用规则与会员权益。', href: '/plans/kimi' },
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '环境变量与端点配置指南。', href: '/articles/claude-code-with-glm' },
    { kind: '优惠', title: '邀请码与优惠汇总', description: '智谱包年 7 折、Kimi 年付入口。', href: '/deals' },
  ],
})

export const claudeVsGlm = defineContentPage({
  slug: 'claude-vs-glm',
  accent: 'red',
  seo: {
    title: 'Claude Code vs GLM Coding Plan 2026 - $20 vs $18: Which to Choose?',
    description: 'Claude Code (Anthropic) vs GLM Coding Plan (Z.ai) compared: Pro $20 vs Lite $18, Opus 4.7 vs GLM-5.2, usage multipliers vs weekly Credits, MCP support and annual discounts — with clear recommendations per use case.',
    canonical: 'https://codingplan.org/en/articles/claude-vs-glm',
    locale: 'en',
    ogType: 'article',
  },
  hero: {
    badge: 'Comparison · Claude Code vs GLM',
    title: 'Claude Code vs GLM',
    highlight: 'Coding Plan Compared',
    description: 'Claude Code is the gold standard for AI coding; GLM undercuts it by 10% at entry level with GLM-5.2 — the #1 open-source model on LMArena Code. Here is how they stack up in 2026.',
    stats: [
      { value: '$20 vs $18', label: 'Entry price / month' },
      { value: 'Opus 4.7 vs GLM-5.2', label: 'Flagship models' },
      { value: 'Multipliers vs Credits', label: 'Usage model' },
    ],
  },
  sections: [
    {
      title: 'Head-to-head',
      description: 'Prices verified August 2026. Click a provider name for the full plan breakdown.',
      table: {
        columns: ['Metric', 'Claude Code', 'GLM Coding Plan'],
        featuredColumn: 1,
        rows: [
          ['Entry price', 'Pro $20/mo ($17 annual)', 'Lite $18/mo ($12.6 annual, -30%)'],
          ['Flagship model', 'Claude Opus 4.7', 'GLM-5.2 (#1 open-source on LMArena Code)'],
          ['Top tier', 'Max 20x $200/mo', 'Max $168/mo ($117.6 annual)'],
          ['Usage model', 'Multipliers of Pro baseline (5x / 20x)', 'Weekly Credits (10K / 60K / 140K)'],
          ['Annual discount', '~15% on Pro', '30% (quarterly 20%)'],
          ['Context', '100K standard', 'Up to 1M tokens'],
          ['MCP support', 'Yes (Model Context Protocol)', 'Yes, 4 MCP tools built into every tier'],
          ['Where it runs', 'Terminal, VS Code, JetBrains, Web', 'ZCode, Claude Code, Cursor, 20+ tools'],
        ],
        rowLinks: ['/en/plans/claude', '/en/plans/glm'],
      },
    },
    {
      title: 'Why pick Claude Code',
      cards: [
        { icon: '🏆', title: 'Frontier quality', description: 'Opus 4.7 remains the strongest coding model overall, with extended thinking and top agentic benchmarks.' },
        { icon: '🔁', title: 'Mature ecosystem', description: 'First-party terminal, IDE extensions, Cowork web app and cross-conversation memory.' },
        { icon: '⚡', title: 'Peak-hour priority', description: 'Max tiers include priority access and early feature previews.' },
      ],
    },
    {
      title: 'Why pick GLM',
      cards: [
        { icon: '💸', title: 'Better price-performance', description: 'Same $18 entry with yearly -30%; Pro at $56/mo annual undercuts Max 5x by nearly half.' },
        { icon: '🧩', title: 'MCP tools included', description: 'Visual understanding, web search, web reading and repo access built into every tier at no extra cost.' },
        { icon: '📏', title: '1M context', description: 'GLM-5.2 offers up to 1M-token context — beyond Claude standard limits.' },
      ],
    },
    {
      title: 'Recommendations',
      highlights: [
        'Best possible model quality, cost no object: Claude Max 5x/20x',
        'Best value for daily coding: GLM Pro (annual $56/mo) — near-frontier quality at half the price',
        'Agentic workflows with tools/data: Claude Code MCP ecosystem is more mature',
        'Very large codebases: GLM-5.2 1M context',
        'Try both cheaply: Claude Pro $17/mo annual vs GLM Lite $12.6/mo annual',
      ],
    },
  ],
  faqs: [
    { question: 'Is GLM Coding Plan cheaper than Claude Code?', answer: 'At every tier, yes: Lite $18 vs Pro $20, Max $168 vs Max 20x $200, and GLM yearly discounts reach 30% versus roughly 15% on Claude Pro.' },
    { question: 'Is GLM-5.2 as good as Claude Opus 4.7 for coding?', answer: 'GLM-5.2 ranks #1 among open-source models and #2 globally on LMArena Code, just behind Claude. Opus 4.7 still leads on complex agentic tasks, but the gap has narrowed considerably for everyday coding.' },
    { question: 'Can I use GLM Coding Plan inside Claude Code?', answer: 'Yes — GLM exposes Anthropic-compatible endpoints, so Claude Code and other major tools can connect to a GLM subscription.' },
    { question: 'Which has better usage limits?', answer: 'Claude uses multipliers of the Pro baseline (5x/20x on Max); GLM uses explicit weekly Credits (10K/60K/140K). GLM Credits are easier to budget; Claude multipliers adapt to model mix.' },
  ],
  related: [
    { kind: 'Plan', title: 'Claude Code Plan Guide', description: 'Pro and Max tiers, models and multipliers.', href: '/en/plans/claude' },
    { kind: 'Plan', title: 'GLM Coding Plan Guide', description: 'Lite/Pro/Max pricing and weekly Credits.', href: '/en/plans/glm' },
    { kind: 'Hub', title: 'All AI Coding Plans Compared', description: 'Every platform in one table.', href: '/en#platforms' },
  ],
})
