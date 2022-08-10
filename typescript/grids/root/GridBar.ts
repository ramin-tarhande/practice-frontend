import {assert, DomUtil} from '../utils';
import {icons} from '../icons';
import {Paginator} from '../Paginator';
import {GridBody} from '../body/GridBody';
import {GridConfig} from '../GridConfig';

export class GridBar<Type>{

    private paginator:Paginator;
    private gridBody:GridBody<Type>;
    private gridContainer:HTMLElement;
    private config:GridConfig;
    private curPageUi?:HTMLElement;
    constructor(paginator:Paginator,gridBody:GridBody<Type>,gridContainer:HTMLElement,config:GridConfig){
        this.paginator=paginator;
        this.config=config;
        this.gridBody=gridBody;
        this.gridContainer=gridContainer;
    }
    
    start():void{
        const barDiv=this.addBarDiv();

        if(this.config.pagination){
            this.addPagination(barDiv);
        }

        this.addAddButton(barDiv);
    }

    private addBarDiv():HTMLElement{
        const barDiv=DomUtil.addChild('div',this.gridContainer,
            {className:'gridBar d-flex'});
        return barDiv;
    }

    private addAddButton(barDiv:HTMLElement):void{

        let extraAddIconClass=this.config.pagination?'':' mx-auto';

        const addSvg = DomUtil.addSvg(icons.add, barDiv, 'icon icon--add me-2'+extraAddIconClass);

        addSvg.onclick = e => {
           const changed=this.paginator?.prepForAdd();
           if(changed){
                //console.log('page changed for adding');
                this.updateCurPageUi();
                this.gridBody.refresh();
                
           }else{
               //console.log('page not changed for adding');
           }
           
           this.gridBody.createNewRow();
         };
    }

    private addPagination(bar:HTMLElement){
        const paginationSpan=DomUtil.addChild('span',bar,{className:'mx-auto'});

        const prevSvg = DomUtil.addSvg(icons.prev, paginationSpan, 'icon icon--pagination');
        prevSvg.onclick = e => {
           const changed=this.paginator?.prev();
           if(changed){
              this.updateCurPageUi();
              this.gridBody.refresh();
           }else{
              console.log('cannot go prev!');
           }
        }

        this.curPageUi=DomUtil.addChild('span',paginationSpan,{className:'currentPage'});
        this.updateCurPageUi();

        const nextSvg = DomUtil.addSvg(icons.next, paginationSpan, 'icon icon--pagination');
        nextSvg.onclick = e => {
           const changed=this.paginator?.next();
           if(changed){
              this.updateCurPageUi();
              this.gridBody.refresh();
           }else{
              console.log('cannot go next!');
           }
        }
    }

    private updateCurPageUi(){
        const pageNo=this.paginator.currentPage()+1;
        assert(this.curPageUi);
        this.curPageUi.innerHTML=`${pageNo}`;
    }
}