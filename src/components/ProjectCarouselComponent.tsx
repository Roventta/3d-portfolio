import React, { MutableRefObject} from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './global.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ProjectSlideComponent, { SlideContent } from './ProjectSlideComponent';
import { CarouselState } from '@/models/CarouselState';

const p1 = new SlideContent("Advertisement Module", "A system for user to upload advertisement. Database records the budget based on impressions, The API is concurrent designed to maintain data consistency under high traffics")
const p2 = new SlideContent("Chatroom Module", "A chatroom application. Used Websocket and Redis for the realtime communication for different groups.")
const p3 = new SlideContent("Membership authentication system", "Employed JWT for authentication, and a CRUD authorization backend for users to apply for membership")

const size = 3;

const projects:Array<SlideContent> = [p1, p2, p3]
const ProjectCarouselComponent:React.FC<{CIR:MutableRefObject<CarouselState>}>=(dto)=>{

    return (
        <div className='bg-opacity-0 w-1/4 z-10 absolute top-1/4 right-1/3'>
      <CarouselProvider
        naturalSlideWidth={25}
        naturalSlideHeight={20}
        totalSlides={size}
        orientation='vertical'
        className='content-center text-white'
      >
        <ButtonBack onClick={()=>{dto.CIR.current.dec(0)}}
        className="flex w-12 h-10 mx-auto text-center transition duration-200 ease-in-out hover:transform hover:scale-110">
            <FaChevronUp className="text-3xl text-white" />
        </ButtonBack> 
        
        <Slider className=''>
          <Slide index={0} >
            <ProjectSlideComponent p={projects[0]} CIR={dto.CIR}/>
          </Slide>
          <Slide index={1}>
            <ProjectSlideComponent p={projects[1]} CIR={dto.CIR}/>
          </Slide>
          <Slide index={2}>
            <ProjectSlideComponent p={projects[2]} CIR={dto.CIR}/>
          </Slide>
        </Slider>
        
        <ButtonNext onClick={()=>{dto.CIR.current.inc(size)}}
        className="flex w-12 h-10 mx-auto text-center transition duration-200 ease-in-out hover:transform hover:scale-110">
            <FaChevronDown className="text-3xl text-white" />
        </ButtonNext> 

      </CarouselProvider>
      </div>
    );
}

export default ProjectCarouselComponent;