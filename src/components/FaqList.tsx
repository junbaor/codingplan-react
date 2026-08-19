/**
 * [INPUT]: 依赖 types.FaqItem 的问答数据、react 的 ReactNode
 * [OUTPUT]: 对外提供基于原生 details/summary 的 FaqList 组件（问题为 h3，answer 支持 [text](url) 链接语法）
 * [POS]: components 的语义化 FAQ 渲染器，与 JSON-LD 共用数据源
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import type { FaqItem } from '../types'

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

function renderFaqAnswer(answer: string): ReactNode {
  const parts: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  LINK_RE.lastIndex = 0
  while ((m = LINK_RE.exec(answer)) !== null) {
    if (m.index > last) parts.push(answer.slice(last, m.index))
    parts.push(
      <a key={m.index} href={m[2]} target="_blank" rel="noopener" className="focus-ring font-bold text-brand-cyan hover:underline">
        {m[1]}
      </a>,
    )
    last = m.index + m[0].length
  }
  if (last < answer.length) parts.push(answer.slice(last))
  return parts
}

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="focus-ring flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-medium text-ink marker:hidden">
            <h3>{faq.question}</h3>
            <ChevronDown className="shrink-0 text-ink-muted transition group-open:rotate-180" size={18} aria-hidden="true" />
          </summary>
          <p className="mt-0 pb-5 text-sm leading-7 text-ink-soft sm:text-base">{renderFaqAnswer(faq.answer)}</p>
        </details>
      ))}
    </div>
  )
}
