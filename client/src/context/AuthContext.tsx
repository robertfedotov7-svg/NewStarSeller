'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import {
    User,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

// Описываем типы для нашего контекста
interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

type AuthMode = 'signin' | 'signup';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [mode, setMode] = useState<AuthMode>('signin');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        type: 'info' | 'confirm';
    }>({ isOpen: false, title: '', description: '', type: 'info' });

    useEffect(() => {
        // Подписываемся на изменения состояния авторизации Firebase
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Отписываемся при размонтировании компонента, чтобы избежать утечек памяти
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Ошибка при выходе из системы:", error);
            throw error;
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading, logout,
            mode, setMode,
            isLoading, setIsLoading,
            error, setError,
            modalConfig, setModalConfig
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Кастомный хук для безопасного и удобного использования контекста
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth должен использоваться строго внутри AuthProvider');
    }
    return context;
};
