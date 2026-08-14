import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";

type NavLink = {
    label: string;
    to: string;
};

const NAV_LINKS: NavLink[] = [
    { label: "Home", to: "/#home" },
    { label: "About Us", to: "/#about" },
    { label: "Services", to: "/#services" },
    { label: "Portfolio", to: "/#portfolio" },
    { label: "Pricing", to: "/#pricing" },
    { label: "Testimonials", to: "/#testimonials" },
];

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const { openModal } = useContactModal();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <nav
            className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-500 md:px-12 ${scrolled
                ? "bg-white/95 py-4 shadow-md backdrop-blur-md"
                : "bg-transparent py-6"
                }`}
        >
            <Link to="/" className="flex items-center">
                <img
                    src="/images/logo.png"
                    alt="Company Logo"
                    className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-10 md:h-12" : "h-12 md:h-18"
                        }`}
                    draggable={false}
                />
            </Link>

            <ul className="hidden items-center gap-9 text-[15px] text-neutral-700 lg:flex">
                {NAV_LINKS.map((link) => (
                    <li key={link.label} className="group relative">
                        <Link
                            to={link.to}
                            onClick={(e) => handleHashClick(link.to, e)}
                            className={`cursor-pointer transition hover:text-brand ${isActive(link.to) || (link.label === "Services" && location.pathname.startsWith("/services/"))
                                ? "text-brand"
                                : ""
                                }`}
                        >
                            {link.label}
                            <span
                                className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand transition-all duration-300 group-hover:w-full ${isActive(link.to) ? "w-full" : "w-0"
                                    }`}
                            />
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => openModal()}
                    className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md hover:bg-brand hover:text-white"
                >
                    Get In Touch
                </button>
                <button
                    onClick={() => openModal()}
                    aria-label="Go"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:rotate-45 hover:bg-brand hover:text-white"
                >
                    <ArrowUpRight strokeWidth={2.5} />
                </button>
            </div>
        </nav>
    );
}