'use client';
import React, { useState, useEffect } from "react";
import { Radio, RadioChangeEvent } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

const BudgetSelector: React.FC = () => {
    const { finalBudget, setFinalBudget } = useApp();

    const fixedBudgets: Record<number, number> = {
        1: 30000,
        2: 50000,
        3: 100000,
        4: 300000,
        5: 500000,
    };

    const getInitialRadio = () => {
        const found = Object.keys(fixedBudgets).find(
            (key) => fixedBudgets[Number(key)] === finalBudget
        );
        return found ? Number(found) : finalBudget > 500000 ? 6 : 1;
    };

    const [radioValue, setRadioValue] = useState<number>(getInitialRadio);
    const [sliderValue, setSliderValue] = useState<number>(
        finalBudget > 500000 ? finalBudget : 500000
    );

    useEffect(() => {
        const currentBudget = radioValue === 6 ? sliderValue : fixedBudgets[radioValue];
        if (currentBudget !== finalBudget) {
            setFinalBudget(currentBudget);
        }
    }, [radioValue, sliderValue, finalBudget, setFinalBudget]);

    const handleRadioChange = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    return (
        // ИСПРАВЛЕНО: h-full и flex-col позволяют элементам дышать и выравниваться по высоте SelectBlock
        <div className="w-full flex flex-col gap-5 h-full justify-between antialiased">

            {/*
                ИСПРАВЛЕНО: Radio.Group теперь управляет внутренней сеткой Grid.
                - На мобильных и больших мониторах: в одну колонку (flex flex-col).
                - На ПЛАНШЕТАХ (брейкпоинт md): перестраивается в сетку из 2 колонок (grid grid-cols-2),
                  чтобы сэкономить кучу места по вертикали и не растягивать карточку.
            */}
            <Radio.Group
                onChange={handleRadioChange}
                value={radioValue}
                className="w-full flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-3"
            >
                {[
                    { val: 1, label: "До 30 000 ₽" },
                    { val: 2, label: "До 50 000 ₽" },
                    { val: 3, label: "До 100 000 ₽" },
                    { val: 4, label: "До 300 000 ₽" },
                    { val: 5, label: "До 500 000 ₽" },
                ].map((item) => (
                    <Radio
                        key={item.val}
                        value={item.val}
                        className={`w-full !flex items-center py-3 px-4 rounded-xl border transition-all duration-300 select-none cursor-pointer ${
                            radioValue === item.val
                                ? "bg-zinc-800/40 border-zinc-700/60 !text-white"
                                : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                        }`}
                    >
                        <span className="font-medium text-[14px] tracking-tight text-white">{item.label}</span>
                    </Radio>
                ))}

                {/*
                    Пункт "Свой вариант".
                    ИСПРАВЛЕНО: На планшетах (md) растягивается на обе колонки (col-span-2),
                    чтобы визуально отделяться от фиксированных тарифов и красиво подготавливать место под слайдер.
                */}
                <Radio
                    value={6}
                    className={`w-full !flex items-center py-3 px-4 rounded-xl border transition-all duration-300 select-none cursor-pointer md:col-span-2 lg:col-span-1 ${
                        radioValue === 6
                            ? "bg-zinc-800/40 border-zinc-700/60 !text-white"
                            : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                    }`}
                >
                    <span className="font-medium text-[14px] tracking-tight text-white">Свой вариант</span>
                </Radio>
            </Radio.Group>

            {/* Мягко выезжающий слайдер */}
            <div className="w-full flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {radioValue === 6 && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -6, height: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 32 }}
                            className="overflow-hidden w-full px-0.5"
                        >
                            <div className="flex flex-col gap-3.5 p-4 bg-zinc-950/40 rounded-xl border border-zinc-800/50 backdrop-blur-md">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Диапазон</span>
                                    <span className="text-lg font-bold tracking-tight text-white tabular-nums">
                                        {sliderValue.toLocaleString("ru-RU")} ₽
                                    </span>
                                </div>

                                <div className="relative w-full flex items-center group py-1">
                                    <input
                                        type="range"
                                        min={500000}
                                        max={10000000}
                                        step={10000}
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(Number(e.target.value))}
                                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white outline-none
                                        [&::-webkit-slider-runnable-track]:bg-zinc-800 [&::-webkit-slider-runnable-track]:rounded-lg
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:w-4.5
                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
                                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                                        [&::-webkit-slider-thumb]:hover:scale-110 active:[&::-webkit-slider-thumb]:scale-95"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-medium text-zinc-600 tracking-tight">
                                    <span>500к</span>
                                    <span>5млн</span>
                                    <span>10млн</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Итоговый бейдж снизу */}
            <div className="pt-3 flex items-center justify-between px-0.5 border-t border-zinc-800/60 mt-1">
                <span className="text-xs font-medium text-zinc-500">Выбрано к сохранению</span>
                <span className="text-base font-bold tracking-tight text-emerald-400 tabular-nums">
                    {finalBudget ? finalBudget.toLocaleString("ru-RU") : 0} ₽
                </span>
            </div>
        </div>
    );
};

export default BudgetSelector;
