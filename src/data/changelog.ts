/**
 * [INPUT]: 依赖 content-page 的 defineContentPage 装配器
 * [OUTPUT]: 对外提供 /changelog 变更记录页数据（时间线倒序）
 * [POS]: data 的时效意图承接页，承接「涨价/上新/上线/下线」类资讯查询并导向详情页
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { defineContentPage } from './content-page'

export const changelogPage = defineContentPage({
  slug: 'changelog',
  accent: 'cyan',
  seo: {
    title: 'Coding Plan 变更记录 2026 - 涨价 / 上新 / 上下线时间线（持续更新）',
    description: '国内 AI Coding Plan 变更时间线：智谱订阅回归 ¥118 起、Kimi K3 发布、GLM-5.2 全量开放、MiniMax M3 上线、腾讯云下线、火山方舟新接入模型等事件倒序记录，点击查看对应平台最新套餐。',
    canonical: 'https://codingplan.org/changelog',
    locale: 'zh-CN',
    ogType: 'article',
  },
  hero: {
    badge: '变更记录 · 时间线',
    title: 'Coding Plan',
    highlight: '变更记录',
    description: '各平台价格调整、模型上新与套餐上下线的公开事件时间线，按时间倒序排列。事件详情以各平台官方公告为准。',
    stats: [
      { value: '2026', label: '覆盖年份' },
      { value: '9', label: '追踪平台' },
      { value: '倒序', label: '最新在前' },
    ],
  },
  sections: [
    {
      title: '2026 年 8 月',
      table: {
        columns: ['日期', '平台', '事件'],
        rows: [
          ['08-17', 'ChatGPT', '渠道同步官方最新定价：Go 套餐 $10→$8（全球推广价），Plus 详情更新为 ChatGPT Images 2.0'],
          ['08-11', 'OpenCode Go', '新收录：首月 $5 之后 $10/月，18 款开源模型 6 倍用量，OpenAI/Anthropic 兼容 API'],
          ['08-07', 'OpenAI', 'GPT-5.6 Sol 发布，成为 Plus/Pro 主推模型'],
          ['08-06', 'OpenAI', 'GPT-5.6 Luna 发布，成为免费版默认模型'],
        ],
      },
    },
    {
      title: '2026 年 7 月',
      table: {
        columns: ['日期', '平台', '事件'],
        rows: [
          ['07-31', '智谱 GLM', '订阅回归并改为透明积分制：连续包月 ¥118/¥538/¥1,078，每周 Credits 刷新（Lite 10K / Pro 60K / Max 140K）'],
          ['07-22', 'MiniMax', 'API-vlm 调价至 ¥0.025/次，Token Plan 套餐额度不受影响'],
          ['07-17', 'Kimi', 'K3 旗舰正式上线：2.8T 参数、1M 上下文，Moderato 及以上可用，Allegro 解锁 1M 长对话'],
        ],
      },
    },
    {
      title: '2026 年 5-6 月',
      table: {
        columns: ['日期', '平台', '事件'],
        rows: [
          ['06-13', '智谱 GLM', 'GLM-5.2 全量开放，发布即获 LMArena 代码榜开源第一、全球第二'],
          ['06-08', '火山引擎方舟', 'Agent Plan、Coding Plan 限时优惠公布，首购 9.9 元起'],
          ['05-31', 'MiniMax', 'M3 旗舰发布：原生多模态、1M 上下文；Token Plan 成为全球首个全模态订阅计划'],
          ['05-26', '小米 MiMo', '全档 Credits 升级 5-8 倍（492-9,840 亿/年），MiMo Claw 正式版上线（加购 ¥233.80/年）'],
        ],
      },
    },
    {
      title: '2026 年 2-4 月',
      table: {
        columns: ['日期', '平台', '事件'],
        rows: [
          ['04-22', '腾讯云', 'Coding Plan 全面下线，转向 Credits 计量的 Token Plan；本站保留历史归档页'],
          ['04-22', '火山引擎方舟', 'Coding Plan 上线 GLM-5.1；同期多家平台跟进接入'],
          ['02-22', '阿里云百炼', 'Coding Plan 上新：新增千问 3.5、GLM-4.7、Kimi-K2.5 等四款编程模型，首购两折起'],
          ['02-12', '百度千帆', '推出 AI 编码订阅服务 Coding Plan（本站暂未收录）'],
        ],
      },
    },
    {
      title: '如何使用这份时间线',
      highlights: [
        '涨价事件发生时，先看本站对应平台详情页的最新价再决定是否续费',
        '新模型上线初期常有限额或逐步开放策略，档位越高越早可用',
        '套餐下线（如腾讯云）后老用户一般会迁移至新体系，注意官方迁移公告',
        '限时加量（如火山 GLM-5.2 加量 4 倍）结束时间不定，重度使用趁早',
      ],
    },
  ],
  faqs: [
    { question: '这份变更记录多久更新一次？', answer: '本站在监测到平台公告或用户反馈后更新，通常在事件发生后的 1-3 天内。页脚「数据更新于」日期即最近一次核实时间。' },
    { question: '哪里可以看到各平台当前完整价格？', answer: '首页「快速对比」表格与各平台详情页始终展示最新核实价格，点击本页时间线中的平台名即可跳转。' },
    { question: '腾讯云 Coding Plan 下线后老用户怎么办？', answer: '腾讯云已于 2026-04-22 将 Coding Plan 转向 Credits 计量的 Token Plan，老用户按官方指引迁移，历史套餐信息可在本站归档页查阅。' },
    { question: '为什么最近多家平台都在涨价？', answer: '2026 年上半年算力成本上升叠加旗舰模型（GLM-5.2、K3、M3）能力跳升，智谱、Kimi 等均有调价。本页时间线按时间倒序记录了主要调价事件。' },
  ],
  related: [
    { kind: '优惠', title: 'Coding Plan 邀请码与优惠汇总', description: '当前可用的首购折扣与邀请返利入口。', href: '/deals' },
    { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '涨价潮之后的最新入门价排序。', href: '/articles/cheapest-coding-plan' },
    { kind: '对比', title: 'GLM vs Kimi 怎么选', description: '两家调价后的价格与额度口径对比。', href: '/articles/glm-vs-kimi' },
  ],
})
