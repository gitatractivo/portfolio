import { useGSAP } from "@gsap/react";
import gsap, { Expo, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import roundedOut from "../assets/Subtract.png";
import FluidGradient from "./FluidGradient";

type Props = {
  isLoading: boolean;
  isLoaded: boolean;
  setIsLoaded: Function;
};

const Hero = ({ isLoading, isLoaded, setIsLoaded }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLButtonElement>(null);
  const splitRef = useRef<HTMLButtonElement>(null);
  const wordref = useRef(null);

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
      //@ts-ignore
      splitRef.current = new SplitType(wordref.current);
      const tl = gsap.timeline();

      // console.log(parentRef.current?.classList.remove('!translate-y-full'))
      tl.to(parentRef.current, {
        x: 0,
        y: 0,
        duration: 1.6,
        ease: Power4.easeInOut,
      });

      tl.to(
        parentRef.current,
        {
          clipPath: "circle(120% at 50% 50%)",

          duration: 2,
          borderRadius: 0,
          ease: Power4.easeInOut,
        },
        "<+0.25"
      );
      tl.to(
        // @ts-ignore
        splitRef.current.chars,
        {
          yPercent: -100,
          duration: 0.5,
          stagger: 0.04,
          ease: Power4.easeInOut,
          backgroundColor: "black",
        },
        "<+0.6"
      );

      tl.from(
        ".nav",
        {
          scale:0.1,
          opacity: 0,
          duration: 1,
          ease: Power4.easeInOut,
        },
        ">-1"
      );
      tl.call(
        () => {
          // scroll.start()
          setIsLoaded(true);
        },
        // @ts-ignore
        null,
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
    }
  }, [isLoading]);

  useEffect(() => {
    if (parentRef.current && isLoaded) {
      parentRef.current.setAttribute("data-scroll-speed", "-.3");
    }
  }, [isLoaded]);
  // data-scroll data-scroll-section data-scroll-speed="-.3"
  return (
    <section data-scroll data-scroll-section data-scroll-speed="-.3">
      {/* @ts-ignore */}
      <div
        ref={parentRef}
        className="clipPath bg-clip-border translate-y-full  px-[2.5vw] pt-28 md:pt-44 pb-[10vh]  w-full  z-10 overflow-hidden flex flex-col justify-between  bg-black text-white max-h-[105dvh]     h-[110vh]"
      >
        {/* <img
          src={roundedOut}
          alt=""
          className=" scale-[2] w-fit h-fit z-50  -translate-x-full"
        /> */}
        {/* <div className="w-full h-full rounded-lg box-border bg-white"></div> */}

        <div className="w-full h-full relative bg-black  left-1/2 -translate-x-1/2 overflow-hidden rounded-[14px] md:rounded-[28px] box-border">
          <FluidGradient />

          <div className="absolute top-0 w-full flex flex-col gap-10 mt-3">
            <div className="flex flex-col  w-full iam justify-start gap-0 text-[34px]   md:text-4xl lg:text-7xl mx-5 md:mx-[4vw]  tracking-tighter   !leading-tight font-bold  line-clamp-1">
              <h1 className="">I am a </h1>
              <h1 className="flex relative font-black md:font-bold gap-3 md:gap-4 overflow-hidden w-full">
                _
                <span ref={marqueeRef} className="snap-parent w-full ">
                  <span className="w-full  absolute snap-container overflow-y-hidden  ">
                    <span className="text-black   w-fit block snap-mar ">
                      FullStack Developer
                    </span>
                    <span className="text-black  w-fit block snap-mar">
                      Frontend Developer
                    </span>
                    <span className="text-black  w-fit block snap-mar">
                      Backend Developer
                    </span>
                    <span className="text-black four w-fit block snap-mar">
                      Devops Engineer
                    </span>
                    <span className="text-black w-fit block snap-mar ">
                      FullStack Developer
                    </span>
                  </span>
                </span>
              </h1>
            </div>
          </div>

          <div className="w-fit  absolute rounded-tl-[14px] md:rounded-tl-[28px]    bottom-0 right-0 px-3 bg-black ">
            <img
              src={roundedOut}
              alt=""
              className="absolute scale-75 md:scale-100 translate-x-1/4 md:translate-x-0 -translate-y-3/4 top-0 w-fit h-fit  right-0 md:-translate-y-full"
            />
            <img
              src={roundedOut}
              alt=""
              className=" absolute scale-75 md:scale-100 -translate-x-3/4 md:-translate-x-full translate-y-1/4 md:translate-y-0 bottom-0 w-fit h-fit  left-0  "
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

export default Hero;
