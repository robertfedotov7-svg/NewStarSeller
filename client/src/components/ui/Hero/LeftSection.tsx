"use client"
import {motion} from "framer-motion";
import React from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

const LeftSection = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    const handleAuthAction = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        if (loading) return;

        // Если пользователь залогинен — клик по кнопкам на главном экране сразу ведет в воркспейс
        if (user) {
            router.push(`/user/${user.uid}`);
        } else {
            // Если гость — плавно скроллим к форме
            const authSection = document.getElementById("auth-section");
            if (authSection) {
                authSection.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                router.push("/#auth-section");
            }
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, x: "-50px" }} // Заменено с -100% на пиксели для стабильного SSR
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "50px" }}
            transition={{delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="z-10 relative max-w-xl"
        >
            <h1 className="text-white text-7xl md:text-9xl font-bold tracking-tight">AI</h1>
            <h1 className="text-zinc-400 text-4xl md:text-6xl font-medium mt-2">Business Helper</h1>
            <div className="flex items-center justify-start mt-8 gap-4 z-20 relative">
                <motion.a
                    href="#whysection"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="bg-white text-black font-medium px-6 py-3 rounded-full transition-colors duration-300 hover:bg-zinc-200 active:scale-95 cursor-pointer shadow-lg"
                >
                    Start now
                </motion.a>

                <motion.button
                    onClick={handleAuthAction}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="bg-transparent border border-zinc-700 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 hover:bg-white/10 active:scale-95 cursor-pointer"
                >
                    Log In
                </motion.button>
            </div>
        </motion.div>
    )
}
export default LeftSection;