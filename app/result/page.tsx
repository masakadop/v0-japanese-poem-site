'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ResultContent } from '@/components/result-content'

function ResultPageContent() {
  const searchParams = useSearchParams()
  
  const lines: [string, string, string] = [
    searchParams.get('line1') || '',
    searchParams.get('line2') || '',
    searchParams.get('line3') || '',
  ]
  const color = searchParams.get('color') || '#f5f0e8'

  return <ResultContent lines={lines} color={color} />
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </main>
    }>
      <ResultPageContent />
    </Suspense>
  )
}
