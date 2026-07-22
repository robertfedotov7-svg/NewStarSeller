export interface IForm {
    email: string;
    password: string;
    name: string;
}

export interface TrendItem {
    category: string;
    subCategory: string;
    growth: string;
    competition: "Низкая" | "Средняя" | "Высокая";
    margin: string;
    status: "hot" | "stable" | "deficit";
    insights: {
        tip: string;
        countdown: string;
        shipping: string;
        allocation: string;
    };
}