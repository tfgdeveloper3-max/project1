import { useEffect, useRef } from "react";
import $ from "../../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";
import { ArrowUpRight } from "lucide-react";

const AVATARS = [
    "https://i.pravatar.cc/64?img=12",
    "https://i.pravatar.cc/64?img=32",
    "https://i.pravatar.cc/64?img=47",
];

export default function ServicesHeroSection() {
    const badgeRef = useRef<HTMLDivElement>(null);
    const ratingRef = useRef<HTMLDivElement>(null);

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
        if (!ratingRef.current) return;
        const $rating = $(ratingRef.current);

        $rating.tooltip({
            position: { my: "center bottom-10", at: "center top" },
        });

        return () => {
            if ($rating.data("ui-tooltip")) $rating.tooltip("destroy");
        };
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-[#E9E9E9] px-6 pb-20 pt-28 font-atyp md:px-12 md:pb-28 md:pt-36 lg:pt-40">
            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
                <span className="animate__animated animate__fadeInUp mb-6 inline-flex w-fit items-center rounded-full bg-white px-5 py-2 text-sm text-neutral-700 shadow-sm">
                    Explore What We Offer
                </span>

                <h1 className="animate__animated animate__fadeInUp animate__delay-1s text-[44px] font-semibold uppercase leading-[1.05] text-neutral-900 sm:text-[64px] lg:text-[76px]">
                    <span className="text-brand">Our</span> <span className="text-black font-light">Services</span>
                </h1>

                <p className="animate__animated animate__fadeInUp animate__delay-2s mt-6 max-w-xl text-[16px] leading-relaxed text-neutral-500">
                    From Strategy To Design, Development, And Ongoing Support — Everything
                    We Offer Is Built To Move Your Business Forward.
                </p>

                <div className="animate__animated animate__fadeInUp animate__delay-2s mt-8 flex flex-wrap items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <button className="btn-sweep relative overflow-hidden rounded-full bg-cta-gradient px-6 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/40">
                            <span className="relative z-10">Get In Touch</span>
                        </button>

                        <button
                            aria-label="Go"
                            className="btn-sweep relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cta-gradient text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:rotate-45 hover:shadow-lg hover:shadow-orange-500/40"
                        >
                            <span className="relative z-10"><ArrowUpRight strokeWidth={2.75} /></span>
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

                        <div className="text-left">
                            <div className="text-brand">★★★★★</div>
                            <p className="text-sm text-neutral-600">4.8 Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* rotating explore badge, anchored to the section corner */}
            <div className="absolute bottom-6 right-6 z-10 md:bottom-10 md:right-10">
                <div className="relative h-32 w-32">
                    <div ref={badgeRef} className="absolute inset-0">
                        <svg viewBox="0 0 100 100" className="h-full w-full">
                            <defs>
                                <path
                                    id="servicesCirclePath"
                                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                />
                            </defs>

                            <text fontSize="9.5" fill="#171717" letterSpacing="2">
                                <textPath href="#servicesCirclePath">
                                    VIEW SERVICES • VIEW SERVICES •
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    <button
                        aria-label="View services"
                        className="btn-sweep absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 hover:scale-110 hover:rotate-45"
                    >
                        <span className="relative z-10"><ArrowUpRight strokeWidth={2.75} /></span>
                    </button>
                </div>
            </div>
        </section>
    );
}