import ContentWritingHeroSection from "../../components/Innerservices/ContentWriting/ContentWritingHeroSection";
import ContentWritingAboutSection from "../../components/Innerservices/ContentWriting/ContentWritingAboutSection";
import ContentWritingTypesSection from "../../components/Innerservices/ContentWriting/ContentWritingTypesSection";
import ContentWritingPortfolioGridSection from "../../components/Innerservices/ContentWriting/ContentWritingPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import ContentWritingPricingSection from "../../components/Innerservices/ContentWriting/ContentWritingPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function ContentWritingPage() {
    return (
        <main className="w-full">
            <ContentWritingHeroSection />
            <ContentWritingAboutSection />
            <ContentWritingTypesSection />
            <ContentWritingPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <ContentWritingPricingSection />
            <TestimonialsSection />
        </main>
    );
}