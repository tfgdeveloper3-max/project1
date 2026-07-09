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

// import { useEffect, useRef, useState } from "react";

// const PROJECTS = [
//     {
//         image: "/images/Portfolio1.png",
//         title: "Web Design & Development",
//         description: "We craft responsive, high-performing websites tailored to your brand's identity and goals.",
//     },
//     {
//         image: "/images/Portfolio2.png",
//         title: "Video Animation",
//         description: "Engaging motion graphics and animated stories that bring your brand to life on screen.",
//     },
//     {
//         image: "/images/Portfolio3.png",
//         title: "Mobile Apps",
//         description: "Intuitive, native-feeling mobile experiences built for performance across every device.",
//     },
//     {
//         image: "/images/Portfolio4.png",
//         title: "Logo Design",
//         description: "Distinctive, memorable brand marks designed to make a lasting first impression.",
//     },
// ];

// function AccordionCard({
//     project,
//     width,
//     isHovered,
//     isDimmed,
//     onEnter,
//     onLeave,
//     delay,
//     active,
// }: {
//     project: (typeof PROJECTS)[number];
//     width: number;
//     isHovered: boolean;
//     isDimmed: boolean;
//     onEnter: () => void;
//     onLeave: () => void;
//     delay: string;
//     active: boolean;
// }) {
//     return (
//         <div
//             onMouseEnter={onEnter}
//             onMouseLeave={onLeave}
//             style={{ width: `${width}%` }}
//             className={`group relative h-[420px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[28px] transition-[width] duration-500 ease-in-out lg:h-[560px] ${
//                 active ? `animate__animated animate__fadeInUp ${delay}` : "opacity-0"
//             }`}
//         >
//             <img
//                 src={project.image}
//                 alt={project.title}
//                 className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ${
//                     isHovered ? "scale-105 brightness-100" : isDimmed ? "scale-100 brightness-[0.55]" : "scale-100 brightness-100"
//                 }`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

//             <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 overflow-hidden p-7">
//                 <div className="flex items-center justify-between gap-4">
//                     <h3 className="truncate text-xl font-semibold text-white lg:text-2xl">
//                         {project.title}
//                     </h3>
//                     <button
//                         aria-label={`View ${project.title}`}
//                         className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand transition-transform duration-300 ${
//                             isHovered ? "rotate-45" : ""
//                         }`}
//                     >
//                         ↗
//                     </button>
//                 </div>

//                 <p
//                     className={`max-w-sm text-sm leading-relaxed text-white/80 transition-all duration-500 ease-in-out ${
//                         isHovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
//                     }`}
//                 >
//                     {project.description}
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default function PortfolioSection() {
//     const sectionRef = useRef<HTMLDivElement>(null);
//     const [inView, setInView] = useState(false);
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//     useEffect(() => {
//         const el = sectionRef.current;
//         if (!el) return;

//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setInView(true);
//                     observer.disconnect();
//                 }
//             },
//             { threshold: 0.1 }
//         );

//         observer.observe(el);
//         return () => observer.disconnect();
//     }, []);

//     const reveal = (delay?: string) =>
//         inView ? `animate__animated animate__fadeInUp ${delay ?? ""}` : "opacity-0";

//     const n = PROJECTS.length;
//     const expandedWidth = 42;
//     const collapsedWidth = (100 - expandedWidth) / (n - 1);

//     const getWidth = (index: number) => {
//         if (hoveredIndex === null) return 100 / n;
//         return hoveredIndex === index ? expandedWidth : collapsedWidth;
//     };

//     return (
//         <section ref={sectionRef} className="w-full bg-white py-20 font-atyp md:py-28">
//             <div className="mx-auto max-w-[1550px] px-6 text-center md:px-12">
//                 <span
//                     className={`mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700 ${reveal()}`}
//                 >
//                     Portfolio
//                 </span>

//                 <h2
//                     className={`text-[32px] font-light leading-[1.2] text-neutral-900 sm:text-[42px] lg:text-[46px] ${reveal(
//                         "animate__delay-1s"
//                     )}`}
//                 >
//                     Crafted With <span className="font-bold text-brand">CREATIVITY & PRECISION</span>
//                 </h2>

//                 <p
//                     className={`mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-500 ${reveal(
//                         "animate__delay-2s"
//                     )}`}
//                 >
//                     Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
//                     Lorem Ipsum Has Been The Industry&apos;s Standard Dummy Text Ever Since 1966,
//                     When Designers At Letraset And James Mosley.
//                 </p>

//                 {/* Desktop: hover-accordion row */}
//                 <div className="mt-14 hidden gap-4 lg:flex">
//                     {PROJECTS.map((project, i) => (
//                         <AccordionCard
//                             key={project.title}
//                             project={project}
//                             width={getWidth(i)}
//                             isHovered={hoveredIndex === i}
//                             isDimmed={hoveredIndex !== null && hoveredIndex !== i}
//                             onEnter={() => setHoveredIndex(i)}
//                             onLeave={() => setHoveredIndex(null)}
//                             delay={`animate__delay-${i + 1}s`}
//                             active={inView}
//                         />
//                     ))}
//                 </div>

//                 {/* Mobile / tablet fallback: stacked grid, no hover-expand */}
//                 <div className="mt-14 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:hidden">
//                     {PROJECTS.map((project, i) => (
//                         <div
//                             key={project.title}
//                             className={`group relative h-[280px] overflow-hidden rounded-[28px] ${
//                                 inView ? `animate__animated animate__fadeInUp animate__delay-${i + 1}s` : "opacity-0"
//                             }`}
//                         >
//                             <img
//                                 src={project.image}
//                                 alt={project.title}
//                                 className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
//                             <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
//                                 <div className="flex items-center justify-between gap-4">
//                                     <h3 className="text-xl font-semibold text-white">{project.title}</h3>
//                                     <button
//                                         aria-label={`View ${project.title}`}
//                                         className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:rotate-45"
//                                     >
//                                         ↗
//                                     </button>
//                                 </div>
//                                 <p className="max-w-sm text-sm leading-relaxed text-white/80">
//                                     {project.description}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }