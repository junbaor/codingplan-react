/**
 * [INPUT]: 依赖浏览器点击、滚动、beforeunload 事件与全局 gtag
 * [OUTPUT]: 对外提供 GA4 自定义事件追踪副作用组件
 * [POS]: components 的统计客户端岛，由每个 Next.js 根布局挂载一次
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
'use client'

import { useEffect } from 'react'

const domains: Record<string, string> = {
  'bigmodel.cn': '智谱GLM', 'minimaxi.com': 'MiniMax', 'minimax.io': 'MiniMax', 'kimi.com': 'Kimi',
  'volcengine.com': '火山引擎', 'aliyun.com': '阿里云', 'baishan.com': '白云智算',
  'tencent.com': '腾讯云', 'claude.com': 'Claude', 'z.ai': 'GLM国际版', 'kkcode.app': 'kkcode.app',
  'opencode.ai': 'OpenCodeGo', 'xiaomimimo.com': '小米MiMo',
}

export function Analytics() {
  useEffect(() => {
    const startedAt = Date.now()
    const sent = new Set<number>()
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest('a')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      if (href.startsWith('http') && !href.includes('codingplan.org')) {
        const platform = Object.entries(domains).find(([domain]) => href.includes(domain))?.[1] ?? 'unknown'
        window.gtag?.('event', 'click_external_link', { event_category: 'outbound', event_label: platform, link_url: href })
      }
      if (link.classList.contains('plan-detail-cta') || link.closest('.plan-detail-card')) {
        const planName = link.closest('.plan-detail-card')?.querySelector('.plan-tier')?.textContent ?? 'unknown'
        window.gtag?.('event', 'click_cta', {
          event_category: 'engagement',
          event_label: planName,
          button_text: link.textContent?.trim() ?? '',
        })
      }
      if (link.classList.contains('promotion-cta')) {
        window.gtag?.('event', 'click_cta', {
          event_category: 'promotion',
          event_label: 'kkcode_app',
          button_text: link.textContent?.trim() ?? '',
        })
      }
    }
    let scrollTimer: ReturnType<typeof setTimeout> | undefined
    const onScroll = () => {
      if (scrollTimer) return
      scrollTimer = setTimeout(() => {
        scrollTimer = undefined
        const available = document.documentElement.scrollHeight - window.innerHeight
        if (available <= 0) return
        const percent = Math.round((window.scrollY / available) * 100)
        ;[25, 50, 75, 90, 100].forEach((milestone) => {
          if (percent >= milestone && !sent.has(milestone)) {
            sent.add(milestone)
            window.gtag?.('event', 'scroll_depth', { event_category: 'engagement', event_label: `${milestone}%`, value: milestone })
          }
        })
      }, 500)
    }
    const onBeforeUnload = () => {
      window.gtag?.('event', 'page_duration', { event_category: 'engagement', value: Math.round((Date.now() - startedAt) / 1000) })
    }
    document.addEventListener('click', onClick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('beforeunload', onBeforeUnload)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])
  return null
}
