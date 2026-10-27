// src/app/layout.tsx

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import AuthProvider from "../contexts/AuthContext";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import RouteLoader from "@/components/loaders/RouteLoader";
import { CookiesProvider } from "next-client-cookies/server";
import MegaMenuProvider from "../contexts/MegaMenuContext";
import Script from 'next/script';
import AIFloatingWidget from "@/components/AIFloatingWidget";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AZ Provider Website',
  description: 'AZ Provider Website',
  icons: {
    icon: '/favicon.ico',
  },
  robots: { index: false, follow: false }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        {/* Google Analytics Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-C0DRS069NF`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C0DRS069NF');
          `}
        </Script>
      </head>
      <body className={roboto.className}>
        <Toaster position="top-center" />
        <CookiesProvider>
          <AuthProvider>
            <MegaMenuProvider>
              <ReactQueryProvider>
                <RouteLoader />

                {children}

                {/* ویجت شناور هوش مصنوعی به صورت سراسری */}
                <AIFloatingWidget />
              </ReactQueryProvider>
            </MegaMenuProvider>
          </AuthProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}