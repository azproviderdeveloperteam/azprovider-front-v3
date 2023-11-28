import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import AuthProvider from "../contexts/AuthContext";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

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
        <ReactQueryProvider>
            <AuthProvider>
                <body className={roboto.className}>{children}</body>
            </AuthProvider>
        </ReactQueryProvider>

    </html>
  )
}
