'use client';
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiRecommendationData } from "@/types/product.data.types";

interface WhyRecomendProps {
    data: AiRecommendationData;
}

interface ChartTheme {
    title: string;
    stroke: string;
    fill: string;
    badgeBg: string;
    badgeText: string;
}

const WhyRecomend: React.FC<WhyRecomendProps> = ({ data }) => {
    const factors = data?.factors || [];
    const totalAxes = factors.length;

    // Состояние для хранения индекса активной точки при наведении
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const CENTER = 50;
    const RADIUS = 35;

    // 1. Определение темы на основе общего скора
    const theme = useMemo<ChartTheme>(() => {
        const score = data?.score;
        if (score === undefined || score === null) {
            return {
                title: "Статус неизвестен",
                stroke: "#a1a1aa",
                fill: "rgba(161, 161, 170, 0.15)",
                badgeBg: "rgba(161, 161, 170, 0.1)",
                badgeText: "text-zinc-400"
            };
        }
        if (score >= 80) {
            return {
                title: "Прекрасное время для закупки",
                stroke: "#00d492",
                fill: "rgba(0, 212, 146, 0.15)",
                badgeBg: "rgba(0, 188, 125, 0.15)",
                badgeText: "text-[#00d492]"
            };
        }
        if (score > 60) {
            return {
                title: "Сейчас не лучшее время",
                stroke: "#ffb900",
                fill: "rgba(255, 185, 0, 0.15)",
                badgeBg: "rgba(254, 154, 0, 0.15)",
                badgeText: "text-[#ffb900]"
            };
        }
        return {
            title: "Точно плохо для первого продукта",
            stroke: "#ff637b",
            fill: "rgba(255, 99, 123, 0.15)",
            badgeBg: "rgba(255, 32, 86, 0.15)",
            badgeText: "text-[#ff637b]"
        };
    }, [data?.score]);

    // 2. Математический расчет координат точек
    const chartData = useMemo(() => {
        if (totalAxes === 0) return { polygonPoints: "", gridLines: [], labels: [], dots: [] };

        // Точки для полигона данных и вершин
        const dots = factors.map((factor, i) => {
            const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
            const ratio = factor.maxScore > 0 ? factor.score / factor.maxScore : 0;
            const currentRadius = RADIUS * ratio;

            const x = CENTER + currentRadius * Math.cos(angle);
            const y = CENTER + currentRadius * Math.sin(angle);
            return { x, y, index: i };
        });

        const points = dots.map(d => `${d.x},${d.y}`).join(" ");

        const gridLevels = [0.25, 0.5, 0.75, 1];
        const gridLines = gridLevels.map((level) => {
            return factors.map((_, i) => {
                const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
                const currentRadius = RADIUS * level;
                const x = CENTER + currentRadius * Math.cos(angle);
                const y = CENTER + currentRadius * Math.sin(angle);
                return `${x},${y}`;
            }).join(" ");
        });

        const labels = factors.map((factor, i) => {
            const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
            const labelRadius = RADIUS + 8;
            const x = CENTER + labelRadius * Math.cos(angle);
            const y = CENTER + labelRadius * Math.sin(angle);

            let textAnchor = "middle";
            if (Math.cos(angle) > 0.1) textAnchor = "start";
            if (Math.cos(angle) < -0.1) textAnchor = "end";

            return {
                x,
                y,
                textAnchor,
                name: factor.name,
                displayScore: `${factor.score}/${factor.maxScore}`
            };
        });

        return { polygonPoints: points, gridLines, labels, dots };
    }, [factors, totalAxes]);

    if (totalAxes < 3) {
        return (
            <div className="p-6 bg-zinc-950/40 border border-zinc-900/60 rounded-2xl text-center text-zinc-500 text-sm">
                Недостаточно метрик для построения Radar Chart (требуется минимум 3).
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col justify-start gap-6 bg-gradient-to-b from-zinc-950/40 to-zinc-950/20 border border-zinc-900/60 rounded-2xl text-left backdrop-blur-md antialiased select-none w-full relative">

            {/* СИСТЕМНАЯ ШАПКА */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                        Analysis Matrix
                    </span>
                    <span className="text-[13px] font-bold text-zinc-200 truncate tracking-tight">
                        {theme.title}
                    </span>
                </div>
                <span
                    className={`text-[10px] font-bold uppercase tracking-wider bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-900/80 shrink-0 ${theme.badgeText}`}
                    style={{ backgroundColor: theme.badgeBg }}
                >
                    Score: {data?.score ?? 0}
                </span>
            </div>

            {/* КОНТЕЙНЕР ДИАГРАММЫ (relative для позиционирования подсказки) */}
            <div className="relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center my-4 group/chart">
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full overflow-visible"
                    style={{ filter: `drop-shadow(0 0 20px ${theme.fill})` }}
                >
                    {/* Паутина */}
                    {chartData.gridLines.map((points, idx) => (
                        <polygon
                            key={`grid-${idx}`}
                            points={points}
                            fill="none"
                            className="stroke-zinc-800/40"
                            strokeWidth="0.25"
                            strokeDasharray={idx === 3 ? "0" : "1,1"}
                        />
                    ))}

                    {/* Оси */}
                    {factors.map((_, i) => {
                        const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
                        return (
                            <line
                                key={`axis-${i}`}
                                x1={CENTER}
                                y1={CENTER}
                                x2={CENTER + RADIUS * Math.cos(angle)}
                                y2={CENTER + RADIUS * Math.sin(angle)}
                                className="stroke-zinc-900/40"
                                strokeWidth="0.3"
                            />
                        );
                    })}

                    {/* Полигон данных */}
                    <motion.polygon
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        points={chartData.polygonPoints}
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                        style={{
                            fill: theme.fill,
                            stroke: theme.stroke
                        }}
                    />

                    {/* Интерактивные точки с увеличенной невидимой зоной для легкого наведения (UX) */}
                    {chartData.dots.map((dot) => {
                        const isHovered = hoveredIndex === dot.index;
                        return (
                            <g
                                key={`dot-group-${dot.index}`}
                                onMouseEnter={() => setHoveredIndex(dot.index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-crosshair"
                            >
                                {/* Реальная видимая точка */}
                                <circle
                                    cx={dot.x}
                                    cy={dot.y}
                                    r={isHovered ? "1.8" : "1.1"}
                                    className="transition-all duration-200 fill-zinc-950"
                                    strokeWidth={isHovered ? "1.0" : "0.6"}
                                    style={{ stroke: theme.stroke }}
                                />
                                {/* Невидимая увеличенная область, чтобы пользователю было легко попасть мышкой */}
                                <circle
                                    cx={dot.x}
                                    cy={dot.y}
                                    r="5"
                                    fill="transparent"
                                />
                            </g>
                        );
                    })}

                    {/* Подписи осей */}
                    {chartData.labels.map((label, i) => {
                        const isDimmed = hoveredIndex !== null && hoveredIndex !== i;
                        return (
                            <g
                                key={`label-${i}`}
                                className="transition-opacity duration-200"
                                style={{ opacity: isDimmed ? 0.3 : 1 }}
                            >
                                <text
                                    x={label.x}
                                    y={label.y - 1}
                                    textAnchor={label.textAnchor}
                                    className="fill-zinc-400 font-sans font-semibold tracking-tight text-[3.6px]"
                                >
                                    {label.name}
                                </text>
                                <text
                                    x={label.x}
                                    y={label.y + 2.8}
                                    textAnchor={label.textAnchor}
                                    className="fill-zinc-600 font-mono font-medium text-[2.8px]"
                                >
                                    {label.displayScore} pts
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* УМНЫЙ ТУЛТИП (ПОДСКАЗКА) поверх SVG */}
                <AnimatePresence>
                    {hoveredIndex !== null && factors[hoveredIndex] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute pointer-events-none z-30 max-w-[220px] p-3 rounded-xl bg-zinc-950/95 border border-zinc-800/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-left flex flex-col gap-1"
                            // Математически вычисляем позицию тултипа относительно контейнера в процентах
                            style={{
                                left: `${chartData.dots[hoveredIndex].x}%`,
                                top: `${chartData.dots[hoveredIndex].y}%`,
                                transform: "translate(-50%, -125%)", // Сдвигаем тултип строго по центру выше самой точки
                            }}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[11px] font-bold text-zinc-200 truncate">
                                    {factors[hoveredIndex].name}
                                </span>
                                <span
                                    className="text-[11px] font-mono font-bold shrink-0"
                                    style={{ color: theme.stroke }}
                                >
                                    {factors[hoveredIndex].score} pts
                                </span>
                            </div>

                            {factors[hoveredIndex].reason ? (
                                <p className="text-[10px] font-medium text-zinc-400 leading-normal border-t border-zinc-900 pt-1.5 mt-0.5">
                                    {factors[hoveredIndex].reason}
                                </p>
                            ) : (
                                <p className="text-[10px] font-medium text-zinc-600 italic border-t border-zinc-900 pt-1.5 mt-0.5">
                                    Нет подробного описания
                                </p>
                            )}

                            {/* Маленький декоративный стрелочка-указатель снизу тултипа */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[4px] w-2 h-2 bg-zinc-950 border-r border-b border-zinc-800/80 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WhyRecomend;

