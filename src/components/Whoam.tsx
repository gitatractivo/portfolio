import { useGSAP } from "@gsap/react";
import { useIntersection } from "@mantine/hooks";
import gsap, { Power1, Power3, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import SplitType from "split-type";
import Projects from "./Projects";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    // console.log(whoEntry)
    gsap.registerPlugin(ScrollTrigger);

    if (!revealed1 && whoEntry?.isIntersecting) {
      // @ts-ignore
      splitRef1.current = new SplitType(whoRef.current);
      console.log(splitRef1.current);
      if (splitRef1.current) {
        tl.fromTo(
          splitRef1.current.chars,
          {
            opacity: 0,
          },
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
      // borderRadius: "28px",
      // backgroundColor:"blue",

      ease: Power1.easeOut,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 2%",
        scrub: 0.5,
        // markers: true
      },
    });
    tl.to(containerRef.current, {
      borderRadius: "28px",

      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 2%",
        scrub: 0.5,
        // markers: true
      },
    });
    tl.to(
      containerRef.current,
      {
        filter: "blur(0px)",
        ease: Power1.easeIn,

        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top 2%",
          scrub: 0.5,

          // markers: true
        },
      },
      "<"
    );

    ScrollTrigger.create({
      trigger: containerRef.current,
      onUpdate: (self) => {
        // locomotiveScroll.stop();
        tl.to(contentRef.current, {
          // @ts-ignore
          y:
            -(
              self.progress *
              (contentRef.current?.scrollHeight - window.innerHeight)
            ) +
            "px" +
            "+7.1vw",
          duration: 0,
        });
      },
      start: "top 2%",
      endTrigger: contentRef.current,
      end: "bottom 2%",
      scrub: 1,
      // markers:true,
      pin: true,
    });
  }, []);

  return (
    <section
      id="about"
      data-scroll
      data-scroll-section
      data-scroll-speed="+.7"
      data-scroll-offset="-200%,0"
      className="z-30  relative bg-gray-300 w-screen overflow-x-hidden min-h-screen rounded-t-3xl md:rounded-t-[3vw]  pt-[7vh] pb-16 shadow-[0_-20px_30px_-20px_#0e004b] flex flex-col"
    >
      {/* <Projects /> */}
      <div className=" flex px-[7vw] flex-col md:flex-row">
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
            I am a full stack developer from India passionate about building
            impactful projects.
          </p>
        </div>
        <div className="w-full "></div>
      </div>
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed="-.7"
        className=" py-5"
      >
        <div
          ref={containerRef}
          className="w-[95%] random mx-auto filter blur-md  scale-x-75 h-[95vh] overflow-hidden  bg-black px-4  rounded-full"
        >
          <div
            ref={contentRef}
            className="bg-black  border-black flex flex-row break-words text-white px-[5vw] py-[20vh] w-full mx-auto min-h-[150vh] gap-4"
          >
            <div className="flex w-1/2 text-[13vw] font-semibold  leading-[12vw]  flex-col">
              Why To Hire Me?
            </div>
            <div className="flex  w-1/2 py-[11vh] gap-14 flex-col ">
              <div className="flex flex-col  pl-4 w-full relative">
                <div className="absolute left-0 bottom-0 w-[2px] bg-white h-[calc(100%-80px)]"></div>
                <h1 className="text-4xl font-bold">Experience</h1>
                <p className="text-lg text-gray-300">
                  I have experience in building full stack applications using
                  various technologies etc.
                </p>
                <h1 className="text-2xl mt-4 font-bold">Smollan</h1>
                <p className=" text-gray-300">
                  Intern March 2024- April 2024<br></br>
                  Collaborated on various projects some of which where projects
                  for google. Worked on Reactjs, Nextjs, Nodejs, Docker, Aws
                  Etc. built Ci/CD pipelines. Worked on a marketing product
                  currently which is used by 10000+ people daily
                </p>
                <h1 className="text-2xl font-bold">Consituents Ai</h1>
                <p className=" text-gray-300">
                  Intern Nov 2023- March 2024<br></br>Developed various products
                  using Generative ai, React Native, Reactjs etc.
                  <br />
                  Collaborated closely with cross-functional teams to design,
                  develop, and deploy feature-rich software products. Improved
                  website load time.
                </p>
                <h1 className="text-2xl font-bold">Freelancer</h1>
                <p className=" text-gray-300">
                  Made many products and websites, using Mern Stack, Deployed
                  many applications.
                  <br />
                  Worked on performance optimisations and reducing load time.
                  Built Scalable and secure Systems and infrastructure using
                  cloud.
                </p>
              </div>
              <div className="flex flex-col  pl-4 w-full relative">
                <div className="absolute left-0 bottom-0 w-[2px] bg-white h-[calc(100%-60px)]"></div>
                <h1 className="text-4xl font-bold">Skills</h1>
                {/* <p className="text-lg text-gray-300">I have experience in building full stack applications using various technologies etc.</p> */}
                <h1 className="text-2xl mt-4 font-bold">Frontend</h1>
                <p className=" text-gray-300">
                  ReactJs, Redux, Nextjs, Svelte, Tailwind etc.
                </p>
                <h1 className="text-2xl font-bold">Backend</h1>
                <p className=" text-gray-300">
                  Nodejs, Django, FastAPi, GoFiber etc.
                </p>
                <h1 className="text-2xl font-bold">Devops</h1>
                <p className=" text-gray-300">
                  Docker, Kubernetes, Terraform, Aws, Gcp{" "}
                </p>
                <h1 className="text-2xl font-bold">Programming Languages</h1>
                <p className=" text-gray-300">
                  Java, Python, Javascript, Typescript , Go , Rust(learning){" "}
                </p>
                <h1 className="text-2xl font-bold">Soft Skills</h1>
                <p className=" text-gray-300">
                  Project Management, Team Management, Problem Solving Skills{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whoam;
