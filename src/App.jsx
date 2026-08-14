import { useState, useEffect, useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './App.css'
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import LoadingScreen from './views/LoadingScreen';
import Landing from './views/Landing';
import Projekter from './views/Projekter';
import OmMig from './views/OmMig';
import Kontakt from './views/Kontakt';
import Footer from './components/Footer';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('landing');

  const projekterRef = useRef(null);
  const ommigRef = useRef(null);
  const textcontainerRef = useRef(null);

  const scrollToSection = (id) => {
    if (id === 'landing') {
      gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power2.inOut' });
    }
    if (id === 'projects') {
      const landingTrigger = ScrollTrigger.getById('landing-transition');
      gsap.to(window, {
        scrollTo: landingTrigger.end + 1, 
        duration: 1,
        ease: 'power2.inOut',
      });
    }
    gsap.to(window, { scrollTo: { y: `#${id}`, autoKill: false }, duration: 1, ease: 'power2.inOut' });
  };


  useEffect(() => {
    const landingTrigger = ScrollTrigger.getById('landing-transition');
    if (!landingTrigger) return;

    const triggers = [
        ScrollTrigger.create({
          start: 0,
          end: () => ScrollTrigger.getById('landing-transition').end,
          onToggle: (self) => self.isActive && setActiveSection('landing'),
        }),
      ];

      ['projekter', 'ommig', 'kontakt'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => self.isActive && setActiveSection(id),
          })
        );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    if (!isLoading) {
        ScrollTrigger.refresh();
    }
  }, [isLoading]);

  

  return (
    <>
      <CustomCursor />
      <Header activeSection={activeSection} onNavigate={scrollToSection}/>
      <Landing />
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}
      <Projekter />
      <OmMig onNavigateKontakt={() => scrollToSection('kontakt')} />
      <Kontakt />
      <Footer onNavigateToppen={() => scrollToSection('landing')} />
   </>
  );
}