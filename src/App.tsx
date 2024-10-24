import { useLayoutEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import { useGSAP } from "@gsap/react";
import Hero from "./components/Hero";
import Base from "./components/Base";
import Whoam from "./components/Whoam";
import Horizontal from "./components/Horizontal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Locomotive from "locomotive-scroll";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const locomotiveRef = useRef<Locomotive | null>(null);

  useLayoutEffect(() => {
    (async () => {
      const LocomotiveModule = await import("locomotive-scroll");
      const Locomotive = LocomotiveModule.default;
      
      locomotiveRef.current = new Locomotive({
        lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.07,
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,

          touchMultiplier: 1,
          wheelMultiplier: 1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
      });
    })();
    window.scrollTo(0, 0);

    return () => {
      if (locomotiveRef.current) {
        locomotiveRef.current.destroy();
      }
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const navAnimation = gsap
      .from(".nav", {
        yPercent: -200,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? navAnimation.play() : navAnimation.reverse();
      },
    });
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        id="main"
        className="  w-screen min-h-dvh overflow-x-hidden scrollbar-none"
      >
        {/* Existing desktop layout */}
        <Loading setIsLoading={setIsLoading} />
        <Base />
        
          <NavBar />
          <Hero
            isLoading={isLoading}
            isLoaded={isLoaded}
            setIsLoaded={setIsLoaded}
          />
          {isLoaded && (
            <>
              <Whoam isLoaded={isLoaded} />
              {isLoaded && <Horizontal />}
              <Projects />
              <Footer />
            </>
          )}
        
        
      </div>

      
    </>
  );
}

export default App;
