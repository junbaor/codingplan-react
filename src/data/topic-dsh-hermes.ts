/**
 * [INPUT]: 依赖 types 的 FaqItem/StatItem 领域类型与 seo 的 JSON-LD 构造函数
 * [OUTPUT]: 对外提供 DeepSeek Hermes Plugin 专题页的完整类型化内容与 SEO 数据
 * [POS]: data 的独立专题数据源，不归属于 plans 套餐体系，由 /dsh-hermes 路由消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { FaqItem, SeoData, StatItem } from '../types'
import { buildFaqJsonLd } from './seo'

export interface PluginCard {
  icon: string
  name: string
  description: string
  badge?: string
  category: string
  installCmd: string
  verified: boolean
}

export interface CategoryRow {
  category: string
  examples: string
  count: string
  desc: string
}

export interface DevGuide {
  title: string
  description: string
  codeBlocks: { title: string; language: string; code: string; description?: string }[]
  highlights?: string[]
}

export interface DshHermesData {
  seo: SeoData
  hero: { badge: string; title: string; description: string; stats: StatItem[] }
  pluginsTitle: string
  pluginsDescription: string
  plugins: PluginCard[]
  categoriesTitle: string
  categoriesDescription: string
  categories: CategoryRow[]
  verifyTitle: string
  verifyDescription: string
  verifySteps: { icon: string; title: string; description: string }[]
  collectionsTitle: string
  collectionsDescription: string
  collections: { icon: string; title: string; description: string }[]
  devGuideTitle: string
  devGuideDescription: string
  devGuides: DevGuide[]
  faqs: FaqItem[]
}

const faqs: FaqItem[] = [
  { question: '什么是 DeepSeek Hermes Plugin？', answer: 'DeepSeek Hermes Plugin 是我们收录整理的 DeepSeek Harness（DSH）插件合集。DSH 是 DeepSeek 开源生态的 AI 编程智能体框架，采用"一切皆插件"架构。本页集中展示我们收录的社区插件、安装方式、验证流程、插件开发指南和精选合集，帮助开发者快速找到并开发 DSH 插件。' },
  { question: '如何安装 DSH 插件？', answer: '使用 dsh CLI 命令安装：dsh plugin --profile <name> add github:<owner>/<repo>。例如安装 dsh-web-ui：dsh plugin --profile web add github:zhu1090093659/dsh-web-ui。命令通用 macOS · Linux · Windows。也可从 npm 或本地 tarball 安装。' },
  { question: '如何开发一个 DSH 插件？', answer: '创建一个导出 apply 函数的 TypeScript 模块：import type { Context } from "@deepseek-ai/cordis"；export function apply(ctx: Context) { /* 注册能力 */ }。通过 inject 声明依赖，通过 ctx 注册工具/事件/适配器，所有注册都是可逆 effect，插件卸载时自动清理。详见本页"插件开发指南"部分。' },
  { question: '什么是 Bundle 和 Profile？', answer: 'Bundle（组合包）是附带配置层的 npm 包，在 package.json 的 dsh.bundle 字段声明 patch 文件；Profile 是可启动组合，声明 dsh.profile 并按顺序堆叠 bundles。用户通过 dsh plugin --profile <name> add 安装组合包到 profile 中。' },
  { question: '从 GitHub 安装插件需要注意什么？', answer: 'Git 安装拉取的是源码而非构建产物。如果插件使用 TypeScript，作者需要提供 prepare 脚本从源码构建输出。pnpm ≥10 在显式允许前会拒绝运行 git 依赖的 prepare 脚本，需要在 profile 的 pnpm-workspace.yaml 中添加 allowBuilds 授权。也可发布到 npm 交付预构建产物来避免此问题。' },
  { question: 'DSH 目标版本是什么？', answer: 'DSH 当前目标版本为 rc.6。大部分已收录插件标注了兼容的 DSH 版本（如 rc.6、main、Web、skills 等），少数标注为"DSH 生态"（已发现但尚未运行验证）。DSH 目前处于开发者预览阶段，可能存在破坏性变更。' },
  { question: '这些插件来源是什么？', answer: '我们持续从 DeepSeek 开源社区和 GitHub 上收录 DSH 插件，并定期同步更新。被收录只代表发现记录，不代表兼容、安全或官方背书，请在使用前自行评估。' },
  { question: 'DSH 插件有哪些分类？', answer: '我们将收录的插件分为 10 大分类：插件、组合包、技能、界面、工具、终端界面、皮肤、远程渠道、其他和已验证。可在本页按分类筛选浏览。' },
  { question: 'DSH 和 Claude Code 有什么关系？', answer: 'DSH（DeepSeek Harness）是 DeepSeek 开源的 AI 编程智能体框架，定位类似 Claude Code。区别在于 DSH 采用"一切皆插件"架构。部分 DSH 插件（如 cross-harness-cite）支持跨 Harness 引用 Codex / Claude Code 的历史对话，实现多智能体上下文桥接。' },
  { question: '可以在 Coding Plan 套餐中使用 DeepSeek 模型吗？', answer: '可以。火山引擎方舟 Coding Plan 支持 Deepseek-V4 系列模型，OpenCode Go 订阅包含 DeepSeek V4 Pro 和 V4 Flash（限时 2 倍额度），白云智算按量 API 也提供 DeepSeek 模型。详见各套餐详情页。' },
]

export const dshHermesData: DshHermesData = {
  seo: {
    title: 'DeepSeek Hermes Plugin',
    description: 'DeepSeek Hermes Plugin 专题：我们收录的 DeepSeek Harness（DSH）社区插件精选。涵盖界面增强、终端 TUI、视觉工具、Agent 预算管理、浏览器自动化等 10 大分类，附安装命令、验证流程与常见问题。',
    canonical: 'https://codingplan.org/deepseek-harness-plgins',
    locale: 'zh-CN',
    ogType: 'article',
    jsonLd: [buildFaqJsonLd(faqs)],
  },
  hero: {
    badge: 'DeepSeek Harness · 插件收录专题',
    title: 'DeepSeek Hermes Plugin',
    description: 'DeepSeek Harness（DSH）是 DeepSeek 开源生态的 AI 编程智能体框架。我们持续收录社区插件，覆盖界面增强、终端 TUI、视觉工具、Agent 预算、浏览器自动化等方向，并提供固定提交→隔离安装→构建启动→签名验证的完整验证流程。',
    stats: [
      { value: '266+', label: '已收录插件' },
      { value: '10', label: '插件分类' },
      { value: 'rc.6', label: 'DSH 目标版本' },
      { value: '4 步', label: '验证流程' },
    ],
  },
  pluginsTitle: '收录插件',
  pluginsDescription: '以下是我们在 DSH 生态中收录的代表性插件，按分类组织。',
  plugins: [
    { icon: '🎛️', name: 'dsh-web-ui', description: '任务看板、Git 图谱、移动遥控、皮肤和 Web UI 增强套件，DSH rc.6 兼容。', badge: '界面 · 热门', category: '界面', installCmd: 'dsh plugin --profile web add github:zhu1090093659/dsh-web-ui', verified: false },
    { icon: '👁️', name: 'dsh-vision-toolkit', description: '图像问答、长截图 OCR、界面还原、视觉定位和像素对比工具，DSH rc.6 兼容。', badge: '工具 · 热门', category: '工具', installCmd: 'dsh plugin add github:Anionex/dsh-vision-toolkit', verified: false },
    { icon: '🖥️', name: 'dsh-cc-tui', description: '受现代编程智能体启发的全屏终端界面，DSH rc.6 兼容，npm 0.1.3，安装与启动已验证通过。', badge: '已验证', category: '终端界面', installCmd: 'dsh plugin add github:ccch1mneyyy/dsh-cc-tui', verified: true },
    { icon: '📊', name: 'dsh-agent-budget', description: '为智能体树提供 token 预算管理，防止 Agent 调用链失控。', category: '插件', installCmd: 'dsh plugin add github:dsh-external/dsh-agent-budget', verified: false },
    { icon: '🔗', name: 'cross-harness-cite', description: '支持跨 Harness 引用 Codex / Claude Code 的历史对话，实现多智能体上下文桥接。', badge: '跨平台', category: '插件', installCmd: 'dsh plugin add github:dsh-external/cross-harness-cite', verified: false },
    { icon: '💧', name: 'distill', description: '自动对话蒸馏：后台 subagent 反省 + 技能 create/update 联动。', badge: '自动化', category: '插件', installCmd: 'dsh plugin add github:dsh-external/distill', verified: false },
    { icon: '🌐', name: 'dsh-browser-panel', description: 'WebUI 内嵌完整有头浏览器视图：模型在 DSH WebUI 内实时操控真实浏览器。', category: '插件', installCmd: 'dsh plugin add github:dsh-external/dsh-browser-panel', verified: false },
    { icon: '🧭', name: 'dsh-advisor', description: '为主模型配对第二个被动审查模型，实现双模型交叉验证。', category: '插件', installCmd: 'dsh plugin add github:dsh-external/dsh-advisor', verified: false },
    { icon: '🤖', name: 'dsh-a2a', description: 'Agent2Agent mesh：多智能体网格协作通信框架。', category: '插件', installCmd: 'dsh plugin add github:dsh-external/dsh-a2a', verified: false },
    { icon: '📄', name: 'context-doctor', description: '上下文注入审计：统计 AGENTS.md 指令链 / 技能目录 / 工具 schema 的注入量。', category: '插件', installCmd: 'dsh plugin add github:dsh-external/context-doctor', verified: false },
    { icon: '🎨', name: 'dsh-deep-whale', description: '以深海工坊为主题的 DSH Web UI 皮肤合集。', category: '皮肤', installCmd: 'dsh plugin add github:Small-tailqwq/dsh-deep-whale', verified: false },
    { icon: '🧩', name: 'DSH-better-sidebar', description: '集文件、终端、Git 和子智能体于一体的完整侧边工作区。', category: '界面', installCmd: 'dsh plugin add github:omdsh-dev/DSH-better-sidebar', verified: false },
  ],
  categoriesTitle: '插件分类',
  categoriesDescription: '我们将收录的插件分为 10 大分类，方便按需筛选。',
  categories: [
    { category: '插件', examples: 'cross-harness-cite / distill / dsh-annotation', count: '最多', desc: '核心功能扩展，如对话增强、批注、文件交付协议' },
    { category: '组合包', examples: 'dsh-agent-session-sources', count: '少量', desc: '多插件打包发行，一次安装多个能力' },
    { category: '技能', examples: 'colleague-skill / deep-standard-skill', count: '中等', desc: '面向智能体的专业技能包' },
    { category: '界面', examples: 'dsh-web-ui / DSH-better-sidebar', count: '较多', desc: 'Web UI 增强，侧边栏、看板和遥控' },
    { category: '工具', examples: 'dsh-vision-toolkit', count: '少量', desc: '辅助工具，OCR / 界面还原 / 像素对比' },
    { category: '终端界面', examples: 'dsh-cc-tui', count: '少量', desc: '全屏 TUI 终端界面' },
    { category: '皮肤', examples: 'dsh-deep-whale', count: '少量', desc: 'Web UI 主题皮肤合集' },
    { category: '远程渠道', examples: 'dsh-cc-connect', count: '少量', desc: '远程接入与控制渠道' },
    { category: '其他', examples: 'deepseek-harness-desktop / dsh-android', count: '中等', desc: '桌面应用、发行版、爬虫等杂项' },
    { category: '已验证', examples: 'dsh-cc-tui (npm 0.1.3)', count: '持续增加', desc: '通过完整 4 步验证链路的插件' },
  ],
  verifyTitle: '验证流程',
  verifyDescription: '我们对收录的插件进行验证，确保安装版本与验证版本一致。',
  verifySteps: [
    { icon: '📌', title: '固定提交', description: '锁定插件仓库的特定 commit，确保安装版本与验证版本一致。' },
    { icon: '🔒', title: '隔离安装', description: '在隔离环境中安装插件，避免污染宿主环境。' },
    { icon: '🔨', title: '构建并启动', description: '在真实 DSH 环境中构建插件并启动，验证可用性。' },
    { icon: '✍️', title: '签名结果', description: '对验证结果签名，生成可放进 README 的公开兼容性凭据。' },
  ],
  collectionsTitle: '精选合集',
  collectionsDescription: '我们整理了三组精选路径，帮助新用户快速上手。',
  collections: [
    { icon: '🚀', title: '首次安装推荐', description: '适合 DSH 新用户的一组实用插件，覆盖基础工作流。' },
    { icon: '🎨', title: '界面增强', description: '扩展 DSH Web 与终端体验，包括侧边栏、皮肤和对话视图增强。' },
    { icon: '🧠', title: '智能体能力', description: '视觉、自动化与专业技能插件，涵盖 OCR、浏览器控制和 Agent 预算管理。' },
  ],
  devGuideTitle: '插件开发指南',
  devGuideDescription: '从零开始开发、打包和发布 DSH 插件。DSH 插件是一个导出 apply 函数的 TypeScript 模块，通过 Cordis 框架挂载到共享上下文。',
  devGuides: [
    {
      title: '1. 创建第一个插件',
      description: '插件是导出 apply 函数的 TypeScript 模块，框架加载时调用 apply 并传入 ctx（上下文对象），你通过 ctx 注册能力。',
      codeBlocks: [
        { title: '插件基本结构', language: 'typescript', code: `import type { Context } from '@deepseek-ai/cordis'

export const name = 'hello-plugin'

export function apply(ctx: Context) {
  // Required dependencies are ready before apply runs.
  console.log('[hello-plugin] plugin loaded!')
}`, description: '这就是完整配置。通过 ctx 注册的任何东西——事件监听、工具、定时器——在插件卸载时都会被自动清理。' },
        { title: '声明依赖', language: 'typescript', code: `import type { Context } from '@deepseek-ai/cordis'

export const name = 'my-tool-plugin'
export const inject = ['tools']

export function apply(ctx: Context) {
  // ctx.tools is ready here.
  ctx.tools.register(/* ... */)
}`, description: '框架会确保依赖的服务就绪后才加载你的插件。' },
        { title: '自动清理', language: 'typescript', code: `import type { Context } from '@deepseek-ai/cordis'

export function apply(ctx: Context) {
  ctx.effect(() => {
    const timer = setInterval(() => console.log('heartbeat'), 5000)
    // 返回的函数在插件卸载时执行
    return () => clearInterval(timer)
  })
}`, description: '有手动清理的资源（如网络连接），用 ctx.effect() 告诉框架怎么清理。' },
      ],
      highlights: [
        '插件支持函数形式、对象形式和类形式三种写法',
        '通过 inject 数组声明所需服务，框架确保依赖就绪后才加载',
        '所有注册（事件监听、工具、定时器）在插件卸载时自动清理，无需手动 removeListener',
        '类形式用于需要向其他插件提供服务的场景',
      ],
    },
    {
      title: '2. 开发一个工具',
      description: '使用 defineTool DSL 定义工具，通过 ctx.tools.register 注册。模型可以调用工具并接收结果。',
      codeBlocks: [
        { title: '定义 greet 工具', language: 'typescript', code: `import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'greet-tool'
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'greet',
    description: 'Greet someone by name.',
    parameters: {
      name: { type: 'string', required: true, description: 'The name to greet' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      return \`Hello, \${args.name}!\`
    },
  }))
}`, description: 'defineTool 根据 parameters 推导并校验 args；execute 返回 output.schema 声明的规范值，output.render 将值转换为面向模型的内容。' },
      ],
    },
    {
      title: '3. 插件配置',
      description: '让插件接受用户在 cordis.yml 中传入的配置，通过 Schemastery schema 校验。',
      codeBlocks: [
        { title: '定义 Config 类型', language: 'typescript', code: `import type { Context } from '@deepseek-ai/cordis'
import Schema from '@deepseek-ai/schemastery'

export const name = 'my-plugin'

export interface Config {
  greeting: string
  maxRetries: number
  verbose?: boolean
}

export const Config: Schema<Config> = Schema.object({
  greeting: Schema.string().default('Hello'),
  maxRetries: Schema.number().default(3),
  verbose: Schema.boolean().default(false),
})

export function apply(ctx: Context, config: Config) {
  console.log(config.greeting) // 用户值或 schema 默认值
}`, description: 'Schema 在插件加载时执行校验，配置不合法会加载失败并给出明确错误。配置变更会触发插件热替换。' },
      ],
      highlights: [
        '凡是不同部署可能需要不同值的参数，都必须定义为配置字段，不要硬编码',
        '配置变更会触发插件 HMR：卸载旧实例并加载新实例',
        '默认值直接写在 schema 中，Cordis 会填充未提供字段的默认值',
      ],
    },
    {
      title: '4. 打包与发布',
      description: '将插件打包为可安装的组合包（bundle），通过 dsh plugin add 安装到 profile。',
      codeBlocks: [
        { title: 'package.json', language: 'json', code: `{
  "name": "dsh-hello-plugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.js",
  "files": ["index.js", "cordis.patch.yml"],
  "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
}`, description: 'dsh.bundle 声明指向 patch 文件，回答"这个包贡献什么"。' },
        { title: 'cordis.patch.yml', language: 'yaml', code: `- insert:
    - id: hello
      name: dsh-hello-plugin`, description: 'patch 条目按包名引用插件行，Node 模块解析能找到已安装的代码。' },
        { title: '安装命令', language: 'bash', code: `# 从 GitHub 安装
dsh plugin --profile demo add github:you/hello-plugin

# 从 npm 安装
dsh plugin --profile demo add your-package

# 从本地 tarball 安装
dsh plugin --profile demo add ./hello-plugin-0.1.0.tgz

# 查看配置树
dsh --profile demo --dump-config

# 移除插件
dsh plugin --profile demo remove dsh-hello-plugin`, description: '从 GitHub 安装时需要 prepare 脚本和 pnpm allowBuilds 授权；npm 和 tarball 安装的是预构建产物。' },
      ],
      highlights: [
        'Bundle（组合包）是附带配置层的 npm 包；Profile 是可启动组合，按顺序堆叠 bundles',
        '层应用顺序：dsh-base → 各组合包 patch → profile cordis.patch.yml → home cordis.patch.yml → --patch overlays',
        '后应用的层按行胜出，patch 替换目标行的整个 config 值而非深度合并',
        '为插件仓库添加 dsh-plugin GitHub 话题可提高可发现性',
      ],
    },
  ],
  faqs,
}
