import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import EcommercePricingSection from "../../components/Innerservices/EcommerceSolution/EcommercePricingSection";
import EcommercePortfolioGridSection from "../../components/Innerservices/EcommerceSolution/EcommercePortfolioGridSection";
import EcommerceFeaturesSection from "../../components/Innerservices/EcommerceSolution/EcommerceFeaturesSection";
import EcommerceHeroSection from "../../components/Innerservices/EcommerceSolution/EcommerceHeroSection";
import EcommerceAboutSection from "../../components/Innerservices/EcommerceSolution/EcommerceAboutSection";

export default function EcommerceSolutionPage() {
    return (
        <main className="w-full">
            <EcommerceHeroSection />
            <EcommerceAboutSection />
            <EcommerceFeaturesSection />
            <EcommercePortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <EcommercePricingSection />
            <TestimonialsSection />
        </main>
    );
}