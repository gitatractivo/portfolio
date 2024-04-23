import { useGSAP } from '@gsap/react';
import { Back,  Power4, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Horizontal = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const splitRef = useRef(null)

  useGSAP(() => {
    const container = containerRef.current;
    const text = textRef.current;
    //@ts-ignore
    splitRef.current = new SplitType(textRef.current)
    let scrollTween = gsap.to(text, {
      //@ts-ignore
      x: () => -(text.scrollWidth - document.documentElement.clientWidth +100 ) + 'px',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        invalidateOnRefresh: true,
        scrub: 1,
        start: "top top",
        // markers: true,
        pin: true,
        //@ts-ignore

        end: () => '+=' + text.offsetWidth,
      },
    });

    
    //@ts-ignore
    const l = splitRef.current.chars.length;
    //@ts-ignore
    splitRef.current.chars.forEach((char, i) => {
      // console.log()
      let f = i / 17 * 140
      if(i>13) f=i/l*100+50
      const p =f +30+"%"
      f=i/l*80
      const e = f+"%"
      console.log(p,e)
      let start = `right ${p}`
      let end = `right ${e}`
      // if(i<4){
      //   start = `top bottom`
      //   end = `top center`
      // }
      gsap.from(char, {
        y: 50 * (l - i) / l+15 + "vh",
        opacity: 0,
        duration: 1,
        ease: Back.easeOut.config(1.2),
        stagger: 0.1,
        scrollTrigger: {
          trigger: char,
          start,
          end,
          scrub: 1,
          containerAnimation: scrollTween,
          // markers: true,
        }
      })
      if (char.textContent === "o"){
        gsap.to(char,{
          yPercent:-10,
          repeat:-1,
          duration:1,
          ease:Power4.easeInOut,
          delay:0.5,
          yoyo:true
        })
      }
    })
  }, []);

  return (
    <section data-scroll data-scroll-section data-scroll-offset="-1000%,0%" className="max-w-screen px-[8vw] bg-black overflow-hidden max-h-screen h-screen" ref={containerRef}>
      <div className="w-full h-full ">
        <div
          ref={textRef}
          className="w-max translate-x-10 h-full flex justify-start items-center uppercase text-white text-[21vw] font-mono whitespace-nowrap  "
        >
          Developer whom you can count on!!
        </div>
      </div>
    </section>
  );
};

export default Horizontal;