import BlindsReveal from "../components/BlindsReveal";
import AboutService from "../components/services/AboutService";
import PortfolioGridSection from "../components/services/Portfoliogridsection";
import ServicesClientsSection from "../components/services/Servicesclientssection";
import ServicesCta from "../components/services/ServicesCta";
import ServicesHeroSection from "../components/services/Servicesherosection";
import ServicesPricing from "../components/services/ServicesPricing";
import ServicesTestimonials from "../components/services/ServicesTestimonials";


export default function Services() {
    return (
        <>
            <ServicesHeroSection />
            <ServicesClientsSection />
            <BlindsReveal>
                <AboutService />
            </BlindsReveal>
            <ServicesCta />
            <PortfolioGridSection />
            <ServicesPricing />
            <ServicesTestimonials />
            
            {/* <ServicesSection />
            <ProcessSection />
            <TestimonialsSection />
            <ContactSection /> */}
        </>
    );
}