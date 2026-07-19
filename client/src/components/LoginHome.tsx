import Login from "@/components/ui/Login";

const LoginHome = () => {

    return (
        <section id="auth-section" className="relative w-full flex items-center justify-center bg-black text-white px-6 py-24 overflow-hidden select-none antialiased scroll-mt-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-50 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-zinc-800/10 via-indigo-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

            <div className="relative w-full max-w-md z-10 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="px-3 py-1 rounded-full border border-zinc-900 bg-zinc-950/40 backdrop-blur-md text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-4">
                        Безопасный узел данных // SSL
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase leading-none">
                        Начните <span className="bg-gradient-to-r from-zinc-400 via-white to-zinc-500 bg-clip-text text-transparent">сейчас</span>
                    </h2>
                </div>

                {/* Главная карточка с включенным свойством layout для плавной деформации */}
                <Login/>
            </div>
        </section>
    );
};

export default LoginHome;