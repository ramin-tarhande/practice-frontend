import {DomUtil,ClassNameBuilder} from '../utils';
import {GridConfig} from '../GridConfig';

export class TableFactory{

    static create(gridContainer:HTMLElement,config:GridConfig):HTMLElement{

        let cb=new ClassNameBuilder('table');

        const tableStyle=config.tableStyle;

        if(tableStyle){
           if(tableStyle.bordered){
              cb.add('table-bordered');
           }
           if(tableStyle.striped){
              cb.add('table-striped');
           }
        }

        cb.add('gridTable');

        return DomUtil.addChild('table',gridContainer,{className:cb.get()});
     }
}