"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative text-white w-screen h-screen flex flex-col justify-center items-center overflow-hidden "
        >
            {/* Стили для анимации блика на кнопке */}
            <style jsx global>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>

            {/* Анимированный текст 404 */}
            <motion.h1
                animate={{
                    y: ["0px", "-25px", "0px", "-30px"],
                    rotate: [-2, 2, -2],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="absolute mb-20 flex flex-col justify-center items-center text-[18vw] md:text-[28rem] font-black tracking-tighter select-none"
            >
                404
            </motion.h1>
            {/* Волновой блок с градиентом и размытием */}
            <div className="z-20 absolute bottom-0 w-screen h-[55vh] flex flex-col justify-end pb-16 items-center">
                <svg className="absolute w-0 h-0" aria-hidden="true">
                    <defs>
                        <clipPath id="smooth-wave-high" clipPathUnits="objectBoundingBox">
                            <path d="M 0,0.08
                                     C 0.05,0.20 0.08,0.04 0.12,0.04
                                     C 0.16,0.04 0.20,0.24 0.25,0.12
                                     C 0.30,0.04 0.34,0.08 0.38,0.20
                                     C 0.43,0.32 0.48,0.08 0.52,0.08
                                     C 0.57,0.08 0.61,0.16 0.65,0.04
                                     C 0.70,-0.08 0.74,0.20 0.79,0.16
                                     C 0.84,0.12 0.88,0.04 0.92,0.12
                                     C 0.96,0.20 0.98,0.08 1,0.08
                                     L 1,1 L 0,1 Z" />
                        </clipPath>
                    </defs>
                </svg>

                <div
                    className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent backdrop-blur-lg"
                    style={{ clipPath: "url(#smooth-wave-high)" }}
                />

                {/* Текст и кнопка поверх волны */}
                <div className="relative z-30 flex flex-col items-center gap-6 text-center px-4 pb-36">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <p className="text-zinc-400 text-sm md:text-base tracking-widest uppercase mb-1">Упс! Страница потерялась</p>
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white">Вы забрели куда-то не туда</h2>
                    </motion.div>

                    {/* Интерактивная кнопка */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="/"
                            className="relative group inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-full font-medium tracking-wide text-sm bg-white text-black transition-all duration-300 hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] pointer-events-auto"
                        >
                            {/* Блик, использующий локальный CSS класс */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />

                            Вернуться на главную
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
