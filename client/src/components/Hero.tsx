import React from "react";
import RightSection from "@/components/ui/Hero/RightSection";
import LeftSection from "@/components/ui/Hero/LeftSection";
import SpotlightBackground from "@/components/ui/Hero/SpotlightBackground"; // Импортируем новый фон

const Hero = () => {
    return (
        <section className="relative pl-36 md:px-48 w-full h-screen bg-neutral-950 flex items-center justify-between overflow-hidden select-none">

            {/* ИНТЕРАКТИВНЫЙ ФОН (Вся логика теперь внутри) */}
            <SpotlightBackground />

            {/* Градиентные оверлеи поверх фона */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none z-10" />
            <div className="absolute w-screen h-36 left-0 bottom-0 bg-gradient-to-t from-black to-transparent z-10" />

            {/* КОНТЕНТНЫЕ БЛОКИ */}
            <LeftSection />
            <RightSection />

        </section>
    );
};

export default Hero;
