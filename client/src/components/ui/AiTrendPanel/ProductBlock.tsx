'use client';
import { Sparkles, RussianRuble } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { AiRecommendationData } from "@/types/product.data.types";

interface ProductBlockProps {
    data: AiRecommendationData;
}

type Grade = {
    title: string;
    color: string;
    bgColor: string;
}

const ProductBlock: React.FC<ProductBlockProps> = ({ data }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const safeScore = Math.min(Math.max(data?.score || 0, 0), 100);
    const scoreOffset = circumference - (safeScore / 100) * circumference;

    const potentialProfit = data?.recommendation?.potentialProfitPerUnit;

    // Умная дизайн-система Apple Statuses
    const grade = (): Grade => {
        const score = data?.score;

        if (score === undefined || score === null) {
            return { title: "Статус неизвестен", color: "#cccccc", bgColor: "#aaaaaa"};
        }

        if (score >= 80) {
            return { title: "Прекрасное время для закупки", color: "#00d492", bgColor: "#00bc7d"};
        }

        if (score > 60) { // Если код дошел сюда, значит score уже точно меньше 85
            return { title: "Сейчас не лучшее время", color: "#ffb900", bgColor: "#fe9a00"};
        }

        return { title: "Точно плохо для первого продукта", color: "#ff637b", bgColor: "#ff2056"};
    }


    // КРИТИЧЕСКИ ВАЖНО: Вызываем функцию ВСЕГО ОДИН РАЗ при рендере!
    // Это исключает баг, когда на разных тегах выплевывались разные цвета.
    const currentGrade = grade();

    return (
        <div
            /*
                ИСПРАВЛЕНО:
                1. Перенесли динамический цвет рамки в CSS-переменную --hover-border.
                   При наведении рамка загорится нативным цветом оценки (зеленым, желтым или красным).
                2. Заменили border-2 на border-[1px] — тонкие рамки смотрятся изящнее и дороже.
            */
            style={{ '--hover-border': currentGrade.color } as React.CSSProperties}
            className="p-6 flex items-center justify-between bg-gradient-to-b from-zinc-950/40 to-zinc-950/20 border border-zinc-900 rounded-2xl relative overflow-hidden group hover:border-[var(--hover-border)] transition-all duration-300 backdrop-blur-md antialiased select-none w-full"
        >
            <div className="flex flex-col items-center justify-between gap-4">
                <span style={{color: currentGrade.color}} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    {data.recommendation.status}
                </span>
                <div className="relative flex items-center justify-center w-24 h-24 z-10 shrink-0 select-none">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r={radius} className="stroke-zinc-900" strokeWidth="6" fill="transparent" />
                        <motion.circle
                            /*
                               ИСПРАВЛЕНО: Ключевой атрибут key={data?.productName}.
                               Как только имя товара меняется, Framer Motion полностью уничтожает старый круг
                               и создает новый с правильным цветом (зеленым/желтым/красным) и плавно запускает анимацию с нуля.
                            */
                            key={data?.productName || safeScore}
                            cx="48" cy="48" r={radius}
                            style={{ stroke: currentGrade.bgColor }}
                            className="transition-all"
                            strokeWidth="6" fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: scoreOffset }}
                            transition={{ duration: 1.2, ease: "linear", delay: 0.1 }}
                            id="apple-score-glow"
                        />
                    </svg>
                    {/* Инжектируем динамический фильтр для поддержки анимированного свечения */}
                    <style>{`
                        #apple-score-glow {
                            filter: drop-shadow(0px 0px 5px ${currentGrade.color});
                        }
                    `}</style>
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-2xl font-black tracking-tighter text-white tabular-nums">{safeScore}</span>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider -mt-1">/100</span>
                    </div>
                </div>
                {potentialProfit !== undefined && potentialProfit !== null && (
                    <div
                        style={{
                            background: `${currentGrade.color}14`,
                            borderColor: `${currentGrade.bgColor}26`,
                            '--bg-active': `${currentGrade.color}22`
                        } as React.CSSProperties}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm transition-all duration-300 hover:!bg-[var(--bg-active)] group-hover:bg-[var(--bg-active)]"
                    >
                        <RussianRuble style={{ color: currentGrade.color }} className="w-3.5 h-3.5 shrink-0" />
                        <div className="flex items-baseline gap-1 text-xs">
                            <span className="text-zinc-400 font-medium tracking-tight">Профит с единицы:</span>
                            <span style={{ color: currentGrade.color }} className="font-black tracking-tight tabular-nums text-[13px]">
                                    {potentialProfit.toLocaleString("ru-RU")} ₽
                                </span>
                        </div>
                    </div>
                )}
            </div>
            {/* ЛЕВАЯ ЧАСТЬ: Метрики и заголовки */}
            <div className="flex flex-col gap-4 text-left z-10 min-w-0">

                {/* Хедер карточки */}
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5 truncate pr-2">
                        {data?.productName}
                    </h3>
                </div>

                {/* Контейнер статуса и выгоды */}
                <div className="flex flex-col gap-2.5 items-start">
                    {/* Живой индикатор статуса закупа */}
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span style={{ background: currentGrade.color }} className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" />
                            <span style={{ background: currentGrade.bgColor }} className="relative inline-flex rounded-full h-2 w-2" />
                        </span>
                        <span style={{ color: currentGrade.color }} className="text-xs font-bold tracking-tight">
                            {currentGrade.title}
                        </span>
                    </div>

                    {/*
                        ИСПРАВЛЕНО: Перевели ховер-эффект плашки профита на CSS-переменные (--bg-active).
                        Теперь при наведении на желтую карточку фон подсветится янтарным,
                        а на красную — алым, без конфликтов с Tailwind.
                    */}
                </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ: Круговой прогресс-бар Apple Score */}
        </div>
    );
};

export default ProductBlock;
