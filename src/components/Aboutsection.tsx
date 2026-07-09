import { motion, type Variants } from "motion/react";
import { DollarSign, Star, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useRevealPhase } from "./BlindsReveal";

const ITEMS = [
    {
        icon: <DollarSign size={22} strokeWidth={2.25} />,
        title: "Our Mission",
        text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Ever Since 1966.",
    },
    {
        icon: <Star size={22} strokeWidth={2.25} />,
        title: "Our Vision",
        text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Ever Since 1966.",
    },
    {
        icon: <ShieldCheck size={22} strokeWidth={2.25} />,
        title: "What Sets Us Apart",
        text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Ever Since 1966.",
    },
];

const container: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const iconStyle: Variants = {
    hidden: (i: number) => ({
        backgroundColor: "#ffffff",
        color: "#147237",
        transition: {
            duration: 2.5,                   // Slower reverse
            ease: [0.16, 1, 0.3, 1],        // Ultra-smooth curve
            delay: (2 - i) * 0.4,           // Slow reverse stagger
        },
    }),
    visible: (i: number) => ({
        backgroundColor: "#147237",
        color: "#ffffff",
        transition: {
            duration: 2.5,                   // 2.5 sec mein smoothly change hoga
            ease: [0.16, 1, 0.3, 1],        // Premium buttery smooth ease
            delay: 1.5 + i * 0.6,           // Har icon 0.6 sec baad start hoga
        },
    }),
};

export default function AboutSection() {
    const phase = useRevealPhase();

    return (
        <section className="relative w-full overflow-hidden bg-white py-20 font-atyp md:py-28">
            <motion.div
                className="mx-auto max-w-[1550px] px-6 md:px-12"
                variants={container}
                initial="hidden"
                animate={phase}
            >
                <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-[1fr_1fr_1.3fr] lg:items-start lg:gap-x-10">
                    <motion.div variants={item} className="lg:col-span-2">
                        <span className="mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700">
                            About Us
                        </span>

                        <h2 className="text-[35px] font-light leading-[1.15] text-neutral-900 sm:text-[40px] lg:text-[47px]">
                            Crafting Creative{" "}
                            <span className="font-bold text-brand">SOLUTIONS FOR </span>
                            Modern Brands
                        </h2>
                    </motion.div>

                    <motion.div variants={item}>
                        <p className="text-[16px] pt-15 leading-relaxed text-neutral-500">
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                            Industry. Lorem Ipsum Has Been The Industry&apos;s Standard Dummy
                            Text Ever Since 1966, When Designers At Letraset And James Mosley.
                        </p>
                    </motion.div>

                    {/* Column 1: 24/7 card + code image */}
                    <motion.div variants={item} className="flex flex-col gap-6">
                        <div className="relative overflow-hidden rounded-[28px] bg-brand px-8 py-8 text-white">
                            <h3 className="text-2xl font-medium">24/7 Support</h3>
                            <div className="mt-6 flex items-end justify-between gap-4">
                                <p className="text-sm leading-relaxed text-white/85">
                                    We provide 24/7 service
                                    <br />
                                    to our customers
                                </p>
                                <button
                                    aria-label="Go"
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand transition-transform duration-300 hover:scale-110 hover:rotate-45"
                                >
                                    <ArrowUpRight strokeWidth={2.75} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[28px]">
                            <img
                                src="/images/about2.png"
                                alt="Code and technology"
                                className="h-full max-h-[350px] w-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-2">
                            <img
                                src="/images/about1.png"
                                alt="Designer working on a laptop"
                                className="h-full max-h-[530px] w-full rounded-[22px] object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-8">
                        {ITEMS.map((it, i) => (
                            <div key={it.title} className="flex gap-5">
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        custom={i}
                                        variants={iconStyle}
                                        initial="hidden"
                                        animate={phase}
                                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#147237]"
                                    >
                                        {it.icon}
                                    </motion.div>
                                    {i !== ITEMS.length - 1 && (
                                        <div className="mt-2 w-px flex-1 bg-brand/25" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-neutral-900">
                                        {it.title}
                                    </h4>
                                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                                        {it.text}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-2 flex items-center gap-3">
                            <button className="btn-sweep relative overflow-hidden whitespace-nowrap rounded-full bg-cta-gradient px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/40">
                                <span className="relative z-10">Learn More About</span>
                            </button>

                            <button
                                aria-label="Go"
                                className="btn-sweep relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-cta-gradient text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:rotate-45 hover:shadow-lg hover:shadow-orange-500/40"
                            >
                                <span className="relative z-10"><ArrowUpRight strokeWidth={2.75} /></span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}