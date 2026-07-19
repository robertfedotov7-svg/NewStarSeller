import Link from "next/link";
import {motion} from "framer-motion";
import React from "react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
const AvatarModal = () => {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute right-0 top-14 w-56 bg-zinc-950/80 border border-zinc-900/80 rounded-2xl p-2.5 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col z-50 text-left"
        >
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

            <div className="px-3 py-2 border-b border-zinc-900/60 mb-1.5">
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{"// Активный узел"}</div>
                <div className="text-xs text-zinc-200 font-semibold truncate max-w-full mt-0.5">
                    {user?.displayName || 'Пользователь'}
                </div>
            </div>

            <Link
                href={`/user/${user?.uid}`}
                className="px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all duration-200 flex items-center justify-between group"
            >
                <span>Рабочее пространство</span>
                <span className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">→</span>
            </Link>

            <Link
                href={`/user/${user?.uid}/settings`}
                className="px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all duration-200 flex items-center justify-between group"
            >
                <span>Конфигурация</span>
                <span className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">⚙</span>
            </Link>

            <div className="h-[1px] bg-zinc-900/60 my-1.5" />

            <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-rose-500 hover:text-rose-400 hover:bg-rose-950/20 transition-all duration-200 cursor-pointer"
            >
                SYS_LOGOUT // ВЫЙТИ
            </button>
        </motion.div>
    )
}

export default AvatarModal