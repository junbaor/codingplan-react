/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器
 * [OUTPUT]: 对外提供 /deals 邀请码与优惠汇总页数据
 * [POS]: data 的交易意图承接页，聚合 plans.ts 各平台优惠信息为单一优惠入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const dealsPage = defineContentPage({
  slug: 'deals',
  accent: 'green',
  seo: {
    title: 'Coding Plan 邀请码与优惠汇总 2026 - 火山 9.9 元起 / OpenCode Go 首月 $5 / MiniMax 受邀 9 折',
    description: '国内 AI Coding Plan 优惠入口汇总：火山引擎方舟首购 9.9 元起、OpenCode Go 首月 $5、MiniMax 受邀 9 折 + 邀请返利 10%、智谱连续包年 7 折、Kimi 年付最高省 ¥1,680。活动价与邀请入口持续更新。',
    canonical: 'https://codingplan.org/deals',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '优惠 · 邀请码 · 活动价',
    title: 'Coding Plan 优惠',
    highlight: '与邀请码汇总',
    description: '各平台当前可用的首购折扣、邀请返利与限时活动价集中在此。所有入口均指向官方页面，活动价以支付页为准。',
    stats: [
      { value: '¥9.9', label: '火山首购起' },
      { value: '$5', label: 'OpenCode Go 首月' },
      { value: '9 折', label: 'MiniMax 受邀价' },
      { value: '7 折', label: '智谱连续包年' },
    ],
  },
  sections: [
    {
      title: '当前优惠总览',
      description: '按起步价从低到高排列，点击平台名查看完整套餐详解。',
      table: {
        columns: ['平台', '当前优惠', '折后入门价', '优惠类型'],
        featuredColumn: 2,
        rows: [
          ['火山引擎方舟', '首购首两月 2.5 折 · 受邀再 9.5 折', '¥9.9/月起', '限时首购 + 邀请'],
          ['OpenCode Go', '首月 $5 · 邀请双方各得 $5', '$5/首月', '首购 + 邀请返利'],
          ['MiniMax Token Plan', '受邀 9 折 · 邀请人返 10% 代金券', '¥44.1/月起（受邀价）', '邀请双向福利'],
          ['Kimi Code Plan', '年付 ¥39/月起 · 最高省 ¥1,680', '¥49/月（年付 ¥39）', '年付折扣'],
          ['智谱 GLM Coding Plan', '连续包季 8 折 / 连续包年 7 折', '¥94.4/月（年付）', '连续订阅折扣'],
          ['小米 MiMo', 'Credits 全档升级 5-8 倍（加量不加价）', '¥39/月', '限时加量'],
          ['阿里云百炼', 'Pro 每日 9:30 限量补货', '¥200/月', '限量供应'],
          ['ChatGPT Go', '全球推广价 $8/月', '$8/月', '官方降价'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/opencode-go', '/plans/minimax', '/plans/kimi', '/plans/zhipu', '/plans/xiaomi', '/plans/aliyun', 'https://chatgpt.com/'],
      },
    },
    {
      title: '高性价比组合怎么买',
      headingLevel: 3,
      highlights: [
        '试水首选：火山方舟首购 ¥9.9（两月），体验 8+ 款模型轮换与 Auto 调度',
        '国际模型低价：OpenCode Go 首月 $5，18 款开源模型 6 倍用量，含 Grok 4.5 / GLM-5.2 / Kimi K3',
        '重度中文编码：智谱 GLM 连续包年 7 折，Lite 折后约 ¥94.4/月，含 4 类 MCP 工具',
        '全模态需求：MiniMax 受邀 9 折入门 Plus ¥44.1/月，文本/图像/语音/音乐共享额度',
        '长上下文：Kimi 年付 Andante ¥39/月，Moderato ¥79/月起可用 K3（1M 上下文需 Allegro）',
      ],
    },
    {
      title: '邀请码与返利规则',
      description: '各平台邀请机制差异较大，下单前先确认规则。',
      cards: [
        { icon: '🔥', title: '火山引擎方舟', description: '受邀下单享 9.5 折，邀请人获订单金额 5% 代金券，邀请人数无上限。' },
        { icon: '🤝', title: 'MiniMax', description: '受邀订阅 9 折，邀请者获 10% 代金券返利，两项福利可叠加。' },
        { icon: '🎁', title: 'OpenCode Go', description: '通过邀请链接订阅，好友与你各得 $5 使用额度。' },
        { icon: '📅', title: '智谱 GLM', description: '无邀请折扣，但连续包季 8 折、包年 7 折自动生效，档位越高省得越多。' },
      ],
    },
    {
      title: '使用优惠注意事项',
      warning: '活动价格与库存随时变化，本页信息可能滞后，请以各平台支付页实际结算价为准。',
      highlights: [
        '首购价通常仅限新用户首月/首两月，次月起恢复刊例价',
        '邀请返利多为代金券形式，一般不可提现、有有效期',
        '限量套餐（阿里云 Pro、智谱限售期）售罄需等待每日补货',
        '年付折扣退出成本高，建议先用月付验证额度是否够用',
        '同一平台不同档位的优惠可能不可叠加，升级套餐时折扣规则会重算',
      ],
    },
  ],
  faqs: [
    { question: 'Coding Plan 邀请码在哪里获取？', answer: '各平台活动页、官方社群与老用户分享是主要来源。火山方舟、MiniMax、OpenCode Go 支持邀请链接直接享受折扣；本站详情页的「立即购买」入口即包含当前可用的推广参数。' },
    { question: '首月优惠价后续会涨价吗？', answer: '会。火山首购 9.9 元仅限前两月，第三个月起恢复刊例价 ¥40/月起；OpenCode Go 首月 $5，之后 $10/月。订阅前请确认续费价。' },
    { question: '哪个平台优惠后最便宜？', answer: '短期试水是火山方舟首购 ¥9.9；长期最低月费是 OpenCode Go 的 $10/月（约 ¥72）但包含 6 倍用量；纯中文套餐里小米 MiMo ¥39/月与 Kimi 年付 Andante ¥39/月最低。详见本站「哪家 Coding Plan 最便宜」分析。' },
    { question: '代金券返利可以和首购价叠加吗？', answer: 'MiniMax 的受邀 9 折与邀请人返利可叠加；火山的首购 2.5 折与受邀 9.5 折能否叠加以活动页规则为准。多数平台代金券在支付时抵扣，不改变订阅档位价格。' },
    { question: '本站的链接是官方渠道吗？', answer: '是。本站所有购买入口均指向各平台官网，部分链接带推广参数（返利归本站，价格不变或更低）。' },
  ],
  cta: { title: '从最优惠的入口开始', label: '查看火山引擎方舟 ¥9.9 首购 →', href: 'https://volcengine.com/L/3sD5Ne_yUyk/' },
  related: [
    { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '按起步价与单位额度成本排序的完整分析。', href: '/blogs/cheapest-coding-plan' },
    { kind: '选型', title: 'Coding Plan 哪个好？怎么选', description: '按使用强度与模型偏好给出推荐结论。', href: '/blogs/best-coding-plan' },
    { kind: '动态', title: '价格与模型变更记录', description: '各平台涨价、上新与上下线事件时间线。', href: '/changelog' },
  ],
})
