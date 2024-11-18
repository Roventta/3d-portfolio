import { TechSprite, TechSpriteAnimated } from "./TechSprite";

export class SpriteMap{
    private map:Map<string, TechSpriteAnimated> = new Map();

    private techstacks:Array<Array<string>> = [];

    public addSprite(s:string, ts: TechSpriteAnimated){
        this.map.set(s, ts)
    }

    public animate(inc:number){
        this.map.forEach((v,k)=>{
            v.animate(inc);
        })
    }

    public playTrajs(i:number){
        if(i>=this.techstacks.length){return}
        let ts = this.techstacks[i]
        ts.forEach((s)=>{
            let ts = this.map.get(s)
            if(ts){ts.startTrajectory()}
        })
    }

    public retrieveAll(){
        this.map.forEach((v,k)=>{
            v.retrieve();
        })
    }

    public addTechstack(ts:Array<string>){
        this.techstacks.push(ts);
    }

}