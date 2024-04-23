import { useGSAP } from '@gsap/react';
import { useIntersection } from '@mantine/hooks';
import gsap, { Power4 } from 'gsap';
import { useRef, useState } from 'react';
import SplitType from 'split-type';

type Props = { isLoaded: boolean }

const Whoam = ({isLoaded}: Props) => {
  const whoRef = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const splitRef1 = useRef<SplitType | null>(null);
  const splitRef2 = useRef<SplitType | null>(null);
  const [revealed1, setrevealed1] = useState(false)

  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.2, // Adjust the threshold as needed
    rootMargin: '0px',
  });

  useGSAP(() => {
    if (!revealed1&&entry?.isIntersecting) {
      const tl = gsap.timeline()
      // @ts-ignore
      splitRef1.current = new SplitType(whoRef.current)
      // @ts-ignore
       splitRef2.current = new SplitType(pRef.current)
      console.log(splitRef1.current,splitRef2.current)
      if (splitRef1.current) {
        tl.from(splitRef1.current.chars, {
          opacity:0,
          yPercent: "400",
          duration: 0.7,
          ease: Power4.easeInOut,
          stagger: 0.08,
          delay:.01

        })
        tl.from(splitRef2.current.lines, {
          yPercent: "300",
          duration: 1,
          ease: Power4.easeOut,
          stagger: 0.2,

        },)
        
      }
      setrevealed1(true)
    }
  }, [entry?.isIntersecting,isLoaded])

  return (
    <section
      ref={ref}
      data-scroll
      data-scroll-section
      data-scroll-speed="+.7"
      data-scroll-offset="-200%,00%"
      className='z-30 bg-gray-300 w-screen h-screen rounded-t-[3vw] px-[7vw] py-[7vh] shadow-[0_-15px_30px_-20px_#0e004b] flex flex-col'
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-center min-h-[80vh]  w-full items-center h-full">
          <h1 ref={whoRef} className='text-[6vw] font-mono px-[2vw] leading-[4vw] text-left w-full font-black'>
            Who am I?
          </h1>
          <p ref ={pRef} className='text-[1.5vw] overflow-hidden leading-6 px-[2vw] tracking-wider'>
            I am a full stack developer with a passion for
             front end development
          </p>
        </div>
        <div className="w-full "></div>
      </div>
    </section>
  )
}

export default Whoam