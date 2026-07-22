'use client';
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {CircleQuestionMark, LayoutDashboard, MoonStar, PackageSearch, PanelLeftClose} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Subscription from "@/components/ui/Subscription";
import {useApp} from "@/context/AppContext";
import NavItemModal from "@/components/ui/Aside/NavItemModal";
import Switch from "@/components/ui/Buttons/ToggleDarkMode";

const NavItems = [
    {
        title: "Dashboard",
        link: "",
        icon: <LayoutDashboard />,
    },
    {
        title: "Opportunities",
        link: "opportunities",
        icon: <PackageSearch />
    }
]

const ModalSideBar = () => {
    const router = useRouter();
    const { user } = useAuth();

    const {darkMode, setDarkMode} = useApp();
    const handleChange = () => {
        setDarkMode(!darkMode);
    }

    // Извлекаем состояние из контекста.
    // Предположим, что collapse === true означает, что мобильное меню закрыто, а false — открыто.
    const { openModalAside, setOpenModalAside } = useApp();

    return (
        /* AnimatePresence следит за плавным монтированием и размонтированием */
        <AnimatePresence>
            {openModalAside && (
                <>
                    {/* 1. ПОДЛОЖКА (BACKDROP) — затемнение фона с размытием в стиле Apple */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenModalAside(false)} // Клик мимо сайдбара закрывает его
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-45"
                    />

                    {/* 2. САМА ШТОРКА (МОДАЛЬНЫЙ САЙДБАР) */}
                    <motion.aside
                        // Выезжает строго слева направо (по координате X)
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        // Плавная и отзывчивая пружина Apple для мобильных интерфейсов
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        /*
                            ИСПРАВЛЕНО:
                            - fixed top-0 left-0: жестко крепим к левому краю во всю высоту экрана.
                            - max-w-[280px]: задаем фиксированную адаптивную ширину для модалки.
                            - z-50: поднимаем над подложкой и всем контентом сайта.
                        */
                        className="fixed top-0 left-0 h-screen w-full max-w-[280px] flex flex-col items-center justify-between overflow-hidden bg-zinc-950 border-r border-zinc-900 p-4 z-50 shadow-2xl shadow-black/80 antialiased select-none"
                    >
                        <div className="flex flex-col w-full h-full">
                            {/* Хедер модального меню */}
                            <header className="flex w-full items-center justify-between pb-4">
                                <Image
                                    onClick={() => {
                                        router.push(`/user/${user?.uid}/`);
                                        setOpenModalAside(false); // Закрываем шторку при переходе
                                    }}
                                    src="/logo.ico"
                                    width={44} // Числовое значение вместо строки для TS
                                    height={44}
                                    alt="Logo"
                                    className="rounded-full transition duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
                                />

                                {/* Кнопка закрытия модалки */}
                                <button
                                    onClick={() => setOpenModalAside(false)}
                                    className="flex items-center justify-center text-zinc-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-zinc-900 active:scale-95"
                                >
                                    <PanelLeftClose height={28} width={28} />
                                </button>
                            </header>

                            {/* Навигация */}
                            <nav className="flex flex-col justify-between w-full h-full p-3">
                                <div className="flex flex-col w-full gap-2">
                                    {NavItems.map((item) => (
                                        <NavItemModal key={item.link} link={item.link}>
                                            {item.icon}
                                            <h2>{item.title}</h2>
                                        </NavItemModal>
                                    ))}
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex w-full  p-3 rounded-full text-zinc-400 font-bold gap-4 transition hover:text-white">
                                        <CircleQuestionMark />
                                        <h2>Help & information</h2>
                                    </div>
                                    <div
                                        onClick={handleChange}
                                        className={`flex w-full items-center justify-start  p-3 rounded-full font-bold gap-4 transition ${darkMode ? "text-white" : "text-zinc-400"}`}>
                                        <div className="transition hover:scale-110 active:scale-95">
                                            <MoonStar />
                                        </div>
                                        <div
                                            className="flex w-full items-center justify-between transition hover:text-white">
                                            <h2>Dark Mode</h2>
                                            <Switch/>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>

                        {/* Блок подписки */}
                        <div className="w-full mt-auto">
                            <Subscription />
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default ModalSideBar;
