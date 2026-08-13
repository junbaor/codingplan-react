/**
 * [INPUT]: 依赖 topic-deepseek-hermes 的 DshHermesIntroData、SiteChrome、FaqList 与 lucide-react
 * [OUTPUT]: 对外提供 DeepSeek Hermes 介绍页的完整渲染组件
 * [POS]: components 的独立专题页编排器，介绍 DSH 框架本体，由 /deepseek-hermes 路由消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ArrowLeft, ArrowUpRight, Layers } from 'lucide-react'
import type { DshHermesIntroData } from '../data/topic-deepseek-hermes'
import { FaqList } from './FaqList'
import { SiteFooter, SiteHeader } from './SiteChrome'

export function DshHermesIntroPage({ data }: { data: DshHermesIntroData }) {
  return (
    <div className="accent-purple">
      <SiteHeader
        locale="zh-CN"
        links={[
          { label: '什么是 DSH', href: '#what-is' },
          { label: '架构', href: '#architecture' },
          { label: 'Turn 流程', href: '#turn-flow' },
          { label: '快速开始', href: '#quickstart' },
          { label: '常见问题', href: '#faq' },
        ]}
      />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="soft-grid absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
          <div className="absolute left-1/2 top-16 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-purple/10 blur-3xl sm:h-[32rem] sm:w-[32rem]" aria-hidden="true" />
          <div className="page-shell text-center">
            <a href="/" className="focus-ring mb-7 inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft hover:text-ink"><ArrowLeft size={16} />返回首页</a>
            <p className="accent-text mx-auto mb-6 w-fit rounded-full border accent-border accent-bg px-4 py-2 font-mono text-xs font-bold">{data.hero.badge}</p>
            <h1 className="text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.08] tracking-[-0.045em]">DeepSeek Hermes</h1>
            <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-[clamp(1rem,2vw,1.15rem)] leading-8 text-ink-soft">{data.hero.description}</p>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
              {data.hero.stats.map((stat) => (
                <div key={stat.label} className="min-w-32 flex-1 rounded-2xl border border-border bg-surface/80 px-4 py-4 backdrop-blur">
                  <strong className="accent-text block font-mono text-xl sm:text-2xl">{stat.value}</strong>
                  <span className="mt-1 block text-xs text-ink-muted">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-strong px-5 text-sm font-bold hover:bg-surface-raised">GitHub 仓库<ArrowUpRight size={16} /></a>
              <a href="/deepseek-harness-plgins" className="focus-ring accent-button inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold transition">浏览插件合集<ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        {/* What is */}
        <section id="what-is" className="scroll-mt-20 border-y border-border bg-surface py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.whatIsTitle} description={data.whatIsDescription} />
            <div className="mx-auto max-w-3xl space-y-6">
              {data.whatIsParagraphs.map((para, i) => (
                <p key={i} className="text-[clamp(1rem,2vw,1.1rem)] leading-8 text-ink-soft">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="scroll-mt-20 py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.architectureTitle} description={data.architectureDescription} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.architectureCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-border bg-surface p-6">
                  <div className="text-3xl" aria-hidden="true">{card.icon}</div>
                  <h3 className="mt-4 text-lg font-bold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Core packages */}
        <section className="border-y border-border bg-surface py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.corePackagesTitle} description={data.corePackagesDescription} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.corePackages.map((pkg) => (
                <article key={pkg.name} className="rounded-2xl border border-border bg-surface-raised p-6">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-ink-muted" aria-hidden="true" />
                    <h3 className="font-mono text-sm font-bold text-brand-cyan">{pkg.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{pkg.owns}</p>
                  <p className="mt-3 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-ink-muted">{pkg.ctxKey}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Turn flow */}
        <section id="turn-flow" className="scroll-mt-20 py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.turnFlowTitle} description={data.turnFlowDescription} />
            <div className="mx-auto max-w-3xl">
              {data.turnFlowSteps.map((step, index) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex size-8 items-center justify-center rounded-full accent-border accent-bg text-xs font-bold accent-text">{index + 1}</div>
                    {index < data.turnFlowSteps.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="font-mono text-sm font-bold text-brand-cyan">{step.label}</p>
                    <p className="mt-1 text-sm leading-7 text-ink-soft">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="border-y border-border bg-surface py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.eventsTitle} description={data.eventsDescription} />
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead className="bg-surface-raised">
                  <tr>
                    <th className="border-b border-border px-5 py-4 text-left text-ink-soft">事件类型</th>
                    <th className="border-b border-border px-5 py-4 text-left accent-text">分发模式</th>
                    <th className="border-b border-border px-5 py-4 text-left text-ink-soft">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {data.events.map((evt) => (
                    <tr key={evt.type} className="border-b border-border last:border-0">
                      <td className="px-5 py-4 font-mono font-bold">{evt.type}</td>
                      <td className="px-5 py-4 accent-bg font-mono text-xs font-bold">{evt.mode}</td>
                      <td className="px-5 py-4 text-ink-soft">{evt.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quickstart */}
        <section id="quickstart" className="scroll-mt-20 py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.quickstartTitle} description={data.quickstartDescription} />
            <div className="mx-auto max-w-2xl space-y-6">
              {data.quickstartBlocks.map((block) => (
                <div key={block.title}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{block.title}</h3>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border bg-page">
                    <div className="flex items-center gap-2 border-b border-border bg-surface-raised px-4 py-2">
                      <span className="size-3 rounded-full bg-brand-red/60" />
                      <span className="size-3 rounded-full bg-brand-orange/60" />
                      <span className="size-3 rounded-full bg-brand-green/60" />
                      <span className="ml-2 font-mono text-xs text-ink-muted">{block.language}</span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-sm text-ink-soft"><code>{block.code}</code></pre>
                  </div>
                  {block.description && <p className="mt-2 text-sm text-ink-muted">{block.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concepts */}
        <section className="border-y border-border bg-surface py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.conceptsTitle} description={data.conceptsDescription} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.concepts.map((concept) => (
                <article key={concept.title} className="rounded-2xl border border-border bg-surface-raised p-6">
                  <div className="text-3xl" aria-hidden="true">{concept.icon}</div>
                  <h3 className="mt-4 text-lg font-bold">{concept.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{concept.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title="常见问题" />
            <FaqList faqs={data.faqs} />
          </div>
        </section>
      </main>
      <SiteFooter disclaimer="DeepSeek Harness 是 DeepSeek AI 的开源项目，采用 MIT 协议。本页内容基于官方仓库文档整理，可能随版本迭代而过时，请以官方文档为准。">
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 text-sm text-ink-soft">
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/">返回首页</a>
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/deepseek-harness-plgins">插件收录合集</a>
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/zhipu">智谱</a>
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/volcengine">火山引擎</a>
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/opencode-go">OpenCode Go</a>
        </div>
      </SiteFooter>
    </div>
  )
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-tight">{title}</h2>
      {description && <p className="mt-3 text-ink-soft">{description}</p>}
    </div>
  )
}
