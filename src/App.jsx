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
  };

/*   const transitionToOmMig = () => {
    gsap.to(projekterRef.current, {
      opacity: 0,
      daruation: 2,
      ease: 'power2.inOut',
    });

    gsap.set('.thatme-image', { display: 'block'});
    gsap.to(ommigRef.current, {
      opacity: 1,
      delay: 3,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        PiLayout('intro');
      },
    });
  };
 */
/*   useEffect(() => {
    transitionToOmMig();
  },[]); */

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
      <CustomCursor />
      <Header activeSection={activeSection} onNavigate={scrollToSection}/>
      <Landing />
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}
        {/* <div ref={projekterRef} className='bg-mainbg fixed inset-0 z-0'
          style={{ opacity: 1 }}
        > */}
          <Projekter />
      {/*  </div>
       <div ref={ommigRef} className='bg-aboutme fixed inset-0 z-0'
      style={{ opacity: 0 }}
        > */}
        <OmMig />
      {/* </div> */}
      <Kontakt />
      <Footer />
   </>
  );
}