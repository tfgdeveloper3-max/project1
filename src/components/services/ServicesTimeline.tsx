import { motion, type Variants } from "motion/react";
import { Target, ClipboardList, Presentation, Lightbulb, ArrowUpRight } from "lucide-react";

const STEPS = [
    {
        number: "01",
        icon: Target,
        title: "Choose A Service",
        description: "Lorem Ipsum Is Simply And Typesetting Industry.",
        position: "up", // icon on top, text below
    },
    {
        number: "02",
        icon: ClipboardList,
        title: "Define Requirements",
        description: "Lorem Ipsum Is Simply And Typesetting Industry.",
        position: "down", // text above, icon below
    },
    {
        number: "03",
        icon: Presentation,
        title: "Request A Meeting",
        description: "Lorem Ipsum Is Simply And Typesetting Industry.",
        position: "up",
    },
    {
        number: "04",
        icon: Lightbulb,
        title: "Final Solution",
        description: "Lorem Ipsum Is Simply And Typesetting Industry.",
        position: "down",
    },
];

const STAGGER = 0.45;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * STAGGER + 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
};

function StepBadgeNumber({ number, index }: { number: string; index: number }) {
    return (
        <div className="absolute -left-1.5 -top-1.5 z-10 h-7 w-7 overflow-hidden rounded-full bg-white shadow-sm">
            {/* Fill that grows from center — "filling" animation */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.5,
                    delay: index * STAGGER,
                    ease: [0.34, 1.56, 0.64, 1], // slight bounce, like a droplet settling
                }}
                className="absolute inset-0 rounded-full bg-[#3F8C5B]"
            />
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * STAGGER + 0.25 }}
                className="relative z-10 flex h-full w-full items-center justify-center text-[11px] font-semibold text-white"
            >
                {number}
            </motion.span>
        </div>
    );
}

function StepIconCircle({ Icon, index }: { Icon: typeof Target; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * STAGGER + 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[86px] w-[86px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
            <StepBadgeNumber number={STEPS[index].number} index={index} />
            <Icon className="h-7 w-7 text-[#3F8C5B]" strokeWidth={1.75} />
        </motion.div>
    );
}

function ConnectorPath() {
    return (
        <svg
            className="pointer-events-none absolute left-0 top-1/2 hidden w-full -translate-y-1/2 md:block"
            style={{ height: 140 }}
            viewBox="0 0 1000 140"
            fill="none"
            preserveAspectRatio="none"
        >
            <motion.path
                d="M 105 43 L 355 100 L 605 43 L 855 100"
                stroke="#9CA89E"
                strokeWidth="1.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
            />
        </svg>
    );
}

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
    const isUp = step.position === "up";
    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`relative z-[1] flex w-[200px] flex-col items-center text-center ${isUp ? "md:mt-0" : "md:mt-16"
                }`}
        >
            {isUp ? (
                <>
                    <StepIconCircle Icon={step.icon} index={index} />
                    <h3 className="mt-4 text-base font-semibold text-neutral-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{step.description}</p>
                </>
            ) : (
                <>
                    <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
                    <p className="mt-1.5 mb-4 text-sm leading-relaxed text-neutral-500">{step.description}</p>
                    <StepIconCircle Icon={step.icon} index={index} />
                </>
            )}
        </motion.div>
    );
}

export default function ProcessSection() {
    return (
        <section className="w-full bg-[#F8F6F6] py-16 font-atyp md:py-20">
            <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
                {/* Badge */}
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-block rounded-full bg-[#D1DCD7] px-5 py-1.5 text-sm font-medium text-neutral-700"
                >
                    Services
                </motion.span>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mt-4 text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl"
                >
                    <span className="text-[#237B43]">Services</span> We're Providing To{" "}
                    <span className="text-[#237B43]">Our Customers</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mx-auto mt-4 max-w-xl text-sm text-neutral-500 md:text-base"
                >
                    Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. L
                </motion.p>

                {/* Steps */}
                <div className="relative mt-20 flex flex-col items-center gap-16 md:mt-24 md:flex-row md:items-start md:justify-between md:gap-4">
                    <ConnectorPath />
                    {STEPS.map((step, i) => (
                        <Step key={step.number} step={step} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: STEPS.length * STAGGER + 0.2 }}
                    className="mt-16 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F2530F] to-[#A83AC7] px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-300 hover:scale-105 md:mt-20"
                >
                    Get In Touch
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </motion.button>
            </div>
        </section>
    );
}