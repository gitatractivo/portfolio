import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import  {  useRef } from 'react'
import SplitType from 'split-type'


const Loading = () => {
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
      })
      
      //@ts-ignore
      tl.set(splitRef.current.chars, {
        delay: 1,
        duration: 0.1,
        stagger: 0.01,
        className:"char2"
      })
      //@ts-ignore
      tl.to(splitRef.current.words[0].children, {
        y: 0,
        delay: 0.01,
        duration: 0.1,
        stagger: 0.01,
      },">")
      //@ts-ignore
      tl.to(splitRef.current.words[1].children, {
        y: 0,
        duration: 0.1,
        stagger: 0.01,
      },"<")
      tl.to('.gt',{
        delay:1,
        // duration:1,
        className:"gt bg-black font-black"
      })
      //@ts-ignore
      tl.to(splitRef.current.chars,{
        fontWeight:900,
        className:"font-black char3"
      },"<")
      
        

    
    
    }

    
  }, [])

  return (
    <div  className='w-full min-h-screen  bg-black  text-white text-center flex justify-center items-center  text-4xl md:text-8xl  
    '>
      <h1 ref={wordref} className='gt bg-white text-black rounded-lg px-2 py-1 md:px-4   inline-block '>

        Gitanshu Talwar
      </h1>
    </div>
  )
}

export default Loading