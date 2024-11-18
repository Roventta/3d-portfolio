import { MutableRefObject } from 'react'
import './global.css'
import { CarouselState } from '@/models/CarouselState'

export class SlideContent{
    title: string = 'title'
    description: string = 'description'

    constructor(t?:string, d?:string){
        if(t){this.title = t};
        if(d){this.description = d};
    }
}

const ProjectSlideComponent:React.FC<{p:SlideContent, CIR:MutableRefObject<CarouselState>}> = (p) => {
    return (
        <div className='relative h-72'>
            <h2 className="text-eyecatcher text-4xl font-bold">{p.p.title}</h2>
            <div className="text-white">{p.p.description}</div>
            <button className="text-black absolute right-0 bottom-0 border border-black bg-white px-4 py-2 rounded-full font-medium active:scale-90 transition duration-100"
                 onClick={()=>{p.CIR.current.viewingDetail=true}}
            >read Details and Tech stack</button>
        </div>
    )
}

export default ProjectSlideComponent