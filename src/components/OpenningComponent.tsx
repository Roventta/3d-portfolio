import React, { MutableRefObject, RefObject, useEffect, useState } from "react";
import ReactTextTransition from "react-text-transition"
import "./global.css"

const jobs = ["Computer Scientist", "Physics Minor", "CG Wizard", ".Net/React", "Nodejs/Vue", "Fullstack"] 
let index = 0;

const Hero:React.FC<{projs:RefObject<HTMLElement>}> = (dto) => {

  const [showingJob, setShowingJob] = useState<string>();

  useEffect(()=>{
    setShowingJob(jobs[index])
    let interval = setInterval(()=>{
      index+=1;
      if (index >= jobs.length) {index=0;}
      setShowingJob(jobs[index])
    }, 4000)

    return () => {clearInterval(interval)}
  })

  return (
    <div className="flex justify-between items-center bg-[#000000] py-10 lg:py-0 w-screen h-screen z-0">
      {/* Hero content */}
      <div className="px-20 space-y-5 lg:py-6 w-1/1" >
        <h1 className="text-6xl md:text-6xl font-serif w-11/12 text-white">
            Heming (Isaac) Zhu
          <ReactTextTransition className="text-white" inline>
            {showingJob}
          </ReactTextTransition>
        </h1>
        <h2 className="w-9/12 bold font-serif text-2xl text-[#c85c2e]">
          I practice Creativity in system designs with Caution.
        </h2>
        <h2 className="text-white">Address: Braddon Canberra</h2>
        <button className="border border-black bg-white px-4 py-2 rounded-full font-medium active:scale-90 transition duration-100"
          onClick={()=>{dto.projs.current?.scrollIntoView({behavior:'smooth'})}}
        >
          view my projects
        </button>
      </div>
      {/* Hero image */}
      <div className="flex items-center justify-end h-screen ">
      <img
        className="hidden sm:inline-flex h-screen object-cover"
        src="/images/heroimage.png"
        alt=""
      />
      </div>
    </div>
  );
};
export default Hero;