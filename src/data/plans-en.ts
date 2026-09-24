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
  seo: { title: 'Claude Code Plan Guide 2026 - Pro $20, Max 5x $100, Max 20x $200', description: 'Anthropic Claude Code pricing guide: Pro $20/mo, Max 5x $100/mo, Max 20x $200/mo. Claude Fable 5.1 / Opus 5.5 / Sonnet 5 / Haiku 4.5 models, 1M context, usage multipliers, extended thinking and MCP support compared side by side.', canonical: 'https://codingplan.org/en/plans/claude', locale: 'en', ogType: 'article' },
  hero: { badge: 'Anthropic · Claude Code', title: 'Claude Code', highlight: 'Plan Guide', description: 'The gold standard for AI coding. Pro at $20/mo gives you Claude Opus 5.5, Sonnet 5 and Haiku 4.5 with extended thinking in the terminal, IDE and web; Max 5x and 20x multiply usage 5x-20x and include Fable 5.1 at 50% of weekly limits.', stats: [{ value: '$20', label: 'Pro / month' }, { value: '4', label: 'Model families' }, { value: '20x', label: 'Max multiplier' }, { value: '1M', label: 'Context (per model)' }] },
  modelsTitle: 'Models', modelsDescription: 'Current lineup: Fable 5.1 and Opus 5.5 (both shipped in September 2026), plus Sonnet 5 and Haiku 4.5. Opus, Sonnet and Haiku are included on every paid tier; Fable 5.1 needs usage credits on Pro and is capped at 50% of weekly limits on Max.',
  models: [
    { icon: '🏆', name: 'Claude Fable 5.1', description: 'New in September 2026 (API name claude-fable-5-1): Anthropic\u2019s top-tier model for long-running agents at $10/$50 per million tokens, with cache reads down 75% to $0.25 per million and High effort as the default in Claude Code. Not included on Free; needs usage credits on Pro and 50% of weekly limits on Max.', badge: 'Top tier \u00b7 Sep 2026' },
    { icon: '🧠', name: 'Claude Opus 5.5', description: 'New flagship for complex agentic coding and enterprise work (API name claude-opus-5-5): $4 input / $20 output per million tokens, 20% below Opus 5, with cache reads at $0.20 per million and 30%+ faster output generation. Fast mode ($8/$40) runs up to 2.5x faster in Claude Code.', badge: 'Flagship' },
    { icon: '⚡', name: 'Claude Sonnet 5', description: 'High-performance coding and agent model (released 2026-06-30). Balanced speed and capability for daily workloads.', badge: 'Balanced' },
    { icon: '🌱', name: 'Claude Haiku 4.5', description: 'Fastest and cheapest tier, ideal for quick iterations and code completion.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Pro for individuals, Max for heavy usage with 5x-20x multipliers and priority access. Usage runs on a 5-hour rolling window plus a weekly cap on paid tiers. Annual billing saves ~15%; Free covers Sonnet 5 and Haiku 4.5 only, with no Fable 5.1 access.', purchaseUrl: 'https://claude.com/pricing',
  plans: [
    { name: 'Pro', price: '$20', unit: '/mo', discount: '$17/mo billed annually (-15%)', features: ['Claude Code & Cowork', 'Opus 5.5, Sonnet 5 and Haiku 4.5 included', 'Fable 5.1 via usage credits (pay-as-you-go)', 'Unlimited projects', 'Cross-conversation memory', 'Extended thinking & MCP support'], audience: 'Individual developers who want the best model quality for daily coding' },
    { name: 'Max 5x', badge: 'Popular', price: '$100', unit: '/mo', discount: '5x Pro usage', features: ['5x Pro usage limits', 'Fable 5.1 at 50% of weekly limits', 'Priority access during peak hours', 'Higher output limits', 'All Pro features'], audience: 'Heavy users who hit Pro limits regularly', featured: true },
    { name: 'Max 20x', badge: 'Top tier', price: '$200', unit: '/mo', discount: '20x Pro usage', features: ['20x Pro usage limits', 'Fable 5.1 at 50% of weekly limits', 'Early access to new features', 'Peak-hour priority'], audience: 'Professional teams and extremely heavy usage patterns' },
  ],
  comparison: { title: 'Plan comparison', description: 'Usage is measured relative to Pro baseline limits on a 5-hour rolling window plus a weekly cap.', columns: ['Tier', 'Price', 'Usage', 'Peak priority', 'Fable 5.1', 'Early features'], featuredColumn: 1, rows: [
    ['Pro', '$20/mo', '1x', 'No', 'Usage credits', 'No'],
    ['Max 5x', '$100/mo', '5x', 'Yes', '50% of weekly limits', 'No'],
    ['Max 20x', '$200/mo', '20x', 'Yes', '50% of weekly limits', 'Yes'],
  ] },
  sections: [
    { title: 'Why Claude Code?', cards: [
      { icon: '🏆', title: 'Gold standard quality', description: 'Opus 5.5 and Fable 5.1 rank at the top of coding benchmarks for agentic tasks.' },
      { icon: '🧩', title: 'MCP support', description: 'Model Context Protocol lets you plug in tools, memory and data sources.' },
      { icon: '💭', title: 'Extended thinking', description: 'Opus 5.5 reasons step by step on complex problems before answering; Fable 5.1 defaults to High effort in Claude Code.' },
      { icon: '🌐', title: 'New in September', description: 'Fable 5.1 and Opus 5.5 shipped in September and are available across platforms. Claude Mythos 5.1 stays limited to vetted security and life-science teams at US institutions only.' },
    ] },
  ],
  tools: ['Terminal', 'VS Code', 'JetBrains', 'Web', 'Cowork', 'Chrome'],
  toolsTitle: 'Where to use Claude Code',
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'What is the difference between Pro and Max?', answer: 'Pro ($20/mo) covers individual usage with Opus 5.5, Sonnet 5 and Haiku 4.5. Max 5x ($100/mo) gives 5x Pro usage with priority access; Max 20x ($200/mo) gives 20x usage, early feature access and peak-hour priority. Fable 5.1 needs usage credits on Pro and runs at 50% of weekly limits on both Max tiers. Annual billing saves about 15% on Pro.' },
    { question: 'Which models are included?', answer: 'Pro and Max include Claude Opus 5.5, Sonnet 5 and Haiku 4.5; Free covers Sonnet and Haiku only. Fable 5.1 (top tier for long-running agents, $10/$50 per million tokens) is not part of any plan: on Pro you pay for it with usage credits, and on Max 5x / Max 20x it draws on 50% of your weekly limits.' },
    { question: 'Does Claude Code work in my editor?', answer: 'Yes. Claude Code runs in the terminal, VS Code, JetBrains IDEs, and as Claude Cowork on the web and desktop. Claude in Chrome is also generally available for paid plans.' },
    { question: 'Is there a free tier?', answer: 'Yes, Free costs $0 and covers unlimited chat with basic models, code/data visualization, web search and cross-conversation memory — but model access is limited to Sonnet and Haiku, with no Opus 5.5 or Fable 5.1. The Pro plan at $20/mo is the standard entry point for Claude Code.' },
    { question: 'Can I get a refund?', answer: 'Anthropic generally does not refund activated subscriptions. Start with Pro to evaluate before upgrading to Max.' },
  ],
})

const glm = definePlan({
  slug: 'glm', accent: 'blue', availability: 'active',
  seo: { title: 'GLM Coding Plan Pricing 2026: Subscription Cost from $18/mo', description: 'How much does a GLM Coding Plan subscription cost? Lite $18 / Pro $80 / Max $168 monthly from Z.ai, yearly -30%; GLM-5.3 & GLM-5.3-Flash with 1M context on all tiers, 50% off-peak credits and a standing ZCode 150% quota. Tier comparison table and signup entry included.', canonical: 'https://codingplan.org/en/plans/glm', locale: 'en', ogType: 'article' },
  hero: { badge: 'Zhipu AI · Z.ai', title: 'GLM Coding', highlight: 'Plan Guide', description: 'GLM-5.3 (Terminal-Bench 3.0 #1 open-source) and GLM-5.3-Flash (native multimodal), both with a genuinely usable 1M context, are available on all tiers. Credits refresh on a 5-hour + weekly dual window, with 50% off-peak deduction; quarterly 20% and yearly 30% discounts. ZCode is now a standing benefit (150% plan quota, free off-peak tasks) and AutoClaw joins as the official office assistant.', stats: [{ value: '$18', label: 'Entry / month' }, { value: '2K-28K', label: 'Credits / 5h' }, { value: '1M', label: 'Context' }, { value: '50%', label: 'Off-peak deduction' }] },
  modelsTitle: 'Models', modelsDescription: 'All plans support GLM-5.3 and GLM-5.3-Flash, both with a genuinely usable 1M context; calls to legacy models are auto-routed to the new versions.',
  models: [
    { icon: '🚀', name: 'GLM-5.3', description: 'Newest flagship, live for all users since Aug 14. Same base as 5.2 with post-training scaling: +50% coding on Z.ai Code Bench, #1 open-source on Terminal-Bench 3.0 (28.3), DeepSWE v1.1 at 66.9. Weights released on HuggingFace Aug 28, and it supports a genuinely usable 1M context.', badge: 'Terminal-Bench #1 open-source' },
    { icon: '⚡', name: 'GLM-5.3-Flash', description: 'Live Aug 26: the first natively multimodal model in the GLM-5 family (320B total / 18B active params, hybrid linear+sparse attention). DeepSWE v1.1 at 63.4 beats GLM-5.2; coding/agent near Claude Opus 4.8. Consumes 3x the usage of GLM-5.3 (lower Credits rate). Weights open-sourced under MIT, and it also supports a genuinely usable 1M context.', badge: 'New · native multimodal' },
    { icon: '🔁', name: 'Legacy auto-routing', description: 'Calls to GLM-5.2 / GLM-5.1 automatically switch to GLM-5.3; GLM-5-Turbo / GLM-4.7 switch to GLM-5.3-Flash — no config change needed.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Monthly prices with quarterly 20% / yearly 30% off. Credits refresh on a 5-hour + weekly dual window; off-peak usage (outside Mon-Fri 14:00-18:00 UTC+8) deducts 50%. ZCode 150% quota and AutoClaw are subscriber benefits on every tier.', purchaseUrl: 'https://z.ai/subscribe?ic=Q2I4GGSKVU',
  plans: [
    { name: 'Lite', price: '$18', unit: '/mo', discount: 'Yearly $12.6/mo (-30%)', features: ['2,000 Credits/5h · 10,000/week', 'GLM-5.3 & 5.3-Flash on all tiers', 'ZCode / Claude Code / 20+ coding tools', '4 built-in MCP tools'], audience: 'Individual developers and small repos' },
    { name: 'Pro', badge: 'Best value', price: '$80', unit: '/mo', discount: 'Yearly $56/mo (-30%)', features: ['12,000 Credits/5h · 60,000/week (6x Lite)', 'Faster generation & peak-hour priority', 'Curated MCP toolset'], audience: 'Daily developers working on medium repos', featured: true },
    { name: 'Max', price: '$168', unit: '/mo', discount: 'Yearly $117.6/mo (-30%)', features: ['28,000 Credits/5h · 140,000/week (14x Lite)', 'First access to latest models', 'Peak-hour priority'], audience: 'Heavy users and teams needing guaranteed capacity' },
  ],
  comparison: { title: 'Tier comparison', columns: ['Feature', 'Lite', 'Pro', 'Max'], featuredColumn: 2, rows: [
    ['Monthly price', '$18', '$80', '$168'],
    ['Yearly (-30%)', '$12.6/mo', '$56/mo', '$117.6/mo'],
    ['Credits / 5h', '2,000', '12,000', '28,000'],
    ['Credits / week', '10,000', '60,000 (6x)', '140,000 (14x)'],
    ['GLM-5.3 / 5.3-Flash', 'Yes', 'Yes', 'Yes'],
    ['Off-peak deduction', '50% off', '50% off', '50% off'],
  ] },
  sections: [{ title: 'Credits and extras', description: 'Peak hours are Mon-Fri 14:00-18:00 (UTC+8); everything else deducts 50% fewer Credits — Z.ai claims up to 92% savings vs pay-as-you-go GLM-5.3 API.', cards: [
    { icon: '👁️', title: 'Built-in MCP tools', description: 'Visual understanding, web search, web reading and open-source repo access (1.2 Credits per call).', },
    { icon: '🌙', title: 'Off-peak 50% off', description: 'Weekends and weekday nights deduct half Credits — schedule heavy jobs accordingly.' },
    { icon: '🎁', title: 'Limited-time events', description: 'Night unlimited (Sep 3 - Oct 7, 23:00-09:00): GLM-5.3-Flash calls from ZCode / AutoClaw are uncapped and other agents get double quota. Double Festival (Sep 25 - Oct 7): off-peak deduction applies all day.' },
    { icon: '🚀', title: 'ZCode & AutoClaw', description: 'Standing subscriber benefits: ZCode gives 150% plan quota plus free off-peak tasks and professional data MCP; AutoClaw, the new official office assistant, gets its own 150% quota and dedicated perks.' },
    { icon: '👥', title: 'Invite rewards', description: 'Invite program returns 10-20% Credits (overseas).' },
    { icon: '🔓', title: 'Open weights', description: 'GLM-5.3-Flash weights are open under MIT; GLM-5.3 flagship weights landed on HuggingFace Aug 28.' },
  ] }],
  tools: ['ZCode', 'AutoClaw', 'Claude Code', 'Codex', 'WorkBuddy', 'TraeWork', 'TraeCode', 'OpenCode', 'Cursor', 'OpenClaw', 'Cline', 'Roo Code', 'Kilo Code'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'What is the current GLM Coding Plan price?', answer: 'Lite $18/mo (yearly $12.6/mo), Pro $80/mo (yearly $56/mo), Max $168/mo (yearly $117.6/mo). Quarterly billing gives 20% off, yearly 30% off.' },
    { question: 'How do Credits work?', answer: 'Credits refresh on a dual window: 5-hour (Lite 2,000 / Pro 12,000 / Max 28,000) plus weekly (10,000 / 60,000 / 140,000). Off-peak usage (outside Mon-Fri 14:00-18:00 UTC+8) deducts 50% fewer Credits; flagship models consume Credits faster.' },
    { question: 'What is GLM-5.3-Flash?', answer: 'A new model live Aug 26: the first natively multimodal model in the GLM-5 family (320B total / 18B active parameters). DeepSWE v1.1 at 63.4 beats GLM-5.2 and coding/agent capability approaches Claude Opus 4.8. It uses 3x the usage of GLM-5.3 (a lower Credits rate) and its weights are open-sourced under MIT.' },
    { question: 'Which models are included?', answer: 'All tiers support GLM-5.3 (Terminal-Bench 3.0 #1 open-source) and GLM-5.3-Flash (native multimodal), both with a genuinely usable 1M context. Calls to legacy GLM-5.2/5.1 auto-route to GLM-5.3, and GLM-5-Turbo/4.7 auto-route to GLM-5.3-Flash.' },
    { question: 'Which perks and promos come with a subscription?', answer: 'ZCode is a standing benefit rather than a temporary bump: subscribers get 150% plan quota, free off-peak tasks and a professional data MCP, and AutoClaw (the official office assistant) gets its own 150% quota. Two limited-time events run through early October: night unlimited GLM-5.3-Flash via ZCode / AutoClaw plus double quota for other agents (Sep 3 - Oct 7, 23:00-09:00), and the Double Festival, when the off-peak rule applies all day (Sep 25 - Oct 7). Regular off-peak deduction stays at 50% outside Mon-Fri 14:00-18:00 UTC+8.' },
    { question: 'Are the weights open-source?', answer: 'Yes. GLM-5.3-Flash weights are open under MIT, and the GLM-5.3 flagship weights were released on HuggingFace on Aug 28 as promised (two weeks after launch).' },
    { question: 'Do MCP tools cost extra?', answer: 'No. Visual understanding, web search, web reading and open-source repo MCP tools are included in every tier.' },
  ],
})

const minimax = definePlan({
  slug: 'minimax', accent: 'orange', availability: 'active',
  seo: { title: 'MiniMax Token Plan Guide 2026 - M3 from $20/mo, 3 Tiers Compared', description: 'MiniMax Token Plan international pricing: Plus $20, Max $50, Ultra $120 per month (~1.7B/5.1B/12.5B tokens). M3 flagship with native multimodal and 1M context, 2 months free on annual billing. Music models discontinued Aug 20; H3 open-sourced Aug 3.', canonical: 'https://codingplan.org/en/plans/minimax', locale: 'en', ogType: 'article' },
  hero: { badge: 'MiniMax · Token Plan', title: 'MiniMax Token', highlight: 'Plan Guide', description: 'M3 flagship with native multimodal input and 1M context. Three international tiers on sale (Plus $20 / Max $50 / Ultra $120 per month — the legacy Starter and Max HS tiers were retired). Annual billing gives 2 months free, and three credit packs are available if the monthly quota runs out.', stats: [{ value: '$20', label: 'Entry / month' }, { value: '3', label: 'Tiers' }, { value: '12.5B', label: 'Ultra tokens/mo' }, { value: '1M', label: 'Context' }] },
  modelsTitle: 'Models', modelsDescription: 'M3, M2.7 and H3 share the same monthly token quota. Music models were discontinued on Aug 20.',
  models: [
    { icon: '🚀', name: 'MiniMax M3', description: 'Flagship model with native multimodal input (image & video), 1M context, ideal for large codebases.', badge: 'Flagship' },
    { icon: '⚡', name: 'M2.7 / M2.7-highspeed', description: 'Shares the monthly quota with M3. Standard ~50 TPS, high-speed ~100+ TPS. Reference limits per 5 hours by tier (Plus / Max / Ultra): 1,500 / 4,500 / 15,000 calls, or 750 / 2,250 / 7,500 on the high-speed build.', badge: 'High speed' },
    { icon: '🤖', name: 'MiniMax H3', description: 'Reasoning and agent-orchestration model sharing quota with M3; open-sourced on Aug 3.', badge: 'Open source' },
    { icon: '🎨', name: 'Image / Speech family', description: 'M2.5 and Speech 2.8 share the same monthly quota. Note: all Music models were discontinued on Aug 20, 2026 (the open-source MiniMax-Music3 remains on HuggingFace).' },
  ],
  plansTitle: 'Plans', plansDescription: 'Monthly token usage model. Annual billing = 2 months free. Legacy Starter ($10) and Max HS ($80) tiers are retired and only kept for existing subscribers; top-up credit packs cover usage beyond the monthly quota.', purchaseUrl: 'https://platform.minimax.io/subscribe/token-plan',
  plans: [
    { name: 'Plus', price: '$20', unit: '/mo', discount: '$220/year', features: ['~1.7B tokens/mo (M3)', '3-4 concurrent Agents', 'Multimodal models share quota'], audience: 'Individual developers and daily workflows' },
    { name: 'Max', badge: 'Top pick', price: '$50', unit: '/mo', discount: '$550/year', features: ['~5.1B tokens/mo', '4-5 concurrent Agents', 'Hailuo 2.3 video: 3/day'], audience: 'Daily professional developers', featured: true },
    { name: 'Ultra', price: '$120', unit: '/mo', discount: '$1,320/year', features: ['~12.5B tokens/mo', '6-7 concurrent Agents', 'Hailuo 2.3 video: 5/day'], audience: 'Multi-project and heavy-usage scenarios' },
  ],
  comparison: { title: 'Tier comparison', columns: ['Tier', 'Monthly', 'Yearly', 'Tokens/mo', 'Agents', 'Video/day'], featuredColumn: 2, rows: [
    ['Plus', '$20', '$220', '~1.7B', '3-4', '—'],
    ['Max', '$50', '$550', '~5.1B', '4-5', '3'],
    ['Ultra', '$120', '$1,320', '~12.5B', '6-7', '5'],
  ] },
  sections: [
    { title: 'Highlights', cards: [
      { icon: '🎥', title: 'Native multimodal', description: 'M3 understands images and videos in addition to text.' },
      { icon: '🤖', title: 'MiniMax Code app', description: 'Official agent app (desktop + web): Token Plan subscribers can use it without an API key.' },
      { icon: '🎁', title: 'Top-up credit packs', description: 'Starter $5 (5,000 credits), Advanced $25 (25,000 credits) and Premium $100 (100,000 credits): valid for one year, stackable, and they automatically top up usage once the plan quota runs out.' },
      { icon: '⏱️', title: 'Dual quota windows', description: 'The monthly quota is capped by both a fixed 5-hour window and a weekly window; unused quota does not roll over.' },
      { icon: '🚦', title: 'Peak-hour throttling', description: 'Dynamic throttling usually appears on weekdays between 15:00 and 17:30.' },
    ] },
  ],
  tools: ['Claude Code', 'Cursor', 'Cline', 'OpenCode', 'MiniMax Code'],
  contentOrder: ['models', 'plans', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'How does the token quota work?', answer: 'Plans use a monthly token-based quota: Plus ~1.7B, Max ~5.1B, Ultra ~12.5B tokens per month for M3 usage. Actual consumption depends on context length; image and speech models share the same quota.' },
    { question: 'What happened to the Starter and Max HS tiers?', answer: 'Both were retired. Starter ($10) and Plus-hs ($40) remain only as legacy tiers for existing subscribers; Max HS ($80) users were migrated to the new Max tier ($50). The current lineup is Plus $20 / Max $50 / Ultra $120.' },
    { question: 'Can I still generate music?', answer: 'No. All Music models stopped serving on Aug 20, 2026 in Token Plan and pay-as-you-go. The open-source MiniMax-Music3 weights are available on HuggingFace for self-hosting.' },
    { question: 'Can I top up when the plan quota runs out?', answer: 'Yes. Three credit packs are available: Starter $5 (5,000 credits), Advanced $25 (25,000 credits) and Premium $100 (100,000 credits). They are valid for one year from purchase, can be stacked, and can automatically top up the plan quota once it is exhausted; the monthly quota itself is capped by a 5-hour window and a weekly window, and unused quota does not roll over.' },
    { question: 'Is annual billing worth it?', answer: 'Annual plans cost $220 (Plus) to $1,320 (Ultra), effectively 2 months free compared to monthly billing.' },
  ],
})

const kimi = definePlan({
  slug: 'kimi', accent: 'purple', availability: 'active',
  seo: { title: 'Kimi Code Plan Guide 2026 - Free, Go, Plus, Pro, Max: K3 from ¥99', description: 'Kimi Code Plan by Moonshot AI: Free ¥0, Go ¥49, Plus ¥99, Pro ¥199, Max ¥699 per month (annual billing saves up to ¥1,680). Kimi K3 (2.8T params, 1M context, up to 260 tokens/s) unlocks at Plus; 1M context and the high-speed build need Pro. Weekly limits are gone - only a rolling 5-hour window remains, plus Extra Usage top-ups.', canonical: 'https://codingplan.org/en/plans/kimi', locale: 'en', ogType: 'article' },
  hero: { badge: 'Moonshot AI · Kimi Code', title: 'Kimi Code', highlight: 'Plan Guide', description: 'Kimi K3 (2.8T parameters, 1M context, up to 260 tokens/s) leads the lineup, and the new membership system is live: Free / Go ¥49 / Plus ¥99 / Pro ¥199 / Max ¥699. Weekly quota limits are gone - only a rolling 5-hour window remains - Go has no coding quota at all, and Kimi Code starts at Plus. Existing subscribers keep their old plans.', stats: [{ value: '¥99', label: 'Kimi Code entry' }, { value: '1M', label: 'K3 context' }, { value: '260', label: 'K3 tokens/s' }, { value: '¥25+', label: 'Extra usage top-up' }] },
  modelsTitle: 'Models', modelsDescription: 'Kimi K3 (k3 / k3-256k) plus the kimi-for-coding family: K2.8 Preview and the K2.7 Code high-speed build.',
  models: [
    { icon: '🌟', name: 'Kimi K3 (k3 / k3-256k)', description: 'Moonshot\u2019s flagship: 2.8 trillion parameters, up to 1M-token context with low/high/max thinking levels, up to 260 tokens/s. The k3-256k variant gives identical results within 256K at roughly half the consumption (no video input). Kimi Code and K3 unlock from Plus; full 1M context and the high-speed build need Pro.', badge: 'Plus+' },
    { icon: '🌙', name: 'kimi-for-coding (K2.8 Preview)', description: 'The workhorse for code completion and routine development, with context up to 1M. Served over both the OpenAI and Anthropic protocols; requires Kimi Code, so Plus or above.' },
    { icon: '🔄', name: 'kimi-for-coding-highspeed', description: 'K2.7 Code high-speed build (~5-6x faster) for low-latency loops; unlocks from Pro.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Free to Max at ¥49-¥699 per month (annual billing saves up to ¥1,680). Kimi Code needs Plus or above — Go has no coding quota. Weekly limits were removed for new members; quotas now use a rolling 5-hour window within a monthly cap.', purchaseUrl: 'https://www.kimi.com/code',
  plans: [
    { name: 'Free', badge: 'Free', price: '¥0', unit: '/mo', features: ['No Kimi Code quota — coding starts at Plus', '1 concurrent Agent task', '2 projects · 500MB storage', '2 scheduled tasks', 'K3 requires Plus+'], audience: 'Casual users and newcomers' },
    { name: 'Go', price: '¥49', unit: '/mo', discount: '¥39/mo annually (¥468/yr)', features: ['No Kimi Code quota — coding starts at Plus (¥99)', 'Other Kimi membership benefits (website builder, docs, PPT)', '20 projects · 20GB storage', '4x priority queue'], audience: 'Individual developers who mainly use Kimi chat' },
    { name: 'Plus', badge: 'Recommended · Kimi Code', price: '¥99', unit: '/mo', discount: '¥79/mo annually (¥948/yr)', features: ['Kimi Code included: Kimi K3 (2.8T params) + K3-256K', 'K2.7 / K2.8 coding models', '2 concurrent Agents · 4x speed', 'Cluster · 2 subtasks · Dream memory', 'Kimi CLI / Claude Code / Roo Code'], audience: 'Daily high-frequency coders', featured: true },
    { name: 'Pro', badge: '1M context · high speed', price: '¥199', unit: '/mo', discount: '¥159/mo annually (¥1,908/yr)', features: ['K3 with 1M-token context', 'kimi-for-coding-highspeed (K2.7 Code, 5-6x)', 'Agent cluster 40x/mo', '4 cluster subtasks · Goal Mode', '10 Kimi Claw group chats'], audience: 'Heavy agent workflows' },
    { name: 'Max', badge: 'Top tier', price: '¥699', unit: '/mo', discount: '¥559/mo annually (¥6,708/yr) · saves ¥1,680', features: ['Everything in Pro', '4 concurrent Agents · 8 cluster subtasks', '10 Kimi Claw group chats', 'Goal Mode · Cloud / Android / Desktop'], audience: 'Power users and teams' },
  ],
  sections: [{ title: 'Member benefits', description: 'Coding is only the start.', cards: [
    { icon: '💻', title: 'Kimi Code', description: 'K3 / K2.7 / K2.8 for generation, refactoring and debugging.' },
    { icon: '🌐', title: 'AI Website builder', description: 'Spin up site prototypes and landing pages.' },
    { icon: '📄', title: 'AI Docs', description: 'Generate technical and API documentation.' },
    { icon: '📊', title: 'AI PPT', description: 'Quickly build shareable presentations.' },
  ] }, { title: 'New membership system', headingLevel: 3, warning: 'Official announcement: "Kimi membership new plans are officially released, pricing unchanged". New members have no weekly quota limit — only a rolling 5-hour window — while the monthly total still applies and the Kimi Code quota freezes once it is reached. Go has no coding quota; Plus and above can use Kimi Code. Existing subscribers are unaffected and keep their old plans.', highlights: ['Old tier names Adagio / Andante / Moderato / Allegretto / Allegro map to Free / Go / Plus / Pro / Max at unchanged prices', 'Kimi Code: Andante+ to Plus+; K3: Moderato+ to Plus+; K3 1M context and high speed: Allegretto+ to Pro+', 'Extra Usage top-ups cover overage: from ¥25 per top-up, up to 10 per day and ¥3,000 per day, ¥10,000 balance cap, never expires', 'All devices and API keys share the same quota'] }],
  tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'],
  contentOrder: ['models', 'plans', 'section:0', 'section:1', 'tools', 'faq'],
  faqs: [
    { question: 'Which tier unlocks Kimi K3?', answer: 'K3 is included from Plus (¥99/mo), together with the K3-256K budget variant; Go and Free have no Kimi Code quota at all. K3 with 1M-token context and the high-speed coding model need Pro (¥199/mo) or Max.' },
    { question: 'What is K3-256K?', answer: 'A model ID (k3-256k) that returns identical results to K3 within 256K context while consuming roughly half the quota. It does not support video input. Use it for daily and single-file tasks to save quota; the full 1M-context K3 consumes about 2x.' },
    { question: 'What changed with the new membership system?', answer: 'The new plans are live at unchanged pricing: Free ¥0, Go ¥49, Plus ¥99, Pro ¥199, Max ¥699 (annual billing saves up to ¥1,680). Weekly quota limits are removed for new members — only a rolling 5-hour window remains, inside a monthly cap. Kimi Code starts at Plus, and existing subscribers keep their old plans (Adagio / Andante / Moderato / Allegretto / Allegro map to Free / Go / Plus / Pro / Max).' },
    { question: 'How does the quota refresh?', answer: 'New memberships no longer refresh on a weekly cycle: quotas use a rolling 5-hour frequency window against a monthly total, and the Kimi Code quota freezes once the monthly cap is reached. All devices and API keys share the same quota; unused quota does not roll over.' },
    { question: 'What is the Extra Usage top-up?', answer: 'Extra Usage is a pay-as-you-go balance that covers usage after the subscription quota is exhausted. Top-ups start at ¥25 each, up to 10 per day with a daily cumulative ¥3,000, and a ¥10,000 balance cap; the balance never expires, can be stacked, and is shared with Kimi on the web.' },
    { question: 'What are Agent clusters?', answer: 'Available from Plus: Pro gets 40 cluster runs/mo with 4 subtasks; Max gets 8 subtasks and 4 parallel Agents.' },
    { question: 'Which tools are supported?', answer: 'Kimi CLI, Kimi Code for VS Code, Claude Code and Roo Code, all sharing the same plan quota. The API speaks both OpenAI and Anthropic protocols — api.kimi.ai/coding overseas and api.kimi.com/coding in China.' },
  ],
})

const qwen = definePlan({
  slug: 'qwen', accent: 'orange', availability: 'active',
  seo: { title: 'Alibaba Coding Plan 2026: Qwen Token Plan from ¥39/mo', description: 'How much is the Alibaba Coding Plan? Now the Qwen Token Plan: ¥39 / ¥139 / ¥499 monthly with monthly Credits (11,500-180,000), Qwen3.8-Max on the 0902 snapshot and 18+ multimodal models sharing one pool. 12 new Harness benefits, overage at 12% off. Limited-time night rate: 40% of normal Credits from 22:00.', canonical: 'https://codingplan.org/en/plans/qwen', locale: 'en', ogType: 'article' },
  hero: { badge: 'Alibaba Cloud · Qwen', title: 'Qwen Token', highlight: 'Plan Guide', description: 'The request-based Coding Plan is now a Credits-based Token Plan: Qwen3.8-Max (2.4T, 1M context, 0902 snapshot) is generally available, joined by qwen3.8-flash, deepseek-v4-pro-0813, Kimi-K3 and the image / audio families in one Credits pool. Personal plans start at ¥39/mo with monthly Credits and 12 Harness benefits; night calls run at a limited-time 40% rate from 22:00.', stats: [{ value: '¥39', label: 'Early-bird entry' }, { value: '180,000', label: 'Pro Credits/mo' }, { value: '18+', label: 'Multimodal models' }, { value: '8', label: 'Agents (Pro)' }] },
  modelsTitle: 'Models', modelsDescription: 'Qwen3.8-Max on the 0902 snapshot, plus qwen3.8-flash, deepseek-v4-pro-0813, Kimi-K3, GLM-5.2 and the Qwen vision / image / audio families.',
  models: [
    { icon: '☁️', name: 'Qwen3.8-Max (0902 snapshot)', description: 'Alibaba\u2019s 2.4T next-generation flagship on the 0902 snapshot release, generally available (the preview was retired; old model IDs auto-route). 1M context; officially described as capable of autonomous coding for days to deliver complete projects.', badge: 'GA \u00b7 0902' },
    { icon: '💨', name: 'qwen3.8-flash (new)', description: 'The new low-cost high-speed tier of the Qwen3.8 family.', badge: 'New' },
    { icon: '🧠', name: 'deepseek-v4-pro-0813', description: 'DeepSeek-V4-Pro 0813 version snapshot, newly added.', badge: 'New' },
    { icon: '⌨️', name: 'qwen3.7-max / qwen3.7-plus', description: 'Qwen3.7 reasoning and general-purpose flagships.' },
    { icon: '🎨', name: 'qwen-image-3.0-pro / audio family', description: 'Image generation (qwen-image-3.0-pro) plus real-time audio models (Qwen3-TTS-Flash, Cosyvoice-V3-Flash, Fun-ASR) and wan2.7 image / happyhorse-1.1 video, all sharing the same Credits.', badge: 'Night 40% rate' },
    { icon: '🧩', name: 'Kimi-K3 / GLM-5.2 / Qwen3-VL-Plus', description: 'Third-party flagships Kimi-K3 and GLM-5.2 plus the Qwen3-VL-Plus vision model are part of the pool, sharing the same Credits.' },
  ],
  plansTitle: 'Personal plans', plansDescription: 'Early-bird prices (Lite 35% / Standard 23% / Pro 17% off) with monthly Credits (11,500 / 45,000 / 180,000). 12 Harness benefits, an 88% over-limit rate and team seats are also available.', purchaseUrl: 'https://www.alibabacloud.com/en/campaign/ai-scene-coding?_p_lc=1',
  plans: [
    { name: 'Lite', badge: 'Entry ¥39/mo', price: '¥39', unit: '/mo', discount: '11,500 Credits/mo · elastic overage', features: ['11,500 Credits per month', '1-2 concurrent Agents', 'All multimodal models share the quota', 'Night rate: 40% of normal Credits (limited time)'], audience: 'Light users and first-timers' },
    { name: 'Standard', badge: 'Recommended', price: '¥139', unit: '/mo', discount: '45,000 Credits/mo · 12 Harness benefits', features: ['45,000 Credits per month', '3-4 concurrent Agents', 'All Lite benefits', 'Night rate: 40% of normal Credits (limited time)'], audience: 'Daily development workhorse', featured: true },
    { name: 'Pro', badge: 'Heavy duty', price: '¥499', unit: '/mo', discount: '180,000 Credits/mo · overage 12% off', features: ['180,000 Credits per month', '6-8 concurrent Agents', 'All Standard benefits', 'Night rate: 40% of normal Credits (limited time)'], audience: 'Heavy and multi-Agent workloads' },
  ],
  comparison: { title: 'Tier comparison', columns: ['Tier', 'Monthly', 'Credits/mo', 'Agents', 'Notes'], featuredColumn: 2, rows: [
    ['Lite', '¥39', '11,500', '1-2', 'Elastic overage'],
    ['Standard', '¥139', '45,000', '3-4', '12 Harness benefits'],
    ['Pro', '¥499', '180,000', '6-8', 'Overage 12% off'],
    ['Team standard seat', '¥150+', '25,000', '—', 'List ¥198'],
    ['Team advanced seat', '¥550+', '100,000', '—', 'List ¥698'],
    ['Team premium seat', '¥1,398', '250,000', '—', '—'],
  ] },
  sections: [{ title: 'Quota and access rules', warning: 'Early-bird prices are limited-time, and so is the night rate: from 22:00, Qwen3.8-Max and Flash deduct Credits at 40% (60% off). Over-limit calls are billed at 88%. A dedicated sk-sp- API Key and Base URL are required; generic Bailian keys do not deduct plan Credits.', cards: [
    { icon: '⏱️', title: 'Monthly Credits', description: 'Personal plans now grant Credits monthly — Lite 11,500, Standard 45,000, Pro 180,000 — replacing the old 7-day window.' },
    { icon: '🌙', title: 'Limited-time night rate', description: 'From 22:00, Qwen3.8-Max and Flash consume Credits at 40% of the normal rate (a limited-time 60% discount) — schedule heavy jobs accordingly.' },
    { icon: '🔐', title: 'No training', description: 'In-plan calls are not used for model training.' },
    { icon: '🧰', title: '12 Harness benefits', description: 'Personal plans add 12 Harness benefits that bundle more models and agent capabilities into one subscription.' },
    { icon: '💳', title: 'Over-limit rate & top-ups', description: 'Over-limit calls are charged at 88% (12% off). Top-up packs: self-developed MCP ¥10, knowledge base (RAG) ¥20, AutoModel ¥20, personal usage pack ¥100, team usage pack ¥5,000.' },
    { icon: '📦', title: 'Bundle deals', description: 'Token Plan × Qoder CN: ¥98 (Token Plan Lite ¥39 + Qoder personal Pro ¥59) and ¥308 (Token Plan Standard ¥139 + Qoder personal Pro+ ¥169).' },
  ] }, { title: 'What happened to the old Coding Plan', headingLevel: 3, highlights: ['The request-count based Coding Plan (Lite ¥40 / Pro ¥200) was upgraded to the Credits-based Token Plan', 'The old Lite discontinuation and daily 9:30 restock model no longer applies', 'Existing users migrate per official guidance; historical quotas follow the order page'] }],
  tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'OpenCode'],
  contentOrder: ['models', 'plans', 'comparison', 'section:0', 'section:1', 'faq'],
  faqs: [
    { question: 'How is Token Plan different from the old Coding Plan?', answer: 'Alibaba Cloud upgraded the request-count based Coding Plan into a Credits-based Token Plan: models expanded from Qwen3.5 to 18+ flagship multimodal models led by Qwen3.8-Max (0902 snapshot) — plus qwen3.8-flash, deepseek-v4-pro-0813, Kimi-K3, GLM-5.2 and vision / image / audio families — with monthly Credits, 12 Harness benefits and personal/team versions.' },
    { question: 'Which personal tier should I pick?', answer: 'Lite ¥39/mo (11,500 Credits/mo) for light use, Standard ¥139/mo (45,000 Credits/mo, ~3.9x Lite) as the daily workhorse with the 12 Harness benefits, Pro ¥499/mo (180,000 Credits/mo, ~15.7x Lite) for heavy multi-Agent workloads with overage billed at 12% off.' },
    { question: 'How are Credits consumed?', answer: 'Each model has its own Credits rate, accumulated monthly. From 22:00, Qwen3.8-Max and Flash consume Credits at a limited-time 40% rate (60% off), and over-limit calls are billed at 88%.' },
    { question: 'Is there a team version?', answer: 'Yes — team seats: Standard ¥150/seat/mo (list ¥198, 25,000 Credits/mo), Advanced ¥550 (list ¥698, 100,000) and Premium ¥1,398 (250,000), with a 29-model pool for centralized company billing; the team tiers were cut in price.' },
    { question: 'What are the Harness benefits and the over-limit rate?', answer: 'Personal plans add 12 Harness benefits that bundle more models and agent capabilities into one subscription, and over-limit calls are charged at 88% (12% off). Top-up packs are also available: self-developed MCP ¥10, knowledge base (RAG) ¥20, AutoModel ¥20, personal usage pack ¥100 and team usage pack ¥5,000.' },
    { question: 'Are there bundle deals?', answer: 'Yes. Token Plan × Qoder CN bundles: ¥98 (Token Plan Lite ¥39 + Qoder personal Pro ¥59) and ¥308 (Token Plan Standard ¥139 + Qoder personal Pro+ ¥169).' },
    { question: 'What happened to the 9:30 AM restock?', answer: 'It no longer applies. The limited-restock model of the old Coding Plan Pro was retired with the upgrade; Token Plan can be subscribed directly.' },
    { question: 'Is there a refund policy?', answer: 'Activated plans are generally non-refundable. Confirm the rules before purchase.' },
  ],
})

const opencodeGo = definePlan({
  slug: 'opencode-go', accent: 'slate', availability: 'active',
  seo: { title: 'OpenCode Go Guide 2026 - $10/mo, 32 Open Models at 6x Value', description: 'OpenCode Go subscription: $10/month with 6x usage value (the first-month $5 promo was removed Aug 24). 32 open models including the new Space Bunny Free (limited-time, unlimited), GPT 6 Luna, DeepSeek V4.1 Flash (4x usage), MiMo-V2.6-Flash and Muse Spark 1.3 Contributor, plus Kimi K3, GLM-5.3-Flash, Qwen3.7 Plus and MiniMax M3. Dollar-based limits ($12/5h, $30/week, $60/month), OpenAI/Anthropic compatible APIs work with any agent.', canonical: 'https://codingplan.org/en/plans/opencode-go', locale: 'en', ogType: 'article' },
  hero: { badge: 'OpenCode · Anomaly', title: 'OpenCode Go', highlight: 'Plan Guide', description: 'Low-cost subscription for open coding models: $10/month with about 6x the subscription value in usage. A curated lineup of 32 tested open models works with OpenCode or any compatible agent. Note: the first-month $5 promo was removed on Aug 24.', stats: [{ value: '32', label: 'Models' }, { value: '$10', label: 'Per month' }, { value: '6x', label: 'Usage value' }, { value: '6,500', label: 'V4.1 Flash 5h requests' }] },
  modelsTitle: 'Models', modelsDescription: '32 open models, all tested and benchmarked for agentic coding. Latest additions: Space Bunny Free (a limited-time anonymous model), GPT 6 Luna, DeepSeek V4.1 Flash (limited-time 4x usage), MiMo-V2.6-Flash, Muse Spark 1.3 Contributor and Kimi K2.7 Code.',
  models: [
    { icon: '🐙', name: 'Grok 4.6', description: 'xAI flagship (upgraded from 4.5), one of the strongest open coding models; ~169 requests per 5h.', badge: 'Flagship' },
    { icon: '🔷', name: 'GLM-5.3 / GLM-5.3-Flash', description: 'Zhipu\u2019s flagship and multimodal variant. GLM-5.3 ~220 requests/5h; GLM-5.3-Flash is the volume leader at ~6,320 requests/5h.', badge: 'High volume' },
    { icon: '🌟', name: 'Kimi K3', description: 'Moonshot flagship (2.8T params, 1M context); ~110 requests per 5h.' },
    { icon: '🌙', name: 'Kimi K2.7 Code', description: 'Moonshot’s high-volume coding model; ~1,350 requests per 5h.' },
    { icon: '☁️', name: 'Qwen3.8 Max / Flash', description: 'Alibaba\u2019s flagship and the new Flash tier; ~160 and ~5,400 requests per 5h respectively.' },
    { icon: '🐋', name: 'DeepSeek V4 Pro / V4.1 Flash', description: 'V4 Pro ~3,450 requests/5h; V4.1 Flash ~6,500 with a limited-time 4x usage boost, and peak/off-peak pricing (off-peak is half price). V4 Flash Vision handles images.', badge: 'Limited 4x usage' },
    { icon: '🔥', name: 'MiniMax M3', description: 'Multimodal flagship; ~3,200 requests per 5h.' },
    { icon: '⚡', name: 'MiMo-V2.6-Flash', description: 'Xiaomi\u2019s ultra-cheap open model; ~30,100 requests per 5h.', badge: 'Best value' },
    { icon: '🤖', name: 'Hy3', description: 'High-performance open model (8x usage marked); ~4,300 requests per 5h.' },
    { icon: '🧠', name: 'GPT 6 Luna', description: 'OpenAI’s new open model (released Sep 22, 2026); ~4,230 requests per 5h.' },
    { icon: '✨', name: 'LongCat-2.0 / Muse Spark 1.3', description: 'LongCat-2.0 ~11,400 requests/5h; Muse Spark 1.3 Contributor (region-limited) ~45,300 requests/5h.' },
    { icon: '🐰', name: 'Space Bunny Free', description: 'A limited-time anonymous model with unlimited requests.', badge: 'Unlimited · Limited time' },
  ],
  plansTitle: 'Plans', plansDescription: 'A single $10/mo tier with 6x usage value. Top up credit if needed, cancel anytime. The first-month $5 promo was removed on Aug 24.', purchaseUrl: 'https://opencode.ai/go?ref=JBT5KJRCD4',
  plans: [
    { name: 'Go', badge: '$10/mo', price: '$10', unit: '/mo', discount: 'Top up credit anytime · No lock-in', features: ['$12 / 5h · $30 / week · $60 / month usage', '32 curated open models (Kimi K3, GLM-5.3-Flash, GPT 6 Luna, DeepSeek V4.1 Flash...)', 'OpenAI / Anthropic compatible APIs, any agent', 'Fall back to Zen balance when limits are reached', 'No training on your data, 0-day retention for most models', 'Cancel any time'], audience: 'Developers who want the strongest open models at the lowest cost, and heavy agent users', featured: true, recommended: true, ctaLabel: 'Subscribe to Go →' },
  ],
  comparison: { title: 'Model usage', description: 'Estimated requests at typical usage patterns (per 5h / week / month).', columns: ['Model', '5 hours', 'Weekly', 'Monthly'], featuredColumn: 1, rows: [
    ['Space Bunny Free', 'Unlimited', 'Unlimited', 'Unlimited'],
    ['Muse Spark 1.3', '45,300', '113,250', '226,500'],
    ['MiMo-V2.6-Flash', '30,100', '75,200', '150,400'],
    ['LongCat-2.0', '11,400', '28,500', '57,000'],
    ['DeepSeek V4.1 Flash', '6,500', '16,250', '26,000'],
    ['GLM-5.3-Flash', '6,320', '15,800', '31,600'],
    ['Qwen3.8 Flash', '5,400', '13,500', '27,000'],
    ['Qwen3.7 Plus', '4,300', '10,800', '21,600'],
    ['Hy3 (8x)', '4,300', '10,750', '21,500'],
    ['GPT 6 Luna', '4,230', '10,575', '21,150'],
    ['DeepSeek V4 Pro', '3,450', '8,550', '17,150'],
    ['MiniMax M3', '3,200', '8,000', '16,000'],
    ['Kimi K2.7 Code', '1,350', '3,375', '6,750'],
    ['GLM-5.3', '220', '550', '1,100'],
    ['Grok 4.6', '169', '420', '840'],
    ['Qwen3.8 Max', '160', '400', '810'],
    ['Kimi K3', '110', '250', '490'],
  ] },
  sections: [
    { title: 'Usage limits', warning: 'Limits are dollar-based: $12 per 5h, $30 per week, $60 per month. Expensive models consume budget faster. Free models remain available after you hit limits. DeepSeek V4 models use peak/off-peak pricing (2x during peak windows).', cards: [
      { icon: '⏱️', title: 'Rolling 5-hour', description: '$12 of usage per rolling 5-hour window.' },
      { icon: '📅', title: 'Weekly', description: '$30 per week, reset weekly, no rollover.' },
      { icon: '🗓️', title: 'Monthly', description: '$60 per month - about 6x your $10 subscription.' },
      { icon: '💳', title: 'Balance fallback', description: 'Enable "Use balance" in the console to continue from your Zen balance after limits.' },
    ] },
    { title: 'How to connect', headingLevel: 3, highlights: ['Sign in at opencode.ai, subscribe to Go and copy your API key', 'In the OpenCode TUI run /connect, pick OpenCode Go, paste your key', 'Model IDs use the format opencode-go/<model-id> (e.g. opencode-go/kimi-k3)', 'OpenAI / Anthropic / Responses compatible endpoints work with Claude Code, Cursor and more', 'Web search is enabled when using the OpenCode Go provider (since Aug 20)'] },
    { title: 'Privacy', headingLevel: 3, highlights: ['No model is used for training', 'Most models have 0-day data retention (GLM, Kimi, Qwen, DeepSeek, MiniMax, MiMo)', 'Grok 4.6 and GPT 6 Luna retain 30 days (abuse monitoring)', 'DeepSeek V4.1 Flash zero-data-retention agreement renews monthly'] },
  ],
  tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'Kilo Code', 'Cherry Studio'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'section:1', 'section:2', 'faq', 'final-cta'],
  finalCta: { title: 'Subscribe to OpenCode Go now', label: 'Go to opencode.ai/go →', href: 'https://opencode.ai/go?ref=JBT5KJRCD4' },
  faqs: [
    { question: 'What is OpenCode Go?', answer: 'OpenCode Go is Anomaly\u2019s low-cost subscription for open coding models: $10/month, giving about 6x the subscription value in usage across 32 curated open models, usable in OpenCode or any OpenAI/Anthropic compatible agent.' },
    { question: 'Is the first month still $5?', answer: 'No. OpenCode removed the Go first-month $5 discount on Aug 24 (changelog v1.18.24). The plan is now a flat $10/month, cancelable anytime.' },
    { question: 'How do usage limits work?', answer: 'Limits are dollar-based: $12 per 5 hours, $30 per week, $60 per month. Request counts depend on model price - DeepSeek V4.1 Flash allows ~6,500 requests/5h while Kimi K3 allows ~110. After limits you can fall back to Zen balance or free models.' },
    { question: 'Which models are included?', answer: '32 models now, including Kimi K3, Kimi K2.7 Code, MiniMax M3, GPT 6 Luna, Qwen3.7 Plus, GLM-5.3-Flash, DeepSeek V4.1 Flash (a limited-time 4x usage boost), MiMo-V2.6-Flash, Muse Spark 1.3 Contributor and Space Bunny Free (a limited-time anonymous model with unlimited requests). Grok 4.6, Qwen3.8 Max/Flash, Hy3, LongCat-2.0 and DeepSeek V4 Pro round out the list, which keeps growing.' },
    { question: 'Is my data used for training?', answer: 'No model uses your data for training. Most models keep 0-day retention; Grok 4.6 and GPT 6 Luna keep 30 days of logs for abuse monitoring.' },
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
