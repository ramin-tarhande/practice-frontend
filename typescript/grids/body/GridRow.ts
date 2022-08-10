import {assert,ObjectUtil, DomUtil} from '../utils';
import {GridConfig} from '../GridConfig';
import {EditPerformer} from './EditPerformer';
import {icons} from '../icons';

 export interface RowOperationsTarget<Type> {
    removeRow(rowIndex:number):void;
    addRow(data:Type):void;
 }

 export enum Adding{
   No,Yes
 }
 export class GridRow<Type>
 {
    private rowIndex:number;
    private data:Type;
    private adding:Adding;
    private operationsTarget:RowOperationsTarget<Type>;
    private config:GridConfig;
    private tr?:HTMLElement;
    private operationsTd?:HTMLElement;
    private editPerformer?:EditPerformer<Type>;
    constructor(rowIndex:number,data:Type,rowOperationType:Adding,operationsTarget:RowOperationsTarget<Type>,config:GridConfig){
        this.rowIndex=rowIndex;
        this.data=data;
        this.adding=rowOperationType;
        this.config=config;
        this.operationsTarget=operationsTarget;
    }

    start(tableBody:HTMLElement):void{
      
      this.tr=document.createElement('tr');

      this.editPerformer=new EditPerformer<Type>(this.data,this.tr,this.config);

      this.addTh();
      
      this.addPropTds();

      this.addOperationsTd();

      tableBody.append(this.tr);
    }

    private addTh() {
      if(!this.config.columns.rowNo.show){
          return;        
      }

      const rowNo = this.rowIndex + 1;
      assert(this.tr);
      DomUtil.addChild('th',this.tr, {html:rowNo.toString(), className:'center-text'});
    }
 
    private addPropTds() {
       for (let md of this.config.columns.props) {
          //const pv = String(this.data[md.name as ObjectKey]);
          const pv =ObjectUtil.getPropValue(this.data,md.name);
          this.addTd(pv);
       }
    }
    
    private addOperationsTd() {
        this.operationsTd = this.addTd();
        this.operationsTd.setAttribute('class', 'center-text');
  
        if(this.adding== Adding.Yes){
          this.startEditing();
        }
        else{
          this.showChangeIcons();
        }
    }

    private showChangeIcons():void{
      assert(this.operationsTd);
      DomUtil.clear(this.operationsTd);
      const editSvg = DomUtil.addSvg(icons.edit, this.operationsTd, 'icon icon--edit');
      editSvg.onclick = e => this.startEditing();
      const delSvg = DomUtil.addSvg(icons.delete, this.operationsTd, 'icon icon--delete');
      delSvg.onclick = e => this.operationsTarget.removeRow(this.rowIndex);
    }
  
    private showApplyIcons():void{
      assert(this.operationsTd);
      DomUtil.clear(this.operationsTd);
      const applySvg = DomUtil.addSvg(icons.apply, this.operationsTd, 'icon icon--apply');
      applySvg.onclick = e => this.applyEdit();
    }

    private startEditing(){
      this.showApplyIcons();
      this.editPerformer?.start();
    }

    private applyEdit():void{
      this.editPerformer?.apply();
      this.showChangeIcons();
      if(this.adding==Adding.Yes){
        this.operationsTarget.addRow(this.data);
        this.adding=Adding.No;
      }
      // else{
      //   console.log(`row at ${this.rowIndex} updated:`,this.data);
      // }
    }

    private addTd(text?:string):HTMLElement{
       const td=document.createElement('td');
       if(text){
         DomUtil.setTdText(td,text);
       }
       this.tr?.append(td);
       return td;
    }
}
