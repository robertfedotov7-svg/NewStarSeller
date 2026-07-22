'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

const AiTrendPanel: React.FC = () => {
    // Состояния: 'idle' (до нажатия), 'loading' (5 секунд генерации), 'typing' (процесс печати), 'ready' (финал)
    const [status, setStatus] = useState<'idle' | 'loading' | 'typing' | 'ready'>('idle');
    const [displayedText, setDisplayedText] = useState<string>("");

    // Текст, который нейросеть будет "писать" в реальном времени
    const fullText = "Анализ завершен. Прямо сейчас на пике спроса находятся школьные рюкзаки и канцелярия (+142% рост). До начала сезона осталось 46 дней — идеальное время для закупа. Рекомендуем сплит бюджета: 70% на рюкзаки, 30% на сопутствующие принадлежности.";

    // 1. Эффект для имитации загрузки (5 секунд)
    useEffect(() => {
        if (status !== 'loading') return;

        const loadingTimeout = setTimeout(() => {
            setStatus('typing');
        }, 5000); // Ровно 5 секунд ожидания

        return () => clearTimeout(loadingTimeout);
    }, [status]);

    // 2. Эффект "ChatGPT Typewriter" (Посимвольная печать)
    useEffect(() => {
        if (status !== 'typing') return;

        let currentIndex = 0;

        // Интервал печати: каждые 25мс добавляется один символ (быстро и нативно, как у OpenAI)
        const typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                // Используем функциональный апдейт стейта, чтобы гарантировать точность строки
                setDisplayedText(() => fullText.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setStatus('ready');
                clearInterval(typingInterval);
            }
        }, 25);

        return () => clearInterval(typingInterval);
    }, [status]);

    return (
        <div className="relative p-6 text-white flex w-full flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800/80 bg-gradient-to-r from-zinc-900/70 via-zinc-900/50 to-zinc-900/40 backdrop-blur-xl rounded-[24px] shadow-xl shadow-black/40 overflow-hidden antialiased group">

            {/* Люминесцентное неоновое облако Siri/Apple Intelligence на фоне при работе ИИ */}
            <AnimatePresence>
                {(status === 'typing' || status === 'ready') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-blue-600/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Левая часть: Иконка и контекст */}
            <div className="flex items-center gap-4 flex-1 w-full text-left">
                <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-850 flex items-center justify-center shrink-0">
                    <Sparkles className={`w-5 h-5 ${status === 'loading' ? 'text-purple-400 animate-pulse' : 'text-blue-400'}`} />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <h2 className="text-sm font-bold tracking-tight text-zinc-400 uppercase">AI Аналитика Трендов</h2>

                    {/* Динамический вывод контента в зависимости от статуса */}
                    <div className="min-h-[40px] flex items-center">
                        {status === 'idle' && (
                            <p className="text-base text-zinc-300 font-medium tracking-tight">
                                Запустите живой анализ рынка, чтобы узнать, что выгодно закупать прямо сейчас.
                            </p>
                        )}

                        {status === 'loading' && (
                            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                                <span>Нейросеть изучает дефицит товаров и логистику из Китая...</span>
                            </div>
                        )}

                        {(status === 'typing' || status === 'ready') && (
                            <p className="text-base font-medium text-zinc-150 leading-relaxed tracking-tight select-text">
                                {displayedText}
                                {/* Каретка (мигающий курсор ChatGPT) */}
                                {status === 'typing' && (
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                                        className="inline-block w-1.5 h-4.5 bg-blue-400 ml-1 translate-y-0.5 rounded-sm"
                                    />
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Правая часть: Кнопка действия в стиле Apple Premium Action */}
            <div className="shrink-0 w-full md:w-auto flex justify-end">
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.button
                            key="btn-start"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={() => setStatus('loading')}
                            className="w-full md:w-auto py-3 px-5 rounded-xl bg-white text-zinc-950 font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-zinc-100 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-white/5 outline-none select-none cursor-pointer"
                        >
                            Найти товары
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}

                    {(status === 'loading' || status === 'typing') && (
                        <motion.div
                            key="btn-processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-2.5 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-semibold text-xs tracking-wider uppercase select-none pointer-events-none"
                        >
                            {status === 'loading' ? "Расчет..." : "Печать..."}
                        </motion.div>
                    )}

                    {status === 'ready' && (
                        <motion.button
                            key="btn-ready"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full md:w-auto py-3 px-5 rounded-xl bg-zinc-800 text-white border border-zinc-700 font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-zinc-750 active:scale-[0.97] transition-all duration-200 outline-none select-none cursor-pointer"
                            onClick={() => {
                                setStatus('idle');
                                setDisplayedText("");
                            }}
                        >
                            Пересчитать заново
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
};

export default AiTrendPanel;
