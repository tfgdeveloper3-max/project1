import { motion, type Variants } from "motion/react";

const SERVICES = [
    {
        src: "/images/WebsiteDevelopment.png",
        title: "Custom\nWebsite",
        description: "We build fast, responsive websites tailored to your business needs.",
    },
    {
        src: "/images/E-Commerce-Solution.png",
        title: "E-Commerce\nSolution",
        description: "Scalable online stores with seamless payment and inventory systems.",
    },
    {
        src: "/images/Web-App-Solution.png",
        title: "Web App\nSolution",
        description: "Powerful web applications built for performance and user experience.",
    },
    {
        src: "/images/MobileApplication.png",
        title: "Mobile\nApplication",
        description: "Native and cross-platform apps built for performance and scale.",
    },
    {
        src: "/images/WebApp2.png",
        title: "UI/UX\nDesign",
        description: "Intuitive interfaces that delight users and drive engagement.",
    },
    {
        src: "/images/Branding.png",
        title: "Branding\n& Identity",
        description: "Crafting unique brand identities that leave a lasting impression.",
    },
    {
        src: "/images/DigitalMarketing.png",
        title: "Digital\nMarketing",
        description: "Data-driven campaigns that grow your reach and conversions.",
    },
    {
        src: "/images/SEO-Optimization.png",
        title: "SEO\nOptimization",
        description: "Boost your search rankings and drive organic traffic consistently.",
    },
    {
        src: "/images/Social-Media-Marketing.png",
        title: "Social Media\nMarketing",
        description: "Strategic social presence that builds community and brand loyalty.",
    },
    {
        src: "/images/Content-Management.png",
        title: "Content\nManagement",
        description: "Easy-to-manage CMS solutions that put you in control of content.",
    },
    {
        src: "/images/Cloud-Devops.png",
        title: "Cloud &\nDevOps",
        description: "Reliable cloud infrastructure with automated deployment pipelines.",
    },
];

const cardReveal: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.9,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

function ServiceCard({
    src,
    title,
    description,
    index,
}: {
    src: string;
    title: string;
    description: string;
    index: number;
}) {
    return (
        <motion.div
            custom={index}
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="service-card group relative aspect-[4/5] w-full overflow-hidden rounded-3xl"
        >
            <img
                src={src}
                alt={title.replace("\n", " ")}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:bg-black/10" />

            <div className="ripple-layer pointer-events-none absolute inset-0 bg-[#5CB37A]/50" />

            <div className="water-fill relative">
                <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                    <span className="whitespace-pre-line text-[15px] font-semibold leading-snug text-white transition-transform duration-700 ease-out group-hover:scale-105 md:text-base">
                        {title}
                    </span>
                </div>
                <p className="service-desc text-center text-[11px] leading-relaxed text-white/85 md:text-xs">
                    {description}
                </p>
            </div>

            <style>{`
                .water-fill {
                    position: absolute;
                    inset: 0;
                    clip-path: circle(55px at 50% 50%);
                    transition: clip-path 750ms cubic-bezier(0.65, 0, 0.35, 1);
                    background: #368B4D;
                }
                .ripple-layer {
                    clip-path: circle(55px at 50% 50%);
                    transition: clip-path 750ms cubic-bezier(0.65, 0, 0.35, 1) 90ms;
                }
                .service-card:hover .water-fill {
                    clip-path: circle(85% at 50% 50%);
                }
                .service-card:hover .ripple-layer {
                    clip-path: circle(95% at 50% 50%);
                }
                .service-desc {
                    position: absolute;
                    top: calc(50% + 20px);
                    left: 50%;
                    transform: translateX(-50%) translateY(12px);
                    opacity: 0;
                    width: 200px;
                    max-width: calc(100% - 40px);
                    transition: opacity 400ms ease-out, transform 400ms ease-out;
                    transition-delay: 0ms;
                }
                .service-card:hover .service-desc {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                    transition-delay: 550ms;
                }
            `}</style>
        </motion.div>
    );
}

export default function ServicesSection() {
    return (
        <section className="w-full bg-[#FFFEFA] py-16 font-atyp md:py-20">
            <div className="mx-auto max-w-[1200px] px-6 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-block rounded-full bg-[#CEDAD4] px-5 py-1.5 text-sm font-medium text-neutral-700"
                >
                    Services
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mt-4 text-3xl font-bold text-neutral-900 md:text-4xl"
                >
                    <span className="text-[#237B43]">Services</span> We're Providing To{" "}
                    <span className="text-[#237B43]">Our Customers</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mx-auto mt-4 max-w-2xl text-sm text-neutral-500 md:text-base"
                >
                    Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966, When Designers At Letraset And James Mosley.
                </motion.p>

                <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-5">
                    {SERVICES.map((service, i) => (
                        <div
                            key={service.title}
                            className="w-[calc(50%-8px)] md:w-[calc(25%-15px)]"
                        >
                            <ServiceCard {...service} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}