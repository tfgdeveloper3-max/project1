import { useEffect, useRef, useState } from "react";

export default function CtaBannerSection() {
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
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const reveal = (delay?: string) =>
        inView ? `animate__animated animate__fadeInUp ${delay ?? ""}` : "opacity-0";

    return (
        <section ref={sectionRef} className="w-full bg-white px-6 py-14 font-atyp md:px-12 md:py-20">
            <div
                className="relative mx-auto max-w-[1550px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1e5631] via-brand to-[#3f9463]"
            >
                <div className="grid grid-cols-1 items-center gap-8 px-8 py-14 md:grid-cols-2 md:px-14 md:py-16 lg:px-16">
                    <div className="relative z-10">
                        <h2
                            className={`text-[28px] font-extrabold leading-[1.25] text-white sm:text-[34px] lg:text-[40px] ${reveal()}`}
                        >
                            BUILD QUALITY WEBSITES,
                            <br />
                            <span className="font-light">Improve Business And Grow.</span>
                        </h2>

                        <p
                            className={`mt-5 max-w-md text-sm leading-relaxed text-white/80 ${reveal(
                                "animate__delay-1s"
                            )}`}
                        >
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                            Industry. Lorem Ipsum Has Been The Industry&apos;s James Mosley.
                        </p>

                        <div
                            className={`mt-8 flex items-center gap-3 ${reveal(
                                "animate__delay-2s"
                            )}`}
                        >
                            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                Get In Touch
                            </button>

                            <button
                                aria-label="Go"
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-300 hover:scale-110 hover:rotate-45"
                            >
                                ↗
                            </button>
                        </div>
                    </div>

                    <div className={`relative flex justify-center md:justify-end ${reveal("animate__delay-1s")}`}>
                        <img
                            src="/images/Banner.png"
                            alt="Laptop and phone showing a modern website and dashboard app"
                            className="w-full max-w-[560px] select-none object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}