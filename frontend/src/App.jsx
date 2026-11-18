import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { HeroWaveCanvas } from './components/HeroWaveCanvas';

// Sections
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Certifications } from './sections/Certifications';
import { Achievements } from './sections/Achievements';
import { CodingProfiles } from './sections/CodingProfiles';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';

// Admin Page
import { AdminPage } from './pages/AdminPage';

const PortfolioHome = () => (
  <div className="relative isolate min-h-screen flex flex-col bg-light-bg text-light-body dark:bg-dark-bg dark:text-dark-body selection:bg-light-accent selection:text-white dark:selection:bg-dark-accent dark:selection:text-white transition-colors duration-300">
    {/* Global Continuous Animated Wave Background Across All Sections */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <HeroWaveCanvas />
    </div>

    <ScrollProgress />
    <Navbar />

    <main className="flex-grow relative z-10">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Achievements />
      <CodingProfiles />
      <Resume />
      <Contact />
    </main>

    <div className="relative z-10">
      <Footer />
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
