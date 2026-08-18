/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器
 * [OUTPUT]: 对外提供 Claude Code × 国产 Coding Plan 配置教程文章数据（GLM/Kimi/火山方舟，挂载于 /articles）
 * [POS]: data 的教程意图承接层，承接「claude code 配置 XX」高流量信息型查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const claudeCodeWithGlm = defineContentPage({
  slug: 'claude-code-with-glm',
  accent: 'blue',
  seo: {
    title: 'Claude Code 配置智谱 GLM Coding Plan 教程 2026 - 环境变量 / 端点 / 常见报错',
    description: 'Claude Code 接入智谱 GLM Coding Plan 完整教程：开通套餐、获取 API Key、配置 ANTHROPIC_BASE_URL 指向 bigmodel.cn Anthropic 兼容端点、模型选择（GLM-5.2/5.1/5-Turbo）、每周 Credits 口径说明与常见报错排查。',
    canonical: 'https://codingplan.org/articles/claude-code-with-glm',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '教程 · Claude Code × 智谱 GLM',
    title: 'Claude Code',
    highlight: '接入 GLM Coding Plan',
    description: '智谱提供 Anthropic 兼容端点，Claude Code 无需改代码即可切换到 GLM-5.2（LMArena 代码榜开源第一），并用套餐的每周 Credits 计费，而非按 token 付费。',
    stats: [
      { value: '5 分钟', label: '配置耗时' },
      { value: '¥94.4/月起', label: '年付入门价' },
      { value: '10K-140K', label: '每周 Credits' },
    ],
  },
  sections: [
    {
      title: '前置准备',
      highlights: [
        '已安装 Node.js 18+ 与 Claude Code CLI（npm install -g @anthropic-ai/claude-code）',
        '已订阅智谱 GLM Coding Plan（Lite ¥118/月，年付约 ¥94.4/月）',
        '进入智谱开放平台控制台的 API Keys 页面创建一个 Key',
      ],
    },
    {
      title: '配置步骤',
      steps: [
        {
          name: '设置环境变量指向智谱端点',
          description: 'Claude Code 通过 ANTHROPIC_BASE_URL 与 ANTHROPIC_AUTH_TOKEN 识别自定义网关。把以下内容加入 ~/.zshrc 或 ~/.bashrc（macOS/Linux）或系统环境变量（Windows）。',
          code: `export ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/anthropic"
export ANTHROPIC_AUTH_TOKEN="你的智谱 API Key"
# 生效
source ~/.zshrc`,
        },
        {
          name: '启动并验证连接',
          description: '在项目目录运行 claude，输入一句简单提问确认响应正常；再执行 /model 查看可选模型，选择 GLM 旗舰或均衡型号。',
          code: `cd your-project
claude
# 进入交互后检查模型与额度
/model
/usage`,
        },
        {
          name: '（可选）用 ccswitch 管理多套套餐',
          description: '如果你同时持有多个 Coding Plan，可用社区工具 ccswitch 在不同服务商配置间一键切换，避免反复改环境变量。',
        },
        {
          name: '（可选）Windows PowerShell 配置',
          description: 'PowerShell 用户用以下命令设置用户级环境变量，设置后重启终端。',
          code: `[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://open.bigmodel.cn/api/anthropic", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的智谱 API Key", "User")`,
        },
      ],
    },
    {
      title: '额度口径说明',
      warning: 'GLM Coding Plan 按每周 Credits 计费：Lite 10,000 / Pro 60,000 / Max 140,000 Credits/周，每周刷新。旗舰模型单次调用消耗更高 Credits，与按 token 计费的 API 不是同一口径。',
      paragraphs: [
        '同一个 API Key 下的 Claude Code、Cursor 等工具共享套餐额度，跨工具不重复计费。',
        '额度用尽后等待下个周期刷新；如需查询剩余 Credits，在智谱控制台的套餐页面查看。',
      ],
    },
    {
      title: '常见报错排查',
      cards: [
        { icon: '🔌', title: '401 / 无效 Key', description: '确认 ANTHROPIC_AUTH_TOKEN 是智谱平台的 API Key（非登录密码），且无多余空格与引号。' },
        { icon: '🧭', title: '仍请求官方端点', description: '检查 ANTHROPIC_BASE_URL 拼写（注意 https:// 与路径 /api/anthropic），重启终端使环境变量生效。' },
        { icon: '📉', title: '额度提前耗尽', description: '旗舰模型 Credits 消耗高；先切 GLM-5-Turbo 处理轻任务，把旗舰留给复杂改动。' },
        { icon: '🔁', title: '多套餐冲突', description: '如配置了多个网关，用 ccswitch 或逐个注释环境变量排查生效来源。' },
      ],
    },
  ],
  faqs: [
    { question: 'Claude Code 用 GLM Coding Plan 还收费吗？', answer: 'Claude Code 工具本身免费，消耗的是智谱套餐的每周 Credits，不再按 token 另行计费。请确认 Key 来自已订阅 Coding Plan 的智谱账号。' },
    { question: '能用到 GLM-5.2 吗？', answer: '可以。GLM-5.2 已全量开放，1M 上下文；各档位逐步开放策略为 Pro 优先体验、Max 首发接入，Lite 逐步开放。' },
    { question: '端点地址以哪里为准？', answer: '以智谱开放平台官方文档的「Anthropic 兼容」章节为准，本教程写的是 open.bigmodel.cn/api/anthropic；如官方调整路径请同步更新环境变量。' },
    { question: '和直接买 Claude 订阅冲突吗？', answer: '不冲突。环境变量决定 Claude Code 连哪个后端；想切回官方订阅时注释掉 ANTHROPIC_BASE_URL 即可。' },
  ],
  related: [
    { kind: '详情', title: '智谱 GLM Coding Plan 详解', description: '三档价格与每周 Credits 完整说明。', href: '/plans/zhipu' },
    { kind: '对比', title: 'GLM vs Kimi 怎么选', description: '两家旗舰模型与额度口径对比。', href: '/articles/glm-vs-kimi' },
    { kind: '教程', title: 'Claude Code 配置 Kimi Code Plan', description: '另一家低价套餐的接入教程。', href: '/articles/claude-code-with-kimi' },
    { kind: '优惠', title: '智谱连续包年 7 折入口', description: '年付 ¥94.4/月起。', href: '/deals' },
  ],
})

export const claudeCodeWithKimi = defineContentPage({
  slug: 'claude-code-with-kimi',
  accent: 'purple',
  seo: {
    title: 'Claude Code 配置 Kimi Code Plan 教程 2026 - 环境变量 / 免费档 / K3 模型',
    description: 'Claude Code 接入 Kimi Code Plan 完整教程：开通套餐（免费档 Adagio 可试用）、配置 Moonshot Anthropic 兼容端点、K3/K2.6 模型选择、5h+7 天额度口径与常见问题排查。',
    canonical: 'https://codingplan.org/articles/claude-code-with-kimi',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '教程 · Claude Code × Kimi',
    title: 'Claude Code',
    highlight: '接入 Kimi Code Plan',
    description: 'Moonshot 提供 Anthropic 兼容端点，Claude Code 可以直接跑在 Kimi Code Plan 上：免费档即可试用 K2.6，Moderato 起可用 K3 旗舰（2.8T 参数，1M 上下文）。',
    stats: [
      { value: '¥0 起', label: '免费档试用' },
      { value: '¥39/月', label: '年付入门价' },
      { value: '5h+7天', label: '额度口径' },
    ],
  },
  sections: [
    {
      title: '前置准备',
      highlights: [
        '已安装 Node.js 18+ 与 Claude Code CLI',
        '在 kimi.com/code 订阅任意档位（Adagio 免费档即可完成本教程）',
        '在 Moonshot 开放平台控制台创建 API Key',
        '注意：K3 仅 Moderato（¥99/月）及以上可用，免费档/Andante 只能用 K2.6',
      ],
    },
    {
      title: '配置步骤',
      steps: [
        {
          name: '设置环境变量指向 Moonshot 端点',
          description: '将 Claude Code 的 Anthropic 网关指向 Moonshot 的 Anthropic 兼容端点。',
          code: `export ANTHROPIC_BASE_URL="https://api.moonshot.cn/anthropic"
export ANTHROPIC_AUTH_TOKEN="你的 Moonshot API Key"
source ~/.zshrc`,
        },
        {
          name: '启动 Claude Code 并选模型',
          description: '运行 claude 后用 /model 选择模型：K2.6 稳定主力（全档可用），K3 旗舰需 Moderato 及以上档位。',
          code: `cd your-project
claude
/model`,
        },
        {
          name: '查看剩余额度',
          description: 'Kimi 采用 5 小时 + 7 天双窗口额度，在 kimi.com 的套餐页查看刷新进度；额度未用完不累积。',
        },
      ],
    },
    {
      title: '额度口径说明',
      warning: 'Kimi 的额度是「5 小时 token 配额 + 7 天刷新」双窗口，与 GLM 的每周 Credits、按量 API 的 token 计费均不是同一口径，不能直接换算。',
      paragraphs: [
        'Andante 参考约 300-1,200 次调用/5h，重度使用建议 Moderato 起步。',
        'Claude Code 与 Kimi CLI / VS Code 插件共享同一套餐额度。',
      ],
    },
    {
      title: '常见报错排查',
      cards: [
        { icon: '🚫', title: 'K3 提示不可用', description: 'K3 需要 Moderato 及以上档位；免费档与 Andante 只能访问 K2.6/K2。' },
        { icon: '🔑', title: '401 鉴权失败', description: '确认使用 Moonshot 开放平台的 API Key，且账号已开通 Code Plan。' },
        { icon: '🐌', title: '限流 429', description: '5h 窗口额度耗尽会触发限流，等待窗口滚动恢复或升级档位。' },
        { icon: '🧭', title: '端点不生效', description: '检查 ANTHROPIC_BASE_URL 是否为 api.moonshot.cn/anthropic，重启终端。' },
      ],
    },
  ],
  faqs: [
    { question: '免费档能用 Claude Code 吗？', answer: '可以。Adagio 免费档包含 K2.6/K2 访问与 1 个 Agent 任务并行，足以验证链路；日常开发建议 Andante 起步。' },
    { question: 'K3 什么档位能用？', answer: 'Moderato（¥99/月）及以上。Allegro（¥699/月）独家解锁 1M token 超长上下文。' },
    { question: 'Kimi 端点地址以哪里为准？', answer: '以 Moonshot 开放平台官方文档为准，本教程写的是 api.moonshot.cn/anthropic；官方若调整请同步更新。' },
    { question: '额度和 GLM 一样吗？', answer: '不一样。Kimi 是 5h+7 天双窗口 token 配额，GLM 是每周 Credits；两者数值不可直接比较，建议各试一个月。' },
  ],
  related: [
    { kind: '详情', title: 'Kimi Code Plan 详解', description: '五档套餐与 K3 使用规则。', href: '/plans/kimi' },
    { kind: '对比', title: 'GLM vs Kimi 怎么选', description: '两家价格与额度口径对比。', href: '/articles/glm-vs-kimi' },
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '另一家热门套餐接入教程。', href: '/articles/claude-code-with-glm' },
  ],
})

export const claudeCodeWithVolcengine = defineContentPage({
  slug: 'claude-code-with-volcengine',
  accent: 'cyan',
  seo: {
    title: 'Claude Code 接入火山引擎方舟 Coding Plan 教程 2026 - 多模型切换 / Auto 模式 / ¥9.9 首购',
    description: 'Claude Code 接入火山引擎方舟 Coding Plan 教程：方舟 Anthropic 兼容端点配置、Doubao/GLM-5.2/Kimi/MiniMax/DeepSeek 多模型切换、Auto 智能调度、Lite/Pro 套餐额度规则与常见问题。',
    canonical: 'https://codingplan.org/articles/claude-code-with-volcengine',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '教程 · Claude Code × 火山方舟',
    title: 'Claude Code',
    highlight: '接入方舟 Coding Plan',
    description: '方舟 Coding Plan 一份额度覆盖 8+ 款模型（Doubao-Seed-2.1-turbo、GLM-5.2、Kimi-K2.7、MiniMax-M3、Deepseek-V4 等），Claude Code 通过 Anthropic 兼容端点接入后可随时换模型，或交给 Auto 模式自动调度。',
    stats: [
      { value: '¥9.9', label: '首购起价' },
      { value: '8+', label: '可用模型' },
      { value: 'Auto', label: '智能调度' },
    ],
  },
  sections: [
    {
      title: '前置准备',
      highlights: [
        '已安装 Node.js 18+ 与 Claude Code CLI',
        '已开通火山引擎账号并订阅方舟 Coding Plan（新用户首购 ¥9.9 起）',
        '在方舟控制台的 API Key 管理页创建 Key（ep 开头的接入点 ID 按需创建）',
        '购买即开通模型调用权限，无需单独创建推理接入点',
      ],
    },
    {
      title: '配置步骤',
      steps: [
        {
          name: '设置环境变量指向方舟端点',
          description: '方舟提供 Anthropic 兼容网关，Claude Code 直接识别。',
          code: `export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/anthropic"
export ANTHROPIC_AUTH_TOKEN="你的方舟 API Key"
source ~/.zshrc`,
        },
        {
          name: '选择模型',
          description: '通过 /model 或环境变量指定模型 ID：写代码推荐 Doubao-Seed-2.1-turbo（速度）或 GLM-5.2（质量，限时加量 4 倍）；也可以直接选 Auto 模式由平台按任务自动路由。',
          code: `cd your-project
claude
/model   # 选择 Doubao / GLM / Kimi / MiniMax / DeepSeek 或 Auto`,
        },
        {
          name: '确认额度规则',
          description: '所有支持工具共享同一套餐额度（5h/周/月三重窗口），Lite 与 Pro 唯一区别是用量倍数（Pro 为 Lite 的 5 倍）。额度耗尽后等待周期恢复，不会扣账户余额。',
        },
      ],
    },
    {
      title: 'Auto 模式适合谁',
      cards: [
        { icon: '🤖', title: '不想选模型的人', description: 'Auto 按任务类型自动分发到合适模型，日常问答走轻量档、复杂改动走旗舰档。' },
        { icon: '🧪', title: '模型横向评测', description: '一份额度轮询 8+ 款模型，对比 Doubao/GLM/Kimi/MiniMax/DeepSeek 的出码风格。' },
        { icon: '💰', title: '成本敏感用户', description: '首购 ¥9.9 体验两个月，Auto 避免旗舰模型浪费在简单任务上。' },
      ],
    },
    {
      title: '常见报错排查',
      cards: [
        { icon: '📦', title: '模型未开通', description: 'Coding Plan 购买即开通模型；若报权限错误，确认订阅仍在有效期且未限购下架。' },
        { icon: '🔑', title: '鉴权失败', description: '使用方舟控制台的 API Key；若用接入点 ID 方式，确认接入点与模型匹配。' },
        { icon: '🚦', title: '限额 429', description: '5h/周/月任一窗口耗尽都会触发；Lite 用户高峰期可考虑升级 Pro（5 倍用量）。' },
        { icon: '🔁', title: '多套餐切换', description: '配合 ccswitch 等工具在方舟与智谱/Kimi 配置间切换，注意 BASE_URL 与 Key 成对替换。' },
      ],
    },
  ],
  faqs: [
    { question: '方舟端点地址以哪里为准？', answer: '以火山引擎方舟官方文档的「Anthropic 兼容」章节为准，本教程写的是 ark.cn-beijing.volces.com/api/anthropic。' },
    { question: '¥9.9 能用多久？', answer: '首购促销价 ¥9.9/月起通常覆盖前两个月（2.5 折），第三个月起恢复刊例价 ¥40/月；以活动页规则为准。' },
    { question: 'Claude Code 里能随时换模型吗？', answer: '可以，/model 即可切换；额度跨模型共享，切换不产生额外费用。' },
    { question: 'GLM-5.2 限时限量是怎么回事？', answer: '活动期间 GLM-5.2 等热门模型加量 4 倍（加量不加价），活动结束后恢复原额度，关注官方公告时间。' },
  ],
  related: [
    { kind: '详情', title: '火山引擎方舟 Coding Plan 详解', description: '套餐规则、模型阵容与优惠活动。', href: '/plans/volcengine' },
    { kind: '优惠', title: '方舟 ¥9.9 首购入口', description: '限时首购与邀请 9.5 折。', href: '/deals' },
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '单模型深度使用场景的替代方案。', href: '/articles/claude-code-with-glm' },
  ],
})
