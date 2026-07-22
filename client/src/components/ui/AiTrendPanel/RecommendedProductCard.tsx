'use client';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import {SupplierItem} from "@/types/product.data.types";


interface RecommendedProductCardProps {
    item: SupplierItem;
}

const RecommendedProductCard: React.FC<RecommendedProductCardProps> = ({ item }) => {
    // Палитра фирменных стилей B2B площадок
    const chineseMarketplaceStyles: Record<string, { text: string, bg: string, border: string }> = {
        "1688 Factory": { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        "1688 Manufacturing": { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        "1688 Shoes Co.": { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        "Taobao Gold": { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/25" },
        "Taobao Mall": { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/25" },
        "Alibaba Wholesale": { text: "text-amber-600", bg: "bg-amber-600/10", border: "border-amber-600/20" }
    };

    const badgeStyle = chineseMarketplaceStyles[item.chineseMarketplace] || {
        text: "text-zinc-400",
        bg: "bg-zinc-800/50",
        border: "border-zinc-700/50"
    };

    const handleUrl = () => {
        window.open(item.url, '_blank', 'noopener,noreferrer');
    }

    return (
        <motion.div
            onClick={handleUrl}
            key={item.id}
            whileHover={{ y: -4, borderColor: "rgba(113, 113, 122, 0.5)" }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            /* 
                ИСПРАВЛЕНО: 
                - Увеличили ширину карточки до 320px (было 270px) для баланса геометрии.
                - Увеличили внутренние паддинги до p-5 (было p-4).
                - Задали стабильную минимальную высоту min-h-[170px].
            */
            className="flex flex-col justify-between p-5 bg-zinc-950/40 border border-zinc-900 rounded-[22px] min-w-[320px] max-w-[320px] snap-start shrink-0 relative group/card cursor-pointer select-none shadow-lg shadow-black/10 text-left"
        >
            {/* Верхняя часть карточки */}
            <div className="flex items-start justify-between gap-4 w-full">
                <div className="flex flex-col min-w-0">
                    {/* Увеличили категорию до text-[11px] и добавили межбуквенный интервал */}
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                        {item.category}
                    </span>
                    {/* ИСПРАВЛЕНО: Текст названия увеличен с text-xs до text-[15px], межстрочный интервал стал свободнее */}
                    <span className="text-[15px] font-bold text-white tracking-tight leading-snug mt-1.5 line-clamp-2">
                        {item.name}
                    </span>
                </div>

                {/* Стрелочка перехода стала крупнее (кнопка 28x28 пикселей) */}
                <div className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-850 shrink-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 mt-1 shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </div>
            </div>

            {/* Финансовый блок */}
            <div className="flex flex-col gap-1 mt-4 pt-3.5 border-t border-zinc-900/80">
                {/* Увеличили подпись до text-[10px] */}
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Закупочная цена (с фабрики)
                </span>
                {/* ИСПРАВЛЕНО: Главная цена закупа теперь крупная (text-lg font-black) */}
                <span className="text-lg font-black text-emerald-400 tracking-tight tabular-nums">
                    {item.purchasePrice}
                </span>
            </div>

            {/* Нижний бэйдж маркетплейса */}
            <div className="w-full flex pt-3.5 mt-3 border-t border-zinc-900/30">
                {/* ИСПРАВЛЕНО: Размер текста на плашке увеличен с text-[8px] до text-[10px], паддинги стали py-1 px-2.5 */}
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border tracking-wide uppercase shadow-sm ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                    {item.chineseMarketplace}
                </span>
            </div>
        </motion.div>
    );
};

export default RecommendedProductCard;
