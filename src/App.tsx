import Navbar from './components/Navbar'
import HeroSection from './components/Herosection'
import AboutSection from './components/Aboutsection'
import ClientsSection from './components/Clientsection'
import ServicesSection from './components/Servicessection'
import CtaBannerSection from './components/Ctabannersection'
import PortfolioSection from './components/Portfoliosection'
import PricingSection from './components/Pricingsection'
import TestimonialsSection from './components/Testimonialsection'
import ContactSection from './components/Contactsection'
import FooterIntroReveal from "./components/FooterIntroReveal";
import FooterSection from './components/Footersection'
import BlindsReveal from './components/BlindsReveal'

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BlindsReveal>
        <AboutSection />
      </BlindsReveal>
      <ClientsSection />
      <ServicesSection />
      <CtaBannerSection />
      <PortfolioSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterIntroReveal />
      <FooterSection />
    </>
  )
}

export default App
