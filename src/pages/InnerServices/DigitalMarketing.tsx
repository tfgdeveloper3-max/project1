import DigitalMarketingHeroSection from "../../components/Innerservices/DigitalMarketing/DigitalMarketingHeroSection";
import DigitalMarketingAboutSection from "../../components/Innerservices/DigitalMarketing/DigitalMarketingAboutSection";
import DigitalMarketingChannelsSection from "../../components/Innerservices/DigitalMarketing/DigitalMarketingChannelsSection";
import DigitalMarketingPortfolioGridSection from "../../components/Innerservices/DigitalMarketing/DigitalMarketingPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import DigitalMarketingPricingSection from "../../components/Innerservices/DigitalMarketing/DigitalMarketingPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function DigitalMarketingPage() {
    return (
        <main className="w-full">
            <DigitalMarketingHeroSection />
            <DigitalMarketingAboutSection />
            <DigitalMarketingChannelsSection />
            <DigitalMarketingPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <DigitalMarketingPricingSection />
            <TestimonialsSection />
        </main>
    );
}