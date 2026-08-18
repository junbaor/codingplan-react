/**
 * [INPUT]: 依赖 Next.js 的应用构建与路由配置能力
 * [OUTPUT]: 对外提供严格模式、TypeScript 7 CLI、响应头收敛和旧静态 URL 重定向
 * [POS]: 项目根目录的 Next.js 构建入口，替代原 Vite/Vike 配置
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    useTypeScriptCli: true,
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/en/index.html', destination: '/en', permanent: true },
      { source: '/plans/:slug.html', destination: '/plans/:slug', permanent: true },
      { source: '/compare/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/guides/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/questions/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/articles', destination: '/blogs', permanent: true },
      { source: '/articles/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/en/articles', destination: '/en/blogs', permanent: true },
      { source: '/en/articles/:slug', destination: '/en/blogs/:slug', permanent: true },
      { source: '/en/compare/:slug', destination: '/en/blogs/:slug', permanent: true },
    ]
  },
}

export default nextConfig
