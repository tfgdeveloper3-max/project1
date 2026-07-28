import BlindsReveal from "../components/BlindsReveal";
import ServicesClientsSection from "../components/services/ClientSection";
import OurServices from "../components/services/OurServices";
import PricingFaq from "../components/services/Pricing";
import ServicesHeroSection from "../components/services/ServiceHero";
import ServicesDemo from "../components/services/ServicesDemo";
import ServicesFaq from "../components/services/ServicesFaq";
import ServicesProvide from "../components/services/ServicesProvide";
import ServicesTimeline from "../components/services/ServicesTimeline";



export default function Services() {
    return (
        <>
            <ServicesHeroSection />
            <ServicesClientsSection />
            <BlindsReveal>
                <OurServices />
            </BlindsReveal>
            <ServicesTimeline />
            <ServicesProvide />
            <ServicesDemo />
            <PricingFaq />
            <ServicesFaq />
        </>
    );
}