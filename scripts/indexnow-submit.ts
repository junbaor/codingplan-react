#!/usr/bin/env node
/**
 * [INPUT]: 依赖 .indexnow-key 持久化 key、依赖 Next.js 部署后的 /sitemap.xml、依赖 https://api.indexnow.org/indexnow
 * [OUTPUT]: 对外提供 IndexNow 批量提交 --init/--key/--dry-run/--url 子命令，输出 HTTP 状态码与诊断信息
 * [POS]: scripts 的 SEO 索引提交入口，与 PROMOTION.md 同步维护
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { readFile, writeFile, access, constants as fsConst } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HOST = 'codingplan.org'
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const KEY_FILE = '.indexnow-key'
const VERIFY_FILE_DIR = 'public'
const API_ENDPOINT = 'https://api.indexnow.org/indexnow'

const COLOR = {
  reset: '\x1b[0m',
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[0;34m',
}

const log = (msg: string) => console.log(`${COLOR.blue}ℹ${COLOR.reset}  ${msg}`)
const ok = (msg: string) => console.log(`${COLOR.green}✓${COLOR.reset}  ${msg}`)
const warn = (msg: string) => console.log(`${COLOR.yellow}⚠${COLOR.reset}  ${msg}`)
const err = (msg: string) => console.error(`${COLOR.red}✗${COLOR.reset}  ${msg}`)

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const USAGE = `用法:
  node scripts/indexnow-submit.ts                    # 提交线上 sitemap.xml 中所有 URL
  node scripts/indexnow-submit.ts <url> [<url>...]   # 提交指定 URL
  node scripts/indexnow-submit.ts --init             # 初始化 key + 生成验证文件
  node scripts/indexnow-submit.ts --key              # 仅打印当前 key
  node scripts/indexnow-submit.ts --dry-run          # 构造请求但不发送

规范参考: https://www.indexnow.org/documentation`

function generateKey(): string {
  return randomBytes(32).toString('hex')
}

function validateKey(key: string): string | null {
  if (!/^[a-zA-Z0-9-]+$/.test(key)) {
    return 'key 含非法字符（官方仅允许 a-z A-Z 0-9 -）'
  }
  if (key.length < 8 || key.length > 128) {
    return `key 长度必须 8-128（当前 ${key.length}）`
  }
  return null
}

async function readKey(): Promise<string | null> {
  try {
    const buf = await readFile(resolve(projectRoot, KEY_FILE), 'utf8')
    return buf.trim()
  } catch {
    return null
  }
}

async function ensureKey(): Promise<string> {
  const existing = await readKey()
  if (existing) {
    const err = validateKey(existing)
    if (err) throw new Error(err)
    log(`使用已保存的 key (${existing.length} 字符, 前缀 ${existing.slice(0, 8)}…)`)
    return existing
  }
  const fresh = generateKey()
  const err = validateKey(fresh)
  if (err) throw new Error(err)
  await writeFile(resolve(projectRoot, KEY_FILE), `${fresh}\n`)
  await writeVerifyFile(fresh)
  warn('首次运行，已生成新 key 并保存到 ' + KEY_FILE)
  warn('部署验证文件后再次运行本脚本即可提交')
  return fresh
}

async function writeVerifyFile(key: string): Promise<void> {
  const verifyPath = resolve(projectRoot, VERIFY_FILE_DIR, `${key}.txt`)
  await writeFile(verifyPath, `${key}\n`)
  ok(`已生成验证文件: ${VERIFY_FILE_DIR}/${key}.txt`)
  warn(`部署后访问 https://${HOST}/${key}.txt 应当返回 key 内容`)
}

async function fetchSitemapUrls(): Promise<string[]> {
  log(`从 ${SITEMAP_URL} 抓取 URL 列表…`)
  const res = await fetch(SITEMAP_URL)
  if (!res.ok) {
    throw new Error(`sitemap 抓取失败: HTTP ${res.status}`)
  }
  const xml = await res.text()
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g)
  const urls = [...matches].map((m) => m[1].trim())
  if (urls.length === 0) {
    throw new Error('sitemap 中未解析到任何 <loc>')
  }
  return urls
}

async function submit(key: string, urls: string[], dryRun: boolean): Promise<void> {
  if (urls.length > 10000) {
    throw new Error(`URL 数量 ${urls.length} 超过单次上限 10000`)
  }

  const payload = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList: urls,
  }

  log(`提交 ${urls.length} 个 URL → ${API_ENDPOINT}`)
  log(`keyLocation: ${payload.keyLocation}`)

  if (dryRun) {
    console.log('----- DRY RUN payload -----')
    console.log(JSON.stringify(payload, null, 2))
    console.log('----------------------------')
    return
  }

  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  const body = await res.text()
  switch (res.status) {
    case 200:
      ok('提交成功 (HTTP 200) — URL 已被搜索引擎接收')
      break
    case 202:
      ok('提交成功 (HTTP 202) — Bing 将异步验证 key 后处理')
      break
    case 400:
      err('HTTP 400 请求格式错误')
      if (body) console.error('    ' + body)
      throw new Error('submit failed')
    case 403:
      err('HTTP 403 key 验证失败')
      err(`  请确认 https://${HOST}/${key}.txt 可公开访问且内容就是 key`)
      if (body) console.error('    ' + body)
      throw new Error('submit failed')
    case 422:
      err('HTTP 422 URL 与 host 不匹配或 key 协议错误')
      if (body) console.error('    ' + body)
      throw new Error('submit failed')
    case 429:
      err('HTTP 429 提交过于频繁（疑似 spam）')
      throw new Error('submit failed')
    default:
      if (res.status >= 500 && res.status < 600) {
        err(`HTTP ${res.status} 服务器错误`)
        if (body) console.error('    ' + body)
        throw new Error('submit failed')
      }
      warn(`HTTP ${res.status} 未知状态`)
      if (body) console.error('    ' + body)
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.includes('-h') || args.includes('--help')) {
    console.log(USAGE)
    return
  }

  const dryRun = args.includes('--dry-run')
  const onlyKey = args.includes('--key')
  const init = args.includes('--init')
  const positional = args.filter((a) => !a.startsWith('--') && !a.startsWith('-'))

  if (init) {
    const key = generateKey()
    const err = validateKey(key)
    if (err) throw new Error(err)
    await writeFile(resolve(projectRoot, KEY_FILE), `${key}\n`)
    await writeVerifyFile(key)
    ok('初始化完成。请部署验证文件后再次运行本脚本提交')
    return
  }

  const key = await ensureKey()

  if (onlyKey) {
    console.log(key)
    return
  }

  let urls: string[]
  if (positional.length > 0) {
    urls = positional
  } else {
    urls = await fetchSitemapUrls()
  }

  if (urls.length === 0) {
    throw new Error('没有可提交的 URL')
  }

  log(`待提交 ${urls.length} 个 URL：`)
  urls.forEach((u, i) => {
    console.log(`    ${String(i + 1).padStart(2)}. ${u}`)
  })

  await submit(key, urls, dryRun)
}

main().catch((e) => {
  err(e instanceof Error ? e.message : String(e))
  process.exit(1)
})
