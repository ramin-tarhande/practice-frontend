import {DomUtil} from '../utils';
import {GridRow,Adding,RowOperationsTarget} from './GridRow';
import {GridConfig} from '../GridConfig';
import {Paginator} from '../Paginator';

 export class GridBody<Type> implements RowOperationsTarget<Type>
  {
     private data:Type[];
     private tableBody:HTMLElement;
     private config:GridConfig;
     private paginator:Paginator;
     constructor(data:Type[],tableBody:HTMLElement,paginator:Paginator,config:GridConfig){
        this.data=data;
        this.tableBody=tableBody;
        this.config=config;
        this.paginator=paginator;
     }

     start(){
        this.populate();
     }
  
     refresh(){
        this.clear();   
        this.populate();
     }
  
     private clear(){
        DomUtil.clear(this.tableBody);
     }
     
     private populate(){
        const r=this.paginator.getCurrentRange();
        //console.log('range: ',r);
        for(let index=r.start;index<r.end;index++){

           const gridRow=new GridRow<Type>(index,this.data[index],Adding.No,this,this.config);

           gridRow.start(this.tableBody);
        }
     }
  
     removeRow(rowIndex:number):void{
        this.data.splice(rowIndex,1);
        
        this.refresh();

        console.log(`row at ${rowIndex} removed`);
     }

     createNewRow():void{
      const index=this.data.length;
      const rowData={} as Type;
      const gridRow=new GridRow<Type>(index,rowData,Adding.Yes,this,this.config);
      gridRow.start(this.tableBody);
     }

     addRow(rowData:Type):void{
         this.data.push(rowData);
         //console.log('row added: ',rowData,'  ->  array size:',this.data.length);
     }
  }
