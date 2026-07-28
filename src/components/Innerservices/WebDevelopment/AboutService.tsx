import { motion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const FEATURES = [
    {
        title: "Heading Here",
        description:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Ever Since 1966.",
    },
    {
        title: "Heading Here",
        description:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Ever Since 1966.",
    },
];

const textContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const textItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const img1Variants: Variants = {
    hidden: { x: 120, y: -60, opacity: 0, scale: 0.85, filter: "blur(6px)" },
    visible: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3,
        },
    },
};

const img2Variants: Variants = {
    hidden: { x: -120, y: 60, opacity: 0, scale: 0.85, filter: "blur(6px)" },
    visible: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.5, 
        },
    },
};

export default function ServicesAboutSection() {
    return (
        <section className="relative w-full bg-[#fdfcf7] px-6 py-20 font-atyp md:px-12 lg:py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
                {/* Text Side */}
                <motion.div
                    variants={textContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <motion.span
                        variants={textItem}
                        className="mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700"
                    >
                        Services
                    </motion.span>

                    <motion.h2
                        variants={textItem}
                        className="text-[32px] font-light leading-[1.2] text-neutral-900 sm:text-[38px] lg:text-[42px]"
                    >
                        Powerful Custom{" "}
                        <span className="font-semibold text-brand">Website Development</span>{" "}
                        Take Control Of Your Website
                    </motion.h2>

                    <motion.p
                        variants={textItem}
                        className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-500"
                    >
                        Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                        Industry. Lorem Ipsum Has Been The Industry&apos;s Standard Dummy Text
                        Ever Since 1966, When Designers At Letraset And James Mosley, The
                        Librarian At St Bride Printing Library In London, Took A 1914 Cicero
                        Translation And Scrambled It To Make Dummy Text For Letraset&apos;s
                        Body Type Sheets. It Has Survived Not Only Many Decades, But Also The
                        Leap Into Electronic Typesetting, Remaining Essentially Unchanged.
                    </motion.p>

                    <motion.div variants={textItem} className="mt-8 flex items-center gap-2">
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
                    </motion.div>

                    <motion.div variants={textItem} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {FEATURES.map((f) => (
                            <div key={f.title}>
                                <h3 className="font-semibold text-neutral-900">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <div className="relative mx-auto aspect-[4/5] w-full max-w-md md:max-w-none">
                    <motion.img
                        src="/images/Services1.png"
                        alt="Modern responsive website displayed across monitor, laptop, and phone in a tech studio"
                        variants={img1Variants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        className="absolute right-0 top-0 w-[72%] rounded-[20px] border-4 border-white object-cover shadow-2xl"
                        draggable={false}
                    />
                    <motion.img
                        src="/images/Services2.png"
                        alt="Developer writing code on a laptop with data displays in the background"
                        variants={img2Variants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        className="absolute bottom-0 left-0 z-10 w-[55%] rounded-[20px] border-4 border-white object-cover shadow-2xl"
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    );
}