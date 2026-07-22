import { db } from "@/firebase/config"; // Ваш инициализированный объект Firestore
import { doc, updateDoc, setDoc } from "firebase/firestore";

export const updateUserBudget = async (userId: string, budgetAmount: number): Promise<void> => {
    try {
        // Ссылка на документ конкретного пользователя в коллекции "users"
        const userDocRef = doc(db, "users", userId);

        // Исползуем updateDoc, если документ пользователя точно уже создан.
        // Если документа может не быть, лучше использовать setDoc с { merge: true }
        await setDoc(userDocRef, {
            budget: budgetAmount,
            updatedAt: new Date() // Полезно сохранять дату изменения
        }, { merge: true });

        console.log("Бюджет успешно обновлен!");
    } catch (error) {
        console.error("Ошибка при обновлении бюджета:", error);
        throw error;
    }
};
