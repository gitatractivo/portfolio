import { useGSAP } from '@gsap/react'
import gsap, { Power4 } from 'gsap'
import { useRef } from 'react'
import SplitType from 'split-type'
import "../loading.css"

type LoadingProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Loading = ({ setIsLoading }: LoadingProps) => {
  const splitRef = useRef(null)
  const wordref = useRef(null)
  useGSAP(() => {

    if (wordref.current) {
      //@ts-ignore
      splitRef.current = new SplitType(wordref.current)

      const tl = gsap.timeline()
      //@ts-ignore
      tl.to(splitRef.current.words.map(word => word.children[0]), {
        y: 0,
        delay: 0.1,
        duration: 0.05,
        stagger: 0.02,
        ease: Power4.easeInOut,

      })

      //@ts-ignore
      tl.set(splitRef.current.chars, {
        delay: 1,
        duration: 0.5,
        stagger: 0.01,

        className: "char2",
        ease: Power4.easeIn,

      })
      //@ts-ignore
      tl.to(splitRef.current.words[0].children, {
        y: 0,
        delay: .2,
        duration: 0.1,
        stagger: 0.02,
        ease: Power4.easeIn,

      }, ">")
      //@ts-ignore
      tl.to(splitRef.current.words[1].children, {
        y: 0,
        duration: 0.1,
        stagger: 0.01,
        ease: Power4.easeIn,

      }, "<")
      tl.to('.gt', {
        delay: 1,
        duration: 0.4,
        className: "gt bg-[#5546FF] font-[#5546FF]"
      })
      //@ts-ignore
      tl.to(splitRef.current.chars, {
        fontWeight: 900,
        duration: 0.4,

        className: "font-black char3"
      }, "<")
      tl.to('.gt', {
        duration: 1,
        opacity: 0,
        scale: 80,
        ease: Power4.easeIn,
        backgroundColor: "white",
      })
      // tl.to('.gt',{
      //   duration:2,
      //   translateX:"60%",
      //   // scale:1000
      // },"-=1")
      tl.to('.dis', {
        duration: 1,
        ease: Power4.easeIn,
        backgroundColor: "transparent",
      }, '<')
      tl.to('.dis', {
        className: "hidden"
      }, '>')
      tl.call(() => {
        setIsLoading(false);
      }, undefined, ">");
    }

  }, [])

  return (
    <div className='dis fixed w-full min-h-dvh z-[999]  bg-[#5546FF]  text-white text-center flex justify-center items-center  text-4xl md:text-8xl  
    '>
      <h1 ref={wordref} className='gt bg-white text-[#5546FF]  px-2 py-1 md:px-6   inline-block '>

        Gitanshu Talwar
      </h1>
    </div>
  )
}

export default Loading