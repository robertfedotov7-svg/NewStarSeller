import React from "react";

const Subscription = () => {
    return (
        <div className="flex flex-col w-full p-4 pt-0">
            <div className="bg-white w-full rounded-2xl flex flex-col justify-between items-center p-6 gap-5">
                <h2 className="rounded-xl bg-linear-to-t from-pink-500 to-purple-500 py-2 px-5 text-white font-black transition hover:scale-105">Pro</h2>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">$10/mo</h1>
                    <h3 className="text-zinc-400 text-sm">bill a year Use full Option</h3>
                </div>

                <button className="bg-black text-nowrap text-white rounded-full py-2 px-8 text-xl font-bold transition hover:scale-105 active:scale-95">Upgrade to Pro</button>
            </div>
        </div>
    )
}

export default Subscription;