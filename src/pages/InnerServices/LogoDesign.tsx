import LogoDesignHeroSection from "../../components/Innerservices/LogoDesign/LogoDesignHeroSection";
import LogoDesignAboutSection from "../../components/Innerservices/LogoDesign/LogoDesignAboutSection";
import LogoDesignProcessSection from "../../components/Innerservices/LogoDesign/LogoDesignProcessSection";
import LogoDesignPortfolioGridSection from "../../components/Innerservices/LogoDesign/LogoDesignPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import LogoDesignPricingSection from "../../components/Innerservices/LogoDesign/LogoDesignPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function LogoDesignPage() {
    return (
        <main className="w-full">
            <LogoDesignHeroSection />
            <LogoDesignAboutSection />
            <LogoDesignProcessSection />
            <LogoDesignPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <LogoDesignPricingSection />
            <TestimonialsSection />
        </main>
    );
}