
import { useRef, useState } from "react"
import Base from "./components/Base"
import Hero from "./components/Hero"
import Loading from "./components/Loading"
// import LocomotiveScroll from 'locomotive-scroll';


const App = () => {
  const mainRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  // const locomotiveScroll = new LocomotiveScroll({
  //   el: mainRef.current as any,
  //   smooth: true,
  //   // @ts-ignore
  //   lenisOptions: {
  //     lerp: 0.06,
  //   },
  // });
  // console.log(locomotiveScroll)
  return (

    <div ref ={mainRef } className="w-screen min-h-dvh overflow-x-hidden">

      <Loading setIsLoading={setIsLoading}/>
      <Hero isLoading={isLoading}/>
      <Base/>
    </div>
  )
}

export default App