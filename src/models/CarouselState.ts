export class CarouselState{
    index:number = 0;
    viewingDetail:boolean = false;

    inc(roof:number){
        if(this.index>=roof){this.index = roof}
        else{this.index+=1; this.viewingDetail = false}
    }

    dec(floor:number){
        if(this.index<=floor){this.index = floor}
        else{this.index-=1; this.viewingDetail = false}
    }

    view(){this.viewingDetail=true}

}