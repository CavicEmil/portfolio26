import { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './App.css'
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
  };

  useEffect(() => {
    // runs after Landing's useLayoutEffect has already registered its trigger,
    // since child layout effects fire before the parent's passive effects
    ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.getById('landing-transition').end,
      onToggle: (self) => self.isActive && setActiveSection('landing'),
    });

    ScrollTrigger.create({
      start: () => ScrollTrigger.getById('landing-transition').end,
      end: () => ScrollTrigger.getById('landing-transition').end + window.innerHeight,
      onToggle: (self) => self.isActive && setActiveSection('projects'),
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
        ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <>
      <Header activeSection={activeSection} onNavigate={scrollToSection}/>
      <Landing />
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}
      <Projekter />
      <OmMig />
      <Kontakt />
      <Footer />
   </>
  );
}