import { useEffect, useRef } from "react";

const arr = ['home', 'about', 'projects', 'contact']

const NavBar = () => {
  return (
    <nav className=' z-50  opacity-0 fixed top-7 inset-x-2 w-1/2 nav bg-gray-900 bg-opacity-30 rounded-lg backdrop-filter backdrop-blur-xl  p-8  mx-auto'>
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
      console.log(e)
      if (ref.current) {
        const x = e.clientX - ref.current.getBoundingClientRect().x
        const y = e.clientY - ref.current.getBoundingClientRect().y;
        ref.current.style.setProperty('--x', x + 'px');
        ref.current.style.setProperty('--y', y - 75 + 'px');
      }
    };
    const handleMouseEnter = (e: MouseEvent) => {
      console.log(e)
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

    < button ref={ref} onClick={onClick} className="mix-blend-difference navbtn uppercase bg-transparent font-bold text-black relative tracking-widest px-6 py-3 rounded-full border-2 hover:text-white z-10 before:translate-x-1/2 before:translate-y-1/2 border-black"  >
      <span className="z-50 relative">

        {text}
      </span>
    </ button>
  )

}