/**
 * [INPUT]: 依赖 DshHermesPage、JsonLd 与 topic-dsh-hermes 专题数据
 * [OUTPUT]: 对外提供静态生成的 /dsh-hermes 专题页及完整 Metadata
 * [POS]: app/(zh) 的独立专题入口，不归属于 plans 套餐路由体系
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { DshHermesPage } from '@/src/components/DshHermesPage'
import { JsonLd } from '@/src/components/JsonLd'
import { dshHermesData } from '@/src/data/topic-dsh-hermes'
import { buildMetadata } from '@/src/data/metadata'

export const metadata: Metadata = buildMetadata(dshHermesData.seo)

export default function DshHermes() {
  return (
    <>
      <JsonLd data={dshHermesData.seo.jsonLd} />
      <DshHermesPage data={dshHermesData} />
    </>
  )
}
