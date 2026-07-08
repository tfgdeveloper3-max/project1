import { useEffect, useRef } from "react";
import $ from "../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";

type Plan = {
    name: string;
    description: string;
    price: string;
    features: string[];
    highlighted?: boolean;
};

const PLANS: Plan[] = [
    {
        name: "Starter Plan",
        description:
            "Perfect For Small Businesses And Startups, Tl Starter Plan Gives You A Clean Website",
        price: "$299.00",
        features: [
            "API & Third-Party Integrations",
            "Custom Design & Development",
            "E-Commerce Or Advanced Features",
        ],
    },
    {
        name: "Professional Plan",
        description:
            "Perfect For Small Businesses And Startups, Tl Starter Plan Gives You A Clean Website",
        price: "$499.00",
        features: [
            "API & Third-Party Integrations",
            "Custom Design & Development",
            "E-Commerce Or Advanced Features",
        ],
        highlighted: true,
    },
    {
        name: "Business Plan",
        description:
            "Perfect For Small Businesses And Startups, Tl Starter Plan Gives You A Clean Website",
        price: "$1,999.00",
        features: [
            "API & Third-Party Integrations",
            "Custom Design & Development",
            "E-Commerce Or Advanced Features",
        ],
    },
];

function MoneyBagIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.5 4h5l1.2 2.2c2.4 1 4.3 3.6 4.3 6.8 0 4.4-4 7.5-8 7.5s-8-3.1-8-7.5c0-3.2 1.9-5.8 4.3-6.8L9.5 4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path d="M10 4 8.7 6.2M14 4l1.3 2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path
                d="M12 10.2v5.6M13.3 11.3c0-.6-.6-1-1.3-1s-1.3.5-1.3 1.1c0 1.6 2.6 1 2.6 2.6 0 .6-.6 1.1-1.3 1.1s-1.3-.4-1.3-1"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
            />
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

export default function PricingSection() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const priceTagRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // Scroll-triggered reveal, same pattern as the contact card in HeroSection
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        cardRefs.current.forEach((el) => {
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        $(el)
                            .removeClass("opacity-0")
                            .addClass("animate__animated animate__fadeInUp");
                        observer.disconnect();
                    }
                },
                { threshold: 0.2 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    // jQuery UI tooltip on the "/One Time" price label, same convention as the ratings tooltip in HeroSection
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
            <div className="mx-auto max-w-3xl text-center">
                <span className="animate__animated animate__fadeInUp mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700">
                    Pricing
                </span>

                <h2 className="animate__animated animate__fadeInUp animate__delay-1s text-[36px] font-light leading-[1.1] text-neutral-900 sm:text-[44px] lg:text-[52px]">
                    Flexible <span className="font-semibold text-brand">PRICING</span> For Every Need
                </h2>

                <p className="animate__animated animate__fadeInUp animate__delay-2s mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
                    Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem
                    Ipsum Has Been The Industry&apos;s Standard Dummy Text Ever Since 1966, When
                    Designers At Letraset And James Mosley.
                </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                {PLANS.map((plan, i) => (
                    <div
                        key={plan.name}
                        ref={(el) => {
                            cardRefs.current[i] = el;
                        }}
                        className={[
                            "opacity-0 flex flex-col rounded-[24px] p-8 transition-transform duration-300",
                            plan.highlighted
                                ? "bg-gradient-to-br from-brand to-emerald-700 text-white md:-my-4 md:scale-[1.03] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)]"
                                : "bg-white text-neutral-900 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.15)]",
                        ].join(" ")}
                    >
                        <div
                            className={[
                                "flex h-14 w-14 items-center justify-center rounded-full",
                                plan.highlighted ? "bg-white text-brand" : "bg-brand text-white",
                            ].join(" ")}
                        >
                            <MoneyBagIcon className="h-6 w-6" />
                        </div>

                        <h3 className="mt-6 text-2xl font-normal">{plan.name}</h3>
                        <p
                            className={[
                                "mt-3 text-sm leading-relaxed",
                                plan.highlighted ? "text-white/85" : "text-neutral-500",
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
                                title="Single payment, no recurring fees"
                                className={[
                                    "cursor-help text-sm",
                                    plan.highlighted ? "text-white/80" : "text-neutral-500",
                                ].join(" ")}
                            >
                                /One Time
                            </span>
                        </div>

                        <div
                            className={[
                                "mt-8 flex flex-1 flex-col justify-between rounded-[18px] p-6",
                                plan.highlighted ? "bg-white text-neutral-900" : "bg-emerald-50",
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
                                    plan.highlighted
                                        ? "bg-brand text-white hover:shadow-lg hover:shadow-emerald-900/30"
                                        : "bg-cta-gradient text-white shadow-lg shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/40",
                                ].join(" ")}
                            >
                                <span className="relative z-10">Get Started With Plan</span>
                                <span className="relative z-10">↗</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}