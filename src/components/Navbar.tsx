import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = ["Home", "Services", "Portfolio", "Pricing", "Testimonials", "About Us"];

export default function Navbar() {
    return (
        <nav className="absolute inset-x-0 top-0 z-20 flex animate__animated animate__fadeInDown items-center justify-between bg-transparent px-6 py-6 md:px-12">
            <span className="text-2xl font-semibold tracking-wide text-neutral-900">
                LOGO HERE
            </span>

            <ul className="hidden items-center gap-9 text-[15px] text-neutral-700 lg:flex">
                {NAV_LINKS.map((link) => (
                    <li key={link} className="group relative cursor-pointer transition hover:text-brand">
                        {link}
                        <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-3">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md hover:bg-brand hover:text-white">
                    Get In Touch
                </button>
                <button
                    aria-label="Go"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:rotate-45 hover:bg-brand hover:text-white"
                >
                    <ArrowUpRight strokeWidth={2.5} />
                </button>
            </div>
        </nav>
    );
}