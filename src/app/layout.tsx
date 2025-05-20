import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import AuthProvider from "../contexts/AuthContext";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import RouteLoader from "@/components/loaders/RouteLoader";
import {CookiesProvider} from "next-client-cookies/server";
import MegaMenuProvider from "../contexts/MegaMenuContext";
import Script from 'next/script';

 const roboto = Roboto({
     weight: [ "100","300","400", "500", "700", "900"] ,
     subsets: ['latin'],
})
export const metadata: Metadata = {
  title: 'AZ Provider',
  description: 'AZ Provider Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
      <head>
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
      <Toaster position="top-center"/>
      <CookiesProvider>
          <AuthProvider>
              <MegaMenuProvider>
                  <ReactQueryProvider>
                      <RouteLoader/>

                      {children}
                  </ReactQueryProvider>
              </MegaMenuProvider>
          </AuthProvider>
      </CookiesProvider>
      </body>
      </html>
  )
}
