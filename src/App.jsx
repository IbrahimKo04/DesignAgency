import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact'; // <-- 1. Import the new component
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  // ... (your isDark state logic) ...
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
  }, [isDark]);

  return (
    <>
      <ParticleBackground />
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      <main>
        <Hero isDark={isDark} />
        <Portfolio />
        <AboutUs />
        <Contact /> {/* <-- 2. Add the component here */}
      </main>
      <Footer />
    </>
  );
}

export default App;