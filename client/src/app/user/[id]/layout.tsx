'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContextProvider } from "@/context/AppContext";
import SideBar from "@/components/ui/Aside/SideBar";
import { CollapseContextProvider } from "@/context/CollapseContext";
import Header from "@/components/UserComponents/Header";
import ModalSideBar from "@/components/ui/Modals/SideBar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const urlId = params?.id as string;

    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            router.push('/');
            return;
        }
        if (user.uid !== urlId) {
            console.warn("Security Alert: Попытка подмены ID в адресной строке.");
            router.push('/');
            return;
        }
        setIsAuthorized(true);
    }, [user, loading, urlId, router]);

    if (loading || !isAuthorized) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-zinc-500 font-mono text-xs select-none">
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-zinc-800 border-t-white rounded-full mb-4"
                />
                CORE_SECURE_GATE // AUTHORIZING_NODE...
            </div>
        );
    }

    return (
        <AppContextProvider>
            {/*
                ИСПРАВЛЕНО: h-screen гарантирует, что весь дашборд жестко зафиксирован по высоте,
                а overflow-hidden предотвращает появление двойных скроллбаров.
            */}
            <div className="relative flex justify-start w-full h-screen bg-black overflow-hidden select-none">
                <CollapseContextProvider>
                    <SideBar />
                </CollapseContextProvider>

                {/*
                    ИСПРАВЛЕНО:
                    1. Заменили w-full на flex-1. Теперь рабочая зона занимает строго 100% МИНУС ширина сайдбара.
                    2. Добавили min-w-0 — критический класс для flex-элементов, который запрещает контенту раздувать родителя и вылезать за экран.
                    3. flex flex-col задает правильную вертикальную ось для Хедера и Страниц.
                */}
                <div className="flex-1 min-w-0 h-full flex flex-col justify-start items-stretch z-20">
                    <Header />

                    {/*
                        ИСПРАВЛЕНО: Обернули children в контейнер, который будет самостоятельно
                        скроллиться, если карточки рекомендаций не влезают по высоте.
                    */}
                    <main className="w-full flex-1 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
            <ModalSideBar />
        </AppContextProvider>
    );
}
