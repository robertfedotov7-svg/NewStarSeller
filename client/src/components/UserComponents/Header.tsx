'use client';
import React from "react";
import { ProfileDropdown } from "@/components/ui/Header/LoginSection";
import { Bell, MessageSquareText, Search } from "lucide-react";
import Logo from "@/components/ui/Logo";
import {useApp} from "@/context/AppContext";
import OpenModal from "@/components/ui/Buttons/OpenModal";

const Header = () => {
    const { hidden } = useApp()
    return (
        /* 
            ИСПРАВЛЕНО: 
            1. Изменили px-20 на адаптивные отступы: p-4 на мобилках, md:px-10 на планшетах, lg:px-16 на десктопах.
            2. Добавили border-b border-zinc-800/40 и backdrop-blur для премиального стеклянного эффекта Apple.
        */
        // В файле Header.jsx убедитесь, что тег выглядит так:
        <header className="relative z-50 w-full p-4 md:px-10 lg:px-16 flex items-center justify-between gap-4 border-b border-zinc-900/60 bg-zinc-950/20 backdrop-blur-md antialiased select-none">
        {hidden ? (
                <>
                    <Logo/>
                    <OpenModal/>
                </>
            ) : ""}
            {/* Контейнер поиска */}
            <div className="relative w-full max-w-[280px] sm:max-w-sm flex items-center group">
                {/* Лупа внутри инпута — классика нативных интерфейсов */}
                <Search className="absolute left-4 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-400 transition-colors pointer-events-none" />

                <input
                    type="text"
                    placeholder="Поиск"
                    /* 
                        ИСПРАВЛЕНО:
                        1. Добавили pl-11, чтобы текст не накладывался на иконку лупы.
                        2. Изменили размер текста с text-xl на text-sm (на мобилках) и md:text-base (на десктопе).
                        3. Заменили border-zinc-400 на border-transparent, чтобы при фокусе рамка зажигалась с красивым мягким transition.
                    */
                    className="w-full bg-zinc-900/50 border border-transparent h-10 md:h-11 rounded-xl pl-11 pr-4 text-sm md:text-base text-zinc-100 placeholder-zinc-500 transition-all duration-300 outline-none focus:border-zinc-700/80 focus:bg-black focus:placeholder-zinc-600"
                />
            </div>

            {/* Правая часть: Уведомления, сообщения и профиль */}
            <div className="flex items-center justify-center gap-2 sm:gap-3.5 md:gap-5 shrink-0">

                {/* Кнопка сообщений (Скрывается на самых маленьких экранах меньше 400px, чтобы спасти верстку) */}
                <a className=" flex bg-zinc-900/60 w-10 h-10 md:w-11 md:h-11 text-white items-center justify-center rounded-full transition-all duration-250 hover:scale-105 hover:bg-zinc-800 active:scale-95 border border-zinc-850/40 cursor-pointer">
                    <MessageSquareText className="w-4 h-4 md:w-5 md:h-5 pointer-events-none text-zinc-300" />
                </a>

                {/* Кнопка уведомлений */}
                <a className="flex bg-zinc-900/60 w-10 h-10 md:w-11 md:h-11 text-white items-center justify-center rounded-full transition-all duration-250 hover:scale-105 hover:bg-zinc-800 active:scale-95 border border-zinc-850/40 cursor-pointer">
                    <Bell className="w-4 h-4 md:w-5 md:h-5 pointer-events-none text-zinc-300" />
                </a>

                {/* Аватарка пользователя / Дропдаун */}
                <div className="ml-1 sm:ml-2">
                    <ProfileDropdown />
                </div>

            </div>
        </header>
    );
};

export default Header;
