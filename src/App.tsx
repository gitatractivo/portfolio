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

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const locomotiveRef = useRef(null);

  useLayoutEffect(() => {
    (async () => {
      // @ts-ignore
      const Locomotive = (await import("locomotive-scroll")).default;
      locomotiveRef.current = new Locomotive({
        lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.07,
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          smoothTouch: true, // Enable smooth scrolling on touch devices
          touchMultiplier: 1, // Adjust this value to control touch sensitivity
          wheelMultiplier: 1, // Adjust this value to control wheel sensitivity

          //  @ts-ignore
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        },
      });
    })();
    window.scrollTo(0, 0);

    return () => {
      // locomotiveRef.current.destroy();
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
    // {/* @ts-ignore */}
    <div
      ref={containerRef}
      id="main"
      className="app w-screen min-h-dvh overflow-x-hidden scrollbar-none"
    >
      <NavBar />
      <Loading setIsLoading={setIsLoading} />
      <Hero
        isLoading={isLoading}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />

      <Base />
      {isLoaded && (
        <>
          <Whoam isLoaded={isLoaded} />
          {isLoaded && <Horizontal />}
          <Projects />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
