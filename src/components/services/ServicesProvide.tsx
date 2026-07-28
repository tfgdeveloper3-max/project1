import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
    }),
};

export default function SuiteOfServicesSection() {
    return (
        <section className="w-full bg-[#FFFEFA] py-16 font-atyp md:py-20">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-12 md:px-12">
                {/* LEFT COLUMN */}
                <div>
                    <motion.span
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="inline-block rounded-full bg-[#CCD9D2] px-5 py-1.5 text-sm font-medium text-neutral-700"
                    >
                        What We Provide
                    </motion.span>

                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.1}
                        className="mt-5 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl lg:text-[2.6rem]"
                    >
                        The Complete Suite Of{" "}
                        <span className="text-[#318350]">Services</span> We Provide For Your
                        Online <span className="text-[#318350]">Success</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative mt-8 overflow-hidden rounded-3xl"
                    >
                        <img
                            src="/images/ServicesProvide2.png"
                            alt="Design and development suite"
                            className="h-[300px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[340px]"
                        />
                    </motion.div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-3xl"
                    >
                        <img
                            src="/images/ServicesProvide1.png"
                            alt="Development and coding"
                            className="h-[220px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[240px]"
                        />
                    </motion.div>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.3}
                        className="mt-6 text-sm leading-relaxed text-neutral-400 md:text-[15px]"
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
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.45}
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
            </div>
        </section>
    );
}