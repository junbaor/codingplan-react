# components/
> L2 | 父级: /src/AGENTS.md

## 成员清单
Analytics.tsx: Next.js 客户端岛，保持原站 GA4 事件名、参数 Key、CTA 选择器与平台域名映射
AntiPiracy.tsx: 客户端岛，浏览器控制台醒目输出"抄我网页，替我挡灾"反抄袭声明
AntiPiracyComment.tsx: 服务端组件，在中英文根布局 head 以 script 包裹输出反抄袭与 AI Agent 警示 HTML 注释
ArticlePage.tsx: 内容矩阵共享模板（deals/changelog/compare/guides/questions），渲染面包屑、hero、多态内容块（段落/卡片/表格/步骤/代码）、FAQ 与相关链接
ContactPopover.tsx: 客户端岛，桌面 hover 悬浮、移动端点击切换，显示企业微信二维码面板
FaqList.tsx: 原生 details/summary FAQ 渲染，与 JSON-LD 共用数据
HomePage.tsx: 服务端首页编排，保持原站中英文 H 标题顺序、对比表整行锚点跳转、推广事件与 ContactPopover 挂载（中文导航含优惠入口）
JsonLd.tsx: 安全序列化 Schema.org 数据的服务端结构化数据组件
PlanPage.tsx: 中英文共享详情模板，按数据顺序恢复原站 H 层级、locale 文案、强烈推荐标记、详情 CTA 统计选择器、可见面包屑与相关内容内链
DshHermesPage.tsx: DeepSeek Hermes Plugin 插件合集页编排器（含插件收录、分类、验证与开发指南）
DshHermesIntroPage.tsx: DeepSeek Hermes 框架介绍页编排器（架构、核心包、Turn 流程、事件系统与快速上手）
SiteChrome.tsx: 全站 Header/Footer、导航、语言入口与页脚数据更新日期（<time>）及内容矩阵 hub 链接
SiteScripts.tsx: Next.js Script 调度的主题、GA4 与 Clarity 全站脚本
ThemeToggle.tsx: auto/dark/light 三态主题控制与持久化

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
