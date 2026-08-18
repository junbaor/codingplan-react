/**
 * [INPUT]: 依赖 Next.js MetadataRoute 类型与站点 canonical 域名
 * [OUTPUT]: 对外提供 /robots.txt 的动态静态资源响应（显式放行主流 AI 爬虫）
 * [POS]: app 的搜索爬虫策略入口，替代 public 中的手写副本
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: 'https://codingplan.org/sitemap.xml',
  }
}
