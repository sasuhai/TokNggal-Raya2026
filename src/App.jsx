import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PosterSection from './components/PosterSection';
import VenueSection from './components/VenueSection';
import FamilySection from './components/FamilySection';
import RSVPSection from './components/RSVPSection';
import PotluckSection from './components/PotluckSection';
import SumbanganSection from './components/SumbanganSection';
import ShareSection from './components/ShareSection';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import StickyBottom from './components/StickyBottom';
import './index.css';
import './App.css';

// Scroll reveal observer
const useScrollReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const HomePage = () => {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <Hero />
      <PosterSection />
      <VenueSection />
      <FamilySection />
      <RSVPSection />
      <PotluckSection />
      <SumbanganSection />
      <ShareSection />
      <Footer />
      <StickyBottom />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
