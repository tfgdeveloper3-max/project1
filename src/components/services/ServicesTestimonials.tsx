import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";

type Testimonial = {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    featured?: boolean;
};

const TESTIMONIALS: Testimonial[] = [
    {
        name: "Priya Sharma",
        role: "Marketing Manager, UrbanCart",
        avatar: "https://i.pravatar.cc/160?img=47",
        quote:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966,",
    },
    {
        name: "Daniel Foster",
        role: "CEO, GlobalVision Inc.",
        avatar: "https://i.pravatar.cc/160?img=12",
        quote:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966,",
        featured: true,
    },
    {
        name: "Anita Patel",
        role: "Owner, Patel Enterprises",
        avatar: "https://i.pravatar.cc/160?img=32",
        quote:
            "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since 1966,",
    },
];

function StarIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1.6l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.9 1-5.9L1.5 7.8l5.9-.8L10 1.6Z" />
        </svg>
    );
}

function Stars({ color = "text-amber-400", size = "h-5 w-5" }: { color?: string; size?: string }) {
    return (
        <div className={`flex items-center justify-center gap-1 ${color}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className={size} />
            ))}
        </div>
    );
}

function PhoneIcon() {
    return (
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 3.5c0-.5.4-.9.9-.9h1.6c.4 0 .8.3.9.7l.6 2.1c.1.4 0 .8-.3 1.1l-1 1c.9 1.8 2.4 3.3 4.2 4.2l1-1c.3-.3.7-.4 1.1-.3l2.1.6c.4.1.7.5.7.9v1.6c0 .5-.4.9-.9.9-6.1 0-11-4.9-11-11Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const cardVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        rotateY: direction > 0 ? 15 : -15,
        scale: 0.9,
    }),
    center: {
        x: 0,
        opacity: 1,
        rotateY: 0,
        scale: 1,
        transition: {
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        rotateY: direction > 0 ? -15 : 15,
        scale: 0.9,
        transition: {
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function TestimonialsSection() {
    const [[current, direction], setCurrent] = useState([0, 1]);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused, current]);

    const paginate = (newDirection: number) => {
        setCurrent([((current + newDirection) + TESTIMONIALS.length) % TESTIMONIALS.length, newDirection]);
    };

    const activeTestimonial = TESTIMONIALS[current];

    return (
        // overflow-x-hidden lagaya hai extra safety ke liye
        <section className="relative w-full overflow-x-hidden bg-[#fdfcf7] px-6 py-20 font-atyp md:px-12 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
                <motion.span
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700"
                >
                    Reviews
                </motion.span>

                <motion.h2
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-[36px] font-light leading-[1.1] text-neutral-900 sm:text-[44px] lg:text-[52px]"
                >
                    What Our <span className="font-semibold text-brand">CLIENTS</span> Are Saying
                </motion.h2>

                <motion.p
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-500"
                >
                    Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem
                    Ipsum Has Been The Industry&apos;s Standard Dummy Text Ever Since 1966, When
                    Designers At Letraset And James Mosley.
                </motion.p>
            </div>

            {/* Slider Container - overflow-hidden se horizontal scroll band hoga */}
            <div
                className="relative mx-auto mt-16 max-w-2xl overflow-hidden"
                style={{ perspective: 1200 }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* mode="wait" se pehle wala card poora chala jayega phir naya aayega */}
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={`w-full flex flex-col items-center rounded-[24px] px-8 py-12 text-center shadow-2xl md:px-12 md:py-16 ${activeTestimonial.featured
                            ? "bg-emerald-50 shadow-[0_25px_50px_-20px_rgba(16,94,62,0.2)]"
                            : "border border-neutral-200 bg-white"
                            }`}
                    >
                        <img
                            src={activeTestimonial.avatar}
                            alt={activeTestimonial.name}
                            className={`rounded-full border-4 border-white object-cover shadow-lg ${activeTestimonial.featured ? "h-28 w-28" : "h-24 w-24"
                                }`}
                            draggable={false}
                        />

                        <h3 className="mt-6 text-xl font-bold text-neutral-900">{activeTestimonial.name}</h3>
                        <p className="mt-1 text-sm font-medium text-neutral-500">{activeTestimonial.role}</p>

                        <div className="my-6 h-px w-full max-w-[220px] bg-neutral-200" />

                        <Stars />

                        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-600">
                            {activeTestimonial.quote}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="mt-10 flex justify-center gap-3">
                {TESTIMONIALS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i === current ? 1 : (i > current ? 1 : -1))}
                        className={`h-3 rounded-full transition-all duration-500 ${current === i ? "w-8 bg-brand" : "w-3 bg-neutral-300 hover:bg-neutral-400"
                            }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                    />
                ))}
            </div>

            {/* Bottom Trust Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-5"
            >
                <div className="flex items-center gap-3 rounded-full px-4 py-2 transition-colors duration-700 hover:bg-emerald-50">
                    <div className="relative h-9 w-9 shrink-0">
                        <img
                            src="https://i.pravatar.cc/72?img=47"
                            alt=""
                            className="h-9 w-9 rounded-full border-2 border-white object-cover"
                            draggable={false}
                        />
                        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white ring-2 ring-[#fdfcf7]">
                            <PhoneIcon />
                        </span>
                    </div>

                    <p className="text-sm text-neutral-600">
                        From Initial Planning To Long-Term Support{" "}
                        <span className="text-neutral-400">–</span>{" "}
                        <a href="#" className="font-medium text-brand underline underline-offset-2">
                            We Build Digital Solutions You Can Trust.
                        </a>
                    </p>
                </div>

                <div className="flex items-center gap-2" title="Based on verified customer reviews">
                    <span className="text-base font-bold text-neutral-900">4.9</span>
                    <Stars color="text-brand" size="h-4 w-4" />
                    <span className="text-sm text-neutral-500">Over 2000 Reviews</span>
                </div>
            </motion.div>
        </section>
    );
}