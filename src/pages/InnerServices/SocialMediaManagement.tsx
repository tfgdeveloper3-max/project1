import SocialMediaHeroSection from "../../components/Innerservices/SocialMediaManagement/SocialMediaHeroSection";
import SocialMediaAboutSection from "../../components/Innerservices/SocialMediaManagement/SocialMediaAboutSection";
import SocialMediaPlatformsSection from "../../components/Innerservices/SocialMediaManagement/SocialMediaPlatformsSection";
import SocialMediaPortfolioGridSection from "../../components/Innerservices/SocialMediaManagement/SocialMediaPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import SocialMediaPricingSection from "../../components/Innerservices/SocialMediaManagement/SocialMediaPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function SocialMediaManagementPage() {
    return (
        <main className="w-full">
            <SocialMediaHeroSection />
            <SocialMediaAboutSection />
            <SocialMediaPlatformsSection />
            <SocialMediaPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <SocialMediaPricingSection />
            <TestimonialsSection />
        </main>
    );
}