import { motion, type Variants } from "motion/react";

const LOGOS = [
    { src: "/images/logos/Western.png", alt: "Western" },
    { src: "/images/logos/Holdings.png", alt: "Holdings" },
    { src: "/images/logos/Mobiletech.png", alt: "MobileTech" },
    { src: "/images/logos/Reliance.png", alt: "Reliance Insurance Group" },
    { src: "/images/logos/Pandora.png", alt: "Pandora" },
    { src: "/images/logos/Audiowave.png", alt: "AudioWave" },
];

const headerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const headerItem: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
};

const rowReveal: Variants = {
    hidden: { 
        opacity: 0, 
        y: 40, 
        filter: "blur(15px)" 
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3,
        },
    },
};

function LogoRow({
    direction,
    size,
}: {
  direction: "left" | "right";
  size: string;
}) {
    return (
        <motion.div
            variants={rowReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="group relative w-full overflow-hidden"
        >
            <div
                className={`flex w-max items-center gap-16 md:gap-24 ${
                    direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
                } group-hover:[animation-play-state:paused]`}
            >
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                    <img
                        key={`${logo.alt}-${i}`}
                        src={logo.src}
                        alt={logo.alt}
                        className={`${size} w-auto shrink-0 object-contain opacity-50 grayscale transition-all duration-700 ease-out hover:scale-110 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]`}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default function ClientsSection() {
    return (
        <section className="sweep-light relative w-full overflow-hidden bg-gradient-to-br from-[#123f24] via-brand to-[#3f9463] bg-[length:200%_200%] py-16 font-atyp animate-gradient-shift md:py-20">
            <motion.div
                className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#91CD89]/20 blur-3xl"
                animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1.2, 1, 1.2] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-[1] mx-auto max-w-6xl px-6 text-center md:px-12">
                <motion.div
                    variants={headerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.4 }}
                >
                    <motion.span
                        variants={headerItem}
                        className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur-sm"
                    >
                        Trusted Partners
                    </motion.span>

                    <motion.h2
                        variants={headerItem}
                        className="text-2xl font-light text-white sm:text-3xl"
                    >
                        Clients I&apos;ve{" "}
                        <span className="relative font-extrabold text-white">
                          WORKED
                          <span className="absolute inset-0 blur-md text-white/70">WORKED</span>
                        </span>{" "}
                        With
                    </motion.h2>

                    <motion.div
                        variants={headerItem}
                        className="mx-auto mt-4 h-px w-16 origin-left bg-gradient-to-r from-white/60 to-transparent"
                    />
                </motion.div>

                {/* Sirf ek row */}
                <div className="mt-12">
                    <LogoRow direction="left" size="h-10 md:h-12" />
                </div>
            </div>

            <style>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                /* Sweeping Light Effect */
                .sweep-light::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; 
                    width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
                    transform: skewX(-20deg);
                    z-index: 1;
                    animation: sweep 6s ease-in-out infinite;
                }
                
                @keyframes sweep {
                    0% { left: -100%; }
                    100% { left: 200%; }
                }

                .animate-marquee-left {
                    animation: marquee-left 28s linear infinite;
                }
                .animate-marquee-right {
                    animation: marquee-right 32s linear infinite;
                }
                .animate-gradient-shift {
                    animation: gradient-shift 10s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}