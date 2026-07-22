import {LayoutDashboard, PackageSearch, CircleQuestionMark, MoonStar} from "lucide-react";
import React from "react";
import NavItem from "@/components/ui/Aside/NavItem";
import {useCollapse} from "@/context/CollapseContext";
import Switch from "@/components/ui/Buttons/ToggleDarkMode";
import {useApp} from "@/context/AppContext";

const NavItems = [
    {
        title: "Dashboard",
        link: "",
        icon: <LayoutDashboard />,
    },
    {
        title: "Opportunities",
        link: "opportunities",
        icon: <PackageSearch />
    }
]

const Nav = () => {
    const { collapse } = useCollapse();
    const {darkMode, setDarkMode} = useApp();
    const handleChange = () => {
        setDarkMode(!darkMode);
    }
    return (
        <nav className="flex flex-col justify-between w-full h-full p-3">
            <div className="flex flex-col w-full gap-2">
                {NavItems.map((item) => (
                    <NavItem key={item.link} link={item.link}>
                        {item.icon}
                        {collapse ? "" : <h2>{item.title}</h2>}
                    </NavItem>
                ))}
            </div>
            <div className="flex flex-col w-full gap-2">
                <div className="flex w-full  p-3 rounded-full text-zinc-400 font-bold gap-4 transition hover:text-white">
                    <CircleQuestionMark />
                    {collapse ? "" : <h2>Help & information</h2>}
                </div>
                <div
                    onClick={handleChange}
                    className={`flex w-full items-center justify-start  p-3 rounded-full font-bold gap-4 transition ${darkMode ? "text-white" : "text-zinc-400"}`}>
                    <div className="transition hover:scale-110 active:scale-95">
                        <MoonStar />
                    </div>
                    {collapse ? "" :
                        <div
                            className="flex w-full items-center justify-between transition hover:text-white">
                            <h2>Dark Mode</h2>
                            <Switch/>
                        </div>}
                </div>
            </div>
        </nav>
    )
}

export default Nav;