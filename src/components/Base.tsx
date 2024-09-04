

const Base = () => {
  return (
    <div className='fixed base top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-white -z-10'>
      <div className="z-50 text-center items-center gap-4 md:gap=8 flex capitalize italic absolute top-14 flex-wrap justify-center w-full text-6xl md:text-9xl text-green-500 font-dancing">
        build
          <span className="my-auto p-2 md:p-4  bg-blue-500 rounded-full !w-fit !h-fit " />
         scale 
        <span className="my-auto p-2 md:p-4  bg-blue-500 rounded-full !w-fit !h-fit " />
         deploy
      </div>
    </div>
  )
}

export default Base