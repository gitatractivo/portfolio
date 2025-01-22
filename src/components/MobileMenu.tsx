import { useEffect, useRef, useState } from 'react';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import cn from '../utils/cn';
import { useScroll } from '../contexts/ScrollContext';

const arr = ["home", "about", "projects", "contact"];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={cn(
          "absolute z-[999] md:hidden top-5 right-5 p-3 bg-opacity-70 bg-slate-500 rounded-full cursor-pointer transition-colors w-10 h-10 ",
          isOpen && "bg-black ",
          isOpen ? "duration-200" : "duration-[300ms] delay-700"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className=" relative w-full h-full">
          <RxCross2
            width={24}
            height={24}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-opacity duration-700",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          />
          <RxHamburgerMenu
            width={24}
            height={24}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-opacity duration-700",
              isOpen ? "opacity-0" : "opacity-100"
            )}
          />
        </div>
      </button>

      <div
        className={`fixed z-40 inset-0 bg-black  ease-in-out transition-all duration-[1000ms] ${
          isOpen ? "visible bg-opacity-80" : "invisible"
        }`}
        style={{
          clipPath: isOpen
            ? "circle(150% at calc(100% - 2.5rem) 2.5rem)"
            : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        }}
      >
        {/* Add your menu content here */}
        <div className="flex items-center justify-center h-full text-white">
          <nav className="text-2xl flex flex-col space-y-6">
            {arr.map((route) => (
              <NavButton text={route} key={route} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};



interface NavButtonProps {
  text: string;
}

const NavButton = ({ text }: NavButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollTo } = useScroll();


  return (
    <button
      ref={ref}
      onClick={() => scrollTo(`#${text}`)}
      className=""
    >
      <span className="z-50 uppercase font-black hover:text-zinc-300 hover:opacity-80 relative">{text}</span>
    </button>
  );
};
export default MobileMenu;
