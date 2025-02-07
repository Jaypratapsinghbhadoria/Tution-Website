import type { Metadata } from "next"
import { Inter, Playfair_Display, Montserrat, Merriweather } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
})

export const metadata: Metadata = {
  title: "Foundation First Academy - Online Tuition Platform",
  description: "Learn and teach with Foundation First Academy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${montserrat.variable} ${merriweather.variable}`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

