export interface GridConfig{
    tableStyle?:{bordered?:boolean,striped?:boolean},
    columns:{
        rowNo:{show:boolean, title?:string, width?:string},
        props:{name:string, title?:string, width:string}[],
        operations?:{width:string},
    },
    pagination:{
        enable?:boolean,
        pageSize?:number,
    }
}


export class GridConfigNormalizer{
    static normalize(config:GridConfig):void{
        
        const pc=config.pagination;
        if(pc.pageSize!=null && pc.pageSize<1){
            pc.pageSize=undefined;
        }
        if(pc.enable==null){
            pc.enable=(pc.pageSize!=null);
        }

        if(pc.enable && pc.pageSize==null){
            pc.enable=false;
        }

        if(!config.columns.operations){
            config.columns.operations={width:'5em'}
        }
    }
}