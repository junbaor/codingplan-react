/**
 * [INPUT]: 依赖 types 的详情页领域类型、seo 的结构化数据构造函数与 plan-alternates 的 en 侧 hreflang 映射
 * [OUTPUT]: 对外提供英文站六个平台（Claude/GLM/MiniMax/Kimi/Qwen/OpenCode Go）的详情页数据
 * [POS]: data 的英文详情页唯一数据源，与中文 plans 通过相同 PlanPage 模板渲染
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { PlanPageData, SeoData } from '../types'
import { enPlanAlternates } from './plan-alternates'
import { buildPlanJsonLd } from './seo'

type PlanInput = Omit<PlanPageData, 'seo'> & { seo: Omit<SeoData, 'jsonLd'> }

function definePlan(input: PlanInput): PlanPageData {
  const plan = { ...input, seo: { ...input.seo, alternates: input.seo.alternates ?? enPlanAlternates(input.slug), jsonLd: [] } } as PlanPageData
  plan.seo.jsonLd = buildPlanJsonLd(plan)
  return plan
}

const commonTools = ['Claude Code', 'Cursor', 'Cline', 'Roo Code', 'Kilo Code', 'OpenCode']

const claude = definePlan({
  slug: 'claude', accent: 'red', availability: 'active',
  seo: { title: 'Claude Code Plan Guide 2026 - Pro $20, Max 5x $100, Max 20x $200', description: 'Anthropic Claude Code pricing guide: Pro $20/mo, Max 5x $100/mo, Max 20x $200/mo. Claude Opus 4.7 / Sonnet 4.6 / Sonnet 4.5 / Haiku 4.5 models, usage multipliers, extended thinking and MCP support compared side by side.', canonical: 'https://codingplan.org/en/plans/claude', locale: 'en', ogType: 'article' },
  hero: { badge: 'Anthropic · Claude Code', title: 'Claude Code', highlight: 'Plan Guide', description: 'The gold standard for AI coding. Pro at $20/mo gives you Claude Opus 4.7, Sonnet 4.6 and extended thinking in the terminal, IDE and web. Max tiers multiply usage 5x-20x with priority access.', stats: [{ value: '$20', label: 'Pro / month' }, { value: '4', label: 'Models' }, { value: '20x', label: 'Max multiplier' }, { value: '100K', label: 'Context' }] },
  modelsTitle: 'Models', modelsDescription: 'All Claude models are available on Pro and Max plans, with usage limits scaling per tier.',
  models: [
    { icon: '🧠', name: 'Claude Opus 4.7', description: 'Anthropic\u2019s frontier model. State-of-the-art coding, agentic tool use and long-horizon tasks. The strongest model for complex software engineering.', badge: 'Flagship' },
    { icon: '⚡', name: 'Claude Sonnet 4.6', description: 'Balanced speed and capability. Recommended for daily coding workloads with high responsiveness.', badge: 'Balanced' },
    { icon: '🚀', name: 'Claude Sonnet 4.5', description: 'Previous generation workhorse, still excellent for most programming tasks.' },
    { icon: '🌱', name: 'Claude Haiku 4.5', description: 'Fastest and cheapest tier, ideal for quick iterations and code completion.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Pro for individuals, Max for heavy usage with multipliers and priority access. Annual billing saves ~15%.', purchaseUrl: 'https://claude.com/pricing',
  plans: [
    { name: 'Pro', price: '$20', unit: '/mo', discount: '$17/mo billed annually (-15%)', features: ['Claude Code & Cowork', 'All models: Opus 4.7 / Sonnet 4.6 / Sonnet 4.5 / Haiku 4.5', 'Unlimited projects', 'Cross-conversation memory', 'Extended thinking & MCP support'], audience: 'Individual developers who want the best model quality for daily coding' },
    { name: 'Max 5x', badge: 'Popular', price: '$100', unit: '/mo', discount: '5x Pro usage', features: ['5x Pro usage limits', 'Priority access during peak hours', 'Higher output limits', 'All Pro features'], audience: 'Heavy users who hit Pro limits regularly', featured: true },
    { name: 'Max 20x', badge: 'Top tier', price: '$200', unit: '/mo', discount: '20x Pro usage', features: ['20x Pro usage limits', 'Early access to new features', 'Peak-hour priority', 'Best for teams and power users'], audience: 'Professional teams and extremely heavy usage patterns' },
  ],
  comparison: { title: 'Plan comparison', description: 'Usage is measured relative to Pro baseline limits.', columns: ['Tier', 'Price', 'Usage', 'Peak priority', 'Early features'], featuredColumn: 1, rows: [
    ['Pro', '$20/mo', '1x', 'No', 'No'],
    ['Max 5x', '$100/mo', '5x', 'Yes', 'No'],
    ['Max 20x', '$200/mo', '20x', 'Yes', 'Yes'],
  ] },
  sections: [
    { title: 'Why Claude Code?', cards: [
      { icon: '🏆', title: 'Gold standard quality', description: 'Consistently ranks at the top of coding benchmarks for agentic tasks.' },
      { icon: '🧩', title: 'MCP support', description: 'Model Context Protocol lets you plug in tools, memory and data sources.' },
      { icon: '💭', title: 'Extended thinking', description: 'Opus 4.7 reasons step by step on complex problems before answering.' },
      { icon: '🔁', title: 'Cross-conversation memory', description: 'Remembers preferences and project context across sessions.' },
    ] },
  ],
  tools: ['Terminal', 'VS Code', 'JetBrains', 'Web', 'Cowork'],
  toolsTitle: 'Where to use Claude Code',
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'What is the difference between Pro and Max?', answer: 'Pro ($20/mo) covers individual usage with all models. Max 5x ($100/mo) gives 5x Pro usage with priority access; Max 20x ($200/mo) gives 20x usage and early feature access. Annual billing saves about 15% on Pro.' },
    { question: 'Which models are included?', answer: 'All plans include Claude Opus 4.7, Sonnet 4.6, Sonnet 4.5 and Haiku 4.5. Limits apply per model tier; Opus is the strongest but consumes more of your usage allowance.' },
    { question: 'Does Claude Code work in my editor?', answer: 'Yes. Claude Code runs in the terminal, VS Code, JetBrains IDEs, and as Claude Cowork on the web and desktop.' },
    { question: 'Is there a free tier?', answer: 'Anthropic occasionally offers limited free access to Claude. The Pro plan at $20/mo is the standard entry point for Claude Code.' },
    { question: 'Can I get a refund?', answer: 'Anthropic generally does not refund activated subscriptions. Start with Pro to evaluate before upgrading to Max.' },
  ],
})

const glm = definePlan({
  slug: 'glm', accent: 'blue', availability: 'active',
  seo: { title: 'GLM Coding Plan Guide 2026 - $18/mo from Z.ai, GLM-5.2 Weekly Credits', description: 'Zhipu GLM Coding Plan (Z.ai) pricing: Lite $18/mo, Pro $80/mo, Max $168/mo (yearly -30%). GLM-5.2 with 1M context, weekly Credits (10K/60K/140K), 4 built-in MCP tools. #1 open-source model on LMArena Code.', canonical: 'https://codingplan.org/en/plans/glm', locale: 'en', ogType: 'article' },
  hero: { badge: 'Zhipu AI · Z.ai', title: 'GLM Coding', highlight: 'Plan Guide', description: 'GLM-5.2 is fully available with 1M context and ranks #1 open-source on LMArena Code. Plans use weekly Credits (Lite 10K / Pro 60K / Max 140K) with quarterly 20% and yearly 30% discounts.', stats: [{ value: '$18', label: 'Entry / month' }, { value: '10K-140K', label: 'Weekly Credits' }, { value: '1M', label: 'Context' }, { value: '4', label: 'MCP tools' }] },
  modelsTitle: 'Models', modelsDescription: 'GLM-5.2 leads the open-source coding leaderboard; all tiers gradually unlock the newest flagship.',
  models: [
    { icon: '🚀', name: 'GLM-5.2', description: 'Latest flagship, fully open since June 13. #1 open-source and #2 global on LMArena Code (behind Claude). 1M context, designed for code generation, understanding and refactoring.', badge: 'LMArena #1 open-source' },
    { icon: '🌟', name: 'GLM-5.1', description: 'Balanced capability and speed for medium to heavy programming.' },
    { icon: '⚡', name: 'GLM-5-Turbo', description: 'Fast inference for high-frequency completion and quick Q&A.' },
    { icon: '🧠', name: 'GLM-5', description: 'Flagship model for complex software engineering, gradually opened to Max users first.' },
    { icon: '🔧', name: 'GLM-4.7', description: 'Stable previous generation, good for everyday programming.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Monthly prices with quarterly 20% / yearly 30% off. Weekly Credits refresh every 7 days.', purchaseUrl: 'https://z.ai/subscribe?ic=Q2I4GGSKVU',
  plans: [
    { name: 'Lite', price: '$18', unit: '/mo', discount: 'Yearly $12.6/mo (-30%)', features: ['10,000 weekly Credits', 'Gradual access to latest flagship models', 'ZCode / Claude Code / 20+ coding tools', '4 built-in MCP tools'], audience: 'Individual developers and small repos' },
    { name: 'Pro', badge: 'Best value', price: '$80', unit: '/mo', discount: 'Yearly $56/mo (-30%)', features: ['6x Lite usage (~60,000 Credits/week)', 'Priority access to new flagship models', 'Curated MCP toolset · faster generation'], audience: 'Daily developers working on medium repos', featured: true },
    { name: 'Max', price: '$168', unit: '/mo', discount: 'Yearly $117.6/mo (-30%)', features: ['14x Lite usage (~140,000 Credits/week)', 'First access to latest models', 'Peak-hour priority'], audience: 'Heavy users and teams needing guaranteed capacity' },
  ],
  comparison: { title: 'Tier comparison', columns: ['Feature', 'Lite', 'Pro', 'Max'], featuredColumn: 2, rows: [
    ['Monthly price', '$18', '$80', '$168'],
    ['Yearly (7折)', '$12.6/mo', '$56/mo', '$117.6/mo'],
    ['Weekly Credits', '10,000', '60,000 (6x)', '140,000 (14x)'],
    ['New flagship', 'Gradual', 'Priority', 'First access'],
    ['MCP tools', 'Built-in 4', 'Curated', 'Curated'],
  ] },
  sections: [{ title: 'MCP tools included', description: 'No extra cost — included in every tier.', cards: [
    { icon: '👁️', title: 'Visual understanding', description: 'Understand UI screenshots, architecture diagrams and flowcharts.' },
    { icon: '🔍', title: 'Web search', description: 'Fetch latest docs, API references and solutions.' },
    { icon: '🌐', title: 'Web reading', description: 'Read docs, tutorials and code examples from any page.' },
    { icon: '📦', title: 'Open-source repos', description: 'Access repo code, issues and PRs.' },
  ] }],
  tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'What is the current GLM Coding Plan price?', answer: 'Lite $18/mo (yearly $12.6/mo), Pro $80/mo (yearly $56/mo), Max $168/mo (yearly $117.6/mo). Quarterly billing gives 20% off, yearly 30% off.' },
    { question: 'How do weekly Credits work?', answer: 'Lite gets 10,000 Credits/week, Pro 6x Lite, Max 14x Lite. Credits refresh every 7 days; flagship models consume Credits faster.' },
    { question: 'Which models are included?', answer: 'GLM-5.2 (1M context, #1 open-source on LMArena Code), GLM-5.1, GLM-5-Turbo, GLM-5 and GLM-4.7. The newest flagship opens to Max first, then rolls out to lower tiers.' },
    { question: 'Do MCP tools cost extra?', answer: 'No. Visual understanding, web search, web reading and open-source repo MCP tools are included in every tier.' },
    { question: 'Can I upgrade anytime?', answer: 'Yes. Upgrades are prorated on remaining days; see the billing page for details.' },
  ],
})

const minimax = definePlan({
  slug: 'minimax', accent: 'orange', availability: 'active',
  seo: { title: 'MiniMax Token Plan Guide 2026 - M3 from $10/mo, 4 Tiers Compared', description: 'MiniMax Token Plan pricing: Starter $10, Plus $20, Max $50, Max HS $80 per month. M3 flagship with native multimodal and 1M context, M2.7 high-speed models up to 100+ TPS. 2 months free on annual billing.', canonical: 'https://codingplan.org/en/plans/minimax', locale: 'en', ogType: 'article' },
  hero: { badge: 'MiniMax · Token Plan', title: 'MiniMax Token', highlight: 'Plan Guide', description: 'M3 flagship with native multimodal input and 1M context. Four tiers from $10 to $80/mo, high-speed M2.7 models reaching 100+ TPS. Annual billing gives 2 months free.', stats: [{ value: '$10', label: 'Entry / month' }, { value: '4', label: 'Tiers' }, { value: '100+', label: 'TPS high speed' }, { value: '1M', label: 'Context' }] },
  modelsTitle: 'Models', modelsDescription: 'M3 and M2.7 share the same monthly token quota.',
  models: [
    { icon: '🚀', name: 'MiniMax M3', description: 'Flagship model with native multimodal input (image & video), 1M context, ideal for large codebases.', badge: 'Flagship' },
    { icon: '⚡', name: 'M2.7 / M2.7-highspeed', description: 'Shares monthly quota with M3. Standard ~50 TPS, high-speed ~100+ TPS. Reference: 100-2,000 prompts per 5h depending on tier.', badge: 'High speed' },
  ],
  plansTitle: 'Plans', plansDescription: 'Monthly token usage model. Annual billing = 2 months free.', purchaseUrl: 'https://platform.minimax.io/subscribe/coding-plan',
  plans: [
    { name: 'Starter', price: '$10', unit: '/mo', discount: '$100/year', features: ['~100 prompts/5h', 'M2.7 standard speed', '1 concurrent Agent'], audience: 'Beginners exploring AI coding' },
    { name: 'Plus', price: '$20', unit: '/mo', discount: '$200/year', features: ['~300 prompts/5h', 'M2.7 standard speed', 'M3 access', '3-4 concurrent Agents'], audience: 'Regular daily developers' },
    { name: 'Max', price: '$50', unit: '/mo', discount: '$500/year', features: ['~1,000 prompts/5h', 'M2.7 standard speed', 'M3 access', 'Higher output limits'], audience: 'Heavy professional users' },
    { name: 'Max HS', badge: 'Top pick', price: '$80', unit: '/mo', discount: '$800/year', features: ['~1,000 prompts/5h', '100+ TPS high-speed models', 'M3 access', 'Peak priority'], audience: 'Teams and latency-sensitive workflows', featured: true },
  ],
  sections: [
    { title: 'Highlights', cards: [
      { icon: '🎥', title: 'Native multimodal', description: 'M3 understands images and videos in addition to text.' },
      { icon: '🚄', title: '100+ TPS', description: 'High-speed tier for responsive interactive coding.' },
      { icon: '🎁', title: '2 months free', description: 'Annual billing at $100-$800 saves two months vs monthly.' },
    ] },
  ],
  tools: ['Claude Code', 'Cursor', 'Cline', 'OpenCode'],
  contentOrder: ['models', 'plans', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'How does the token quota work?', answer: 'Plans use a monthly token-based quota. Starter ~100 prompts/5h, Plus ~300, Max and Max HS ~1,000. Actual consumption depends on context length.' },
    { question: 'What is the difference between Max and Max HS?', answer: 'Both allow ~1,000 prompts/5h. Max HS adds M2.7-highspeed at 100+ TPS for latency-sensitive workflows.' },
    { question: 'Does M3 support images and video?', answer: 'Yes. M3 has native multimodal input for images and video, sharing the same monthly quota as text models.' },
    { question: 'Is annual billing worth it?', answer: 'Annual plans cost $100 (Starter) to $800 (Max HS), effectively 2 months free compared to monthly billing.' },
  ],
})

const kimi = definePlan({
  slug: 'kimi', accent: 'purple', availability: 'active',
  seo: { title: 'Kimi Code Plan Guide 2026 - K3 Released, 5 Tiers ¥0-¥699', description: 'Kimi Code Plan by Moonshot AI: Adagio free, Andante ¥49, Moderato ¥99, Allegretto ¥199, Allegro ¥699. Kimi K3 flagship (2.8T params, 1M context, released 2026/7/17) unlocked from Moderato; Allegro adds 1M-token conversations.', canonical: 'https://codingplan.org/en/plans/kimi', locale: 'en', ogType: 'article' },
  hero: { badge: 'Moonshot AI · Kimi Code', title: 'Kimi Code', highlight: 'Plan Guide', description: 'Kimi K3 flagship (2.8T parameters, 1M context, released 2026/7/17) is now live. Five tiers from free to ¥699/mo; Moderato+ unlocks K3 and Allegro unlocks 1M-token conversations.', stats: [{ value: '5', label: 'Tiers' }, { value: 'K3', label: 'Flagship live' }, { value: '1M', label: 'Context (Allegro)' }, { value: '¥49', label: 'Paid entry' }] },
  modelsTitle: 'Models', modelsDescription: 'Kimi K3 + K2.6, the new generation coding duo.',
  models: [
    { icon: '🌟', name: 'Kimi K3', description: 'Moonshot\u2019s latest flagship: 2.8 trillion parameters, 1M-token context, native vision. Unlocked from Moderato; Allegro adds 1M-token conversation capacity. Near-frontier on SWE-Bench.', badge: 'Moderato+' },
    { icon: '🌙', name: 'Kimi K2.6', description: 'Previous flagship coding model. Default on Adagio/Andante; shares quota with K3 from Moderato up.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Five tiers cover casual to professional. Annual billing saves up to ¥1,680.', purchaseUrl: 'https://www.kimi.com/code',
  plans: [
    { name: 'Adagio', badge: 'Free', price: '¥0', unit: '/mo', features: ['Kimi K2.6 / K2 access', '1 concurrent Agent task', '2 projects · 500MB storage', '2 scheduled tasks', 'K3 requires Moderato+'], audience: 'Casual users and newcomers' },
    { name: 'Andante', price: '¥49', unit: '/mo', discount: '¥39/mo annually (¥468/yr)', features: ['~300-1,200 API calls/5h', 'Refreshes every 7 days', '20 projects · 20GB storage', '4x priority queue', 'K3 requires Moderato+'], audience: 'Individual developers' },
    { name: 'Moderato', badge: 'Recommended · K3', price: '¥99', unit: '/mo', discount: '¥79/mo annually (¥948/yr)', features: ['Kimi K3 flagship (2.8T params)', 'Larger token quota', '2 concurrent Agents · 4x speed', 'Cluster · 2 subtasks · Dream memory', 'Kimi CLI / Claude Code / Roo Code'], audience: 'Daily high-frequency coders', featured: true },
    { name: 'Allegretto', price: '¥199', unit: '/mo', discount: '¥159/mo annually (¥1,908/yr)', features: ['K3 + Agent cluster 40x/mo', '4 cluster subtasks · Goal Mode', '2 concurrent Agents', '10 Kimi Claw group chats'], audience: 'Heavy agent workflows' },
    { name: 'Allegro', badge: 'Top · 1M context', price: '¥699', unit: '/mo', discount: '¥559/mo annually (¥6,708/yr)', features: ['K3 with 1M-token conversations', '4 concurrent Agents · 8 cluster subtasks', '10 Kimi Claw group chats', 'Goal Mode · Cloud / Android / Desktop'], audience: 'Power users and teams' },
  ],
  sections: [{ title: 'Member benefits', description: 'Coding is only the start.', cards: [
    { icon: '💻', title: 'Kimi Code', description: 'K3 / K2.6 for generation, refactoring and debugging.' },
    { icon: '🌐', title: 'AI Website builder', description: 'Spin up site prototypes and landing pages.' },
    { icon: '📄', title: 'AI Docs', description: 'Generate technical and API documentation.' },
    { icon: '📊', title: 'AI PPT', description: 'Quickly build shareable presentations.' },
  ] }],
  tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'],
  contentOrder: ['models', 'plans', 'section:0', 'tools', 'faq'],
  faqs: [
    { question: 'Which tier unlocks Kimi K3?', answer: 'K3 is available from Moderato (¥99/mo) and above. Adagio and Andante keep using K2.6. Allegro uniquely unlocks 1M-token conversations.' },
    { question: 'What is the difference between the five tiers?', answer: 'Adagio is free with K2.6. Andante (¥49) is the paid entry. Moderato (¥99) unlocks K3. Allegretto (¥199) adds Agent cluster (40x/mo) and Goal Mode. Allegro (¥699) unlocks 1M-token conversations and 4 parallel Agents.' },
    { question: 'How does the quota refresh?', answer: 'Quotas use a 5-hour window and refresh every 7 days; unused quota does not roll over. Maximum concurrency is 30.' },
    { question: 'What are Agent clusters?', answer: 'Available from Moderato: Allegretto gets 40 cluster runs/mo with 4 subtasks; Allegro gets 8 subtasks and 4 parallel Agents.' },
    { question: 'Which tools are supported?', answer: 'Kimi CLI, Kimi Code for VS Code, Claude Code and Roo Code, all sharing the same plan quota.' },
  ],
})

const qwen = definePlan({
  slug: 'qwen', accent: 'orange', availability: 'limited',
  seo: { title: 'Qwen Coding Plan Guide 2026 - Pro $50/mo, Daily Limited Restock', description: 'Alibaba Cloud Qwen Coding Plan: Lite discontinued, Pro $50/mo with 6,000 requests/5h, 45,000/week, 90,000/month. Qwen3.5 series plus third-party models (GLM, Kimi, MiniMax) in one plan.', canonical: 'https://codingplan.org/en/plans/qwen', locale: 'en', ogType: 'article' },
  hero: { badge: 'Alibaba Cloud · Qwen', title: 'Qwen Coding', highlight: 'Plan Guide', description: 'Alibaba Cloud\u2019s plan brings Qwen3.5 series and third-party models together. Lite has been discontinued; Pro ($50/mo) restocks daily at 9:30 AM and sells out fast.', stats: [{ value: '$50', label: 'Pro / month' }, { value: '6,000', label: 'Requests / 5h' }, { value: '8+', label: 'Models' }, { value: '9:30', label: 'Daily restock' }] },
  modelsTitle: 'Models', modelsDescription: 'Qwen3.5 series plus third-party flagships, more added over time.',
  models: [
    { icon: '☁️', name: 'qwen3.5-plus', description: 'Qwen3.5 general-purpose flagship.' },
    { icon: '🧠', name: 'qwen3-max', description: 'Complex reasoning tasks model.' },
    { icon: '⌨️', name: 'qwen3-coder-next', description: 'Next-generation code model of the Qwen3.5 family.', badge: 'New' },
    { icon: '🖥️', name: 'qwen3-coder-plus', description: 'Software-engineering oriented code model.' },
    { icon: '🔥', name: 'MiniMax-M2.5', description: 'MiniMax model API.' },
    { icon: '🔷', name: 'glm-5', description: 'Zhipu flagship model.' },
    { icon: '🌙', name: 'kimi-k2.5', description: 'Moonshot AI model.' },
    { icon: '🔹', name: 'glm-4.7', description: 'Zhipu stable workhorse.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Lite is discontinued; only Pro remains with daily limited restock.', purchaseUrl: 'https://www.alibabacloud.com/en/campaign/ai-scene-coding?_p_lc=1',
  plans: [
    { name: 'Lite', badge: 'Discontinued', price: '$10', unit: '/mo', features: ['1,200 requests/5h', '9,000/week', '18,000/month', 'No longer available for purchase'], audience: 'Historical entry tier', disabled: true },
    { name: 'Pro', badge: 'Limited stock', price: '$50', unit: '/mo', discount: 'Daily restock at 9:30 AM (Beijing time)', features: ['6,000 requests/5h', '45,000/week', '90,000/month', 'Qwen3.5 series + third-party models'], audience: 'Professional developers who need multi-model access', featured: true },
  ],
  comparison: { title: 'Quota comparison', columns: ['Tier', '5 hours', 'Weekly', 'Monthly'], featuredColumn: 1, rows: [
    ['Lite (discontinued)', '1,200', '9,000', '18,000'],
    ['Pro', '6,000', '45,000', '90,000'],
  ] },
  sections: [{ title: 'Quota rules', warning: 'Pro inventory usually sells out within minutes of the 9:30 AM restock. Main account only - RAM users are not supported.', cards: [
    { icon: '⏱️', title: 'Rolling 5-hour window', description: 'Old requests leave the window and restore quota continuously.' },
    { icon: '📅', title: 'Weekly reset', description: 'Weekly quota recalculates on the official cycle.' },
    { icon: '🗓️', title: 'Monthly reset', description: 'Monthly quota follows the subscription cycle.' },
  ] }],
  tools: ['Qwen Code', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'OpenCode'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'How do the three quotas work?', answer: '5-hour, weekly and monthly limits apply simultaneously; hitting any one pauses service until that window resets.' },
    { question: 'Can I still buy Lite?', answer: 'No. Lite was discontinued; only Pro remains, with daily limited restock that often sells out within minutes.' },
    { question: 'Which models are supported?', answer: 'Qwen3.5-Plus, Qwen3-Max, Qwen3-Coder-Next, Qwen3-Coder-Plus, MiniMax-M2.5, GLM-5, Kimi-K2.5, GLM-4.7 and more.' },
    { question: 'Is there a refund policy?', answer: 'Activated plans are generally non-refundable. Confirm the rules before purchase.' },
  ],
})

const opencodeGo = definePlan({
  slug: 'opencode-go', accent: 'slate', availability: 'active',
  seo: { title: 'OpenCode Go Guide 2026 - $5 First Month, 18 Open Models at 6x Value', description: 'OpenCode Go subscription: $5 first month, then $10/mo with 6x usage value. 18 open-source models including Grok 4.5, GLM-5.2, Kimi K3, Qwen3.8 Max, DeepSeek V4 and MiniMax M3. Dollar-based limits ($12/5h, $30/week, $60/month), OpenAI/Anthropic compatible APIs work with any agent.', canonical: 'https://codingplan.org/en/plans/opencode-go', locale: 'en', ogType: 'article' },
  hero: { badge: 'OpenCode · Anomaly', title: 'OpenCode Go', highlight: 'Plan Guide', description: 'Low-cost subscription for open coding models: $5 for the first month, then $10/month with about 6x the subscription value in usage. A curated lineup of 18 tested open-source models works with OpenCode or any compatible agent.', stats: [{ value: '18', label: 'Models' }, { value: '$5', label: 'First month' }, { value: '6x', label: 'Usage value' }, { value: '31,650', label: 'Top 5h requests' }] },
  modelsTitle: 'Models', modelsDescription: '18 open models, all tested and benchmarked for agentic coding. The lineup grows over time.',
  models: [
    { icon: '🐙', name: 'Grok 4.5', description: 'xAI flagship and one of the strongest open coding models; ~120 requests per 5h.', badge: 'Flagship' },
    { icon: '🔷', name: 'GLM-5.2', description: 'Zhipu flagship, #1 open-source on LMArena Code; ~880 requests per 5h.', badge: 'LMArena #1' },
    { icon: '🌟', name: 'Kimi K3', description: 'Moonshot flagship (2.8T params, 1M context); ~110 requests per 5h.' },
    { icon: '☁️', name: 'Qwen3.8 Max', description: 'Alibaba\u2019s newest flagship; ~160 requests per 5h.' },
    { icon: '🐋', name: 'DeepSeek V4', description: 'V4 Pro ~3,450 requests/5h; V4 Flash ~31,650 with limited-time 2x limits.', badge: '2x flash promo' },
    { icon: '🔥', name: 'MiniMax M3', description: 'Multimodal flagship; ~3,200 requests per 5h.' },
    { icon: '⚡', name: 'MiMo-V2.5', description: 'Xiaomi\u2019s ultra-cheap open model; ~30,100 requests per 5h.', badge: 'Best value' },
    { icon: '🤖', name: 'Hy3', description: 'High-performance open model; ~4,300 requests per 5h.' },
    { icon: '🧠', name: 'GPT 5.6 Luna', description: 'OpenAI open model; ~2,050 requests per 5h.' },
  ],
  plansTitle: 'Plans', plansDescription: 'A single $10/mo tier with 6x usage value. $5 first month. Top up credit if needed, cancel anytime.', purchaseUrl: 'https://opencode.ai/go?ref=JBT5KJRCD4',
  plans: [
    { name: 'Go', badge: '$5 first month', price: '$10', unit: '/mo', discount: '$5 first month · Invite friends - both get $5', features: ['$12 / 5h · $30 / week · $60 / month usage', '18 curated open models (Grok 4.5, GLM-5.2, Kimi K3...)', 'OpenAI / Anthropic compatible APIs, any agent', 'Fall back to Zen balance when limits are reached', 'No training on your data, 0-day retention for most models', 'Cancel any time, no lock-in'], audience: 'Developers who want the strongest open models at the lowest cost, and heavy agent users', featured: true, recommended: true, ctaLabel: 'Subscribe to Go →' },
  ],
  comparison: { title: 'Model usage', description: 'Estimated requests at typical usage patterns (per 5h / week / month).', columns: ['Model', '5 hours', 'Weekly', 'Monthly'], featuredColumn: 1, rows: [
    ['DeepSeek V4 Flash', '31,650', '79,050', '158,150'],
    ['MiMo-V2.5', '30,100', '75,200', '150,400'],
    ['Qwen3.7 Plus', '4,300', '10,800', '21,600'],
    ['Hy3', '4,300', '10,750', '21,500'],
    ['DeepSeek V4 Pro', '3,450', '8,550', '17,150'],
    ['MiniMax M3', '3,200', '8,000', '16,000'],
    ['GLM-5.2', '880', '2,150', '4,300'],
    ['Qwen3.8 Max', '160', '400', '810'],
    ['Grok 4.5', '120', '300', '600'],
    ['Kimi K3', '110', '250', '490'],
  ] },
  sections: [
    { title: 'Usage limits', warning: 'Limits are dollar-based: $12 per 5h, $30 per week, $60 per month. Expensive models consume budget faster. Free models remain available after you hit limits.', cards: [
      { icon: '⏱️', title: 'Rolling 5-hour', description: '$12 of usage per rolling 5-hour window.' },
      { icon: '📅', title: 'Weekly', description: '$30 per week, reset weekly, no rollover.' },
      { icon: '🗓️', title: 'Monthly', description: '$60 per month - about 6x your $10 subscription.' },
      { icon: '💳', title: 'Balance fallback', description: 'Enable "Use balance" in the console to continue from your Zen balance after limits.' },
    ] },
    { title: 'How to connect', headingLevel: 3, highlights: ['Sign in at opencode.ai, subscribe to Go and copy your API key', 'In the OpenCode TUI run /connect, pick OpenCode Go, paste your key', 'Model IDs use the format opencode-go/<model-id> (e.g. opencode-go/kimi-k3)', 'OpenAI / Anthropic / Responses compatible endpoints work with Claude Code, Cursor and more'] },
    { title: 'Privacy', headingLevel: 3, highlights: ['No model is used for training', 'Most models have 0-day data retention (GLM, Kimi, Qwen, DeepSeek, MiniMax, MiMo)', 'Grok 4.5 and GPT 5.6 Luna retain 30 days (abuse monitoring)', 'DeepSeek V4 Flash zero-data-retention agreement renews monthly'] },
  ],
  tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'Kilo Code', 'Cherry Studio'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'section:1', 'section:2', 'faq', 'final-cta'],
  finalCta: { title: 'Subscribe to OpenCode Go now', label: 'Go to opencode.ai/go →', href: 'https://opencode.ai/go?ref=JBT5KJRCD4' },
  faqs: [
    { question: 'What is OpenCode Go?', answer: 'OpenCode Go is Anomaly\u2019s low-cost subscription for open coding models: $5 for the first month, then $10/month, giving about 6x the subscription value in usage across 18 curated open models, usable in OpenCode or any OpenAI/Anthropic compatible agent.' },
    { question: 'How is Go different from Zen?', answer: 'Go is the low-cost open-model subscription ($10/mo, 6x value). Zen is OpenCode\u2019s flagship subscription with premium closed-model credits. They are separate subscriptions - Go is the open-source model month pass.' },
    { question: 'How do usage limits work?', answer: 'Limits are dollar-based: $12 per 5 hours, $30 per week, $60 per month. Request counts depend on model price - DeepSeek V4 Flash allows ~31,650 requests/5h while Kimi K3 allows ~110. After limits you can fall back to Zen balance or free models.' },
    { question: 'Which models are included?', answer: '18 models: Grok 4.5, GLM-5.2/5.1, GPT 5.6 Luna, Kimi K3/K2.7 Code/K2.6, MiMo-V2.5/-Pro, MiniMax M3/M2.7, Qwen3.8 Max/Qwen3.7 Max/Plus/Qwen3.6 Plus, DeepSeek V4 Pro/V4 Flash, Hy3. The list keeps growing.' },
    { question: 'Do I get a discount for referrals?', answer: 'Yes. Friends who join and subscribe to Go through your invite link (https://opencode.ai/go?ref=JBT5KJRCD4) earn $5 usage credit for both of you.' },
    { question: 'Is my data used for training?', answer: 'No model uses your data for training. Most models keep 0-day retention; Grok 4.5 and GPT 5.6 Luna keep 30 days of logs for abuse monitoring.' },
  ],
})

export const enPlansBySlug: Record<string, PlanPageData> = {
  claude,
  glm,
  minimax,
  kimi,
  qwen,
  'opencode-go': opencodeGo,
}

export const enPlanSlugs = Object.keys(enPlansBySlug)

export function getEnPlan(slug: string) {
  return enPlansBySlug[slug]
}
