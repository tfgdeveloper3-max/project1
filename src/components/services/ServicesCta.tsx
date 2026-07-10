import { motion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const container: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const textItem: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const imageReveal: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.85, rotate: -3 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 80, damping: 16, mass: 1, delay: 0.25 },
    },
};

export default function CtaBannerSection() {
    return (
        <section className="w-full bg-white px-6 py-8 font-atyp md:px-12 md:py-10">
            <motion.div
                className="relative mx-auto max-w-[1550px] overflow-visible rounded-[28px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={container}
            >
                {/* background layer — clipped to rounded corners */}
                <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1e5631] via-brand to-[#3f9463] bg-[length:200%_200%] animate-gradient-shift">
                    <motion.div
                        className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#91CD89]/25 blur-3xl"
                        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* content layer — allowed to overflow so image can break out the top */}
                <div className="relative z-10 grid grid-cols-1 items-center gap-6 px-8 py-10 md:grid-cols-2 md:px-14 md:py-12 lg:px-16">
                    <div>
                        <motion.h2
                            variants={textItem}
                            className="text-[28px] font-extrabold leading-[1.25] text-white sm:text-[34px] lg:text-[40px]"
                        >
                            BUILD QUALITY WEBSITES,
                            <br />
                            <span className="font-light">Improve Business And Grow.</span>
                        </motion.h2>

                        <motion.p
                            variants={textItem}
                            className="mt-5 max-w-md text-sm leading-relaxed text-white/80"
                        >
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                            Industry. Lorem Ipsum Has Been The Industry&apos;s James Mosley.
                        </motion.p>

                        <motion.div variants={textItem} className="mt-8 flex items-center gap-3">
                            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                Get In Touch
                            </button>

                            <button
                                aria-label="Go"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-300 hover:scale-110 hover:rotate-45"
                            >
                                <ArrowUpRight strokeWidth={2.75} />
                            </button>
                        </motion.div>
                    </div>

                    {/* image — scaled up, breaks out of the top of the card */}
                    <div className="relative flex justify-center md:justify-end">
                        <motion.div
                            variants={imageReveal}
                            className="relative -mt-20 w-full max-w-[680px] md:-mt-28 md:mr-[-20px] lg:-mt-32"
                        >
                            <motion.div
                                className="pointer-events-none absolute inset-0 rounded-full bg-white/15 blur-3xl"
                                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.img
                                src="/images/Banner.png"
                                alt="Laptop and phone showing a modern website and dashboard app"
                                className="relative w-full select-none object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
                                draggable={false}
                                animate={{ y: [0, -14, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <style>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-shift {
                    animation: gradient-shift 8s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}