/**
 * [INPUT]: 依赖 types.FaqItem 的问答数据
 * [OUTPUT]: 对外提供基于原生 details/summary 的 FaqList 组件
 * [POS]: components 的语义化 FAQ 渲染器，与 JSON-LD 共用数据源
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '../types'

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="focus-ring flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-medium text-ink marker:hidden">
            {faq.question}<ChevronDown className="shrink-0 text-ink-muted transition group-open:rotate-180" size={18} aria-hidden="true" />
          </summary>
          <p className="mt-0 pb-5 text-sm leading-7 text-ink-soft sm:text-base">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
