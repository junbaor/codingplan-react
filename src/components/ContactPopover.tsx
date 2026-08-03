/**
 * [INPUT]: 依赖浏览器 mouseenter/mouseleave 与本地 /wework_qr.jpg 静态资源
 * [OUTPUT]: 对外提供企业微信二维码悬浮面板（桌面 hover、移动端点击切换）
 * [POS]: components 的首页交互边界，让 HomePage 主体保持服务端渲染
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
'use client'

import { QrCode } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '../types'

interface Props {
  label: string
  locale: Locale
}

const HIDE_DELAY = 150

export function ContactPopover({ label, locale }: Props) {
  const isEn = locale === 'en'
  const [open, setOpen] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }

  const handleEnter = () => {
    clearHideTimer()
    setOpen(true)
  }

  const handleLeave = () => {
    clearHideTimer()
    hideTimer.current = setTimeout(() => setOpen(false), HIDE_DELAY)
  }

  useEffect(() => clearHideTimer, [])

  return (
    <span
      className="contact-trigger relative inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="focus-ring accent-button inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold transition"
      >
        <QrCode size={17} aria-hidden="true" />
        {label}
      </button>
      {open && (
        <span
          role="dialog"
          aria-label={isEn ? 'WeCom contact QR code' : '企业微信二维码'}
          className="absolute right-0 top-full z-20 mt-3 w-60 rounded-2xl border border-border bg-surface p-4 text-center shadow-2xl"
        >
          <span className="block text-sm font-bold text-ink">
            {isEn ? 'Scan to add WeCom' : '扫码添加企业微信'}
          </span>
          <img
            src="/wework_qr.jpg"
            alt={isEn ? 'WeCom contact QR code' : '企业微信咨询二维码'}
            width="240"
            height="240"
            className="mx-auto mt-3 w-44 rounded-xl border border-border"
          />
          <span className="mt-3 block text-xs leading-relaxed text-ink-muted">
            {isEn ? 'Tell us which plan you need.' : '微信扫码 · 告知套餐'}
          </span>
        </span>
      )}
    </span>
  )
}