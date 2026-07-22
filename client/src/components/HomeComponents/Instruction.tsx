import Cards from "@/components/ui/Instruction/Cards";


const Instruction = () => {

    return (
        <section id="how-it-works" className="relative py-32 bg-black text-white overflow-hidden scroll-mt-10">
            {/* Высокотехнологичная фоновая сетка (Grid-матрица) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f11_1px,transparent_1px),linear-gradient(to_bottom,#0f0f11_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

            {/* Неоновые амбиентные засветы в стиле Web3 */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 z-10">

                {/* Премиальный Минималистичный Заголовок */}
                <div className="flex flex-col items-center text-center mb-24">
                    <div
                        className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/60 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-4"
                    >
                        Процесс автоматизации
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase max-w-2xl leading-none">
                        How it <span className="bg-gradient-to-r from-zinc-400 via-white to-zinc-500 bg-clip-text text-transparent">works</span>
                    </h2>
                    <p className="text-zinc-500 mt-4 text-base md:text-lg max-w-lg font-light">
                        Три этапа, отделяющие вашу идею от полностью автоматизированной воронки продаж.
                    </p>
                </div>
                {/* Bento Grid Сетка Шагов */}
                <Cards/>
            </div>
        </section>
    );
};

export default Instruction;
