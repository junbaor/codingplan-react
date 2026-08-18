/**
 * [INPUT]: 依赖 types 的 ContentPageData/SeoData 与 seo 的 buildContentJsonLd
 * [OUTPUT]: 对外提供 defineContentPage 构造器，为内容页统一装配 JSON-LD
 * [POS]: data 的内容矩阵装配层，被 deals/changelog/compares/guides/questions 数据模块复用
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { ContentPageData, SeoData } from '../types'
import { buildContentJsonLd } from './seo'

export type ContentInput = Omit<ContentPageData, 'seo'> & { seo: Omit<SeoData, 'jsonLd'> }

export function defineContentPage(input: ContentInput): ContentPageData {
  const page = { ...input, seo: { ...input.seo, jsonLd: [] } } as ContentPageData
  page.seo.jsonLd = buildContentJsonLd(page)
  return page
}
