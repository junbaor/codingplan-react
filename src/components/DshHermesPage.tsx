/**
 * [INPUT]: 依赖 topic-dsh-hermes 的 DshHermesData、SiteChrome、FaqList 与 lucide-react 图标
 * [OUTPUT]: 对外提供 DeepSeek Hermes Plugin 专题页的完整渲染组件
 * [POS]: components 的独立专题页编排器，不归属于 PlanPage 套餐模板体系
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ArrowLeft, Check, CircleAlert, Terminal } from 'lucide-react'
import type { DshHermesData } from '../data/topic-dsh-hermes'
import { FaqList } from './FaqList'
import { SiteFooter, SiteHeader } from './SiteChrome'

export function DshHermesPage({ data }: { data: DshHermesData }) {
  return (
    <div className="accent-purple">
      <SiteHeader
        locale="zh-CN"
        links={[
          { label: '收录插件', href: '#plugins' },
          { label: '分类', href: '#categories' },
          { label: '验证流程', href: '#verify' },
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
            <h1 className="text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.08] tracking-[-0.045em]">DeepSeek Hermes Plugin</h1>
            <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-[clamp(1rem,2vw,1.15rem)] leading-8 text-ink-soft">{data.hero.description}</p>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
              {data.hero.stats.map((stat) => (
                <div key={stat.label} className="min-w-32 flex-1 rounded-2xl border border-border bg-surface/80 px-4 py-4 backdrop-blur">
                  <strong className="accent-text block font-mono text-xl sm:text-2xl">{stat.value}</strong>
                  <span className="mt-1 block text-xs text-ink-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plugins */}
        <section id="plugins" className="scroll-mt-20 border-y border-border bg-surface py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.pluginsTitle} description={data.pluginsDescription} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.plugins.map((plugin) => (
                <article key={plugin.name} className="flex flex-col rounded-2xl border border-border bg-surface-raised p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-3xl" aria-hidden="true">{plugin.icon}</div>
                    {plugin.badge && <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${plugin.verified ? 'border-brand-green/30 bg-brand-green/10 text-brand-green' : 'accent-border accent-text accent-bg'}`}>{plugin.badge}</span>}
                  </div>
                  <h3 className="mt-4 flex items-center gap-2 text-lg font-bold">
                    <Terminal size={16} className="text-ink-muted" aria-hidden="true" />
                    {plugin.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{plugin.description}</p>
                  <div className="mt-4 space-y-2">
                    <span className="inline-block rounded-lg border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-ink-muted">{plugin.category}</span>
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-page px-3 py-2">
                      <code className="flex-1 truncate font-mono text-xs text-ink-soft">{plugin.installCmd}</code>
                    </div>
                  </div>
                  {plugin.verified && <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-brand-green"><Check size={13} aria-hidden="true" />已验证</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="scroll-mt-20 py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.categoriesTitle} description={data.categoriesDescription} />
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead className="bg-surface-raised">
                  <tr>
                    <th className="border-b border-border px-5 py-4 text-left text-ink-soft">分类</th>
                    <th className="border-b border-border px-5 py-4 text-left text-ink-soft">示例插件</th>
                    <th className="border-b border-border px-5 py-4 text-left accent-text">收录量</th>
                    <th className="border-b border-border px-5 py-4 text-left text-ink-soft">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {data.categories.map((row) => (
                    <tr key={row.category} className="border-b border-border last:border-0">
                      <td className="px-5 py-4 font-bold">{row.category}</td>
                      <td className="px-5 py-4 font-mono text-xs text-ink-soft">{row.examples}</td>
                      <td className="px-5 py-4 accent-bg font-bold">{row.count}</td>
                      <td className="px-5 py-4 text-ink-soft">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Verify */}
        <section id="verify" className="scroll-mt-20 border-y border-border bg-surface py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.verifyTitle} description={data.verifyDescription} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.verifySteps.map((step, index) => (
                <article key={step.title} className="relative rounded-2xl border border-border bg-surface-raised p-6">
                  <div className="text-3xl" aria-hidden="true">{step.icon}</div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="accent-text font-mono text-xs font-bold">0{index + 1}</span>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.collectionsTitle} description={data.collectionsDescription} />
            <div className="grid gap-4 md:grid-cols-3">
              {data.collections.map((item) => (
                <article key={item.title} className="rounded-2xl border border-border bg-surface p-6 text-center">
                  <div className="text-3xl" aria-hidden="true">{item.icon}</div>
                  <h3 className="mt-3 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-4 text-sm text-brand-orange">
              <CircleAlert className="mt-0.5 shrink-0" size={18} />
              被收录只代表发现记录，不代表兼容、安全或官方背书。请在使用前自行评估插件安全性。
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
      <SiteFooter disclaimer="本页收录的插件来源于 DeepSeek 开源社区和 GitHub 公开仓库，可能随时变化或下线。请以各插件仓库页面为准，使用前自行评估安全性。">
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 text-sm text-ink-soft">
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/">返回首页</a>
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/zhipu">智谱</a>
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/minimax">MiniMax</a>
          <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/kimi">Kimi</a>
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
