import { useGSAP } from '@gsap/react'
import gsap, { Expo, Power4 } from 'gsap'
import { useRef } from 'react'

type Props = {
  isLoading: boolean
}

const Hero = ({ isLoading }: Props) => {
  const parentRef = useRef(null)
  const marqueeRef = useRef(null)
  useGSAP(() => {

    if (!isLoading) {
      const tl2 = gsap.timeline({
        repeat: -1, defaults: {
          duration: 1,delay:1,  ease: Expo.easeInOut, repeatDelay: 0
        }
      })
      tl2.to(".snap-mar", {yPercent:0,delay:0,duration:0})
      tl2.to(".snap-mar",{yPercent:-100,})
      tl2.to(".snap-mar",{yPercent:-200,})
      tl2.to(".snap-mar",{yPercent:-300,})
      tl2.to(".snap-mar",{yPercent:-400,})


      const tl = gsap.timeline()
      tl.to(parentRef.current, {
        scale: 1,
        y: 0,
        x: 0,
        rotate: 0,
        duration: 1,
        ease: Power4.easeInOut,
        delay: -.1,
      })
      tl.to('.nav',{
        width:'95%',
        duration:1,
        ease:Power4.easeInOut,
      },'<')
     


    }
  }, [isLoading])
  const parent = document.querySelectorAll('.snap-mar')
  console.log(parent)
  return (
    <div ref={parentRef} className='scale-[0.4]  px-5 -rotate-[10deg] translate-y-[30vh]  translate-x-[5vw] w-screen z-10 flex flex-col justify-between p-0 bg-white h-[100dvh]'>
      <div className="flex flex-col gap-10 mt-3">
        <nav className='w-1/2 nav bg-[#B1DD41] rounded-lg backdrop-blur-lg p-8  mx-auto'></nav>

        <div className='flex flex-col px-2 md:px-5 iam justify-start gap-0 text-2xl md:text-4xl lg:text-7xl  font-medium line-clamp-1'>
        <h1>I am a </h1>
        <h1 className='flex relative gap-4 overflow-y-hidden'>_ 
          <span ref={marqueeRef} className='snap-parent '>

          <span  className='  absolute snap-container overflow-y-hidden  '>
            <span  className='text-[#5546FF]   w-fit block snap-mar '>Full Stack Developer</span>
              <span className='text-[#5546FF]  w-fit block snap-mar'>Frontend  Developer</span>
              <span className='text-[#5546FF]  w-fit block snap-mar'>Backend Developer</span>
            <span className='text-[#5546FF] four w-fit block snap-mar'>Devops Engineer</span>
              <span className='text-[#5546FF] w-fit block snap-mar '>Full Stack Developer</span>
            
        </span>
        </span>
        </h1>
      </div>
      </div>
      <div className='w-full uppercase font-black text-6xl lg:text-[13vw] text-right'>Gitanshu.</div>
    </div>
  )
}

export default Hero