"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import AvatarModal from "@/components/ui/Modals/AvatarModal";
import { useRouter } from "next/navigation";

const ProfileDropdown = () => {
    const { user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user || !user.uid) return null;

    return (
        <div className="relative flex items-center z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative w-[48px] h-[48px] rounded-full border border-zinc-800 bg-zinc-900 overflow-hidden cursor-pointer focus:outline-none hover:border-zinc-500 transition-colors duration-300 shadow-md group active:scale-95"
            >
                <img
                    src={user.photoURL || `https://ui-avatars.com{encodeURIComponent(user.displayName || 'User')}&background=18181b&color=fff`}
                    alt="User Avatar"
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
            </button>

            <AnimatePresence>
                {/* Внутри AvatarModal класс z-100 обязательно должен быть заменен на z-50 или удален */}
                {isDropdownOpen && <AvatarModal/>}
            </AnimatePresence>
        </div>
    );
};


const AuthButtons = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    const handleAuthAction = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (loading) return;

        if (user) {
            router.push(`/user/${user.uid}`);
        } else {
            const authSection = document.getElementById("auth-section");
            if (authSection) {
                authSection.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                router.push("/#auth-section");
            }
        }
    };

    return (
        <div className="flex gap-5">
            <button
                onClick={handleAuthAction}
                className="text-xs uppercase tracking-widest text-zinc-400 border border-zinc-800 bg-zinc-950/40 backdrop-blur-md px-5 py-2.5 rounded-full transition-all duration-300 hover:text-white hover:border-zinc-600 active:scale-95 cursor-pointer font-medium"
            >
                Log In
            </button>
            <a
                href="#auth-section"
                className="text-xs items-center flex uppercase tracking-widest bg-white text-black px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-zinc-200 active:scale-95 cursor-pointer font-bold shadow-sm"
            >
                Sign Up
            </a>
        </div>
    );
};

export { AuthButtons, ProfileDropdown };
