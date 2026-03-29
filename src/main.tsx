import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='overflow-x-hidden scrollbar-none'>
    <App />
  </div >,
)
