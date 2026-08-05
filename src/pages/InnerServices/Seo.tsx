import SeoHeroSection from "../../components/Innerservices/Seo/SeoHeroSection";
import SeoAboutSection from "../../components/Innerservices/Seo/SeoAboutSection";
import SeoStrategySection from "../../components/Innerservices/Seo/SeoStrategySection";
import SeoPortfolioGridSection from "../../components/Innerservices/Seo/SeoPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import SeoPricingSection from "../../components/Innerservices/Seo/SeoPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function SeoPage() {
    return (
        <main className="w-full">
            <SeoHeroSection />
            <SeoAboutSection />
            <SeoStrategySection />
            <SeoPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <SeoPricingSection />
            <TestimonialsSection />
        </main>
    );
}