import { useGSAP } from "@gsap/react";
import { useIntersection } from "@mantine/hooks";
import gsap, { Power4 } from "gsap";
import { useRef, useState } from "react";
import SplitType from "split-type";

type Props = {
  isLoaded: boolean;
};

const WhoAmI = ({ isLoaded }: Props) => {
  const whoRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const splitRef1 = useRef<SplitType | null>(null);
  const splitRef2 = useRef<SplitType | null>(null);
  const [revealed1, setRevealed1] = useState(false);
  const [revealed2, setRevealed2] = useState(false);

  const { ref: whoIntersectionRef, entry: whoEntry } = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: "30%",
  });

  const { ref: pIntersectionRef, entry: pEntry } = useIntersection({
    root: null,
    threshold: 1,
    rootMargin: "25%",
  });

  const tl = gsap.timeline();

  useGSAP(() => {
    if (!revealed1 && whoEntry?.isIntersecting && whoRef.current) {
      splitRef1.current = new SplitType(whoRef.current);
      if (splitRef1.current) {
        tl.fromTo(
          splitRef1.current.chars,
          { opacity: 0 },
          {
            opacity: 1,
            yPercent: "-300",
            duration: 0.7,
            ease: Power4.easeInOut,
            stagger: 0.08,
            delay: 0.01,
          }
        );
      }
      setRevealed1(true);
    }
  }, [whoEntry?.isIntersecting, isLoaded]);

  useGSAP(() => {
    if (!revealed2 && pEntry?.isIntersecting&& pRef.current) {
      splitRef2.current = new SplitType(pRef.current);
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

  return (
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
          className="mt-[1.5vh] text-[1.5vw] overflow-hidden leading-8 px-[2vw] tracking-wider whoP font-mono"
        >
          I am a full stack developer from India passionate about building
          impactful projects.
        </p>
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default WhoAmI;
