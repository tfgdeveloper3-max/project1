import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function FooterIntroReveal() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 20,
        mass: 0.6,
        restDelta: 0.001,
    });

    const circleScale = useTransform(smoothProgress, [0, 0.55], [0.45, 2.8]);

    const textScale = useTransform(smoothProgress, [0, 0.5, 0.55], [1, 3.4, 3.6]);

    const bgColor = useTransform(smoothProgress, [0.5, 0.6], ["#ffffff", "#0a0a0a"]);

    return (
        <div ref={containerRef} className="relative h-[180vh] w-full">
            <motion.div
                style={{ backgroundColor: bgColor }}
                className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
            >
                <motion.div
                    style={{ scale: circleScale }}
                    className="absolute h-[100vmin] w-[100vmin] rounded-full bg-neutral-950"
                />

                <motion.p
                    style={{ scale: textScale }}
                    className="relative z-10 whitespace-nowrap text-3xl font-bold tracking-wide text-white sm:text-3xl"
                >
                    Let&apos;s Talk
                </motion.p>
            </motion.div>
        </div>
    );
}