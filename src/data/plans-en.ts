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
  seo: { title: 'Claude Code Plan Guide 2026 - Pro $20, Max 5x $100, Max 20x $200', description: 'Anthropic Claude Code pricing guide: Pro $20/mo, Max 5x $100/mo, Max 20x $200/mo. Claude Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5 models, usage multipliers, extended thinking and MCP support compared side by side.', canonical: 'https://codingplan.org/en/plans/claude', locale: 'en', ogType: 'article' },
  hero: { badge: 'Anthropic · Claude Code', title: 'Claude Code', highlight: 'Plan Guide', description: 'The gold standard for AI coding. Pro at $20/mo gives you Claude Opus 5, Sonnet 5, Fable 5 and extended thinking in the terminal, IDE and web. Max tiers multiply usage 5x-20x with priority access.', stats: [{ value: '$20', label: 'Pro / month' }, { value: '4', label: 'Model families' }, { value: '20x', label: 'Max multiplier' }, { value: '200K', label: 'Context' }] },
  modelsTitle: 'Models', modelsDescription: 'Current lineup: Fable 5, Opus 5, Sonnet 5 and Haiku 4.5 — all available on Pro and Max plans with usage limits scaling per tier.',
  models: [
    { icon: '🏆', name: 'Claude Fable 5', description: 'Anthropic\u2019s top-tier model for long-running agents; the most expensive tier ($10/$50 per million tokens). Available on Max plans via usage credits.', badge: 'Top tier' },
    { icon: '🧠', name: 'Claude Opus 5', description: 'Flagship for complex agentic coding and enterprise work, released 2026-07-24. A step-change improvement for long-horizon tasks; a faster 2x-price mode is also available.', badge: 'Flagship' },
    { icon: '⚡', name: 'Claude Sonnet 5', description: 'High-performance coding and agent model (released 2026-06-30). Balanced speed and capability for daily workloads.', badge: 'Balanced' },
    { icon: '🌱', name: 'Claude Haiku 4.5', description: 'Fastest and cheapest tier, ideal for quick iterations and code completion.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Pro for individuals, Max for heavy usage with multipliers and priority access. Annual billing saves ~15%. Free tier now includes unlimited chat with basic models.', purchaseUrl: 'https://claude.com/pricing',
  plans: [
    { name: 'Pro', price: '$20', unit: '/mo', discount: '$17/mo billed annually (-15%)', features: ['Claude Code & Cowork', 'All model families: Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5', 'Unlimited projects', 'Cross-conversation memory', 'Extended thinking & MCP support'], audience: 'Individual developers who want the best model quality for daily coding' },
    { name: 'Max 5x', badge: 'Popular', price: '$100', unit: '/mo', discount: '5x Pro usage', features: ['5x Pro usage limits', 'Priority access during peak hours', 'Higher output limits', 'All Pro features'], audience: 'Heavy users who hit Pro limits regularly', featured: true },
    { name: 'Max 20x', badge: 'Top tier', price: '$200', unit: '/mo', discount: '20x Pro usage', features: ['20x Pro usage limits', 'Early access to new features', 'Peak-hour priority', 'Fable 5 usage credits'], audience: 'Professional teams and extremely heavy usage patterns' },
  ],
  comparison: { title: 'Plan comparison', description: 'Usage is measured relative to Pro baseline limits on a 5-hour rolling window plus a weekly cap.', columns: ['Tier', 'Price', 'Usage', 'Peak priority', 'Early features'], featuredColumn: 1, rows: [
    ['Pro', '$20/mo', '1x', 'No', 'No'],
    ['Max 5x', '$100/mo', '5x', 'Yes', 'No'],
    ['Max 20x', '$200/mo', '20x', 'Yes', 'Yes'],
  ] },
  sections: [
    { title: 'Why Claude Code?', cards: [
      { icon: '🏆', title: 'Gold standard quality', description: 'Opus 5 and Fable 5 consistently rank at the top of coding benchmarks for agentic tasks.' },
      { icon: '🧩', title: 'MCP support', description: 'Model Context Protocol lets you plug in tools, memory and data sources.' },
      { icon: '💭', title: 'Extended thinking', description: 'Opus 5 reasons step by step on complex problems before answering.' },
      { icon: '🌐', title: 'New in August', description: 'Cowork built-in browser (Aug 25), Claude in Chrome GA, and cross-product memory on by default; text watermarking enabled by default since Aug 2.' },
    ] },
  ],
  tools: ['Terminal', 'VS Code', 'JetBrains', 'Web', 'Cowork', 'Chrome'],
  toolsTitle: 'Where to use Claude Code',
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'What is the difference between Pro and Max?', answer: 'Pro ($20/mo) covers individual usage with all model families. Max 5x ($100/mo) gives 5x Pro usage with priority access; Max 20x ($200/mo) gives 20x usage, early feature access and Fable 5 usage credits. Annual billing saves about 15% on Pro.' },
    { question: 'Which models are included?', answer: 'All plans include Claude Fable 5, Opus 5, Sonnet 5 and Haiku 4.5. Limits apply per model tier; Opus 5 is the flagship for agentic coding while Fable 5 targets long-running agents at a higher consumption rate.' },
    { question: 'Does Claude Code work in my editor?', answer: 'Yes. Claude Code runs in the terminal, VS Code, JetBrains IDEs, and as Claude Cowork on the web and desktop. Claude in Chrome is also generally available for paid plans.' },
    { question: 'Is there a free tier?', answer: 'Yes. The free tier now includes unlimited chat with basic models, code/data visualization, web search and cross-conversation memory. The Pro plan at $20/mo is the standard entry point for Claude Code.' },
    { question: 'Can I get a refund?', answer: 'Anthropic generally does not refund activated subscriptions. Start with Pro to evaluate before upgrading to Max.' },
  ],
})

const glm = definePlan({
  slug: 'glm', accent: 'blue', availability: 'active',
  seo: { title: 'GLM Coding Plan Guide 2026 - $18/mo from Z.ai, GLM-5.3 & 5.3-Flash', description: 'Zhipu GLM Coding Plan (Z.ai) pricing: Lite $18/mo, Pro $80/mo, Max $168/mo (yearly -30%). GLM-5.3 flagship plus GLM-5.3-Flash (native multimodal, live Aug 26, near Claude Opus 4.8 coding). Dual-window Credits (5h 2K/12K/28K + weekly 10K/60K/140K), 50% off-peak deduction, 4 built-in MCP tools.', canonical: 'https://codingplan.org/en/plans/glm', locale: 'en', ogType: 'article' },
  hero: { badge: 'Zhipu AI · Z.ai', title: 'GLM Coding', highlight: 'Plan Guide', description: 'GLM-5.3 (Terminal-Bench 3.0 #1 open-source) and the new GLM-5.3-Flash (native multimodal, live Aug 26, coding near Claude Opus 4.8) are available on all tiers. Credits refresh on a 5-hour + weekly dual window, with 50% off-peak deduction; quarterly 20% and yearly 30% discounts.', stats: [{ value: '$18', label: 'Entry / month' }, { value: '2K-28K', label: 'Credits / 5h' }, { value: '5.3-Flash', label: 'New multimodal' }, { value: '50%', label: 'Off-peak deduction' }] },
  modelsTitle: 'Models', modelsDescription: 'All plans support GLM-5.3 and GLM-5.3-Flash; calls to legacy models are auto-routed to the new versions.',
  models: [
    { icon: '🚀', name: 'GLM-5.3', description: 'Newest flagship, live for all users since Aug 14. Same base as 5.2 with post-training scaling: +50% coding on Z.ai Code Bench, #1 open-source on Terminal-Bench 3.0 (28.3), DeepSWE v1.1 at 66.9. Weights released on HuggingFace Aug 28.', badge: 'Terminal-Bench #1 open-source' },
    { icon: '⚡', name: 'GLM-5.3-Flash', description: 'Live Aug 26: the first natively multimodal model in the GLM-5 family (320B total / 18B active params, hybrid linear+sparse attention). DeepSWE v1.1 at 63.4 beats GLM-5.2; coding/agent near Claude Opus 4.8. Consumes 3x the usage of GLM-5.3 (lower Credits rate). Weights open-sourced under MIT.', badge: 'New · native multimodal' },
    { icon: '🔁', name: 'Legacy auto-routing', description: 'Calls to GLM-5.2 / GLM-5.1 automatically switch to GLM-5.3; GLM-5-Turbo / GLM-4.7 switch to GLM-5.3-Flash — no config change needed.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Monthly prices with quarterly 20% / yearly 30% off. Credits refresh on a 5-hour + weekly dual window; off-peak usage (outside Mon-Fri 14:00-18:00 UTC+8) deducts 50%.', purchaseUrl: 'https://z.ai/subscribe?ic=Q2I4GGSKVU',
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
    { icon: '🎁', title: 'Limited promos', description: 'ZCode 1.5x plan limits until Aug 31; invite program returns 10-20% Credits (overseas).' },
    { icon: '🔓', title: 'Open weights', description: 'GLM-5.3-Flash weights are open under MIT; GLM-5.3 flagship weights landed on HuggingFace Aug 28.' },
  ] }],
  tools: ['ZCode', 'Claude Code', 'Cursor', 'OpenClaw', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'What is the current GLM Coding Plan price?', answer: 'Lite $18/mo (yearly $12.6/mo), Pro $80/mo (yearly $56/mo), Max $168/mo (yearly $117.6/mo). Quarterly billing gives 20% off, yearly 30% off.' },
    { question: 'How do Credits work?', answer: 'Credits refresh on a dual window: 5-hour (Lite 2,000 / Pro 12,000 / Max 28,000) plus weekly (10,000 / 60,000 / 140,000). Off-peak usage (outside Mon-Fri 14:00-18:00 UTC+8) deducts 50% fewer Credits; flagship models consume Credits faster.' },
    { question: 'What is GLM-5.3-Flash?', answer: 'A new model live Aug 26: the first natively multimodal model in the GLM-5 family (320B total / 18B active parameters). DeepSWE v1.1 at 63.4 beats GLM-5.2 and coding/agent capability approaches Claude Opus 4.8. It uses 3x the usage of GLM-5.3 (a lower Credits rate) and its weights are open-sourced under MIT.' },
    { question: 'Which models are included?', answer: 'All tiers support GLM-5.3 (Terminal-Bench 3.0 #1 open-source) and GLM-5.3-Flash (native multimodal). Calls to legacy GLM-5.2/5.1 auto-route to GLM-5.3, and GLM-5-Turbo/4.7 auto-route to GLM-5.3-Flash.' },
    { question: 'Are the weights open-source?', answer: 'Yes. GLM-5.3-Flash weights are open under MIT, and the GLM-5.3 flagship weights were released on HuggingFace on Aug 28 as promised (two weeks after launch).' },
    { question: 'Do MCP tools cost extra?', answer: 'No. Visual understanding, web search, web reading and open-source repo MCP tools are included in every tier.' },
  ],
})

const minimax = definePlan({
  slug: 'minimax', accent: 'orange', availability: 'active',
  seo: { title: 'MiniMax Token Plan Guide 2026 - M3 from $22/mo, 3 Tiers Compared', description: 'MiniMax Token Plan international pricing: Plus $22, Max $55, Ultra $132 per month (~1.7B/5.1B/12.5B tokens). M3 flagship with native multimodal and 1M context, 2 months free on annual billing. Music models discontinued Aug 20; H3 open-sourced Aug 3.', canonical: 'https://codingplan.org/en/plans/minimax', locale: 'en', ogType: 'article' },
  hero: { badge: 'MiniMax · Token Plan', title: 'MiniMax Token', highlight: 'Plan Guide', description: 'M3 flagship with native multimodal input and 1M context. Three international tiers now on sale (Plus $22 / Max $55 / Ultra $132 — the legacy Starter and Max HS tiers were retired). Annual billing gives 2 months free; invite promos run until Aug 31.', stats: [{ value: '$22', label: 'Entry / month' }, { value: '3', label: 'Tiers' }, { value: '12.5B', label: 'Ultra tokens/mo' }, { value: '1M', label: 'Context' }] },
  modelsTitle: 'Models', modelsDescription: 'M3, M2.7 and H3 share the same monthly token quota. Music models were discontinued on Aug 20.',
  models: [
    { icon: '🚀', name: 'MiniMax M3', description: 'Flagship model with native multimodal input (image & video), 1M context, ideal for large codebases.', badge: 'Flagship' },
    { icon: '⚡', name: 'M2.7 / M2.7-highspeed', description: 'Shares monthly quota with M3. Standard ~50 TPS, high-speed ~100+ TPS.', badge: 'High speed' },
    { icon: '🤖', name: 'MiniMax H3', description: 'Reasoning and agent-orchestration model sharing quota with M3; open-sourced on Aug 3.', badge: 'Open source' },
    { icon: '🎨', name: 'Image / Speech family', description: 'M2.5 and Speech 2.8 share the same monthly quota. Note: all Music models were discontinued on Aug 20, 2026 (the open-source MiniMax-Music3 remains on HuggingFace).' },
  ],
  plansTitle: 'Plans', plansDescription: 'Monthly token usage model. Annual billing = 2 months free. Legacy Starter ($10) and Max HS ($80) tiers are retired and only kept for existing subscribers.', purchaseUrl: 'https://platform.minimax.io/subscribe/token-plan',
  plans: [
    { name: 'Plus', price: '$22', unit: '/mo', discount: '$220/year', features: ['~1.7B tokens/mo (M3)', '3-4 concurrent Agents', 'Multimodal models share quota'], audience: 'Individual developers and daily workflows' },
    { name: 'Max', badge: 'Top pick', price: '$55', unit: '/mo', discount: '$550/year', features: ['~5.1B tokens/mo', '4-5 concurrent Agents', 'Hailuo 2.3 video: 3/day'], audience: 'Daily professional developers', featured: true },
    { name: 'Ultra', price: '$132', unit: '/mo', discount: '$1,320/year', features: ['~12.5B tokens/mo', '6-7 concurrent Agents', 'Hailuo 2.3 video: 5/day'], audience: 'Multi-project and heavy-usage scenarios' },
  ],
  comparison: { title: 'Tier comparison', columns: ['Tier', 'Monthly', 'Yearly', 'Tokens/mo', 'Agents', 'Video/day'], featuredColumn: 2, rows: [
    ['Plus', '$22', '$220', '~1.7B', '3-4', '—'],
    ['Max', '$55', '$550', '~5.1B', '4-5', '3'],
    ['Ultra', '$132', '$1,320', '~12.5B', '6-7', '5'],
  ] },
  sections: [
    { title: 'Highlights', cards: [
      { icon: '🎥', title: 'Native multimodal', description: 'M3 understands images and videos in addition to text.' },
      { icon: '🤖', title: 'MiniMax Code app', description: 'Official agent app (desktop + web): Token Plan subscribers can use it without an API key.' },
      { icon: '🎁', title: 'Invite promos to Aug 31', description: '10% off for invited friends, 10% voucher rebate for inviters.' },
    ] },
  ],
  tools: ['Claude Code', 'Cursor', 'Cline', 'OpenCode', 'MiniMax Code'],
  contentOrder: ['models', 'plans', 'tools', 'section:0', 'faq'],
  faqs: [
    { question: 'How does the token quota work?', answer: 'Plans use a monthly token-based quota: Plus ~1.7B, Max ~5.1B, Ultra ~12.5B tokens per month for M3 usage. Actual consumption depends on context length; image and speech models share the same quota.' },
    { question: 'What happened to the Starter and Max HS tiers?', answer: 'Both were retired. Starter ($10) and Plus-hs ($40) remain only as legacy tiers for existing subscribers; Max HS ($80) users were migrated to the new Max tier ($55). The current lineup is Plus $22 / Max $55 / Ultra $132.' },
    { question: 'Can I still generate music?', answer: 'No. All Music models stopped serving on Aug 20, 2026 in Token Plan and pay-as-you-go. The open-source MiniMax-Music3 weights are available on HuggingFace for self-hosting.' },
    { question: 'Is annual billing worth it?', answer: 'Annual plans cost $220 (Plus) to $1,320 (Ultra), effectively 2 months free compared to monthly billing.' },
  ],
})

const kimi = definePlan({
  slug: 'kimi', accent: 'purple', availability: 'active',
  seo: { title: 'Kimi Code Plan Guide 2026 - K3 Flagship, 5 Tiers ¥0-¥699', description: 'Kimi Code Plan by Moonshot AI: Adagio free, Andante ¥49, Moderato ¥99, Allegretto ¥199, Allegro ¥699. Kimi K3 flagship (2.8T params, 1M context) with a new K3-256K budget variant unlocked from Moderato. New membership system coming: Kimi and Kimi Code benefits will split.', canonical: 'https://codingplan.org/en/plans/kimi', locale: 'en', ogType: 'article' },
  hero: { badge: 'Moonshot AI · Kimi Code', title: 'Kimi Code', highlight: 'Plan Guide', description: 'Kimi K3 flagship (2.8T parameters, near-frontier coding) is live with a new K3-256K budget variant that halves consumption under 256K context. A new membership system is coming: Kimi and Kimi Code benefits will split; existing subscribers keep combined benefits, and new sign-ups are currently waitlist-only.', stats: [{ value: '5', label: 'Tiers' }, { value: 'K3', label: 'Flagship live' }, { value: '256K', label: 'Budget variant' }, { value: '¥49', label: 'Paid entry' }] },
  modelsTitle: 'Models', modelsDescription: 'Kimi K3 (plus the new K3-256K) and the K2.7 Code family.',
  models: [
    { icon: '🌟', name: 'Kimi K3 (k3 / k3-256k)', description: 'Moonshot\u2019s flagship: 2.8 trillion parameters, up to 1M-token context with low/high/max thinking modes; officially described as the first open 3T-class model, stably ahead of Opus 4.8 and GPT 5.5. The new k3-256k gives identical results within 256K at roughly half the consumption (no video input). Unlocked from Moderato.', badge: 'Moderato+' },
    { icon: '🌙', name: 'Kimi K2.7 Code (+ high-speed)', description: 'Previous workhorse for code completion and routine development, available to all members; the high-speed variant (~5-6x faster) unlocks from Allegretto.' },
  ],
  plansTitle: 'Plans', plansDescription: 'Five tiers cover casual to professional. Annual billing saves up to ¥1,680. Purchase buttons are currently "reserve subscription" while the new membership system is pending.', purchaseUrl: 'https://www.kimi.com/code',
  plans: [
    { name: 'Adagio', badge: 'Free', price: '¥0', unit: '/mo', features: ['Kimi K2.7 / K2 access', '1 concurrent Agent task', '2 projects · 500MB storage', '2 scheduled tasks', 'K3 requires Moderato+'], audience: 'Casual users and newcomers' },
    { name: 'Andante', price: '¥49', unit: '/mo', discount: '¥39/mo annually (¥468/yr)', features: ['~300-1,200 API calls/5h', 'Refreshes every 7 days', '20 projects · 20GB storage', '4x priority queue', 'K3 requires Moderato+'], audience: 'Individual developers' },
    { name: 'Moderato', badge: 'Recommended · K3', price: '¥99', unit: '/mo', discount: '¥79/mo annually (¥948/yr)', features: ['Kimi K3 flagship (2.8T params) + K3-256K', 'Larger token quota', '2 concurrent Agents · 4x speed', 'Cluster · 2 subtasks · Dream memory', 'Kimi CLI / Claude Code / Roo Code'], audience: 'Daily high-frequency coders', featured: true },
    { name: 'Allegretto', price: '¥199', unit: '/mo', discount: '¥159/mo annually (¥1,908/yr)', features: ['K3 + Agent cluster 40x/mo', 'K2.7 Code high-speed (5-6x)', '4 cluster subtasks · Goal Mode', '10 Kimi Claw group chats'], audience: 'Heavy agent workflows' },
    { name: 'Allegro', badge: 'Top · 1M context', price: '¥699', unit: '/mo', discount: '¥559/mo annually (¥6,708/yr)', features: ['K3 with 1M-token conversations', '4 concurrent Agents · 8 cluster subtasks', '10 Kimi Claw group chats', 'Goal Mode · Cloud / Android / Desktop'], audience: 'Power users and teams' },
  ],
  sections: [{ title: 'Member benefits', description: 'Coding is only the start.', cards: [
    { icon: '💻', title: 'Kimi Code', description: 'K3 / K2.7 for generation, refactoring and debugging.' },
    { icon: '🌐', title: 'AI Website builder', description: 'Spin up site prototypes and landing pages.' },
    { icon: '📄', title: 'AI Docs', description: 'Generate technical and API documentation.' },
    { icon: '📊', title: 'AI PPT', description: 'Quickly build shareable presentations.' },
  ] }, { title: 'Subscription status', headingLevel: 3, warning: 'Official banner: "New membership system coming soon" — Kimi benefits and Kimi Code benefits will be split for separate purchase. Existing subscribers are unaffected; buy the current combined-benefit plan before the switch if you want both. New users currently see a "reserve subscription" button rather than direct purchase.', highlights: ['Existing subscribers keep all combined benefits', 'Buying now locks in the current combined plan', 'Kimi CLI is iterating rapidly (multi-agent orchestration, remote web sessions)'] }],
  tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'Roo Code'],
  contentOrder: ['models', 'plans', 'section:0', 'section:1', 'tools', 'faq'],
  faqs: [
    { question: 'Which tier unlocks Kimi K3?', answer: 'K3 is available from Moderato (¥99/mo) and above, including the new K3-256K budget variant. Adagio and Andante keep using K2.7. Allegro uniquely unlocks 1M-token conversations.' },
    { question: 'What is K3-256K?', answer: 'A new model ID that returns identical results to K3 within 256K context while consuming roughly half the quota (full K3 with 1M context costs about 2x). It does not support video input. Use it for daily and single-file tasks to save quota.' },
    { question: 'Can I still subscribe?', answer: 'Purchase buttons currently read "reserve subscription". Official banner says a new membership system is coming that will split Kimi benefits from Kimi Code benefits; existing subscribers keep combined benefits, and buying before the switch locks in the current combined plan.' },
    { question: 'How does the quota refresh?', answer: 'Quotas use a 5-hour window and refresh every 7 days; unused quota does not roll over. Maximum concurrency is 30.' },
    { question: 'What are Agent clusters?', answer: 'Available from Moderato: Allegretto gets 40 cluster runs/mo with 4 subtasks; Allegro gets 8 subtasks and 4 parallel Agents.' },
    { question: 'Which tools are supported?', answer: 'Kimi CLI, Kimi Code for VS Code, Claude Code and Roo Code, all sharing the same plan quota.' },
  ],
})

const qwen = definePlan({
  slug: 'qwen', accent: 'orange', availability: 'active',
  seo: { title: 'Qwen Token Plan Guide 2026 - Qwen3.8-Max GA, Credits from ¥39/mo', description: 'Alibaba Cloud Token Plan (Coding Plan upgraded): personal Lite ¥39/mo, Standard ¥139/mo, Pro ¥499/mo early-bird prices with 7-day Credits windows. Qwen3.8-Max now GA (2.4T, 1M context), new qwen3.8-flash and deepseek-v4-pro-0813, 18 multimodal models share one quota, night 50% off.', canonical: 'https://codingplan.org/en/plans/qwen', locale: 'en', ogType: 'article' },
  hero: { badge: 'Alibaba Cloud · Qwen', title: 'Qwen Token', highlight: 'Plan Guide', description: 'The request-based Coding Plan has been fully upgraded to a Credits-based Token Plan: Qwen3.8-Max (2.4T, 1M context) is now generally available, joined by qwen3.8-flash, deepseek-v4-pro-0813 and image/audio models sharing one Credits pool. Personal plans start at ¥39/mo early-bird; night usage (22:00-08:00) is half price.', stats: [{ value: '¥39', label: 'Early-bird entry' }, { value: '40,000', label: 'Pro Credits/week' }, { value: '18', label: 'Models' }, { value: '8', label: 'Agents (Pro)' }] },
  modelsTitle: 'Models', modelsDescription: 'Qwen3.8-Max now GA, plus qwen3.8-flash, deepseek-v4-pro-0813 and the Qwen / DeepSeek / GLM / image / audio families.',
  models: [
    { icon: '☁️', name: 'Qwen3.8-Max (GA)', description: 'Alibaba\u2019s 2.4T next-generation flagship, now generally available (the preview was retired; old model IDs auto-route). 1M context; officially described as capable of autonomous coding for days to deliver complete projects.', badge: 'GA' },
    { icon: '💨', name: 'qwen3.8-flash (new)', description: 'The new low-cost high-speed tier of the Qwen3.8 family.', badge: 'New' },
    { icon: '🧠', name: 'deepseek-v4-pro-0813', description: 'DeepSeek-V4-Pro 0813 version snapshot, newly added.', badge: 'New' },
    { icon: '⌨️', name: 'qwen3.7-max / qwen3.7-plus', description: 'Qwen3.7 reasoning and general-purpose flagships.' },
    { icon: '🎨', name: 'qwen-image-3.0-pro / qwen-audio-3.0', description: 'New image-generation and real-time audio/ASR models, plus wan2.7 image and happyhorse-1.1 video, all sharing the same Credits.', badge: 'Night 50% off' },
    { icon: '🔷', name: 'GLM family', description: 'Zhipu flagship models (glm-5.2).' },
  ],
  plansTitle: 'Personal plans', plansDescription: 'Early-bird prices (Lite 35% / Standard 23% / Pro 17% off) with Credits on a 7-day rolling window; team seats also available.', purchaseUrl: 'https://www.alibabacloud.com/en/campaign/ai-scene-coding?_p_lc=1',
  plans: [
    { name: 'Lite', badge: 'Early bird ¥39/mo', price: '¥39', unit: '/mo', discount: 'List ¥60/mo (35% off)', features: ['2,500 Credits per 7-day window', '1-2 concurrent Agents', 'All multimodal models share the quota', 'Night 50% off'], audience: 'Light users and first-timers' },
    { name: 'Standard', badge: 'Recommended', price: '¥139', unit: '/mo', discount: 'List ¥180/mo (23% off) · 4x Lite', features: ['10,000 Credits per 7-day window', '3-4 concurrent Agents', 'All Lite benefits', 'Night 50% off'], audience: 'Daily development workhorse', featured: true },
    { name: 'Pro', badge: 'Heavy duty', price: '¥499', unit: '/mo', discount: 'List ¥600/mo (17% off) · 16x Lite', features: ['40,000 Credits per 7-day window', '6-8 concurrent Agents', 'All Standard benefits', 'Night 50% off'], audience: 'Heavy and multi-Agent workloads' },
  ],
  comparison: { title: 'Tier comparison', columns: ['Tier', 'Early-bird', 'List', 'Credits/7d', 'Agents'], featuredColumn: 2, rows: [
    ['Lite', '¥39', '¥60', '2,500', '1-2'],
    ['Standard', '¥139', '¥180', '10,000', '3-4'],
    ['Pro', '¥499', '¥600', '40,000', '6-8'],
    ['Top-up pack', '¥100/pack', '—', '20,000/pack', 'Unlimited'],
  ] },
  sections: [{ title: 'Quota and access rules', warning: 'Early-bird prices are limited-time. Calls to qwen3.8-max and deepseek-v4-pro-0813 between 22:00 and 08:00 deduct Credits at 50%. A dedicated sk-sp- API Key and Base URL are required; generic Bailian keys do not deduct plan Credits.', cards: [
    { icon: '⏱️', title: '7-day rolling window', description: 'A 7-day timer starts at your first call; hitting the cap pauses service until the window resets.' },
    { icon: '🌙', title: 'Night 50% off', description: 'Every night 22:00-08:00, qwen3.8-max and deepseek-v4-pro-0813 deduct half Credits — schedule heavy jobs accordingly.' },
    { icon: '🔐', title: 'No training', description: 'In-plan calls are not used for model training.' },
  ] }, { title: 'What happened to the old Coding Plan', headingLevel: 3, highlights: ['The request-count based Coding Plan (Lite ¥40 / Pro ¥200) was upgraded to the Credits-based Token Plan', 'The old Lite discontinuation and daily 9:30 restock model no longer applies', 'Existing users migrate per official guidance; historical quotas follow the order page'] }],
  tools: ['Qoder', 'Qwen Code', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'OpenCode'],
  contentOrder: ['models', 'plans', 'comparison', 'section:0', 'section:1', 'faq'],
  faqs: [
    { question: 'How is Token Plan different from the old Coding Plan?', answer: 'Alibaba Cloud upgraded the request-count based Coding Plan into a Credits-based Token Plan: models expanded from Qwen3.5 to 18 models led by the now-GA Qwen3.8-Max, plus qwen3.8-flash, deepseek-v4-pro-0813 and multimodal families, with quotas switched to model-rate Credits and personal/team versions.' },
    { question: 'Which personal tier should I pick?', answer: 'Lite ¥39/mo (2,500 Credits/7d) for light use, Standard ¥139/mo (10,000 Credits/7d, 4x Lite) as the daily workhorse, Pro ¥499/mo (40,000 Credits/7d, 16x Lite) for heavy multi-Agent workloads. All are limited-time early-bird prices.' },
    { question: 'How are Credits consumed?', answer: 'Each model has its own Credits rate, accumulated over a 7-day rolling window starting from your first call. Night usage (22:00-08:00) of qwen3.8-max and deepseek-v4-pro-0813 deducts 50% fewer Credits.' },
    { question: 'Is there a team version?', answer: 'Yes — team seats: Standard ¥150/seat/mo (25,000 Credits/mo), Advanced ¥550 (100,000) and Premium ¥1,398 (250,000, early-bird), with a 29-model pool for centralized company billing.' },
    { question: 'What happened to the 9:30 AM restock?', answer: 'It no longer applies. The limited-restock model of the old Coding Plan Pro was retired with the upgrade; Token Plan can be subscribed directly.' },
    { question: 'Is there a refund policy?', answer: 'Activated plans are generally non-refundable. Confirm the rules before purchase.' },
  ],
})

const opencodeGo = definePlan({
  slug: 'opencode-go', accent: 'slate', availability: 'active',
  seo: { title: 'OpenCode Go Guide 2026 - $10/mo, 24 Open Models at 6x Value', description: 'OpenCode Go subscription: $10/month with 6x usage value (the first-month $5 promo was removed Aug 24). 24 open-source models including Grok 4.6, GLM-5.3, GLM-5.3-Flash (limited 2x), Kimi K3, Qwen3.8 Max/Flash, DeepSeek V4 and MiniMax M3. Dollar-based limits ($12/5h, $30/week, $60/month), OpenAI/Anthropic compatible APIs work with any agent.', canonical: 'https://codingplan.org/en/plans/opencode-go', locale: 'en', ogType: 'article' },
  hero: { badge: 'OpenCode · Anomaly', title: 'OpenCode Go', highlight: 'Plan Guide', description: 'Low-cost subscription for open coding models: $10/month with about 6x the subscription value in usage. A curated lineup of 24 tested open-source models works with OpenCode or any compatible agent. Note: the first-month $5 promo was removed on Aug 24.', stats: [{ value: '24', label: 'Models' }, { value: '$10', label: 'Per month' }, { value: '6x', label: 'Usage value' }, { value: '7,600', label: 'V4 Flash 5h requests' }] },
  modelsTitle: 'Models', modelsDescription: '24 open models, all tested and benchmarked for agentic coding. August additions: GLM-5.3 / 5.3-Flash, LongCat-2.0, Qwen3.8 Flash, DeepSeek V4 Flash Vision; Grok upgraded from 4.5 to 4.6.',
  models: [
    { icon: '🐙', name: 'Grok 4.6', description: 'xAI flagship (upgraded from 4.5), one of the strongest open coding models; ~169 requests per 5h.', badge: 'Flagship' },
    { icon: '🔷', name: 'GLM-5.3 / GLM-5.3-Flash', description: 'Zhipu\u2019s new flagship and multimodal variant, added in August. GLM-5.3 ~220 requests/5h; 5.3-Flash gets limited-time 2x limits (~1,580 requests/5h).', badge: 'Flash 2x promo' },
    { icon: '🌟', name: 'Kimi K3', description: 'Moonshot flagship (2.8T params, 1M context); ~110 requests per 5h.' },
    { icon: '☁️', name: 'Qwen3.8 Max / Flash', description: 'Alibaba\u2019s flagship and the new Flash tier; ~160 and ~5,400 requests per 5h respectively.' },
    { icon: '🐋', name: 'DeepSeek V4 Pro / Flash', description: 'V4 Pro ~3,450 requests/5h; V4 Flash ~7,600 with peak/off-peak pricing (off-peak is half price). V4 Flash Vision handles images.', badge: 'Peak/off-peak' },
    { icon: '🔥', name: 'MiniMax M3', description: 'Multimodal flagship; ~3,200 requests per 5h.' },
    { icon: '⚡', name: 'MiMo-V2.5', description: 'Xiaomi\u2019s ultra-cheap open model; ~30,100 requests per 5h.', badge: 'Best value' },
    { icon: '🤖', name: 'Hy3', description: 'High-performance open model (8x usage marked); ~4,300 requests per 5h.' },
    { icon: '🧠', name: 'GPT 5.6 Luna', description: 'OpenAI open model; ~2,050 requests per 5h.' },
    { icon: '✨', name: 'LongCat-2.0 / Muse Spark 1.2', description: 'New additions: LongCat-2.0 ~11,400 requests/5h; Muse Spark 1.2 Contributor (region-limited) ~45,300 requests/5h.' },
  ],
  plansTitle: 'Plans', plansDescription: 'A single $10/mo tier with 6x usage value. Top up credit if needed, cancel anytime. The first-month $5 promo was removed on Aug 24.', purchaseUrl: 'https://opencode.ai/go?ref=JBT5KJRCD4',
  plans: [
    { name: 'Go', badge: '$10/mo', price: '$10', unit: '/mo', discount: 'Top up credit anytime · No lock-in', features: ['$12 / 5h · $30 / week · $60 / month usage', '24 curated open models (Grok 4.6, GLM-5.3, Kimi K3...)', 'OpenAI / Anthropic compatible APIs, any agent', 'Fall back to Zen balance when limits are reached', 'No training on your data, 0-day retention for most models', 'Cancel any time'], audience: 'Developers who want the strongest open models at the lowest cost, and heavy agent users', featured: true, recommended: true, ctaLabel: 'Subscribe to Go →' },
  ],
  comparison: { title: 'Model usage', description: 'Estimated requests at typical usage patterns (per 5h / week / month).', columns: ['Model', '5 hours', 'Weekly', 'Monthly'], featuredColumn: 1, rows: [
    ['MiMo-V2.5', '30,100', '75,200', '150,400'],
    ['LongCat-2.0', '11,400', '28,500', '57,000'],
    ['DeepSeek V4 Flash', '7,600', '19,000', '38,000'],
    ['Qwen3.8 Flash', '5,400', '13,500', '27,000'],
    ['Qwen3.7 Plus', '4,300', '10,800', '21,600'],
    ['Hy3 (8x)', '4,300', '10,750', '21,500'],
    ['DeepSeek V4 Pro', '3,450', '8,550', '17,150'],
    ['MiniMax M3', '3,200', '8,000', '16,000'],
    ['GPT 5.6 Luna', '2,050', '5,100', '10,250'],
    ['GLM-5.3-Flash', '1,580', '3,950', '7,900'],
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
    { title: 'Privacy', headingLevel: 3, highlights: ['No model is used for training', 'Most models have 0-day data retention (GLM, Kimi, Qwen, DeepSeek, MiniMax, MiMo)', 'Grok 4.6 and GPT 5.6 Luna retain 30 days (abuse monitoring)', 'DeepSeek V4 Flash zero-data-retention agreement renews monthly'] },
  ],
  tools: ['OpenCode', 'Claude Code', 'Cursor', 'Cline', 'Roo Code', 'Kilo Code', 'Cherry Studio'],
  contentOrder: ['models', 'plans', 'comparison', 'tools', 'section:0', 'section:1', 'section:2', 'faq', 'final-cta'],
  finalCta: { title: 'Subscribe to OpenCode Go now', label: 'Go to opencode.ai/go →', href: 'https://opencode.ai/go?ref=JBT5KJRCD4' },
  faqs: [
    { question: 'What is OpenCode Go?', answer: 'OpenCode Go is Anomaly\u2019s low-cost subscription for open coding models: $10/month, giving about 6x the subscription value in usage across 24 curated open models, usable in OpenCode or any OpenAI/Anthropic compatible agent.' },
    { question: 'Is the first month still $5?', answer: 'No. OpenCode removed the Go first-month $5 discount on Aug 24 (changelog v1.18.24). The plan is now a flat $10/month, cancelable anytime.' },
    { question: 'How do usage limits work?', answer: 'Limits are dollar-based: $12 per 5 hours, $30 per week, $60 per month. Request counts depend on model price - DeepSeek V4 Flash allows ~7,600 requests/5h while Kimi K3 allows ~110. After limits you can fall back to Zen balance or free models.' },
    { question: 'Which models are included?', answer: '24 models: Grok 4.6, GLM-5.3/5.3-Flash (limited 2x)/5.2/5.1, GPT 5.6 Luna, Kimi K3/K2.7 Code/K2.6, LongCat-2.0, MiMo-V2.5/-Pro, MiniMax M3/M2.7, Muse Spark 1.2 Contributor (region-limited), Qwen3.8 Max/Flash, Qwen3.7 Max/Plus, Qwen3.6 Plus, DeepSeek V4 Pro/Flash/Flash Vision Exp, Hy3. The list keeps growing.' },
    { question: 'Is my data used for training?', answer: 'No model uses your data for training. Most models keep 0-day retention; Grok 4.6 and GPT 5.6 Luna keep 30 days of logs for abuse monitoring.' },
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
