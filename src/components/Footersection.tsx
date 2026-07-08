import { useEffect, useRef } from "react";
import $ from "../lib/jquery-setup";
import "jquery-ui-dist/jquery-ui";

const HEADLINE = "Got A Project In Mind? Let's Talk.";

const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/work" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
    { label: "Web Development", href: "/services/web-development" },
    { label: "UX/UI Design", href: "/services/ux-ui-design" },
    { label: "Brand Identity", href: "/services/brand-identity" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
];

const SOCIALS = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://twitter.com" },
];

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function FooterSection() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const revealRefs = useRef<(HTMLElement | null)[]>([]);
    const subscribeRef = useRef<HTMLDivElement>(null);
    const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Word-by-word scroll-triggered reveal for the big headline
    useEffect(() => {
        const el = headlineRef.current;
        if (!el) return;

        const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    words.forEach((word, i) => {
                        setTimeout(() => {
                            $(word).removeClass("opacity-0 translate-y-6").addClass("animate__animated animate__fadeInUp");
                        }, i * 70);
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Scroll-triggered reveal for the columns below, same pattern used across all other sections
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        revealRefs.current.forEach((el) => {
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

    // jQuery UI tooltip on the subscribe field, same convention used elsewhere
    useEffect(() => {
        if (!subscribeRef.current) return;
        const $el = $(subscribeRef.current);
        $el.tooltip({ position: { my: "center bottom-10", at: "center top" } });
        return () => {
            if ($el.data("ui-tooltip")) $el.tooltip("destroy");
        };
    }, []);

    // jQuery UI "bounce" effect on social icons the first time they scroll into view
    useEffect(() => {
        const el = socialRefs.current[0]?.parentElement;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    socialRefs.current.forEach((a, i) => {
                        if (!a) return;
                        setTimeout(() => $(a).effect("bounce", { times: 2, distance: 6 }, 400), i * 90);
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <footer className="relative w-full overflow-hidden bg-neutral-950 px-6 pb-10 pt-20 font-atyp text-neutral-300 md:px-12 lg:pt-28">
            <div className="mx-auto max-w-6xl">
                {/* Big scroll-revealed headline */}
                <h2
                    ref={headlineRef}
                    className="max-w-4xl text-[34px] font-light leading-[1.15] text-white sm:text-[46px] lg:text-[56px]"
                >
                    {HEADLINE.split(" ").map((word, i) => (
                        <span key={i} className="mr-3 inline-block overflow-hidden">
                            <span
                                data-word
                                className="inline-block translate-y-6 opacity-0"
                                style={{ animationDuration: "0.6s" }}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </h2>

                <div
                    ref={(el) => { revealRefs.current[0] = el; }}
                    className="opacity-0 animate__delay-1s mt-8"
                >
                    <a
                        href="mailto:hello@yourbrand.com"
                        className="btn-sweep relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cta-gradient px-7 py-4 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/40"
                    >
                        <span className="relative z-10">Start A Conversation</span>
                        <span className="relative z-10">
                            <ArrowIcon />
                        </span>
                    </a>
                </div>

                {/* Columns */}
                <div className="mt-20 grid grid-cols-1 gap-12 border-t border-white/10 pt-14 md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
                    <div
                        ref={(el) => { revealRefs.current[1] = el; }}
                        className="opacity-0"
                    >
                        <span className="text-2xl font-semibold tracking-wide text-white">YOURBRAND</span>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
                            We partner with ambitious teams to design and build digital products
                            that are as functional as they are memorable — from first sketch to
                            shipped experience.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            {SOCIALS.map((s, i) => (
                                <a
                                    key={s.label}
                                    ref={(el) => { socialRefs.current[i] = el; }}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                                >
                                    <span className="text-xs font-medium">{s.label[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={(el) => { revealRefs.current[2] = el; }}
                        className="opacity-0 animate__delay-1s"
                    >
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
                        <ul className="mt-5 flex flex-col gap-3">
                            {QUICK_LINKS.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        className="group inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                                    >
                                        {l.label}
                                        <span className="max-w-0 overflow-hidden text-brand transition-all duration-300 group-hover:max-w-[16px]">
                                            <ArrowIcon />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        ref={(el) => { revealRefs.current[3] = el; }}
                        className="opacity-0 animate__delay-1s"
                    >
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
                        <ul className="mt-5 flex flex-col gap-3">
                            {SERVICE_LINKS.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        className="group inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                                    >
                                        {l.label}
                                        <span className="max-w-0 overflow-hidden text-brand transition-all duration-300 group-hover:max-w-[16px]">
                                            <ArrowIcon />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        ref={(el) => { revealRefs.current[4] = el; }}
                        className="opacity-0 animate__delay-2s"
                    >
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get Notified</h4>
                        <p className="mt-5 text-sm leading-relaxed text-neutral-400">
                            Subscribe for occasional updates on our latest work and openings.
                        </p>

                        <div
                            ref={subscribeRef}
                            title="We'll never share your email"
                            className="mt-5 flex cursor-help items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5"
                        >
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
                            />
                            <button
                                type="button"
                                className="btn-sweep relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cta-gradient text-white transition-transform duration-300 hover:scale-110"
                                aria-label="Subscribe"
                            >
                                <span className="relative z-10">
                                    <ArrowIcon />
                                </span>
                            </button>
                        </div>

                        <div className="mt-8 space-y-1 text-sm text-neutral-400">
                            <a href="mailto:hello@yourbrand.com" className="block transition-colors hover:text-white">
                                hello@yourbrand.com
                            </a>
                            <a href="tel:+10000000000" className="block transition-colors hover:text-white">
                                (+1) 000 000 0000
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-neutral-500 sm:flex-row">
                    <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <a href="/terms" className="transition-colors hover:text-white">Terms</a>
                        <a href="/privacy" className="transition-colors hover:text-white">Privacy</a>
                        <a href="/style-guide" className="transition-colors hover:text-white">Style Guide</a>
                    </div>

                    <p className="text-neutral-500">Mon–Fri · 10am–7pm</p>
                </div>
            </div>
        </footer>
    );
}