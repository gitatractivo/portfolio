import {   useLayoutEffect, useRef, useState } from "react"
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import { useGSAP } from "@gsap/react";
import Hero from "./components/Hero";
import Base from "./components/Base";
import Whoam from "./components/Whoam";
import Horizontal from "./components/Horizontal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";




function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const locomotiveRef = useRef(null)

  useLayoutEffect(()=>{
       
    (
      async()=>{
        // @ts-ignore
        const Locomotive  = (await import('locomotive-scroll')).default;
        locomotiveRef.current = new Locomotive({
          lerp:0.7

        });
      }
      )()
      return ()=>{
        // locomotiveRef.current.destroy();
      }
  },[])
 
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
    <div ref={containerRef} id="main"
      className="app w-screen min-h-dvh overflow-x-hidden"
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
        </>
      )}
    </div>
  )
}

export default App
