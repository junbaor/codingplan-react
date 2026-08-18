/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器与 plans/home 的公开价格口径
 * [OUTPUT]: 对外提供 /leaderboard 性价比榜单页数据（SSG 全量表格）
 * [POS]: data 的榜单意图承接页，对标竞品 JS 渲染榜单并以服务端直出反超
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const leaderboardPage = defineContentPage({
  slug: 'leaderboard',
  accent: 'slate',
  seo: {
    title: 'Coding Plan 性价比排行榜 2026 - 入门价 / 额度量纲 / 模型阵容全量对比',
    description: '2026 年 8 月国内 AI Coding Plan 性价比榜：入门价最低火山 ¥9.9（首购）/ Kimi 年付 ¥39；额度量纲最大 MiniMax 6 亿+ token/月；模型最多火山 8+ 款。当前最低入门 ¥9.9/月，九平台全量表格服务端直出，点击查看各平台详情。',
    canonical: 'https://codingplan.org/leaderboard',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '榜单 · 持续更新',
    title: 'Coding Plan',
    highlight: '性价比排行榜',
    description: '同一张表看懂九个平台的入门价、额度量纲与模型阵容。榜单按入门价排序，附单位成本视角的亚军名单；数据与各平台详情页同源。',
    stats: [
      { value: '9', label: '平台全量' },
      { value: '¥9.9', label: '当前最低入门' },
      { value: '8+', label: '最多模型数' },
    ],
  },
  sections: [
    {
      title: '入门价排行（低→高）',
      description: '含首购/年付口径说明，点击平台名进入详情页核对最新价格。',
      table: {
        columns: ['排名', '平台', '入门价', '额度量纲', '核心模型'],
        featuredColumn: 2,
        rows: [
          ['1', '火山引擎方舟', '¥9.9/月起（首购两月）', '5h + 周 + 月三重窗口', 'Doubao / GLM-5.2 / Kimi-K3 / DeepSeek'],
          ['2', '小米 MiMo', '¥39/月', 'Credits 492-9,840 亿/年', 'MiMo-V2.5-Pro / 全模态'],
          ['3', 'Kimi Code Plan', '¥49/月（年付 ¥39）', '5h token + 7 天刷新', 'K3 / K2.6'],
          ['4', 'MiniMax Token Plan', '¥49/月（受邀 9 折）', '6亿-71亿+ token/月', 'M3 / M2.7 / 全模态'],
          ['5', 'OpenCode Go', '$10/月（首月 $5）', '5h $12 / 周 $30 / 月 $60', 'Grok 4.5 / GLM-5.2 / K3 等 18 款'],
          ['6', '智谱 GLM', '¥118/月（年付 ¥94.4）', '10K-140K Credits/周', 'GLM-5.3 / 5.2 / 5.1'],
          ['7', '阿里云百炼', '¥200/月（Pro）', '6,000 次/5h 三重额度', 'qwen3.5 系列 + 第三方'],
          ['8', '白云智算', '按量计费（无月费）', 'token 后付费', '多模型 API 聚合'],
          ['9', '腾讯云', '已下线（归档）', '—', 'HY 2.0 / GLM-5（历史）'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/xiaomi', '/plans/kimi', '/plans/minimax', '/plans/opencode-go', '/plans/zhipu', '/plans/aliyun', '/plans/baiyunzhisuan', '/plans/tencentcloud'],
      },
    },
    {
      title: '分项冠军',
      cards: [
        { icon: '💰', title: '最低入门价', description: '火山方舟首购 ¥9.9/月（限前两月，第三月起 ¥40 刊例价）。' },
        { icon: '📦', title: '最大额度量纲', description: 'MiniMax Plus 6 亿+ token/月（¥49），Ultra 71 亿+；全模态共享。' },
        { icon: '🧩', title: '最多模型', description: '火山方舟 8+ 款（Doubao/GLM/Kimi/MiniMax/DeepSeek）+ Auto 调度。' },
        { icon: '🏆', title: '最强旗舰', description: 'GLM-5.2（LMArena 代码榜开源第一、全球第二）与 Kimi K3（2.8T、1M 上下文）。' },
        { icon: '⚡', title: '单位成本', description: 'OpenCode Go：$10/月享 $60/月额度（6 倍），含 18 款开源模型。' },
        { icon: '🧰', title: '工具生态', description: '智谱 20+ 工具 + 全档内置 4 类 MCP；阿里云 11+ 工具。' },
      ],
    },
    {
      title: '榜单怎么读',
      warning: '各平台额度口径不同（次数/token/Credits/美元额度），「量纲」列不可直接比大小，请结合自己的使用强度判断。',
      highlights: [
        '入门价低 ≠ 划算：首购价限时（火山 ¥9.9 仅两月）、年付价锁定周期长',
        '重度用户看「额度量纲 + 旗舰可用性」，轻度用户看「入门价 + 免费档」',
        '多模型需求优先火山方舟，单一旗舰深度使用优先智谱/Kimi',
        '国际开源模型需求看 OpenCode Go（$10/月 6 倍用量）',
        '自动化/API 集成场景选白云智算按量 API，而非订阅套餐',
      ],
    },
    {
      title: '方法论与更新',
      paragraphs: [
        '本榜单价格与额度均取自各平台官网公开口径，与站内详情页同一数据源（详情页随官网变动即时修正）。排名规则：按「当前可用的最低月度入门价」升序排列，首购价与常规价不一致时取首购价并标注。',
        '榜单不包含「已下线」产品（腾讯云保留归档位仅作历史参考）；也不包含暂未开放订阅的平台（如百度千帆、无问芯穹），待其口径稳定后纳入。',
      ],
    },
  ],
  faqs: [
    { question: '这个榜单多久更新一次？', answer: '与站内详情页同一数据源，监测到平台调价或上下线后同步更新；页脚「数据更新于」即最近一次核实时间。' },
    { question: '为什么 OpenCode Go 用美元计价？', answer: '它是面向国际市场的订阅（$10/月），额度也以美元计（月 $60），面向国内开发者的总成本需自行按汇率折算，故排在人民币套餐之后仅作参考。' },
    { question: '性价比第一名到底是哪个？', answer: '分场景：短期试水是火山 ¥9.9；长期最低月费是 Kimi 年付 ¥39/小米 ¥39；单位额度成本是 OpenCode Go；模型质量上限是智谱 GLM/Kimi K3。没有单一冠军，详见「分项冠军」。' },
    { question: '百度千帆、无问芯穹为什么不在榜上？', answer: '千帆 Coding Plan 2026 年 2 月刚上线、无问芯穹为聚合平台，两者公开口径尚不稳定，本站核实后才会纳入榜单，避免误导。' },
  ],
  related: [
    { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '入门价与单位成本的完整分析。', href: '/blogs/cheapest-coding-plan' },
    { kind: '选型', title: 'Coding Plan 哪个好？怎么选', description: '按场景的明确推荐。', href: '/blogs/best-coding-plan' },
    { kind: '动态', title: '价格与模型变更记录', description: '影响排名的调价事件时间线。', href: '/changelog' },
    { kind: '优惠', title: '邀请码与优惠汇总', description: '榜单低价对应的购买入口。', href: '/deals' },
  ],
})
