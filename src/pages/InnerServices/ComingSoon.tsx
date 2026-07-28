// src/pages/InnerServices/ComingSoon.tsx

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";

export default function ComingSoon({ label }: { label: string }) {
    return (
        <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#FFFEFA] px-6 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
            >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DCEBE1] text-[#3B8C4E]">
                    <Clock className="h-6 w-6" strokeWidth={1.75} />
                </span>

                <span className="mt-6 inline-block rounded-full bg-[#D1DCD7] px-5 py-1.5 text-sm font-medium text-neutral-700">
                    Coming Soon
                </span>

                <h1 className="mt-4 text-3xl font-bold text-neutral-900 md:text-4xl">
                    {label} Page Is On Its Way
                </h1>
                <p className="mt-3 max-w-md text-sm text-neutral-500 md:text-base">
                    We're putting the finishing touches on this page. Check back soon, or explore
                    our other services in the meantime.
                </p>

                <Link
                    to="/services"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F2530F] via-[#DB1B3F] to-[#B23FC9] px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-300 hover:scale-105"
                >
                    Back To Services
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
            </motion.div>
        </main>
    );
}