'use client';
import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";

interface PriorityOption {
    id: string;
    label: string;
    description: string;
    icon: string;
}

const PRIORITIES: PriorityOption[] = [
    { id: "profit", label: "Максимальная прибыль", description: "Фокус на маржинальности", icon: "💰" },
    { id: "risk", label: "Минимальный риск", description: "Стабильные ниши", icon: "🛡️" },
    { id: "speed", label: "Быстрые продажи", description: "Высокая оборачиваемость", icon: "⚡" },
    { id: "longterm", label: "Долгосрочный товар", description: "Актуален годами", icon: "📈" },
    { id: "noseason", label: "Без сезонности", description: "Стабильный спрос 365 дней", icon: "☀️" },
];

interface PrioritySelectorProps {
    onChange?: (selectedId: string) => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ onChange }) => {
    const { priority, setPriority } = useApp();

    useEffect(() => {
        if (!priority) {
            setPriority("profit");
        }
    }, [priority, setPriority]);

    useEffect(() => {
        if (onChange && priority) {
            onChange(priority);
        }
    }, [priority, onChange]);

    return (
        /*
            ИСПРАВЛЕНО: h-full позволяет контенту распределяться по всей высоте карточки.
            Внутренний контейнер переключается на сетку Grid на планшетах (md)
            и возвращается во flex-col на мобилках и десктопах.
        */
        <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-3 h-full justify-between antialiased">

            {/* Обертка для кнопок, чтобы они занимали верхнюю часть Grid */}
            <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-2.5 md:col-span-2">
                {PRIORITIES.map((item, index) => {
                    const isSelected = priority === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setPriority(item.id)}
                            /*
                                ИСПРАВЛЕНО:
                                1. На планшетах последний (5-й) элемент растягивается на всю ширину (md:last:col-span-2).
                                2. Паддинги изменены на p-3, а скругления на rounded-xl для компактности по высоте.
                            */
                            className={`w-full flex items-center justify-between p-3 px-3.5 rounded-xl border transition-all duration-300 cursor-pointer select-none text-left outline-none group md:last:col-span-2 lg:last:col-span-1 ${
                                isSelected
                                    ? "bg-zinc-800/50 border-zinc-700/80 shadow-lg shadow-black/20"
                                    : "bg-zinc-950/20 border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                            }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                {/* Эмодзи-иконка */}
                                <span className="text-lg filter drop-shadow-sm grayscale-[20%] group-hover:grayscale-0 transition-all shrink-0">
                                    {item.icon}
                                </span>

                                <div className="flex flex-col min-w-0">
                                    {/* truncate предохраняет текст от вылезания на узких планшетных экранах */}
                                    <span className={`text-[13px] font-semibold tracking-tight transition-colors truncate ${
                                        isSelected ? "text-white" : "text-zinc-300"
                                    }`}>
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] font-medium text-zinc-500 tracking-tight mt-0.5 truncate">
                                        {item.description}
                                    </span>
                                </div>
                            </div>

                            {/* Минималистичный круглый индикатор */}
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                                isSelected
                                    ? "border-white bg-white"
                                    : "border-zinc-700 group-hover:border-zinc-500"
                            }`}>
                                {isSelected && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/*
                Итоговая декоративная строчка.
                ИСПРАВЛЕНО: Отделена линией и прижата строго к нижней границе,
                как и в двух предыдущих селекторах, формируя идеальную горизонтальную линию.
            */}
            <div className="pt-3 flex items-center justify-between px-0.5 border-t border-zinc-800/60 mt-1 md:col-span-2 lg:col-span-1">
                <span className="text-xs font-medium text-zinc-500">Приоритет выбран</span>
                <span className="text-base font-bold tracking-tight text-zinc-200 uppercase text-[11px]">
                    {priority || "Не выбран"}
                </span>
            </div>
        </div>
    );
};

export default PrioritySelector;
