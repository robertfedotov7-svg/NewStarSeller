'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {AppContextProvider} from "@/context/AppContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const urlId = params?.id as string;

    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // 1. Если Firebase еще проверяет токены — ждем
        if (loading) return;

        // 2. Если сессии нет — мгновенно депортируем на главную
        if (!user) {
            router.push('/');
            return;
        }

        // 3. Если UID в URL не совпадает с UID авторизованного юзера — блокируем доступ
        if (user.uid !== urlId) {
            console.warn("Security Alert: Попытка подмены ID в адресной строке.");
            router.push('/');
            return;
        }

        // 4. Если все проверки пройдены — открываем шлюз
        setIsAuthorized(true);
    }, [user, loading, urlId, router]);

    // Премиальный системный лоадер Apple-style (показывается один раз при входе в личный кабинет)
    if (loading || !isAuthorized) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-zinc-500 font-mono text-xs select-none">
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-zinc-800 border-t-white rounded-full mb-4"
                />
                CORE_SECURE_GATE // AUTORIZING_NODE...
            </div>
        );
    }

    // Если авторизован — рендерим дочерние страницы.
    // Сюда же можно встроить общий Sidebar (боковое меню), который будет виден на всех страницах!
    return (
        <AppContextProvider>
            <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
                {children}
            </div>
        </AppContextProvider>
    );
}
