import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
                {NAV_LINKS.map((link) => (
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
                ))}
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