"use client"
import { useCarusel } from "@/context/CaruselContext";
import { AnimatePresence } from "framer-motion";
import InfoBack from "@/components/ui/Carusel/InfoBack";

const Back = () => {
    const { activeItem } = useCarusel();

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <AnimatePresence mode="popLayout">
                <InfoBack type={activeItem.id} />
            </AnimatePresence>
        </div>
    );
};

export default Back;
