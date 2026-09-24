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
    title: 'Coding Plan 邀请码与优惠汇总 2026 - 火山 2.5 折 9.9 元起 / 百炼 ¥39 / 智谱夜间畅用',
    description: '国内 AI Coding Plan 优惠入口汇总：火山引擎方舟首购 2.5 折 9.9 元起（Lite）/ 49.9 元起（Pro，活动期 6/10–11/8）、阿里云百炼 Token Plan ¥39/月起、智谱夜间畅用（9/3–10/7）与连续包年 7 折、小米首购 88 折、Kimi 年付最高省 ¥1,680。活动价与邀请入口持续更新。',
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
      { value: '¥49.9', label: '火山 Pro 首购' },
      { value: '88 折', label: '小米个人版首购' },
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
          ['火山引擎方舟', '首购首两月 2.5 折（Lite ¥9.9 / Pro ¥49.9，活动期 6/10–11/8）· 受邀再 9.5 折', '¥9.9/月起', '限时首购 + 邀请'],
          ['OpenCode Go', '$10/月享 6 倍用量（首月 $5 已取消，现含 32 款模型）', '$10/月', '常态化高性价比'],
          ['阿里云百炼', 'Token Plan ¥39/月起 · 夜间 3.8-Max / Flash 限时 4 折（22:00 后开跑）', '¥39/月', '常规订阅 + 夜间折扣'],
          ['小米 MiMo', 'Credits 全档升级 5-8 倍（加量不加价）· 个人版首购 88 折（每账号 1 次）', '¥39/月', '限时加量 + 首购'],
          ['MiniMax Token Plan', '国内三档 ¥49 / ¥119 / ¥469 · 额度用尽可购积分补充（¥30 起）', '¥49/月', '常规订阅 + 积分购买'],
          ['Kimi Code Plan', '新会员取消每周额度限制 · Plus 起可用 Kimi Code · 年付最高省 ¥1,680', '¥99/月（年付 ¥79）', '年付折扣'],
          ['智谱 GLM Coding Plan', '连续包季 8 折 / 包年 7 折 · 夜间畅用与庆双节限时活动', '¥94.4/月（年付）', '连续订阅折扣 + 限时活动'],
          ['ChatGPT Go', '全球推广价 $8/月', '$8/月', '官方低价档'],
        ],
        rowLinks: ['/plans/volcengine', '/plans/opencode-go', '/plans/aliyun', '/plans/xiaomi', '/plans/minimax', '/plans/kimi', '/plans/zhipu', 'https://chatgpt.com/'],
      },
    },
    {
      title: '高性价比组合怎么买',
      headingLevel: 3,
      highlights: [
        '试水首选：火山方舟首购 ¥9.9（两月），体验 6+ 款模型轮换与 Auto 调度',
        '国际模型低价：OpenCode Go $10/月，32 款模型 6 倍用量，含 GPT 6 Luna / GLM-5.3-Flash / Kimi K3',
        '重度中文编码：智谱 GLM 连续包年 7 折，Lite 折后约 ¥94.4/月，含 4 类 MCP 工具',
        '夜间畅用：智谱 9/3–10/7 每日 23:00–09:00，ZCode / AutoClaw 端 GLM-5.3-Flash 不限量、其他 Agent 额度翻倍；庆双节（9/25–10/7）全天按非高峰规则消耗',
        '全模态需求：MiniMax Plus ¥49/月起，文本/图像/语音共享额度（Music 系列 8/20 起停服）',
        '阿里云：百炼 Token Plan Lite ¥39/月，新增 12 项 Harness 权益，超额调用 88 折',
        '组合购更省：百炼 Token Plan × Qoder CN 入门版 ¥98 起（Lite ¥39 + Qoder 专业版 ¥59），额度不足可用加油包补充',
        '火山限时系数：deepseek-v4.1-flash 抵扣 5 折（9/15–10/30）、kimi-k2.8-preview 抵扣 6 折（9/17–9/30）',
        '长上下文：Kimi Plus ¥99/月（年付 ¥79）起可用 Kimi Code 与 K3，1M 上下文需 Pro 档（¥199/月）',
      ],
    },
    {
      title: '邀请码与返利规则',
      description: '各平台邀请机制差异较大，下单前先确认规则。',
      cards: [
        { icon: '🔥', title: '火山引擎方舟', description: '受邀下单享 9.5 折，邀请人获订单金额 5% 代金券，邀请人数无上限。' },
        { icon: '🤝', title: '小米 MiMo', description: '邀好友首单 9 折，邀请人最高返实付 20%（首单返 10%，邀请人为 Max / Standard 年费会员则比例翻倍），注册各得 ¥10。' },
        { icon: '📅', title: '智谱 GLM', description: '无邀请折扣，但连续包季 8 折、包年 7 折自动生效，档位越高省得越多；ZCode / AutoClaw 订阅用户专享 150% 额度。' },
      ],
    },
    {
      title: '使用优惠注意事项',
      warning: '活动价格与库存随时变化，本页信息可能滞后，请以各平台支付页实际结算价为准。',
      highlights: [
        '首购价通常仅限新用户首月/首两月，次月起恢复刊例价',
        '邀请返利多为代金券形式，一般不可提现、有有效期',
        '限量套餐（火山套餐限量发售）售罄需等待补货，首购价有截止时间',
        '年付折扣退出成本高，建议先用月付验证额度是否够用',
        '同一平台不同档位的优惠可能不可叠加，升级套餐时折扣规则会重算',
      ],
    },
  ],
  faqs: [
    { question: 'Coding Plan 邀请码在哪里获取？', answer: '各平台活动页、官方社群与老用户分享是主要来源。火山方舟、小米 MiMo 支持邀请链接直接享受折扣；本站详情页的「立即购买」入口即包含当前可用的推广参数。' },
    { question: '首月优惠价后续会涨价吗？', answer: '会。火山首购 2.5 折（Lite ¥9.9 / Pro ¥49.9）仅限前两个月，第三个月起恢复刊例价（¥40 / ¥200/月起）；OpenCode Go 的首月 $5 优惠已于 8/24 取消，现统一 $10/月。订阅前请确认续费价。' },
    { question: '哪个平台优惠后最便宜？', answer: '短期试水是火山方舟首购 ¥9.9（Lite）/ ¥49.9（Pro）；长期最低月费是 OpenCode Go 的 $10/月（约 ¥72）但包含 6 倍用量；纯中文套餐里小米 MiMo ¥39/月、百炼 ¥39/月最低，Kimi 可用 Kimi Code 的最低价档位为 Plus 年付 ¥79/月。详见本站「哪家 Coding Plan 最便宜」分析。' },
    { question: '代金券返利可以和首购价叠加吗？', answer: '火山的首购 2.5 折与受邀 9.5 折能否叠加以活动页规则为准；小米首购 88 折每账号仅 1 次、不参与包年。多数平台代金券在支付时抵扣，不改变订阅档位价格。' },
    { question: '本站的链接是官方渠道吗？', answer: '是。本站所有购买入口均指向各平台官网，部分链接带推广参数（返利归本站，价格不变或更低）。' },
  ],
  cta: { title: '从最优惠的入口开始', label: '查看火山引擎方舟 ¥9.9 首购 →', href: 'https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=33BB3T98' },
  related: [
    { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '按起步价与单位额度成本排序的完整分析。', href: '/blogs/cheapest-coding-plan' },
    { kind: '选型', title: 'Coding Plan 哪个好？怎么选', description: '按使用强度与模型偏好给出推荐结论。', href: '/blogs/best-coding-plan' },
    { kind: '动态', title: '价格与模型变更记录', description: '各平台涨价、上新与上下线事件时间线。', href: '/changelog' },
  ],
})
