import type { Metadata } from "next";
import React, { Suspense } from "react";



export const metadata: Metadata = {
    title: "Az Provider | Product Detail",
    description: "Az Provider | Product Detail",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<></>}>
            {children}
        </Suspense>
    );
}
