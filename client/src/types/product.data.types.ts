// 1. СТРОГАЯ СТРУКТУРА ВХОДНОГО ОБЪЕКТА (APPLE-STYLE DATA ARCHITECTURE)
export interface FactorItem {
    name: string;
    score: number;
    maxScore: number; // Если true — звезды будут оранжевыми
    reason: string;
}

export interface SupplierItem {
    id: string;
    category: string;
    name: string;
    chineseMarketplace: string;
    purchasePrice: string
    url: string;
}

export interface AiRecommendationData {
    totalItemsFound: number;
    productName: string;    // Например, "🎒 Школьный рюкзак"
    score: number;
    finance: {
        purchasePrice: number; // Например, "1 450 ₽"
        sellingPrice: number;  // Например, "3 290 ₽"
        margin: number;
        riskLevel: "Низкий" | "Средний" | "Высокий";
    };
    recommendation: {
        status: string;
        verdict: string;
        potentialProfitPerUnit: number;
    }
    factors: FactorItem[];
    suppliers: SupplierItem[];
    timeline: {
        buyBefore: string;
        inStorage: string;
        seasonStarts: string;
        peak: string;
    }
}

export interface TextToken {
    type: "text" | "bold" | "badge";
    content: string;
}