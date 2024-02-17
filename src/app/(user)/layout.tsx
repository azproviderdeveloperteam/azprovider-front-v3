import type { Metadata } from "next";
import React, { Suspense } from "react";



export const metadata: Metadata = {
    title: "Az Provider",
    description: "Az Provider Website",
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
