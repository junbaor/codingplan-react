# CodingPlan Next.js

`codingplan.org` 的现代化重写版本。项目保留原站公开路由和核心内容，将重复 HTML 拆为类型化数据与共享 React 组件，便于后续整体 UI 重构。

## 技术栈

- React 19 + TypeScript 7
- Next.js 16 App Router
- Tailwind CSS 4

页面默认使用 React Server Components。首页和通过 `generateStaticParams` 枚举的套餐详情页在构建时生成静态 HTML，title、meta、正文和 JSON-LD 都直接存在于响应中；客户端 JavaScript 仅用于主题、统计和咨询弹窗。该结构也保留了后续接入 ISR、CMS 与服务端 API 的能力。

## 命令

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run start
```

生产部署使用标准 Next.js 构建产物 `.next/`。旧版 `/index.html`、`/en/index.html` 和 `/plans/*.html` 会永久重定向到规范 URL。

## 内容维护

- 首页平台、套餐摘要和 FAQ：`src/data/home.ts`
- 九个平台详情内容：`src/data/plans.ts`
- JSON-LD 生成规则：`src/data/seo.ts`
- Next.js Metadata 转换：`src/data/metadata.ts`
- 页面视觉组件：`src/components/`
- 主题与设计 token：`src/styles/global.css`
- 从原站迁移的运维文档（分析后端方案、代码审查记录、Gist 推广内容）：`docs/`

更新套餐时优先修改数据文件，不要在组件中复制业务文案。
