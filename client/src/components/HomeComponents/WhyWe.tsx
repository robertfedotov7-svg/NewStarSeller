'use client';

import WhyWeCarusel from "@/components/ui/Carusel/WhyWeCarusel";
import Back from "@/components/ui/Carusel/Back";
import { CaruselContextProvider } from "@/context/CaruselContext";
import { motion } from "framer-motion";

const WhyWe = () => {
    return (
        <CaruselContextProvider>
            <motion.section
                key="WhyWe"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
                id="whysection"
                className="relative w-full h-[80vh] flex flex-col justify-center overflow-hidden bg-black py-16 md:py-0"
            >
                {/* Задний фон (Слой 0) — На мобилках тут отцентрирован весь текст, иконки на бэкграунде */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Back />
                </div>

                {/* Контентная зона (Слой 10) */}
                <div className="z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pointer-events-none grid grid-cols-1 md:grid-cols-12 items-center h-full">

                    {/* Левая часть (6 колонок): Оставляем пустой на десктопе, там отображается InfoBack */}
                    <div className="hidden md:block md:col-span-6" />

                    {/*
                      Правая часть (6 колонок): Контейнер карусели.
                      Senior-оптимизация:
                      - hidden: Полностью скрывает карусель на мобильных (экраны < 768px).
                      - md:flex: Включает flex-контейнер обратно на экранах планшетов и ПК.
                    */}
                    <div className="hidden md:flex md:col-span-6 flex-col items-center justify-center gap-8 pointer-events-auto w-full">
                        <WhyWeCarusel />
                    </div>

                </div>
            </motion.section>
        </CaruselContextProvider>
    );
};

export default WhyWe;
