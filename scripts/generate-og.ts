/**
 * [INPUT]: 依赖 sharp（node_modules 内置）渲染 1200x630 SVG 品牌图
 * [OUTPUT]: 生成 public/og/default.png，全站 og:image / twitter:image 默认图
 * [POS]: scripts 的 OG 图生成器，改品牌文案后可重复执行：node --experimental-strip-types scripts/generate-og.ts
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import sharp from 'sharp'

const W = 1200
const H = 630

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06080d"/>
      <stop offset="1" stop-color="#0b1220"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#34d399"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1e293b" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.35"/>
  <circle cx="1030" cy="120" r="260" fill="#22d3ee" opacity="0.08"/>
  <circle cx="150" cy="560" r="220" fill="#34d399" opacity="0.07"/>
  <rect x="80" y="96" width="440" height="44" rx="22" fill="none" stroke="#334155" stroke-width="1.5"/>
  <text x="112" y="125" font-family="Courier New, monospace" font-size="21" font-weight="700" fill="#22d3ee" letter-spacing="4">2026 CODING PLANS</text>
  <text x="76" y="248" font-family="PingFang SC, Helvetica, Arial, sans-serif" font-size="86" font-weight="900" fill="#f1f5f9">AI Coding Plan</text>
  <text x="76" y="346" font-family="PingFang SC, Helvetica, Arial, sans-serif" font-size="86" font-weight="900" fill="url(#accent)">全面对比</text>
  <text x="80" y="432" font-family="PingFang SC, Helvetica, Arial, sans-serif" font-size="30" fill="#94a3b8">价格 · 模型 · 额度 · 工具支持 一站式横评</text>
  <text x="80" y="530" font-family="Courier New, monospace" font-size="26" font-weight="700" fill="#64748b">codingplan.org</text>
  <g font-family="Courier New, monospace" font-size="19" fill="#94a3b8">
    <rect x="80" y="556" width="132" height="38" rx="8" fill="#0f172a" stroke="#1e293b"/><text x="96" y="581">GLM</text>
    <rect x="224" y="556" width="150" height="38" rx="8" fill="#0f172a" stroke="#1e293b"/><text x="240" y="581">MiniMax</text>
    <rect x="386" y="556" width="128" height="38" rx="8" fill="#0f172a" stroke="#1e293b"/><text x="402" y="581">Kimi</text>
    <rect x="526" y="556" width="190" height="38" rx="8" fill="#0f172a" stroke="#1e293b"/><text x="542" y="581">Volcengine</text>
    <rect x="728" y="556" width="160" height="38" rx="8" fill="#0f172a" stroke="#1e293b"/><text x="744" y="581">Alibaba</text>
  </g>
</svg>
`

await sharp(Buffer.from(svg)).png().toFile('public/og/default.png')
console.log('generated public/og/default.png')
