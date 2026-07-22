'use client';
import React from "react";
import { useApp } from "@/context/AppContext";

interface Marketplace {
    id: string;
    name: string;
    color: string;
    bgActive: string;
}

const MARKETPLACES: Marketplace[] = [
    { id: "ozon", name: "Ozon", color: "rgb(0, 91, 255)", bgActive: "rgba(0, 91, 255, 0.15)" },
    { id: "wb", name: "Wildberries", color: "rgb(203, 17, 171)", bgActive: "rgba(203, 17, 171, 0.15)" },
    { id: "yandex", name: "Яндекс Маркет", color: "rgb(252, 234, 22)", bgActive: "rgba(252, 234, 22, 0.1)" },
    { id: "avito", name: "Авито", color: "rgb(4, 214, 112)", bgActive: "rgba(4, 214, 112, 0.15)" },
];

const MarketplaceSelector: React.FC = () => {
    const { platforms, setPlatforms } = useApp();

    const toggleMarketplace = (id: string) => {
        setPlatforms((prev: string[]) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const isAllSelected = platforms.length === MARKETPLACES.length;

    const toggleAll = () => {
        if (isAllSelected) {
            setPlatforms([]);
        } else {
            setPlatforms(MARKETPLACES.map(m => m.id));
        }
    };

    return (
        // ИСПРАВЛЕНО: h-full и flex-col позволяют компоненту адаптироваться под высоту SelectBlock
        <div className="w-full flex flex-col gap-5 h-full justify-between antialiased">

            {/* Кнопка "Все сразу" */}
            <button
                type="button"
                onClick={toggleAll}
                // ИСПРАВЛЕНО: Немного уменьшили вертикальный паддинг (py-2.5) для компактности на экранах планшетов
                className={`w-full py-2.5 px-5 rounded-xl border text-center font-semibold text-sm tracking-tight transition-all duration-300 select-none outline-none ${
                    isAllSelected
                        ? "bg-white text-zinc-950 border-white shadow-xl shadow-white/5"
                        : "bg-zinc-800/30 text-zinc-300 border-zinc-800/60 hover:bg-zinc-800/60 hover:text-white"
                }`}
            >
                {isAllSelected ? "Сбросить выбор" : "Выбрать все сразу"}
            </button>

            {/* Сетка маркетплейсов */}
            {/*
                ИСПРАВЛЕНО: flex-1 заставляет сетку гибко распределять пространство.
                На планшетах (md) мы уменьшаем gap до 3, а на мониторах возвращаем 3.5.
            */}
            <div className="grid grid-cols-2 gap-3 md:gap-3 lg:gap-3.5 w-full flex-1 items-stretch">
                {MARKETPLACES.map((platform) => {
                    const isSelected = platforms.includes(platform.id);
                    return (
                        <button
                            key={platform.id}
                            type="button"
                            onClick={() => toggleMarketplace(platform.id)}
                            style={{
                                borderColor: isSelected ? platform.color : "transparent",
                                backgroundColor: isSelected ? platform.bgActive : "rgba(39, 39, 42, 0.2)",
                            }}
                            /*
                                ИСПРАВЛЕНО:
                                1. Заменили min-h-[100px] на компактный min-h-[84px] md:min-h-[80px] lg:min-h-[100px].
                                   Теперь на iPad плитки не будут искусственно раздувать карточку в высоту.
                                2. Уменьшили скругление углов до rounded-xl для гармонии с адаптивным BudgetSelector.
                                3. Уменьшили padding (p-3.5) на средних экранах.
                            */
                            className={`relative flex flex-col items-start justify-between p-3.5 md:p-3 lg:p-4 min-h-[84px] md:min-h-[80px] lg:min-h-[100px] rounded-xl border transition-all duration-300 cursor-pointer select-none text-left group overflow-hidden outline-none ${
                                isSelected
                                    ? "!text-white shadow-lg"
                                    : "border-zinc-800/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 hover:border-zinc-800/80"
                            }`}
                        >
                            {/* Индикатор-чекбокс */}
                            <div className="w-full flex justify-between items-center gap-1">
                                <span className="text-[14px] md:text-[13px] lg:text-[15px] font-bold tracking-tight truncate">
                                    {platform.name}
                                </span>
                                <div
                                    style={{ backgroundColor: isSelected ? platform.color : "transparent" }}
                                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 flex items-center justify-center shrink-0 ${
                                        isSelected ? "border-transparent" : "border-zinc-700 group-hover:border-zinc-500"
                                    }`}
                                >
                                    {isSelected && (
                                        <svg className="w-2 h-2 text-zinc-950 font-black" fill="none" stroke="currentColor" strokeWidth="5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    )}
                                </div>
                            </div>

                            {/* Статус снизу плитки */}
                            <span className="text-[10px] font-medium tracking-tight text-zinc-500 group-hover:text-zinc-400 transition-colors mt-2">
                                {isSelected ? "Подключено" : "Отключено"}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Итоговая строчка */}
            <div className="pt-3 flex items-center justify-between px-0.5 border-t border-zinc-800/60 mt-1">
                <span className="text-xs font-medium text-zinc-500">Выбрано платформ</span>
                <span className="text-base font-bold tracking-tight text-zinc-200 tabular-nums">
                    {platforms.length} <span className="text-xs text-zinc-500 font-normal">из</span> {MARKETPLACES.length}
                </span>
            </div>
        </div>
    );
};

export default MarketplaceSelector;
