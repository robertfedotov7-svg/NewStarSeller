import Image from "next/image";
import React from "react";
import {useApp} from "@/context/AppContext";

const Logo = () => {
    const { setOpenModalAside } = useApp()
    return (
        <Image
            onClick={() => setOpenModalAside(true)}
            src="/logo.ico"
            width="48"
            height="48"
            alt="Logo"
            className="rounded-full transition duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto filter brightness-100"
        />
    )
}

export default Logo;