import { useEffect, useRef, useState } from "react";

export default function ClientsSection() {
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
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-gradient-to-br from-[#123f24] via-brand to-[#3f9463] py-14 font-atyp md:py-16"
        >
            <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
                <h2 className={`text-2xl font-light text-white sm:text-3xl ${reveal()}`}>
                    Clients I&apos;ve <span className="font-extrabold">WORKED</span> With
                </h2>

                <div className={`mt-10 ${reveal("animate__delay-1s")}`}>
                    <img
                        src="/images/Container.png"
                        alt="Clients we've worked with: Holdings, MobileTech, Western, AudioWave, Pandora, Reliance Insurance Group"
                        className="h-auto w-full opacity-90"
                    />
                </div>
            </div>
        </section>
    );
}