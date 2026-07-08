import { useEffect, useRef } from "react";
import $ from "../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";

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

export default function TestimonialsSection() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const ratingRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        cardRefs.current.forEach((el) => {
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        $(el)
                            .removeClass("opacity-0")
                            .addClass("animate__animated animate__fadeInUp");
                        observer.disconnect();
                    }
                },
                { threshold: 0.2 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);


    useEffect(() => {
        if (!ratingRef.current) return;
        const $rating = $(ratingRef.current);

        $rating.tooltip({
            position: { my: "center bottom-10", at: "center top" },
        });

        return () => {
            if ($rating.data("ui-tooltip")) $rating.tooltip("destroy");
        };
    }, []);

    useEffect(() => {
        const el = trustRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    $(el).effect("highlight", { color: "#d1fae5" }, 1200);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full bg-[#fdfcf7] px-6 py-20 font-atyp md:px-12 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
                <span className="animate__animated animate__fadeInUp mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700">
                    Reviews
                </span>

                <h2 className="animate__animated animate__fadeInUp animate__delay-1s text-[36px] font-light leading-[1.1] text-neutral-900 sm:text-[44px] lg:text-[52px]">
                    What Our <span className="font-semibold text-brand">CLIENTS</span> Are Saying
                </h2>

                <p className="animate__animated animate__fadeInUp animate__delay-2s mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
                    Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem
                    Ipsum Has Been The Industry&apos;s Standard Dummy Text Ever Since 1966, When
                    Designers At Letraset And James Mosley.
                </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 items-center gap-6 md:grid-cols-3">
                {TESTIMONIALS.map((t, i) => (
                    <div
                        key={t.name}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className={[
                            "opacity-0 flex flex-col items-center rounded-[20px] px-8 py-10 text-center transition-transform duration-300",
                            t.featured
                                ? "bg-emerald-50 md:-my-6 md:scale-[1.03] shadow-[0_25px_50px_-20px_rgba(16,94,62,0.25)]"
                                : "border border-neutral-200 bg-white",
                        ].join(" ")}
                    >
                        <img
                            src={t.avatar}
                            alt={t.name}
                            className={[
                                "rounded-full border-2 border-white object-cover shadow-md",
                                t.featured ? "h-24 w-24" : "h-20 w-20",
                            ].join(" ")}
                            draggable={false}
                        />

                        <h3 className="mt-5 text-lg font-bold text-neutral-900">{t.name}</h3>
                        <p className="mt-1 text-sm font-medium text-neutral-500">{t.role}</p>

                        <div className="my-6 h-px w-full max-w-[220px] bg-neutral-200" />

                        <Stars />

                        <p className="mt-6 max-w-[260px] text-sm leading-relaxed text-neutral-500">
                            {t.quote}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-4">
                <div ref={trustRef} className="flex items-center gap-3 rounded-full">
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

                <div ref={ratingRef} className="flex cursor-help items-center gap-2" title="Based on verified customer reviews">
                    <span className="text-base font-bold text-neutral-900">4.9</span>
                    <Stars color="text-brand" size="h-4 w-4" />
                    <span className="text-sm text-neutral-500">Over 2000 Reviews</span>
                </div>
            </div>
        </section>
    );
}