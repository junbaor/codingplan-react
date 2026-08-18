/**
 * [INPUT]: 依赖 ContentPageData 领域类型、SiteChrome、FaqList 与 content-links 相关链接渲染
 * [OUTPUT]: 对外提供 ArticlePage 内容页模板（教程/对比/问题/优惠/变更记录共用）
 * [POS]: components 的内容矩阵编排器，与 PlanPage 平行，渲染面包屑、hero、多态内容块、FAQ 与相关链接
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ArrowUpRight, Check, CircleAlert, Code2 } from 'lucide-react'
import type { Accent, ContentBlock, ContentPageData } from '../types'
import { FaqList } from './FaqList'
import { defaultHeaderLinks, SiteFooter, SiteHeader } from './SiteChrome'

const accentClass: Record<Accent, string> = {
  cyan: 'accent-cyan', green: 'accent-green', orange: 'accent-orange', purple: 'accent-purple', blue: 'accent-blue', red: 'accent-red', slate: 'accent-slate',
}

export function ArticlePage({ page }: { page: ContentPageData }) {
  const isEn = page.seo.locale === 'en'
  const title = `${page.hero.title}${page.hero.highlight ? ` ${page.hero.highlight}` : ''}`
  const segments = new URL(page.seo.canonical).pathname.split('/').filter(Boolean)
  const isEnPath = segments[0] === 'en'
  const hubSegment = (isEnPath ? segments[1] : segments[0]) ?? ''
  const isHubPage = segments.length === (isEnPath ? 2 : 1)
  const hubLabel = isEn ? (enHubLabels[hubSegment] ?? 'Articles') : (zhHubLabels[hubSegment] ?? '内容')
  const hubHref = isEnPath ? `/en/${hubSegment}` : `/${hubSegment}`

  return (
    <div className={accentClass[page.accent]}>
      <SiteHeader locale={page.seo.locale} links={defaultHeaderLinks(page.seo.locale)} />
      <main>
        <nav aria-label={isEn ? 'Breadcrumb' : '面包屑'} className="page-shell pt-24 sm:pt-28">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            <li><a className="focus-ring min-h-11 py-2 hover:text-brand-cyan" href={isEn ? '/en' : '/'}>CodingPlan.org</a></li>
            {!isHubPage && (
              <>
                <li aria-hidden="true">/</li>
                <li><a className="focus-ring min-h-11 py-2 hover:text-brand-cyan" href={hubHref}>{hubLabel}</a></li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="py-2 text-ink-soft">{title}</li>
          </ol>
        </nav>
        <section className="relative overflow-hidden pb-14 pt-4 sm:pb-20 sm:pt-6">
          <div className="soft-grid absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
          <div className="page-shell text-center">
            <p className="accent-text mx-auto mb-6 w-fit rounded-full border accent-border accent-bg px-4 py-2 font-mono text-xs font-bold">{page.hero.badge}</p>
            <h1 className="text-[clamp(2.2rem,5.5vw,4.4rem)] font-black leading-[1.08] tracking-[-0.045em]">{page.hero.title}{page.hero.highlight && <><br /><span className="accent-text">{page.hero.highlight}</span></>}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,2vw,1.15rem)] leading-8 text-ink-soft">{page.hero.description}</p>
            {page.hero.stats && page.hero.stats.length > 0 && (
              <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
                {page.hero.stats.map((stat) => (
                  <div key={stat.label} className="min-w-32 flex-1 rounded-2xl border border-border bg-surface/80 px-4 py-4 backdrop-blur">
                    <strong className="accent-text block font-mono text-xl sm:text-2xl">{stat.value}</strong>
                    <span className="mt-1 block text-xs text-ink-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {page.sections.map((block, index) => <ContentBlockSection key={index} block={block} index={index} />)}

        {page.hubItems && page.hubItems.length > 0 && (
          <section className="border-y border-border bg-surface py-14">
            <div className="page-shell">
              <h2 className="mb-8 text-center text-xl font-black tracking-tight sm:text-2xl">{page.hubTitle ?? (isEn ? 'All entries' : '全部条目')}</h2>
              {page.hubLayout === 'list' ? (
                <ul className="divide-y divide-border rounded-2xl border border-border bg-surface-raised px-6">
                  {page.hubItems.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="focus-ring group flex min-h-11 items-center gap-4 py-5 transition">
                        {item.kind && <span className="w-fit shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted">{item.kind}</span>}
                        <span className="min-w-0 flex-1">
                          <span className="block text-lg font-bold group-hover:text-brand-cyan">{item.title}</span>
                          {item.description && <span className="mt-0.5 block truncate text-sm text-ink-soft">{item.description}</span>}
                        </span>
                        <ArrowUpRight size={18} className="shrink-0 text-ink-muted transition group-hover:text-brand-cyan" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : page.hubLayout === 'cards-lg' ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {page.hubItems.map((item) => (
                    <a key={item.href} href={item.href} className="focus-ring group flex items-center gap-5 rounded-2xl border border-border bg-surface-raised p-6 transition hover:border-brand-cyan/40">
                      {item.mark && (
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-xl font-mono text-base font-black text-white" style={{ backgroundColor: item.color ?? '#334155' }} aria-hidden="true">{item.mark}</span>
                      )}
                      <span className="min-w-0">
                        {item.kind && <span className="block font-mono text-xs uppercase tracking-wider text-ink-muted">{item.kind}</span>}
                        <span className="mt-1 block text-xl font-black group-hover:text-brand-cyan">{item.title}</span>
                        {item.description && <span className="mt-1 block text-sm leading-6 text-ink-soft">{item.description}</span>}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {page.hubItems.map((item) => (
                    <a key={item.href} href={item.href} className="focus-ring group rounded-2xl border border-border bg-surface-raised p-5 transition hover:border-brand-cyan/40">
                      {item.kind && <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">{item.kind}</p>}
                      <p className="mt-2 font-bold group-hover:text-brand-cyan">{item.title}</p>
                      {item.description && <p className="mt-1 text-sm text-ink-soft">{item.description}</p>}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
          <div className="page-shell">
            <SectionHeading title={isEn ? 'Frequently Asked Questions' : '常见问题'} />
            <FaqList faqs={page.faqs} />
          </div>
        </section>

        {page.cta && (
          <section className="border-y border-border bg-surface py-14">
            <div className="page-shell text-center">
              <h2 className="text-2xl font-black tracking-tight">{page.cta.title}</h2>
              <a href={page.cta.href} target="_blank" rel="noopener noreferrer" className="focus-ring accent-button mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold transition">{page.cta.label}<ArrowUpRight size={16} /></a>
            </div>
          </section>
        )}

        {page.related.length > 0 && (
          <section className="py-14">
            <div className="page-shell">
              <h2 className="mb-8 text-center text-xl font-black tracking-tight sm:text-2xl">{isEn ? 'Related guides & comparisons' : '相关教程与对比'}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.related.map((link) => (
                  <a key={link.href} href={link.href} className="focus-ring group rounded-2xl border border-border bg-surface-raised p-5 transition hover:border-brand-cyan/40">
                    <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">{link.kind}</p>
                    <p className="mt-2 font-bold group-hover:text-brand-cyan">{link.title}</p>
                    {link.description && <p className="mt-1 text-sm text-ink-soft">{link.description}</p>}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter disclaimer={isEn
        ? 'Prices and quotas come from provider websites and change frequently. Always verify on the official billing page. Some links on this site are referral links.'
        : '价格和额度信息来源于各平台官网，可能随时变化，请以官网结算页为准。本站部分链接为推广链接。'}
        locale={isEn ? 'en' : 'zh-CN'} />
    </div>
  )
}

const zhHubLabels: Record<string, string> = {
  blogs: '博客',
  plans: '全部套餐',
  tools: '工具',
  models: '模型',
  deals: '优惠与邀请码',
  changelog: '变更记录',
  leaderboard: '性价比榜',
}

const enHubLabels: Record<string, string> = {
  blogs: 'Blog',
  plans: 'Coding Plans',
  tools: 'Tools',
  models: 'Models',
}

function ContentBlockSection({ block, index }: { block: ContentBlock; index: number }) {
  const surface = index % 2 === 0
  const hasContent = block.paragraphs || block.cards || block.highlights || block.table || block.steps || block.code
  return (
    <section className={`py-14 sm:py-20 ${surface ? 'border-y border-border bg-surface' : ''}`}>
      <div className="page-shell">
        {block.title && <SectionHeading title={block.title} description={block.description} level={block.headingLevel} />}
        {block.warning && <div className="mx-auto mb-6 flex max-w-4xl gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-4 text-sm text-brand-orange"><CircleAlert className="mt-0.5 shrink-0" size={18} />{block.warning}</div>}
        {block.paragraphs && (
          <div className="mx-auto max-w-4xl space-y-4 text-[0.95rem] leading-8 text-ink-soft">
            {block.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
          </div>
        )}
        {block.cards && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {block.cards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-border bg-surface p-5">
                {card.icon && <div className="text-2xl" aria-hidden="true">{card.icon}</div>}
                <h3 className="mt-3 font-bold">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{card.description}</p>
              </article>
            ))}
          </div>
        )}
        {block.highlights && (
          <ul className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2">
            {block.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 rounded-2xl border border-border bg-surface p-4 text-sm text-ink-soft">
                <Check className="accent-text mt-1 shrink-0" size={16} aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
        {block.table && (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead className="bg-surface-raised">
                <tr>{block.table.columns.map((column, columnIndex) => <th key={column} className={`border-b border-border px-5 py-4 text-left ${columnIndex === block.table?.featuredColumn ? 'accent-text' : 'text-ink-soft'}`}>{column}</th>)}</tr>
              </thead>
              <tbody>
                {block.table.rows.map((row, rowIndex) => (
                  <tr key={row[0]} className="relative border-b border-border last:border-0 hover:bg-surface-hover/60">
                    {row.map((cell, cellIndex) => {
                      const rowLink = block.table?.rowLinks?.[rowIndex]
                      return (
                        <td key={`${row[0]}-${cellIndex}`} className={`px-5 py-4 ${cellIndex === block.table?.featuredColumn ? 'accent-bg font-bold' : 'text-ink-soft'}`}>
                          {cellIndex === 0 && rowLink ? (
                            <a className="focus-ring font-bold hover:text-brand-cyan" href={rowLink}>{cell}<span className="absolute inset-0" aria-hidden="true" /></a>
                          ) : cell}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {block.steps && (
          <div className="mx-auto max-w-4xl space-y-5">
            {block.steps.map((step, stepIndex) => (
              <div key={step.name} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="accent-border accent-text flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-bold">{stepIndex + 1}</span>
                  <h3 className="text-lg font-bold">{step.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{step.description}</p>
                {step.code && (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-page p-4">
                    <code className="font-mono text-xs leading-6 text-brand-green"><pre className="whitespace-pre">{step.code}</pre></code>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {block.code && (
          <div className="mx-auto max-w-4xl">
            {block.code.label && <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-muted">{block.code.label}</p>}
            <div className="overflow-x-auto rounded-xl border border-border bg-page p-4">
              <code className="font-mono text-xs leading-6 text-brand-green"><pre className="whitespace-pre">{block.code.content}</pre></code>
            </div>
          </div>
        )}
        {!hasContent && !block.title && null}
      </div>
    </section>
  )
}

function SectionHeading({ title, description, level = 2 }: { title: string; description?: string; level?: 2 | 3 }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-xl border border-border bg-surface-raised text-brand-cyan"><Code2 size={19} aria-hidden="true" /></div>
      {level === 3 ? <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black tracking-tight">{title}</h3> : <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-tight">{title}</h2>}
      {description && <p className="mt-3 text-ink-soft">{description}</p>}
    </div>
  )
}
