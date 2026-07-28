import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SERVICE_CATEGORIES } from "../data/serviceCategories";

type NavLink = {
    label: string;
    to: string;
};

const NAV_LINKS: NavLink[] = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/#portfolio" },
    { label: "Pricing", to: "/#pricing" },
    { label: "Testimonials", to: "/#testimonials" },
    { label: "About Us", to: "/#about" },
];

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [servicesOpen, setServicesOpen] = useState(false);

    const basePath = (to: string) => to.split("#")[0] || "/";
    const isActive = (to: string) =>
        location.pathname === basePath(to) && (to.includes("#") ? false : true);

    const handleHashClick = (to: string, e: React.MouseEvent) => {
        const [path, hash] = to.split("#");
        if (!hash) return;

        e.preventDefault();
        const targetPath = path || "/";

        if (location.pathname === targetPath) {
            document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(to);
        }
    };

    return (
        <nav className="absolute inset-x-0 top-0 z-20 flex animate__animated animate__fadeInDown items-center justify-between bg-transparent px-6 py-6 md:px-12">
            <Link to="/" className="text-2xl font-semibold tracking-wide text-neutral-900">
                LOGO HERE
            </Link>

            <ul className="hidden items-center gap-9 text-[15px] text-neutral-700 lg:flex">
                {NAV_LINKS.map((link) => {
                    // Special handling for Services -> categorized mega-menu
                    if (link.label === "Services") {
                        return (
                            <li
                                key={link.label}
                                className="group relative"
                                onMouseEnter={() => setServicesOpen(true)}
                                onMouseLeave={() => setServicesOpen(false)}
                            >
                                <Link
                                    to={link.to}
                                    className={`flex cursor-pointer items-center gap-1 transition hover:text-brand ${isActive(link.to) || location.pathname.startsWith("/services/")
                                            ? "text-brand"
                                            : ""
                                        }`}
                                >
                                    {link.label}
                                    <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                    <span
                                        className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand transition-all duration-300 group-hover:w-full ${isActive(link.to) ? "w-full" : "w-0"
                                            }`}
                                    />
                                </Link>

                                <AnimatePresence>
                                    {servicesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute left-1/2 top-full z-30 mt-3 w-[680px] -translate-x-1/2 rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                                        >
                                            <div className="grid grid-cols-3 gap-6">
                                                {SERVICE_CATEGORIES.map((category) => (
                                                    <div key={category.key}>
                                                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-[#237B43]">
                                                            {category.label}
                                                        </p>
                                                        <div className="flex flex-col gap-0.5">
                                                            {category.services.map((service) => (
                                                                <Link
                                                                    key={service.slug}
                                                                    to={`/services/${service.slug}`}
                                                                    onClick={() => setServicesOpen(false)}
                                                                    className="group/item flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-neutral-700 transition-colors duration-200 hover:bg-[#F0F5F1] hover:text-brand"
                                                                >
                                                                    <span>{service.label}</span>
                                                                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" />
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-5 border-t border-neutral-100 pt-4">
                                                <Link
                                                    to="/services"
                                                    onClick={() => setServicesOpen(false)}
                                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#F0F5F1] px-4 py-2.5 text-sm font-medium text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
                                                >
                                                    View All Services
                                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    }

                    return (
                        <li key={link.label} className="group relative">
                            <Link
                                to={link.to}
                                onClick={(e) => handleHashClick(link.to, e)}
                                className={`cursor-pointer transition hover:text-brand ${isActive(link.to) ? "text-brand" : ""
                                    }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand transition-all duration-300 group-hover:w-full ${isActive(link.to) ? "w-full" : "w-0"
                                        }`}
                                />
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="flex items-center gap-3">
                <Link
                    to="/#contact"
                    onClick={(e) => handleHashClick("/#contact", e)}
                    className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md hover:bg-brand hover:text-white"
                >
                    Get In Touch
                </Link>
                <Link
                    to="/#contact"
                    onClick={(e) => handleHashClick("/#contact", e)}
                    aria-label="Go"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:rotate-45 hover:bg-brand hover:text-white"
                >
                    <ArrowUpRight strokeWidth={2.5} />
                </Link>
            </div>
        </nav>
    );
}