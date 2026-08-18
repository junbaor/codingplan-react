/**
 * [INPUT]: 依赖 compares/guides/questions 的具体文章数据
 * [OUTPUT]: 对外提供 /articles/[slug] 的统一文章索引（articleSlugs/articlesBySlug）与英文索引（enArticleSlugs）
 * [POS]: data 的文章集合入口，把对比/教程/问答三类文章归一到 /articles 命名空间，类别仅作为标签
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { claudeVsGlm, glmVsKimi } from './compares'
import { claudeCodeWithGlm, claudeCodeWithKimi, claudeCodeWithVolcengine } from './guides'
import { bestCodingPlan, cheapestCodingPlan, whatIsCodingPlan } from './questions'

export const articlesBySlug = {
  'what-is-coding-plan': whatIsCodingPlan,
  'cheapest-coding-plan': cheapestCodingPlan,
  'best-coding-plan': bestCodingPlan,
  'glm-vs-kimi': glmVsKimi,
  'claude-code-with-glm': claudeCodeWithGlm,
  'claude-code-with-kimi': claudeCodeWithKimi,
  'claude-code-with-volcengine': claudeCodeWithVolcengine,
} as const

export const articleSlugs = Object.keys(articlesBySlug)

export function getArticle(slug: string) {
  return (articlesBySlug as Record<string, (typeof articlesBySlug)[keyof typeof articlesBySlug]>)[slug]
}

export const enArticlesBySlug = { 'claude-vs-glm': claudeVsGlm } as const

export const enArticleSlugs = Object.keys(enArticlesBySlug)

export function getEnArticle(slug: string) {
  return (enArticlesBySlug as Record<string, (typeof enArticlesBySlug)[keyof typeof enArticlesBySlug]>)[slug]
}
