'use client'

import Hero from "@/components/OpenningComponent"
import SidebarComponent from "@/components/SidebarComponent"
import React, { useRef, useState } from "react"
React.useLayoutEffect = React.useEffect 
import "./index.css"
import ChestEnhancedProjectCarousel from "@/components/ChestEnhancedProjectCarousel"
import {Scroll} from "scrollex"

const page:React.FC = () => {

    const home = useRef<HTMLDivElement>(null)
    const projs = useRef<HTMLDivElement>(null)

    return (
            <div className="relative z-0 flex h-screen">
                <SidebarComponent home={home}/>
                <Scroll.Container scrollAxis="y" className="h-screen">
                    <Scroll.Section className="h-screen center bg-1" ref={home}>
                    <Hero projs={projs}/>
                    </Scroll.Section>
                    <Scroll.Section ref={projs}>
                    <ChestEnhancedProjectCarousel/>
                    </Scroll.Section>
                </Scroll.Container>
            </div>
    )
}

export default page