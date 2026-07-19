"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { useCarusel, CAROUSEL_ITEMS } from "@/context/CaruselContext";

const WhyWeCarusel = () => {
    const { index, direction, handleNext, activeItem, handlePrev, activeIndex } = useCarusel();

    // Анимационные варианты с физикой смещения
    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? "30px" : "-30px",
            scale: 0.96,
            opacity: 0,
        }),
        center: {
            x: 0,
            scale: 1,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir < 0 ? "30px" : "-30px",
            scale: 0.96,
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-full select-none px-2">

            {/*
              Область слайдера:
              - h-32 на мобильных дает отличный запас для переноса длинного текста на 2 строки, h-24 на md.
            */}
            <div className="relative w-full max-w-xl h-32 flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                            mass: 0.8
                        }}
                        onClick={handleNext}
                        className="absolute w-full flex items-center justify-center text-center cursor-pointer px-4 group antialiased"
                    >
                        {/*
                          ИСПРАВЛЕНО: Убран min-w-xl и h-full, которые ломали верстку.
                          Добавлен w-full для идеальной резиновости.
                        */}
                        <h3 className="text-white w-full text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-zinc-300 text-balance leading-tight select-none">
                            {activeItem.text}
                        </h3>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Точки пагинации */}
            <div className="flex gap-1 mt-4 justify-center items-center">
                {CAROUSEL_ITEMS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePrev(i)}
                        className="w-7 h-7 flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full transition-all active:scale-90"
                        aria-label={`Go to slide ${i + 1}`}
                    >
                        <motion.div
                            animate={{
                                width: i === activeIndex ? 20 : 6,
                                backgroundColor: i === activeIndex ? "#ffffff" : "#27272a"
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                            }}
                            className="h-1 rounded-full"
                        />
                    </button>
                ))}
            </div>

        </div>
    );
};

export default WhyWeCarusel;
