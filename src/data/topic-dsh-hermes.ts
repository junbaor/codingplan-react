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
  faqs: FaqItem[]
}

const faqs: FaqItem[] = [
  { question: '什么是 DeepSeek Hermes Plugin？', answer: 'DeepSeek Hermes Plugin 是我们收录整理的 DeepSeek Harness（DSH）插件专题。DSH 是 DeepSeek 开源生态的 AI 编程智能体框架，本页集中展示我们收录的社区插件、安装方式、验证流程和精选合集，帮助开发者快速找到合适的 DSH 插件。' },
  { question: '如何安装 DSH 插件？', answer: '使用 dsh CLI 命令安装：dsh plugin --profile <name> add github:<owner>/<repo>。例如安装 dsh-web-ui：dsh plugin --profile web add github:zhu1090093659/dsh-web-ui。命令通用 macOS · Linux · Windows。' },
  { question: '插件的验证流程是什么？', answer: '我们采用 4 步验证链路：固定提交（锁定 commit）、隔离安装（避免污染宿主）、构建并启动（在真实 DSH 中验证）、签名结果（生成公开凭据）。只有通过完整 4 步的插件才标记为"已验证"。' },
  { question: 'DSH 目标版本是什么？', answer: 'DSH 当前目标版本为 rc.6。大部分已收录插件标注了兼容的 DSH 版本（如 rc.6、main、Web、skills 等），少数标注为"DSH 生态"（已发现但尚未运行验证）。' },
  { question: '这些插件来源是什么？', answer: '我们持续从 DeepSeek 开源社区和 GitHub 上收录 DSH 插件，并定期同步更新。被收录只代表发现记录，不代表兼容、安全或官方背书，请在使用前自行评估。' },
  { question: 'DSH 插件有哪些分类？', answer: '我们将收录的插件分为 10 大分类：插件、组合包、技能、界面、工具、终端界面、皮肤、远程渠道、其他和已验证。可在本页按分类筛选浏览。' },
  { question: 'DSH 和 Claude Code 有什么关系？', answer: 'DSH（DeepSeek Harness）是 DeepSeek 开源的 AI 编程智能体框架，定位类似 Claude Code。部分 DSH 插件（如 cross-harness-cite）支持跨 Harness 引用 Codex / Claude Code 的历史对话，实现多智能体上下文桥接。' },
  { question: '可以在 Coding Plan 套餐中使用 DeepSeek 模型吗？', answer: '可以。火山引擎方舟 Coding Plan 支持 Deepseek-V4 系列模型，OpenCode Go 订阅包含 DeepSeek V4 Pro 和 V4 Flash（限时 2 倍额度），白云智算按量 API 也提供 DeepSeek 模型。详见各套餐详情页。' },
]

export const dshHermesData: DshHermesData = {
  seo: {
    title: 'DeepSeek Hermes Plugin',
    description: 'DeepSeek Hermes Plugin 专题：我们收录的 DeepSeek Harness（DSH）社区插件精选。涵盖界面增强、终端 TUI、视觉工具、Agent 预算管理、浏览器自动化等 10 大分类，附安装命令、验证流程与常见问题。',
    canonical: 'https://codingplan.org/dsh-hermes',
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
  faqs,
}
