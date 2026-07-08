import { useEffect, useRef } from "react";
import $ from "../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";

const AVATARS = [
    "https://i.pravatar.cc/64?img=12",
    "https://i.pravatar.cc/64?img=32",
    "https://i.pravatar.cc/64?img=47",
];

export default function HeroSection() {
    const badgeRef = useRef<HTMLDivElement>(null);
    const ratingRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

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
        if (!badgeRef.current) return;
        const el = badgeRef.current;
        let angle = 0;
        let frame: number;

        const spin = () => {
            angle = (angle + 0.15) % 360;
            el.style.transform = `rotate(${angle}deg)`;
            frame = requestAnimationFrame(spin);
        };
        frame = requestAnimationFrame(spin);

        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const el = contactRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    $(el).removeClass("opacity-0").addClass("animate__animated animate__fadeInUp");
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full pt-6 overflow-hidden bg-[#ffffff] font-atyp">

            <div className="relative pb-20 md:pb-28 lg:pb-32">
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] bg-brand md:block"
                    style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0% 100%)" }}
                />

                <div className="relative z-10 grid grid-cols-1 gap-10 px-6 pb-0 pt-6 md:grid-cols-2 md:px-12 lg:pt-10">
                    <div className="flex flex-col justify-center">
                        <span className="animate__animated animate__fadeInUp mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700">
                            Welcome To The Future Of Design &amp; Development
                        </span>

                        <h1 className="animate__animated animate__fadeInUp animate__delay-1s text-[44px] font-light leading-[1.08] text-neutral-900 sm:text-[56px] lg:text-[64px]">
                            Building <span className="font-semibold text-brand">STUNNING WEBSITES</span>{" "}
                            &amp; Powerful Solutions
                        </h1>

                        <p className="animate__animated animate__fadeInUp animate__delay-2s mt-6 max-w-lg text-[16px] leading-relaxed text-neutral-500">
                            We Create Visually Stunning, User-Friendly Websites And Digital Solutions
                            That Help Businesses Grow And Stand Out Online.
                        </p>

                        <div className="animate__animated animate__fadeInUp animate__delay-2s mt-8">
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <button className="btn-sweep relative overflow-hidden rounded-full bg-cta-gradient px-6 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/40">
                                        <span className="relative z-10">Get In Touch</span>
                                    </button>

                                    <button
                                        aria-label="Go"
                                        className="btn-sweep relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cta-gradient text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:rotate-45 hover:shadow-lg hover:shadow-orange-500/40"
                                    >
                                        <span className="relative z-10">↗</span>
                                    </button>
                                </div>

                                <div
                                    ref={ratingRef}
                                    className="flex items-center gap-3"
                                    title="Rated by 500+ happy clients"
                                >
                                    <div className="flex -space-x-3">
                                        {AVATARS.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt="Client avatar"
                                                className="h-9 w-9 rounded-full border-2 border-[#f4f4f2] object-cover transition-transform duration-300 hover:z-10 hover:scale-110"
                                            />
                                        ))}
                                    </div>

                                    <div>
                                        <div className="text-brand">★★★★★</div>
                                        <p className="text-sm text-neutral-600">4.8 Rating</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <div className="relative h-32 w-32">
                                    <div ref={badgeRef} className="absolute inset-0">
                                        <svg viewBox="0 0 100 100" className="h-full w-full">
                                            <defs>
                                                <path
                                                    id="circlePath"
                                                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                                />
                                            </defs>

                                            <text fontSize="9.5" fill="#171717" letterSpacing="2">
                                                <textPath href="#circlePath">
                                                    EXPLORE MORE • EXPLORE MORE •
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>

                                    <button
                                        aria-label="Explore more"
                                        className="btn-sweep absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 hover:scale-110 hover:rotate-45"
                                    >
                                        <span className="relative z-10">↗</span>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="relative flex min-h-[520px] items-end justify-center md:min-h-[640px] md:items-end md:justify-end lg:min-h-[720px] animate__animated animate__fadeIn">
                        <img
                            src="/images/Hero-Banner.png"
                            alt="Team member showcasing web, video, branding and rating features"
                            className="animate-hero-float animate__animated animate__fadeIn h-full max-h-[560px] w-auto max-w-none pr-20 select-none object-contain drop-shadow-2xl md:max-h-[640px] lg:max-h-[720px]"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>

            <div
                ref={contactRef}
                className="relative z-10 mx-auto -mt-20 w-[95%] opacity-0 rounded-[28px] border border-[#F3F3F3] bg-white px-8 py-10
                shadow-[0_25px_20px_-15px_rgba(0,0,0,0.15),0_45px_60px_-20px_rgba(0,0,0,0.2)]
                md:-mt-28 lg:-mt-32 lg:w-[80%]"
            >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="md:w-[30%]">
                        <h3 className="text-3xl font-light text-brand">
                            Let&apos;s Start Your Project
                        </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-neutral-500 md:w-[65%]">
                        Share Your Ideas And Requirements With Us, And Our Team Will Help Turn
                        Your Vision Into A Powerful Digital Solution.
                    </p>
                </div>

                <form
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        placeholder="Name Here"
                        className="flex-1 rounded-full bg-neutral-200/70 px-5 py-3 text-sm text-neutral-700 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-brand/40"
                    />

                    <input
                        type="email"
                        placeholder="Email Here"
                        className="flex-1 rounded-full bg-neutral-200/70 px-5 py-3 text-sm text-neutral-700 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-brand/40"
                    />

                    <button
                        type="submit"
                        className="btn-sweep relative flex-1 overflow-hidden whitespace-nowrap rounded-full bg-cta-gradient px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/30"
                    >
                        <span className="relative z-10">Submit Now</span>
                    </button>
                </form>
            </div>
        </section>
    );
}