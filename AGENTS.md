# codingplan-react - AI 编程套餐价格对比站的可迭代重写版
Next.js 16 + React 19 + TypeScript 7 + Tailwind CSS 4

<directory>
app/ - Next.js App Router、静态页面、Metadata 与爬虫入口（2路由组: (zh), (en)）
src/ - 共享组件、类型化业务数据和全局样式（3子目录: components, data, styles）
scripts/ - IndexNow 索引提交与验证文件生成脚本
public/ - Bing 验证、LLM 说明与企业微信二维码等静态资源
</directory>

<config>
package.json - Next.js 依赖、开发、类型检查和生产构建命令
package-lock.json - npm 依赖锁文件，固定可重复安装版本
next.config.ts - Next.js 严格模式、TypeScript 7 CLI、响应头和旧静态 URL 重定向
next-env.d.ts - Next.js 自动生成的框架与类型化路由声明，禁止手工编辑
postcss.config.mjs - Tailwind CSS 4 PostCSS 编译配置
tsconfig.json - Next.js 严格 TypeScript 编译配置与路径别名
README.md - 开发命令、App Router 架构与内容维护入口
</config>

## 架构约定

- 页面使用 Server Components，首页与枚举详情路由在构建期静态生成，并保留未来 ISR 能力。
- 套餐、模型、FAQ、SEO 元数据统一从 `src/data` 读取，避免页面间重复和漂移。
- UI 由 `src/components` 共享组件渲染，后续视觉重构不修改业务数据结构。
- 浏览器状态仅进入 ThemeToggle、Analytics 和 ContactDialog 客户端岛。
- Title、H 标题、keywords 缺失状态、canonical、统计 Key 与推广参数以原站 HTML 为兼容基线。
- 主题通过语义色 token 和 `data-theme` 切换，不在组件中硬编码颜色。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
