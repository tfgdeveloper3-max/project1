import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

const SERVICES = [
    {
        number: "01",
        title: "Custom Website",
        description:
            "Bespoke websites built around your brand, combining striking design, seamless functionality, and intuitive experiences that turn visitors into customers.",
        filled: true,
    },
    {
        number: "02",
        title: "E-Commerce Solution",
        description:
            "High-performance online stores designed to make shopping effortless, strengthen your brand, and turn digital traffic into lasting business.",
        filled: false,
    },
    {
        number: "03",
        title: "Web/App Solution",
        description:
            "Smart, scalable digital platforms and applications engineered for performance, usability, and the evolving needs of modern businesses.",
        filled: false,
    },
];

const headerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.25, delayChildren: 0.05 },
    },
};

const headerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
};

const cardItem: Variants = {
    hidden: {
        opacity: 0,
        y: 80,
        scale: 0.7,
        filter: "blur(8px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function ServicesSection() {
    return (
        <section id="services" className="relative w-full overflow-hidden bg-white py-20 font-atyp md:py-28">
            <div className="mx-auto max-w-[1550px] px-6 md:px-12">
                <motion.div
                    className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start"
                    variants={headerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="lg:col-span-7">
                        <motion.span
                            variants={headerItem}
                            className="mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700"
                        >
                            Services
                        </motion.span>

                        <motion.h2
                            variants={headerItem}
                            className="text-[35px] font-light leading-[1.15] text-neutral-900 sm:text-[40px] lg:text-[47px]"
                        >
                            ALL THE{" "}
                            <span className="font-bold text-brand">DIGITAL </span>
                            <span className="font-bold text-brand">EXPERTISE{" "}</span>
                            UNDER ONE ROOF
                        </motion.h2>
                    </div>

                    <div className="lg:col-span-5">
                        <motion.p
                            variants={headerItem}
                            className="text-[16px] pt-15 leading-relaxed text-neutral-500"
                        >
                            From powerful websites to intelligent applications and distinctive digital identities, we bring creativity, technology, and strategy together to move your brand forward.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Services list */}
                <div className="mt-16">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={service.number}
                            variants={cardItem}
                            initial="hidden"
                            whileInView="visible" // 1 by 1 trigger
                            viewport={{ once: false, amount: 0.2 }} // Thoda sa dikhhte hi start ho jaye
                            className={`grid grid-cols-1 items-center gap-6 py-10 md:grid-cols-12 md:gap-8 ${i !== 0 ? "border-t-2 border-neutral-400" : ""
                                }`}
                        >
                            <div className="md:col-span-3">
                                <span className="text-sm font-semibold text-brand">
                                    {service.number}
                                </span>
                                <h3 className="mt-2 text-[26px] font-bold leading-tight text-neutral-900 lg:text-[30px]">
                                    {service.title}
                                </h3>
                            </div>

                            <div className="md:col-span-6 md:border-l-2 md:border-neutral-400 md:pl-10">
                                <p className="text-[15px] leading-relaxed text-neutral-500">
                                    {service.description}
                                </p>
                            </div>

                            <div className="flex md:col-span-3 md:justify-end">
                                <button
                                    className={`group flex h-36 w-36 shrink-0 flex-col items-center justify-center gap-1 rounded-full text-sm transition-colors duration-300 lg:h-40 lg:w-40 ${service.filled
                                            ? "bg-brand text-white hover:bg-neutral-900"
                                            : "border border-neutral-300 text-neutral-900 hover:border-brand hover:bg-brand hover:text-white"
                                        }`}
                                >
                                    <span className="text-xl transition-transform duration-300 group-hover:rotate-45">
                                        <ArrowUpRight strokeWidth={2.75} />
                                    </span>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}