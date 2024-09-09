import { useEffect, useRef } from "react";

const arr = ['home', 'about', 'projects', 'contact']

const NavBar = () => {
  return (
    <nav className='mix-blend-difference hidden md:block  z-50  opacity-1 fixed top-7 w-[95%] left-1/2 -translate-x-1/2 nav bg-opacity-70  bg-gradient-to-br from-gray-400 to-gray-50  rounded-[28px] backdrop-filter backdrop-blur-xl  px-8 py-6  mx-auto'>
      <div className="flex gap-6 flex-row justify-end">
        {arr.map((route) => (
          <NavButton text={route} key={route} onClick={() => console.log(route)} />
        ))}
      </div>
    </nav>
  )
}

export default NavBar

type NavButtonProps = {
  text: string;
  onClick: () => void;
}


const NavButton = ({ text, onClick }: NavButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const x = e.clientX - ref.current.getBoundingClientRect().x
        const y = e.clientY - ref.current.getBoundingClientRect().y;
        ref.current.style.setProperty('--x', x + 'px');
        ref.current.style.setProperty('--y', y - 75 + 'px');
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (ref.current) {
        const x = e.clientX - ref.current.getBoundingClientRect().x
        const y = e.clientY - ref.current.getBoundingClientRect().y;
        ref.current.style.setProperty('--x', x + 'px');
        ref.current.style.setProperty('--y', y  + 'px');
      }
    };
    // const handleMouseEnter = (e: MouseEvent) => {
    //   if (ref.current) {
    //     const x = e.clientX - ref.current.getBoundingClientRect().x
    //     const y = e.clientY - ref.current.getBoundingClientRect().y;
    //     ref.current.style.setProperty('--x', x + 'px');
    //     ref.current.style.setProperty('--y', y - 75 + 'px');
    //   }
    // };

    if (ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove);
      ref.current.addEventListener('mouseenter', handleMouseEnter);
      ref.current.addEventListener('mouseleave', handleMouseEnter);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseEnter);

      }
    };
  }, []);


  return (

    < button ref={ref} onClick={onClick} className=" navbtn uppercase bg-transparent font-bold text-black relative tracking-widest px-6 py-3 rounded-full border-2 hover:text-white z-10 before:translate-x-1/2 before:translate-y-1/2 border-black"  >
      <span className="z-50 relative">

        {text}
      </span>
    </ button>
  )

}