/**
 * [INPUT]: 依赖 node:fs/promises 的文件读写与目录遍历能力
 * [OUTPUT]: 对外提供 HTML 首行注释注入逻辑，由 postbuild 钩子调用
 * [POS]: scripts 的反抄袭源码注释注入器，在 next build 完成后遍历 .next/server 注入注释
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const COMMENT = '<!-- 抄我网页，替我挡灾 -->'
const SERVER_DIR = join(process.cwd(), '.next', 'server')

async function walk(dir: string): Promise<string[]> {
  let entries: import('node:fs').Dirent[]
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
  const files: string[] = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (entry.name.endsWith('.html')) {
      files.push(full)
    }
  }
  return files
}

async function main(): Promise<void> {
  const htmlFiles = await walk(SERVER_DIR)
  if (htmlFiles.length === 0) {
    console.warn('[anti-piracy] No HTML files found under .next/server')
    return
  }
  let injected = 0
  for (const file of htmlFiles) {
    let content = await readFile(file, 'utf8')
    if (content.includes(COMMENT)) continue
    content = content.replace(/<!DOCTYPE html>/, `<!DOCTYPE html>\n${COMMENT}`)
    await writeFile(file, content, 'utf8')
    injected++
  }
  console.log(`[anti-piracy] Injected comment into ${injected}/${htmlFiles.length} HTML files`)
}

main().catch((err: unknown) => {
  console.error('[anti-piracy] Failed:', err)
  process.exit(1)
})
