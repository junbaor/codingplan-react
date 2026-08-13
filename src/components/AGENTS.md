# components/
> L2 | 父级: /src/AGENTS.md

## 成员清单
Analytics.tsx: Next.js 客户端岛，保持原站 GA4 事件名、参数 Key、CTA 选择器与平台域名映射
AntiPiracy.tsx: 客户端岛，浏览器控制台醒目输出"抄我网页，替我挡灾"反抄袭声明
AntiPiracyComment.tsx: 服务端组件，在中英文根布局 head 以 script 包裹输出反抄袭与 AI Agent 警示 HTML 注释
ContactPopover.tsx: 客户端岛，桌面 hover 悬浮、移动端点击切换，显示企业微信二维码面板
FaqList.tsx: 原生 details/summary FAQ 渲染，与 JSON-LD 共用数据
HomePage.tsx: 服务端首页编排，保持原站中英文 H 标题顺序、对比表整行锚点跳转、推广事件与 ContactPopover 挂载
JsonLd.tsx: 安全序列化 Schema.org 数据的服务端结构化数据组件
PlanPage.tsx: 中英文共享详情模板，按数据顺序恢复原站 H 层级、locale 文案、强烈推荐标记与详情 CTA 统计选择器
DshHermesPage.tsx: DeepSeek Hermes Plugin 独立专题页编排器，不归属于 PlanPage 套餐模板体系
SiteChrome.tsx: 全站 Header/Footer、导航与语言入口
SiteScripts.tsx: Next.js Script 调度的主题、GA4 与 Clarity 全站脚本
ThemeToggle.tsx: auto/dark/light 三态主题控制与持久化

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
