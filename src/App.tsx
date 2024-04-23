
import { useEffect, useRef, useState } from "react"
import Base from "./components/Base"
import Hero from "./components/Hero"
import Loading from "./components/Loading"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Horizontal from "./components/Horizontal"
// @ts-ignore

import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from "@gsap/react"
import NavBar from "./components/NavBar"
import Whoam from "./components/Whoam"

gsap.registerPlugin(ScrollTrigger)
const App = () => {
  const mainRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const locomotiveScroll = new LocomotiveScroll({
    el: mainRef.current as any,
    smooth: true,
    // @ts-ignore
    lenisOptions: {
      lerp: 0.07,
    },
    autoStart: false
  });
  console.log(locomotiveScroll)
  useGSAP(()=>{
    const navAnimation = gsap.from('.nav', {
      yPercent: -200,
      paused: true,
      duration: 0.2
    }).progress(1);


    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? navAnimation.play() : navAnimation.reverse()
      }
    });
  },[])
  
  useEffect(()=>{
    window.scrollTo(0,0)
    if(isLoading){
      locomotiveScroll.destroy()
    }
    if(isLoaded){
      locomotiveScroll.start()
    }
  },[isLoading,isLoaded])


  return (

    <div ref ={mainRef } id="main" className="w-screen min-h-dvh  overflow-x-hidden">
      <NavBar/>

      <Loading setIsLoading={setIsLoading}/>
      <Hero isLoading={isLoading} isLoaded={isLoaded} setIsLoaded={setIsLoaded}/>
      <Base/>
      {isLoaded&&<>
      <Whoam isLoaded={isLoaded}/>
      {!isLoading&&<Horizontal/>}
      </>}
    </div>
  )
}

export default App