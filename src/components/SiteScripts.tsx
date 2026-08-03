/**
 * [INPUT]: 依赖 Next.js Script 调度、浏览器主题偏好、GA4 与 Microsoft Clarity
 * [OUTPUT]: 对外提供无闪烁主题初始化和延后加载的全站统计脚本
 * [POS]: components 的文档脚本层，被中英文根布局各挂载一次
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import Script from 'next/script'

const themeScript = `(()=>{try{const p=localStorage.getItem('theme')||'auto';const t=p==='auto'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;document.documentElement.dataset.theme=t;document.documentElement.dataset.themePreference=p}catch{}})()`
const gtagScript = `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-KM761XVPXG')`
const clarityScript = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','vs1xtia1jl')`

export function SiteScripts() {
  return (
    <>
      <Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-KM761XVPXG" strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{gtagScript}</Script>
      <Script id="clarity-init" strategy="afterInteractive">{clarityScript}</Script>
    </>
  )
}
