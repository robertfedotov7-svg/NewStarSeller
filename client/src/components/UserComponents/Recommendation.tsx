'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import Button from "@/components/ui/AiTrendPanel/Button";
import AiHtmlTypewriter from "@/components/ui/AiTrendPanel/AiHtmlTypewriter";
import { useAiGenerate } from "@/context/AiGenerateContext";

// Импорт баз данных
import TRENDING_PRODUCTS from "@/data/product.json";
import RecommendedProduct from "@/components/ui/AiTrendPanel/RecommendedProduct";

const Recommendation: React.FC = () => {
    const {
        status,
        setStatus,
        activeProductIndex,
        setActiveProductIndex,
        setActiveTokenIndex,
        setVisibleCharCount
    } = useAiGenerate();

    const handleProductTabChange = (index: number) => {
        setActiveProductIndex(index);
    };

    useEffect(() => {
        if (status !== 'loading') return;

        const loadingTimeout = setTimeout(() => {
            setStatus('typing');
            setActiveTokenIndex(0);
            setVisibleCharCount(0);
        }, 5000);

        return () => clearTimeout(loadingTimeout);
    }, [status, setStatus, setActiveTokenIndex, setVisibleCharCount]);

    return (
        <motion.div
            // ИСПРАВЛЕНО: Для появления на дашборде используем мягкий сдержанный выезд снизу (y: 30)
            // вместо грубого падения/выезда со 100%, который рвал силовые линии сетки
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}

            // ИСПРАВЛЕНО: Добавлен layout. Теперь Framer Motion будет непрерывно и мягко
            // анимировать расширение карточки вниз в момент перехода из статуса 'loading' в 'ready'
            layout

            // ИСПРАВЛЕНО: Настройки пружины приведены к стандартам Apple (stiffness: 300, damping: 32).
            // Карточка встает на свое место упруго, но без лишней желейной тряски.
            transition={{
                delay: 0.8,
                type: "spring",
                stiffness: 300,
                damping: 32,
                layout: { type: "spring", stiffness: 260, damping: 30 } // Отдельная мягкая физика для расширения
            }}

            // ИСПРАВЛЕНО: Убрали класс "transition-all duration-500" из Tailwind.
            // Именно он перехватывал управление трансформацией у Framer Motion и создавал жесткую задержку.
            className={`relative p-5 md:p-7 text-white flex w-full flex-col gap-6 border border-zinc-800/80 bg-gradient-to-r from-zinc-900/70 via-zinc-900/50 to-zinc-900/40 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-black/40 overflow-hidden antialiased group ${
                status === 'ready' ? 'items-stretch' : 'md:flex-row md:items-center md:justify-between'
            }`}
        >

            <AnimatePresence>
                {(status === 'typing' || status === 'ready') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute w-48 h-48 bg-gradient-to-br from-blue-600/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
                            status === 'ready' ? '-top-16 -right-16 md:w-72 md:h-72' : '-top-12 -right-12'
                        }`}
                    />
                )}
            </AnimatePresence>

            <div className="flex items-start gap-4 flex-1 w-full text-left">
                <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-850 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className={`w-5 h-5 transition-colors duration-300 ${
                        status === 'loading' ? 'text-purple-400 animate-pulse' :
                            status === 'ready' ? 'text-emerald-400' : 'text-blue-400'
                    }`} />
                </div>

                <div className="flex flex-col gap-4 w-full min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                        <h2 className="text-xs md:text-sm font-bold tracking-widest text-zinc-500 uppercase">
                            AI Аналитика Трендов
                        </h2>

                        {status === 'ready' && (
                            <div className="relative p-0.5 bg-zinc-950/60 border border-zinc-850/60 rounded-xl flex items-center self-start sm:self-auto overflow-hidden">
                                {[
                                    { id: 0, label: "Топ-1 Популярный" },
                                    { id: 1, label: "Топ-2 Средний" },
                                    { id: 2, label: "Топ-3 Нишевый" }
                                ].map((tab) => {
                                    const isTabActive = activeProductIndex === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => handleProductTabChange(tab.id)}
                                            className={`relative px-3.5 py-1.5 text-xs font-bold tracking-tight rounded-lg transition-colors duration-300 outline-none select-none z-10 cursor-pointer ${
                                                isTabActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                            }`}
                                        >
                                            {isTabActive && (
                                                <motion.div
                                                    layoutId="activeSegment"
                                                    className="absolute inset-0 bg-zinc-800/80 border border-zinc-700/50 rounded-lg shadow-md -z-10"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="min-h-[40px] flex items-center w-full mt-1">
                        {status === 'idle' && (
                            <p className="text-sm md:text-base text-zinc-300 font-medium tracking-tight leading-relaxed max-w-xl">
                                Запустите живой анализ рынка, чтобы узнать, что выгодно закупать прямо сейчас.
                            </p>
                        )}

                        {status === 'loading' && (
                            <div className="flex items-center gap-3 text-zinc-400 text-xs md:text-sm font-medium">
                                <Loader2 className="w-4 h-4 animate-spin text-purple-400 shrink-0" />
                                <span className="truncate">Нейросеть изучает дефицит товаров и логистику из Китая...</span>
                            </div>
                        )}

                        <AiHtmlTypewriter data={TRENDING_PRODUCTS[activeProductIndex]} />
                    </div>

                    {/* Скролл-ряд китайских предложений */}
                    <RecommendedProduct data={TRENDING_PRODUCTS[activeProductIndex]} />

                </div>
            </div>

            {/* Правая / Нижняя часть: Блок кнопок управления */}
            <div className={`shrink-0 z-10 w-full md:w-auto flex ${
                status === 'ready' ? 'justify-end md:self-end mt-2' : 'justify-end'
            }`}>
                <Button/>
            </div>

        </motion.div>
    );
};

export default Recommendation;
