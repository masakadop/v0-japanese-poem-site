'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TanzakuPreview } from './tanzaku-preview'
import { Download, Share2, Twitter, ArrowLeft, Check, Copy } from 'lucide-react'
import { toPng } from 'html-to-image'

interface ResultContentProps {
  lines: [string, string, string]
  color: string
}

export function ResultContent({ lines, color }: ResultContentProps) {
  const tanzakuRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  const haikuText = lines.filter(l => l).join(' / ')

  const handleDownload = async () => {
    if (!tanzakuRef.current) return
    
    setIsDownloading(true)
    try {
      const dataUrl = await toPng(tanzakuRef.current, {
        quality: 1,
        pixelRatio: 3,
      })
      
      const link = document.createElement('a')
      link.download = `tanzaku-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('[v0] Error generating image:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleTwitterShare = () => {
    const text = `${haikuText}\n\n#短冊 #俳句`
    const url = window.location.href
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '短冊 - 俳句画像',
          text: haikuText,
          url: window.location.href,
        })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('[v0] Share error:', error)
        }
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      {/* ヘッダー */}
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          短冊が完成しました
        </h1>
        <p className="text-muted-foreground">
          画像をダウンロードしてSNSでシェアしましょう
        </p>
      </header>

      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
          {/* 短冊プレビュー */}
          <div>
            <TanzakuPreview ref={tanzakuRef} lines={lines} backgroundColor={color} />
          </div>

          {/* アクションパネル */}
          <div className="w-full max-w-sm space-y-8">
            {/* 俳句テキスト */}
            <div className="rounded-lg bg-card p-6">
              <h2 className="mb-3 text-sm tracking-wider text-muted-foreground">
                あなたの俳句
              </h2>
              <div className="space-y-1 text-lg">
                {lines.map((line, index) => (
                  <p key={index} className="text-card-foreground">
                    {line || <span className="text-muted-foreground/50">-</span>}
                  </p>
                ))}
              </div>
            </div>

            {/* ダウンロードボタン */}
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              {isDownloading ? 'ダウンロード中...' : '画像をダウンロード'}
            </Button>

            {/* シェアボタン */}
            <div className="space-y-3">
              <h3 className="text-sm tracking-wider text-muted-foreground">
                SNSでシェア
              </h3>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleTwitterShare}
                  className="flex-1"
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  X / Twitter
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleShare}
                  className="flex-1"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  その他
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="w-full"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    コピーしました
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    リンクをコピー
                  </>
                )}
              </Button>
            </div>

            {/* 戻るボタン */}
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full text-muted-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                新しい俳句を作成
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="mt-20 text-center text-sm text-muted-foreground">
        <p>五七五の美しさを、世界へ</p>
      </footer>
    </main>
  )
}
