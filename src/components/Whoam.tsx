
import WhoAmI from "./WhoAmI";
import WhyHireMe from "./WhyHireMe";

type Props = {
  isLoaded: boolean;
};

const Whoam = ({ isLoaded }: Props) => {
  return (
    <section
      id="about"
      data-scroll
      data-scroll-section
      data-scroll-speed="+.7"
      data-scroll-offset="-200%,0"
      className="z-30  relative bg-slate-200 w-screen overflow-x-hidden min-h-screen rounded-t-3xl md:rounded-t-[3vw]  pt-[7vh] pb-16 shadow-[0_-20px_30px_-20px_#0e004b] flex flex-col"
    >
      <WhoAmI isLoaded={isLoaded} />
      <WhyHireMe />
    </section>
  );
};

export default Whoam;
