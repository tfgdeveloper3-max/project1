import { motion, type Variants } from "motion/react";
import {
    Search,
    Lightbulb,
    Pencil,
    RefreshCcw,
    PackageCheck,
} from "lucide-react";

const PROCESS_STEPS = [
    {
        icon: Search,
        title: "Discovery",
        description: "We learn your brand, audience, and competitors before drawing a single line.",
    },
    {
        icon: Lightbulb,
        title: "Concept Exploration",
        description: "Multiple distinct directions, each rooted in a different idea about your brand.",
    },
    {
        icon: Pencil,
        title: "Refinement",
        description: "We narrow to your favorite direction and refine every curve and spacing detail.",
    },
    {
        icon: RefreshCcw,
        title: "Revisions",
        description: "Your feedback shapes the final mark — we iterate until it feels exactly right.",
    },
    {
        icon: PackageCheck,
        title: "Final Delivery",
        description: "Full file package — vector, PNG, favicon, and usage guidelines, ready to use.",
    },
];

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const stepItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const headerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function LogoDesignProcessSection() {
    return (
        <section className="w-full bg-white px-6 py-20 font-atyp md:px-12 lg:py-28">
            <motion.div
                className="mx-auto max-w-3xl text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={container}
            >
                <motion.span
                    variants={headerItem}
                    className="mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700"
                >
                    How We Work
                </motion.span>

                <motion.h2
                    variants={headerItem}
                    className="text-[32px] font-light leading-[1.2] text-neutral-900 sm:text-[38px] lg:text-[42px]"
                >
                    Our Logo Design{" "}
                    <span className="font-semibold text-brand">Process</span>
                </motion.h2>

                <motion.p
                    variants={headerItem}
                    className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-500"
                >
                    A Clear, Collaborative Process That Takes You From First Sketch To
                    Final Files — No Guesswork.
                </motion.p>
            </motion.div>

            <motion.div
                className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={container}
            >
                {PROCESS_STEPS.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={step.title}
                            variants={stepItem}
                            className="group relative rounded-[22px] bg-[#f5f5f4] p-6 transition-colors duration-500 hover:bg-brand"
                        >
                            <span className="text-xs font-semibold text-neutral-400 transition-colors duration-500 group-hover:text-white/70">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white transition-colors duration-500 group-hover:bg-white group-hover:text-brand">
                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                            </div>

                            <h3 className="mt-5 text-base font-semibold text-neutral-900 transition-colors duration-500 group-hover:text-white">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-500 transition-colors duration-500 group-hover:text-white/85">
                                {step.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}