"use client"
import {ReactNode, createContext, useMemo, useContext, useState} from "react"



const AppContext = createContext<any | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [ hidden, setHidden ] = useState<boolean>(false);
    const [openModalAside, setOpenModalAside] = useState<boolean>(false);
    const [ activePage, setActivePage ] = useState<"" | "opportunities">("")
    const [ darkMode, setDarkMode ] = useState<boolean>(false)
    const [finalBudget, setFinalBudget] = useState<number>(30000);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [priority, setPriority] = useState<string>("profit");
    const contextValue = useMemo(() => ({
        activePage, setActivePage,
        darkMode, setDarkMode,
        finalBudget, setFinalBudget,
        platforms, setPlatforms,
        priority, setPriority,
        hidden, setHidden,
        openModalAside, setOpenModalAside
    }), [activePage, darkMode, finalBudget, priority, platforms, hidden, openModalAside]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

// 3. Кастомный хук для использования данных
export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp должен использоваться строго внутри AppContextProvider');
    }
    return context;
}
