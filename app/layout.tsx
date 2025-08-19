import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: '인터넷싸게주는통신 - 인싸통',
  description: '최대 140만원 현금 지원! KT, LG, SK 통신사 인터넷, TV, 결합상품 최저가 가입. 당일 현금 지급, 전문 상담사 1:1 맞춤 추천',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon-150x150.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-150x150.png" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
