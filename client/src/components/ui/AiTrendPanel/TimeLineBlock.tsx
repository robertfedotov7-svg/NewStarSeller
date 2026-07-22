import {Calendar} from "lucide-react";
import React from "react";
import {AiRecommendationData} from "@/types/product.data.types";

const TimeLineBlock = ({data} : {data: AiRecommendationData}) => {
    const timeline = [
        { "title": `Этап 1: ${data.timeline.buyBefore}`, "description": "Запустить закупку партии товаров", "status": "current" },
        { "title": `Этап 2: ${data.timeline.inStorage}`, "description": "Приемка партии на склад и старт продаж", "status": "storage" },
        { "title": `Этап 3: ${data.timeline.peak}`, "description": "Выход на пик сезонного спроса и максимизация рекламы", "status": "peak" },
        { "title": `Этап 4: ${data.timeline.seasonStarts}`, "description": "Спад продаж", "status": "spad" }
    ]
    return (
        <div className="p-6 flex flex-col gap-5 bg-gradient-to-b from-zinc-950/40 to-zinc-950/20 border border-zinc-900/80 rounded-2xl text-left h-full justify-between backdrop-blur-md">
            {/* Шапка таймлайна в стиле Apple Widget */}
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Project Timeline
                            </span>

            {/* Основной контейнер трека */}
            <div className="relative flex flex-col gap-6 py-2 pl-2.5 h-full justify-between">

                {/* ИСПРАВЛЕНО: Единая, идеально ровная вертикальная линия маршрута,
            которая не рвется на брейкпоинтах благодаря абсолютному позиционированию */}
                <div className="absolute left-[14px] top-4 bottom-4 w-[2px] bg-zinc-800/60 rounded-full pointer-events-none" />

                {timeline.map((stage, sIdx) => {
                    const isCurrent = stage.status === "current";
                    const isPeak = stage.status === "peak";
                    const isStorage = stage.status === "storage";
                    return (
                        <div
                            key={sIdx}
                            className="flex items-start gap-5 relative group min-w-0"
                        >
                            {/* КРУГЛЫЕ НА ТИВНЫЕ ИНДИКАТОРЫ APPLE STYLE */}
                            <div className="relative flex items-center justify-center w-[10px] h-[10px] mt-5 shrink-0 z-10">
                                {isCurrent && (
                                    /* Активный текущий шаг: синее неоновое свечение */
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-green-400 ring-4 ring-green-500/20 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                                )}
                                {isStorage && (
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 ring-4 ring-blue-500/20 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                                )}
                                {isPeak && (
                                    /* Пик сезона: оранжевая пульсирующая точка */
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-500/20 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                                )}
                                {!isCurrent && !isPeak && !isStorage && (
                                    /* Пропущенные/ожидающие этапы: аккуратный серый узел */
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-zinc-400 ring-4 ring-zinc-500/20 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                                )}
                            </div>

                            {/* ТЕКСТОВЫЙ БЛОК ЭТАПА */}
                            {/* ИСПРАВЛЕНО: Мы завернули контент в мини-карточку, которая плавно подсвечивается при наведении */}
                            <div className="flex flex-col gap-1 flex-1 min-w-0 bg-zinc-950/10 group-hover:bg-zinc-950/30 p-2.5 px-3 rounded-xl border border-transparent hover:border-zinc-900/60 transition-all duration-200">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                                    isCurrent ? "text-green-400/90" : isPeak ? "text-amber-400/90" : isStorage ? "text-blue-400/90" : "text-zinc-500"
                                                }`}>
                                                {stage.title}
                                            </span>

                                <p className={`text-xs leading-relaxed tracking-tight ${
                                    isCurrent || isStorage ? "font-semibold text-white" : isPeak ? "font-bold text-amber-300" : "font-medium text-zinc-400"
                                }`}>
                                    {stage.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}
export default TimeLineBlock;