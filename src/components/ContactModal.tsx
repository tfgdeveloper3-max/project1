import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Package } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";
import { submitLead } from "../lib/leadApi";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactModal() {
    const { isOpen, closeModal, selectedPlan } = useContactModal();

    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };

        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, closeModal]);

    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setForm({ name: "", email: "", phone: "", message: "" });
                setStatus("idle");
                setErrorMsg("");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

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

        // Selected package info ko message field ke sath merge karke bhejte hain
        // — API sirf 4 fields (name, email, phone_number, message) accept karti hai
        const finalMessage = selectedPlan
            ? `Interested Package: ${selectedPlan}${form.message ? `\n\n${form.message}` : ""}`
            : form.message;

        try {
            await submitLead({
                name: form.name,
                email: form.email,
                phone_number: form.phone,
                message: finalMessage,
            });
            setStatus("success");
        } catch (err) {
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md rounded-[24px] bg-gradient-to-br from-[#5a9a6a] via-brand to-[#12351f] p-8 shadow-2xl md:p-10"
                    >
                        <button
                            onClick={closeModal}
                            aria-label="Close"
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/25"
                        >
                            <X className="h-4 w-4" strokeWidth={2.5} />
                        </button>

                        {status === "success" ? (
                            <div className="flex flex-col items-center py-6 text-center">
                                <h3 className="text-[22px] font-semibold text-white">Message Sent!</h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/85">
                                    Thanks for reaching out. We've received your message and
                                    will get back to you soon.
                                </p>
                                <button
                                    onClick={closeModal}
                                    className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="mb-4 pr-8 text-[24px] font-semibold leading-tight text-white md:text-[28px]">
                                    Have a Vision? Let's Give It a Digital Home.
                                </h3>

                                {/* Selected package badge — sirf display, editable nahi */}
                                {selectedPlan && (
                                    <div className="mb-6 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white">
                                        <Package className="h-4 w-4 shrink-0" />
                                        <span className="truncate">{selectedPlan}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div className="border-b border-white/35 pb-3">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={form.name}
                                            onChange={handleChange("name")}
                                            required
                                            className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                                        />
                                    </div>

                                    <div className="border-b border-white/35 pb-3">
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={form.email}
                                            onChange={handleChange("email")}
                                            required
                                            className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                                        />
                                    </div>

                                    <div className="border-b border-white/35 pb-3">
                                        <input
                                            type="tel"
                                            placeholder="Phone number"
                                            value={form.phone}
                                            onChange={handleChange("phone")}
                                            className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                                        />
                                    </div>

                                    <div className="border-b border-white/35 pb-3">
                                        <input
                                            type="text"
                                            placeholder="Message (optional)"
                                            value={form.message}
                                            onChange={handleChange("message")}
                                            className="w-full bg-transparent text-white outline-none placeholder:text-white/70"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="btn-sweep relative mt-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        <span className="relative z-10">
                                            {status === "loading" ? "Sending..." : "Send now"}
                                        </span>
                                    </button>

                                    {status === "error" && (
                                        <p className="text-sm font-medium text-red-100">{errorMsg}</p>
                                    )}
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}