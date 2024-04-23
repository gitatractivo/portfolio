import { useGSAP } from '@gsap/react'
import gsap, { Expo, Power4 } from 'gsap'
import { useEffect, useRef } from 'react'
import SplitType from 'split-type'


type Props = {
  isLoading: boolean
  isLoaded:boolean
  setIsLoaded:Function
}

const Hero = ({ isLoading ,isLoaded,setIsLoaded}: Props) => {
  const parentRef = useRef<HTMLButtonElement>(null);
  const marqueeRef = useRef<HTMLButtonElement>(null);
  const splitRef = useRef<HTMLButtonElement>(null);
  const wordref = useRef(null);

  

  useGSAP(() => {

    if (!isLoading) {
      const tl2 = gsap.timeline({
        repeat: -1, defaults: {
          duration: 1, delay: 1, ease: Expo.easeInOut, repeatDelay: 0
        }
      })
      tl2.to(".snap-mar", { yPercent: 0, delay: 0, duration: 0 })
      tl2.to(".snap-mar", { yPercent: -100, })
      tl2.to(".snap-mar", { yPercent: -200, })
      tl2.to(".snap-mar", { yPercent: -300, })
      tl2.to(".snap-mar", { yPercent: -400, })
      //@ts-ignore
      splitRef.current = new SplitType(wordref.current)
      const tl = gsap.timeline()
      tl.to(parentRef.current, {
        scale: 1,
        y: 0,
        x: 0,
        rotate: 0,
        duration: 1.6,
        ease: Power4.easeInOut,
      })

      tl.to(parentRef.current, {
        clipPath: "circle(120% at 50% 50%)",

        duration: 2,
        borderRadius: 0,
        ease: Power4.easeInOut,
      }, "<+0.25")
      // @ts-ignore
      tl.to(splitRef.current.chars, {
        yPercent: -100,
        duration: 0.5,
        stagger: 0.04,
        ease: Power4.easeInOut,
      }, "<+0.6")

      tl.to('.nav', {
        
        width: '95%',
        opacity:1,
        duration: 1,
        ease: Power4.easeInOut,
      }, '>-1')
      tl.to(".base",{
        display:'none',
        delay:0,
      },">")
      tl.call(()=>{
        setIsLoaded(true)
      })
      tl.to('#main', {
        
        backgroundColor: "rgba(209, 213, 219, 1)",
        opacity:1,
        duration: 0,
        ease: Power4.easeInOut,
      }, '>')


    }
  }, [isLoading])

  useEffect(() => {
    if (parentRef.current&&isLoaded) {
      parentRef.current.setAttribute('data-scroll-speed', '-.3');
    }
  }, [isLoaded]);
  // data-scroll data-scroll-section data-scroll-speed="-.3"
  return (
    <section data-scroll data-scroll-section data-scroll-speed="-.3"  ref={parentRef} className='clipPath bg-clip-border translate-y-full  px-5 pb-[10vh]  translate-x-[5vw] w-screen z-10 flex flex-col justify-between py-0 bg-gray-300 max-h-[110dvh]   box-border h-[110vh]'>
      <div className="flex flex-col gap-10 mt-3">
       
        <div className='flex flex-col mt-36  iam justify-start gap-0 text-2xl md:text-4xl lg:text-7xl mx-[4vw] tracking-tighter   !leading-tight font-bold  line-clamp-1'>
          <h1>I am a </h1>
          <h1 className='flex relative gap-4 overflow-y-hidden'>_
            <span ref={marqueeRef} className='snap-parent '>

              <span className='  absolute snap-container overflow-y-hidden  '>
                <span className='text-[#5546FF]   w-fit block snap-mar '>Full Stack Developer</span>
                <span className='text-[#5546FF]  w-fit block snap-mar'>Frontend  Developer</span>
                <span className='text-[#5546FF]  w-fit block snap-mar'>Backend Developer</span>
                <span className='text-[#5546FF] four w-fit block snap-mar'>Devops Engineer</span>
                <span className='text-[#5546FF] w-fit block snap-mar '>Full Stack Developer</span>

              </span>
            </span>
          </h1>
        </div>
      </div>
      <svg viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg" className='filter blur-md z-10 scale-x-[1.3] rotate-[-20deg] scale-y-[1.3] self-center ' >

        <defs>
          <linearGradient  id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" >
            <stop offset="0%" stopColor="#79fff8"></stop>
            <stop offset="100%" stopColor="#1F3EE1"></stop>
            </linearGradient>
        </defs>
        <path transform="translate(110 90)" fill="url(#gradient)" >
          <animate
            attributeName='d'
            values='M63.7,-20.5C73,8,64.5,42.5,43.2,57.5C22,72.4,-12,67.9,-35.6,50.4C-59.2,32.9,-72.3,2.6,-64.7,-23.7C-57,-49.9,-28.5,-72.1,-0.7,-71.9C27.2,-71.7,54.4,-49.1,63.7,-20.5Z;
          
          M55.2,-13.8C64.8,11.7,61.3,45.6,40.7,62C20.1,78.4,-17.6,77.3,-42.4,59.1C-67.2,40.9,-79.1,5.7,-69.9,-19.3C-60.6,-44.3,-30.3,-59.1,-3.8,-57.8C22.8,-56.6,45.5,-39.4,55.2,-13.8Z;

          M60.7,-15.1C70.5,10.4,64.6,45.7,46.8,56.9C28.9,68.1,-1,55.3,-22.4,38.1C-43.7,20.9,-56.5,-0.8,-51.3,-20C-46.2,-39.1,-23.1,-55.7,1.2,-56.1C25.5,-56.5,50.9,-40.7,60.7,-15.1Z;

          M68.5,-16C78.1,7.5,68.1,43.6,44.4,60.8C20.7,77.9,-16.6,76,-35.5,59.8C-54.3,43.5,-54.7,12.8,-45.7,-9.8C-36.8,-32.3,-18.4,-46.7,5.5,-48.5C29.4,-50.3,58.8,-39.5,68.5,-16Z;

         

          M63.7,-20.5C73,8,64.5,42.5,43.2,57.5C22,72.4,-12,67.9,-35.6,50.4C-59.2,32.9,-72.3,2.6,-64.7,-23.7C-57,-49.9,-28.5,-72.1,-0.7,-71.9C27.2,-71.7,54.4,-49.1,63.7,-20.5Z
          '
            dur="5000ms"
            repeatCount="indefinite" ></animate>
        </path>
      </svg>
      <div ref={wordref} className='w-full  uppercase font-black text-6xl lg:text-[13vw] text-right translate-y-full'>Gitanshu.</div>
    </section>
  )
}

export default Hero