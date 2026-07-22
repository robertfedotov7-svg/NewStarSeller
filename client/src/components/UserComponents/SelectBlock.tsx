'use client';
import { motion } from "framer-motion";
import React from "react";

type Text = {
    title: string;
    description: string;
}

interface Props {
    text: Text;
    children: React.ReactNode;
    index?: number;
}

const SelectBlock: React.FC<Props> = ({ text, children, index = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{
                delay: 0.2 + index * 0.2,
                type: "spring",
                stiffness: 260,
                damping: 26
            }}
            // ИСПРАВЛЕНО: Убрали класс "transition-colors duration-350", который ломал физику и вешал интерфейс
            className="p-8 text-white flex flex-col justify-between border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-900/30 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-black/50"
        >
            <div className="w-full flex flex-col gap-1.5 text-left">
                <h1 className="text-xl font-bold tracking-tight text-zinc-100">{text.title}</h1>
                <p className="text-xs text-zinc-400 font-medium tracking-tight leading-relaxed">
                    {text.description}
                </p>
            </div>

            <motion.div layout className="w-full my-5">
                <div className="w-full h-[1px] bg-zinc-800/60" />
            </motion.div>

            <div className="w-full flex-1 flex flex-col justify-between">
                {children}
            </div>
        </motion.div>
    );
};

export default SelectBlock;
