import type { Metadata } from "next";
import React, { Suspense } from "react";
import Header from "@/components/mainPages/Header";
import Footer from "@/components/mainPages/Footer";



export const metadata: Metadata = {
    title: "Az Provider Login / register",
    description: "Az Provider Website",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<></>}>
            <Header theme={'white-black'}/>
            {children}
         </Suspense>
    );
}
