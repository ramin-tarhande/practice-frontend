import {DomUtil,capitalizeFirstLetter} from '../utils';
import {GridConfig} from '../GridConfig';

export class GridHead{
    private config:GridConfig;
    constructor(config:GridConfig){
        this.config=config;
    }

    start(table:HTMLElement):void{
        this.addCols(table);
        this.addThead(table);
    }

    private addCols(table:HTMLElement):void{
        const columnsConfig=this.config.columns;
        if(columnsConfig.rowNo.show){
            DomUtil.addChild('col',table,{width:columnsConfig.rowNo.width});
        }
        
        //const colgroup=DomUtil.addChild('colgroup',table);
        //colgroup.style.backgroundColor='#ff1';
        columnsConfig.props.forEach(x=>DomUtil.addChild('col',table,{width:x.width}));
        DomUtil.addChild('col',table,{width:columnsConfig.operations?.width});
    }
  
    private addThead(table:HTMLElement):void{
        const columnsConfig=this.config.columns;

        const thead=DomUtil.addChild('thead',table);

        const trHead=DomUtil.addChild('tr',thead);

        if(columnsConfig.rowNo.show){
            DomUtil.addChild('th',trHead,{html:columnsConfig.rowNo.title, className:'center-text'});
        }
        
        columnsConfig.props.forEach(x=>DomUtil.addChild('th',trHead,
            {html:x.title??capitalizeFirstLetter(x.name)}));

        DomUtil.addChild('th',trHead);
    }
}

  