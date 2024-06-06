import React from 'react'
import { GoArrowUpRight } from "react-icons/go";


type Props = {}

const Projects = (props: Props) => {
  const projects = [
    {
      "title": "SocialSphere",
      "content": "Developed a Twitter-inspired social media platform. Technologies used include TRPC, Next.js 14, TypeScript, NextAuth, Tailwind CSS, Google OAuth, PostgreSQL, Docker, Prisma, and others.",
      "url": "https://github.com/gitatractivo/SocialSphere"
    },
    {
      "title": "Cavalo.in",
      "content": "Developed a Freelance Website that buys sells trucks in India and makes the entire process hassle free. Technologies used: Reactjs, Nodesjs , Redux etc. ",
      "url": "https://cavalo.in/"
    },
    {
      "title": "bigwigmedia.ai",
      "content": "Developed a Freelance Ai Website that uses gen ai to make everyday tasks simple. Tools like bio generator image generator etc. are avaiable to use.  Technologies used: Reactjs, Nodesjs, Tailwind, Stripe, Typescript Redux etc. ",
      "url": "https://bigwigmedia.ai/"
    },
    {
      "title": "E-commerce Website",
      "content": "Utilized PostgreSQL, Next.js 14, Node.js, Express, Cloudinary, Shadowing, Prisma, and other tools. Integrated Stripe Payment Gateway; Role-Based Access for buyer and seller.",
      "url": "https://github.com/gitatractivo/e-commerce"

    },
    {
      "title": "GraphQL Chat Application",
      "content": "Implemented a GraphQL-based chat application. Technologies include Next.js 14, WebSockets, PubSub, and Prisma.",
      "url": "https://github.com/gitatractivo/chat"

    },
    {
      "title": "Application design studio",
      "content": "Implemented System Designing Studio inspired by draw.io and excalidraw. Used HTML Canvas APIs, passed the data into Rest API, and stored the canvas elements in Database.",
      "url": "https://github.com/gitatractivo/designStudio"
    },
    {
      "title": "TypeMasterPro",
      "content": "Developed typing website using react js; Currently adding websocket connection for collaboration with multiple users at the same time.",
      "url": "https://github.com/gitatractivo/TypeMasterPro"

    }
  ]


  return (
    <div className='w-full min-h-screen mt-20 flex flex-col justify-center items-center p-20'>
      <h1 className='font-mono  mb-4 text-left text-[4vw] font-black leading-tight w-full '>Projects</h1>
      <div className="w-full flex flex-col">
        {projects.map((proj => (
          <div className="flex flex-row  relative overlay z-10 overflow-hidden justify-between border-b p-7 border-black">
            <div className="flex z-10 flex-col max-w-[60%] ">

              <h1 className='text-3xl font-bold font-mono'>

                {proj.title}
              </h1>
              <p className='text-sm  font-thin text-gray-600 font-mono'>

                {proj.content}
              </p>
            </div>
            <a href={proj.url} target='_blank' className="flex z-10 justify-center items-center font-semibold !outline-none font-mono flex-col text-gray-700 hover:text-gray-600">

              <GoArrowUpRight className='w-7 h-7' />
              <p>Visit</p>
            </a>

          </div>
        )))}
      </div>
    </div>
  )
}

export default Projects