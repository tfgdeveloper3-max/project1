import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { Search, PenTool, Code2, Rocket, type LucideIcon } from "lucide-react";

type Step = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const STEPS: Step[] = [
    {
        icon: Search,
        title: "Discover",
        description: "We map your goals, users, and market before a single pixel gets placed.",
    },
    {
        icon: PenTool,
        title: "Design",
        description: "Wireframes and visuals get tested against real use cases, not just aesthetics.",
    },
    {
        icon: Code2,
        title: "Build",
        description: "Clean, documented code shipped in small reviewable batches — no black boxes.",
    },
    {
        icon: Rocket,
        title: "Launch & Support",
        description: "We stay past go-live to monitor, tune, and grow what we built together.",
    },
];

const container: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18, delayChildren: 0.15 },
    },
};

const card: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 14 },
    },
};

const line: Variants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
};

export default function ProcessSection() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#147237] to-[#91CD89] px-6 py-20 font-atyp md:px-12 lg:py-28">
            {/* soft dark scrim so white text stays legible across the whole gradient, including the pale right edge */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3f9463]/15 blur-3xl" />

            <div className="relative mx-auto max-w-3xl text-center">
                <span className="mb-6 inline-flex w-fit items-center rounded-full bg-black/20 px-5 py-2 font-atyp text-sm text-white/90 backdrop-blur-sm">
                    How We Work
                </span>
                <h2 className="font-atyp text-[30px] font-light leading-[1.2] text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.25)] sm:text-[36px] lg:text-[42px]">
                    A Process Built For{" "}
                    <span className="font-semibold text-white">Momentum</span>
                </h2>
                <p className="mx-auto mt-5 max-w-lg font-atyp text-sm leading-relaxed text-white/85">
                    Four disciplined stages, repeated on every engagement — so you always
                    know what's next and why.
                </p>
            </div>

            <motion.div
                className="relative mx-auto mt-20 max-w-6xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={container}
            >
                <motion.div
                    variants={line}
                    style={{ transformOrigin: "left" }}
                    className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/40 sm:block"
                />

                <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-6">
                    {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        const isActive = hovered === i;
                        return (
                            <motion.div
                                key={step.title}
                                variants={card}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className="relative flex flex-col items-start sm:items-center sm:text-center"
                            >
                                <div
                                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                                        ? "border-white bg-white text-[#0f5c2c] shadow-[0_0_24px_rgba(255,255,255,0.55)]"
                                        : "border-white/50 bg-black/25 text-white backdrop-blur-sm"
                                        }`}
                                >
                                    <Icon size={22} strokeWidth={2} />
                                </div>

                                <span className="mt-5 font-atyp text-xs font-semibold tracking-wide text-white/80">
                                    STEP {String(i + 1).padStart(2, "0")}
                                </span>

                                <h3
                                    className={`mt-2 font-atyp text-lg font-semibold text-white transition-all duration-300 ${isActive ? "underline decoration-2 underline-offset-4" : ""
                                        }`}
                                >
                                    {step.title}
                                </h3>

                                <p className="mt-3 max-w-[220px] font-atyp text-sm leading-relaxed text-white/85">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}