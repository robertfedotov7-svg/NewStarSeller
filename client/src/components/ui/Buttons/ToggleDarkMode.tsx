'use client';
import React from 'react';
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Switch: React.FC = () => {
    const { darkMode, setDarkMode } = useApp();

    return (
        <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            // Анимируем фоновый цвет самого переключателя
            className={`relative w-12 h-6 rounded-full p-0.5 cursor-pointer flex items-center transition-colors duration-300 outline-none select-none shadow-md ${
                darkMode ? "bg-zinc-800 shadow-zinc-950" : "bg-zinc-200 shadow-zinc-300"
            }`}
        >
            {/* Кружок-тогл, который плавно перекатывается благодаря свойству layout */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                // Направление флекса определяет положение кружка: слева (солнце) или справа (луна)
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs overflow-hidden shadow-sm ${
                    darkMode ? "bg-zinc-950 ml-auto" : "bg-white mr-auto"
                }`}
            >
                {/* Анимация смены иконки внутри кружка */}
                <AnimatePresence mode="wait" initial={false}>
                    {darkMode ? (
                        <motion.span
                            key="moon"
                            initial={{ y: 10, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -10, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.15 }}
                        >
                            🌑
                        </motion.span>
                    ) : (
                        <motion.span
                            key="sun"
                            initial={{ y: 10, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -10, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.15 }}
                        >
                            ☀️
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    );
};

export default Switch;
