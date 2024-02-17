import type { Metadata } from "next";
import React, { Suspense } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMainLayout from "@/components/dashboard/DashboardMainLayout";
import ChatProvider from "../../../contexts/ChatContext";



export const metadata: Metadata = {
    title: "Az Provider Dashboard",
    description: "Az Provider Website",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<></>}>
            <ChatProvider>
           <DashboardMainLayout>
               {children}
           </DashboardMainLayout>
            </ChatProvider>

        </Suspense>
    );
}
