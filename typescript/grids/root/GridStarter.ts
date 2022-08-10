import {GridConfig,GridConfigNormalizer} from '../GridConfig';
import {Grid} from './Grid';

export class GridStarter{

    static start<Type>(data:Type[],gridContainer:HTMLElement,config:GridConfig){
        GridConfigNormalizer.normalize(config);

        const grid=new Grid(data,gridContainer,config);
        grid.start();
    }
}