/**
 * [INPUT]: 依赖 PlanPageData 的内容顺序/标题层级、SiteChrome 与 FaqList
 * [OUTPUT]: 对外提供八个平台共享且兼容原站标题与 CTA 统计选择器的 PlanPage
 * [POS]: components 的详情页编排器，按数据顺序组合模型、套餐、表格和多态区块
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ArrowLeft, ArrowUpRight, Check, CircleAlert } from 'lucide-react'
import type { Accent, PlanPageData } from '../types'
import { FaqList } from './FaqList'
import { SiteFooter, SiteHeader } from './SiteChrome'

const accentClass: Record<Accent, string> = {
  cyan: 'accent-cyan', green: 'accent-green', orange: 'accent-orange', purple: 'accent-purple', blue: 'accent-blue', red: 'accent-red', slate: 'accent-slate',
}

export function PlanPage({ plan }: { plan: PlanPageData }) {
  const archived = plan.availability === 'archived' || plan.availability === 'discontinued'
  const isEn = plan.seo.locale === 'en'
  const contentOrder = plan.contentOrder ?? [
    'models',
    'plans',
    ...(plan.comparison ? ['comparison' as const] : []),
    ...plan.sections.map((_, index) => `section:${index}` as const),
    'tools',
    'faq',
  ]

  return (
    <div className={accentClass[plan.accent]}>
      <SiteHeader locale={plan.seo.locale} links={isEn
        ? [{ label: 'Compare', href: '/en#compare' }, { label: 'Plans', href: '/en#platforms' }, { label: 'FAQ', href: '#faq' }]
        : [{ label: '快速对比', href: '/#compare' }, { label: '全部套餐', href: '/#platforms' }, { label: '常见问题', href: '#faq' }]} />
      <main>
        {archived && <div className="mt-16 border-b border-brand-orange/30 bg-brand-orange/10 py-3"><div className="page-shell flex items-center justify-center gap-2 text-center text-sm text-brand-orange"><CircleAlert size={17} />{isEn ? 'This product has been discontinued. This page is an archive for reference only.' : '该产品已下线，本页为历史归档，不提供购买入口。'}</div></div>}
        <section className={`relative overflow-hidden pb-16 ${archived ? 'pt-20' : 'pt-32'} sm:pb-24 sm:pt-40`}>
          <div className="soft-grid absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
          <div className="page-shell text-center">
            <a href={isEn ? '/en' : '/'} className="focus-ring mb-7 inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft hover:text-ink"><ArrowLeft size={16} />{isEn ? 'Back to comparison' : '返回全部对比'}</a>
            <p className="accent-text mx-auto mb-6 w-fit rounded-full border accent-border accent-bg px-4 py-2 font-mono text-xs font-bold">{plan.hero.badge}</p>
            <h1 className="text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.08] tracking-[-0.045em]">{plan.hero.title}<br /><span className="accent-text">{plan.hero.highlight}</span></h1>
            <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-[clamp(1rem,2vw,1.15rem)] leading-8 text-ink-soft">{plan.hero.description}</p>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">{plan.hero.stats.map((stat) => <div key={stat.label} className="min-w-32 flex-1 rounded-2xl border border-border bg-surface/80 px-4 py-4 backdrop-blur"><strong className="accent-text block font-mono text-xl sm:text-2xl">{stat.value}</strong><span className="mt-1 block text-xs text-ink-muted">{stat.label}</span></div>)}</div>
          </div>
        </section>

        {contentOrder.map((block) => <PlanContentBlock key={block} block={block} plan={plan} />)}
      </main>
      <SiteFooter disclaimer={isEn
        ? 'Prices and quotas come from provider websites and change frequently. Always verify on the official billing page. Some links on this site are referral links.'
        : '价格和额度信息来源于各平台官网，可能随时变化，请以官网结算页为准。本站部分链接为推广链接。'}
        locale={isEn ? 'en' : 'zh-CN'}>
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 text-sm text-ink-soft">
          <a className="min-h-11 py-2 hover:text-brand-cyan" href={isEn ? '/en' : '/'}>{isEn ? 'Back to home' : '返回首页'}</a>
          {isEn ? (
            <>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/en/plans/claude">Claude Code</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/en/plans/glm">GLM</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/en/plans/minimax">MiniMax</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/en/plans/kimi">Kimi</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/en/plans/qwen">Qwen</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/en/plans/opencode-go">OpenCode Go</a>
            </>
          ) : (
            <>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/zhipu">智谱</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/minimax">MiniMax</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/kimi">Kimi</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/volcengine">火山引擎</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/aliyun">阿里云</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/xiaomi">小米 MiMo</a>
              <a className="min-h-11 py-2 hover:text-brand-cyan" href="/plans/opencode-go">OpenCode Go</a>
            </>
          )}
        </div>
      </SiteFooter>
    </div>
  )
}

function PlanContentBlock({ plan, block }: { plan: PlanPageData; block: NonNullable<PlanPageData['contentOrder']>[number] }) {
  const isEn = plan.seo.locale === 'en'
  if (block === 'models') return (
    <ContentSection title={plan.modelsTitle} description={plan.modelsDescription}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plan.models.map((model) => <article key={model.name} className="rounded-2xl border border-border bg-surface p-6"><div className="text-3xl" aria-hidden="true">{model.icon}</div><div className="mt-4 flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{model.name}</h3>{model.badge && <span className="accent-text rounded-full border accent-border px-2 py-0.5 text-xs font-bold">{model.badge}</span>}</div><p className="mt-3 text-sm leading-7 text-ink-soft">{model.description}</p></article>)}
      </div>
    </ContentSection>
  )

  if (block === 'plans') return (
    <ContentSection title={plan.plansTitle} description={plan.plansDescription} surface>
      <div className={`grid gap-5 ${plan.plans.length > 3 ? 'md:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
        {plan.plans.map((item) => <article key={item.name} className={`plan-detail-card relative flex flex-col rounded-3xl border p-6 ${item.featured ? 'accent-border accent-bg' : 'border-border bg-surface'} ${item.disabled ? 'border-dashed' : ''}`}>
          {item.featured && <span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold ${item.recommended ? 'bg-brand-orange text-page' : 'accent-button'}`}>{item.recommended ? (isEn ? 'STRONGLY RECOMMENDED' : '强烈推荐') : (isEn ? 'Recommended' : '推荐')}</span>}
          <div className="flex min-h-8 items-center justify-between gap-3"><p className="plan-tier text-xl font-black">{item.name}</p>{item.badge && <span className="accent-text rounded-full border accent-border px-2.5 py-1 text-xs font-bold">{item.badge}</span>}</div>
          <div className="mt-6"><strong className="font-mono text-3xl text-brand-green">{item.price}</strong><span className="ml-1 text-xs text-ink-muted">{item.unit}</span></div>
          {item.discount && <p className="mt-1 min-h-7 text-xs text-brand-orange">{item.discount}</p>}
          <ul className="mt-5 flex-1 space-y-2 text-sm text-ink-soft">{item.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="accent-text mt-1 shrink-0" size={15} />{feature}</li>)}</ul>
          <div className="mt-6 rounded-xl border border-border bg-surface-raised p-4"><span className="font-mono text-xs uppercase tracking-wider text-ink-muted">{isEn ? 'Best for' : '适合人群'}</span><p className="mt-1 text-sm text-ink-soft">{item.audience}</p></div>
          {plan.purchaseUrl && !item.disabled && <a href={plan.purchaseUrl} target="_blank" rel="noopener noreferrer" className="plan-detail-cta focus-ring accent-button mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition">{item.ctaLabel ?? (isEn ? `Subscribe to ${item.name} →` : `立即购买 ${item.name} →`)}<ArrowUpRight size={16} /></a>}
        </article>)}
      </div>
    </ContentSection>
  )

  if (block === 'comparison' && plan.comparison) return <ContentSection title={plan.comparison.title} description={plan.comparison.description}><div className="overflow-x-auto rounded-2xl border border-border"><table className="w-full min-w-[680px] border-collapse text-sm"><thead className="bg-surface-raised"><tr>{plan.comparison.columns.map((column, index) => <th key={column} className={`border-b border-border px-5 py-4 text-left ${index === plan.comparison?.featuredColumn ? 'accent-text' : 'text-ink-soft'}`}>{column}</th>)}</tr></thead><tbody>{plan.comparison.rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={`px-5 py-4 ${index === plan.comparison?.featuredColumn ? 'accent-bg font-bold' : 'text-ink-soft'}`}>{cell}</td>)}</tr>)}</tbody></table></div></ContentSection>

  if (block.startsWith('section:')) {
    const sectionIndex = Number(block.slice('section:'.length))
    const section = plan.sections[sectionIndex]
    if (!section) return null
    return <ContentSection title={section.title} description={section.description} headingLevel={section.headingLevel} surface={sectionIndex % 2 === 0}>
      {section.warning && <div className="mb-6 flex gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-4 text-sm text-brand-orange"><CircleAlert className="mt-0.5 shrink-0" size={18} />{section.warning}</div>}
      {section.cards && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{section.cards.map((card) => <article key={card.title} className="rounded-2xl border border-border bg-surface p-5">{card.icon && <div className="text-2xl" aria-hidden="true">{card.icon}</div>}{section.cardHeadings === false ? <p className="mt-3 font-bold">{card.title}</p> : <h3 className="mt-3 font-bold">{card.title}</h3>}<p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p></article>)}</div>}
      {section.highlights && <ul className="grid gap-3 md:grid-cols-2">{section.highlights.map((highlight) => <li key={highlight} className="flex gap-3 rounded-2xl border border-border bg-surface p-4 text-sm text-ink-soft"><Check className="accent-text mt-1 shrink-0" size={16} />{highlight}</li>)}</ul>}
    </ContentSection>
  }

  if (block === 'tools') return <ContentSection title={plan.toolsTitle ?? '支持的编程工具'}><div className="flex flex-wrap justify-center gap-2">{plan.tools.map((tool) => <span key={tool} className="rounded-xl border border-border bg-surface px-4 py-2 font-mono text-xs text-ink-soft">{tool}</span>)}</div></ContentSection>

  if (block === 'faq') return <section id="faq" className="scroll-mt-20 py-16 sm:py-24"><div className="page-shell"><SectionHeading title={isEn ? 'Frequently Asked Questions' : '常见问题'} /><FaqList faqs={plan.faqs} /></div></section>

  if (block === 'final-cta' && plan.finalCta) return <ContentSection title={plan.finalCta.title}><div className="text-center"><a href={plan.finalCta.href} target="_blank" rel="noopener noreferrer" className="focus-ring accent-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold transition">{plan.finalCta.label}<ArrowUpRight size={16} /></a></div></ContentSection>

  return null
}

function ContentSection({ title, description, headingLevel = 2, surface = false, children }: { title: string; description?: string; headingLevel?: 2 | 3; surface?: boolean; children: React.ReactNode }) {
  return <section className={`py-16 sm:py-24 ${surface ? 'border-y border-border bg-surface' : ''}`}><div className="page-shell"><SectionHeading title={title} description={description} level={headingLevel} />{children}</div></section>
}

function SectionHeading({ title, description, level = 2 }: { title: string; description?: string; level?: 2 | 3 }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center">{level === 3 ? <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black tracking-tight">{title}</h3> : <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-tight">{title}</h2>}{description && <p className="mt-3 text-ink-soft">{description}</p>}</div>
}
