import "./globals.css"
import { DM_Sans} from "next/font/google"

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={`${dmsans.className}`}>
        <body>{children}</body>
      </html>
    )
  }