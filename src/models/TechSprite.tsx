import { ArrowHelper, Box3, BoxHelper, Euler, Loader, Mesh, Plane, PlaneHelper, Scene, Sprite, SpriteMaterial, Texture, TextureLoader, Vector3 } from "three";
import { Actor } from "./Actor";
import imagedata from "@/jsons/imagedata.json"
import { SpriteMap } from "./SpriteMap";

const pngsrcroot = 'images/techstacks/'

export class TechSprite extends Actor{
    private map:Texture;
    private material:SpriteMaterial;
    protected name:string

    constructor(s:Scene, l:TextureLoader, pngname:string){
        super(s, l)
        this.name = pngname
        this.map = (this.loader as TextureLoader).load(pngsrcroot+this.name)
        this.material = new SpriteMaterial({map:this.map})
        this.object = new Sprite(this.material);
        this.scene.add(this.object)
        this.object.position.set(0,0,-20);
    }

    initialize(): boolean {
        if(this.object==undefined){return false}
        let sprite = this.object as Sprite;
        sprite.geometry.computeBoundingBox();
        if(sprite.geometry.boundingBox){
            let a = new Vector3();
            sprite.getWorldScale(a)
            this.resizeSprite(2.5);
            return true;
        }     
    
        return false;
    }
 
    animate(inc:number): void {
        
    }

    private resizeSprite(scale:number):boolean{
        let w = Number(imagedata[this.name as keyof typeof imagedata].width);
        let h = Number(imagedata[this.name as keyof typeof imagedata].height);

        if(isNaN(w) || isNaN(h) || this.object==undefined){ 
           return false;
        }
        let sprite = this.object as Sprite
        h = h/w*scale;
        w = 1*scale;
        sprite.scale.set(w, h, 1)
        return true
    }

    public viewBoundingBox(){
        if(!this.object){return}
        this.scene.add(new BoxHelper(this.object))
    }
}

export class TechSpriteAnimated extends TechSprite{
    private trajectoryFinished:boolean = true
    private floor:Plane
    private position = new Vector3(-18,-5,-50)
    private velocity:Vector3 = new Vector3(0,0,0);
    private acceleration:Vector3 = new Vector3(0,0,0);

    constructor(s:Scene, l:TextureLoader, n:string, floor:Plane){
        super(s,l,n)
        this.object?.position.copy(this.position);
        this.floor = floor
        this.setStartingCondition();
    }
    
    override animate(inc: number): void {
        this.object?.position.copy(this.position)
        if(!this.trajectoryFinished){this.playTrajectory(inc)}
        this.checkAboveFloor()
    } 

    private checkAboveFloor(){
        let d = this.floor.distanceToPoint(this.position)
        if(Math.abs(d)<1){this.trajectoryFinished = true}
        this.floor.normal
    }

    //randomly set velocity that is facing the chest's openning
    public setStartingCondition(){
        this.position.set(-18,-5,-50)
        let vup = new Euler(0.5, -Math.PI/4, -Math.PI/2);
        vup.z = 0.01

        let vrandom = new Euler(0.5, -Math.PI/4, -Math.PI/2)
        vrandom.y += (Math.random()-0.5)*Math.PI

        const upVector = new Vector3(0,4,0)
        upVector.applyEuler(vup)
        const randVector = new Vector3(0,1,0)
        randVector.applyEuler(vrandom)
        this.velocity.addVectors(upVector, randVector)
    
        const grav = new Vector3(0,-0.9,0)
        grav.applyEuler(vup)
        this.acceleration = grav
    }

    public startTrajectory(){
        this.trajectoryFinished = false;
        this.setStartingCondition();
    }

    public retrieve(){
        this.setStartingCondition();
        this.trajectoryFinished = true
    }

    private playTrajectory(inc:number){
        this.position.set(
            this.position.x + inc*this.velocity.x,
            this.position.y + inc*this.velocity.y,
            this.position.z + inc*this.velocity.z,
        )
        this.velocity.set(
            this.velocity.x + inc*this.acceleration.x,
            this.velocity.y + inc*this.acceleration.y,
            this.velocity.z + inc*this.acceleration.z,
        )
    }
    private playBreathe(){
    }

    public addToMap(sm: SpriteMap){
        sm.addSprite(this.name, this)
    }
}