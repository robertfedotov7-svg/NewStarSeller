import Image from "next/image";
import {PanelLeftClose} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {useCollapse} from "@/context/CollapseContext";
import {motion} from "framer-motion";
const Dashboard = ({collapsed} : {collapsed: boolean}) => {
    const router = useRouter();
    const { user } = useAuth()
    const { collapse, setCollapse } = useCollapse()
    const handleClick = () => {
        setCollapse(!collapse)
    }
    return (
        <motion.header
            className={`flex w-full items-center justify-between p-3 pb-4 ${collapse ? "flex-col" : ""}`}>
            <Image
                onClick={() => router.push(`/user/${user?.uid}/`)}
                src="/logo.ico"
                width="48"
                height="48"
                alt="Logo"
                className="rounded-full transition duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto filter brightness-100"
            />
            <motion.button
                animate={{ rotate: collapse ? 180 : 0 }}
                exit={{ rotate: collapse ? 0 : 180 }}
                transition={{
                    type: "tween",       // Делаем появление более линейным/мягким
                    duration: 0.3,       // Длительность появления в секундах
                    ease: "easeOut" }}
                onClick={handleClick}
                className={`flex items-center justify-center text-white hover:scale-105 active:scale-95 ${collapsed ? "" : "hidden"}`}>
                <PanelLeftClose height={36} width={36} />
            </motion.button>
        </motion.header>
    )
}
export default Dashboard;