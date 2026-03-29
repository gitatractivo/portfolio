  import { useGSAP } from "@gsap/react";
import gsap, { Power4 } from "gsap";
import { useRef } from "react";
import SplitType from "split-type";

type Props = {
  isLoaded: boolean;
};

const WhoAmI = ({ isLoaded }: Props) => {
  const whoRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const splitRef1 = useRef<SplitType | null>(null);
  const splitRef2 = useRef<SplitType | null>(null);

  useGSAP(() => {
    if (whoRef.current) {
      splitRef1.current = new SplitType(whoRef.current);
      if (splitRef1.current) {
        gsap.fromTo(
          splitRef1.current.chars,
          { opacity: 0 },
          {
            opacity: 1,
            yPercent: "-300",
            duration: 0.7,
            ease: Power4.easeInOut,
            stagger: 0.08,
            delay: 0.01,
            scrollTrigger: {
              trigger: whoRef.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      }
    }
  }, [isLoaded]);

  useGSAP(() => {
    if (pRef.current) {
      splitRef2.current = new SplitType(pRef.current);
      if (splitRef2.current) {
        gsap.from(splitRef2.current.lines, {
          yPercent: "700",
          duration: 1,
          ease: Power4.easeInOut,
          stagger: 0.3,
          delay: 0.3,
          scrollTrigger: {
            trigger: pRef.current,
            start: "top 80%",
            once: true,
          }
        });
      }
    }
  }, [isLoaded]);

  return (
    <div className="flex px-[7vw] flex-col md:flex-row">
      <div className="flex flex-col justify-center min-h-[80vh] w-full items-center h-full">
        <h1
          ref={whoRef}
          className="text-[6vw] translate-y-[300%] font-mono px-[2vw] leading-[4vw] text-left w-full font-black"
        >
          Who am I?
        </h1>
        <p
          ref={pRef}
          className="mt-[1.5vh] text-[1.5vw] overflow-hidden leading-8 px-[2vw] tracking-wider whoP font-mono"
        >
          I am a full stack developer from India passionate about building
          impactful projects.
        </p>
      </div>
      {/* Profile Image - Twitter */}
      <div className="w-full flex justify-center items-center mt-8">
        <img
          onClick={() => {
            window.open("https://twitter.com/gitatractivo", "_blank");
          }}
          ref={(img) => {
            if (img) {
              // gsap.fromTo(
              //   img,
              //   { scale: 0.5, opacity: 0 },
              //   {
              //     scale: 1,
              //     opacity: 1,
              //     duration: 1.1,
              //     ease: Power4.easeOut,
              //     delay: 0.2,
              //     // cute bounce
              //     y: -10,
              //     yoyo: true,
              //     repeat: 1,
              //     repeatDelay: 0.1,
              //   }
              // );
            }
          }}
          src="https://unavatar.io/twitter/gitatractivo"
          alt="Gitanshu Talwar Twitter Profile"
          className="w-40 h-40 lg:w-96 lg:h-96 rounded-full border-4 border-black-400 shadow-lg object-cover bg-white"
          style={{ background: "white" }}
        />
      </div>
    </div>
  );
};

export default WhoAmI;
