import { useRef } from "react";
import ChestViewComponent from "./ChestViewComponent"
import ProjectCarouselComponent from "./ProjectCarouselComponent"
import "./global.css"
import { CarouselState } from "@/models/CarouselState";

const ChestEnhancedProjectCarousel:React.FC = () => {
    
    const CarouselRef = useRef<CarouselState>(new CarouselState());
    
    return (
        <div className="z-0 relative">
            <ChestViewComponent CIR={CarouselRef}/>
            <ProjectCarouselComponent CIR={CarouselRef}/>
        </div>
    )
}

export default ChestEnhancedProjectCarousel