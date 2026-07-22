import {Clock, Lightbulb, PieChart, Truck} from "lucide-react";
import {motion} from "framer-motion";
import React from "react";
import {TrendItem } from "@/types/types";

interface ISpect {
    // Вытаскиваем тип ключей из вложенного объекта insights внутри TrendItem
    name: keyof TrendItem['insights'];
    icon: React.ReactNode;
    textStyle: string;
}

const Spects: ISpect[] = [
    {
        name: "tip", // TS теперь проверяет, что "tip" реально есть в item.insights
        icon: <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />,
        textStyle: "text-amber-300",
    },
    {
        name: "countdown",
        icon: <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-400" />,
        textStyle: "text-zinc-300"
    },
    {
        name: "shipping",
        icon: <Truck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-400" />,
        textStyle: "text-zinc-300"
    },
    {
        name: "allocation",
        icon: <PieChart className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />,
        textStyle: "text-purple-300"
    },
]

const AiSummaryBlock = ({item, index} : {item: TrendItem, index: number}) => {
    return (
        <motion.div
            key={index}
            layout
            className="flex flex-col h-full p-4 rounded-2xl bg-zinc-950/20 border border-zinc-900/60 hover:border-zinc-800/80 transition-all duration-300 min-h-[220px]"
        >
            {/* Верхняя строка: Категория и Статус */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col text-left">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{item.category}</span>
                    <span className="text-[13px] font-bold text-white tracking-tight mt-0.5 line-clamp-1">{item.subCategory}</span>
                </div>

                {item.status === "hot" && <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">HOT</span>}
                {item.status === "deficit" && <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">DEFC</span>}
                {item.status === "stable" && <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50 shrink-0">STBL</span>}
            </div>

            {/* Мини-метрики в один ряд */}
            <div className="flex justify-between items-center py-2.5 my-2.5 border-t border-b border-zinc-900/40 text-left text-[11px]">
                <div>
                    <span className="text-[8px] font-semibold text-zinc-500 uppercase tracking-wider block">Рост</span>
                    <span className="font-bold text-emerald-400 tabular-nums">{item.growth}</span>
                </div>
                <div>
                    <span className="text-[8px] font-semibold text-zinc-500 uppercase tracking-wider block">Риск</span>
                    <span className={`font-bold ${item.competition === "Низкая" ? "text-emerald-400" : item.competition === "Средняя" ? "text-amber-400" : "text-rose-400"}`}>{item.competition}</span>
                </div>
                <div>
                    <span className="text-[8px] font-semibold text-zinc-500 uppercase tracking-wider block">Маржа</span>
                    <span className="font-bold text-blue-400 tabular-nums">{item.margin}</span>
                </div>
            </div>

            {/* Детализированные инсайты */}
            <div className="flex flex-col gap-2.5 text-left pt-1 h-full justify-between">
                {Spects.map((spect) => (
                    <div key={spect.name} className="flex items-start gap-2.5">
                        {spect.icon}
                        <p className={`text-[11px] font-medium  leading-normal ${spect.textStyle}`}>
                            {item.insights[spect.name]}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default AiSummaryBlock;