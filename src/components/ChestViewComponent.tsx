/**
This component hosts a threejs scene that has a minecraft box in it.
Leaves interface for commanding it to play animate and change shaders
*/

import { MutableRefObject, useEffect, useRef, useState } from "react"
import * as TJS from 'three'
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { AnimationMode, ChestMeshStruct } from "@/models/ChestMesh";
import { TechSprite, TechSpriteAnimated } from "@/models/TechSprite";
import { SpriteMap } from "@/models/SpriteMap";
import imagedata from "@/jsons/imagedata.json"
import { tslFn } from "three/webgpu";
import { CarouselState } from "@/models/CarouselState";

const ChestViewComponent:React.FC<{CIR:MutableRefObject<CarouselState>}> = (dto) => {
    const DomRoot = useRef<HTMLDivElement>(null);

    const carouselStatememo = new CarouselState() 

    useEffect(()=>{
        const scene = new TJS.Scene();
        const clock = new TJS.Clock();
        const camera = new TJS.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new TJS.WebGLRenderer();
        const ambLight = new TJS.AmbientLight(0xffffff, 0.05);
        scene.add(ambLight)
        const dirLight = new TJS.DirectionalLight(0xffffff, 3) 
        dirLight.position.set(1,1,1)
        const helper = new TJS.DirectionalLightHelper( dirLight, 5 );
        scene.add( helper );
        scene.add(dirLight);

        renderer.setSize(window.innerWidth, window.innerHeight);
        if(DomRoot.current){
            DomRoot.current.innerHTML = ''
            DomRoot.current.appendChild(renderer.domElement)
        }

        const mloader = new GLTFLoader();
        const meshstruct = new ChestMeshStruct(scene, mloader, 1.25);
        meshstruct.initialize();

        const a = new TJS.ArrowHelper();
        a.position.set(-18,5,-50)
        a.rotation.set(0.5, -Math.PI/4, 0)
        a.translateY(-12)
        a.rotateX(-Math.PI/2)
        a.setLength(10)
//        scene.add(a)
        const norm = a.line.getWorldDirection(new TJS.Vector3()).normalize()
        const pos = a.position;
        const plane = new TJS.Plane(norm, -norm.dot(pos))

        const tloader = new TJS.TextureLoader();
        const spritemap = new SpriteMap()
        const technames = Object.keys(imagedata);
        technames.forEach((tn:string)=>{
            const ts = new TechSpriteAnimated(scene, tloader, tn, plane)
            ts.initialize();
            ts.addToMap(spritemap);
        })
        spritemap.addTechstack(["Nestjs.png", "Nodejs.png", "Vuejs.png", "PostgresSQL.png", "TypeScript.png"])
        spritemap.addTechstack(["TypeScript.png", "Vuejs.png", "Nestjs.png", "Socket.io.png", "Redis.png"])
        spritemap.addTechstack(["NETcore.png", "PostgresSQL.png", "React.png", "Redis.png"])

        function copyMemo(){
            carouselStatememo.index = dto.CIR.current.index
            carouselStatememo.viewingDetail = dto.CIR.current.viewingDetail
        }

        function compareIndex(){
            if(carouselStatememo.index!=dto.CIR.current.index){
                meshstruct.CloseChest();
                spritemap.retrieveAll();
                dto.CIR.current.viewingDetail=false
                copyMemo()
            }
        }

        function compareViewing(){
            if(carouselStatememo.viewingDetail==false && dto.CIR.current.viewingDetail==true){
                meshstruct.OpenChest();
                spritemap.playTrajs(dto.CIR.current.index)
                copyMemo();
            }
        }

        function animate(){
            compareIndex();
            compareViewing();
            meshstruct.animate(AnimationMode.Active);
            spritemap.animate(0.125)
            renderer.render(scene, camera)
        }
        
        renderer.setAnimationLoop(animate);
        
        window.addEventListener("keydown", (e)=>{
            switch(e.key){
                case "q": meshstruct.OpenChest(); spritemap.playTrajs(dto.CIR.current.index); break;
                case "e": meshstruct.CloseChest(); spritemap.retrieveAll(); break;
                case "w": console.log(dto.CIR.current); break
            }
        })
    })
    
    return (
        <div ref={DomRoot}
            className="bg-black"
        >
        </div>    
    )
}

export default ChestViewComponent;