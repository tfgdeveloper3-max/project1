import { useEffect, useRef, useState } from "react";

const SERVICES = [
    {
        number: "01",
        title: "Custom Website",
        description:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966, When Designers At Letraset And James Mosley.",
        filled: true,
    },
    {
        number: "02",
        title: "E-Commerce Solution",
        description:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966, When Designers At Letraset And James Mosley.",
        filled: false,
    },
    {
        number: "03",
        title: "Web/App Solution",
        description:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966, When Designers At Letraset And James Mosley.",
        filled: false,
    },
];

export default function ServicesSection() {
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
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const reveal = (delay?: string) =>
        inView ? `animate__animated animate__fadeInUp ${delay ?? ""}` : "opacity-0";

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-white py-20 font-atyp md:py-28">
            <div className="mx-auto max-w-[1550px] px-6 md:px-12">
                {/* Badge + Heading + Paragraph */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-7">
                        <span
                            className={`mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700 ${reveal()}`}
                        >
                            Services
                        </span>

                        <h2
                            className={`text-[35px] font-light leading-[1.15] text-neutral-900 sm:text-[40px] lg:text-[47px] ${reveal(
                                "animate__delay-1s"
                            )}`}
                        >
                            Transforming Ideas Into{" "}
                            <span className="font-bold text-brand">DIGITAL </span>
                            <span className="font-bold text-brand">SOLUTIONS</span>
                        </h2>
                    </div>

                    <div className="lg:col-span-5">
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
                </div>

                {/* Services list */}
                <div className="mt-16">
                    {SERVICES.map((service, i) => (
                        <div
                            key={service.number}
                            className={`grid grid-cols-1 items-center gap-6 py-10 md:grid-cols-12 md:gap-8 ${i !== 0 ? "border-t-2 border-neutral-400" : ""
                                } ${reveal(`animate__delay-${i + 1}s`)}`}
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
                                        ↗
                                    </span>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}