'use client';

import Link from 'next/link';

const footerNavigation = {
    explore: [
        { name: 'Обзор платформы', href: '#features' },
        { name: 'Алгоритмы ИИ', href: '#ai' },
        { name: 'Логистика цепочек', href: '#logistics' },
        { name: 'Архитектура данных', href: '#analytics' },
    ],
    resources: [
        { name: 'Документация API', href: '#docs' },
        { name: 'Статус систем', href: '#status', isLive: true },
        { name: 'Журнал изменений', href: '#changelog', version: 'v0.0.1' },
        { name: 'Руководства', href: '#guides' },
    ],
    company: [
        { name: 'О компании', href: '#about' },
        { name: 'Безопасность данных', href: '#security' },
        { name: 'Пресс-кит', href: '#press' },
        { name: 'Контакты', href: '#contact' },
    ]
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-black border-t border-zinc-900/60 text-zinc-500 overflow-hidden select-none antialiased">

            {/* Apple Signature Ambient Light: Едва заметный, благородный верхний градиент */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-60" />

            {/* Субпиксельная сетка (Precision Grid Matrix) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.15),transparent)] opacity-40 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-24 pb-12 z-10">

                {/* ВЕРХНЯЯ СЕКЦИЯ: Сетка навигации */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 pb-20 border-b border-zinc-900/50">

                    {/* Бренд-блок (Занимает 4 колонки на десктопе) */}
                    <div className="col-span-2 md:col-span-4 flex flex-col justify-between items-start h-full space-y-6">
                        <div className="space-y-4">
                            <Link href="/" className="flex items-center gap-2.5 group">
                                {/* Идеальный монохромный логотип Apple-style */}
                                <div className="w-5 h-5 rounded-md bg-white text-black flex items-center justify-center font-black text-[10px] tracking-tighter transition-transform duration-500 group-hover:rotate-180">
                                    ▲
                                </div>
                                <span className="text-white font-semibold text-sm tracking-[0.2em] uppercase">
                                    NewStarSeller
                                </span>
                            </Link>
                            <p className="text-zinc-600 text-xs font-light leading-relaxed max-w-[260px]">
                                Проектирование экосистем автоматизации e-commerce нового поколения.
                            </p>
                        </div>

                        {/* Интеллектуальный виджет статуса среды выполнения */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-900 bg-zinc-950/40 backdrop-blur-md text-[9px] font-mono tracking-widest text-zinc-500">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            </span>
                            SYS_NODE_ACTIVE // 2026
                        </div>
                    </div>

                    {/* Навигационные колонки (Занимают по 2 колонки на десктопе) */}
                    <div className="col-span-2 md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:pl-12">

                        {/* Колонка 1: Обзор */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-400">// Навигация</h4>
                            <ul className="space-y-3 text-xs">
                                {footerNavigation.explore.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-zinc-500 hover:text-zinc-200 transition-colors duration-300 font-light">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Колонка 2: Ресурсы */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-400">// Ресурсы</h4>
                            <ul className="space-y-3 text-xs">
                                {footerNavigation.resources.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors duration-300 font-light group">
                                            {link.name}
                                            {link.version && (
                                                <span className="text-[9px] font-mono bg-zinc-900/60 border border-zinc-800/80 px-1.5 py-0.5 rounded text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-700 transition-all duration-300">
                                                    {link.version}
                                                </span>
                                            )}
                                            {link.isLive && (
                                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Колонка 3: Компания */}
                        <div className="space-y-4 col-span-2 sm:col-span-1">
                            <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-400">// Корпорация</h4>
                            <ul className="space-y-3 text-xs">
                                {footerNavigation.company.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-zinc-500 hover:text-zinc-200 transition-colors duration-300 font-light">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* НИЖНЯЯ СЕКЦИЯ: Копирайт и метаданные в одну линию */}
                <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-mono tracking-tight text-zinc-600">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                        <span>© {currentYear} Platform Inc. Все права защищены.</span>
                        <span className="hidden sm:inline text-zinc-800">|</span>
                        <Link href="#terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
                        <Link href="#privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
                    </div>

                    {/* Диагностические данные сервера (Signature Apple Diagnostics) */}
                    <div className="flex items-center gap-4 text-zinc-700 select-none">
                        <div className="flex items-center gap-1">
                            <span className="text-zinc-800">LOC:</span> DE_NODE_0
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-zinc-800">PING:</span> 09MS
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
