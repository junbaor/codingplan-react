/**
 * [INPUT]: 依赖 Next.js MetadataRoute 类型与站点 canonical 域名
 * [OUTPUT]: 对外提供 /robots.txt 的动态静态资源响应
 * [POS]: app 的搜索爬虫策略入口，替代 public 中的手写副本
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://codingplan.org/sitemap.xml',
  }
}
