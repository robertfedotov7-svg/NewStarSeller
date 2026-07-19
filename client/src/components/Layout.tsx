'use client';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React from "react";



export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <Header />
            <main className="flex-1 relative overflow-hidden w-full overflow-y-auto">
                {children}
            </main>
            <Footer/>
        </div>
    )
}