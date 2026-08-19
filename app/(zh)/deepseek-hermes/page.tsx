/**
 * [INPUT]: 依赖 DshHermesIntroPage、JsonLd 与 topic-deepseek-hermes 专题数据
 * [OUTPUT]: 对外提供静态生成的 /deepseek-hermes 介绍页及完整 Metadata
 * [POS]: app/(zh) 的独立专题入口，介绍 DSH 框架本体，与 /en/deepseek-hermes 英文页互为跨语言姊妹页
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { DshHermesIntroPage } from '@/src/components/DshHermesIntroPage'
import { JsonLd } from '@/src/components/JsonLd'
import { dshHermesIntroData } from '@/src/data/topic-deepseek-hermes'
import { buildMetadata } from '@/src/data/metadata'

export const metadata: Metadata = buildMetadata(dshHermesIntroData.seo)

export default function DeepSeekHermes() {
  return (
    <>
      <JsonLd data={dshHermesIntroData.seo.jsonLd} />
      <DshHermesIntroPage data={dshHermesIntroData} />
    </>
  )
}
