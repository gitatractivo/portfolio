
import { useRef, useState } from "react"
import Base from "./components/Base"
import Hero from "./components/Hero"
import Loading from "./components/Loading"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Horizontal from "./components/Horizontal"
// @ts-ignore

import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger)
const App = () => {
  const mainRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const locomotiveScroll = new LocomotiveScroll({
    el: mainRef.current as any,
    smooth: true,
    // @ts-ignore
    lenisOptions: {
      lerp: 0.07,
    },
  });
  console.log(locomotiveScroll)
  return (

    <div ref ={mainRef } className="w-screen min-h-dvh overflow-x-hidden">

      <Loading setIsLoading={setIsLoading}/>
      <Hero isLoading={isLoading}/>
      <Base/>
      {!isLoading&&<Horizontal/>}
    </div>
  )
}

export default App