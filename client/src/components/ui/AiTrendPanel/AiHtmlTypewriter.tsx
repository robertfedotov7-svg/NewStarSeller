'use client';
import { motion } from "framer-motion";
import React from "react";
import {AiRecommendationData} from "@/types/product.data.types";
import {useAiGenerate} from "@/context/AiGenerateContext";
import AIText from "@/components/ui/AiTrendPanel/AIText";
import ProductBlock from "@/components/ui/AiTrendPanel/ProductBlock";
import FinanceBlock from "@/components/ui/AiTrendPanel/FinanceBlock";
import TimeLineBlock from "@/components/ui/AiTrendPanel/TimeLineBlock";
import WhyRecomend from "@/components/ui/AiTrendPanel/WhyRecomend";

// 2. ИНТЕРФЕЙС ПРОПСОВ КОМПОНЕНТА
interface AiHtmlTypewriterProps {
    status: 'idle' | 'loading' | 'typing' | 'ready';
    setStatus: (status: 'idle' | 'loading' | 'typing' | 'ready') => void;
    activeTokenIndex: number;
    setActiveTokenIndex: React.Dispatch<React.SetStateAction<number>>;
    visibleCharCount: number;
    setVisibleCharCount: React.Dispatch<React.SetStateAction<number>>;
    data: AiRecommendationData; // Наш входной объект с аналитикой
}

const AiHtmlTypewriter: React.FC<AiHtmlTypewriterProps> = ({ data } : {data: AiRecommendationData}) => {

    const { status } = useAiGenerate()

    return (
        <div className="w-full flex flex-col gap-6 text-left antialiased select-none">

            {/* ТЕКСТОВАЯ ПЕЧАТЬ ИИ */}
            <AIText data={data} />

            {/* РЕЗУЛЬТАТЫ АНАЛИЗА НА ОСНОВЕ ВХОДНОГО ОБЪЕКТА */}
            {status === 'ready' && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="w-full flex flex-col gap-6"
                >
                    {/* Количество найденных товаров */}
                    <div className="flex items-baseline gap-2 border-b border-zinc-800/40 pb-3">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Результат:</span>
                        <div className="text-sm font-medium text-zinc-400">
                            Мы нашли <span className="text-white font-extrabold text-lg tracking-tight tabular-nums mx-0.5">{data.totalItemsFound}</span> подходящих товаров
                        </div>
                    </div>

                    {/* Ряды карточек */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">

                        {/* Товар и его Apple Score */}
                        <ProductBlock data={data}/>

                        {/* Финансовая метрика */}
                        <FinanceBlock data={data}/>
                    </div>

                    {/* ФАКТОРЫ И TIMELINE */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

                        {/* Почему рекомендуем */}
                        <WhyRecomend data={data}/>

                        {/* Timeline */}
                        <TimeLineBlock data={data}/>

                    </div>
                </motion.div>
            )}

        </div>
    );
};

export default AiHtmlTypewriter;