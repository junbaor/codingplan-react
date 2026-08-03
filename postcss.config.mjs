/**
 * [INPUT]: 依赖 Tailwind CSS 4 的 PostCSS 插件
 * [OUTPUT]: 对外提供 Next.js 全局样式编译配置
 * [POS]: 项目根目录的 PostCSS 入口，连接 Next.js 与 Tailwind CSS
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
