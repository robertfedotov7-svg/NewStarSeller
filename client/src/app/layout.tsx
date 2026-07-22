import { Metadata } from 'next';
import React from "react";
import "./styles/App.css";
import Layout from "@/components/HomeComponents/Layout";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
    title: 'Оптовый интернет-магазин',
    description: 'Продажа товаров оптом от производителя',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <head>
        </head>
        <body>
        <AuthProvider>
            <Layout>
                {children}
            </Layout>
        </AuthProvider>
        </body>
        </html>
    );
}
