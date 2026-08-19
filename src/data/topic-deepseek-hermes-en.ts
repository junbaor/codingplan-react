/**
 * [INPUT]: 依赖 topic-deepseek-hermes 的 DshHermesIntroData 接口定义与 seo 的 JSON-LD 构造函数
 * [OUTPUT]: 对外提供 DeepSeek Hermes 英文介绍页的完整类型化内容与 SEO 数据
 * [POS]: data 的独立专题数据源（英文版），与中文版 topic-deepseek-hermes 同构，由 /en/deepseek-hermes 路由消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { FaqItem } from '../types'
import { buildFaqJsonLd } from './seo'
import type { DshHermesIntroData } from './topic-deepseek-hermes'

const faqs: FaqItem[] = [
  { question: 'How does DeepSeek Harness relate to Claude Code?', answer: 'DeepSeek Harness (DSH) is an open-source AI coding agent framework (agent harness) developed by DeepSeek AI, positioned similarly to Claude Code. The difference is that DSH adopts an "everything is a plugin" architecture — model adapters, tool registries, session logs, and even the agent loop itself are all replaceable plugins, with no privileged core to patch.' },
  { question: 'What does "everything is a plugin" mean?', answer: 'Every component of DSH — model adapters, tool registries, session logs, the agent loop, system prompt assembly, persistence, sandboxing, and approval policies — is a Cordis plugin. You extend dsh by mounting your own plugins next to the others, while registrations are reversible effects that are rolled back automatically when a plugin unloads.' },
  { question: 'What is Cordis?', answer: 'Cordis is the plugin framework underlying DSH; its design is described in the paper "A Programming Paradigm for Spatiotemporal Composability". Core ideas: plugins contribute services, typed events, and reversible effects to a shared context; services are addressed via ctx.<key> instead of importing concrete implementations; load order is expressed by service dependency declarations rather than manual ordering.' },
  { question: 'How do I run DSH quickly?', answer: 'With Node.js installed, run npx @deepseek-ai/dsh web to launch the Web UI (default http://127.0.0.1:3080). You can also run from source: git clone the repository → pnpm install → pnpm run build → pnpm dsh web.' },
  { question: 'What are Profiles and Bundles?', answer: 'A Profile is a named startable composition stored in the Harness home directory, listing the bundles it stacks and holding your own cordis.patch.yml. A Bundle is the distribution format for Cordis config lines and their mounted code — declared in the dsh.bundle field of package.json. web and headless ship as templates with dsh.' },
  { question: 'How does the DSH event system work?', answer: 'DSH has three event domains: session events (session/event) are durable facts appended to the log; agent events (agent/*) carry active agent instances; capability events (fs/*, tools/*, telemetry/*) attach policies and adapters to seams. Events are dispatched in four modes: emit (observe), waterfall (wrapping middleware), parallel, and serial.' },
  { question: 'Is DSH stable yet?', answer: 'DSH is currently in developer preview and iterating rapidly. The team has explicitly stated that breaking changes will come. Follow GitHub Discussions and release notes for updates.' },
  { question: 'Where can I find DSH plugins?', answer: 'You can search the dsh-plugin topic on GitHub to find community plugins. We also maintain the [DeepSeek Plugin Library](https://deepseek-plugin.org/plugins), which offers a complete DSH plugin directory, category browsing, install commands, and development guides.' },
]

export const dshHermesIntroDataEn: DshHermesIntroData = {
  seo: {
    title: 'DeepSeek Hermes',
    description: 'DeepSeek Hermes — a complete guide to the DeepSeek Harness (DSH) framework: the everything-is-a-plugin AI coding agent architecture, the Cordis service/event/reversible-effect system, Profile and Bundle distribution, turn flow, event system, and a quickstart guide.',
    canonical: 'https://codingplan.org/en/deepseek-hermes',
    locale: 'en',
    ogType: 'article',
    alternates: [
      { lang: 'en', href: 'https://codingplan.org/en/deepseek-hermes' },
      { lang: 'zh-CN', href: 'https://codingplan.org/deepseek-hermes' },
      { lang: 'x-default', href: 'https://codingplan.org/en/deepseek-hermes' },
    ],
    jsonLd: [buildFaqJsonLd(faqs)],
  },
  hero: {
    badge: 'DeepSeek AI · Open-Source AI Coding Agent Framework',
    title: 'DeepSeek Hermes',
    description: 'DeepSeek Harness (dsh) is an open-source agent harness developed by DeepSeek AI. It adopts an "everything is a plugin" architecture driven by Cordis — model adapters, tool registries, session logs, and the agent loop itself are all replaceable plugins, with no privileged core to patch.',
    stats: [
      { value: '33k+', label: 'GitHub Stars' },
      { value: 'MIT', label: 'License' },
      { value: 'Cordis', label: 'Plugin Framework' },
      { value: 'rc.6', label: 'Current Version' },
    ],
  },
  whatIsTitle: 'What Is DeepSeek Harness',
  whatIsDescription: 'DSH is a framework that turns AI models into operational coding agents — models can read and write files, run commands, delegate work, and maintain plans.',
  whatIsParagraphs: [
    'DeepSeek Harness (dsh) is an open-source agent harness developed by DeepSeek AI. It is not a simple code-completion tool but a complete agent runtime: models can read and edit workspace files, run commands, delegate work, and maintain plans. When an operation requires approval under the current permission policy, the Web UI asks the user first.',
    'The core design philosophy of DSH is "everything is a plugin". Unlike traditional monolithic architectures, every component of DSH — model adapters, tool registries, session logs, the agent loop, system prompt assembly, persistence, sandboxing, and approval policies — is a Cordis plugin. This means there is no privileged core to patch: you extend dsh simply by mounting your own plugins next to the others, and all registrations are reversible effects that roll back automatically when a plugin unloads.',
    'DSH is currently in developer preview, iterating rapidly, with breaking changes expected in the future. It is powered by the Cordis framework, whose design is described in the paper "A Programming Paradigm for Spatiotemporal Composability".',
  ],
  architectureTitle: 'Architecture',
  architectureDescription: 'Cordis is the plugin framework underneath dsh: plugins contribute services, typed events, and reversible effects to a shared context.',
  architectureCards: [
    { icon: '🔌', title: 'Plugins as Services', description: 'Plugins contribute services to the context, addressed via ctx.<key> (e.g. ctx.tools, ctx.llm, ctx.sessions) rather than importing concrete implementations. Other plugins locate services by key, achieving loose coupling.' },
    { icon: '💉', title: 'Declarative Dependency Injection', description: 'Declare required services via inject; the framework ensures dependencies are ready before your plugin loads. Load order is expressed by service requirements instead of manually orchestrated startup sequences.' },
    { icon: '📡', title: 'Typed Events', description: 'Services define event names via TypeScript declaration merging, then dispatch them in four modes — emit / waterfall / parallel / serial — for observing, wrapping, concurrent, and sequential handling respectively.' },
    { icon: '♻️', title: 'Reversible Effects', description: 'Prompt sections, tool schemas, adapters, and listeners are installed via ctx.effect() or ctx.on(), and roll back automatically on reload and unload — no manual removeListener needed.' },
  ],
  corePackagesTitle: 'Core Packages',
  corePackagesDescription: 'The core packages that make up the Cordis tree, their responsibilities, and context keys.',
  corePackages: [
    { name: 'core/session', owns: 'Append-only SessionEvent log with in-memory storage', ctxKey: 'ctx.sessions' },
    { name: 'core/system-prompt', owns: 'Prompt section and tool schema assembly', ctxKey: 'ctx.systemPrompt' },
    { name: 'core/tools', owns: 'Scoped tool registry and protected execution pipeline', ctxKey: 'ctx.tools' },
    { name: 'core/agent', owns: 'Agent interface, active registry, and agent/* events', ctxKey: 'ctx.agents' },
    { name: 'core/agent-loop', owns: 'Default driver implementing the Agent interface', ctxKey: 'ctx.agentLoop' },
    { name: 'core/scope', owns: 'Per-agent scoped registration primitives', ctxKey: 'library (no key)' },
    { name: 'llm/llm', owns: 'Message and streaming vocabulary plus adapter seam', ctxKey: 'ctx.llm' },
  ],
  turnFlowTitle: 'Turn Flow',
  turnFlowDescription: 'A step is one model request plus the tools it calls. A turn is zero or more steps: opened before the first input is consumed, closed when nothing is left pending.',
  turnFlowSteps: [
    { label: 'turn/start', detail: 'Consume the next input and one queued message; assemble prompt sections + tool schemas' },
    { label: 'agent/pre-step', detail: 'Rewrite or reject consumed messages → enter or close the turn (waterfall)' },
    { label: 'step/start', detail: 'Append the entering message as user/message; derive model history from the log' },
    { label: 'agent/request → llm/stream', detail: 'Model request → streamed response → assistant/chunk* → assistant/message' },
    { label: 'tool/call* → tools/*', detail: 'Tool call → pre-execute → execute → post-execute → tool/result*' },
    { label: 'step/end', detail: 'Tool needs another request, or new input arrives → consume → next step' },
    { label: 'agent/turn-stopping', detail: 'Serial event with no next(); decides whether to stop the turn' },
    { label: 'turn/end', detail: 'Turn ends; all events have been appended to the persistent session log' },
  ],
  eventsTitle: 'Event System',
  eventsDescription: 'Events are the extension points; choosing the right domain is the first decision in most changes. Events dispatch in four modes.',
  events: [
    { type: 'Session events (session/*)', mode: 'emit', desc: 'Durable facts appended to the log and broadcast via session/event. Use when facts must survive reloads.' },
    { type: 'Agent events (agent/*)', mode: 'waterfall / serial', desc: 'Carry the active agent: inbox, step, status, request, validation, continuation. For observing or intercepting in-flight work.' },
    { type: 'Capability events (fs/*, tools/*, telemetry/*)', mode: 'waterfall', desc: 'Attach policies and adapters to seams without import cycles. For intercepting filesystem, tool execution, and telemetry.' },
    { type: 'Turn events (turn/*, step/*)', mode: 'emit', desc: 'Durable session events recording the lifecycle of turns and steps, ensuring operations can be replayed.' },
  ],
  quickstartTitle: 'Quickstart',
  quickstartDescription: 'Two ways to launch the DSH Web UI, default address http://127.0.0.1:3080.',
  quickstartBlocks: [
    { title: 'Run via npm', language: 'bash', code: 'npx @deepseek-ai/dsh web', description: 'Run directly with Node.js installed; launches the Web UI.' },
    { title: 'Run from source', language: 'bash', code: 'git clone https://github.com/deepseek-ai/deepseek-harness.git\ncd deepseek-harness\npnpm install\npnpm run build\npnpm dsh web', description: 'For developers and contributors who want to modify the source and submit PRs.' },
    { title: 'Inspect the current config tree', language: 'bash', code: 'dsh --profile web --dump-config', description: 'Prints the plugin tree the machine actually starts with; any line can be replaced with your own patch.' },
  ],
  conceptsTitle: 'Core Concepts',
  conceptsDescription: 'Understanding these concepts is the foundation for using and extending DSH.',
  concepts: [
    { icon: '📦', title: 'Bundle', description: 'An npm package with a config layer attached. It declares a patch file in the dsh.bundle field of package.json, answering "what does this package contribute".' },
    { icon: '🗂️', title: 'Profile', description: 'A directory under $DSH_HOME/profiles/<name> describing a startable composition. It declares dsh.profile, answering "which bundles make it up, in what order".' },
    { icon: '📋', title: 'cordis.patch.yml', description: 'A YAML array of patch entries. Each entry targets a line by id and replaces its entire config, or inserts a new line. Later-applied layers win per line.' },
    { icon: '🔧', title: 'dsh-base', description: 'The first layer of every profile: model adapters, tools, persistence, sandboxing, approval policies, settings, credentials, and telemetry. dsh-web-app and dsh-headless add the application layer on top.' },
    { icon: '🌐', title: 'dsh-web-app', description: 'A bundle that adds the browser application on top of dsh-base, delivering the full Web UI experience.' },
    { icon: '💀', title: 'dsh-headless', description: 'A bundle that adds a one-shot runner on top of dsh-base, with no server — suitable for CI/CD scenarios.' },
  ],
  faqs,
}
