"use client" // Обязательно для Next.js App Router, так как контекст работает только на клиенте
import { ReactNode, useCallback, useEffect, useState, createContext, useContext, useMemo } from "react";

// Интерфейс элемента карусели
export interface CarouselItem {
    id: string;
    text: string;
}

// Данные вынесены наружу, чтобы экспортировать их при необходимости
export const CAROUSEL_ITEMS: CarouselItem[] = [
    { id: "ai-recommendations", text: "AI Рекомендации" },
    { id: "find-suppliers", text: "Найти поставщиков" },
    { id: "sales-analytics", text: "Аналитика продаж" },
];

// Типизация данных контекста
interface CarouselContextType {
    index: number;
    direction: number;
    activeIndex: number;
    activeItem: CarouselItem;
    handleNext: () => void;
    setIndexByPagination: (i: number) => void;
}

// 1. Создаем сам контекст
const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

export function CaruselContextProvider({ children }: { children: ReactNode }) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const activeIndex = (index % CAROUSEL_ITEMS.length + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    const activeItem = CAROUSEL_ITEMS[activeIndex];

    // Шаг вперед
    const handleNext = useCallback(() => {
        setDirection(1);
        setIndex((prev) => prev + 1);
    }, []);

    const handlePrev = useCallback(() => {
        setDirection(1);
        setIndex((prev) => prev - 1);
    }, []);

    // Ручное переключение через точки пагинации (высчитывает правильное направление анимации)
    const setIndexByPagination = useCallback((i: number) => {
        setDirection(i > activeIndex ? 1 : -1);
        setIndex(i);
    }, [activeIndex]);

    // Автоскролл
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [index, handleNext]);

    // 2. Оптимизируем объект value через useMemo, чтобы дочерние компоненты не рендерились зря
    const contextValue = useMemo(() => ({
        index,
        direction,
        activeIndex,
        activeItem,
        handleNext,
        handlePrev,
        setIndexByPagination
    }), [index, direction, activeIndex, activeItem, handleNext, setIndexByPagination]);

    return (
        <CarouselContext.Provider value={contextValue}>
            {children}
        </CarouselContext.Provider>
    );
}

// 3. Кастомный хук для использования данных
export function useCarusel() {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error('useCarusel должен использоваться строго внутри CaruselContextProvider');
    }
    return context;
}
