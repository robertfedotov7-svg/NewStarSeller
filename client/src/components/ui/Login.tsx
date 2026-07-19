"use client";

import { motion } from "framer-motion";
import React from "react";
import ModalLog from "@/components/ui/Modals/ModalLog";
import Form from "@/components/ui/Login/Form";
import { useAuth } from "@/context/AuthContext";

// 1. Изолируем табы, чтобы изменение режима (mode) не перерисовывало тяжелый Form
const AuthTabs = () => {
    const { isLoading, mode, setMode, setError } = useAuth();

    return (
        <div className="relative grid grid-cols-2 p-1 bg-zinc-950/80 border border-zinc-900 rounded-xl mb-8 z-20">
            <button
                type="button"
                disabled={isLoading}
                onClick={() => { setMode('signin'); setError(null); }}
                className={`relative py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-300 z-10 disabled:opacity-50 ${
                    mode === 'signin' ? 'text-black font-semibold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
                Вход
                {mode === 'signin' && (
                    <motion.div
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 bg-white rounded-lg -z-10"
                    />
                )}
            </button>
            <button
                type="button"
                disabled={isLoading}
                onClick={() => { setMode('signup'); setError(null); }}
                className={`relative py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-300 z-10 disabled:opacity-50 ${
                    mode === 'signup' ? 'text-black font-semibold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
                Создать аккаунт
                {mode === 'signup' && (
                    <motion.div
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 bg-white rounded-lg -z-10"
                    />
                )}
            </button>
        </div>
    );
};

// 2. Изолируем модалку, чтобы изменения ее стейта не трогали форму
const AuthModalContainer = () => {
    const { modalConfig, setModalConfig } = useAuth();

    return (
        <ModalLog
            isOpen={modalConfig.isOpen}
            onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
            title={modalConfig.title}
            description={modalConfig.description}
            type={modalConfig.type}
        />
    );
};

// Главный компонент стал чистым контейнером без логики
const Login = () => {
    return (
        <>
            <motion.div
                // Изменили layout на "size", чтобы плавно анимировалась только высота при переключении табов
                layout="size"
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="relative w-full max-w-md bg-gradient-to-b from-zinc-900/30 to-zinc-950/80 border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(255,255,255,0.02)]"
            >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                {/* Компонент табов */}
                <AuthTabs />

                {/* Компонент формы */}
                <Form />

                <p className="text-[10px] text-zinc-600 font-light text-center leading-relaxed mt-6">
                    Продолжая, вы соглашаетесь с условиями шифрования данных и корпоративной политикой конфиденциальности.
                </p>
            </motion.div>

            {/* Компонент модалки */}
            <AuthModalContainer />
        </>
    );
};

export default Login;
