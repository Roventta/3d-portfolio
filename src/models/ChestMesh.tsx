import assert from "assert";
import { AnimationClip, AnimationMixer, CubicBezierCurve, Group, Loader, Object3DEventMap, Scene, Vector2, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import {createActor, createMachine} from 'xstate'

export enum AnimationMode{
    Active,
    Passive
}

export class ChestMeshStruct{
    private lidOpenPortion:number = 0;
    private lidBreath:number = 0;
    private lidLargest:number;
    private lidvirtualStart = 0.2;
    private lidvirtualEnd = 0.8;
    private curve:CubicBezierCurve = new CubicBezierCurve(
        new Vector2(0,this.lidvirtualStart), new Vector2(0.08, 0.47), new Vector2(0.98, .52), new Vector2(1,this.lidvirtualEnd)
    );
    private scene:Scene;
    private loader:GLTFLoader;
    private mixer:AnimationMixer|undefined;
    private speed = -0.03;
    private timestamp = 0;
    
    private mesh:Group<Object3DEventMap>|undefined;
    private meshScale = new Vector3(0.05,.05,.05)

    constructor(s:Scene, loader:GLTFLoader, l:number){
        this.scene = s;
        this.loader = loader
        this.lidLargest = l;
        assert(this.lidLargest>0, "ChestMesh's largest lid open magnitude should be greater than zero")    
    }

    private onLoadChest(gltf:GLTF){
            this.scene.add(gltf.scene);
            gltf.scene.scale.set(0.05,0.05,0.05);
            gltf.scene.rotation.set(0.5,-Math.PI/4,0);
            gltf.scene.position.set(-18,-5,-50)

            const mixer = new AnimationMixer(gltf.scene);
            const clip = AnimationClip.findByName(gltf.animations, 'Chest_0_A|Chest_0_AAction');
            const action = mixer.clipAction(clip);
            action.play();
            this.mixer = mixer
            this.mesh = gltf.scene
    }

    //initialize mesh, animation mixers
    public initialize(){
        this.loader.load("3dAssets/minecraft_chest.glb", this.onLoadChest.bind(this))
    }

    public meshSquash(time:number){
        if(time>1){time=1}
        if(time<0){time = 0}
        if(this.mesh != undefined){
            let temp = -time*(time-1)
            this.mesh.scale.setY(this.meshScale.y+(temp+this.lidBreath)*0.05)
            this.mesh.scale.setZ(this.meshScale.z+(temp+this.lidBreath)*0.025)
        }
    }

    public setLidOpenPortion(time:number):number{
        if(time>1){time = 1; this.chestopened()}
        if(time<0){time = 0; this.chestclosed()}
        let temp = this.curve.getPoint(time).y * this.lidLargest;
        let out = Math.abs(temp - this.lidOpenPortion);
        this.lidOpenPortion = temp
        return out;
        //this.lidOpenPortion = time*this.lidLargest
    } 
    private setMeshLidOpen(){
        this.mixer?.setTime(this.lidOpenPortion + this.lidBreath)    
    }

    public playBreath(){
        this.lidBreath = 0.05*Math.sin(0.5*Math.PI*2*this.timestamp)
    }

    public animate(m:AnimationMode){
        switch(m){
            case AnimationMode.Active: {
                this.timestamp+=this.speed;
                this.setLidOpenPortion(this.timestamp);
                this.meshSquash(this.timestamp)
                break
            }
        }
        this.playBreath();
        this.setMeshLidOpen();
    }

    private AnimateOpenLid(){
        this.timestamp = 0;
        this.speed = Math.abs(this.speed)
    }

    private AnimateCloseLid(){
        this.timestamp = 1;
        this.speed = Math.abs(this.speed)*-1
    }

    private animationStateMachine = createMachine({
        initial: 'closed',
        states:{
            closed: {on: {'openchest': {target: 'opening', actions: () => this.AnimateOpenLid()}}},
            opening: {on: {'chestopened': {target: 'opened'}}},
            opened: {on: {'closechest': {target: 'closing', actions: () => this.AnimateCloseLid()}}},
            closing: {on: {'chestclosed': {target: 'closed'}}}
        }
    })
    private animationActor = createActor(this.animationStateMachine).start()

    public OpenChest(){
        this.animationActor.send({type: 'openchest'})
    }
    private chestopened(){
        this.animationActor.send({type: 'chestopened'})
    }
    private chestclosed(){
        this.animationActor.send({type: 'chestclosed'})
    }
    public CloseChest(){
        this.animationActor.send({type: 'closechest'})
    }
}