import {GridConfig} from './GridConfig';
import { assert } from './utils';

export interface PaginationRange{
    start:number;
    end:number;
}


// when a method returns true it means that a change has occurred (so a refresh is needed)
export interface Paginator{
    getCurrentRange():PaginationRange;
    next():boolean;
    prev():boolean;
    prepForAdd():boolean;
    currentPage():number;
}

class NullPaginator<Type> implements Paginator{
    private data:Type[];
    constructor(data:Type[]){
        this.data=data;
    }

    getCurrentRange():PaginationRange{
        return {start:0,end:this.data.length};
    }

    next():boolean{
        return false;
    }

    prev():boolean{
        return false;
    }

    prepForAdd():boolean{
        return false;
    }

    currentPage():number{
        return 0;
    }
}

class ActualPaginator<Type> implements Paginator{
    private pageSize:number;
    private data:Type[];
    private current:number;
    constructor(data:Type[],pageSize:number){
        this.data=data;
        this.pageSize=pageSize;
        this.current=0;
    }

    getCurrentRange():PaginationRange{
        const start=this.pageSize*this.current;
        let end=start+this.pageSize;   
        const len=this.dataLength();
        if(end>=len){
            end=len;
        }
        return {start,end};
    }

    dataLength(){
        return this.data.length;
    }

    private canGoNext():boolean{
        const nextIndex=(this.current+1)*this.pageSize;
        return nextIndex<this.dataLength();
    }

    next():boolean{
        if(this.canGoNext()){
            this.current++;
            return true;
        }else{
            return false;
        }
    }

    private canGoPrev():boolean{
        const prevIndex=(this.current-1)*this.pageSize;
        return prevIndex>=0;

    }

    prev():boolean{
        if(this.canGoPrev()){
            this.current--;
            return true;
        }else{
            return false;
        }
    }

    prepForAdd():boolean{
        const page=Math.floor(this.dataLength()/this.pageSize);
        //console.log(this.dataLength(),page,this.current);
        if(page>this.current){
            this.current=page;
            return true;
        }else{
            return false;
        }
    }

    currentPage():number{
        return this.current;
    }
}

export class PaginatorFactory{

    static create<Type>(data:Type[],config:GridConfig):Paginator{
        const pc=config.pagination;
        if(pc.enable){
            assert(pc.pageSize);
            return new ActualPaginator(data,pc.pageSize);
        }
        else{
            console.log('no pagination');
            return new NullPaginator(data);
        }
    }
}