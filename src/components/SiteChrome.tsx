/**
 * [INPUT]: 依赖 ThemeToggle、lucide-react 与页面语言/导航配置
 * [OUTPUT]: 对外提供 SiteHeader 与 SiteFooter 共享站点框架；footer 的 kkcode.app 外链按 locale 切分（中文页 https://kkcode.app/zh，英文页 https://kkcode.app）
 * [POS]: components 的全站导航层，被首页和详情页复用
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ArrowUpRight, Languages } from 'lucide-react'
import type { ReactNode } from 'react'
import { DATA_UPDATED_AT } from '../data/site-version'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  locale: 'zh-CN' | 'en'
  links?: Array<{ label: string; href: string }>
  language?: { label: string; href: string }
}

/** 全站统一主导航：每个集合 hub 都有头部入口（zh 五项 / en 三项） */
export function defaultHeaderLinks(locale: 'zh-CN' | 'en'): Array<{ label: string; href: string }> {
  return locale === 'en'
    ? [
        { label: 'Compare', href: '/en#compare' },
        { label: 'Plans', href: '/en#platforms' },
        { label: 'Blog', href: '/en/blogs' },
      ]
    : [
        { label: '全部套餐', href: '/plans' },
        { label: '工具', href: '/tools' },
        { label: '模型', href: '/models' },
        { label: '博客', href: '/blogs' },
        { label: '优惠', href: '/deals' },
      ]
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

export function SiteFooter({ disclaimer, locale = 'zh-CN', children }: { disclaimer: string; locale?: 'zh-CN' | 'en'; children?: ReactNode }) {
  const kkcodeHref = locale === 'zh-CN' ? 'https://kkcode.app/zh' : 'https://kkcode.app'
  return (
    <footer className="border-t border-border py-10">
      <div className="page-shell text-center">
        <p className="mx-auto max-w-3xl text-sm text-ink-muted">{disclaimer}</p>
        {children}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-ink-soft">
          {locale === 'zh-CN' ? (
            <>
              <a className="focus-ring inline-flex min-h-11 items-center hover:text-brand-cyan" href="/blogs/what-is-coding-plan">Coding Plan 是什么</a>
              <a className="focus-ring inline-flex min-h-11 items-center hover:text-brand-cyan" href="/tools/claude-code">Claude Code 指南</a>
              <a className="focus-ring inline-flex min-h-11 items-center hover:text-brand-cyan" href="/leaderboard">性价比榜</a>
              <a className="focus-ring inline-flex min-h-11 items-center hover:text-brand-cyan" href="/changelog">变更记录</a>
            </>
          ) : (
            <a className="focus-ring inline-flex min-h-11 items-center hover:text-brand-cyan" href="/en/blogs/claude-vs-glm">Claude vs GLM</a>
          )}
          <a className="focus-ring inline-flex min-h-11 items-center gap-1 hover:text-brand-cyan" href={kkcodeHref} target="_blank" rel="noopener noreferrer">kkcode.app <ArrowUpRight size={14} /></a>
        </div>
        <p className="mt-3 font-mono text-xs text-ink-muted">
          {locale === 'en' ? 'Data updated on ' : '数据更新于 '}
          <time dateTime={DATA_UPDATED_AT}>{DATA_UPDATED_AT}</time>
          <span aria-hidden="true"> · © 2026 codingplan.org</span>
        </p>
      </div>
    </footer>
  )
}
