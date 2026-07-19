import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import ButtonSocialAuth from "@/components/ui/Login/ButtonSocialAuth";
import React, {useState} from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import {auth, db} from "@/lib/firebase";
import {doc, setDoc} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import { IForm } from "@/types/types";
import AuthInput from "@/components/ui/Login/AuthInput";


const ErrorsLog = () => {
    const { error } = useAuth();
    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[11px] font-mono text-center text-rose-500 bg-rose-500/5 border border-rose-500/10 rounded-xl px-4 py-2.5 overflow-hidden"
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const Separator = ()=> {
    return (
        <motion.div layout className="relative flex py-5 items-center w-full">
            <div className="flex-grow border-t border-zinc-900/80" />
            <span className="flex-shrink mx-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">или войти через</span>
            <div className="flex-grow border-t border-zinc-900/80" />
        </motion.div>
    )
}

const Form = () => {
    const { isLoading, setIsLoading, setError, mode, setModalConfig, setMode } = useAuth();
    const [ form, setForm ] = useState<IForm>({
        name: "",
        password: "",
        email: "",
    })
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
                const user = userCredential.user;
                await sendEmailVerification(user);
                if (form.name.trim()) {
                    await updateProfile(user, { displayName: form.name });
                }
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: form.name.trim(),
                    email: form.email.toLowerCase().trim(),
                    createdAt: new Date().toISOString(),
                    role: "user",
                    currentBudget: 0,
                    recommendations: []
                });
                setModalConfig({
                    isOpen: true,
                    title: "Регистрация успешна",
                    description: `Узел создан. На адрес ${form.email} отправлено письмо. Пожалуйста, подтвердите вашу почту перед входом в систему.`,
                    type: 'info'
                });
                setForm({name: "", password: "", email: ""}); setMode('signin');
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
                if (!userCredential.user.emailVerified) {
                    setModalConfig({
                        isOpen: true,
                        title: "Доступ ограничен",
                        description: "Ваш адрес электронной почты еще не подтвержден. Проверьте ваш почтовый ящик.",
                        type: 'info'
                    });
                    return;
                }
                router.push(`/user/${userCredential.user.uid}`);
            }
        } catch (err: any) {
            const errorCode = err?.code || 'unknown-error';
            switch (errorCode) {
                case 'auth/email-already-in-use': setError('Этот email уже зарегистрирован.'); break;
                case 'auth/weak-password': setError('Пароль слишком слабый (минимум 6 символов).'); break;
                case 'auth/invalid-credential': setError('Неверный адрес почты или пароль.'); break;
                default: setError(`Ошибка синхронизации. Код: ${errorCode}`);
            }
        } finally {
            setIsLoading(false);
        }
    };
    const handleChange = (value: string, name: keyof IForm) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <motion.div
            animate={{ height: "auto" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="relative overflow-hidden w-full flex flex-col"
        >
            <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="space-y-5 w-full"
                    >
                        {mode === 'signup' && (
                            <AuthInput
                                label="Имя пользователя"
                                name="name"
                                type="text"
                                required
                                disabled={isLoading}
                                value={form.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                                placeholder="Константин"
                            />
                        )}

                        <AuthInput
                            label="Адрес почты"
                            name="email"
                            type="email"
                            required
                            disabled={isLoading}
                            value={form.email}
                            onChange={(e) => handleChange(e.target.value, 'email')}
                            placeholder="name@domain.com"
                        />

                        <AuthInput
                            label="Пароль"
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                            value={form.password}
                            onChange={(e) => handleChange(e.target.value, 'password')}
                            placeholder="••••••••"
                            rightElement={
                                mode === 'signin' && (
                                    <Link href="#forgot" className="text-[10px] text-zinc-600 hover:text-zinc-400 font-light transition-colors">
                                        Забыли пароль?
                                    </Link>
                                )
                            }
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Логи ошибок */}
                <ErrorsLog/>
                {/* Стандартная кнопка отправки формы */}
                <motion.button
                    layout
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    whileHover={isLoading ? {} : { scale: 1.01 }}
                    whileTap={isLoading ? {} : { scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-black hover:bg-zinc-200 active:bg-zinc-300 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 mt-6 shadow-lg focus:outline-none disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed z-10"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                                    <span className="w-3 h-3 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin" />
                                    Синхронизация...
                                </span>
                    ) : (
                        mode === 'signin' ? 'Войти в систему' : 'Зарегистрироваться'
                    )}
                </motion.button>
                {/* Разделитель Apple-style */}
                <Separator/>
                {/* Сетка OAuth кнопок (2 колонки: Google, GitHub) */}
                <ButtonSocialAuth />
            </form>
        </motion.div>
    )
}

export default Form