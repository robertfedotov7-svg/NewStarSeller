import {DollarSign, ShieldCheck, TrendingUp} from "lucide-react";
import React from "react";
import {AiRecommendationData} from "@/types/product.data.types";

const FinanceBlock = ({data} : {data: AiRecommendationData}) => {
    return (
        <div className="p-5 grid grid-cols-2 gap-4 bg-zinc-950/40 border-2 border-zinc-850/80 rounded-2xl">
            <div className="flex flex-col text-left justify-center border-r border-b border-zinc-900/60 pb-2">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                    <DollarSign className="w-3 h-3" /> Закупка
                                </span>
                <span className="text-base font-extrabold text-white mt-0.5 tabular-nums">{data.finance.purchasePrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex flex-col text-left justify-center border-b border-zinc-900/60 pb-2 pl-2">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Продажа
                                </span>
                <span className="text-base font-extrabold text-emerald-400 mt-0.5 tabular-nums">{data.finance.sellingPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex flex-col text-left justify-center border-r border-zinc-900/60 pt-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Маржинальность</span>
                <span className="text-base font-extrabold text-blue-400 mt-0.5 tabular-nums">{data.finance.margin} %</span>
            </div>
            <div className="flex flex-col text-left justify-center pt-1 pl-2">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Уровень риска
                                </span>
                <span className={`text-base font-extrabold mt-0.5 ${
                    data.finance.riskLevel === "Низкий" ? "text-emerald-400" : data.finance.riskLevel === "Средний" ? "text-amber-400" : "text-rose-400"
                }`}>
                                    {data.finance.riskLevel}
                                </span>
            </div>
        </div>
    )
}

export default FinanceBlock