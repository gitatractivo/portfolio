import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

type Props = {
  isLoaded: boolean;
};

const WhyHireMe = ({ isLoaded }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content) return;

      gsap.fromTo(
        container,
        { scaleX: 0.75, opacity: 0.85 },
        {
          scaleX: 1,
          opacity: 1,
          ease: Power3.easeOut,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "top 2%",
            scrub: 0.5,
          },
        },
      );

      gsap.to(content, {
        y: () => -Math.max(0, content.scrollHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 2%",
          endTrigger: content,
          end: "bottom 2%",
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      const setFilter = gsap.quickSetter(container, "filter");
      const setScale = gsap.quickSetter(container, "scale");
      const setRadius = gsap.quickSetter(container, "borderRadius");
      const ease = gsap.parseEase("power3.inOut");


      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "top top",
        scrub: true,
        

        onUpdate: (self) => {
          const p = ease(self.progress);

          const blur = (1-p) * 24;
          const scale = window.innerWidth > 768 ? 1 - p * 0.15 : 1;


          const MAX_RADIUS = window.innerWidth/2;
          const MIN_RADIUS = 28;
          const radius = MIN_RADIUS + (1 - p) * (MAX_RADIUS - MIN_RADIUS);

          setFilter(`blur(${blur}px)`);
          setScale(scale);
          setRadius(`${radius}px`);
        },
      });
    });

    return () => ctx.revert();
  }, [isLoaded]);

  

  return (
    <div
      // data-scroll
      // data-scroll-section
      // data-scroll-speed="-.7"
      className="py-5"
    >
      <div
        ref={containerRef}
        className="w-[95%] random mx-auto h-[95vh] overflow-hidden bg-black px-4 rounded-full blur-md filter opacity-[0.85] scale-x-[0.75] origin-center"
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
                for google. Worked on Reactjs, Nextjs, Nodejs, Docker, Aws Etc.
                built Ci/CD pipelines. Worked on a marketing product currently
                which is used by 10000+ people daily
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
                Made many products and websites, using Mern Stack, Deployed many
                applications.
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
  );
};

export default WhyHireMe;
