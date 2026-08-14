import { useEffect, useRef, useState } from "react";
import $ from "../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";
import { submitLead } from "../lib/leadApi";

const CONTACT_ITEMS = [
    {
        label: "Call",
        value: "(626) 740-1517",
        href: "tel:+16267401517",
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
        value: "support@webleedigital.com",
        href: "mailto:support@webleedigital.com",
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Location",
        value: "Weblee Digital Contact Information 5101 Santa Monica Blvd Ste 8 Los Angeles CA 90029",
        href: null,
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


type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
    const fieldRefs = useRef<(HTMLElement | null)[]>([]);
    const mapRef = useRef<HTMLDivElement>(null);
    const formCardRef = useRef<HTMLDivElement>(null);
    const contactItemRefs = useRef<(HTMLElement | null)[]>([]);

    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const targets = [mapRef.current, formCardRef.current];
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

    useEffect(() => {
        const $items = contactItemRefs.current
            .filter((el): el is HTMLElement => !!el)
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

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email) {
            setStatus("error");
            setErrorMsg("Please fill in your name and email.");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            await submitLead({
                name: form.name,
                email: form.email,
                phone_number: form.phone,
                message: form.message,
            });
            setStatus("success");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        }
    };

    return (
        <section id="contact" className="relative w-full bg-[#fdfcf7] px-6 py-20 font-atyp md:px-12 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
                <span className="animate__animated animate__fadeInUp mb-6 inline-flex w-fit items-center rounded-full bg-neutral-200/70 px-5 py-2 text-sm text-neutral-700">
                    Contact
                </span>

                <h2 className="animate__animated animate__fadeInUp animate__delay-1s text-[36px] font-light leading-[1.1] text-neutral-900 sm:text-[44px] lg:text-[52px]">
                    <span className="font-semibold text-brand">Discuss
                    </span> Your Ideas With Us
                </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
                {/* Map */}
                <div
                    ref={mapRef}
                    className="opacity-0 relative h-[420px] overflow-hidden rounded-[20px] bg-neutral-100 md:h-[560px]"
                >
                    <img
                        src="/images/Map.jpg"
                        alt="Map showing our office locations"
                        className="absolute inset-0 h-full w-full select-none object-cover"
                        draggable={false}
                    />
                </div>

                {/* Form card */}
                <div
                    ref={formCardRef}
                    className="opacity-0 flex flex-col justify-center rounded-[20px] bg-gradient-to-br from-[#5a9a6a] via-brand to-[#12351f] p-10 md:h-[560px] lg:p-14"
                >
                    <h3 className="mb-9 text-[28px] font-semibold leading-tight text-white lg:text-[32px]">
                        Have a Vision? Let's Give It a Digital Home.
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div
                            ref={(el) => { fieldRefs.current[0] = el; }}
                            className="border-b border-white/35 pb-3"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange("name")}
                                required
                                className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                            />
                        </div>

                        <div
                            ref={(el) => { fieldRefs.current[1] = el; }}
                            className="border-b border-white/35 pb-3"
                        >
                            <input
                                type="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange("email")}
                                required
                                className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                            />
                        </div>

                        <div
                            ref={(el) => { fieldRefs.current[2] = el; }}
                            className="border-b border-white/35 pb-3"
                        >
                            <input
                                type="tel"
                                placeholder="Phone number"
                                value={form.phone}
                                onChange={handleChange("phone")}
                                className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                            />
                        </div>

                        <div
                            ref={(el) => { fieldRefs.current[3] = el; }}
                            className="border-b border-white/35 pb-3"
                        >
                            <input
                                type="text"
                                placeholder="Message"
                                value={form.message}
                                onChange={handleChange("message")}
                                className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                            />
                        </div>

                        <button
                            ref={(el) => { fieldRefs.current[4] = el as unknown as HTMLElement; }}
                            type="submit"
                            disabled={status === "loading"}
                            className="btn-sweep relative mt-4 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <span className="relative z-10">
                                {status === "loading" ? "Sending..." : "Send now"}
                            </span>
                        </button>

                        {status === "success" && (
                            <p className="text-sm font-medium text-white">
                                Thanks! We've received your message and will be in touch soon.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-sm font-medium text-red-100">{errorMsg}</p>
                        )}
                    </form>
                </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
                {CONTACT_ITEMS.map((item, i) => {
                    const content = (
                        <>
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/30 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                                {item.icon}
                            </span>
                            <div className="text-left">
                                <p className="font-semibold text-neutral-900">{item.label}</p>
                                <p className="text-sm leading-snug text-neutral-500 transition-colors duration-300 group-hover:text-brand">
                                    {item.value}
                                </p>
                            </div>
                        </>
                    );

                    if (item.href) {
                        return (
                            <a
                                key={item.label}
                                ref={(el) => { contactItemRefs.current[i] = el; }}
                                href={item.href}
                                title={`Reach us via ${item.label.toLowerCase()}`}
                                className="group flex cursor-pointer items-start justify-center gap-3 sm:items-center"
                            >
                                {content}
                            </a>
                        );
                    }

                    return (
                        <div
                            key={item.label}
                            ref={(el) => { contactItemRefs.current[i] = el; }}
                            title="Visit us"
                            className="group flex cursor-help items-start justify-center gap-3 sm:items-center"
                        >
                            {content}
                        </div>
                    );
                })}
            </div>
        </section >
    );
}