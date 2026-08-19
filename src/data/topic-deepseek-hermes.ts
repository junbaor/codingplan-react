/**
 * [INPUT]: 依赖 types 的 FaqItem/StatItem/SeoData 领域类型与 seo 的 JSON-LD 构造函数
 * [OUTPUT]: 对外提供 DeepSeek Hermes 介绍页的完整类型化内容与 SEO 数据
 * [POS]: data 的独立专题数据源，介绍 DeepSeek Harness 框架本体，由 /deepseek-hermes 路由消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { FaqItem, SeoData, StatItem } from '../types'
import { buildFaqJsonLd } from './seo'

export interface CodeBlock {
  title: string
  language: string
  code: string
  description?: string
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
}

export interface CorePackage {
  name: string
  owns: string
  ctxKey: string
}

export interface TurnStep {
  label: string
  detail: string
}

export interface DshHermesIntroData {
  seo: SeoData
  hero: { badge: string; title: string; description: string; stats: StatItem[] }
  whatIsTitle: string
  whatIsDescription: string
  whatIsParagraphs: string[]
  architectureTitle: string
  architectureDescription: string
  architectureCards: FeatureCard[]
  corePackagesTitle: string
  corePackagesDescription: string
  corePackages: CorePackage[]
  turnFlowTitle: string
  turnFlowDescription: string
  turnFlowSteps: TurnStep[]
  eventsTitle: string
  eventsDescription: string
  events: { type: string; mode: string; desc: string }[]
  quickstartTitle: string
  quickstartDescription: string
  quickstartBlocks: CodeBlock[]
  conceptsTitle: string
  conceptsDescription: string
  concepts: FeatureCard[]
  faqs: FaqItem[]
}

const faqs: FaqItem[] = [
  { question: 'DeepSeek Harness 和 Claude Code 是什么关系？', answer: 'DeepSeek Harness（DSH）是 DeepSeek AI 开源开发的 AI 编程智能体框架（agent harness），定位类似 Claude Code。区别在于 DSH 采用"一切皆插件"架构——模型适配器、工具注册表、会话日志、Agent 循环本身都是可替换的插件，没有特权核心需要 patch。' },
  { question: '"一切皆插件"是什么意思？', answer: 'DSH 的所有组成部分——模型适配器、工具注册表、会话日志、Agent 循环、系统提示词组装、持久化、沙箱、审批策略——都是 Cordis 插件。你通过在其它插件旁边挂载自己的插件来扩展 dsh，而注册是可逆 effect，插件卸载时自动回退。' },
  { question: 'Cordis 是什么？', answer: 'Cordis 是 DSH 底层的插件框架，其设计参见论文《A Programming Paradigm for Spatiotemporal Composability》。核心思想：插件向共享上下文贡献服务、类型化事件和可逆 effect；服务通过 ctx.<key> 寻址而非导入具体实现；加载顺序由服务依赖声明表达而非手动排序。' },
  { question: '如何快速运行 DSH？', answer: '安装 Node.js 后执行 npx @deepseek-ai/dsh web，即可启动 Web UI（默认 http://127.0.0.1:3080）。也可从源码运行：git clone 仓库 → pnpm install → pnpm run build → pnpm dsh web。' },
  { question: '什么是 Profile 和 Bundle？', answer: 'Profile 是 DSH 中命名的可启动组合，存储在 Harness home 目录下，列出它堆叠的 bundles 并持有用户自己的 cordis.patch.yml。Bundle 是 Cordis 配置行及其挂载代码的分发格式——声明在 package.json 的 dsh.bundle 字段中。web 和 headless 作为模板随 dsh 发行。' },
  { question: 'DSH 的事件系统是怎样的？', answer: 'DSH 有三组事件域：会话事件（session/event）是追加到日志的持久事实；Agent 事件（agent/*）携带活跃 Agent 实例；能力事件（fs/*、tools/*、telemetry/*）将策略和适配器挂载到 seam。事件分四种分发模式：emit（观察）、waterfall（环绕中间件）、parallel（并行）、serial（串行）。' },
  { question: 'DSH 目前稳定吗？', answer: 'DSH 目前处于开发者预览（developer preview）阶段，正在快速迭代。官方明确声明未来将出现破坏兼容性的变更。建议关注 GitHub Discussions 和版本更新。' },
  { question: '在哪里可以找到 DSH 插件？', answer: '可以在 GitHub 上搜索 dsh-plugin 话题找到社区插件。我们也整理了 [DeepSeek 插件库](https://deepseek-plugin.org/zh/plugin)，提供完整的 DSH 插件目录、分类浏览、安装命令与开发指南。' },
]

export const dshHermesIntroData: DshHermesIntroData = {
  seo: {
    title: 'DeepSeek Hermes',
    description: 'DeepSeek Hermes — DeepSeek Harness（DSH）框架详解：一切皆插件的 AI 编程智能体架构，Cordis 驱动的服务/事件/可逆 effect 体系，Profile 与 Bundle 分发机制，Turn 流程、事件系统与快速上手指南。',
    canonical: 'https://codingplan.org/deepseek-hermes',
    locale: 'zh-CN',
    ogType: 'article',
    alternates: [
      { lang: 'zh-CN', href: 'https://codingplan.org/deepseek-hermes' },
      { lang: 'en', href: 'https://codingplan.org/en/deepseek-hermes' },
      { lang: 'x-default', href: 'https://codingplan.org/deepseek-hermes' },
    ],
    jsonLd: [buildFaqJsonLd(faqs)],
  },
  hero: {
    badge: 'DeepSeek AI · 开源 AI 编程智能体框架',
    title: 'DeepSeek Hermes',
    description: 'DeepSeek Harness（dsh）是由 DeepSeek AI 开发的开源 agent harness。它采用"一切皆插件"的架构，由 Cordis 驱动——模型适配器、工具注册表、会话日志和 Agent 循环本身都是可替换的插件，没有特权核心需要 patch。',
    stats: [
      { value: '33k+', label: 'GitHub Stars' },
      { value: 'MIT', label: '开源协议' },
      { value: 'Cordis', label: '插件框架' },
      { value: 'rc.6', label: '当前版本' },
    ],
  },
  whatIsTitle: '什么是 DeepSeek Harness',
  whatIsDescription: 'DSH 是一个将 AI 模型转化为可操作编程智能体的框架——模型可以读写文件、运行命令、委派工作并维护计划。',
  whatIsParagraphs: [
    'DeepSeek Harness（dsh）是由 DeepSeek AI 开发的开源 agent harness（智能体框架）。它不是一个简单的代码补全工具，而是一个完整的智能体运行时：模型可以读取和编辑工作区文件、运行命令、委派工作并维护计划。当操作在当前权限策略下需要审批时，Web UI 会先询问用户。',
    'DSH 的核心设计理念是"一切皆插件"（Everything is a Plugin）。与传统的单体架构不同，DSH 的每一个组成部分——模型适配器、工具注册表、会话日志、Agent 循环、系统提示词组装、持久化层、沙箱和审批策略——都是一个 Cordis 插件。这意味着没有特权核心需要 patch：你只需在其它插件旁边挂载自己的插件来扩展 dsh，而所有注册都是可逆 effect，插件卸载时自动回退。',
    'DSH 目前处于开发者预览阶段，正在快速迭代，未来将出现破坏兼容性的变更。它由 Cordis 框架驱动，Cordis 的设计详见论文《A Programming Paradigm for Spatiotemporal Composability》（时空可组合性的编程范式）。',
  ],
  architectureTitle: '架构设计',
  architectureDescription: 'Cordis 是 dsh 底层的插件框架：插件向共享上下文贡献服务、类型化事件和可逆 effect。',
  architectureCards: [
    { icon: '🔌', title: '插件即服务', description: '插件向上下文贡献服务，通过 ctx.<key> 寻址（如 ctx.tools、ctx.llm、ctx.sessions），而非导入具体实现。其他插件通过 key 找到服务，实现松耦合。' },
    { icon: '💉', title: '声明式依赖注入', description: '通过 inject 声明所需服务，框架确保依赖就绪后才加载你的插件。加载顺序由服务需求表达，而非手动编排启动序列。' },
    { icon: '📡', title: '类型化事件', description: '服务通过 TypeScript 声明合并定义事件名，再以 emit / waterfall / parallel / serial 四种模式分发，分别用于观察、环绕、并行和串行。' },
    { icon: '♻️', title: '可逆 effect', description: '提示词段落、工具 schema、适配器和监听器通过 ctx.effect() 或 ctx.on() 安装，重载和卸载时自动回退，无需手动 removeListener。' },
  ],
  corePackagesTitle: '核心包',
  corePackagesDescription: '以下是构成 Cordis 树的核心包及其职责与上下文键。',
  corePackages: [
    { name: 'core/session', owns: '追加式 SessionEvent 日志与内存存储', ctxKey: 'ctx.sessions' },
    { name: 'core/system-prompt', owns: '提示词段落与工具 schema 组装', ctxKey: 'ctx.systemPrompt' },
    { name: 'core/tools', owns: '作用域工具注册表与受保护执行管线', ctxKey: 'ctx.tools' },
    { name: 'core/agent', owns: 'Agent 接口、活跃注册表与 agent/* 事件', ctxKey: 'ctx.agents' },
    { name: 'core/agent-loop', owns: '实现 Agent 接口的默认驱动器', ctxKey: 'ctx.agentLoop' },
    { name: 'core/scope', owns: '每 Agent 的作用域注册原语', ctxKey: 'library（无 key）' },
    { name: 'llm/llm', owns: '消息与流词汇表及适配器 seam', ctxKey: 'ctx.llm' },
  ],
  turnFlowTitle: 'Turn 流程',
  turnFlowDescription: '一个 step 是一次模型请求加上它调用的工具。一个 turn 是零或多个 step：在第一个输入被消费前打开，在不再有待处理时关闭。',
  turnFlowSteps: [
    { label: 'turn/start', detail: '消费下一步输入和一个排队消息，组装提示词段落 + 工具 schema' },
    { label: 'agent/pre-step', detail: '重写或拒绝消费的消息 → 进入或关闭 turn（waterfall）' },
    { label: 'step/start', detail: '将进入的消息追加为 user/message，从日志派生模型历史' },
    { label: 'agent/request → llm/stream', detail: '模型请求 → 流式响应 → assistant/chunk* → assistant/message' },
    { label: 'tool/call* → tools/*', detail: '工具调用 → pre-execute → execute → post-execute → tool/result*' },
    { label: 'step/end', detail: '工具需要另一个请求，或新输入到达 → 消费 → 下一个 step' },
    { label: 'agent/turn-stopping', detail: '串行事件，无 next()，决定是否停止 turn' },
    { label: 'turn/end', detail: 'turn 结束，所有事件已追加到持久会话日志' },
  ],
  eventsTitle: '事件系统',
  eventsDescription: '事件是扩展点，选择正确的域是大多数变更的第一个决策。事件分四种分发模式。',
  events: [
    { type: '会话事件 (session/*)', mode: 'emit', desc: '追加到日志的持久事实，通过 session/event 广播。当事实必须跨重载存活时使用。' },
    { type: 'Agent 事件 (agent/*)', mode: 'waterfall / serial', desc: '携带活跃 Agent：inbox、step、status、request、validation、continuation。用于观察或拦截进行中的工作。' },
    { type: '能力事件 (fs/*, tools/*, telemetry/*)', mode: 'waterfall', desc: '将策略和适配器挂载到 seam，无需导入循环。用于文件系统、工具执行和遥测的拦截。' },
    { type: 'Turn 事件 (turn/*, step/*)', mode: 'emit', desc: 'durable 会话事件，记录 turn 和 step 的生命周期，确保操作可回放。' },
  ],
  quickstartTitle: '快速开始',
  quickstartDescription: '两种方式启动 DSH Web UI，默认地址 http://127.0.0.1:3080。',
  quickstartBlocks: [
    { title: '通过 npm 运行', language: 'bash', code: 'npx @deepseek-ai/dsh web', description: '安装 Node.js 后直接运行，启动 Web UI。' },
    { title: '从源码运行', language: 'bash', code: 'git clone https://github.com/deepseek-ai/deepseek-harness.git\ncd deepseek-harness\npnpm install\npnpm run build\npnpm dsh web', description: '适合开发者和贡献者，可以修改源码并提交 PR。' },
    { title: '查看当前配置树', language: 'bash', code: 'dsh --profile web --dump-config', description: '打印机器实际启动的插件树，任何行都可以用你自己的 patch 替换。' },
  ],
  conceptsTitle: '核心概念',
  conceptsDescription: '理解这些概念是使用和扩展 DSH 的基础。',
  concepts: [
    { icon: '📦', title: 'Bundle（组合包）', description: '附带配置层的 npm 包。在 package.json 的 dsh.bundle 字段声明 patch 文件，回答"这个包贡献什么"。' },
    { icon: '🗂️', title: 'Profile（配置文件）', description: '位于 $DSH_HOME/profiles/<name> 下、描述可启动组合的目录。声明 dsh.profile，回答"由哪些 bundles 按什么顺序组成"。' },
    { icon: '📋', title: 'cordis.patch.yml', description: 'YAML 格式的 patch 条目数组，每个条目按 id 目标行并替换其整个 config，或插入新行。后应用的层按行胜出。' },
    { icon: '🔧', title: 'dsh-base', description: '每个 profile 的第一层：模型适配器、工具、持久化、沙箱、审批策略、设置、凭证和遥测。dsh-web-app 和 dsh-headless 在其上添加应用层。' },
    { icon: '🌐', title: 'dsh-web-app', description: '在 dsh-base 之上添加浏览器应用的组合包，提供完整的 Web UI 体验。' },
    { icon: '💀', title: 'dsh-headless', description: '在 dsh-base 之上添加一次性运行器的组合包，无服务器，适合 CI/CD 场景。' },
  ],
  faqs,
}
