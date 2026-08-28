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
    description: '国内 AI Coding Plan 变更时间线：GLM-5.3-Flash 上线与权重开源、Kimi 新会员体系预告、百炼 Qwen3.8-Max 转正、火山 Pro 定价公布与 GLM-5.2 下线、OpenCode Go 取消首月 $5、MiniMax Music 停服等事件倒序记录，点击查看对应平台最新套餐。',
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
          ['08-28', '智谱 GLM', 'GLM-5.3 旗舰权重在 HuggingFace 放出（兑现 8/14 发布两周内开源承诺）；GLM-5.3-Flash 权重同步以 MIT 开源'],
          ['08-28', 'Kimi', '定价页公告「新会员体系即将上线」：Kimi 权益与 Kimi Code 权益将拆分、按需购买，订阅中用户不受影响；新用户购买按钮变为「预约订阅」，模型侧新增 K3-256K 省额度版'],
          ['08-27', '阿里云百炼', 'Qwen3.8-Max 预览版转正（旧模型 ID 自动路由），新增 qwen3.8-flash、deepseek-v4-pro-0813 与图像/音频模型；优惠活动改为夜间（22:00-次日 08:00）Credits 五折'],
          ['08-26', '智谱 GLM', 'GLM-5.3-Flash 上线 Coding Plan 全档：GLM-5 系首个原生多模态模型（320B 总参 / 18B 激活），DeepSWE v1.1 63.4 超越 GLM-5.2，编码能力接近 Claude Opus 4.8；调用历史模型自动路由至新版'],
          ['08-26', '火山引擎方舟', 'DeepSeek-V4-Pro 正式版上线（Agent 能力全面跃升）；8/21 已新增 Doubao-Seed-Evolving（统一 ID 周级自动升级）'],
          ['08-24', '火山引擎方舟', '公告 GLM-5.2 将于 8/31 14:00 下线（8/17 起停止对新用户提供），到期未迁移自动路由至 GLM-5.3；此前限时加量 4 倍活动已于 8/8 结束'],
          ['08-24', 'OpenCode Go', '官方移除 Go 首月 $5 优惠（changelog v1.18.24），统一 $10/月；模型扩至 24 款（新增 GLM-5.3/5.3-Flash、LongCat-2.0、Qwen3.8 Flash、DeepSeek V4 Flash Vision 等，Grok 升级 4.6）'],
          ['08-20', 'MiniMax', 'Music 全系列模型停止服务（Token Plan 与按量接口均不可再调用），开源版 MiniMax-Music3 转由 HuggingFace / 魔搭提供'],
          ['08-17', 'ChatGPT', '渠道同步官方最新定价：Go 套餐 $10→$8（全球推广价），Plus 详情更新为 ChatGPT Images 2.0'],
          ['08-14', '智谱 GLM', 'GLM-5.3 发布并上线 Coding Plan 全量用户（ZCode / AutoClaw 同步），全员额度重置；Terminal-Bench 3.0 开源第一，编程体感较 5.2 提升 50%，权重两周内开源'],
          ['08-03', 'MiniMax', 'H3 模型宣布开源（HuggingFace MiniMax-AI/MiniMax-H3），Token Plan 内与 M3 共享额度'],
          ['08-11', 'OpenCode Go', '新收录：首月 $5 之后 $10/月，18 款开源模型 6 倍用量，OpenAI/Anthropic 兼容 API'],
        ],
      },
    },
    {
      title: '2026 年 7 月',
      table: {
        columns: ['日期', '平台', '事件'],
        rows: [
          ['07-31', '智谱 GLM', '订阅回归并改为透明积分制：连续包月 ¥118/¥538/¥1,078，每周 Credits 刷新（Lite 10K / Pro 60K / Max 140K）'],
          ['07-30', 'OpenAI', 'GPT-5.6 Luna API 降价 80%、Terra 降价 20%'],
          ['07-24', 'Anthropic', 'Claude Opus 5 发布：面向长时间运行智能体的 step-change 升级，Claude 订阅旗舰从 Opus 4.8 更替'],
          ['07-24', 'OpenAI', 'GPT-5.6 Sol「极速模式」API 预览（最高 14 倍标准速度）'],
          ['07-20', '阿里云百炼', 'Token Plan 个人版发布：Qwen3.8-Max（2.4T）首发尝鲜，早鸟 Lite ¥39 / Standard ¥139 / Pro ¥499，Credits 双窗口；原次数制 Coding Plan 升级并入'],
          ['07-22', 'MiniMax', 'API-vlm 调价至 ¥0.025/次，Token Plan 套餐额度不受影响'],
          ['07-19', 'Kimi', 'K3 发布后请求量暴涨，暂停 C 端新用户订阅，随扩容逐步恢复；后续将拆分 Kimi 主权益与 Kimi Code 权益'],
          ['07-17', 'Kimi', 'K3 旗舰正式上线：2.8T 参数、1M 上下文，Moderato 及以上可用，Allegro 解锁 1M 长对话'],
          ['07-09', 'OpenAI', 'GPT-5.6 家族（Sol / Terra / Luna）正式 GA 并同日上线 API，Sol 成为 Plus/Pro 主推模型，Luna 为免费版默认'],
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
    { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '涨价潮之后的最新入门价排序。', href: '/blogs/cheapest-coding-plan' },
    { kind: '对比', title: 'GLM vs Kimi 怎么选', description: '两家调价后的价格与额度口径对比。', href: '/blogs/glm-vs-kimi' },
  ],
})
