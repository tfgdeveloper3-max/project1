import MobileAppsHeroSection from "../../components/Innerservices/MobileApps/MobileAppsHeroSection";
import MobileAppsAboutSection from "../../components/Innerservices/MobileApps/MobileAppsAboutSection";
import MobileAppsCapabilitiesSection from "../../components/Innerservices/MobileApps/MobileAppsCapabilitiesSection";
import MobileAppsPortfolioGridSection from "../../components/Innerservices/MobileApps/MobileAppsPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import MobileAppsPricingSection from "../../components/Innerservices/MobileApps/MobileAppsPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function MobileAppsPage() {
    return (
        <main className="w-full">
            <MobileAppsHeroSection />
            <MobileAppsAboutSection />
            <MobileAppsCapabilitiesSection />
            <MobileAppsPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <MobileAppsPricingSection />
            <TestimonialsSection />
        </main>
    );
}