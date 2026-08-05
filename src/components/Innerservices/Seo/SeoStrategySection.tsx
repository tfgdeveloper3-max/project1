import { motion, type Variants } from "motion/react";
import {
    Search,
    FileSearch,
    Link2,
    Gauge,
    MapPin,
    LineChart,
} from "lucide-react";

const SEO_INCLUSIONS = [
    {
        icon: Search,
        title: "Keyword Research",
        description: "Deep research to find the exact terms your customers are searching for.",
    },
    {
        icon: FileSearch,
        title: "On-Page Optimization",
        description: "Titles, meta descriptions, headers, and content structured for search and readers.",
    },
    {
        icon: Gauge,
        title: "Technical SEO Audits",
        description: "Site speed, crawlability, and structure fixes that remove hidden ranking blockers.",
    },
    {
        icon: Link2,
        title: "Link Building",
        description: "Quality backlinks earned through outreach — not risky shortcuts that get penalized.",
    },
    {
        icon: MapPin,
        title: "Local SEO",
        description: "Google Business Profile optimization to help nearby customers find you first.",
    },
    {
        icon: LineChart,
        title: "Analytics & Reporting",
        description: "Monthly reports tracking rankings, traffic, and conversions in plain language.",
    },
];

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardItem: Variants = {
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

export default function SeoStrategySection() {
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
                    What's Included
                </motion.span>

                <motion.h2
                    variants={headerItem}
                    className="text-[32px] font-light leading-[1.2] text-neutral-900 sm:text-[38px] lg:text-[42px]"
                >
                    What's Included In Our{" "}
                    <span className="font-semibold text-brand">SEO Strategy</span>
                </motion.h2>

                <motion.p
                    variants={headerItem}
                    className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-500"
                >
                    A Complete Approach That Covers Every Ranking Factor — Technical,
                    On-Page, And Off-Page.
                </motion.p>
            </motion.div>

            <motion.div
                className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={container}
            >
                {SEO_INCLUSIONS.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={feature.title}
                            variants={cardItem}
                            className="group rounded-[22px] bg-[#f5f5f4] p-7 transition-colors duration-500 hover:bg-brand"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white transition-colors duration-500 group-hover:bg-white group-hover:text-brand">
                                <Icon className="h-6 w-6" strokeWidth={1.75} />
                            </div>

                            <h3 className="mt-6 text-lg font-semibold text-neutral-900 transition-colors duration-500 group-hover:text-white">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-500 transition-colors duration-500 group-hover:text-white/85">
                                {feature.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}