/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器
 * [OUTPUT]: 对外提供 3 篇问题型长文数据（什么是 Coding Plan / 哪家最便宜 / 哪个好怎么选）
 * [POS]: data 的问题意图承接层，承接「是什么/多少钱/哪个好」类信息型与商业调研型查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const whatIsCodingPlan = defineContentPage({
  slug: 'what-is-coding-plan',
  accent: 'green',
  seo: {
    title: 'Coding Plan 是什么？和 Token API 有什么区别 - 概念/额度口径/适用人群详解',
    description: 'Coding Plan（AI 编程订阅套餐）详解：定义、与按量 Token API 的核心区别（订阅制 vs 后付费）、三种计费方式（Coding Plan / Token Plan / 按量 API）、5 小时限额与周/月额度口径解读、适合人群与选购建议。',
    canonical: 'https://codingplan.org/blogs/what-is-coding-plan',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '百科 · 概念详解',
    title: 'Coding Plan',
    highlight: '是什么？',
    description: '一句话：Coding Plan 是厂商把「一批编程模型 + 固定用量额度 + 多工具接入」打包成的月付订阅，用 Claude Code、Cursor 等工具时不再按 token 逐次计费，而是消耗套餐内额度。',
    stats: [
      { value: '订阅制', label: '固定月费' },
      { value: '多工具', label: 'Claude Code / Cursor 等' },
      { value: '3 种', label: '计费方式并存' },
    ],
  },
  sections: [
    {
      title: '从 Token API 说起',
      paragraphs: [
        '在 Coding Plan 出现之前，开发者用大模型写代码的主流方式是按量付费的 API：调用一次算一次 token，月底按量结算。这种方式对轻量用户友好，但两个痛点很明显：一是旗舰模型单价高，重度使用时账单不可预测；二是 API 只给「接口」，编程工具的接入、并发、限流都要自己搞定。',
        '2025 年起，智谱、Kimi、MiniMax、火山引擎、阿里云等厂商陆续推出「Coding Plan」：把旗舰编程模型、每月固定额度（请求数或 token 数）、20+ 编程工具的官方接入打包成 ¥10-¥200/月的订阅。你订阅的不是模型本身，而是一段时间的「用量配额 + 工具通行证」。',
        '到了 2026 年，这个市场进一步分化：MiniMax 转向按 token 计量的 Token Plan，小米采用 Credits 积分制，火山方舟一份额度覆盖 8+ 款模型并支持 Auto 自动调度——「订阅制编程额度」已经成为与按量 API 并列的主流消费方式。',
      ],
    },
    {
      title: '三种计费方式对比',
      table: {
        columns: ['计费方式', '怎么算钱', '代表平台', '适合谁'],
        rows: [
          ['Coding Plan（请求次数制）', '固定月费 + 5h/周/月请求数窗口', '阿里云百炼、火山方舟', '请求频率稳定、多工具混用'],
          ['Token Plan（token 用量制）', '固定月费 + 每月 token 总量', 'MiniMax', '长上下文、按内容量计费更公平'],
          ['Credits（积分制）', '固定月费 + 周期积分，不同模型不同积分消耗', '智谱 GLM、小米 MiMo', '需要混合使用高中低档模型'],
          ['按量 API（对照组）', '无月费，按 token 后付费', '各厂商 API、白云智算', '轻量/突发/自动化脚本'],
        ],
      },
    },
    {
      title: '「5 小时限额」是什么意思',
      paragraphs: [
        '多数 Coding Plan 采用滚动 5 小时窗口：从每次请求时间往回数 5 小时，这段内的请求数不能超过档位上限。窗口是滚动的——早高峰发起的请求会在 5 小时后「移出」窗口，额度随之恢复。这与「每天 0 点重置」的直觉不同，也解释了为什么额度有时「提前用完、又自己回来」。',
        '除了 5h 短窗口，通常还有周额度与月额度两层上限，任一窗口耗尽都会暂停服务，直到该窗口恢复。跨工具共享：Claude Code 与 Cursor 等工具消耗的是同一份额度。',
      ],
    },
    {
      title: '适合谁、不适合谁',
      cards: [
        { icon: '✅', title: '适合：每日出码的开发者', description: '每天高频使用 Claude Code / Cursor，月账单轻松超过套餐价，订阅制立刻回本。' },
        { icon: '✅', title: '适合：想要旗舰模型的人', description: '套餐内旗舰模型（GLM-5.2、K3、M3）的等效单价远低于按量 API。' },
        { icon: '❌', title: '不适合：轻度/突发用户', description: '一个月几十次调用的用户，按量 API 或免费档（如 Kimi Adagio）成本更低。' },
        { icon: '❌', title: '不适合：需要 API 编程接入', description: '自动化脚本、服务端集成等场景仍需标准 API；白云智算等按量平台更合适。' },
      ],
    },
    {
      title: '入门建议',
      highlights: [
        '先用免费/低价档验证工作流：Kimi 免费档、火山 ¥9.9 首购',
        '观察自己的 5h 窗口消耗，再决定升级档位',
        '额度口径（次数/积分/token）不同平台不可直接换算，别只看数字大小',
        '年付折扣退出成本高，月付验证后再转年付',
      ],
    },
  ],
  faqs: [
    { question: 'Coding Plan 和 ChatGPT Plus 是一回事吗？', answer: '不是。ChatGPT Plus 是面向对话产品的通用订阅；Coding Plan 特指面向编程工具（Claude Code、Cursor、OpenCode 等）的模型用量订阅，核心差异是「多工具接入 + 编程模型额度」。' },
    { question: '订阅了 Coding Plan 还需要按量 API 吗？', answer: '看场景。纯交互式编码不需要；如果要写自动化脚本、做服务端集成或用量超出套餐上限后不想停，按量 API 是补充。部分用户两者并存。' },
    { question: '额度用完了会怎样？', answer: '等待窗口恢复（5h 滚动/周/月），期间服务暂停且不会自动扣费到按量账单（OpenCode Go 可选开启余额兜底）。急着用可以升级档位。' },
    { question: '不同平台的「额度」能直接比大小吗？', answer: '不能。请求次数、token 数量、Credits 积分三种口径互不通用，且各平台单次请求消耗差异大。应按「自己一个月实际用几成额度」来比较。' },
  ],
  related: [
    { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '按起步价与单位成本排序。', href: '/blogs/cheapest-coding-plan' },
    { kind: '选型', title: 'Coding Plan 哪个好？怎么选', description: '按场景的推荐结论。', href: '/blogs/best-coding-plan' },
    { kind: '对比', title: 'GLM vs Kimi 怎么选', description: '两家额度口径差异详解。', href: '/blogs/glm-vs-kimi' },
  ],
})

export const cheapestCodingPlan = defineContentPage({
  slug: 'cheapest-coding-plan',
  accent: 'orange',
  seo: {
    title: '哪家 Coding Plan 最便宜？2026 入门价排行 - ¥9.9 起 / 免费档 / 单位成本分析',
    description: '2026 年国内 Coding Plan 便宜程度排行：火山方舟首购 ¥9.9、Kimi 免费档 + 年付 ¥39/月、小米 MiMo ¥39/月、OpenCode Go 首月 $5、MiniMax ¥49/月、智谱 ¥94.4/月（年付）。含单位额度成本分析与省钱组合建议。',
    canonical: 'https://codingplan.org/blogs/cheapest-coding-plan',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '选型 · 价格排行',
    title: '哪家 Coding Plan',
    highlight: '最便宜？',
    description: '「便宜」有两种算法：入门月费最低，或单位额度成本最低。本页先按入门价排序，再给出按量纲折算的成本视角，结论可能和你想的不一样。',
    stats: [
      { value: '¥9.9', label: '最低首购价' },
      { value: '¥0', label: '免费档可用' },
      { value: '¥39/月', label: '最低年付月价' },
    ],
  },
  sections: [
    {
      title: '入门价排行（2026 年 8 月核实）',
      description: '首购价/活动价与常规价分列，点击平台名查看完整套餐。',
      table: {
        columns: ['平台', '最低入门价', '常规入门价', '价格说明'],
        featuredColumn: 1,
        rows: [
          ['Kimi Code Plan', '¥0（Adagio 免费档）', '¥49/月', '年付 Andante 折合 ¥39/月'],
          ['火山引擎方舟', '¥9.9/月起（首购两月）', '¥40/月', '受邀下单再 9.5 折'],
          ['OpenCode Go', '$5 首月（约 ¥36）', '$10/月（约 ¥72）', '18 款开源模型 6 倍用量'],
          ['小米 MiMo', '¥39/月', '¥39/月', 'Credits 全档升级 5-8 倍'],
          ['MiniMax Token Plan', '¥44.1/月（受邀 9 折）', '¥49/月', '邀请人另返 10%'],
          ['Kimi 付费档', '¥39/月（年付 Andante）', '¥49/月', 'Moderato ¥79/月（年付）起可用 K3'],
          ['智谱 GLM', '¥94.4/月（连续包年）', '¥118/月', '连续包季 8 折'],
          ['阿里云百炼', '¥200/月（Pro）', '¥200/月', 'Lite 已停售；每日限量补货'],
          ['ChatGPT Go', '$8/月（约 ¥58）', '$8/月', '全球推广价'],
        ],
        rowLinks: ['/plans/kimi', '/plans/volcengine', '/plans/opencode-go', '/plans/xiaomi', '/plans/minimax', '/plans/kimi', '/plans/zhipu', '/plans/aliyun', 'https://chatgpt.com/'],
      },
    },
    {
      title: '单位额度成本视角',
      paragraphs: [
        '入门价低不等于划算。火山 ¥9.9 只有首两月，之后 ¥40/月的 Lite 额度是三窗口限额；Kimi Andante 年付 ¥39/月但约 300-1,200 次/5h，重度用户一周就会触顶。',
        '按「每元可用的模型调用量」估算（以各家公开口径粗算）：OpenCode Go 的 6 倍用量（月 $60 额度只付 $10）单位成本最低；MiniMax Plus 6 亿+ token/月（¥49）在国产套餐中量纲最大；智谱 Pro 年付 ¥430.4/月 换 60K Credits/周，适合稳定重度。',
        '结论：轻度选便宜入门价，重度选单位成本——两者常常不是同一家。',
      ],
    },
    {
      title: '省钱组合建议',
      highlights: [
        '零成本试水：Kimi Adagio 免费档 + 火山 ¥9.9 首购，两个月内几乎不花钱',
        '长期最低月费：Kimi Andante 年付 ¥39/月 或小米 MiMo ¥39/月',
        '单位成本之王：OpenCode Go $10/月 6 倍用量（约 ¥72，含国际开源模型）',
        '重度中文编码：智谱 Lite 连续包年 ¥94.4/月（含 4 类 MCP）',
        '多模型轮换：火山方舟一份额度用 8+ 款模型，避免多平台订阅',
      ],
    },
    {
      title: '便宜的坑',
      warning: '首购价、受邀价、年付价三列数字差异很大，比较时务必用同一口径。',
      cards: [
        { icon: '⏳', title: '首购价陷阱', description: '火山 ¥9.9 仅前两月；OpenCode Go 首月 $5 次月 $10。' },
        { icon: '🔓', title: '年付锁定', description: '年付单价低但退出不退款，先用月付验证额度够不够。' },
        { icon: '📉', title: '额度口径', description: '次数/token/Credits 不可直接比大小，便宜的定义因平台而异。' },
        { icon: '📦', title: '限量与补货', description: '阿里云 Pro 每日限量、智谱曾限售，最便宜的可能买不到。' },
      ],
    },
  ],
  faqs: [
    { question: '2026 年最便宜的 Coding Plan 是哪家？', answer: '入门价最低是火山方舟首购 ¥9.9（限前两月）；可持续的最低月费是 Kimi 年付 Andante ¥39/月与小米 MiMo ¥39/月；算单位额度成本则是 OpenCode Go（$10/月享 6 倍用量）最低。' },
    { question: '有完全免费的 Coding Plan 吗？', answer: '有。Kimi Adagio 免费档可用 K2.6（1 Agent 并行、5h+7 天额度）；OpenCode Go 额度耗尽后仍可用免费模型。但免费档都有限制，重度使用需付费。' },
    { question: '为什么智谱比别家贵？', answer: '智谱定位偏重度：三档起步 ¥118（年付 ¥94.4），但包含 GLM-5.2 旗舰、4 类内置 MCP 工具与更可预测的每周 Credits。轻度用户确实不必从智谱起步。' },
    { question: '便宜套餐够用吗？', answer: '取决于使用强度。每天 1-2 小时的轻中度使用，¥39-49 档基本够；全天候 Agent 重度任务普遍需要 ¥100+ 档位。先用低价档跑一周，观察触顶频率再决定。' },
  ],
  related: [
    { kind: '优惠', title: '邀请码与优惠汇总', description: '各平台首购/邀请入口集中页。', href: '/deals' },
    { kind: '选型', title: 'Coding Plan 哪个好？怎么选', description: '不差钱视角的推荐排行。', href: '/blogs/best-coding-plan' },
    { kind: '百科', title: 'Coding Plan 是什么？', description: '先弄懂额度口径再比价。', href: '/blogs/what-is-coding-plan' },
  ],
})

export const bestCodingPlan = defineContentPage({
  slug: 'best-coding-plan',
  accent: 'purple',
  seo: {
    title: 'Coding Plan 哪个好？2026 按场景推荐 - 模型/性价比/多模型/重度使用怎么选',
    description: '2026 年 Coding Plan 怎么选：要最强模型选智谱 GLM-5.2 或 Kimi K3；性价比选 OpenCode Go / MiniMax；多模型轮换选火山方舟；重度使用选阿里云 Pro / GLM Max；工具生态选 Claude。按场景给出明确推荐与理由。',
    canonical: 'https://codingplan.org/blogs/best-coding-plan',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '选型 · 场景推荐',
    title: 'Coding Plan',
    highlight: '哪个好？怎么选',
    description: '没有全局最优的 Coding Plan，只有场景最优。本页按模型质量、性价比、多模型轮换、重度使用、工具生态五个场景给出明确结论，每个结论都能在对应详情页核对依据。',
    stats: [
      { value: '5', label: '典型场景' },
      { value: '9', label: '候选平台' },
      { value: '1 篇', label: '给出明确答案' },
    ],
  },
  sections: [
    {
      title: '场景速查表',
      description: '先给结论，点击平台名核对完整依据。',
      table: {
        columns: ['你的场景', '推荐', '理由'],
        featuredColumn: 1,
        rows: [
          ['要最强开源模型', '智谱 GLM Pro', 'GLM-5.2 LMArena 代码榜开源第一，年付 ¥430.4/月含 60K Credits/周 + MCP'],
          ['要 1M 超长上下文', 'Kimi Allegro 或 GLM Max', 'K3 2.8T 参数 1M 上下文；GLM-5.2 同样 1M'],
          ['性价比优先', 'OpenCode Go', '$10/月 6 倍用量，18 款开源模型（Grok 4.5/GLM-5.2/K3 等）'],
          ['多模型轮换', '火山引擎方舟', '一份额度 8+ 款模型 + Auto 自动调度，¥9.9 起'],
          ['全模态（图/语音/音乐）', 'MiniMax Token Plan', 'M3 + 全系模型共享月度 token，¥49 起'],
          ['国内重度稳定出码', '阿里云百炼 Pro', '6,000 次/5h 三重额度，¥200/月每日补货'],
          ['工具生态最成熟（国际）', 'Claude Code 订阅', 'Opus 4.7 仍是综合最强，Pro $20 起'],
          ['零成本试用', 'Kimi Adagio', '免费档可用 K2.6 验证工作流'],
        ],
        rowLinks: ['/plans/zhipu', '/plans/kimi', '/plans/opencode-go', '/plans/volcengine', '/plans/minimax', '/plans/aliyun', 'https://claude.com/pricing', '/plans/kimi'],
      },
    },
    {
      title: '按模型质量选',
      paragraphs: [
        '2026 年 8 月的模型格局：Claude Opus 4.7 综合最强；开源阵营 GLM-5.2（LMArena 代码榜开源第一、全球第二）与 Kimi K3（2.8T 参数、1M 上下文）紧随其后；MiniMax M3 与 Deepseek-V4 组成第二梯队；Doubao-Seed-2.1-turbo 胜在速度。',
        '如果你主要看重「出码质量上限」，在国产里选 GLM（Pro 起步才能优先用到旗舰）；看重「超长上下文分析」选 Kimi K3（Moderato 起可用，Allegro 解锁 1M）；两条路线也可并行订阅，月成本约 ¥500。',
      ],
    },
    {
      title: '按使用强度选',
      cards: [
        { icon: '🌱', title: '轻度（每天 <1h）', description: 'Kimi Andante 年付 ¥39/月 或小米 MiMo ¥39/月，够用且便宜。' },
        { icon: '🌿', title: '中度（1-3h/天）', description: '智谱 Lite 年付 ¥94.4/月、MiniMax Plus ¥49/月 或 OpenCode Go $10/月。' },
        { icon: '🌳', title: '重度（全天候 Agent）', description: '智谱 Pro ¥430.4/月（年付）、阿里云 Pro ¥200/月、Kimi Moderato/Allegretto。' },
        { icon: '🏔️', title: '极端重度', description: 'GLM Max 年付 ¥862.4/月 或 Kimi Allegro ¥699/月，含高峰保障/1M 上下文。' },
      ],
    },
    {
      title: '常见组合策略',
      highlights: [
        '主 + 辅：智谱 Pro 主力出码 + 火山 Lite（¥9.9 起）轮换次要模型',
        '国内 + 国际：Kimi 中档 + OpenCode Go（$10）覆盖国际开源模型',
        '先低后高：任何平台都先最低档跑一周，触顶频率高再升级',
        '工具自由：全部推荐平台均支持 Claude Code 接入，切换成本仅是环境变量',
      ],
    },
  ],
  faqs: [
    { question: '2026 年综合最好的 Coding Plan 是哪个？', answer: '中文场景综合推荐智谱 GLM Pro（年付 ¥430.4/月）：GLM-5.2 开源第一、每周 Credits 口径可预测、MCP 内置。预算有限则 OpenCode Go 是性价比答案。' },
    { question: 'Kimi 和 GLM 哪个更好？', answer: '看场景：预算敏感、前端/UI 还原、1M 上下文选 Kimi；模型质量上限、MCP 工具链、稳定重度出码选 GLM。详见本站 GLM vs Kimi 对比页。' },
    { question: '只写前端选哪家？', answer: 'Kimi K3 的视觉与 UI 还原能力突出，Moderato ¥99/月起；搭配 Claude Code 使用效果更好。' },
    { question: '为什么没有唯一答案？', answer: '各平台额度口径（次数/积分/token）、模型分布、工具支持差异大，「最好」必然分场景。本页速查表按 8 个场景给出了明确推荐，可按需对号入座。' },
  ],
  related: [
    { kind: '对比', title: 'GLM vs Kimi 怎么选', description: '两大热门的正面对比。', href: '/blogs/glm-vs-kimi' },
    { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '价格优先视角的排行。', href: '/blogs/cheapest-coding-plan' },
    { kind: '详情', title: '智谱 GLM Coding Plan 详解', description: '综合推荐第一名的完整依据。', href: '/plans/zhipu' },
    { kind: '教程', title: 'Claude Code 配置智谱 GLM', description: '五分钟接入教程。', href: '/blogs/claude-code-with-glm' },
  ],
})
