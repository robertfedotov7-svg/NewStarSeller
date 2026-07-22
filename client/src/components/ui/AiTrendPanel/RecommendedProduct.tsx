import {AnimatePresence, motion} from "framer-motion";
import { Container} from "lucide-react";
import React from "react";
import {useAiGenerate} from "@/context/AiGenerateContext";
import RecommendedProductCard from "@/components/ui/AiTrendPanel/RecommendedProductCard";
import {AiRecommendationData, SupplierItem} from "@/types/product.data.types";

const RecommendedProduct = ({data}: {data:AiRecommendationData}) => {

    const { status, activeProductIndex } = useAiGenerate()


    // Динамически вытаскиваем из JSON только те товары, которые привязаны к текущему выбранному табу
    const currentChineseProducts: SupplierItem[] = data?.suppliers


    return (
        <AnimatePresence mode="wait">
            {status === 'ready' && (
                <motion.div
                    key={activeProductIndex} // Смена ключа заставляет анимировать появление новых карточек при переключении табов
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full flex flex-col gap-3 mt-2 border-t border-zinc-900/60 pt-5"
                >
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                        <Container className="w-3.5 h-3.5 text-zinc-400" /> Лучшие варианты прямых поставок из Китая
                    </div>

                    <div className="w-full flex items-stretch gap-3.5 overflow-x-auto pb-2 p-4 scrollbar-none snap-x snap-mandatory">
                        {currentChineseProducts.map((item) => {
                            return (
                                <RecommendedProductCard key={item.id} item={item}/>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
export default RecommendedProduct