import { useGSAP } from '@gsap/react';
import { Back,  Power4, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import SplitType from 'split-type';

// gsap.registerPlugin(ScrollTrigger);

const Horizontal = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<SplitType | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const text = textRef.current;

    if (text && container) {
      splitRef.current = new SplitType(text);
      let scrollTween = gsap.to(text, {
        x: () => -(text.scrollWidth - document.documentElement.clientWidth + 80) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          invalidateOnRefresh: true,
          scrub: 1,
          start: "top top",
          pin: true,
          end: () => '+=' + text.offsetWidth,
        },
      });

      gsap.set(container, { backgroundColor: "#000000" }); // Set initial color to black

      const colorTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => "+=" + text.offsetWidth,
          scrub: true,
        },
      });

      colorTimeline.to(container, {
        backgroundColor: "#ffb833",
        duration: 0.25,
      });

      colorTimeline.to(container, {
        backgroundColor: "#00ffd5",
        duration: 0.25,
      });

      colorTimeline.to(container, {
        backgroundColor: "#ff00ff",
        duration: 0.25,
      });

      colorTimeline.to(container, {
        backgroundColor: "#0909C4",
        duration: 0.25,
      });

      if (splitRef.current && splitRef.current.chars) {
        const l = splitRef.current.chars.length;
        splitRef.current.chars.forEach((char, i) => {
          let f = i / 17 * 140
          if(i>13) f=i/l*100+50
          const p =f +30+"%"
          f=i/l*80
          const e = f+"%" 
          let start = `right ${p}`
          let end = `right ${e}`
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
      }
    }
  }, []);

  return (
    <section
      data-scroll
      data-scroll-section
      className="max-w-screen px-[8vw] overflow-hidden max-h-screen h-screen"
      ref={containerRef}
    >
      <div className="w-full h-full">
        <div
          ref={textRef}
          className="w-max translate-x-10 h-full flex justify-start items-center uppercase text-white text-[21vw] font-mono whitespace-nowrap"
        >
          Developer whom you can count on!!
        </div>
      </div>
    </section>
  );
};

export default Horizontal;