"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SpotlightBackground = () => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spotlightX = useMotionValue(0);
    const spotlightY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
    const springSpotX = useSpring(spotlightX, { stiffness: 40, damping: 24 });
    const springSpotY = useSpring(spotlightY, { stiffness: 40, damping: 24 });

    const maskImage = useTransform(
        [springSpotX, springSpotY],
        ([x, y]) => `radial-gradient(
            circle 350px at ${x}px ${y}px, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(0, 0, 0, 0.85) 25%, 
            rgba(0, 0, 0, 0.4) 55%, 
            rgba(0, 0, 0, 0.1) 80%, 
            rgba(0, 0, 0, 0) 100%
        )`
    );

    useEffect(() => {
        if (isMouseOver) return;

        let animationFrameId: number;
        let startTime = performance.now();

        const animateFallback = (time: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const seconds = (time - startTime) / 1000;

            const x = rect.width / 2 + Math.cos(seconds * 0.5) * (rect.width * 0.4);
            const y = rect.height / 2 + Math.sin(seconds * 1.1) * (rect.height * 0.35);

            spotlightX.set(x);
            spotlightY.set(y);
            mouseX.set(Math.cos(seconds * 0.5) * 4);
            mouseY.set(Math.sin(seconds * 0.8) * 4);

            animationFrameId = requestAnimationFrame(animateFallback);
        };

        animationFrameId = requestAnimationFrame(animateFallback);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isMouseOver]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isMouseOver) setIsMouseOver(true);

        const rect = e.currentTarget.getBoundingClientRect();
        spotlightX.set(e.clientX - rect.left);
        spotlightY.set(e.clientY - rect.top);

        const xOffset = ((e.clientX - rect.left) / rect.width) - 0.5;
        const yOffset = ((e.clientY - rect.top) / rect.height) - 0.5;

        mouseX.set(xOffset * 25);
        mouseY.set(yOffset * 25);
    };

    const handleMouseLeaveSection = () => {
        setIsMouseOver(false);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveSection}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0"
        >
            {/* СЛОЙ 1: БАЗОВЫЙ ТЕМНЫЙ ФОН */}
            <motion.div
                className="absolute inset-[-40px] h-[calc(100%+80px)] w-[calc(100%+80px)] pointer-events-none"
                style={{ x: springX, y: springY }}
            >
                <img
                    src="/testdashboard.png"
                    alt="Dashboard background hidden"
                    className="w-full h-full object-cover object-center block opacity-10 filter blur-[6px]"
                />
            </motion.div>

            {/* СЛОЙ 2: ВЕРХНИЙ ПРОЯВЛЯЮЩИЙСЯ СЛОЙ С МАСКОЙ */}
            <motion.div
                className="absolute inset-[-40px] h-[calc(100%+80px)] w-[calc(100%+80px)] pointer-events-none"
                style={{
                    x: springX,
                    y: springY,
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage
                }}
            >
                <img
                    src="/testdashboard.png"
                    alt="Dashboard background revealed"
                    className="w-full h-full object-cover object-center block opacity-65"
                />
            </motion.div>
        </div>
    );
};

export default SpotlightBackground;
