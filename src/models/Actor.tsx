import { Loader, Object3D, Object3DEventMap, Scene, Vector3} from "three";

export abstract class Actor{
    protected scene:Scene;
    protected loader:Loader;
    protected object: Object3D<Object3DEventMap>|undefined

    constructor(s:Scene, l:Loader){
        this.scene = s;
        this.loader = l;        
    }

    public setPosition(x:number, y:number, z:number){
        this.object?.position.set(x,y,z)
    }

    public abstract initialize():boolean
    public abstract animate(inc:number):void
}