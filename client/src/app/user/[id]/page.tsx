'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    name: string;
    role: string;
    currentBudget: number;
}

export default function UserWorkspace() {

    const { user } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);

    // Подгружаем дополнительные метаданные (роль, бюджет) из Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    if (docSnap.exists()) {
                        setUserData(docSnap.data() as UserData);
                    }
                } catch (error) {
                    console.error("Ошибка чтения профиля из базы:", error);
                }
            }
        };
        fetchUserData();
    }, [user]);

    return (
        <main className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
            <div className="max-w-xl w-full border border-zinc-900 bg-zinc-950/40 p-8 rounded-3xl backdrop-blur-xl space-y-6">

                {/* Технический статус узла */}
                <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                    // Access_Granted // NODE_ROLE: {userData?.role || 'user'}
                </div>

                {/* Приветствие (имя берем из Firestore, если нет — из Auth профиля Google/GitHub) */}
                <h1 className="text-3xl font-black uppercase tracking-tight">
                    Рады вас видеть, <span className="text-zinc-400">{userData?.name || user?.displayName || 'Пользователь'}</span>
                </h1>

                <p className="text-sm text-zinc-500 leading-relaxed font-light">
                    Ваш личный защищенный узел успешно активирован. Здесь вы можете продолжить настройку ИИ-аналитики, указать рабочие бюджеты и получить первые рекомендации по продажам.
                </p>

                {/* Место для ваших дальнейших компонентов (форм, графиков, шагов инструкции) */}
                <div className="w-full h-32 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-xs text-zinc-600 font-mono">
                    [КОМПОНЕНТЫ_ДАЛЬНЕЙШИХ_ДЕЙСТВИЙ_ЗДЕСЬ]
                </div>
            </div>
        </main>
    );
}
