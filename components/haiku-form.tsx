'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TanzakuPreview } from './tanzaku-preview'

const PAPER_COLORS = [
  { name: '白', value: '#f5f0e8' },
  { name: '薄紅', value: '#f8e0e0' },
  { name: '若草', value: '#e8f0e8' },
  { name: '藤', value: '#e8e0f0' },
  { name: '山吹', value: '#f8f0d8' },
]

export function HaikuForm() {
  const router = useRouter()
  const [lines, setLines] = useState<[string, string, string]>(['', '', ''])
  const [selectedColor, setSelectedColor] = useState(PAPER_COLORS[0].value)

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...lines] as [string, string, string]
    newLines[index] = value
    setLines(newLines)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams({
      line1: lines[0],
      line2: lines[1],
      line3: lines[2],
      color: selectedColor,
    })
    
    router.push(`/result?${params.toString()}`)
  }

  const isFormValid = lines.some(line => line.trim() !== '')

  return (
    <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-20">
      {/* プレビュー */}
      <div className="order-1 lg:order-2">
        <h2 className="mb-6 text-center text-sm tracking-wider text-muted-foreground">
          プレビュー
        </h2>
        <TanzakuPreview lines={lines} backgroundColor={selectedColor} />
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="order-2 w-full max-w-md space-y-8 lg:order-1">
        <div className="space-y-6">
          <h2 className="text-sm tracking-wider text-muted-foreground">
            俳句を入力
          </h2>
          
          <div className="space-y-4">
            {['上の句（五）', '中の句（七）', '下の句（五）'].map((label, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-xs text-muted-foreground">
                  {label}
                </label>
                <Input
                  type="text"
                  value={lines[index]}
                  onChange={(e) => handleLineChange(index, e.target.value)}
                  placeholder={
                    index === 0 
                      ? '古池や' 
                      : index === 1 
                      ? '蛙飛び込む' 
                      : '水の音'
                  }
                  className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 色選択 */}
        <div className="space-y-4">
          <h3 className="text-sm tracking-wider text-muted-foreground">
            短冊の色
          </h3>
          <div className="flex gap-3">
            {PAPER_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`group relative h-10 w-10 rounded-full transition-transform hover:scale-110 ${
                  selectedColor === color.value 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : ''
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          短冊を生成する
        </Button>
      </form>
    </div>
  )
}
