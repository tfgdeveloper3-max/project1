// src/App.tsx

import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import Footersection from "./components/Footersection";
import { innerServiceRoutes } from "./routes/innerServiceRoutes";
import FooterIntroReveal from "./components/FooterIntroReveal";

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="py-40 text-center text-neutral-400">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />

          {innerServiceRoutes.map(({ slug, component: Component }) => (
            <Route
              key={slug}
              path={`/services/${slug}`}
              element={<Component />}
            />
          ))}
        </Routes>
      </Suspense>
      <FooterIntroReveal />
      <Footersection />
    </>
  );
}

export default App;