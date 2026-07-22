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
        <div className="text-white"> dashboard </div>
    );
}
