'use client'
import { useEffect } from 'react'

export default function KakaoAd({ unit = 'DAN-V7n9IvlTj18Yivj9', width = '728', height = '90' }) {
  useEffect(() => {
    // Remove existing script so Kakao re-scans ins elements on SPA navigation
    const existingScript = document.querySelector('script[src*="t1.kakaocdn.net/kas/static/ba.min.js"]')
    if (existingScript) existingScript.remove()

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)
  }, [])

  return (
    <div style={{ margin: '40px auto', textAlign: 'center', maxWidth: `${width}px` }}>
      <ins className="kakao_ad_area" style={{ display: 'none', width: '100%' }}
        data-ad-unit={unit} data-ad-width={width} data-ad-height={height} />
    </div>
  )
}
