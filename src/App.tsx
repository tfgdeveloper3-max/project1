import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import FooterIntroReveal from './components/FooterIntroReveal'
import FooterSection from './components/Footersection'
import Home from './pages/Home'
import Services from './pages/Services'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <FooterIntroReveal />
      <FooterSection />
    </>
  )
}

export default App