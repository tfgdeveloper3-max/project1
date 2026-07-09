import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, type Variants } from "motion/react";

const BLIND_COUNT = 10;
const EASE = [0.65, 0, 0.35, 1] as const;

type Phase = "hidden" | "visible";

const RevealContext = createContext<Phase>("hidden");
export const useRevealPhase = () => useContext(RevealContext);

const blindVariants: Variants = {
    hidden: (i: number) => ({
        scaleX: 1,
        transition: { duration: 1.1, ease: EASE, delay: (BLIND_COUNT - 1 - i) * 0.06 },
    }),
    visible: (i: number) => ({
        scaleX: 0,
        transition: { duration: 1.1, ease: EASE, delay: i * 0.06 },
    }),
};

const contentVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.96,
        transition: { duration: 0.6, ease: EASE },
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: EASE, delay: 0.35 },
    },
};

export default function BlindsReveal({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<Phase>("hidden");
    const scrollDirRef = useRef<"up" | "down">("down");

    const isEntering = useInView(containerRef, { amount: 0.3, once: false });

    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            scrollDirRef.current = y > lastY ? "down" : "up";
            lastY = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (isEntering) {
            setPhase("visible");
        } else if (scrollDirRef.current === "up") {
            setPhase("hidden");
        }
    }, [isEntering]);

    return (
        <RevealContext.Provider value={phase}>
            <div ref={containerRef} className="relative">
                <motion.div variants={contentVariants} initial="hidden" animate={phase}>
                    {children}
                </motion.div>

                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
                    {Array.from({ length: BLIND_COUNT }).map((_, i) => (
                        <div key={i} className="relative w-full flex-1 overflow-hidden">
                            <motion.div
                                custom={i}
                                variants={blindVariants}
                                initial="hidden"
                                animate={phase}
                                style={{ transformOrigin: i % 2 === 0 ? "left" : "right" }}
                                className="absolute inset-0 bg-gradient-to-r from-[#147237] to-[#91CD89]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </RevealContext.Provider>
    );
}