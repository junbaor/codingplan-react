/**
 * [INPUT]: 依赖 content-page 的 defineContentPage、blogs/tools/models/plans 的集合清单
 * [OUTPUT]: 对外提供 5 个集合首页数据：/blogs、/plans、/tools、/models（zh）与 /en/blogs（en）
 * [POS]: data 的集合层，保证每个二级路径都有 200 的列表页作为面包屑父级与权重汇聚点
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'
import { modelSlugs } from './models'
import { planSlugs } from './plans'

const planNameBySlug: Record<string, { name: string; price: string }> = {
  volcengine: { name: '火山引擎方舟', price: '¥9.9/月起' },
  xiaomi: { name: '小米 MiMo', price: '¥39/月' },
  kimi: { name: 'Kimi Code Plan', price: '¥49/月' },
  minimax: { name: 'MiniMax Token Plan', price: '¥49/月' },
  'opencode-go': { name: 'OpenCode Go', price: '$10/月' },
  zhipu: { name: '智谱 GLM Coding Plan', price: '¥118/月' },
  aliyun: { name: '阿里云百炼', price: '¥200/月' },
  baiyunzhisuan: { name: '白云智算', price: '按量 API' },
  tencentcloud: { name: '腾讯云 Coding Plan', price: '已下线' },
}

const modelNameBySlug: Record<string, { name: string; vendor: string }> = {
  'glm-5.2': { name: 'GLM-5.2', vendor: '智谱' },
  'kimi-k3': { name: 'Kimi K3', vendor: 'Moonshot' },
  'minimax-m3': { name: 'MiniMax M3', vendor: 'MiniMax' },
  'doubao-seed-2.1-turbo': { name: 'Doubao-Seed-2.1-turbo', vendor: '字节跳动' },
  'deepseek-v4': { name: 'DeepSeek V4', vendor: 'DeepSeek' },
  'qwen3.5-plus': { name: 'Qwen3.5-Plus', vendor: '阿里' },
  'kimi-k2.7': { name: 'Kimi K2.7', vendor: 'Moonshot' },
  'glm-5-turbo': { name: 'GLM-5-Turbo', vendor: '智谱' },
}

export const blogsHub = defineContentPage({
  slug: 'blogs',
  accent: 'green',
  seo: {
    title: 'Coding Plan 博客 - 对比 / 教程 / 选型指南全目录',
    description: 'CodingPlan.org 博客：GLM vs Kimi 对比、Claude Code 配置国产套餐教程（GLM/Kimi/火山）、哪家最便宜、哪个好怎么选、Coding Plan 是什么等深度文章全目录，持续更新。',
    canonical: 'https://codingplan.org/blogs',
    locale: 'zh-CN',
    ogType: 'website',
  },
  hero: {
    badge: '博客 · 持续更新',
    title: 'Coding Plan',
    highlight: '博客',
    description: '对比、教程与选型指南，与平台详情页、工具页、模型页数据同源。',
  },
  hubTitle: '全部文章',
  hubLayout: 'list',
  hubItems: [
    { href: '/blogs/what-is-coding-plan', kind: '百科', title: 'Coding Plan 是什么？', description: '从 Token API 到订阅制的概念、三种计费方式与 5 小时限额解读' },
    { href: '/blogs/cheapest-coding-plan', kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '入门价排行与单位额度成本分析，¥9.9 起的省钱组合' },
    { href: '/blogs/best-coding-plan', kind: '选型', title: 'Coding Plan 哪个好？怎么选', description: '按模型质量、使用强度、工具生态的场景化推荐' },
    { href: '/blogs/glm-vs-kimi', kind: '对比', title: 'GLM vs Kimi：两家 Coding Plan 怎么选', description: '旗舰模型、价格与额度口径逐项对比，附按人群结论' },
    { href: '/blogs/claude-code-with-glm', kind: '教程', title: 'Claude Code 配置智谱 GLM Coding Plan', description: '环境变量、端点配置与常见报错排查，五分钟接入' },
    { href: '/blogs/claude-code-with-kimi', kind: '教程', title: 'Claude Code 配置 Kimi Code Plan', description: '免费档即可试用的 Moonshot 端点配置教程' },
    { href: '/blogs/claude-code-with-volcengine', kind: '教程', title: 'Claude Code 接入火山引擎方舟 Coding Plan', description: '多模型切换与 Auto 调度配置，¥9.9 首购起' },
  ],
  sections: [],
  faqs: [
    { question: '文章和详情页是什么关系？', answer: '详情页（/plans、/tools、/models）是结构化的实体数据，文章是围绕它们的深度内容：对比、教程与选型结论。两者互链且数据同源。' },
    { question: '文章多久更新？', answer: '价格或模型变动触发对应文章与详情页同步更新；页脚「数据更新于」即最近核实时间。' },
  ],
  related: [
    { kind: '榜单', title: '性价比排行榜', description: '九平台入门价与量纲速查。', href: '/leaderboard' },
    { kind: '优惠', title: '邀请码与优惠汇总', description: '文章提到的低价入口集中在此。', href: '/deals' },
    { kind: '集合', title: '全部套餐', description: '九个平台的结构化详情。', href: '/#platforms' },
  ],
})

export const toolsHub = defineContentPage({
  slug: 'tools',
  accent: 'orange',
  seo: {
    title: '编程工具 × Coding Plan - Claude Code / Codex / OpenCode / Cursor / Cline / Roo Code',
    description: 'CodingPlan.org 工具集合页：六个主流 AI 编程工具各配哪个国产 Coding Plan 最划算，含 Claude Code、Codex、OpenCode、Cursor、Cline、Roo Code 的支持套餐清单与配置教程入口。',
    canonical: 'https://codingplan.org/tools',
    locale: 'zh-CN',
    ogType: 'website',
  },
  hero: {
    badge: '工具集合 · 6 工具',
    title: '编程工具',
    highlight: '× Coding Plan',
    description: '每个工具一页：它是什么、支持哪些国内套餐、怎么选最省钱。工具页与平台详情页双向互链，配好套餐后可从工具页直达对应教程。',
    stats: [
      { value: '6', label: '主流工具' },
      { value: '8+', label: '可接国内套餐' },
      { value: 'BYOK', label: '多数支持自带 Key' },
    ],
  },
  hubTitle: '全部工具',
  hubLayout: 'cards-lg',
  hubItems: [
    { href: '/tools/claude-code', kind: '终端/IDE Agent', title: 'Claude Code', description: '生态最成熟的编程智能体，7+ 国内套餐可接', mark: 'CC', color: '#D97757' },
    { href: '/tools/codex', kind: 'OpenAI 官方', title: 'Codex', description: 'ChatGPT 订阅内置的终端智能体，GPT-5.6 系列', mark: 'CD', color: '#10A37F' },
    { href: '/tools/opencode', kind: '开源中立', title: 'OpenCode', description: '模型无关的开源 Agent，官方 Go 订阅 $10/月', mark: 'OC', color: '#06B6D4' },
    { href: '/tools/cursor', kind: 'AI IDE', title: 'Cursor', description: '最流行的 AI IDE，BYOK 接入国内套餐', mark: 'CU', color: '#111827' },
    { href: '/tools/cline', kind: 'VS Code 插件', title: 'Cline', description: 'VS Code 开源 Agent，自带 Key 零订阅', mark: 'CL', color: '#F59E0B' },
    { href: '/tools/roo-code', kind: 'VS Code 插件', title: 'Roo Code', description: 'Cline 系多模式工作流，Kimi 官方点名支持', mark: 'RC', color: '#8B5CF6' },
  ],
  sections: [
    {
      title: '按工作流选工具',
      cards: [
        { icon: '⌨️', title: '终端优先', description: 'Claude Code、OpenCode、Codex：CLI 为核心，配 IDE 插件。' },
        { icon: '🪟', title: 'IDE 一体化', description: 'Cursor（独立 IDE）或 Cline/Roo Code（VS Code 插件）。' },
        { icon: '🔓', title: '不想锁定厂商', description: 'OpenCode 模型无关；Cline/Roo Code 自带 Key。' },
      ],
    },
  ],
  faqs: [
    { question: '工具本身要付费吗？', answer: 'Claude Code CLI、Codex CLI、OpenCode、Cline、Roo Code 均免费（OpenCode 开源）；Cursor 是商业产品（有免费档）。消耗的是你接入的套餐额度。' },
    { question: '一个套餐能同时接多个工具吗？', answer: '能。同一套餐额度在所有支持的工具间共享，例如智谱套餐同时供 Claude Code 与 Cursor 使用，不重复计费。' },
    { question: '哪个工具对国产套餐适配最好？', answer: 'Claude Code 的官方适配面最广（7+ 平台点名支持）；VS Code 用户则普遍选 Cline/Roo Code。' },
  ],
  related: [
    { kind: '文章', title: 'Claude Code 配置教程合集', description: 'GLM/Kimi/方舟三篇教程。', href: '/blogs/claude-code-with-glm' },
    { kind: '集合', title: '全部套餐', description: '工具页引用的平台详情。', href: '/plans' },
    { kind: '模型', title: 'GLM-5.2 评测', description: '工具背后的模型选型。', href: '/models/glm-5.2' },
  ],
})

export const modelsHub = defineContentPage({
  slug: 'models',
  accent: 'purple',
  seo: {
    title: '编程大模型评测集合 - GLM-5.2 / Kimi K3 / MiniMax M3 / DeepSeek V4 等 8 款',
    description: 'CodingPlan.org 模型集合页：八个主流编程大模型（GLM-5.2、Kimi K3、MiniMax M3、Doubao-Seed-2.1-turbo、DeepSeek V4、Qwen3.5-Plus、Kimi K2.7、GLM-5-Turbo）的能力定位与可用套餐速查。',
    canonical: 'https://codingplan.org/models',
    locale: 'zh-CN',
    ogType: 'website',
  },
  hero: {
    badge: '模型集合 · 8 模型',
    title: '编程大模型',
    highlight: '评测集合',
    description: '每个模型一页：能力定位、哪些套餐能用、每月成本与搭配建议。模型页与套餐详情页互链，选模型即选套餐。',
    stats: [
      { value: '8', label: '热门模型' },
      { value: '4 家', label: '覆盖厂商' },
      { value: '1M', label: '旗舰上下文' },
    ],
  },
  hubTitle: '全部模型',
  hubItems: modelSlugs.map((slug) => ({
    href: `/models/${slug}`,
    kind: modelNameBySlug[slug].vendor,
    title: modelNameBySlug[slug].name,
  })),
  sections: [
    {
      title: '按能力选模型',
      cards: [
        { icon: '🏆', title: '代码上限', description: 'GLM-5.2（LMArena 开源第一）与 Kimi K3（2.8T）。' },
        { icon: '⚡', title: '速度与成本', description: 'GLM-5-Turbo、Doubao-2.1-turbo、DeepSeek V4 Flash。' },
        { icon: '🎥', title: '多模态', description: 'MiniMax M3（图像/视频输入）、Kimi K3（视觉）。' },
        { icon: '🧠', title: '推理与 Agent', description: 'DeepSeek V4 Pro、Kimi K3 长链路任务。' },
      ],
    },
    {
      title: '模型与套餐的关系',
      paragraphs: [
        '同一模型常出现在多个套餐里，价格口径却不同：例如 GLM-5.2 在智谱按每周 Credits 计、在火山按三重窗口计、在 OpenCode Go 按美元额度计。模型页给出了同一模型在不同套餐的横向入口。',
        '建议路径：先在模型页确定「用哪个模型」，再比较「哪个套餐跑它最便宜」，最后从对应套餐详情页或教程完成接入。',
      ],
    },
  ],
  faqs: [
    { question: '为什么没有 Claude Opus 4.7 的模型页？', answer: 'Claude 系模型仅随官方订阅提供（英文站 /en/plans/claude 有详解），不在国产套餐模型池内；本集合聚焦可多套餐获取的模型。' },
    { question: '模型评测的依据是什么？', answer: '公开榜单（LMArena、SWE-Bench 等）、厂商官方口径与本站实测体验结合；榜单名次会随版本变化，页内标注时点。' },
    { question: '新模型上线后会补页吗？', answer: '会。新旗舰（如下一代 GLM/K/M 系列）上线后按同一模板补页，并同步进 /changelog。' },
  ],
  related: [
    { kind: '榜单', title: '性价比排行榜', description: '模型所在套餐的价格对比。', href: '/leaderboard' },
    { kind: '集合', title: '全部套餐', description: '模型的承载套餐。', href: '/plans' },
    { kind: '动态', title: '变更记录', description: '新模型上线时间线。', href: '/changelog' },
  ],
})

export const enBlogsHub = defineContentPage({
  slug: 'en-blogs',
  accent: 'red',
  seo: {
    title: 'Coding Plan Blog - Comparisons, Guides & Buying Advice',
    description: 'All CodingPlan.org blog posts in one place: Claude Code vs GLM comparison, setup guides and buying advice for AI coding subscriptions, cross-linked with plan, tool and model pages.',
    canonical: 'https://codingplan.org/en/blogs',
    locale: 'en',
    ogType: 'website',
  },
  hero: {
    badge: 'Blog · Growing library',
    title: 'Coding Plan',
    highlight: 'Blog',
    description: 'Comparisons, setup guides and buying advice for AI coding subscriptions. Every article is cross-linked with the English plan guides so you can go from verdict to pricing in one click.',
    stats: [
      { value: 'Comparison', label: 'Claude vs GLM' },
      { value: 'More', label: 'Guides coming' },
    ],
  },
  hubTitle: 'All posts',
  hubItems: [{ href: '/en/blogs/claude-vs-glm', kind: 'Comparison', title: 'Claude Code vs GLM Coding Plan' }],
  sections: [
    {
      title: 'Start here',
      highlights: [
        'Deciding between Anthropic and Z.ai: read Claude Code vs GLM first',
        'Need the full plan landscape: the comparison table on the English homepage covers six providers',
        'Plan detail pages (Claude, GLM, MiniMax, Kimi, Qwen, OpenCode Go) hold current pricing and quotas',
      ],
    },
  ],
  faqs: [
    { question: 'Are more English posts coming?', answer: 'Yes — English setup guides and platform comparisons are added incrementally; Chinese readers get the full library at codingplan.org/blogs.' },
    { question: 'How current are the prices cited?', answer: 'Blog posts share the same data source as the plan pages; the footer date marks the last verification.' },
  ],
  related: [
    { kind: 'Hub', title: 'English homepage', description: 'Six-provider comparison table.', href: '/en' },
    { kind: 'Plan', title: 'GLM Coding Plan Guide', description: 'The value pick in the comparison.', href: '/en/plans/glm' },
  ],
})
