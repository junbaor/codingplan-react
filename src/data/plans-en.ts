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
  seo: { title: 'Claude Code Pricing 2026: Pro and Max Plans', description: 'Compare Claude Pro and Max prices, Claude Code access and model availability, including Opus 5.5, Sonnet 5.5 and Fable 5.1.', canonical: 'https://codingplan.org/en/plans/claude', locale: 'en', ogType: 'article' },
  hero: { badge: 'Anthropic · Claude Code', title: 'Claude Code', highlight: 'Plan Guide', description: 'Claude Pro and Max include Claude Code. Model access, usage limits and credits depend on the plan.', stats: [{ value: '$20', label: 'Pro / month' }, { value: '$100', label: 'Max from / month' }, { value: '5x–20x', label: 'Max usage vs Pro' }, { value: 'Up to 1M', label: 'Context varies by model' }] },
  modelsTitle: 'Current Claude model family', modelsDescription: 'Anthropic lists these current models for its platform. Availability in Claude and Claude Code depends on the subscription, credits and account.', models: [
    { icon: '🏆', name: 'Claude Fable 5.1', description: 'For demanding reasoning and long-running agentic work. Pro uses usage credits for Fable; Max has a separate share of weekly limits.' },
    { icon: '🧠', name: 'Claude Opus 5.5', description: 'Designed for long-running agentic coding and knowledge work.' },
    { icon: '⚡', name: 'Claude Sonnet 5.5', description: 'Balances speed and capability for everyday work.' },
    { icon: '🌱', name: 'Claude Haiku 5.5', description: 'Fast model for high-volume and latency-sensitive tasks.' },
  ],
  plansTitle: 'Individual plans', plansDescription: 'Prices exclude applicable taxes; see the official page for current terms.', purchaseUrl: 'https://claude.com/pricing', plans: [
    { name: 'Free', price: '$0', unit: '/mo', features: ['Claude chat', 'Sonnet and Haiku', 'Claude Code is not included'], audience: 'Occasional use' },
    { name: 'Pro', price: '$20', unit: '/mo', discount: '$200/year', features: ['Claude Code included', 'Opus, Sonnet and Haiku', 'Fable uses usage credits'], audience: 'Everyday work', featured: true },
    { name: 'Max 5x', price: '$100', unit: '/mo', features: ['5x Pro usage', 'Priority at high traffic', '$100/month API credits, subject to terms'], audience: 'Frequent use' },
    { name: 'Max 20x', price: '$200', unit: '/mo', features: ['20x Pro usage', 'Priority at high traffic', '$200/month API credits, subject to terms'], audience: 'Heavy use' },
  ],
  sections: [{ title: 'Usage and availability', highlights: ['Limits apply and may vary by model, demand and account.', 'Fable on Pro requires usage credits; Max Fable access is subject to its own weekly limit.', 'API credits and subscription usage have different terms; check the official pricing page.'] }],
  tools: ['Claude Code', 'Terminal', 'VS Code', 'JetBrains', 'Web'],
  faqs: [{ question: 'Does Pro include Claude Code?', answer: 'Yes. Pro includes Claude Code, subject to usage limits.' }, { question: 'Is Fable included in Pro?', answer: 'The official pricing table lists Fable on Pro through usage credits. Max plans have Fable access subject to a share of weekly limits.' }, { question: 'How much does Max cost?', answer: 'Max 5x is $100/month and Max 20x is $200/month before applicable taxes.' }],
})

const glm = definePlan({
  slug: 'glm', accent: 'blue', availability: 'active',
  seo: { title: 'GLM Coding Plan Pricing 2026: Subscription Cost from $18/mo', description: 'How much does a GLM Coding Plan subscription cost? Lite $18 / Pro $80 / Max $168 monthly from Z.ai, yearly -30%; GLM-5.3 & GLM-5.3-Flash on all tiers, 50% off-peak credits. Tier comparison table and signup entry included.', canonical: 'https://codingplan.org/en/plans/glm', locale: 'en', ogType: 'article' },
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
  seo: { title: 'MiniMax M Plan Pricing 2026: Go, Explore and Build', description: 'Compare MiniMax M Plan international prices, models and coding tool access.', canonical: 'https://codingplan.org/en/plans/minimax', locale: 'en', ogType: 'article' },
  hero: { badge: 'MiniMax · M Plan', title: 'MiniMax', highlight: 'M Plan', description: 'International Go, Explore and Build plans include MiniMax Code and API access.', stats: [{ value: '3', label: 'Paid tiers' }, { value: '$22', label: 'Monthly entry' }, { value: 'M3.1 Flash', label: 'Text model' }, { value: 'H3', label: 'Video model' }] },
  modelsTitle: 'Models', models: [{ icon: '💻', name: 'M3.1 Flash', description: 'Included in all paid tiers, alongside image and audio capabilities.' }, { icon: '🎬', name: 'H3', description: 'Video is included in Explore and Build, not Go.' }],
  plansTitle: 'International plans', plansDescription: 'First month 50% off until October 31, 2026 (UTC+8), then regular price.', purchaseUrl: 'https://www.minimax.io/m-plan', plans: [
    { name: 'Go', price: '$22', unit: '/mo', discount: '$11 first month; $220/year', features: ['M3.1 Flash', 'Image and speech models', 'No video'], audience: 'Light use' },
    { name: 'Explore', price: '$55', unit: '/mo', discount: '$27.50 first month; $550/year', features: ['3× Go usage', 'H3 video', 'API key access'], audience: 'Everyday use', featured: true },
    { name: 'Build', price: '$132', unit: '/mo', discount: '$66 first month; $1,320/year', features: ['7.5× Go usage', 'H3 video', 'Peak priority'], audience: 'Heavy use' },
  ],
  sections: [{ title: 'Usage', highlights: ['Subscription keys use M Plan allowance and credit packs; pay-as-you-go account balance is separate.', 'Credit packs are valid for one year.'] }], tools: ['MiniMax Code', 'Claude Code', 'Codex', 'Cursor', 'OpenCode'],
  faqs: [{ question: 'Which tiers include video?', answer: 'Explore and Build include H3; Go does not.' }, { question: 'Is account balance charged automatically?', answer: 'No. Subscription keys use plan allowance and credit packs, not the pay-as-you-go balance.' }],
})

const kimi = definePlan({
  slug: 'kimi', accent: 'purple', availability: 'active',
  seo: { title: 'Kimi Code Plan 2026: Membership and Coding Access', description: 'Compare Kimi membership tiers and coding access. The current China plans start Kimi Code at Plus; international plans have separate pricing.', canonical: 'https://codingplan.org/en/plans/kimi', locale: 'en', ogType: 'article' },
  hero: { badge: 'Moonshot AI · Kimi Code', title: 'Kimi Code', highlight: 'Plan Guide', description: 'New Kimi membership plans are available. The prices below are for China; international plans and prices differ.', stats: [{ value: '5', label: 'China paid tiers' }, { value: '¥99', label: 'Coding entry / month' }, { value: '5h', label: 'Rolling limit' }, { value: 'Monthly', label: 'Shared quota' }] },
  modelsTitle: 'Models', models: [{ icon: '🌟', name: 'Kimi K3', description: 'Available from Plus in the new China plans. Pro and above can access up to 1M context.' }],
  plansTitle: 'China membership plans', plansDescription: 'Recurring monthly prices in mainland China. Go does not include Kimi Code.', purchaseUrl: 'https://www.kimi.com/code',
  plans: [
    { name: 'Go', price: '¥49', unit: '/mo', discount: '¥468/year', features: ['No Kimi Code', '1 concurrent Agent task'], audience: 'General use' },
    { name: 'Plus', price: '¥99', unit: '/mo', discount: '¥948/year', features: ['Kimi Code and K3', '2 concurrent Agent tasks'], audience: 'Everyday coding', featured: true },
    { name: 'Pro', price: '¥199', unit: '/mo', discount: '¥1,908/year', features: ['K3 up to 1M context', 'Goal Mode and Kimi Claw'], audience: 'Advanced use' },
    { name: 'Max', price: '¥699', unit: '/mo', discount: '¥6,708/year', features: ['4 concurrent Agent tasks', '100 projects and 50GB storage'], audience: 'Frequent use' },
    { name: 'Ultra', price: '¥1,399', unit: '/mo', discount: '¥13,428/year', features: ['4 concurrent Agent tasks', '100 projects and 50GB storage'], audience: 'Heavy use' },
  ],
  sections: [{ title: 'Limits and legacy subscriptions', highlights: ['New plans have a rolling 5-hour limit and a shared monthly quota, with no weekly limit.', 'Legacy subscribers retain their existing tier and rules; migration is optional.', 'International plans and prices differ from the China plans shown here.'] }],
  tools: ['Kimi CLI', 'Kimi Code for VS Code', 'Claude Code', 'OpenCode'],
  faqs: [{ question: 'Which China tier includes Kimi Code?', answer: 'Plus and above include Kimi Code; Go does not. Legacy Andante and above retain access.' }, { question: 'How do limits work?', answer: 'New plans have a rolling 5-hour limit and a monthly shared quota; legacy plans retain a weekly limit.' }],
})

const qwen = definePlan({
  slug: 'qwen', accent: 'orange', availability: 'active',
  seo: { title: 'Alibaba Coding Plan 2026: Qwen Token Plan from ¥39/mo', description: 'How much is the Alibaba Coding Plan? Now the Qwen Token Plan: early-bird ¥39 / ¥139 / ¥499 monthly, Qwen3.8-Max GA and 18 models sharing one Credits pool, night 50% off. Tier comparison and early-bird entry included.', canonical: 'https://codingplan.org/en/plans/qwen', locale: 'en', ogType: 'article' },
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
  seo: { title: 'OpenCode Go and Go Plus Pricing and Models 2026', description: 'Compare OpenCode Go and Go Plus monthly prices, model access and usage limits.', canonical: 'https://codingplan.org/en/plans/opencode-go', locale: 'en', ogType: 'article' },
  hero: { badge: 'OpenCode · Go', title: 'OpenCode', highlight: 'Go', description: 'Two individual subscriptions offer access to multiple models, with model-specific limits.', stats: [{ value: '$10', label: 'Go / month' }, { value: '$40', label: 'Go Plus / month' }, { value: '5h', label: 'Short window' }, { value: '1', label: 'Workspace member' }] },
  modelsTitle: 'Models', modelsDescription: 'Availability and privacy restrictions may change; see the official list.', models: [{ icon: '💻', name: 'GLM, Kimi and DeepSeek', description: 'Includes GLM-5.3, Kimi K3.1 Pro and DeepSeek V4.1 Flash.' }, { icon: '⚡', name: 'MiMo and MiniMax', description: 'Includes MiMo V2.6 and MiniMax M3.1 Flash.' }, { icon: '🌍', name: 'More models', description: 'Includes Grok 4.7, GPT 6 Luna, Claude Haiku 5.5 and Gemini 4 Argon; some have region or privacy restrictions.' }],
  plansTitle: 'Plans', purchaseUrl: 'https://opencode.ai/go?ref=JBT5KJRCD4', plans: [{ name: 'Go', price: '$10', unit: '/mo', features: ['Multiple models', '5-hour, weekly and monthly limits', 'Single-member workspace'], audience: 'Individual developers', featured: true }, { name: 'Go Plus', price: '$40', unit: '/mo', features: ['Same model list', 'Higher model-specific limits', 'Single-member workspace'], audience: 'Frequent users' }],
  sections: [{ title: 'Usage limits', highlights: ['Each model has a monthly dollar limit; its 5-hour and weekly limits are 20% and 50% of that amount.', 'Limits and token pricing differ by model; $60 per month is not a universal limit.', 'Some models require specific region or privacy settings.'] }],
  tools: ['OpenCode', 'Claude Code', 'Codex'], faqs: [{ question: 'What does Go Plus add?', answer: 'Go Plus costs $40/month and provides higher model-specific limits for the same model list.' }, { question: 'Can a team share a plan?', answer: 'Go and Go Plus are for single-member workspaces and cannot invite members.' }],
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
