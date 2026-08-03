/**
 * [INPUT]: 依赖页面 SEO 数据中的 Schema.org JSON-LD 对象数组
 * [OUTPUT]: 对外提供安全序列化的 JsonLd 服务端组件
 * [POS]: components 的结构化数据渲染器，被 App Router 页面直接复用
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
export function JsonLd({ data }: { data: Record<string, unknown>[] }) {
  return data.map((item, index) => (
    <script
      key={`${String(item['@type'] ?? 'schema')}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
    />
  ))
}
