import type { Metadata } from "next";
import React, { Suspense } from "react";



export const metadata: Metadata = {
    title: "Az Provider | On Sales",
    description: "list of all On Sales are in Az Provider",
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
