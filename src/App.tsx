
import { useState } from "react"
import Base from "./components/Base"
import Hero from "./components/Hero"
import Loading from "./components/Loading"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  return (

    <div className="w-screen min-h-dvh overflow-x-hidden">

      <Loading setIsLoading={setIsLoading}/>
      <Hero isLoading={isLoading}/>
      <Base/>
    </div>
  )
}

export default App