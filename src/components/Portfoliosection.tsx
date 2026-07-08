import { useEffect, useRef, useState } from "react";

const PROJECTS = [
    {
        image: "/images/Portfolio1.png",
        title: "Web Design & Development",
        description: "...",
        size: "short",
        position: "center",
    },
    {
        image: "/images/Portfolio2.png",
        title: "Video Animation",
        description: "...",
        size: "tall",
        position: "top",
    },
    {
        image: "/images/Portfolio3.png",
        title: "Mobile Apps",
        description: "...",
        size: "tall",
        position: "top",
    },
    {
        image: "/images/Portfolio4.png",
        title: "Logo Design",
        description: "...",
        size: "short",
        position: "center",
    },
];

function ProjectCard({
    project,
    delay,
    active,
}: {
    project: (typeof PROJECTS)[number];
    delay: string;
    active: boolean;
}) {
    return (
        <div
            className={`group relative overflow-hidden rounded-[28px] ${project.size === "tall" ? "h-[420px] lg:h-[560px]" : "h-[280px] lg:h-[380px]"
                } ${active ? `animate__animated animate__fadeInUp ${delay}` : "opacity-0"}`}
        >
            <img
                src={project.image}
                alt={project.title}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${project.position === "top"
                    ? "object-top"
                    : project.position === "bottom"
                        ? "object-bottom"
                        : "object-center"
                    }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white lg:text-2xl">
                        {project.title}
                    </h3>
                    <button
                        aria-label={`View ${project.title}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:rotate-45"
                    >
                        ↗
                    </button>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/80">
                    {project.description}
                </p>
            </div>
        </div>
    );
}

export default function PortfolioSection() {
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
        <section ref={sectionRef} className="w-full bg-white py-20 font-atyp md:py-28">
            <div className="mx-auto max-w-[1550px] px-6 text-center md:px-12">
                <span
                    className={`mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700 ${reveal()}`}
                >
                    Portfolio
                </span>

                <h2
                    className={`text-[32px] font-light leading-[1.2] text-neutral-900 sm:text-[42px] lg:text-[46px] ${reveal(
                        "animate__delay-1s"
                    )}`}
                >
                    Crafted With <span className="font-bold text-brand">CREATIVITY & PRECISION</span>
                </h2>

                <p
                    className={`mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-500 ${reveal(
                        "animate__delay-2s"
                    )}`}
                >
                    Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                    Lorem Ipsum Has Been The Industry&apos;s Standard Dummy Text Ever Since 1966,
                    When Designers At Letraset And James Mosley.
                </p>

                <div className="mt-14 grid grid-cols-1 gap-6 text-left lg:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <ProjectCard project={PROJECTS[0]} delay="animate__delay-1s" active={inView} />
                        <ProjectCard project={PROJECTS[2]} delay="animate__delay-3s" active={inView} />
                    </div>
                    <div className="flex flex-col gap-6">
                        <ProjectCard project={PROJECTS[1]} delay="animate__delay-2s" active={inView} />
                        <ProjectCard project={PROJECTS[3]} delay="animate__delay-4s" active={inView} />
                    </div>
                </div>
            </div>
        </section>
    );
}