'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    type?: 'info' | 'confirm';
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
}

const ModalLog = ({
                   isOpen,
                   onClose,
                   onConfirm,
                   type = 'info',
                   title,
                   description,
                   confirmText = 'Подтвердить',
                   cancelText = 'Отмена'
               }: ModalProps) => {

    // Блокируем скролл страницы, когда модалка открыта (Senior-UX)
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                    {/* ТЕМНЫЙ ОВЕРЛЕЙ (Задний фон с Apple-размытием) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose} // Закрытие при клике по фону
                        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
                    />

                    {/* ТЕЛО МОДАЛЬНОГО ОКНА */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="relative w-full max-w-sm bg-gradient-to-b from-zinc-900/80 to-zinc-950/95 border border-zinc-900 rounded-3xl p-6 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden text-center sm:text-left select-none antialiased"
                    >
                        {/* Верхний световой контур */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                        {/* КОНТЕНТ */}
                        <div className="space-y-3">
                            <div className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                                // System_Notification
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-white uppercase text-balance leading-none">
                                {title}
                            </h3>
                            <p className="text-sm text-zinc-400 font-light leading-relaxed text-balance pt-1">
                                {description}
                            </p>
                        </div>

                        {/* КНОПКИ ДЕЙСТВИЯ */}
                        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 font-medium">

                            {/* Кнопка "Отмена" / "Закрыть" */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-900 bg-zinc-950/40 text-xs text-zinc-400 uppercase tracking-wider hover:text-white hover:border-zinc-800 active:scale-[0.98] transition-all duration-200 focus:outline-none"
                            >
                                {type === 'confirm' ? cancelText : 'Закрыть'}
                            </button>

                            {/* Кнопка "Подтвердить" (рендерится только для двухтипового режима 'confirm') */}
                            {type === 'confirm' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onConfirm) onConfirm();
                                        onClose();
                                    }}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 focus:outline-none shadow-md"
                                >
                                    {confirmText}
                                </button>
                            )}
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ModalLog;
