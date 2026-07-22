"use client"
import React from "react";
import BudgetSelector from "@/components/ui/Inputs/BudgetSelector";
import MarketplaceSelector from "@/components/ui/Inputs/MarketplaceSelector";
import PrioritySelector from "@/components/ui/Inputs/PrioritySelector"
import SelectBlock from "@/components/UserComponents/SelectBlock";
import AiSummary from "@/components/UserComponents/AiSummary";
import Recommendation from "@/components/UserComponents/Recommendation";
import {AiGenerateContextProvider} from "@/context/AiGenerateContext";
import AllCategory from "@/data/AllCategory.json"
import AllHoliday from "@/data/AllHoliday.json"

interface Holiday {
    name: string,
    score: number,
    date: string,
    pick: string,
    start: string,
    purchase: {
        start: string,
        end: string
    }
}

interface Category {
    id: string,
    name: string,
    season: null | string
    holiday: string[]
    rivalry: "low" | "medium" | "high",
    bestMarketplace: string
}

interface AndCS {
    category: Category,
    holiday: Holiday,
    season: "spring" | "summer" | "autumn" | "winter"
}
// ---------------------Engine--------------------------

const Budget: number = 100_000

const nowDate = new Date();

const targetTime = nowDate.getTime();
const getSeason = (nowDate: any) => {
    const month = nowDate.getMonth() + 2;
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter'; // Декабрь (11), Январь (0) и Февраль (1)
}



const nextHoliday: Holiday[] = AllHoliday.filter(holiday => {
    const start = new Date(holiday.purchase.start).getTime();
    const end = new Date(holiday.purchase.end).getTime();
    return targetTime >= start && targetTime <= end;
});

const currentSeason = getSeason(nowDate);

// 1. ОТДЕЛЬНЫЙ МАССИВ: Только праздники { holiday, category }
const filteredHolidays = [];
AllCategory.forEach(category => {
    nextHoliday.forEach(holiday => {
        if (category.holiday?.includes(holiday.name)) {
            filteredHolidays.push({ holiday, category });
        }
    });
});

// 2. ОТДЕЛЬНЫЙ МАССИВ: Только сезоны { season, category }
const filteredSeasons = AllCategory
    .filter(category => category.season?.includes(currentSeason))
    .map(category => ({ season: currentSeason, category }));


// 3. ВСПOMOГАТЕЛЬНЫЙ SET: Для быстрого поиска категорий по сезону
// (Использует массив из шага 2, чтобы не перебирать заново AllCategory)
const seasonCategoryIds = new Set(filteredSeasons.map(item => item.category.id));


// 4. ИТОГОВЫЙ МАССИВ: Пересечение (Праздник + Сезон) { category, holiday, season }
const andHolidayAndSeason: AndCS = filteredHolidays
    .filter(item => seasonCategoryIds.has(item.category.id))
    .map(item => ({
        category: item.category,
        holiday: item.holiday,
        season: currentSeason
    }));

console.log('Праздники + Сезоны:', andHolidayAndSeason);



// -----------------------------------------------------


type Text = {
    title: string;
    description: string;
}

const Block: Text[] = [
    { title: "Выберите бюджет", description: "Определите комфортные рамки инвестиций в проект" },
    { title: "Где продаем?", description: "Выберите торговые площадки для оптимизации рекомендаций" },
    { title: "Что для вас важнее?", description: "Приоритетная цель определит стратегию подбора товаров" },
]

const Blocks: React.ReactElement[] = [
    <BudgetSelector key="budget" />,
    <MarketplaceSelector key="marketplace" />,
    <PrioritySelector key="priority" />
];
const Opportunities = () => {
    return (
        /*
            ИСПРАВЛЕНО:
            1. h-[calc(100vh-4rem)] — задает точную высоту рабочей зоны (минус высота хедера, если он есть).
            2. overflow-y-auto — включает вертикальный скролл ТОЛЬКО для этой части страницы, когда контент не влезает.
            3. custom-scrollbar — опциональный класс для красивого тонкого скроллбара.
        */
        <AiGenerateContextProvider>
            <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start p-6 gap-6 antialiased custom-scrollbar">

                <div className="w-full max-w-[1400px] flex flex-col gap-6 pb-12">

                    {/* Горизонтальная AI панель трендов */}
                    <AiSummary />

                    {/* Сетка Grid с карточками выбора */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
                        {Blocks.map((block, index) => (
                            <SelectBlock key={index} text={Block[index]} index={index}>
                                {block}
                            </SelectBlock>
                        ))}
                    </div>

                    {/*
                    ИСПРАВЛЕНО: Заменили самовызывающийся <Recomendations />
                    на изолированный блок генерации результатов.
                */}
                    <Recommendation />

                </div>
            </div>
        </AiGenerateContextProvider>
    );
};

export default Opportunities;
