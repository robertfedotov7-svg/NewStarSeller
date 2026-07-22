"use client"
import {ReactNode, createContext, useMemo, useContext, useState} from "react"



const AiGenerateContext = createContext<any | undefined>(undefined);

export function AiGenerateContextProvider({ children }: { children: ReactNode }) {
    const [ status, setStatus ] = useState<'idle' | 'loading' | 'typing' | 'ready'>('idle');

    const [ activeProductIndex, setActiveProductIndex ] = useState<number>(0);

    const [activeTokenIndex, setActiveTokenIndex] = useState<number>(0);
    const [visibleCharCount, setVisibleCharCount] = useState<number>(0);
    const contextValue = useMemo(() => ({
        status, setStatus,
        activeProductIndex, setActiveProductIndex,
        activeTokenIndex, setActiveTokenIndex,
        visibleCharCount, setVisibleCharCount
    }), [status, setStatus, activeProductIndex, setActiveProductIndex, activeTokenIndex, setActiveTokenIndex, visibleCharCount, setVisibleCharCount]);

    return (
        <AiGenerateContext.Provider value={contextValue}>
            {children}
        </AiGenerateContext.Provider>
    );
}

// 3. Кастомный хук для использования данных
export function useAiGenerate() {
    const context = useContext(AiGenerateContext);
    if (!context) {
        throw new Error('useAiGenerate должен использоваться строго внутри AiGenerateProvider');
    }
    return context;
}
