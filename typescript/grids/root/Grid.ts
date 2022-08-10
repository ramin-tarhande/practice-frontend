import {DomUtil} from '../utils';
import {GridBody} from '../body/GridBody';
import {GridConfig} from '../GridConfig';
import {GridHead} from './GridHead';
import {PaginatorFactory} from '../Paginator';
import {GridBar} from './GridBar';
import {TableFactory} from './TableFactory';

export class Grid<Type>{
     private data:Type[];
     private gridContainer:HTMLElement;
     private config:GridConfig;
     private gridBody?:GridBody<Type>;
     private gridHead?:GridHead;
     constructor(data:Type[],gridContainer:HTMLElement,config:GridConfig){
        this.data=data;
        this.gridContainer=gridContainer;
        this.config=config;
     }

     start():void{
        const table=TableFactory.create(this.gridContainer,this.config);
  
        const paginator=PaginatorFactory.create(this.data,this.config);

        this.gridHead=new GridHead(this.config);
        this.gridHead.start(table); 
        
        const tableBody=this.createTableBody(table);
        this.gridBody=new GridBody(this.data,tableBody,paginator,this.config);
        this.gridBody.start();

        const gridBar=new GridBar(paginator,this.gridBody,this.gridContainer,this.config);
        gridBar.start();
     }

     createTableBody(table:HTMLElement):HTMLElement{
         return DomUtil.addChild('tbody',table);
     }
}
