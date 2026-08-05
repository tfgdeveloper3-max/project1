import VideoAnimationHeroSection from "../../components/Innerservices/VideoAnimation/VideoAnimationHeroSection";
import VideoAnimationAboutSection from "../../components/Innerservices/VideoAnimation/VideoAnimationAboutSection";
import VideoAnimationStylesSection from "../../components/Innerservices/VideoAnimation/VideoAnimationStylesSection";
import VideoAnimationPortfolioGridSection from "../../components/Innerservices/VideoAnimation/VideoAnimationPortfolioGridSection";
import ServicesClientsSection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import CtaBannerSection from "../../components/Innerservices/WebDevelopment/ServicesCta";
import VideoAnimationPricingSection from "../../components/Innerservices/VideoAnimation/VideoAnimationPricingSection";
import TestimonialsSection from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";

export default function VideoAnimationPage() {
    return (
        <main className="w-full">
            <VideoAnimationHeroSection />
            <VideoAnimationAboutSection />
            <VideoAnimationStylesSection />
            <VideoAnimationPortfolioGridSection />
            <ServicesClientsSection />
            <CtaBannerSection />
            <VideoAnimationPricingSection />
            <TestimonialsSection />
        </main>
    );
}