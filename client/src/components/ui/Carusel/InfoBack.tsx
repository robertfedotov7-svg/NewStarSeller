'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { CIcon } from "@coreui/icons-react";
import {
    cilDollar, cilEuro, cilRuble,
    cilTruck, cilFactory, cilHandshake,
    cilChartLine, cilBarChart
} from "@coreui/icons";

export const InfoBlock = {
    "ai-recommendations": {
        tag: 'AI ИИ-Аналитика',
        title: "Умные рекомендации",
        titleAccent: "для вашего бизнеса",
        description: "Искусственный интеллект непрерывно анализирует рыночные тренды, оптимизирует ценообразование и находит скрытые точки роста продаж, чтобы максимизировать вашу чистую прибыль.",
        icons: [cilEuro, cilDollar, cilRuble],
        back: '/ai.png',
        tagClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        gradientClass: "from-white to-emerald-300",
        colorClass: "text-emerald-500/20 md:text-emerald-500/30",
        accentColorClass: "text-emerald-400/30 md:text-emerald-400/40"
    },
    "find-suppliers": {
        tag: 'Логистика и Снабжение',
        title: "Надежные поставщики",
        titleAccent: "в один клик",
        description: "Автоматизированный поиск и верификация фабрик по всему миру. Сравнивайте цены, проверяйте рейтинги надежности и оптимизируйте цепочки поставок без посредников.",
        icons: [cilTruck, cilFactory, cilHandshake],
        back: '/find.png',
        tagClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        gradientClass: "from-white to-blue-300",
        colorClass: "text-blue-500/20 md:text-blue-500/30",
        accentColorClass: "text-blue-400/30 md:text-blue-400/40"
    },
    "sales-analytics": {
        tag: 'Аналитика и Данные',
        title: "Глубокий анализ",
        titleAccent: "каждой продажи",
        description: "Интерактивные дашборды и отчеты в реальном времени. Отслеживайте маржинальность, контролируйте остатки на складах и прогнозируйте спрос с точностью до 98%.",
        icons: [cilChartLine, cilBarChart, cilHandshake],
        back: '/analitics.png',
        tagClass: "text-violet-400 bg-violet-500/10 border-violet-500/20",
        gradientClass: "from-white to-violet-300",
        colorClass: "text-violet-500/20 md:text-violet-500/30",
        accentColorClass: "text-violet-400/30 md:text-violet-400/40"
    }
};

interface InfoBackProps {
    type: string;
}

const InfoBack = ({ type }: InfoBackProps) => {
    const data = InfoBlock[type as keyof typeof InfoBlock];

    if (!data) {
        console.warn(`InfoBlock конфигурация не найдена для ключа: "${type}"`);
        return null;
    }

    // Физика плавающего покачивания иконок
    const floatAnimation = (delay: number) => ({
        y: ["0px", "-20px", "0px"],
        rotate: [-6, 6, -6],
        transition: {
            duration: 5 + delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror" as const,
            delay: delay
        }
    });

    // Плавный выезд текста слева на ПК, и мягкий фейд по центру на мобилках
    const textVariants = {
        hidden: { opacity: 0, y: 15, md: { x: -30, y: 0 } },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.6, delay: 0.15, ease: "easeOut" }
        },
        exit: { opacity: 0, y: -15, md: { x: -20, y: 0 }, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            key={`${type}-back`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
        >
            {/* Фоновое изображение */}
            <Image
                src={data.back}
                fill
                priority
                alt={`${data.tag} Background`}
                className="object-cover object-center opacity-[0.03] md:opacity-[0.05] filter blur-[6px]"
            />

            {/*
              АДАПТИВНАЯ ОБОЛОЧКА КОНТЕНТА:
              - На мобилках: Обычный flex-центровщик. Текст встает четко посередине экрана.
              - На десктопе (md:): Превращается в жесткий Grid 3x3 для точного позиционирования слева.
            */}
            <div className="absolute inset-0 flex flex-col justify-center items-center md:grid md:grid-cols-3 md:grid-rows-3 p-6 sm:p-12 md:p-16 pointer-events-auto z-10">
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    /*
                      Убираем pl-20 на мобилках (он ломал центровку). На ПК возвращаем md:pl-20.
                      Добавлено text-center на мобилках, md:text-left на десктопе.
                    */
                    className="w-full max-w-xl md:row-start-2 md:col-start-1 md:col-end-3 md:self-center md:pl-20 text-center md:text-left text-white px-2 sm:px-4"
                >
                    <span className={`text-[10px] md:text-xs font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${data.tagClass}`}>
                        {data.tag}
                    </span>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mt-5 tracking-tight leading-tight uppercase text-balance">
                        {data.title} <br className="hidden sm:inline" />
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${data.gradientClass}`}>
                            {data.titleAccent}
                        </span>
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base text-zinc-400 mt-4 leading-relaxed font-normal max-w-md mx-auto md:mx-0 text-balance">
                        {data.description}
                    </p>
                </motion.div>
            </div>

            {/*
              ЗОНА ИКОНОК:
              - На мобилках: Смещаем иконки в центр экрана и делаем их размером поменьше (240px),
                понижая opacity, чтобы они работали как фоновый футуристичный паттерн под текстом.
              - На десктопе (md:): Сдвигаем в правый верхний угол и увеличиваем масштаб до 450px.
            */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:top-12 md:right-12 md:left-auto md:bottom-auto md:translate-x-0 md:translate-y-0 md:w-[450px] md:h-[450px] opacity-40 md:opacity-100 pointer-events-none z-0 ${data.colorClass}`}>

                <motion.div animate={floatAnimation(0)} className="absolute top-0 left-1/4 md:left-auto md:right-1/3">
                    <CIcon icon={data.icons[0]} className="w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-36" />
                </motion.div>

                <motion.div animate={floatAnimation(0.8)} className={`absolute top-12 right-0 ${data.accentColorClass}`}>
                    <CIcon icon={data.icons[1]} className="w-24 h-24 sm:w-28 sm:h-28 md:w-48 md:h-48" />
                </motion.div>

                <motion.div animate={floatAnimation(1.4)} className="absolute bottom-4 left-4 md:bottom-0 md:left-0">
                    <CIcon icon={data.icons[2]} className="w-14 h-14 sm:w-16 sm:h-16 md:w-28 md:h-28" />
                </motion.div>

            </div>
        </motion.div>
    );
};

export default InfoBack;
