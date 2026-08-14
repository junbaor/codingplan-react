/**
 * [INPUT]: 依赖 HomePageData、SiteChrome、FaqList 与 ContactPopover 客户端岛
 * [OUTPUT]: 对外提供保留原站标题层级与统计选择器的中英文 HomePage 组件
 * [POS]: components 的首页编排器，将类型化内容投影为原站兼容的对比表和平台卡片
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ArrowRight, ArrowUpRight, Check, Code2, ExternalLink, Sparkles } from 'lucide-react'
import type { Accent, HomePageData, PlatformSummary } from '../types'
import { ContactPopover } from './ContactPopover'
import { FaqList } from './FaqList'
import { SiteFooter, SiteHeader } from './SiteChrome'

const accentClass: Record<Accent, string> = {
  cyan: 'accent-cyan', green: 'accent-green', orange: 'accent-orange', purple: 'accent-purple', blue: 'accent-blue', red: 'accent-red', slate: 'accent-slate',
}

function statusLabel(platform: PlatformSummary, isEn: boolean) {
  if (platform.availability === 'archived') return isEn ? 'Archived' : '已归档'
  if (platform.availability === 'discontinued') return isEn ? 'Discontinued' : '已停售'
  if (platform.availability === 'limited') return isEn ? 'Limited' : '限量'
  return isEn ? 'Available' : '可购买'
}

export function HomePage({ data }: { data: HomePageData }) {
  const isEn = data.locale === 'en'

  return (
    <>
      <SiteHeader
        locale={data.locale}
        links={[
          { label: data.nav.compare, href: '#compare' },
          { label: data.nav.platforms, href: '#platforms' },
          { label: data.nav.faq, href: '#faq' },
        ]}
        language={{ label: data.nav.language, href: data.nav.languageHref }}
      />
      <main>
        <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
          <div className="soft-grid absolute inset-x-0 top-0 -z-10 h-full opacity-35" aria-hidden="true" />
          <div className="absolute left-1/2 top-16 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-cyan/10 blur-3xl sm:h-[32rem] sm:w-[32rem]" aria-hidden="true" />
          <div className="page-shell text-center">
            <p className="card-enter mx-auto mb-7 inline-flex min-h-11 items-center rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-5 font-mono text-xs font-bold tracking-widest text-brand-cyan">{data.hero.badge}</p>
            <h1 className="card-enter text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[1.05] tracking-[-0.05em]">
              {data.hero.title}<br /><span className="text-gradient">{data.hero.highlight}</span>
            </h1>
            <p className="card-enter mx-auto mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-8 text-ink-soft">{data.hero.description}</p>
            <div className="card-enter mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-surface/70 px-2 py-5 backdrop-blur sm:px-6">
              {data.hero.stats.map((stat) => <div key={stat.label} className="px-2"><strong className="block font-mono text-xl text-brand-cyan sm:text-3xl">{stat.value}</strong><span className="mt-1 block text-xs text-ink-muted sm:text-sm">{stat.label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="compare" className="scroll-mt-20 border-y border-border bg-surface py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.comparison.title} description={data.comparison.description} />
            <p className="mb-3 flex items-center gap-2 font-mono text-xs text-ink-muted md:hidden"><ArrowRight size={14} />{isEn ? 'Swipe to compare' : '左右滑动查看完整表格'}</p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <thead className="bg-surface-raised text-xs uppercase tracking-wider text-ink-muted">
                  <tr>{data.comparison.columns.map((column) => <th key={column} className="border-b border-border px-5 py-4 font-medium">{column}</th>)}</tr>
                </thead>
                <tbody>
                  {data.platforms.map((platform) => (
                    <tr key={platform.id} className={`relative border-b border-border last:border-0 hover:bg-surface-hover/60 ${platform.specialBadge ? 'bg-brand-green/5' : ''}`}>
                      <td className="px-5 py-4"><span className="inline-flex items-center gap-2"><a className="focus-ring font-bold hover:text-brand-cyan" href={`#${platform.id}`} aria-label={platform.name}>{platform.name}<span className="absolute inset-0" aria-hidden="true" /></a>{platform.specialBadge && <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-green to-emerald-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-page"><Sparkles size={10} aria-hidden="true" />{platform.specialBadge}</span>}</span></td>
                      <td className="px-5 py-4 font-mono font-bold text-brand-green">{platform.entryPrice}</td>
                      <td className="max-w-64 px-5 py-4 font-mono text-xs text-ink-soft">{platform.models.join(' · ')}</td>
                      <td className="px-5 py-4 text-ink-soft">{platform.quota}</td>
                      <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs ${platform.availability === 'archived' ? 'bg-surface-raised text-ink-muted' : 'bg-brand-cyan/10 text-brand-cyan'}`}>{statusLabel(platform, isEn)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="platforms" className="scroll-mt-20 py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={data.platformsTitle} description={data.platformsDescription} />
            <div className="space-y-7">
              {data.platforms.map((platform) => (
                <article id={platform.id} key={platform.id} className={`${accentClass[platform.accent]} scroll-mt-24 overflow-hidden rounded-3xl border bg-surface ${platform.availability === 'archived' ? 'border-dashed border-border-strong' : 'border-border'}`}>
                  <div className="accent-border border-l-4 px-5 py-6 sm:px-8">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>{platform.specialBadge ? <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-green to-emerald-500 px-3 py-1 text-xs font-bold text-page"><Sparkles size={12} aria-hidden="true" />{platform.specialBadge}</span> : platform.recommended && <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-bold text-brand-orange"><span className="size-1.5 animate-pulse rounded-full bg-brand-orange" aria-hidden="true" />{isEn ? 'STRONGLY RECOMMENDED' : '强烈推荐'}</span>}{isEn ? <h3 className="text-2xl font-black tracking-tight sm:text-3xl">{platform.heading}</h3> : <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{platform.heading}</h2>}<p className="mt-1 text-sm text-ink-soft sm:text-base">{platform.subtitle}</p></div>
                      <div className="sm:text-right"><span className="font-mono text-xs uppercase tracking-wider text-ink-muted">Models</span><p className="mt-1 max-w-lg font-mono text-xs text-ink-soft">{platform.models.join(' · ')}</p></div>
                    </div>
                  </div>
                  <div className="grid gap-4 border-t border-border p-5 lg:grid-cols-3 lg:p-8">
                    {platform.plans.map((plan) => (
                      <div key={plan.name} className={`relative rounded-2xl border p-5 ${plan.featured ? 'accent-border accent-bg' : 'border-border bg-surface-raised'} ${plan.disabled ? 'border-dashed' : ''}`}>
                        <div className="flex min-h-8 items-center justify-between gap-3"><p className="text-lg font-bold">{plan.name}</p>{plan.badge && <span className="accent-text rounded-full border accent-border px-2.5 py-1 text-xs font-bold">{plan.badge}</span>}</div>
                        <p className="mt-5 font-mono"><strong className="text-2xl text-brand-green">{plan.price}</strong><span className="text-xs text-ink-muted">{plan.unit}</span></p>
                        {plan.note && <p className="mt-1 text-xs text-brand-orange">{plan.note}</p>}
                        <ul className="mt-5 space-y-2 text-sm text-ink-soft">{plan.details.map((detail) => <li key={detail} className="flex gap-2"><Check size={15} className="accent-text mt-1 shrink-0" aria-hidden="true" />{detail}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-5 border-t border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div className="flex flex-wrap gap-2">{platform.features.map((feature) => <span key={feature} className="rounded-lg border border-border bg-surface-raised px-3 py-1 text-xs text-ink-soft">{feature}</span>)}</div>
                    <div className="flex flex-wrap gap-2">
                      {platform.cta.detailHref && <a aria-label={`${platform.name} ${isEn ? 'details' : '完整详情'}`} href={platform.cta.detailHref} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-strong px-4 text-sm font-bold hover:bg-surface-raised">{isEn ? 'Details' : '完整详情'}<ArrowRight size={16} /></a>}
                      {platform.cta.contact ? (
                        <ContactPopover label={platform.cta.label} locale={data.locale} />
                      ) : platform.cta.href ? (
                        <a aria-label={`${platform.name} ${platform.cta.label}`} href={platform.cta.href} target="_blank" rel="noopener noreferrer" aria-disabled={platform.cta.disabled || undefined} className={`focus-ring accent-button inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold transition ${platform.cta.disabled ? 'cursor-default opacity-60' : ''}`}>{platform.cta.label}<ExternalLink size={16} /></a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-16 sm:py-24"><div className="page-shell"><SectionHeading title={data.faqTitle} /><FaqList faqs={data.faqs} /></div></section>

        <section className="border-y border-border bg-surface py-16 sm:py-20">
          <div className="page-shell">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-raised p-7 sm:p-10">
              <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full bg-brand-cyan/10 blur-3xl" aria-hidden="true" />
              <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div><p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-green">{data.promotion.eyebrow}</p><h3 className="mt-3 text-3xl font-black sm:text-4xl">{data.promotion.title}</h3><p className="mt-4 max-w-2xl text-ink-soft">{data.promotion.description}</p><div className="mt-5 flex flex-wrap gap-2">{data.promotion.features.map((feature) => <span className="rounded-full border border-border px-3 py-1 text-xs text-ink-soft" key={feature}>{feature}</span>)}</div></div>
                <div className="flex flex-col items-center gap-4"><img src="https://kkcode.app/icon.png" alt="kkcode.app" width={96} height={96} loading="lazy" decoding="async" className="size-24 rounded-3xl border border-border-strong bg-surface object-contain" /><a aria-label={`kkcode.app ${data.promotion.cta}`} className="promotion-cta focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-page" href={isEn ? 'https://kkcode.app' : 'https://kkcode.app/zh'} target="_blank" rel="noopener noreferrer">{data.promotion.cta}<ArrowUpRight size={16} /></a></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter disclaimer={data.footerDisclaimer} locale={data.locale} />
    </>
  )
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"><div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-xl border border-border bg-surface-raised text-brand-cyan"><Code2 size={19} aria-hidden="true" /></div><h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight">{title}</h2>{description && <p className="mt-3 text-ink-soft">{description}</p>}</div>
}
