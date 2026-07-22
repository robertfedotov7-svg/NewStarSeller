import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import AiSummaryBlock from "@/components/ui/AiSummaryBlock";
import {TrendItem } from "@/types/types";

const LIVE_TRENDS: TrendItem[] = [
    {
        category: "Канцелярия и школа",
        subCategory: "Рюкзаки и школьные принадлежности",
        growth: "+142%",
        competition: "Средняя",
        margin: "65%",
        status: "hot",
        insights: {
            tip: "Сегодня лучший момент начать продавать школьные товары.",
            countdown: "До начала сезона осталось 46 дней.",
            shipping: "Средняя доставка из Китая — 28 дней.",
            allocation: "Мы рекомендуем использовать 70% бюджета на рюкзаки и 30% на канцелярию."
        }
    },
    {
        category: "Электроника",
        subCategory: "Портативные станции и павербанки",
        growth: "+89%",
        competition: "Низкая",
        margin: "45%",
        status: "deficit",
        insights: {
            tip: "Оптимальное время для закупа к осеннему сезону.",
            countdown: "До пикового спроса осталось 60 дней.",
            shipping: "Средняя доставка из Китая — 22 дня.",
            allocation: "Рекомендуется 60% бюджета на станции 500W+ и 40% на компактные модели."
        }
    },
    {
        category: "Дом и кухня",
        subCategory: "Умные гаджеты для быта",
        growth: "+64%",
        competition: "Средняя",
        margin: "60%",
        status: "stable",
        insights: {
            tip: "Стабильная категория с низким риском кассового разрыва.",
            countdown: "Спрос стабилен круглый год.",
            shipping: "Доставка со склада в РФ — 3-5 дней.",
            allocation: "Выделите 100% бюджета на ТОП-3 оборачиваемых товара."
        }
    },
];

const AiSummary: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            className="z-0 relative p-6 text-white flex w-full flex-col xl:flex-row items-stretch xl:items-start justify-between gap-6 border border-zinc-800/80 bg-gradient-to-b from-zinc-900/70 to-zinc-900/40 backdrop-blur-xl rounded-[24px] shadow-xl shadow-black/40 overflow-hidden antialiased group">

            {/* Размытые сферы на фоне */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-blue-600/15 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />
            <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-gradient-to-tr from-blue-600/15 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />

            {/* Левая часть: Заголовок */}
            <div className="flex flex-col gap-1 text-left min-w-[240px] shrink-0 w-full xl:w-auto">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                    <h1 className="text-lg font-bold tracking-tight text-zinc-100">AI Live Analytics</h1>
                </div>
                <p className="text-xs text-zinc-400 font-medium tracking-tight max-w-sm">
                    Что выгодно закупать прямо сейчас по оценке спроса
                </p>
            </div>

            {/*
                Центральная часть: ИСПРАВЛЕНА СЕТКА ДЛЯ ПЛАНШЕТОВ
                - По умолчанию (мобилки): grid-cols-1 (в одну колонку)
                - md (планшеты вроде iPad): grid-cols-2 (две колонки, элементы переносятся и не сжимаются)
                - xl (большие мониторы): grid-cols-3 (три колонки в один ряд)
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full flex-1 items-start">
                {LIVE_TRENDS.map((item, index) => (
                    <AiSummaryBlock key={index} item={item} index={index} />
                ))}
            </div>

        </motion.div>
    );
};

export default AiSummary;
