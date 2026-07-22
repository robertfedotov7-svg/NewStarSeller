'use client';
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useAiGenerate } from "@/context/AiGenerateContext";
import { AiRecommendationData, TextToken } from "@/types/product.data.types";

interface AITextProps {
    data: AiRecommendationData;
}

const AIText: React.FC<AITextProps> = ({ data }) => {
    const {
        status,
        setStatus,
        activeTokenIndex,
        setActiveTokenIndex,
        visibleCharCount,
        setVisibleCharCount
    } = useAiGenerate();

    // В качестве уникального идентификатора товара используем его имя
    const productId = data?.productName || "";
    const rawVerdictText = data?.recommendation?.verdict || "";

    // Локальный стейт-память для хранения имен товаров, которые уже были один раз напечатаны
    const [visitedProducts, setVisitedProducts] = useState<string[]>([]);

    // 1. Парсер строки в массив токенов (Lexer)
    const tokens = useMemo<TextToken[]>(() => {
        if (!rawVerdictText) return [];
        const regex = /(\*[^*]+?\*|\{[^}]+?\})/g;
        const parts = rawVerdictText.split(regex);

        return parts
            .map((part) => {
                if (part.startsWith('*') && part.endsWith('*')) {
                    return { type: 'bold' as const, content: part.slice(1, -1) };
                }
                if (part.startsWith('{') && part.endsWith('}')) {
                    return { type: 'badge' as const, content: part.slice(1, -1) };
                }
                return { type: 'text' as const, content: part };
            })
            .filter((token) => token.content.length > 0);
    }, [rawVerdictText]);

    // 2. ИСПРАВЛЕНО: Умное переключение состояний при смене товара (Apple Memory Layer)
    useEffect(() => {
        if (!productId) return;

        // Проверяем, заходили ли мы уже на этот товар ранее
        const hasVisited = visitedProducts.includes(productId);

        if (hasVisited) {
            // Если товар уже сгенерирован однажды — открываем его МГНОВЕННО на весь экран
            setStatus('ready');
            // Выставляем индексы на максимум, чтобы отрендерить весь текст
            setActiveTokenIndex(tokens.length > 0 ? tokens.length - 1 : 0);
            setVisibleCharCount(tokens.length > 0 ? tokens[tokens.length - 1].content.length : 0);
        } else {
            // Если это первый визит — сбрасываем в ноль и запускаем красивый ChatGPT Typewriter
            setActiveTokenIndex(0);
            setVisibleCharCount(0);

            // Запускаем печать, только если мы переключились на этот товар с готового экрана
            if (status === 'ready') {
                setStatus('typing');
            }
        }
    }, [productId, tokens.length]); // Следим за изменением ID товара

    // 3. Фиксация завершения печати в память
    useEffect(() => {
        // Как только статус становится 'ready', заносим текущий товар в список "просмотренных"
        if (status === 'ready' && productId && !visitedProducts.includes(productId)) {
            setVisitedProducts((prev) => [...prev, productId]);
        }
    }, [status, productId, visitedProducts]);

    // 4. Эффект посимвольной печати (ChatGPT Typewriter)
    useEffect(() => {
        if (status !== 'typing' || tokens.length === 0) return;

        const currentToken = tokens[activeTokenIndex];

        // Защитный заслон от рассинхронизации индексов
        if (!currentToken) {
            setStatus('ready');
            return;
        }

        const typingInterval = setInterval(() => {
            if (visibleCharCount < currentToken.content.length) {
                setVisibleCharCount((prev) => prev + 1);
            } else {
                if (activeTokenIndex < tokens.length - 1) {
                    setActiveTokenIndex((prev) => prev + 1);
                    setVisibleCharCount(0);
                } else {
                    setStatus('ready');
                }
                clearInterval(typingInterval);
            }
        }, 15);

        return () => clearInterval(typingInterval);
    }, [status, activeTokenIndex, visibleCharCount, tokens, setStatus, setActiveTokenIndex, setVisibleCharCount]);

    return (
        <>
            {(status === 'typing' || status === 'ready') && (
                <p className="text-base font-medium text-zinc-300 leading-relaxed tracking-tight select-text w-full">
                    {tokens.map((token, index) => {
                        // Не рендерим скрытые будущие токены во время анимации
                        if (index > activeTokenIndex) return null;

                        const isCurrent = index === activeTokenIndex;
                        const textToShow = isCurrent
                            ? token.content.slice(0, visibleCharCount)
                            : token.content;

                        return (
                            <span key={index}>
                                {token.type === "text" && textToShow}
                                {token.type === "bold" && (
                                    <span className="font-extrabold text-white tracking-tight">
                                        {textToShow}
                                    </span>
                                )}
                                {token.type === "badge" && textToShow && (
                                    <span className="inline-block mx-1 px-2.5 py-0.5 text-xs font-bold rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm transition-all">
                                        {textToShow}
                                    </span>
                                )}
                            </span>
                        );
                    })}

                    {/* Мигающий курсор ИИ (Каретка) — отображается только в момент живой печати */}
                    {status === 'typing' && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                            className="inline-block w-1.5 h-4.5 bg-blue-400 ml-1 translate-y-0.5 rounded-sm"
                        />
                    )}
                </p>
            )}
        </>
    );
};

export default AIText;
