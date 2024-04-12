import { useGSAP } from '@gsap/react'
import gsap, { Power4 } from 'gsap'
import { useRef } from 'react'

type Props = {
  isLoading:boolean
}

const Hero = ({isLoading}: Props) => {
  const parentRef = useRef(null)
  useGSAP(()=>{
    // if(isLoading){
    //   return;
    // }
   if(!isLoading){ const tl = gsap.timeline()
    tl.to(parentRef.current,{
      scale:1,
      y:0,
      rotate:0,
      duration:1,
      ease:Power4.easeInOut,
      delay:0,
    })}
  },[isLoading])
  return (
    <div ref={parentRef} className='scale-[0.35] -rotate-12 translate-y-40 w-screen z-10 flex flex-col justify-between p-0 bg-white h-[100dvh]'>
      <div></div>
      <div className='w-full uppercase font-black text-6xl lg:text-9xl text-right'>Gitanshu.</div>
    </div>
  )
}

export default Hero