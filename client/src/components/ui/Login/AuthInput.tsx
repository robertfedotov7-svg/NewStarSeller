"use client";

import React, { forwardRef } from "react";
import { IForm } from "@/types/types"; // Импортируйте ваш интерфейс формы

// Описываем строгие пропсы для инпута
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: keyof IForm; // Ограничиваем name только ключами из IForm
    rightElement?: React.ReactNode; // Для кнопки "Забыли пароль?"
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, name, rightElement, disabled, className = "", ...props }, ref) => {
        return (
            <div className="space-y-1.5 w-full">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        {`// ${label}`}
                    </label>
                    {rightElement}
                </div>
                <input
                    ref={ref}
                    name={name}
                    disabled={disabled}
                    className={`w-full bg-zinc-950/60 border border-zinc-900 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-700 outline-none focus:border-zinc-700 focus:bg-black transition-all duration-300 antialiased disabled:opacity-40 ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
