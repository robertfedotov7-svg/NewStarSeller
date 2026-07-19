"use client"
import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";

const RightSection = () => {
    const [active, setActive] = useState<string>("");
    const handleOn = (type: "FOR START" | "FOR PROGRESS" | "FOR FINISH", act: "on" | "off") => {
        switch (act) {
            case "on":
                setActive(type);
                break;
            case "off":
                setActive("");
                break;
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, x: "50px" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-50px" }}
            transition={{delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="w-80 flex flex-col gap-6 z-10 relative hidden md:flex"
        >
            {/* Блок FOR START */}
            <motion.div
                layout
                onMouseEnter={() => handleOn("FOR START", "on")}
                onMouseLeave={() => handleOn("FOR START", "off")}
                className="border-b border-zinc-800/80 pb-4 overflow-hidden group cursor-pointer"
            >
                <h2 className="text-zinc-400 text-2xl font-semibold select-none transition-colors duration-300 group-hover:text-white">
                    FOR START
                </h2>
                <AnimatePresence initial={false}>
                    {active === "FOR START" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                            className="overflow-hidden"
                        >
                                <span className="text-zinc-400 text-lg font-normal block leading-relaxed">
                                    will help launch the first product.
                                </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Блок FOR PROGRESS */}
            <motion.div
                layout
                onMouseEnter={() => handleOn("FOR PROGRESS", "on")}
                onMouseLeave={() => handleOn("FOR PROGRESS", "off")}
                className="border-b border-zinc-800/80 pb-4 overflow-hidden group cursor-pointer"
            >
                <h2 className="text-zinc-400 text-2xl font-semibold select-none transition-colors duration-300 group-hover:text-white">
                    FOR PROGRESS
                </h2>
                <AnimatePresence initial={false}>
                    {active === "FOR PROGRESS" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                            className="overflow-hidden"
                        >
                              <span className="text-zinc-400 text-lg font-normal font-geist block leading-relaxed">
                                will help reach the top rankings.
                              </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Блок FOR FINISH */}
            <motion.div
                layout
                onMouseEnter={() => handleOn("FOR FINISH", "on")}
                onMouseLeave={() => handleOn("FOR FINISH", "off")}
                className="border-b border-zinc-800/80 pb-4 overflow-hidden group cursor-pointer"
            >
                <h2 className="text-zinc-400 text-2xl font-semibold font-geist select-none transition-colors duration-300 group-hover:text-white">
                    FOR FINISH
                </h2>
                <AnimatePresence initial={false}>
                    {active === "FOR FINISH" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                            className="overflow-hidden"
                        >
                              <span className="text-zinc-400 text-lg font-normal font-geist block leading-relaxed">
                                weekly roundup of the best products for the coming month.
                              </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </motion.div>
    )
}

export default RightSection