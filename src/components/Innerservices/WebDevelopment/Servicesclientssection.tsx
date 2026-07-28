import { motion, type Variants } from "motion/react";

const LOGOS = [
    { src: "/images/logos/Western.png", alt: "Western" },
    { src: "/images/logos/Holdings.png", alt: "Holdings" },
    { src: "/images/logos/Mobiletech.png", alt: "MobileTech" },
    { src: "/images/logos/Reliance.png", alt: "Reliance Insurance Group" },
    { src: "/images/logos/Pandora.png", alt: "Pandora" },
    { src: "/images/logos/Audiowave.png", alt: "AudioWave" },
];

const rowReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: "blur(15px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
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
                className={`flex w-max items-center gap-16 md:gap-24 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
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

export default function ServicesClientsSection() {
    return (
        <section className="sweep-light relative w-full overflow-hidden bg-gradient-to-br from-[#123f24] via-brand to-[#3f9463] bg-[length:200%_200%] py-12 font-atyp animate-gradient-shift md:py-16">
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

            <div className="relative z-[1] mx-auto max-w-6xl px-6 md:px-12">
                <LogoRow direction="left" size="h-10 md:h-12" />
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