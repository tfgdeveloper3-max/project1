import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const BLIND_COUNT = 10;

function Blind({ index, progress }: { index: number; progress: MotionValue<number> }) {
    const start = index * (0.5 / BLIND_COUNT);
    const end = Math.min(start + 0.45, 1);

    const scaleY = useTransform(progress, [start, end], [1, 0]);

    return (
        <motion.div
            style={{
                scaleY,
                transformOrigin: index % 2 === 0 ? "top" : "bottom",
            }}
            className="absolute inset-0 bg-white"
        />
    );
}

export default function BlindsReveal({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "start 25%"],
    });

    return (
        <div ref={containerRef} className="relative">
            {children}

            <div className="pointer-events-none absolute inset-0 z-20 flex">
                {Array.from({ length: BLIND_COUNT }).map((_, i) => (
                    <div key={i} className="relative h-full flex-1 overflow-hidden">
                        <Blind index={i} progress={scrollYProgress} />
                    </div>
                ))}
            </div>
        </div>
    );
}