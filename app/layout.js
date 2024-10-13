import './globals.css'

export const metadata = {
  title: '留学生拯救者联盟',
  description: '为留学生提供全方位支持和帮助',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}