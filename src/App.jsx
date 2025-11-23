import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';

// Import the new Pages
import { Home } from './pages/Home';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [isDark, setIsDark] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
  }, [isDark]);

  // Automatically scroll to top when changing pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ParticleBackground />
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;