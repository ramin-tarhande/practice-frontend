import {ObjectUtil,DomUtil} from '../utils';
import {GridConfig} from '../GridConfig';

export class EditPerformer<Type>{
    private data:Type;
    private tr:HTMLElement;
    private config:GridConfig;
    private propsCellOffset:number;
    constructor(data:Type,tr:HTMLElement,config:GridConfig){
          this.data=data;
          this.tr=tr;
          this.config=config;
          this.propsCellOffset=config.columns.rowNo.show?1:0;
    }
 
     start(){
      const propsConfig=this.config.columns.props;
       for (let pi=0; pi < propsConfig.length; pi++) {
          this.setCellToEditMode(pi);   
       }
     }
 
     private setCellToEditMode(propIndex:number){
         
       const cellTd=this.getPropCellTd(propIndex);
       const curText=cellTd.innerHTML;
       DomUtil.clear(cellTd);
       const input=DomUtil.addInput(cellTd,curText);
    
       input.style.width = '100%';
     }
 
     apply():void{
       const propsConfig=this.config.columns.props;
       for (let pi=0; pi < propsConfig.length; pi++) {
          const cellTd=this.getPropCellTd(pi); 
          const val=DomUtil.getSingleChildInput(cellTd).value;
          const propName:string=propsConfig[pi].name;
          
          ObjectUtil.setPropValue(this.data,propName,val)
          DomUtil.clear(cellTd);
          DomUtil.setTdText(cellTd,val);
       }  
       //console.log(this.data);
     }
 
     private getPropCellTd(propIndex:number):HTMLElement{
       const cellIndex=propIndex+this.propsCellOffset;
       return this.tr.childNodes[cellIndex] as HTMLElement;;
     }
 }
 