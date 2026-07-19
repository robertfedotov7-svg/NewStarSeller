"use client"
import {ReactNode, createContext, useMemo, useContext} from "react"



const AppContext = createContext<any | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {



    const contextValue = useMemo(() => ({

    }), []);

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
