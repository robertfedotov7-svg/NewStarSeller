"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/app/favicon.ico";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { AuthButtons, ProfileDropdown } from "@/components/ui/Header/LoginSection"

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isHomePage = mounted && pathname === "/";

    if (!mounted) {
        return (
            <header className="fixed top-0 left-0 z-50 flex justify-center items-center w-full opacity-0">
                <div className="flex items-center justify-between w-full max-w-7xl p-5 mx-auto">
                    <Image src={Logo} height="35" alt="Logo" />
                </div>
            </header>
        );
    }

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 z-50 flex justify-center items-center w-full pointer-events-none select-none"
        >
            <div className="flex items-center justify-between w-full max-w-7xl p-5 mx-auto relative">

                {/* Логотип */}
                <Image
                    onClick={() => router.push("/")}
                    src={Logo}
                    height="35"
                    alt="Logo"
                    className="transition duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto filter invert brightness-100"
                />

                {/* Правая навигационная зона */}
                <div className="flex items-center gap-5 pointer-events-auto">
                    {isHomePage ? <AuthButtons /> : <ProfileDropdown />}
                </div>

            </div>
        </motion.header>
    );
};

export default Header;
