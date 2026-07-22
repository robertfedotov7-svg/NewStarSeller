import {PanelLeftClose} from "lucide-react";
import React from "react";
import {useApp} from "@/context/AppContext";

export default function OpenModal() {
    const { setOpenModalAside} = useApp()
    return (
        <button
            onClick={() => setOpenModalAside(true)}
            className="rotate-180 flex items-center justify-center text-zinc-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-zinc-900 active:scale-95"
        >
            <PanelLeftClose height={28} width={28} />
        </button>
    )
}