/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器与 plans.ts 各平台 tools 清单
 * [OUTPUT]: 对外提供 6 个编程工具页数据（Claude Code/Codex/OpenCode/Cursor/Cline/Roo Code）
 * [POS]: data 的工具意图承接层，承接「工具名 + 价格/配置/coding plan」查询并导向平台详情
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const toolSlugs = ['claude-code', 'codex', 'opencode', 'cursor', 'cline', 'roo-code'] as const

export const claudeCodeTool = defineContentPage({
  slug: 'claude-code',
  accent: 'red',
  seo: {
    title: 'Claude Code 用哪个 Coding Plan？2026 价格 / 支持套餐 / 配置入口全解',
    description: 'Claude Code 支持的 Coding Plan 汇总：官方订阅 Pro $20 起，或接入智谱 GLM（年付 ¥94.4/月）、Kimi（¥49/月）、火山方舟（¥9.9 起）、MiniMax、阿里云、OpenCode Go 等国内套餐。含各平台配置教程入口与选购建议。',
    canonical: 'https://codingplan.org/tools/claude-code',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '工具 · Claude Code',
    title: 'Claude Code',
    highlight: '用哪个 Coding Plan？',
    description: 'Claude Code 是 Anthropic 官方终端/IDE 编程智能体，也是当前生态最成熟的 AI 编码工具。它既可以用官方订阅，也可以通过 Anthropic 兼容端点接入几乎全部国产 Coding Plan。',
    stats: [
      { value: '$20', label: '官方订阅起价' },
      { value: '7+', label: '可接国内套餐' },
      { value: '终端+IDE', label: '运行形态' },
    ],
  },
  sections: [
    {
      title: '两种用法',
      cards: [
        { icon: '🌍', title: '官方订阅（国际）', description: 'Claude Pro $20/月（年付 $17）含 Claude Code 与 Opus 4.7；Max $100/$200 提供 5x/20x 用量与高峰优先。' },
        { icon: '🇨🇳', title: '国内套餐接入', description: '智谱、Kimi、火山、MiniMax、阿里云、小米、OpenCode Go 均官方列明支持 Claude Code，设置两个环境变量即可切换。' },
      ],
    },
    {
      title: '支持的国内 Coding Plan（按入门价）',
      description: '数据取自各平台官网工具清单，点击平台名查看套餐详情。',
      table: {
        columns: ['平台', '入门价', '旗舰模型', '额度口径'],
        featuredColumn: 1,
        rows: [
          ['火山引擎方舟', '¥9.9/月起', '8+ 款可切换 + Auto', '5h + 周 + 月三重窗口'],
          ['Kimi Code Plan', '¥49/月', 'K3 / K2.6', '5h + 7 天双窗口'],
          ['MiniMax Token Plan', '¥49/月', 'M3 / M2.7', '6亿+ token/月'],
          ['小米 MiMo', '¥39/月', 'MiMo-V2.5-Pro', 'Credits 年度制'],
          ['OpenCode Go', '$10/月', '18 款开源模型', '5h $12 / 月 $60'],
          ['智谱 GLM', '¥118/月', 'GLM-5.2', '10K-140K Credits/周'],
          ['阿里云百炼', '¥200/月', 'qwen3.5 系列', '6,000 次/5h'],
          ['白云智算', '按量 API', '多模型', 'token 后付费'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/kimi', '/plans/minimax', '/plans/xiaomi', '/plans/opencode-go', '/plans/zhipu', '/plans/aliyun', '/plans/baiyunzhisuan'],
      },
    },
    {
      title: '怎么选',
      highlights: [
        '要 Opus 4.7 原生体验：官方 Pro $20/月起，年付约 ¥146/月',
        '要最强国产旗舰：智谱 GLM-5.2（年付 ¥94.4/月），LMArena 代码榜开源第一',
        '最便宜跑起来：火山 ¥9.9 首购或 Kimi Andante 年付 ¥39/月',
        '要 1M 上下文：Kimi Moderato ¥99/月起（K3），或 GLM 全系',
        '多模型轮换：火山方舟一份额度切 8+ 款模型',
      ],
    },
    {
      title: '配置入口',
      paragraphs: [
        '接入国内套餐只需把 ANTHROPIC_BASE_URL 与 ANTHROPIC_AUTH_TOKEN 指向对应厂商的 Anthropic 兼容端点。本站已备好三篇逐平台教程：智谱 GLM、Kimi、火山方舟，含环境变量、模型选择与常见报错排查。',
      ],
    },
  ],
  faqs: [
    { question: 'Claude Code 本身收费吗？', answer: '工具免费，消耗的是背后订阅额度：官方订阅消耗 Claude 额度，接入国内套餐则消耗对应 Coding Plan 额度。' },
    { question: '国内套餐接 Claude Code 违反条款吗？', answer: '不违反。智谱、Kimi、火山、MiniMax 等均官方列明支持 Claude Code 并提供兼容端点，属于厂商主动兼容。' },
    { question: '用国产套餐和官方订阅体验差在哪？', answer: '模型不同：官方是 Opus 4.7，国产是 GLM-5.2/K3/M3 等。工具功能（终端、IDE 插件、MCP）基本一致；官方的 extended thinking 与跨会话记忆部分依赖模型能力。' },
    { question: '可以多个套餐随时切换吗？', answer: '可以，切换只是改环境变量；配合 ccswitch 等工具可一键切换多套配置。' },
  ],
  related: [
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '五分钟接入教程。', href: '/blogs/claude-code-with-glm' },
    { kind: '教程', title: 'Claude Code 配置 Kimi', description: '免费档即可试用。', href: '/blogs/claude-code-with-kimi' },
    { kind: '教程', title: 'Claude Code 接入火山方舟', description: '多模型 + Auto 调度。', href: '/blogs/claude-code-with-volcengine' },
    { kind: '对比', title: 'Claude vs GLM（英文）', description: '官方订阅与 GLM 正面对比。', href: '/en/blogs/claude-vs-glm' },
  ],
})

export const codexTool = defineContentPage({
  slug: 'codex',
  accent: 'green',
  seo: {
    title: 'Codex CLI 支持哪些 Coding Plan？2026 OpenAI Codex 配置与套餐选择',
    description: 'OpenAI Codex CLI 编程智能体的套餐选择：ChatGPT Plus $20 内置，或通过自定义模型服务商接入阿里云百炼、MiniMax、小米 MiMo 等国内 Coding Plan。含各平台支持清单与配置要点。',
    canonical: 'https://codingplan.org/tools/codex',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '工具 · OpenAI Codex',
    title: 'Codex',
    highlight: '配哪个 Coding Plan？',
    description: 'Codex 是 OpenAI 的终端/IDE 编程智能体（前身为开源 Codex CLI），ChatGPT 订阅内置；同时支持自定义模型服务商，国内已有多个 Coding Plan 官方列明支持。',
    stats: [
      { value: '$20', label: 'ChatGPT Plus 起' },
      { value: '4+', label: '国内可接套餐' },
      { value: 'OSS', label: 'CLI 开源' },
    ],
  },
  sections: [
    {
      title: '官方列明支持的套餐',
      description: '以各平台官网工具清单为准，点击查看详情。',
      table: {
        columns: ['平台', '入门价', '支持说明'],
        featuredColumn: 1,
        rows: [
          ['MiniMax Token Plan', '¥49/月', '工具清单含 Codex CLI'],
          ['阿里云百炼', '¥200/月', '工具清单含 Codex'],
          ['小米 MiMo', '¥39/月', '工具清单含 Codex'],
          ['ChatGPT（官方）', '$8-20/月', 'Go $8 / Plus $20 内置 Codex'],
        ],
        rowLinks: ['/plans/minimax', '/plans/aliyun', '/plans/xiaomi', 'https://chatgpt.com/'],
      },
    },
    {
      title: 'Codex 的定位',
      paragraphs: [
        'Codex 与 ChatGPT 订阅深度绑定：Go（$8/月）与 Plus（$20/月）均可使用，模型为 GPT-5.6 系列（Sol 为 Plus/Pro 主推，Luna 为免费版默认）。相比 Claude Code 的终端优先，Codex 同时提供云端任务执行与代码审查工作流。',
        '国内套餐接入依赖 Codex 的自定义 provider 能力（config.toml 指定 OpenAI 兼容端点与 Key）。MiniMax、阿里云、小米在官方文档中列明支持；其余平台若提供 OpenAI 兼容 API（如火山方舟、OpenCode Go），通常也可手动配置。',
      ],
    },
    {
      title: '怎么选',
      highlights: [
        '要 GPT-5.6 原生体验：ChatGPT Plus $20/月（Go $8 仅轻量使用）',
        '国内低成本：小米 MiMo ¥39/月 或 MiniMax ¥49/月（均官方列明支持）',
        '多工具混用：阿里云 Pro（Codex + Claude Code + Cursor 全支持）',
        '注意：各家「支持」含义不同——官方适配 vs 兼容端点自配，购买前查平台文档',
      ],
    },
  ],
  faqs: [
    { question: 'Codex CLI 免费吗？', answer: 'CLI 本身开源免费，但需要模型额度：ChatGPT 订阅内置，或接入国内套餐/OpenAI 兼容 API。' },
    { question: 'Codex 和 Claude Code 选哪个？', answer: '深度终端工作流两者都强；Codex 胜在与 ChatGPT 生态整合（云端任务、代码审查），Claude Code 胜在国产套餐官方适配面更广。可都装，按任务切换。' },
    { question: '火山方舟能接 Codex 吗？', answer: '方舟官方工具清单未列 Codex，但提供 OpenAI 兼容 API，技术上可通过自定义 provider 配置；稳定性以官方适配为准。' },
    { question: 'ChatGPT Go 套餐能用 Codex 吗？', answer: 'Go（$8/月）可以使用 Codex，但用量窗口远小于 Plus；重度使用建议 Plus $20/月。' },
  ],
  related: [
    { kind: '详情', title: 'MiniMax Token Plan 详解', description: '官方支持 Codex CLI 的最低价套餐。', href: '/plans/minimax' },
    { kind: '详情', title: '阿里云百炼详解', description: 'Codex + Claude Code 双支持。', href: '/plans/aliyun' },
    { kind: '百科', title: 'Coding Plan 是什么？', description: '订阅制与按量 API 的区别。', href: '/blogs/what-is-coding-plan' },
  ],
})

export const opencodeTool = defineContentPage({
  slug: 'opencode',
  accent: 'slate',
  seo: {
    title: 'OpenCode 编程工具详解 2026 - 免费开源 Agent + Go 订阅 $10/月怎么用',
    description: 'OpenCode（opencode.ai）开源终端编程智能体详解：免费使用任意模型服务商、官方订阅 OpenCode Go $10/月享 6 倍用量（18 款开源模型）、支持的国内 Coding Plan 清单与配置方式。',
    canonical: 'https://codingplan.org/tools/opencode',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '工具 · OpenCode',
    title: 'OpenCode',
    highlight: '开源编程智能体',
    description: 'OpenCode 是模型无关的开源终端 Agent：不绑定任何厂商，接谁的 Key 就用谁的模型。它也有自己的订阅 OpenCode Go——$10/月打包 18 款开源模型。',
    stats: [
      { value: '免费', label: '工具本体' },
      { value: '$10/月', label: 'Go 订阅' },
      { value: '18 款', label: 'Go 含模型数' },
    ],
  },
  sections: [
    {
      title: '两种打开方式',
      cards: [
        { icon: '🔑', title: '自带 Key（免费工具）', description: '把任意厂商的 API Key 或 Coding Plan 端点配进 OpenCode，工具本身零成本。' },
        { icon: '🚀', title: 'OpenCode Go 订阅', description: '首月 $5、之后 $10/月，享 5h $12 / 周 $30 / 月 $60 美元额度（约 6 倍），覆盖 Grok 4.5、GLM-5.2、Kimi K3、DeepSeek V4 等 18 款模型。' },
      ],
    },
    {
      title: '官方列明支持的国内套餐',
      table: {
        columns: ['平台', '入门价', '接入方式'],
        featuredColumn: 1,
        rows: [
          ['OpenCode Go（官方订阅）', '$10/月', '/connect 直接接入，模型 ID opencode-go/<model>'],
          ['智谱 GLM', '¥118/月', 'OpenAI 兼容端点 + API Key'],
          ['阿里云百炼', '¥200/月', '工具清单官方支持'],
          ['火山引擎方舟', '¥9.9/月起', '工具清单官方支持'],
          ['MiniMax Token Plan', '¥49/月', '工具清单官方支持'],
          ['小米 MiMo', '¥39/月', '工具清单官方支持'],
          ['白云智算', '按量 API', '任意兼容端点'],
        ],
        rowLinks: ['/plans/opencode-go', '/plans/zhipu', '/plans/aliyun', '/plans/volcengine', '/plans/minimax', '/plans/xiaomi', '/plans/baiyunzhisuan'],
      },
    },
    {
      title: '为什么选 OpenCode',
      highlights: [
        '不锁定厂商：一套配置多服务商切换，Codex/Claude Code 之外的中立选择',
        'Go 订阅性价比：$60/月额度只收 $10，DeepSeek V4 Flash 5h 可跑 3 万+ 次请求',
        '移动端延伸：kkcode.app 提供 iOS/Android 客户端，手机上续写任务',
        '隐私友好：多数模型 0 天数据保留、不用于训练',
      ],
    },
  ],
  faqs: [
    { question: 'OpenCode 和 OpenCode Go 是什么关系？', answer: 'OpenCode 是开源工具（免费）；OpenCode Go 是其官方推出的模型订阅（$10/月 6 倍用量）。工具可以不用 Go 订阅，Go 订阅也可以配合其他工具使用（兼容 OpenAI/Anthropic API）。' },
    { question: 'OpenCode 免费能用吗？', answer: '工具免费，但需要模型：接自己的 API Key（按量付费）或任意已订阅的 Coding Plan；Go 订阅额度用尽后仍可用免费模型。' },
    { question: '和 Claude Code 比怎么样？', answer: 'OpenCode 模型选择更自由、无厂商锁定；Claude Code 生态更成熟（MCP、IDE 插件、记忆）。重度终端用户两者并用很常见。' },
    { question: 'Go 的 6 倍用量是什么意思？', answer: '月付 $10 获得 $60 美元计价的月度额度（另有 5h $12 / 周 $30 窗口），额度按模型单价消耗，等效约 6 倍于订阅费的价值。' },
  ],
  related: [
    { kind: '详情', title: 'OpenCode Go 详解', description: '18 款模型与额度制度全解。', href: '/plans/opencode-go' },
    { kind: '榜单', title: 'Coding Plan 性价比排行榜', description: 'Go 的单位成本排名依据。', href: '/leaderboard' },
    { kind: '优惠', title: 'Go 首月 $5 与邀请入口', description: '邀请双方各得 $5。', href: '/deals' },
  ],
})

export const cursorTool = defineContentPage({
  slug: 'cursor',
  accent: 'blue',
  seo: {
    title: 'Cursor 用哪个 Coding Plan？2026 支持 API 接入的国产套餐清单',
    description: 'AI IDE Cursor 接入国产 Coding Plan 指南：智谱 GLM、阿里云百炼、火山方舟、OpenCode Go 等官方列明支持 Cursor 的套餐清单、配置方式与模型选择建议。',
    canonical: 'https://codingplan.org/tools/cursor',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '工具 · Cursor',
    title: 'Cursor',
    highlight: '配哪个 Coding Plan？',
    description: 'Cursor 是最流行的 AI IDE 之一。除自带订阅外，它支持自定义 API Key——多数国产 Coding Plan 官方列明支持 Cursor，把 IDE 挂到套餐额度上。',
    stats: [
      { value: 'IDE', label: '产品形态' },
      { value: '6+', label: '国内可接套餐' },
      { value: 'API Key', label: '接入方式' },
    ],
  },
  sections: [
    {
      title: '官方列明支持的套餐',
      table: {
        columns: ['平台', '入门价', '接入方式'],
        featuredColumn: 1,
        rows: [
          ['火山引擎方舟', '¥9.9/月起', 'OpenAI 兼容 API Key'],
          ['智谱 GLM', '¥118/月', '工具清单官方支持'],
          ['阿里云百炼', '¥200/月', '工具清单官方支持'],
          ['MiniMax Token Plan', '¥49/月', '工具清单官方支持'],
          ['OpenCode Go', '$10/月', 'OpenAI 兼容 API'],
          ['小米 MiMo', '按平台清单', '部分档位支持'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/zhipu', '/plans/aliyun', '/plans/minimax', '/plans/opencode-go', '/plans/xiaomi'],
      },
    },
    {
      title: 'Cursor 的两种付费路线',
      cards: [
        { icon: '🧾', title: 'Cursor 自带订阅', description: 'Pro $20/月含额度与高级模型访问，配置零门槛。' },
        { icon: '🔑', title: '自定义 API Key', description: '在设置里填国内套餐的 OpenAI 兼容端点与 Key，消耗 Coding Plan 额度，通常更便宜且模型可选。' },
      ],
    },
    {
      title: '背景与生态',
      paragraphs: [
        'Cursor 基于VS Code 分叉，凭借深度索引与 Composer 多文件改写成为 AI IDE 的标杆产品。国产厂商普遍把 Cursor 列入官方支持清单，原因很简单：它的自定义 API Key 路径成熟，厂商只需提供 OpenAI 兼容端点即可接入，无需专门适配。',
        '需要注意的是，Cursor 的部分招牌能力（如 Tab 补全、代码库索引）与自家模型和基础设施绑定，走 BYOK 路线时主要覆盖 Chat/Agent 对话链路；如果你重度依赖 Tab 补全，自带订阅仍是完整体验，国内套餐则作为对话与生成的额度池。',
      ],
    },
    {
      title: '怎么选',
      highlights: [
        'GLM-5.2 写码主力：智谱 Lite 年付 ¥94.4/月，Cursor + Claude Code 共享额度',
        '多模型轮换：火山方舟一份额度切 8+ 款模型，¥9.9 起试',
        '全模态补图：MiniMax M3 原生多模态，UI 截图理解',
        '国际开源模型：OpenCode Go（Grok 4.5 / K3 / GLM-5.2）$10/月',
      ],
    },
  ],
  faqs: [
    { question: 'Cursor 接国内套餐麻烦吗？', answer: '不麻烦：Cursor Settings → Models → OpenAI API Key 处填厂商的 OpenAI 兼容端点与 Key 即可，与填 OpenAI Key 的路径相同。' },
    { question: '接国内套餐后 Tab 补全还能用吗？', answer: 'Cursor 部分功能（如 Tab 自动补全）绑定自家模型；自定义 Key 主要作用于 Chat/Composer 的对话与生成。以 Cursor 官方说明为准。' },
    { question: '哪个套餐对 Cursor 支持最好？', answer: '智谱、阿里云、火山、MiniMax 都在官方工具清单里点名 Cursor；阿里云支持的工具面最广（11+），火山胜在多模型。' },
  ],
  related: [
    { kind: '工具', title: 'Claude Code 用哪个套餐', description: '终端党看这篇。', href: '/tools/claude-code' },
    { kind: '详情', title: '智谱 GLM 详解', description: 'Cursor 官方支持的主力套餐。', href: '/plans/zhipu' },
    { kind: '榜单', title: '性价比排行榜', description: '全部可接套餐价格对比。', href: '/leaderboard' },
  ],
})

export const clineTool = defineContentPage({
  slug: 'cline',
  accent: 'orange',
  seo: {
    title: 'Cline 支持哪些 Coding Plan？2026 VS Code 开源 Agent 配置指南',
    description: 'VS Code 开源编程智能体 Cline 的套餐选择：智谱、阿里云、火山方舟、MiniMax、OpenCode Go 等官方支持 Cline 的国产 Coding Plan 清单、API Key 配置与模型建议。',
    canonical: 'https://codingplan.org/tools/cline',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '工具 · Cline',
    title: 'Cline',
    highlight: '配哪个 Coding Plan？',
    description: 'Cline 是 VS Code 市场最受欢迎的开源编程 Agent 之一，自带 API Key 即用（BYOK），不强制订阅。国内主流 Coding Plan 均官方列明支持。',
    stats: [
      { value: '免费', label: '开源插件' },
      { value: 'BYOK', label: '自带 Key' },
      { value: '6+', label: '国内可接套餐' },
    ],
  },
  sections: [
    {
      title: '官方列明支持的套餐',
      table: {
        columns: ['平台', '入门价', '接入方式'],
        featuredColumn: 1,
        rows: [
          ['火山引擎方舟', '¥9.9/月起', 'OpenAI 兼容端点'],
          ['小米 MiMo', '¥39/月', '工具清单官方支持'],
          ['MiniMax Token Plan', '¥49/月', '工具清单官方支持'],
          ['OpenCode Go', '$10/月', 'OpenAI/Anthropic 兼容'],
          ['智谱 GLM', '¥118/月', '工具清单官方支持'],
          ['阿里云百炼', '¥200/月', '工具清单官方支持'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/xiaomi', '/plans/minimax', '/plans/opencode-go', '/plans/zhipu', '/plans/aliyun'],
      },
    },
    {
      title: 'Cline 适合谁',
      highlights: [
        '重度 VS Code 用户：不想换 IDE，一个插件获得 Agent 能力',
        '预算敏感：BYOK 模式下接 ¥39-49 档国产套餐即可全天使用',
        '想要透明可控：开源代码、每步操作可见可回滚，配额消耗自己掌握',
        '与 Roo Code 同源生态：配置习惯可平滑迁移',
      ],
    },
    {
      title: '配置要点',
      paragraphs: [
        'Cline 设置中选择 OpenAI Compatible（或 Anthropic）Provider，填入厂商的 Base URL 与 API Key，模型名用套餐内模型 ID。额度与你在终端、Cursor 等工具的消耗共享同一套餐池。',
      ],
    },
    {
      title: '背景与生态',
      paragraphs: [
        'Cline 起源于 VS Code 插件市场，靠「计划-执行」两段式工作流与完全透明的操作审批赢得口碑，后来衍生出 Roo Code 等分支，形成事实上的开源 Agent 小生态。对国产厂商而言，适配 Cline 的成本低（标准 OpenAI/Anthropic 兼容端点即可），因此它出现在几乎所有平台的官方工具清单里。',
        '与 IDE 自带助手相比，Cline 的优势是不锁定厂商：你可以今天用 GLM-5.2，明天把同一个插件指向 Kimi 或方舟，配置只改一行。缺点是重度 Agent 任务多轮调用多，5h 窗口消耗比交互式问答快得多，选档位时要留出余量。',
      ],
    },
  ],
  faqs: [
    { question: 'Cline 免费吗？', answer: '插件免费开源；消耗的是你接入的模型额度（Coding Plan 或按量 API）。' },
    { question: 'Cline 和 Roo Code 什么关系？', answer: 'Roo Code 是 Cline 的社区分支，交互与配置方式相近，均支持自定义 API Key；两者都在多数国产套餐的官方工具清单中。' },
    { question: 'Cline 和 Cursor 怎么选？', answer: 'Cursor 是完整 IDE（自带订阅），Cline 是 VS Code 插件（BYOK）。已有 VS Code 工作流、想控制成本选 Cline；想要一体化体验选 Cursor。' },
  ],
  related: [
    { kind: '工具', title: 'Roo Code 配置指南', description: '同源分支工具。', href: '/tools/roo-code' },
    { kind: '详情', title: '火山引擎方舟详解', description: 'Cline 支持的多模型套餐。', href: '/plans/volcengine' },
    { kind: '百科', title: 'Coding Plan 是什么？', description: 'BYOK 与订阅的关系。', href: '/blogs/what-is-coding-plan' },
  ],
})

export const rooCodeTool = defineContentPage({
  slug: 'roo-code',
  accent: 'purple',
  seo: {
    title: 'Roo Code 支持哪些 Coding Plan？2026 配置与套餐选择指南',
    description: 'VS Code 开源 Agent Roo Code 的套餐选择：Kimi、智谱、阿里云、火山方舟、MiniMax、OpenCode Go 等官方支持 Roo Code 的国产 Coding Plan 清单、多模式工作流与配置要点。',
    canonical: 'https://codingplan.org/tools/roo-code',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '工具 · Roo Code',
    title: 'Roo Code',
    highlight: '配哪个 Coding Plan？',
    description: 'Roo Code 是 Cline 系的开源 VS Code Agent，以多模式（Code/Architect/Ask）工作流著称，同样自带 Key 即用。Kimi 官方工具清单点名支持。',
    stats: [
      { value: '免费', label: '开源插件' },
      { value: '3 模式', label: 'Code/Architect/Ask' },
      { value: '6+', label: '国内可接套餐' },
    ],
  },
  sections: [
    {
      title: '官方列明支持的套餐',
      table: {
        columns: ['平台', '入门价', '接入方式'],
        featuredColumn: 1,
        rows: [
          ['Kimi Code Plan', '¥49/月', '工具清单点名支持（Moderato 起）'],
          ['MiniMax Token Plan', '¥49/月', '工具清单官方支持'],
          ['OpenCode Go', '$10/月', 'OpenAI/Anthropic 兼容'],
          ['智谱 GLM', '¥118/月', '工具清单官方支持'],
          ['阿里云百炼', '¥200/月', '工具清单官方支持'],
          ['火山引擎方舟', '按平台清单', '部分工具清单收录'],
        ],
        rowLinks: ['/plans/kimi', '/plans/minimax', '/plans/opencode-go', '/plans/zhipu', '/plans/aliyun', '/plans/volcengine'],
      },
    },
    {
      title: 'Roo Code 的特色',
      highlights: [
        '多模式切换：Code 执行 / Architect 规划 / Ask 问答，任务分层更清晰',
        'Kimi 深度适配：Kimi 官方将 Roo Code 列为推荐工具之一（Moderato 起）',
        '开源透明：与 Cline 同源，配置与快捷习惯可复用',
        'BYOK 成本可控：接 ¥39-49 档套餐即可承担全天候 Agent 任务',
      ],
    },
    {
      title: '配置要点',
      paragraphs: [
        '在 Roo Code 的 Provider 设置中选择 OpenAI Compatible 或 Anthropic，填入 Base URL 与 API Key。用 Kimi 时注意：K3 旗舰需 Moderato 及以上档位；额度与 Kimi CLI、Claude Code 共享。',
      ],
    },
    {
      title: '背景与生态',
      paragraphs: [
        'Roo Code 从 Cline 分叉而来，核心增量是把 Agent 拆成 Code / Architect / Ask 等模式：规划、执行、问答各司其职，减少「一个模式干所有事」带来的额度浪费。对按 5h 窗口计费的国产套餐来说，这种分层工作流能明显降低无效消耗。',
        '选型上它和 Cline 不必二选一：两者配置格式接近，先把一家跑通，另一家复制配置即可对比体验。真正的决策点在套餐侧——Kimi 用户优先 Roo Code（官方点名），多模型用户则看哪个工具对 Auto 调度类特性支持更好。',
      ],
    },
  ],
  faqs: [
    { question: 'Roo Code 和 Cline 选哪个？', answer: '功能相近且同源。Roo Code 多模式工作流更细；Cline 社区更大、迭代稳。都免费，可各装一个试用一周再定。' },
    { question: '用 Kimi + Roo Code 需要哪个档位？', answer: '官方在工具支持处标注 Kimi CLI / Claude Code / Roo Code 由 Moderato（¥99/月）起支持；Andante 可先用 K2.6 验证工作流。' },
    { question: 'Roo Code 消耗套餐额度快吗？', answer: 'Agent 类工具多轮调用较多，5h 窗口消耗明显；建议把重规划任务交给 Architect 模式一次性输出，减少反复迭代。' },
  ],
  related: [
    { kind: '工具', title: 'Cline 配置指南', description: '同源工具对比。', href: '/tools/cline' },
    { kind: '详情', title: 'Kimi Code Plan 详解', description: '点名支持 Roo Code 的套餐。', href: '/plans/kimi' },
    { kind: '教程', title: 'Claude Code 配置 Kimi', description: 'Kimi 端点同样适用于 Roo Code。', href: '/blogs/claude-code-with-kimi' },
  ],
})
