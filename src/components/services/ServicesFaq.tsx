"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const FAQS = [
    "Lorem Ipsum Is Simply Dummy Text Of The Printing?",
    "Lorem Ipsum Is Simply Dummy Text Of The Printing?",
    "Lorem Ipsum Is Simply Dummy Text Of The Printing?",
    "Lorem Ipsum Is Simply Dummy Text Of The Printing?",
    "Lorem Ipsum Is Simply Dummy Text Of The Printing?",
];

function FaqItem({
    index,
    question,
    isOpen,
    onToggle,
}: {
    index: number;
    question: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.button
            onClick={onToggle}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-2xl bg-[#DCF2E3] px-6 py-4 text-left transition-colors duration-300 hover:bg-[#c9ecd4]"
        >
            <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-neutral-800 md:text-[15px]">
                    {index + 1}. {question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/70"
                >
                    <ChevronDown className="h-4 w-4 text-neutral-700" />
                </motion.span>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pt-3 text-sm leading-relaxed text-neutral-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="w-full bg-[#FFFEFA] py-16 font-atyp md:py-20">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-12">
                {/* LEFT */}
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block rounded-full bg-[#D8E0DB] px-4 py-1.5 text-xs font-medium text-neutral-700"
                    >
                        FAQ's
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl"
                    >
                        Frequently Asked
                        <br />
                        <span className="text-[#237B43]">QUESTIONS</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-5 max-w-md text-sm leading-relaxed text-neutral-500"
                    >
                        Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                        Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever
                        Since 1966, When Designers At Letraset And James Mosley, The Librarian At
                        St Bride Printing Library In London, Took A 1914 Cicero Translation And
                        Scrambled It To Make Dummy Text For Letraset's Body Type Sheets. It Has
                        Survived Not Only Many Decades, But Also The Leap Into Electronic
                        Typesetting, Remaining Essentially Unchanged.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-7 flex items-center gap-3"
                    >
                        <button className="rounded-full bg-gradient-to-r from-[#F2530F] via-[#DB1B3F] to-[#B23FC9] px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-300 hover:scale-105">
                            Learn More Us
                        </button>
                        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#DB1B3F] to-[#B23FC9] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-45">
                            <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                        </button>
                    </motion.div>
                </div>

                {/* RIGHT - FAQ list */}
                <div className="flex flex-col gap-3">
                    {FAQS.map((q, i) => (
                        <FaqItem
                            key={i}
                            index={i}
                            question={q}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}