'use client';

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { useRouter, usePathname } from "next/navigation"; // Импортируем usePathname
import { useCollapse } from "@/context/CollapseContext";
import { motion } from "framer-motion";

interface NavItemProps {
    children: React.ReactNode;
    link: string;
}

const NavItem: React.FC<NavItemProps> = ({ children, link }) => {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname(); // Считывает текущий путь, например: "/user/uid/recommendations"
    const { collapse } = useCollapse();

    // Достаем методы из глобального контекста приложения
    const { setActivePage } = useApp();

    const isActive = link === ""
        ? pathname === `/user/${user?.uid}`
        : pathname?.endsWith(`/${link}`) || false;

    // Автоматически синхронизируем контекст activePage с реальным URL при первой загрузке (F5)
    useEffect(() => {
        if (isActive) {
            setActivePage(link);
        }
    }, [isActive, link, setActivePage]);

    const handleClick = () => {
        if (!isActive) {
            // Если link пустой, ведем на корень /user/id, иначе добавляем вложенный роут
            const targetUrl = link === "" ? `/user/${user?.uid}` : `/user/${user?.uid}/${link}`;
            router.push(targetUrl);
            setActivePage(link);
        }
    };

    return (
        <motion.a
            onClick={handleClick}
            animate={{
                backgroundColor: isActive ? "rgb(82, 82, 91)" : "rgba(0, 0, 0, 0)",
            }}
            transition={{
                backgroundColor: {
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut"
                },
            }}
            className={`flex w-full items-center p-3 text-white font-bold cursor-pointer select-none rounded-full border border-transparent gap-4 transition ${
                collapse ? "justify-center" : "justify-start"
            }
            ${isActive ? "hover:border-zinc-100" : "hover:border-zinc-500"}
            `}
        >
            {children}
        </motion.a>
    );
};

export default NavItem;
