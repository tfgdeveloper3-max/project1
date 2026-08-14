import { createContext, useContext, useState, type ReactNode } from "react";

interface ContactModalContextValue {
    isOpen: boolean;
    selectedPlan: string | null;
    openModal: (planInfo?: string) => void;
    closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const openModal = (planInfo?: string) => {
        setSelectedPlan(planInfo ?? null);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    return (
        <ContactModalContext.Provider value={{ isOpen, selectedPlan, openModal, closeModal }}>
            {children}
        </ContactModalContext.Provider>
    );
}

export function useContactModal() {
    const ctx = useContext(ContactModalContext);
    if (!ctx) {
        throw new Error("useContactModal must be used within a ContactModalProvider");
    }
    return ctx;
}