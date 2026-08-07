import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './index.css'
import App from './App.jsx'
import { MotionPathPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
