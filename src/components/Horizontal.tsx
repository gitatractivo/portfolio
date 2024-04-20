import { useGSAP } from '@gsap/react';
import { Back, gsap } from 'gsap';
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

      x: () => -(text.scrollWidth - document.documentElement.clientWidth + 500) + 'px',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        invalidateOnRefresh: true,
        scrub: 1,
        start: "left left",
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
      let f = i / l * 90
      if(i>7) f+=(30/f)
      const p =f +20+"%"
      const e = f+"%"
      console.log(p)
      gsap.from(char, {
        y: 50 * (l - i) / l + "vh",
        opacity: 0,
        duration: 1,
        ease: Back.easeOut.config(1.25),
        stagger: 0.1,
        scrollTrigger: {
          trigger: char,
          start: `left ${p}`,
          end: `right ${e}`,
          scrub: 1,
          containerAnimation: scrollTween,
          // markers: true,
        }
      })
    })

  }, []);

  return (
    <div  className="max-w-screen px-[8vw] bg-black overflow-hidden max-h-screen h-screen" ref={containerRef}>
      <div className="w-full h-full ">
        <div
          ref={textRef}
          className="w-max h-full flex justify-start items-center uppercase text-white text-[15vw] font-mono tracking-widest whitespace-nowrap  "
        >
          Developer whom you can count on!!
        </div>
      </div>
    </div>
  );
};

export default Horizontal;