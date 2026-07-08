import { useEffect, useRef } from "react";
import $ from "../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";

type Pin = {
    top: string;
    left: string;
    label?: string;
    tooltip: string;
};

const PINS: Pin[] = [
    { top: "18%", left: "15%", tooltip: "Am Flughafen office" },
    { top: "21%", left: "49%", label: "Am Markt, St.", tooltip: "Am Markt office" },
    { top: "27%", left: "92%", tooltip: "Karl-Liebknecht-Straße office" },
    { top: "60%", left: "81%", tooltip: "Halle-Kasseler-Straße office" },
    { top: "76%", left: "39%", tooltip: "Friedegasse office" },
];

const CONTACT_ITEMS = [
    {
        label: "Call",
        value: "(000) 123 456 789",
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5 4.5c0-.6.5-1 1-1h2c.5 0 .9.3 1 .8l.7 2.6c.1.5 0 1-.4 1.3l-1.3 1.2c1.1 2.3 3 4.2 5.3 5.3l1.2-1.3c.3-.4.8-.5 1.3-.4l2.6.7c.5.1.8.5.8 1v2c0 .6-.5 1-1 1C10.7 18.7 5 13 5 4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <path d="M14.5 6a3.5 3.5 0 0 1 3.5 3.5M14.5 3A6.5 6.5 0 0 1 21 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Email",
        value: "loremipsum132@gmail.com",
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Location",
        value: "Texas, USA",
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4 5.5 9 4l6 1.5 5-1.5v14l-5 1.5L9 18l-5 1.5v-14Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <path d="M9 4v14M15 5.5V19" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="9" cy="10.5" r="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9 12.5v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
];

function MapPinIcon() {
    return (
        <svg viewBox="0 0 24 30" className="h-8 w-8 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 1C6.5 1 2 5.4 2 10.8 2 18 12 27 12 27s10-9 10-16.2C22 5.4 17.5 1 12 1Z"
                fill="currentColor"
            />
            <circle cx="12" cy="10.8" r="3.6" fill="white" />
        </svg>
    );
}

export default function ContactSection() {
    const fieldRefs = useRef<(HTMLElement | null)[]>([]);
    const mapRef = useRef<HTMLDivElement>(null);
    const contactItemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Scroll-triggered reveal, same pattern used across HeroSection / PricingSection / TestimonialsSection
    useEffect(() => {
        const targets = [mapRef.current, ...fieldRefs.current];
        const observers: IntersectionObserver[] = [];

        targets.forEach((el) => {
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

    // jQuery UI tooltip on every map pin, same convention as the ratings tooltip in HeroSection
    useEffect(() => {
        const $mapEl = mapRef.current ? $(mapRef.current) : null;
        if (!$mapEl) return;

        const $pins = $mapEl.find("[data-pin]");
        $pins.tooltip({
            position: { my: "center bottom-8", at: "center top" },
        });

        return () => {
            $pins.each((_: number, el: Element) => {
                const $el = $(el);
                if ($el.data("ui-tooltip")) $el.tooltip("destroy");
            });
        };
    }, []);

    // jQuery UI tooltip on the Call / Email / Location items
    useEffect(() => {
        const $items = contactItemRefs.current
            .filter((el): el is HTMLDivElement => !!el)
            .map((el) => $(el));

        $items.forEach(($item) => {
            $item.tooltip({
                position: { my: "center bottom-10", at: "center top" },
            });
        });

        return () => {
            $items.forEach(($item) => {
                if ($item.data("ui-tooltip")) $item.tooltip("destroy");
            });
        };
    }, []);

    return (
        <section className="relative w-full bg-[#fdfcf7] px-6 py-20 font-atyp md:px-12 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
                <span className="animate__animated animate__fadeInUp mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700">
                    Contact
                </span>

                <h2 className="animate__animated animate__fadeInUp animate__delay-1s text-[36px] font-light leading-[1.1] text-neutral-900 sm:text-[44px] lg:text-[52px]">
                    <span className="font-semibold text-brand">CONNECT</span> With Our Experts
                </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
                {/* Map */}
                <div
                    ref={mapRef}
                    className="opacity-0 relative h-[420px] overflow-hidden rounded-[20px] bg-neutral-100 md:h-[560px]"
                >
                    <img
                        src="/images/Map.png"
                        alt="Map showing our office locations"
                        className="absolute inset-0 h-full w-full select-none object-cover"
                        draggable={false}
                    />

                    {/* You-are-here pulsing dot */}
                    <div
                        data-pin
                        title="You are here"
                        className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-help items-center justify-center rounded-full"
                        style={{ top: "68%", left: "13%" }}
                    >
                        <span className="absolute h-11 w-11 animate-ping rounded-full bg-brand/30" />
                        <span className="relative h-5 w-5 rounded-full bg-brand ring-4 ring-brand/20" />
                    </div>

                    {/* Location pins */}
                    {PINS.map((pin, i) => (
                        <div
                            key={i}
                            className="absolute -translate-x-1/2 -translate-y-full"
                            style={{ top: pin.top, left: pin.left }}
                        >
                            {pin.label && (
                                <span className="mb-1 block w-max -translate-x-1/2 -translate-y-2 rounded-full bg-brand px-4 py-1.5 text-xs font-medium text-white shadow-md">
                                    {pin.label}
                                </span>
                            )}
                            <div data-pin title={pin.tooltip} className="cursor-help text-brand">
                                <MapPinIcon />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <div className="flex flex-col gap-5">
                    <div
                        ref={(el) => { fieldRefs.current[0] = el; }}
                        className="opacity-0 rounded-2xl bg-neutral-100/80"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full rounded-2xl bg-transparent px-6 py-5 text-neutral-700 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-brand/40"
                        />
                    </div>

                    <div
                        ref={(el) => { fieldRefs.current[1] = el; }}
                        className="opacity-0 animate__delay-1s rounded-2xl bg-neutral-100/80"
                    >
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full rounded-2xl bg-transparent px-6 py-5 text-neutral-700 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-brand/40"
                        />
                    </div>

                    <div
                        ref={(el) => { fieldRefs.current[2] = el; }}
                        className="opacity-0 animate__delay-2s flex-1 rounded-2xl bg-neutral-100/80"
                    >
                        <textarea
                            placeholder="Message"
                            rows={5}
                            className="h-full w-full resize-none rounded-2xl bg-transparent px-6 py-5 text-neutral-700 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-brand/40"
                        />
                    </div>

                    <button
                        ref={(el) => { fieldRefs.current[3] = el; }}
                        type="button"
                        className="btn-sweep opacity-0 animate__delay-2s relative mt-2 overflow-hidden rounded-full bg-cta-gradient px-8 py-5 text-base font-medium text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg hover:shadow-pink-500/40"
                    >
                        <span className="relative z-10">Send Now</span>
                    </button>
                </div>
            </div>

            <div className="mx-auto mt-16 flex max-w-6xl flex-col flex-wrap items-center justify-center gap-x-16 gap-y-8 sm:flex-row">
                {CONTACT_ITEMS.map((item, i) => (
                    <div
                        key={item.label}
                        ref={(el) => { contactItemRefs.current[i] = el; }}
                        title={item.label === "Location" ? "Visit us" : `Reach us via ${item.label.toLowerCase()}`}
                        className="flex cursor-help items-center gap-3"
                    >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand/30 text-brand">
                            {item.icon}
                        </span>
                        <div className="text-left">
                            <p className="font-semibold text-neutral-900">{item.label}</p>
                            <p className="text-sm text-neutral-500">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}