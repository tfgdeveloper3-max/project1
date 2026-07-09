import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
    {
        image: "/images/Portfolio1.png",
        title: "Web Design & Development",
        description: "...",
        size: "short",
        position: "center",
    },
    {
        image: "/images/Portfolio2.png",
        title: "Video Animation",
        description: "...",
        size: "tall",
        position: "top",
    },
    {
        image: "/images/Portfolio3.png",
        title: "Mobile Apps",
        description: "...",
        size: "tall",
        position: "top",
    },
    {
        image: "/images/Portfolio4.png",
        title: "Logo Design",
        description: "...",
        size: "short",
        position: "center",
    },
];

const SHUFFLE = [
    { x: -260, y: -70, rotate: -18 },
    { x: 240, y: 50, rotate: 14 },
    { x: -220, y: 90, rotate: -12 },
    { x: 260, y: -40, rotate: 20 },
];

// Record<number, number> — TS ko batata hai ke ye object kisi bhi number key se index ho sakta hai
const EXIT_DELAYS: Record<number, number> = {
    2: 0,
    3: 0.15,
    0: 0.4,
    1: 0.55,
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
            delay: i * 0.18,
        },
    }),
};

function ProjectCard({
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
            style={{ willChange: "transform, opacity" }}
            className={`group relative overflow-hidden rounded-[28px] shadow-2xl ${project.size === "tall" ? "h-[420px] lg:h-[560px]" : "h-[280px] lg:h-[380px]"
                }`}
        >
            <img
                src={project.image}
                alt={project.title}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${project.position === "top"
                        ? "object-top"
                        : project.position === "bottom"
                            ? "object-bottom"
                            : "object-center"
                    }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white lg:text-2xl">
                        {project.title}
                    </h3>
                    <button
                        aria-label={`View ${project.title}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:rotate-45"
                    >
                        <ArrowUpRight strokeWidth={2.75} />
                    </button>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/80">
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function PortfolioSection() {
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
                    className="mt-14 grid grid-cols-1 gap-6 text-left lg:grid-cols-2"
                    initial="hidden"
                    animate={phase}
                >
                    <div className="flex flex-col gap-6">
                        <ProjectCard project={PROJECTS[0]} index={0} />
                        <ProjectCard project={PROJECTS[2]} index={2} />
                    </div>
                    <div className="flex flex-col gap-6">
                        <ProjectCard project={PROJECTS[1]} index={1} />
                        <ProjectCard project={PROJECTS[3]} index={3} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}