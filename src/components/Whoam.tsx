import { useGSAP } from '@gsap/react';
import { useIntersection } from '@mantine/hooks';
import gsap, { Power1, Power4,  } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';
import SplitType from 'split-type';

type Props = {
  isLoaded: boolean;
};

const Whoam = ({ isLoaded }: Props) => {
  const whoRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const splitRef1 = useRef<SplitType | null>(null);
  const splitRef2 = useRef<SplitType | null>(null);
  const [revealed1, setRevealed1] = useState(false);
  const [revealed2, setRevealed2] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const { ref: whoIntersectionRef, entry: whoEntry } = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: '30%',
  });

  const { ref: pIntersectionRef, entry: pEntry } = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: '25%',
  });

  const tl = gsap.timeline();
  useGSAP(() => {
    // console.log(whoEntry)
    gsap.registerPlugin(ScrollTrigger);


    if (!revealed1 && whoEntry?.isIntersecting) {
      // @ts-ignore
      splitRef1.current = new SplitType(whoRef.current);
      console.log(splitRef1.current);
      if (splitRef1.current) {
        tl.fromTo(splitRef1.current.chars, {
          opacity: 0,
        }, {
          opacity: 1,
          yPercent: "-300",
          duration: 0.7,
          ease: Power4.easeInOut,
          stagger: 0.08,
          delay: 0.01,
        });
      }
      setRevealed1(true);
    }


  }, [whoEntry?.isIntersecting, isLoaded]);

  useGSAP(() => {
    // console.log(pEntry?.isIntersecting)
    if (!revealed2 && pEntry?.isIntersecting) {

      // @ts-ignore
      splitRef2.current = new SplitType(pRef.current);
      console.log("2", splitRef2.current);
      if (splitRef2.current) {
        tl.from(splitRef2.current.lines, {
          yPercent: "700",
          duration: 1,
          ease: Power4.easeInOut,
          stagger: 0.3,
          delay: 0.3,
        });
      }
      setRevealed2(true);
    }
  }, [pEntry?.isIntersecting, isLoaded]);

  useGSAP(() => {
    tl.to(containerRef.current, {
      scale: 1,
      ease: Power1.easeOut,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 2%",
        scrub: 0.5,
        // markers: true
      }
    })

   
    ScrollTrigger.create({
      trigger:containerRef.current,
      onUpdate:(self)=>{
        // locomotiveScroll.stop();
        tl.to(contentRef.current,{
          // @ts-ignore
          y: -(self.progress*(contentRef.current?.scrollHeight-window.innerHeight))+"px"+"+7.1vw",
          duration:0,

        })
      },
      start:"top 2%",
      endTrigger:contentRef.current,
      end:"bottom 2%",
      scrub: 1,
      markers:true,
      pin:true
      
      
    })

  }, []);

  return (
    <section
      data-scroll data-scroll-section data-scroll-speed="+.7" data-scroll-offset = "-200%,0"
      className="z-30 parentContainer relative bg-gray-300 w-screen overflow-x-hidden min-h-screen rounded-t-[3vw]  pt-[7vh] pb-[1vh] shadow-[0_-20px_30px_-20px_#0e004b] flex flex-col"
    >
      <div className="flex px-[7vw] flex-col md:flex-row">
        <div className="flex flex-col justify-center min-h-[80vh] w-full items-center h-full">
          <h1
            ref={(el) => {
              // @ts-ignore
              whoRef.current = el;
              whoIntersectionRef(el);
            }}
            className="text-[6vw] translate-y-[300%] font-mono px-[2vw] leading-[4vw] text-left w-full font-black"
          >
            Who am I?
          </h1>
          <p
            ref={(el) => {
              // @ts-ignore

              pRef.current = el;
              pIntersectionRef(el);
            }}
            className="mt-[1.5vh] text-[1.5vw]  overflow-hidden leading-8 px-[2vw] tracking-wider whoP font-mono"
          >
            I am a full stack developer from India passionate about building impactful projects.
          </p>
        </div>
        <div className="w-full "></div>


      </div>
      <div data-scroll data-scroll-section data-scroll-speed="-.7" className="parentContainer1 py-5">

      

        <div ref={containerRef} data-scroll data-scroll-section data-scroll-speed="-.7" className="w-[95%] random mx-auto  scale-x-75 h-screen overflow-hidden  bg-black px-4  rounded-[2vw]">
          <div ref={contentRef} data-scroll data-scroll-section data-scroll-speed="-.7"  className="bg-white  border-black text-[15vw] flex flex-col break-words  w-full mx-auto min-h-[300vh] leading-[12vw]">
          wertyuiophjsdfjcm;lkjsfd.;m;kllssdafwsedafasddf this is last
        </div>
      </div>
      </div>
    </section>
  );
};

export default Whoam;