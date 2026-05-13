import { useEffect } from 'react'

import type { Theme } from './useSettings'

const BG: Record<Theme, string> = {
  pink:   'rgb(236,72,153)',
  blue:   'rgb(73,116,206)',
  yellow: 'rgb(234,179,8)',
}

const FG: Record<Theme, string> = {
  pink:   '#fff',
  blue:   '#fff',
  yellow: '#713f12',
}

export function useFavicon(theme: Theme) {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!

    const r = 14
    ctx.beginPath()
    ctx.roundRect(0, 0, 64, 64, r)
    ctx.fillStyle = BG[theme]
    ctx.fill()

    ctx.fillStyle = FG[theme]
    ctx.font = 'bold 28px Nunito,system-ui,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('123', 32, 34)

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = canvas.toDataURL()
  }, [theme])
}
