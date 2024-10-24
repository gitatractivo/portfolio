import { useGSAP } from "@gsap/react";
import gsap, { Expo, Power1, Power2, Power3, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import roundedOut from "../assets/Subtract.png";
// import FluidGradient from "./FluidGradient";
import { Velustro } from "uvcanvas";


type Props = {
  isLoading: boolean;
  isLoaded: boolean;
  setIsLoaded: Function;
};



const Hero = ({ isLoading, isLoaded, setIsLoaded }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLButtonElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const wordref = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const velustroContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!isLoading) {
      const tl2 = gsap.timeline({
        repeat: -1,
        defaults: {
          duration: 1,
          delay: 1,
          ease: Expo.easeInOut,
          repeatDelay: 0,
        },
      });
      tl2.to(".snap-mar", { yPercent: 0, delay: 0, duration: 0 });
      tl2.to(".snap-mar", { yPercent: -100 });
      tl2.to(".snap-mar", { yPercent: -200 });
      tl2.to(".snap-mar", { yPercent: -300 });
      tl2.to(".snap-mar", { yPercent: -400 });

      if (wordref.current) {
        splitRef.current = new SplitType(wordref.current);
        const tl = gsap.timeline();

        // console.log(parentRef.current?.classList.remove('!translate-y-full'))
        tl.to(parentRef.current, {
          x: 0,
          y: 0,
          delay: 0.2,
          duration: 1,
          ease: Power4.easeInOut,
        });

        tl.to(
          parentRef.current,
          {
            clipPath: "circle(120% at 50% 50%)",

            duration: 1,
            borderRadius: 0,
            ease: Power3.easeInOut,
          },
          ">-0.6"
        );
        tl.to(
          ".nav",
          {
            scale: 1,
            opacity: 1,
            duration: .7,
            ease: Power4.easeInOut,
          },
          ">-.9"
        );
        tl.to(
          splitRef.current.chars,
          {
            yPercent: -100,
            duration: 0.5,
            stagger: 0.06,
            ease: Power2.easeInOut,
            backgroundColor: "black",
          },
          "<+0.2"
        );

        tl.call(
          () => {
            // scroll.start()
            setIsLoaded(true);
          },
          undefined,
          "<+0.5"
        );
        tl.to(
          ".base",
          {
            display: "none",
            delay: 0,
          },
          ">"
        );
        tl.to(
          "#main",
          {
            backgroundColor: "rgba(209, 213, 219, 1)",
            opacity: 1,
            duration: 0,
            ease: Power4.easeInOut,
          },
          ">"
        );

        // Add the blur effect setup after the timeline ends
        if (heroSectionRef.current) {
          ScrollTrigger.create({
            trigger: heroSectionRef.current,
            start: "bottom bottom-1%",
            end: "bottom 50%",
            scrub: true,

            onUpdate: (self) => {
              const blurAmount = self.progress * 24;
              const scaleAmount = window.innerWidth < 768 ? self.progress * 0.05 : self.progress * 0.15;
              
              gsap.to(".scaleDown", {
                filter: `blur(${blurAmount}px)`,
                scale: 1 - scaleAmount,
                duration: 0.1,
                ease: Power1.easeInOut,
              });
            },
          });
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (parentRef.current && isLoaded) {
      parentRef.current.setAttribute("data-scroll-speed", "-.3");
    }
  }, [isLoaded]);

  useEffect(() => {
    const resizeVelustro = () => {
      if (velustroContainerRef.current) {
        const container = velustroContainerRef.current;
        const parentWidth = window.innerWidth;
        const parentHeight = window.innerHeight;
        const scale = Math.max(parentWidth / 800, parentHeight / 800);
        console.log(scale, parentWidth, parentHeight);
        container.style.transform = `scale(${scale})`;
      }
    };

    resizeVelustro();
    window.addEventListener("resize", resizeVelustro);

    return () => {
      window.removeEventListener("resize", resizeVelustro);
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      data-scroll
      data-scroll-section
      data-scroll-speed="-.3"
    >
      <div
        ref={parentRef}
        className="clipPath bg-clip-border translate-y-full  md:px-[2.5vw] p-0 md:pt-44  md:pb-[10vh]  w-full  z-10 overflow-hidden flex flex-col justify-between  bg-black text-white max-h-[105dvh]     h-[110vh]"
      >
        <div className="w-full h-full relative bg-black  left-1/2 -translate-x-1/2 overflow-hidden md:rounded-[28px] box-border scaleDown">
          <div
            ref={velustroContainerRef}
            className={`w-[800px] h-[800px]   origin-top-left  hue-rotate-330 filter gradient-mask`}
          >
            <Velustro />
            
          </div>
          <div className="absolute top-0 w-full flex flex-col gap-10 mt-3">
            <div className="flex flex-col  w-full iam justify-start gap-0 text-[34px]   md:text-4xl lg:text-7xl mx-5 md:mx-[4vw]  tracking-tighter   !leading-tight font-bold  line-clamp-1">
              <h1 className="">I am a </h1>
              <h1 className="flex relative font-black md:font-bold gap-3 md:gap-4 overflow-hidden w-full">
                _
                <span ref={marqueeRef} className="snap-parent w-full">
                  <span className="w-full absolute snap-container overflow-y-hidden">
                    {roles.map((role, index) => (
                      <span
                        key={index}
                        className="text-black w-fit block snap-mar drop-shadow-3xl drop-shadow-white "
                      >
                        {role}
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
            </div>
          </div>
          <div className="w-fit  absolute rounded-tl-[14px] md:rounded-tl-[28px]    bottom-0 right-0 px-3 bg-black ">
            <img
              src={roundedOut}
              alt=""
              className="absolute hidden md:block scale-75 md:scale-100 translate-x-1/4 md:translate-x-0 -translate-y-3/4 top-0 w-fit h-fit  right-0 md:-translate-y-full"
            />
            <img
              src={roundedOut}
              alt=""
              className=" absolute hidden md:block scale-75 md:scale-100 -translate-x-3/4 md:-translate-x-full translate-y-1/4 md:translate-y-0 bottom-0 w-fit h-fit  left-0  "
            />

            <div className="w-fit overflow-hidden bg-black rounded-tl-[14px] md:rounded-tl-[28px]">
              <div
                ref={wordref}
                className="w-full  z-10  uppercase font-black text-6xl lg:text-[13vw] text-right  translate-y-full inline-block"
              >
                Gitanshu.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const roles = [
  "FullStack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Devops Engineer",
  "FullStack Developer",
];

export default Hero;
