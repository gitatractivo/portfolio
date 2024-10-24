import { useGSAP } from "@gsap/react";
import gsap, { Power1, Power4 } from "gsap";
import { useRef } from "react";
import SplitType from "split-type";
import "../loading.css";

type LoadingProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO: change color to this #141243

const Loading = ({ setIsLoading }: LoadingProps) => {
  const splitRef = useRef<SplitType | null>(null);
  const wordref = useRef<HTMLHeadingElement | null>(null);
  useGSAP(() => {
    if (wordref.current) {
      splitRef.current = new SplitType(wordref.current);

      if (splitRef.current.words) {
        const tl = gsap.timeline();

        tl.to(

          splitRef.current.words.map((word) => word.children[0]),
          {
            y: 0,
            duration: 0.001,
            ease: Power4.easeInOut,
          }
        );
        if (splitRef.current.words[0]?.children) {
          tl.to(splitRef.current.words[0].children, {
            y: 0,
            fontWeight: 900,
            className: "char2",
            delay: 0.5,
            duration: 0.15,
            stagger: 0.024,
            ease: Power1.easeIn,
          });
        }

        if (splitRef.current.words[1]?.children) {
          tl.to(
            splitRef.current.words[1].children,
            {
              y: 0,
              fontWeight: 900,
              className: "char2",
              duration: 0.15,
              stagger: 0.04,
              ease: Power1.easeIn,
            },
            "<"
          );
        }
        

        
        tl.to(".gt", {
          delay: 0.0625,
          duration: 0.04,
          className: "gt  ",
        });

        tl.to(
          splitRef.current.chars,
          {
            fontWeight: 900,
            duration: 0.15,

            className: "font-black char3",
          },
          "<"
        );
       
        tl.to(".gt", {
          duration: 1,
          opacity: 0,
          scale: 80,
          ease: Power4.easeIn,
          backgroundColor: "white",
        });
       
        tl.to(
          ".dis",
          {
            duration: 1,
            ease: Power4.easeIn,
            backgroundColor: "transparent",
          },
          "<"
        );
        tl.to(
          ".dis",
          {
            className: "hidden",
          },
          ">"
        );
        tl.call(
          () => {
            setIsLoading(false);
            window.scrollTo(0, 0);
          },
          undefined,
          ">-1.15"
        );
      }
    }
  }, []);

  return (
    <div
      className="dis fixed w-full min-h-dvh z-[999]  bg-gradient-to-t from-[#5166DB] to-[#141243] backdrop-filter backdrop-blur-lg  text-white text-center flex justify-center items-center  text-4xl md:text-8xl  
    "
    >
      <h1
        ref={wordref}
        className="gt z-10 overflow-hidden inline-block bg-gradient-to-tl from-white to-[rgba(160,172,242,0.8)] text-black  px-2 py-1 md:px-6   "
      >
        Gitanshu Talwar
      </h1>
    </div>
  );
};

export default Loading;
