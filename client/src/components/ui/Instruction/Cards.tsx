'use client';

import {motion} from "framer-motion";
import {useState} from "react";

const steps = [
    {
        id: 1,
        number: '01',
        tag: 'Бюджетирование',
        title: 'Введите ваш бюджет',
        description: 'Алгоритм мгновенно подберет оптимальный сплит каналов под любую сумму без слива средств.',
    },
    {
        id: 2,
        number: '02',
        tag: 'Аналитика ИИ',
        title: 'Получите рекомендации',
        description: 'Нейросеть проанализирует терабайты рыночных связок и выдаст готовый пошаговый план.',
    },
    {
        id: 3,
        number: '03',
        tag: 'Масштабирование',
        title: 'Начните продавать',
        description: 'Интегрируйте готовые офферы в один клик и отслеживайте экспоненциальный рост прибыли.',
    },
];

const Cards = () => {
    const [budgetValue, setBudgetValue] = useState<number>(2500);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {steps.map((step, index) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 15,
                        delay: index * 0.15
                    }}
                    className="group relative flex flex-col justify-between h-[520px] bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 border border-zinc-900 rounded-3xl p-8 hover:border-zinc-800/80 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.1)] transition-all duration-500 overflow-hidden backdrop-blur-xl"
                >
                    {/* Верхняя интерактивная зона (Микро-демо) */}
                    <div className="w-full h-48 rounded-2xl bg-zinc-950/80 border border-zinc-900/60 p-5 flex flex-col justify-center relative overflow-hidden group-hover:bg-black/60 transition-colors duration-500">

                        {/* ШАГ 1: Живой слайдер бюджета */}
                        {step.id === 1 && (
                            <div className="space-y-4 w-full">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-zinc-500 font-mono">LIVE_BUDGET</span>
                                    <span className="text-sm font-bold font-mono bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                                                    ${budgetValue}
                                                </span>
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="10000"
                                    step="500"
                                    value={budgetValue}
                                    onChange={(e) => setBudgetValue(Number(e.target.value))}
                                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                                    <span>MIN: $500</span>
                                    <span>MAX: $10k</span>
                                </div>
                            </div>
                        )}

                        {/* ШАГ 2: Генерация тегов искусственным интеллектом */}
                        {step.id === 2 && (
                            <div className="flex flex-wrap gap-2 justify-center items-center">
                                {['ROI +240%', 'Target: EU/US', 'E-commerce', 'Crypto Split', 'CPA Оптимизация'].map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ scale: 0.9, opacity: 0.5 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, delay: i * 0.3 }}
                                        className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border ${
                                            i === 0
                                                ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 font-bold'
                                                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                                        }`}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        )}

                        {/* ШАГ 3: Пульсирующий Dash-график конверсий */}
                        {step.id === 3 && (
                            <div className="flex items-end justify-between h-24 px-4 w-full relative">
                                {[40, 25, 55, 35, 75, 50, 95].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${height}%` }}
                                        transition={{ type: "spring", stiffness: 50, delay: i * 0.1 }}
                                        className={`w-2.5 rounded-t-sm ${
                                            i === 6
                                                ? 'bg-gradient-to-t from-pink-500 to-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                                                : 'bg-zinc-800 group-hover:bg-zinc-700 transition-colors'
                                        }`}
                                    />
                                ))}
                                <div className="absolute top-0 right-4 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                    <span className="text-[10px] font-mono text-emerald-400">ACTIVE_SALES</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Нижняя контентная зона */}
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                                            // {step.tag}
                                        </span>
                            <span className="text-5xl font-black font-mono text-zinc-900 group-hover:text-zinc-800/60 transition-colors duration-500">
                                            {step.number}
                                        </span>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-300">
                            {step.title}
                        </h3>

                        <p className="text-zinc-500 text-sm leading-relaxed font-light group-hover:text-zinc-400 transition-colors duration-300">
                            {step.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default Cards