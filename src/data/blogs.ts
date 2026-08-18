/**
 * [INPUT]: 依赖 compares/guides/questions 的具体文章数据
 * [OUTPUT]: 对外提供 /blogs/[slug] 的统一文章索引（blogSlugs/blogsBySlug）与英文索引（enBlogSlugs）
 * [POS]: data 的博客集合入口，把对比/教程/问答三类文章归一到 /blogs 命名空间，类别仅作为标签
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { claudeVsGlm, glmVsKimi } from './compares'
import { claudeCodeWithGlm, claudeCodeWithKimi, claudeCodeWithVolcengine } from './guides'
import { bestCodingPlan, cheapestCodingPlan, whatIsCodingPlan } from './questions'

export const blogsBySlug = {
  'what-is-coding-plan': whatIsCodingPlan,
  'cheapest-coding-plan': cheapestCodingPlan,
  'best-coding-plan': bestCodingPlan,
  'glm-vs-kimi': glmVsKimi,
  'claude-code-with-glm': claudeCodeWithGlm,
  'claude-code-with-kimi': claudeCodeWithKimi,
  'claude-code-with-volcengine': claudeCodeWithVolcengine,
} as const

export const blogSlugs = Object.keys(blogsBySlug)

export function getBlog(slug: string) {
  return (blogsBySlug as Record<string, (typeof blogsBySlug)[keyof typeof blogsBySlug]>)[slug]
}

export const enBlogsBySlug = { 'claude-vs-glm': claudeVsGlm } as const

export const enBlogSlugs = Object.keys(enBlogsBySlug)

export function getEnBlog(slug: string) {
  return (enBlogsBySlug as Record<string, (typeof enBlogsBySlug)[keyof typeof enBlogsBySlug]>)[slug]
}
