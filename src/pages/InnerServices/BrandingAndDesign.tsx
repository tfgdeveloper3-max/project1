import BrandingHeroSection from "../../components/Innerservices/BrandingAndDesign/BrandingHeroSection";
import BrandingAboutSection from "../../components/Innerservices/BrandingAndDesign/BrandingAboutSection";
import BrandingKitSection from "../../components/Innerservices/BrandingAndDesign/BrandingKitSection";
import BrandingPortfolioGridSection from "../../components/Innerservices/BrandingAndDesign/BrandingPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import BrandingPricingSection from "../../components/Innerservices/BrandingAndDesign/BrandingPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function BrandingAndDesignPage() {
    return (
        <main className="w-full">
            <BrandingHeroSection />
            <BrandingAboutSection />
            <BrandingKitSection />
            <BrandingPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <BrandingPricingSection />
            <TestimonialsSection />
        </main>
    );
}