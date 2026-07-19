'use client';
import { motion } from 'framer-motion';
import React from "react";


export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            style={{ position: "relative", width: "100%" }}
            initial={{ opacity: 0, y: "40px" }} // Лучше использовать небольшие сдвиги, 90% может дергать верстку при SSR
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-40px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
}
