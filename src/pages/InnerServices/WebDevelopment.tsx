import ServicesHerosection from "../../components/Innerservices/WebDevelopment/Servicesherosection";
import AboutService from "../../components/Innerservices/WebDevelopment/AboutService";
import ServicesClientssection from "../../components/Innerservices/WebDevelopment/Servicesclientssection";
import Portfoliogridsection from "../../components/Innerservices/WebDevelopment/Portfoliogridsection";
import ServicesPricing from "../../components/Innerservices/WebDevelopment/ServicesPricing";
import ServicesTestimonials from "../../components/Innerservices/WebDevelopment/ServicesTestimonials";
import ServicesCta from "../../components/Innerservices/WebDevelopment/ServicesCta";
import BlindsReveal from "../../components/BlindsReveal";

export default function WebDevelopmentPage() {
    return (
        <main className="w-full overflow-x-hidden">
            <ServicesHerosection />
            <BlindsReveal>
                <AboutService />
            </BlindsReveal>
            <ServicesClientssection />
            <Portfoliogridsection />
            <ServicesPricing />
            <ServicesTestimonials />
            <ServicesCta />
        </main>
    );
}