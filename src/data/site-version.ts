/**
 * [INPUT]: 无运行时依赖，被 seo.ts / sitemap.ts / SiteChrome.tsx / 内容数据模块引用
 * [OUTPUT]: 对外提供 DATA_UPDATED_AT 全站数据更新日期常量与 siteUrl
 * [POS]: data 的全站版本信号源，保证 JSON-LD dateModified、sitemap lastmod 与页脚可见日期三处同源
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
export const DATA_UPDATED_AT = '2026-08-18'
export const siteUrl = 'https://codingplan.org'
