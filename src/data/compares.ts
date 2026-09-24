/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器与 plans/plans-en 的口径参照
 * [OUTPUT]: 对外提供 /blogs/glm-vs-kimi 与 /en/blogs/claude-vs-glm 双语对比文章数据
 * [POS]: data 的商业调研意图承接页，承接「A vs B / A 和 B 哪个好」类查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const glmVsKimi = defineContentPage({
  slug: 'glm-vs-kimi',
  accent: 'blue',
  seo: {
    title: 'GLM vs Kimi Coding Plan 对比 2026 - 智谱 ¥118 起 vs Kimi ¥99 起，怎么选？',
    description: '智谱 GLM Coding Plan 与 Kimi Code Plan 逐项对比：入门价（¥118/¥94.4 年付 vs ¥99/¥79 年付）、模型（GLM-5.3/5.2 vs K3/K2.8 Preview）、额度口径（每周 Credits vs 5 小时滚动窗口）、MCP 工具与年付折扣，附按人群的选购结论。',
    canonical: 'https://codingplan.org/blogs/glm-vs-kimi',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '对比 · GLM vs Kimi',
    title: '智谱 GLM vs Kimi',
    highlight: 'Coding Plan 怎么选',
    description: '两家 2026 年都完成了旗舰更新与价格重排：GLM-5.3（8/14 发布）接棒 5.2 登顶 Terminal-Bench 开源榜，K3 以 2.8T 参数 + 1M 上下文正式上线；Kimi 同期上线新会员体系，档位更名为 Free / Go / Plus / Pro / Max。',
    stats: [
      { value: '¥94.4 vs ¥79', label: '年付入门月价' },
      { value: 'GLM-5.3 vs K3', label: '旗舰模型' },
      { value: '周 Credits vs 5h 滚动', label: '额度口径' },
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
          ['入门月费', '¥118（年付 ¥94.4）', '¥99（年付 ¥79），Free / Go ¥49 档不含编程额度'],
          ['旗舰模型', 'GLM-5.3（8/14 发布，Terminal-Bench 3.0 开源第一）', 'Kimi K3（2.8T 参数，1M 上下文，Plus 起可用）'],
          ['模型数量', '5 款（GLM-5.3/5.2/5.1/5-Turbo/4.7）', 'K3 / K3-256K / K2.8 Preview / K2.7 Code 高速版'],
          ['额度口径', '每周 Credits（10K/60K/140K），按周刷新', '5 小时滚动频率窗口（已取消每周额度限制）'],
          ['年付折扣', '连续包年 7 折（最高 ¥862.4/月 Max）', '年付最高省 ¥1,680（Max ¥559/月）'],
          ['MCP 工具', '全档内置 4 类（视觉/搜索/网页/仓库）', 'Plus 起含集群/多 Agent 并行等 Agent 能力'],
          ['工具支持', 'ZCode、Claude Code、Cursor 等 20+', 'Kimi CLI、VS Code 插件、Claude Code、Roo Code'],
          ['附加权益', 'MCP 工具集', 'AI 建站 / 文档 / PPT 会员权益'],
        ],
        rowLinks: ['/plans/zhipu', '/plans/kimi'],
      },
    },
    {
      title: '选 GLM 的理由',
      cards: [
        { icon: '🏆', title: '开源第一的 GLM 旗舰', description: 'GLM-5.3（8/14 上线全量用户）Terminal-Bench 3.0 开源第一，前代 5.2 曾登顶 LMArena 代码榜；1M 上下文全量开放。' },
        { icon: '🧰', title: '内置 MCP 工具链', description: '视觉理解、联网搜索、网页读取、开源仓库 4 类 MCP 全档内置，Agent 任务少写胶水代码。' },
        { icon: '📅', title: '每周 Credits 透明', description: '10K/60K/140K Credits 按周刷新，口径清晰，跨工具共享，重度周可预测消耗。' },
      ],
    },
    {
      title: '选 Kimi 的理由',
      cards: [
        { icon: '💸', title: '更低的入门价', description: '含 Kimi Code 的入门档为 Plus，年付折合 ¥79/月，低于 GLM Lite 的 ¥118/月；另有不含编程额度的 Free / Go ¥49 档可先体验通用能力。' },
        { icon: '🌟', title: 'K3 1M 超长上下文', description: '2.8T 参数旗舰，Pro 档解锁 1M token 长对话，大型代码库分析场景独有优势。' },
        { icon: '🤖', title: 'Agent 集群与会员权益', description: 'Plus 起支持 Agent 集群与多 Agent 并行，附 AI 建站、文档、PPT 权益。' },
      ],
    },
    {
      title: '按人群的结论',
      highlights: [
        '预算敏感 / 先试水：Kimi Free 免费档零成本体验通用能力，编程上手用 Plus 年付 ¥79/月，成本最低',
        '要最强开源模型 + MCP：GLM Pro（年付 ¥430.4/月），GLM-5.3/5.2 + 精选 MCP 工具集',
        '前端 / UI 还原场景：Kimi K3 视觉能力突出，Plus ¥99/月起',
        '大型仓库 1M 上下文分析：Kimi Pro（¥199/月）或 GLM Max（年付 ¥862.4/月）二选一',
        '高频稳定出码：GLM 每周 Credits 口径更可预测，适合按周排期的工程节奏',
      ],
    },
    {
      title: '额度口径的差异要特别注意',
      warning: 'GLM 按「每周 Credits」计，Kimi 按「5 小时滚动窗口」计（新会员已取消每周额度限制），两者数值不能直接换算，跨平台对比时请以各官网口径为准。',
      paragraphs: [
        'GLM 的 Credits 是平台内部积分：不同模型每次调用消耗的 Credits 不同，旗舰模型消耗更高，优点是单周总量明确。',
        'Kimi 新会员的 5 小时滚动窗口用于控制瞬时高频，每周额度限制已取消、月度总量仍有上限；额度口径与 GLM 的 Credits 不同，不能直接换算。',
      ],
    },
  ],
  faqs: [
    { question: 'GLM Coding Plan 和 Kimi Code Plan 哪个便宜？', answer: '能用 Kimi Code 的入门价 Kimi 更低：Plus 月付 ¥99、年付 ¥79/月（更低的 Free / Go ¥49 档不含编程额度）；GLM Lite 月付 ¥118、年付 ¥94.4/月。重度档位两者接近（GLM Max 年付 ¥862.4/月 vs Kimi Max 年付 ¥559/月）。' },
    { question: 'GLM-5.3 和 Kimi K3 哪个写代码更强？', answer: 'GLM-5.3（8/14 发布）Terminal-Bench 3.0 开源第一（28.3）、DeepSWE v1.1 达 66.9，前代 5.2 曾在 LMArena 代码榜开源第一；K3 参数量 2.8T、支持 1M 上下文，在 SWE-Bench 等评测中接近 Anthropic 前沿水平。综合工程能力 GLM 略占优，超长上下文场景 K3 独有 1M 优势。' },
    { question: '两家可以同时订阅吗？', answer: '可以，且不少开发者这么做：Kimi 低档位承担轻量与长上下文任务，GLM Pro 档承担主力工程出码。两家都支持 Claude Code 接入，切换成本低。' },
    { question: '额度口径哪个更划算？', answer: '取决于使用节奏。每周固定强度开发选 GLM（周 Credits 明确）；突发型高峰使用选 Kimi（5 小时滚动窗口限瞬时、月度总量设上限，跨工具共享）。无法直接换算，建议各试一个月再定。' },
  ],
  related: [
    { kind: '详情', title: '智谱 GLM Coding Plan 详解', description: '三档价格、每周 Credits 与 MCP 工具全解。', href: '/plans/zhipu' },
    { kind: '详情', title: 'Kimi Code Plan 详解', description: 'Kimi Code 三档套餐、K3 使用规则与会员权益。', href: '/plans/kimi' },
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '环境变量与端点配置指南。', href: '/blogs/claude-code-with-glm' },
    { kind: '优惠', title: '邀请码与优惠汇总', description: '智谱包年 7 折、Kimi 年付入口。', href: '/deals' },
  ],
})

export const claudeVsGlm = defineContentPage({
  slug: 'claude-vs-glm',
  accent: 'red',
  seo: {
    title: 'Claude Code vs GLM Coding Plan 2026 - $20 vs $18: Which to Choose?',
    description: 'Claude Code (Anthropic) vs GLM Coding Plan (Z.ai) compared: Pro $20 vs Lite $18, Opus 5.5 vs GLM-5.3, usage multipliers vs dual-window Credits, MCP support and annual discounts — with clear recommendations per use case.',
    canonical: 'https://codingplan.org/en/blogs/claude-vs-glm',
    locale: 'en',
    ogType: 'article',
  },
  hero: {
    badge: 'Comparison · Claude Code vs GLM',
    title: 'Claude Code vs GLM',
    highlight: 'Coding Plan Compared',
    description: 'Claude Code is the gold standard for AI coding; GLM undercuts it by 10% at entry level with GLM-5.3 (new flagship since Aug 14, #1 open-source on Terminal-Bench 3.0) and GLM-5.2 (#1 on LMArena Code). Here is how they stack up in 2026.',
    stats: [
      { value: '$20 vs $18', label: 'Entry price / month' },
      { value: 'Opus 5.5 vs GLM-5.3', label: 'Flagship models' },
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
          ['Flagship model', 'Claude Opus 5.5 (Fable 5.1 above it)', 'GLM-5.3 (Terminal-Bench 3.0 #1 open-source) + 5.3-Flash'],
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
        { icon: '🏆', title: 'Frontier quality', description: 'Opus 5.5 (with Fable 5.1 above it) remains the strongest coding lineup overall, with extended thinking and top agentic benchmarks. Note Fable 5.1 needs usage credits on Pro and is capped at 50% of weekly limits on Max.' },
        { icon: '🔁', title: 'Mature ecosystem', description: 'First-party terminal, IDE extensions, Cowork web app and cross-conversation memory.' },
        { icon: '⚡', title: 'Peak-hour priority', description: 'Max tiers include priority access and early feature previews.' },
      ],
    },
    {
      title: 'Why pick GLM',
      cards: [
        { icon: '💸', title: 'Better price-performance', description: 'Same $18 entry with yearly -30%; Pro at $56/mo annual undercuts Max 5x by nearly half.' },
        { icon: '🧩', title: 'MCP tools included', description: 'Visual understanding, web search, web reading and repo access built into every tier at no extra cost.' },
        { icon: '📏', title: '1M context', description: 'GLM-5.2/5.3 offer up to 1M-token context — beyond Claude standard limits.' },
      ],
    },
    {
      title: 'Recommendations',
      highlights: [
        'Best possible model quality, cost no object: Claude Max 5x/20x',
        'Best value for daily coding: GLM Pro (annual $56/mo) — near-frontier quality at half the price',
        'Agentic workflows with tools/data: Claude Code MCP ecosystem is more mature',
        'Very large codebases: GLM 1M context',
        'Try both cheaply: Claude Pro $17/mo annual vs GLM Lite $12.6/mo annual',
      ],
    },
  ],
  faqs: [
    { question: 'Is GLM Coding Plan cheaper than Claude Code?', answer: 'At every tier, yes: Lite $18 vs Pro $20, Max $168 vs Max 20x $200, and GLM yearly discounts reach 30% versus roughly 15% on Claude Pro.' },
    { question: 'Is GLM-5.3 as good as Claude Opus 5.5 for coding?', answer: 'GLM-5.3 (released Aug 14) tops Terminal-Bench 3.0 among open models, and Zhipu says its coding feel approaches Claude Fable 5; the new GLM-5.3-Flash (Aug 26) approaches Opus 4.8. Claude Opus 5.5 and Fable 5.1 still lead on complex agentic tasks, but the gap has narrowed considerably for everyday coding.' },
    { question: 'Can I use GLM Coding Plan inside Claude Code?', answer: 'Yes — GLM exposes Anthropic-compatible endpoints, so Claude Code and other major tools can connect to a GLM subscription.' },
    { question: 'Which has better usage limits?', answer: 'Claude uses multipliers of the Pro baseline (5x/20x on Max); GLM uses explicit weekly Credits (10K/60K/140K). GLM Credits are easier to budget; Claude multipliers adapt to model mix.' },
  ],
  related: [
    { kind: 'Plan', title: 'Claude Code Plan Guide', description: 'Pro and Max tiers, models and multipliers.', href: '/en/plans/claude' },
    { kind: 'Plan', title: 'GLM Coding Plan Guide', description: 'Lite/Pro/Max pricing and weekly Credits.', href: '/en/plans/glm' },
    { kind: 'Hub', title: 'All AI Coding Plans Compared', description: 'Every platform in one table.', href: '/en#platforms' },
  ],
})
