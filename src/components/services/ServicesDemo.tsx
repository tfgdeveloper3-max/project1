"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, LayoutGrid } from "lucide-react";

const TAB_GROUPS = [
    {
        key: "web-app",
        label: "Websites & Apps",
        services: ["Custom Website", "E-commerce Solution", "Web/App Solution", "Mobile Apps"],
    },
    {
        key: "design-media",
        label: "Design & Media",
        services: ["Video Animation", "Branding and Design", "Logo Design"],
    },
    {
        key: "marketing",
        label: "Marketing & Content",
        services: ["SEO", "Content Writing", "Social Media Management & Marketing", "Digital Marketing Services"],
    },
];

const DEMOS = [
    // ===== Custom Website =====
    { service: "Custom Website", title: "Reviv Juice — Fresh & Pure Can", image: "/images/CustomWebsite1.png", link: "#" },
    { service: "Custom Website", title: "Volume — Discover Your Style", image: "/images/CustomWebsite2.jpg", link: "#" },
    { service: "Custom Website", title: "Zalsay — Analytics Platform", image: "/images/CustomWebsite3.jpg", link: "#" },

    // ===== E-commerce Solution =====
    { service: "E-commerce Solution", title: "Leaf — Natural Skincare Store", image: "/images/EcommerceSolution1.jpg", link: "#" },
    { service: "E-commerce Solution", title: "Cosmetic Store — Beauty Essentials", image: "/images/EcommerceSolution2.jpg", link: "#" },
    { service: "E-commerce Solution", title: "Leaf — Skincare Collection", image: "/images/EcommerceSolution3.jpg", link: "#" },

    // ===== Web/App Solution =====
    { service: "Web/App Solution", title: "PropEsta — Real Estate Dashboard", image: "/images/WebApp1.png", link: "#" },
    { service: "Web/App Solution", title: "MedDash — Healthcare Management", image: "/images/WebApp2.png", link: "#" },
    { service: "Web/App Solution", title: "Axiom — AI Homework Assistant", image: "/images/WebApp3.png", link: "#" },

    // ===== Mobile Apps =====
    { service: "Mobile Apps", title: "Creative Sprint — Learning App", image: "/images/MobileApps1.jpg", link: "#" },
    { service: "Mobile Apps", title: "Scenario — AI Meeting Assistant", image: "/images/MobileApps2.jpg", link: "#" },
    { service: "Mobile Apps", title: "CargoX — Logistics Tracking App", image: "/images/MobileApps3.jpg", link: "#" },

    { service: "Video Animation", title: "Product Launch Explainer", image: "/images/Video-Animation-1.jpg", link: "#" },
    { service: "Video Animation", title: "Brand Story Animation", image: "/images/Video-Animation-2.jpg", link: "#" },
    { service: "Video Animation", title: "Brand Design Animation", image: "/images/Video-Animation-3.jpg", link: "#" },
    { service: "Branding and Design", title: "Full Brand Identity Kit", image: "/images/Branding-Design-1.jpg", link: "#" },
    { service: "Branding and Design", title: "Packaging & Print Design", image: "/images/Branding-Design-2.jpg", link: "#" },
    { service: "Branding and Design", title: "Packaging & Print Design", image: "/images/Branding-Design-3.jpg", link: "#" },
    { service: "Logo Design", title: "Minimal Logo Concept", image: "/images/Logo-Design-1.jpg", link: "#" },
    { service: "Logo Design", title: "Wordmark & Icon Set", image: "/images/Logo-Design-2.jpg", link: "#" },
    { service: "Logo Design", title: "Elite & Icon Set", image: "/images/Logo-Design-3.jpg", link: "#" },

    { service: "SEO", title: "Organic Growth Case Study", image: "/images/SEO-1.png", link: "#" },
    { service: "SEO", title: "Organic Case Study", image: "/images/SEO-2.png", link: "#" },
    { service: "SEO", title: "Organic Growth  Study", image: "/images/SEO-3.png", link: "#" },

    { service: "Content Writing", title: "Blog & Editorial Content", image: "/images/Content-Writing-1.png", link: "#" },
    { service: "Content Writing", title: "Blog & Editorial Content", image: "/images/Content-Writing-2.png", link: "#" },
    { service: "Content Writing", title: "Blog & Editorial Content", image: "/images/Content-Writing-3.png", link: "#" },

    { service: "Social Media Management & Marketing", title: "Social Campaign Highlights", image: "/images/Social-Marketing-1.png", link: "#" },
    { service: "Social Media Management & Marketing", title: "Social Campaign Highlights", image: "/images/Social-Marketing-2.png", link: "#" },
    { service: "Social Media Management & Marketing", title: "Social Campaign Highlights", image: "/images/Social-Marketing-3.png", link: "#" },

    { service: "Digital Marketing Services", title: "Multi-Channel Ad Campaign", image: "/images/DigitalMarketingServices-1.png", link: "#" },
    { service: "Digital Marketing Services", title: "Multi-Channel Ad Campaign", image: "/images/DigitalMarketingServices-2.png", link: "#" },
    { service: "Digital Marketing Services", title: "Multi-Channel Ad Campaign", image: "/images/DigitalMarketingServices-3.png", link: "#" },
];


function DemoCard({ demo, index }: { demo: (typeof DEMOS)[number]; index: number }) {
    return (
        <motion.a
            href={demo.link}
            layout
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
            <img
                src={demo.image}
                alt={demo.title}
                className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#237B43]/90 via-[#237B43]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Category tag */}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-semibold text-[#237B43] shadow-sm opacity-0 transition-all duration-500 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                {demo.service}
            </span>

            {/* Title + View link */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 opacity-0 transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-base font-semibold leading-snug text-white">{demo.title}</h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F2530F] via-[#DB1B3F] to-[#B23FC9] text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
            </div>
        </motion.a>
    );
}


export default function ServicesPortfolioSection() {
    const [activeTab, setActiveTab] = useState(TAB_GROUPS[0].key);
    const [activeFilter, setActiveFilter] = useState("All");

    const currentGroup = TAB_GROUPS.find((g) => g.key === activeTab)!;

    const visibleDemos = useMemo(() => {
        const inGroup = DEMOS.filter((d) => currentGroup.services.includes(d.service));
        if (activeFilter === "All") return inGroup;
        return inGroup.filter((d) => d.service === activeFilter);
    }, [activeTab, activeFilter, currentGroup]);

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        setActiveFilter("All");
    };

    return (
        <section className="w-full bg-[#FFFEFA] py-16 font-atyp md:py-20">
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                {/* Header */}
                <div className="text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block rounded-full bg-[#CEDAD4] px-5 py-1.5 text-sm font-medium text-neutral-700"
                    >
                        Our Work
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-4 text-3xl font-bold text-neutral-900 md:text-4xl"
                    >
                        See Our <span className="text-[#237B43]">Services</span> In Action
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mx-auto mt-3 max-w-xl text-sm text-neutral-500"
                    >
                        Real demos and live examples from every service we offer — pick a category and explore.
                    </motion.p>
                </div>

                {/* Top Tabs */}
                <div className="mt-10 flex justify-center">
                    <div className="relative flex gap-8 border-b border-[#D1DCD7]">
                        {TAB_GROUPS.map((group) => {
                            const isActive = group.key === activeTab;
                            return (
                                <button
                                    key={group.key}
                                    onClick={() => handleTabChange(group.key)}
                                    className="relative whitespace-nowrap pb-4 text-sm font-semibold transition-colors duration-300 md:text-[15px]"
                                    style={{ color: isActive ? "#237B43" : "#9CA3AF" }}
                                >
                                    {group.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="portfolio-tab-underline"
                                            className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] rounded-full bg-[#237B43]"
                                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Body: sidebar + grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] md:gap-10">
                    {/* Sidebar filters */}
                    <div className="flex flex-row flex-wrap gap-2.5 md:flex-col">
                        {/* All button */}
                        <button
                            onClick={() => setActiveFilter("All")}
                            className="rounded-2xl px-5 py-3 text-left text-sm font-semibold text-white shadow-md shadow-[#237B43]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#237B43]/30"
                            style={{
                                background:
                                    activeFilter === "All"
                                        ? "#3B8C4E"
                                        : "#DCEBE1",
                                color: activeFilter === "All" ? "#FFFFFF" : "#237B43",
                                boxShadow: activeFilter === "All" ? "0 8px 25px rgba(35,123,67,0.25)" : "none",
                            }}
                        >
                            <span className="flex items-center gap-2.5">
                                <LayoutGrid className="h-4 w-4" />
                                All
                            </span>
                        </button>

                        {currentGroup.services.map((service, i) => {
                            const isActive = activeFilter === service;
                            return (
                                <motion.button
                                    key={service}
                                    onClick={() => setActiveFilter(service)}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: (i + 1) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                    className="rounded-2xl border px-5 py-3 text-left text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        borderColor: isActive ? "#237B43" : "#E5E7EB",
                                        backgroundColor: isActive ? "#DCF2E3" : "#FFFFFF",
                                        color: isActive ? "#237B43" : "#6B7280",
                                        boxShadow: isActive ? "0 4px 15px rgba(35,123,67,0.1)" : "0 2px 8px rgba(0,0,0,0.03)",
                                    }}
                                >
                                    {service}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Demo grid */}
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeTab + activeFilter}
                            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                        >
                            {visibleDemos.length > 0 ? (
                                visibleDemos.map((demo, i) => (
                                    <DemoCard key={demo.title} demo={demo} index={i} />
                                ))
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-16 text-center text-sm text-neutral-400"
                                >
                                    No demos added yet for this category.
                                </motion.p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}