import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import $ from "../../../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";

type Plan = {
    name: string;
    description: string;
    price: string;
    features: string[];
};

const PLANS: Plan[] = [
    {
        name: "Basic App",
        description: "A Simple, Functional App To Get Your Idea Into Users' Hands",
        price: "$1,999.00",
        features: [
            "Single Platform (iOS Or Android)",
            "Up To 5 Core Screens",
            "Basic Backend Integration",
        ],
    },
    {
        name: "Standard App",
        description: "Cross-Platform App With The Features Users Actually Expect",
        price: "$3,999.00",
        features: [
            "iOS & Android (Cross-Platform)",
            "Push Notifications & Offline Mode",
            "App Store Submission Included",
        ],
    },
    {
        name: "Premium App",
        description: "Full-Featured App With Custom Backend And Ongoing Support",
        price: "$7,999.00",
        features: [
            "Custom Backend & Admin Panel",
            "Biometric Auth & Analytics",
            "3 Months Post-Launch Support",
        ],
    },
];

const DEFAULT_ACTIVE = 1;

function PhoneIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6.5" y="2.5" width="11" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="currentColor" />
            <path
                d="M6 10.2l2.4 2.4L14.2 7"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const cardVariants: Variants = {
    hidden: (i: number) => ({
        opacity: 0,
        x: i === 0 ? -120 : i === 2 ? 120 : 0,
        y: i === 1 ? 90 : 0,
        scale: 0.9,
    }),
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 16,
            mass: 0.9,
            delay: i * 0.15,
        },
    }),
};

const headerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
};

const headerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function MobileAppsPricingSection() {
    const priceTagRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(DEFAULT_ACTIVE);

    useEffect(() => {
        const $tags = priceTagRefs.current
            .filter((el): el is HTMLSpanElement => !!el)
            .map((el) => $(el));

        $tags.forEach(($tag) => {
            $tag.tooltip({
                position: { my: "center bottom-10", at: "center top" },
            });
        });

        return () => {
            $tags.forEach(($tag) => {
                if ($tag.data("ui-tooltip")) $tag.tooltip("destroy");
            });
        };
    }, []);

    return (
        <section className="relative w-full bg-[#f5f5f4] px-6 py-20 font-atyp md:px-12 lg:py-28">
            <motion.div
                className="mx-auto max-w-3xl text-center"
                variants={headerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            >
                <motion.span
                    variants={headerItem}
                    className="mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700"
                >
                    Pricing
                </motion.span>

                <motion.h2
                    variants={headerItem}
                    className="text-[36px] font-light leading-[1.1] text-neutral-900 sm:text-[44px] lg:text-[52px]"
                >
                    App Plans For <span className="font-semibold text-brand">EVERY BUDGET</span>
                </motion.h2>

                <motion.p
                    variants={headerItem}
                    className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-500"
                >
                    From A Simple Single-Platform App To A Full Cross-Platform Product
                    With Custom Backend — Pick The Plan That Fits Your Launch.
                </motion.p>
            </motion.div>

            <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                {PLANS.map((plan, i) => {
                    const isActive = activeIndex === i;

                    return (
                        <motion.div
                            key={plan.name}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.25 }}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(DEFAULT_ACTIVE)}
                            animate={{
                                scale: isActive ? 1.03 : 1,
                                y: isActive ? -16 : 0,
                            }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className={[
                                "flex flex-col rounded-[24px] p-8 transition-colors duration-500",
                                isActive
                                    ? "bg-gradient-to-br from-brand to-emerald-700 text-white shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)]"
                                    : "bg-white text-neutral-900 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.15)]",
                            ].join(" ")}
                        >
                            <div
                                className={[
                                    "flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-500",
                                    isActive ? "bg-white text-brand" : "bg-brand text-white",
                                ].join(" ")}
                            >
                                <PhoneIcon className="h-6 w-6" />
                            </div>

                            <h3 className="mt-6 text-2xl font-normal">{plan.name}</h3>
                            <p
                                className={[
                                    "mt-3 text-sm leading-relaxed transition-colors duration-500",
                                    isActive ? "text-white/85" : "text-neutral-500",
                                ].join(" ")}
                            >
                                {plan.description}
                            </p>

                            <div className="mt-6 flex items-baseline gap-2">
                                <span className="text-[40px] font-medium leading-none">{plan.price}</span>
                                <span
                                    ref={(el) => {
                                        priceTagRefs.current[i] = el;
                                    }}
                                    title="One-time build fee, App Store fees billed separately"
                                    className={[
                                        "cursor-help text-sm transition-colors duration-500",
                                        isActive ? "text-white/80" : "text-neutral-500",
                                    ].join(" ")}
                                >
                                    /One Time
                                </span>
                            </div>

                            <div
                                className={[
                                    "mt-8 flex flex-1 flex-col justify-between rounded-[18px] p-6 transition-colors duration-500",
                                    isActive ? "bg-white text-neutral-900" : "bg-emerald-50",
                                ].join(" ")}
                            >
                                <ul className="flex flex-col gap-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-neutral-700">
                                            <span className="text-brand">
                                                <CheckIcon />
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={[
                                        "btn-sweep relative mt-8 flex w-fit items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]",
                                        isActive
                                            ? "bg-brand text-white hover:shadow-lg hover:shadow-emerald-900/30"
                                            : "bg-cta-gradient text-white shadow-lg shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/40",
                                    ].join(" ")}
                                >
                                    <span className="relative z-10">Get Started With Plan</span>
                                    <span className="relative z-10">↗</span>
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}