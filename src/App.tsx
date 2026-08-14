import HeroSection from './components/Herosection'
import AboutSection from './components/Aboutsection'
import ClientsSection from './components/Clientsection'
import ServicesSection from './components/Servicessection'
import OurprocesSection from './components/OurprocesSection'
import PortfolioSection from './components/Portfoliosection'
import PricingSection from './components/Pricingsection'
import TestimonialsSection from './components/Testimonialsection'
import CtaBannerSection from './components/Ctabannersection'
import ContactSection from './components/Contactsection'
import BlindsReveal from './components/BlindsReveal'
import Navbar from './components/Navbar'
import FooterIntroReveal from './components/FooterIntroReveal'
import Footersection from './components/Footersection'
import { ContactModalProvider } from './context/ContactModalContext'
import ContactModal from './components/ContactModal'
import { LiveChatWidget } from "@livechat/widget-react";
import { useEffect } from 'react'

export default function App() {

  useEffect(() => {
    const openChat = () => {
      const livechat = (window as any).LiveChatWidget;

      if (livechat) {
        setTimeout(() => {
          livechat.call("maximize");
        }, 1000);
        livechat.on("new_event", (event: any) => {
          if (
            ["message", "rich_message", "file"].includes(event.type) &&
            event.author?.type !== "customer"
          ) {
            livechat.call("maximize");
          }
        });
      }
    };

    if ((window as any).LiveChatWidget) {
      openChat();
    }

    (window as any).__lc = (window as any).__lc || {};
    (window as any).__lc.asyncInit = () => {
      openChat();
    };
  }, []);

  return (
    <>
      <LiveChatWidget license="19067595" />

      <ContactModalProvider>
        <Navbar />
        <HeroSection />
        <BlindsReveal>
          <AboutSection />
        </BlindsReveal>
        <ClientsSection />
        <ServicesSection />
        <OurprocesSection />
        <PortfolioSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaBannerSection />
        <ContactSection />
        <FooterIntroReveal />
        <Footersection />
        <ContactModal />
      </ContactModalProvider>
    </>
  )
}