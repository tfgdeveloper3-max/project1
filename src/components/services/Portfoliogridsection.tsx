import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
    { image: "/images/ServicesPortfolio1.png", title: "Car Inspection Platform", accent: "#1f8a3c" },
    { image: "/images/ServicesPortfolio2.png", title: "Lumina Skincare", accent: "#d9631e" },
    { image: "/images/ServicesPortfolio3.png", title: "Architecture Studio", accent: "#4a2f22" },
    { image: "/images/ServicesPortfolio4.png", title: "Sailboat Rentals", accent: "#8a8f98" },
    { image: "/images/ServicesPortfolio5.png", title: "Beauty & Wellness Spa", accent: "#0f7a6b" },
    { image: "/images/ServicesPortfolio6.png", title: "Sports Gear Store", accent: "#171717" },
];

const SHUFFLE = [
    { x: -260, y: -70, rotate: -18 },
    { x: 240, y: 50, rotate: 14 },
    { x: -220, y: 90, rotate: -12 },
    { x: 260, y: -40, rotate: 20 },
    { x: -180, y: -110, rotate: -10 },
    { x: 200, y: 100, rotate: 16 },
];

// Record<number, number> — TS ko batata hai ke ye object kisi bhi number key se index ho sakta hai
const EXIT_DELAYS: Record<number, number> = {
    3: 0,
    4: 0.1,
    5: 0.2,
    0: 0.35,
    1: 0.45,
    2: 0.55,
};

const headerContainer: Variants = {
    hidden: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const headerItem: Variants = {
    hidden: { opacity: 0, y: 24, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const cardVariants: Variants = {
    hidden: (i: number) => ({
        opacity: 0,
        x: SHUFFLE[i].x,
        y: SHUFFLE[i].y,
        rotate: SHUFFLE[i].rotate,
        scale: 0.75,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: EXIT_DELAYS[i] ?? 0,
        },
    }),
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 110,
            damping: 20,
            mass: 0.7,
            delay: i * 0.12,
        },
    }),
};

function WorkCard({
    project,
    index,
}: {
    project: (typeof PROJECTS)[number];
    index: number;
}) {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            style={{ willChange: "transform, opacity", borderTopColor: project.accent }}
            className="group relative h-[280px] overflow-hidden rounded-[20px] border-t-[6px] bg-neutral-100 shadow-xl lg:h-[320px]"
        >
            <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
        </motion.div>
    );
}

export default function PortfolioGridSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollDirRef = useRef<"up" | "down">("down");
    const [phase, setPhase] = useState<"hidden" | "visible">("hidden");

    const isInView = useInView(containerRef, { amount: 0.15, once: false });

    useEffect(() => {
        let lastY = window.scrollY;
        const handleScroll = () => {
            const y = window.scrollY;
            scrollDirRef.current = y > lastY ? "down" : "up";
            lastY = y;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isInView) {
            setPhase("visible");
        } else if (scrollDirRef.current === "up") {
            setPhase("hidden");
        }
    }, [isInView]);

    return (
        <section className="w-full bg-white py-20 font-atyp md:py-28">
            <div ref={containerRef} className="mx-auto max-w-[1550px] px-6 text-center md:px-12">
                <motion.div variants={headerContainer} initial="hidden" animate={phase}>
                    <motion.span
                        variants={headerItem}
                        className="mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700"
                    >
                        Portfolio
                    </motion.span>

                    <motion.h2
                        variants={headerItem}
                        className="text-[32px] font-light leading-[1.2] text-neutral-900 sm:text-[42px] lg:text-[46px]"
                    >
                        Crafted With <span className="font-bold text-brand">CREATIVITY & PRECISION</span>
                    </motion.h2>

                    <motion.p
                        variants={headerItem}
                        className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-500"
                    >
                        Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                        Lorem Ipsum Has Been The Industry&apos;s Standard Dummy Text Ever Since 1966,
                        When Designers At Letraset And James Mosley.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate={phase}
                >
                    {PROJECTS.map((project, i) => (
                        <WorkCard key={project.title} project={project} index={i} />
                    ))}
                </motion.div>

                <motion.div variants={headerItem} initial="hidden" animate={phase} className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                        <button className="btn-sweep relative overflow-hidden rounded-full bg-cta-gradient px-6 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/40">
                            <span className="relative z-10">Get In Touch</span>
                        </button>

                        <button
                            aria-label="Go"
                            className="btn-sweep relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cta-gradient text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:rotate-45 hover:shadow-lg hover:shadow-orange-500/40"
                        >
                            <span className="relative z-10">
                                <ArrowUpRight strokeWidth={2.75} />
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}