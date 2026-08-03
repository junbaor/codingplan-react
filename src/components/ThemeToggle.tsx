/**
 * [INPUT]: 依赖浏览器 localStorage、matchMedia 与 lucide-react 图标
 * [OUTPUT]: 对外提供 auto/dark/light 三态 ThemeToggle 组件
 * [POS]: components 的主题控制器，被全站 SiteHeader 使用
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'auto' | 'dark' | 'light'

function applyTheme(theme: Theme) {
  const actual = theme === 'auto'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme
  document.documentElement.dataset.theme = actual
  document.documentElement.dataset.themePreference = theme
}

export function ThemeToggle({ locale }: { locale: 'zh-CN' | 'en' }) {
  const [theme, setTheme] = useState<Theme>('auto')

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Theme | null) ?? 'auto'
    setTheme(saved)
    applyTheme(saved)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => saved === 'auto' && applyTheme('auto')
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const next = theme === 'auto' ? 'dark' : theme === 'dark' ? 'light' : 'auto'
  const labels = locale === 'en'
    ? { auto: 'Follow system', dark: 'Dark theme', light: 'Light theme' }
    : { auto: '跟随系统', dark: '深色模式', light: '浅色模式' }
  const Icon = theme === 'auto' ? Monitor : theme === 'dark' ? Moon : Sun

  return (
    <button
      type="button"
      className="focus-ring grid size-11 place-items-center rounded-xl border border-border bg-surface text-ink-soft transition hover:border-border-strong hover:text-ink"
      aria-label={`${labels[theme]}，${locale === 'en' ? 'switch to' : '切换到'} ${labels[next]}`}
      title={labels[theme]}
      onClick={() => {
        localStorage.setItem('theme', next)
        setTheme(next)
        applyTheme(next)
        window.gtag?.('event', 'theme_change', { event_category: 'preference', event_label: next })
      }}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  )
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
