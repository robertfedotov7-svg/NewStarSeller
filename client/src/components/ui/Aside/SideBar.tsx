'use client';
import Header from "./AsideHeader";
import Nav from "@/components/ui/Aside/Nav";
import React, {useEffect, useState} from "react";
import Subscription from "@/components/ui/Subscription";
import { useCollapse } from "@/context/CollapseContext";
import { motion } from "framer-motion";
import {useApp} from "@/context/AppContext";

const SideBar = () => {
    const { collapse, setCollapse } = useCollapse();

    const [ collapsed, setCollapsed ] = useState<boolean>(true);

    const { hidden, setHidden } = useApp()

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // 2. Функция для обновления стейта
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // 3. Вешаем слушатель
        window.addEventListener('resize', handleResize);

        // 4. Вызываем при первой загрузке
        handleResize();

        // 5. Очищаем слушатель при размонтировании
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowSize.width <= 428) {
            setHidden(true)
        } else  if (windowSize.width <= 1024) {
            setHidden(false)
            setCollapsed(false);
            setCollapse(true)
        } else {
            setCollapsed(true);
            setHidden(false)
        }
    }, [windowSize]);

    return (
        <motion.aside
            initial={{ width: 0, x: "-100%" }}
            animate={{ width: collapse ? 80 : 260, x: 0 }}
            exit={{ width: 0, x: "-100%" }}

            // Разделяем transition для каждого свойства индивидуально
            transition={{
                // Анимация для выезда (появление на экране)
                x: {
                    delay: 0.2,
                    type: "tween",       // Делаем появление более линейным/мягким
                    duration: 0.5,       // Длительность появления в секундах
                    ease: "easeOut"
                },
                // Анимация для скручивания (изменение ширины при клике на тогл)
                width: {
                    type: "spring",      // Для скручивания оставляем пружину
                    stiffness: 300,      // Делает анимацию быстрой и отзывчивой
                    damping: 30          // Гасит лишнее покачивание
                }
            }}
            className={`h-screen w-full flex flex-col items-center justify-between overflow-hidden shrink-0 ${hidden ? "hidden" : ""}`}
        >
            <div className="flex flex-col w-full h-full">
                <Header collapsed={collapsed} />
                <Nav />
            </div>

            {/*{collapse ? (*/}
            {/*    <h2 className="mb-4 rounded-xl bg-linear-to-t from-pink-500 to-purple-500 p-2 text-white font-black transition hover:scale-105 select-none whitespace-nowrap">*/}
            {/*        Pro*/}
            {/*    </h2>*/}
            {/*) : (*/}
            {/*    <Subscription />*/}
            {/*)}*/}
        </motion.aside>
    );
};

export default SideBar;
