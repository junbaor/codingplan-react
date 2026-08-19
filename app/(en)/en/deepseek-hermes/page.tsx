/**
 * [INPUT]: 依赖 DshHermesIntroPage、JsonLd 与 topic-deepseek-hermes-en 英文专题数据
 * [OUTPUT]: 对外提供静态生成的 /en/deepseek-hermes 英文介绍页及完整 Metadata（含 zh↔en hreflang）
 * [POS]: app/(en)/en 的独立专题入口，与 /deepseek-hermes 中文介绍页互为跨语言姊妹页
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { DshHermesIntroPage } from '@/src/components/DshHermesIntroPage'
import { JsonLd } from '@/src/components/JsonLd'
import { dshHermesIntroDataEn } from '@/src/data/topic-deepseek-hermes-en'
import { buildMetadata } from '@/src/data/metadata'

export const metadata: Metadata = buildMetadata(dshHermesIntroDataEn.seo)

export default function DeepSeekHermesEn() {
  return (
    <>
      <JsonLd data={dshHermesIntroDataEn.seo.jsonLd} />
      <DshHermesIntroPage data={dshHermesIntroDataEn} />
    </>
  )
}
