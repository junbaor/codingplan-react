/**
 * [INPUT]: 依赖 ThemeToggle、lucide-react 与页面语言/导航配置
 * [OUTPUT]: 对外提供 SiteHeader 与 SiteFooter 共享站点框架
 * [POS]: components 的全站导航层，被首页和详情页复用
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ArrowUpRight, Languages } from 'lucide-react'
import type { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  locale: 'zh-CN' | 'en'
  links?: Array<{ label: string; href: string }>
  language?: { label: string; href: string }
}

export function SiteHeader({ locale, links = [], language }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-page/85 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <a href="/" className="focus-ring font-mono text-base font-bold tracking-tight text-brand-cyan">CodingPlan</a>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-6 md:flex" aria-label={locale === 'en' ? 'Primary navigation' : '主导航'}>
            {links.map((link) => <a key={link.href} className="focus-ring text-sm text-ink-soft transition hover:text-ink" href={link.href}>{link.label}</a>)}
          </nav>
          {language && (
            <a className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-ink-soft transition hover:bg-surface hover:text-ink" href={language.href}>
              <Languages size={17} aria-hidden="true" /><span>{language.label}</span>
            </a>
          )}
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ disclaimer, children }: { disclaimer: string; children?: ReactNode }) {
  return (
    <footer className="border-t border-border py-10">
      <div className="page-shell text-center">
        <p className="mx-auto max-w-3xl text-sm text-ink-muted">{disclaimer}</p>
        {children}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-ink-soft">
          <a className="focus-ring inline-flex min-h-11 items-center gap-1 hover:text-brand-cyan" href="https://kkcode.app" target="_blank" rel="noopener noreferrer">kkcode.app <ArrowUpRight size={14} /></a>
          <a className="focus-ring inline-flex min-h-11 items-center hover:text-brand-cyan" href="/sitemap.xml">Sitemap</a>
        </div>
        <p className="mt-3 font-mono text-xs text-ink-muted">© 2026 codingplan.org</p>
      </div>
    </footer>
  )
}
