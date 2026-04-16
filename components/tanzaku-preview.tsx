'use client'

import { forwardRef } from 'react'

interface TanzakuPreviewProps {
  lines: [string, string, string]
  backgroundColor?: string
}

export const TanzakuPreview = forwardRef<HTMLDivElement, TanzakuPreviewProps>(
  function TanzakuPreview({ lines, backgroundColor = '#f5f0e8' }, ref) {
    const hasContent = lines.some(line => line.trim() !== '')

    return (
      <div
        ref={ref}
        className="relative mx-auto flex h-[480px] w-[160px] flex-col items-center justify-center rounded-sm shadow-2xl"
        style={{ backgroundColor }}
      >
        {/* 短冊の紐穴 */}
        <div className="absolute top-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-tanzaku-ink/30" />
        
        {/* 金の縁取り */}
        <div className="absolute inset-2 rounded-sm border border-tanzaku-gold/40" />
        
        {/* 俳句テキスト */}
        <div className="vertical-text flex h-full items-center justify-center gap-4 px-6 pt-12 pb-8">
          {hasContent ? (
            lines.map((line, index) => (
              <span
                key={index}
                className="text-2xl font-medium tracking-widest"
                style={{ color: '#1a1a1a' }}
              >
                {line || '\u3000'}
              </span>
            ))
          ) : (
            <span className="text-lg text-tanzaku-ink/40">
              俳句を入力してください
            </span>
          )}
        </div>
        
        {/* 和紙のテクスチャエフェクト */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-sm opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    )
  }
)
