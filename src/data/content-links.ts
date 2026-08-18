/**
 * [INPUT]: 依赖 Locale 领域类型，链接目标为站内 deals/changelog/compare/guides/questions 路由
 * [OUTPUT]: 对外提供 getRelatedLinks 按套餐 slug 与语言返回相关教程/对比/问题页内链
 * [POS]: data 的内链关系层，被 PlanPage 的相关内容模块消费，形成详情页到内容矩阵的权重通道
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Locale } from '../types'

export interface RelatedLink {
  kind: string
  title: string
  description?: string
  href: string
}

const zhCommon: Record<string, RelatedLink> = {
  deals: { kind: '优惠', title: 'Coding Plan 邀请码与优惠汇总', description: '各平台邀请返利、首购折扣与限时活动价集中更新。', href: '/deals' },
  changelog: { kind: '动态', title: 'Coding Plan 价格与模型变更记录', description: '涨价、上新、上下线事件时间线，按时间倒序。', href: '/changelog' },
  leaderboard: { kind: '榜单', title: 'Coding Plan 性价比排行榜', description: '九平台入门价、额度量纲与模型阵容全量对比。', href: '/leaderboard' },
  whatIs: { kind: '百科', title: 'Coding Plan 是什么？', description: '从 Token API 到订阅制套餐的概念、额度口径与适用人群。', href: '/articles/what-is-coding-plan' },
  cheapest: { kind: '选型', title: '哪家 Coding Plan 最便宜？', description: '按起步价与单位额度成本排序的省钱结论。', href: '/articles/cheapest-coding-plan' },
  best: { kind: '选型', title: 'Coding Plan 哪个好？怎么选', description: '按使用强度、模型偏好与工具生态给出推荐结论。', href: '/articles/best-coding-plan' },
  glmVsKimi: { kind: '对比', title: 'GLM vs Kimi：两家 Coding Plan 怎么选', description: '价格、模型、额度口径与工具支持逐项对比。', href: '/articles/glm-vs-kimi' },
  guideGlm: { kind: '教程', title: 'Claude Code 配置智谱 GLM Coding Plan', description: '环境变量、端点与常见报错一站式配置指南。', href: '/articles/claude-code-with-glm' },
  guideKimi: { kind: '教程', title: 'Claude Code 配置 Kimi Code Plan', description: '从开通到鉴权的完整配置流程。', href: '/articles/claude-code-with-kimi' },
  guideVolc: { kind: '教程', title: 'Claude Code 接入火山引擎方舟 Coding Plan', description: '多模型切换与 Auto 模式配置指南。', href: '/articles/claude-code-with-volcengine' },
  toolClaudeCode: { kind: '工具', title: 'Claude Code 用哪个 Coding Plan', description: '官方订阅与 8 家国内套餐接入路径。', href: '/tools/claude-code' },
  modelGlm52: { kind: '模型', title: 'GLM-5.2 模型评测', description: 'LMArena 开源第一旗舰的可用套餐与成本。', href: '/models/glm-5.2' },
  modelK3: { kind: '模型', title: 'Kimi K3 模型评测', description: '2.8T 参数 1M 上下文旗舰详解。', href: '/models/kimi-k3' },
}

const zhBySlug: Record<string, RelatedLink[]> = {
  zhipu: [zhCommon.guideGlm, zhCommon.modelGlm52, zhCommon.glmVsKimi],
  kimi: [zhCommon.guideKimi, zhCommon.modelK3, zhCommon.glmVsKimi],
  minimax: [zhCommon.glmVsKimi, zhCommon.cheapest, zhCommon.leaderboard],
  volcengine: [zhCommon.guideVolc, zhCommon.cheapest, zhCommon.deals],
  aliyun: [zhCommon.cheapest, zhCommon.toolClaudeCode, zhCommon.changelog],
  xiaomi: [zhCommon.cheapest, zhCommon.leaderboard, zhCommon.deals],
  baiyunzhisuan: [zhCommon.whatIs, zhCommon.cheapest, zhCommon.changelog],
  tencentcloud: [zhCommon.changelog, zhCommon.whatIs],
  'opencode-go': [zhCommon.cheapest, zhCommon.modelGlm52, zhCommon.best],
}

const enClaudeVsGlm: RelatedLink = { kind: 'Comparison', title: 'Claude Code vs GLM Coding Plan', description: 'Pricing, models and usage compared side by side.', href: '/en/articles/claude-vs-glm' }
const enAllPlans: RelatedLink = { kind: 'Hub', title: 'All AI Coding Plans Compared', description: 'Every platform entry price, models and quotas in one table.', href: '/en#platforms' }

const enBySlug: Record<string, RelatedLink[]> = {
  claude: [enClaudeVsGlm, enAllPlans],
  glm: [enClaudeVsGlm, enAllPlans],
  minimax: [enClaudeVsGlm, enAllPlans],
  kimi: [enClaudeVsGlm, enAllPlans],
  qwen: [enClaudeVsGlm, enAllPlans],
  'opencode-go': [enClaudeVsGlm, enAllPlans],
}

export function getRelatedLinks(slug: string, locale: Locale): RelatedLink[] {
  return locale === 'en' ? (enBySlug[slug] ?? [enClaudeVsGlm, enAllPlans]) : (zhBySlug[slug] ?? [zhCommon.whatIs, zhCommon.changelog])
}
