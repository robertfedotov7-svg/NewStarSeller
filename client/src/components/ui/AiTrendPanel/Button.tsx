import {AnimatePresence, motion} from "framer-motion";
import {ArrowRight} from "lucide-react";
import React from "react";
import {useAiGenerate} from "@/context/AiGenerateContext";

const Button = () => {
    const { status, setStatus, setActiveTokenIndex, setVisibleCharCount } = useAiGenerate()
    return (
        <div className="shrink-0 w-full md:w-auto flex justify-end">
            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.button
                        key="btn-start"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => setStatus('loading')}
                        className="w-full md:w-auto py-3 px-5 rounded-xl bg-white text-zinc-950 font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-zinc-100 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-white/5 outline-none select-none cursor-pointer"
                    >
                        Найти товары
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                )}

                {(status === 'loading' || status === 'typing') && (
                    <motion.div
                        key="btn-processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-2.5 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-semibold text-xs tracking-wider uppercase select-none pointer-events-none"
                    >
                        {status === 'loading' ? "Расчет..." : "Печать..."}
                    </motion.div>
                )}

                {status === 'ready' && (
                    <motion.button
                        key="btn-ready"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-auto py-3 px-5 rounded-xl bg-zinc-800 text-white border border-zinc-700 font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-zinc-750 active:scale-[0.97] transition-all duration-200 outline-none select-none cursor-pointer"
                        onClick={() => {
                            setStatus('idle');
                            setActiveTokenIndex(0);
                            setVisibleCharCount(0);
                        }}
                    >
                        Пересчитать заново
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Button;