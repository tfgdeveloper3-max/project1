import { useEffect, useRef, useState } from "react";
import { DollarSign, Star, ShieldCheck } from "lucide-react";

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

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const reveal = (delay?: string) =>
        inView ? `animate__animated animate__fadeInUp ${delay ?? ""}` : "opacity-0";

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-white py-20 font-atyp md:py-28"
        >
            <div className="mx-auto max-w-[1550px] px-6 md:px-12">
                <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-[1fr_1fr_1.3fr] lg:items-start lg:gap-x-10">
                    <div className="lg:col-span-2">
                        <span
                            className={`mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700 ${reveal()}`}
                        >
                            About Us
                        </span>

                        <h2
                            className={`text-[35px] font-light leading-[1.15] text-neutral-900 sm:text-[40px] lg:text-[47px] ${reveal(
                                "animate__delay-1s"
                            )}`}
                        >
                            Crafting Creative{" "}
                            <span className="font-bold text-brand">SOLUTIONS FOR </span>
                             Modern Brands
                        </h2>
                    </div>

                    <div>
                        <p
                            className={`text-[16px] pt-15 leading-relaxed text-neutral-500 ${reveal(
                                "animate__delay-2s"
                            )}`}
                        >
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                            Industry. Lorem Ipsum Has Been The Industry&apos;s Standard Dummy
                            Text Ever Since 1966, When Designers At Letraset And James Mosley.
                        </p>
                    </div>

                    {/* Column 1: 24/7 card + code image */}
                    <div className={`flex flex-col gap-6 ${reveal("animate__delay-1s")}`}>
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
                                    ↗
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
                    </div>

                    <div className={reveal("animate__delay-2s")}>
                        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-2">
                            <img
                                src="/images/about1.png"
                                alt="Designer working on a laptop"
                                className="h-full max-h-[530px] w-full rounded-[22px] object-cover"
                            />
                        </div>
                    </div>

                    <div className={`flex flex-col gap-8 ${reveal("animate__delay-3s")}`}>
                        {ITEMS.map((item, i) => (
                            <div key={item.title} className="flex gap-5">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                                        {item.icon}
                                    </div>
                                    {i !== ITEMS.length - 1 && (
                                        <div className="mt-2 w-px flex-1 bg-brand/25" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-neutral-900">
                                        {item.title}
                                    </h4>
                                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                                        {item.text}
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
                                <span className="relative z-10">↗</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}