"use client"
import {ReactNode, createContext, useMemo, useContext, useState} from "react"



const CollapseContext = createContext<any | undefined>(undefined);

export function CollapseContextProvider({ children }: { children: ReactNode }) {
    const [collapse, setCollapse] = useState<boolean>(false)
    const contextValue = useMemo(() => ({
        collapse, setCollapse,
    }), [collapse]);

    return (
        <CollapseContext.Provider value={contextValue}>
            {children}
        </CollapseContext.Provider>
    );
}

// 3. Кастомный хук для использования данных
export function useCollapse() {
    const context = useContext(CollapseContext);
    if (!context) {
        throw new Error('useCollapse должен использоваться строго внутри AppContextProvider');
    }
    return context;
}
