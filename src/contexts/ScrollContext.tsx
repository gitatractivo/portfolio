import { createContext, useContext } from "react";
import type Locomotive from "locomotive-scroll";

type ScrollContextType = {
  scroll: Locomotive | null;
  scrollTo: (target: string) => void;
};

export const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children, locomotiveRef }) => {
  const scrollTo = (target: string) => {
    const targetElement = document.querySelector(target);
    console.log(locomotiveRef.current, target,targetElement);
    if (locomotiveRef.current) {

      locomotiveRef.current.scrollTo(targetElement, {
        offset: 0,
        duration: 2,
        lerp: 0.07,

      });
    }
  };

  return (
    <ScrollContext.Provider value={{ scroll: locomotiveRef.current, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useScroll must be used within ScrollProvider");
  return context;
};
