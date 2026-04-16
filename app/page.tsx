import { HaikuForm } from '@/components/haiku-form'

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      {/* ヘッダー */}
      <header className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          短冊
        </h1>
        <p className="text-balance text-lg text-muted-foreground">
          俳句を美しい短冊画像に変換して
          <br className="sm:hidden" />
          SNSでシェアしましょう
        </p>
      </header>

      {/* メインコンテンツ */}
      <section className="mx-auto max-w-5xl">
        <HaikuForm />
      </section>

      {/* フッター */}
      <footer className="mt-20 text-center text-sm text-muted-foreground">
        <p>五七五の美しさを、世界へ</p>
      </footer>
    </main>
  )
}
