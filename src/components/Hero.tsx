import { useGSAP } from '@gsap/react'
import gsap, { Expo, Power1, Power4 } from 'gsap'
import { useRef } from 'react'
import SplitType from 'split-type'


type Props = {
  isLoading: boolean
}

const Hero = ({ isLoading }: Props) => {
  const parentRef = useRef(null)
  const marqueeRef = useRef(null)
  const splitRef = useRef(null)
  const wordref = useRef(null)

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
        duration: 1.5,
        ease: Power4.easeInOut,
        delay: -.5,
      })
     
      tl.to(parentRef.current, {
       clipPath:"circle(120% at 50% 50%)",
        
        duration: 2,
        borderRadius: 0,
        ease: Power1.easeInOut,
      },"<+0.25")
      // @ts-ignore
      tl.to(splitRef.current.chars,{
        yPercent:-100,
        duration:0.5,
        stagger:0.04,
        ease:Power4.easeInOut,
      },"<+0.6")
      tl.to('.nav', {
        display:'block',
        width: '95%',
        duration: 1,
        ease: Power4.easeInOut,
      }, '>-0.8')
      



    }
  }, [isLoading])
  const parent = document.querySelectorAll('.snap-mar')
  console.log(parent)
  return (
    <div ref={parentRef} className='clipPath bg-clip-border translate-y-full  px-5   translate-x-[5vw] w-screen z-10 flex flex-col justify-between py-0 bg-white max-h-[100dvh]   box-border h-screen'>
      <div className="flex flex-col gap-10 mt-3">
        <nav className='-translate-y-100 w-1/2 nav bg-[#B1DD41] rounded-lg backdrop-blur-lg p-8  mx-auto'></nav>

        <div className='flex flex-col   iam justify-start gap-0 text-2xl md:text-4xl lg:text-7xl mx-[4vw] tracking-tighter   !leading-tight font-bold  line-clamp-1'>
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
      <div ref={wordref} className='w-full  uppercase font-black text-6xl lg:text-[13vw] text-right translate-y-full'>Gitanshu.</div>
    </div>
  )
}

export default Hero