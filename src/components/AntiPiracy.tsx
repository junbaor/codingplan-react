/**
 * [INPUT]: 依赖 react 的 useEffect 与浏览器 console
 * [OUTPUT]: 对外提供 AntiPiracy 客户端岛，在浏览器控制台醒目输出反抄袭声明
 * [POS]: components 的反抄袭控制台声明层，被中英文根布局各挂载一次
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
'use client'

import { useEffect } from 'react'

const MESSAGE = '抄我网页，替我挡灾'

const bigStyle = [
  'font-size:40px',
  'font-weight:900',
  'color:#fff',
  'background:linear-gradient(90deg,#e11d48,#f97316)',
  'padding:12px 28px',
  'border-radius:10px',
  'border:3px solid #fde047',
  'text-shadow:0 2px 4px rgba(0,0,0,.6)',
  'box-shadow:0 4px 16px rgba(225,29,72,.6)',
  'letter-spacing:4px',
].join(';')

const subStyle = [
  'font-size:15px',
  'font-weight:700',
  'color:#e11d48',
  'padding:8px 0 4px 0',
].join(';')

const lineStyle = [
  'font-size:13px',
  'color:#64748b',
].join(';')

export function AntiPiracy() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `%c${MESSAGE}\n%c本站源码、设计与文案均为原创。未经授权复制、镜像或爬取本站，将依据《著作权法》及相关法规追究法律责任。\n%c— codingplan.org\n`,
      bigStyle,
      subStyle,
      lineStyle,
    )
  }, [])

  return null
}
