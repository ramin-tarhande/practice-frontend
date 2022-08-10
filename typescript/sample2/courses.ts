import {GridConfig} from '../grids/GridConfig';
import {GridStarter} from '../grids/root/GridStarter';

interface Course{
    name:string,
    duration:number,
    fee:number
};

function getInitialData():Course[]{
   return [
      {name:'html/css',duration:3,fee:1000},
      {name:'bootstrap',duration:3,fee:1000},
      {name:'javascript',duration:5,fee:2000},
      {name:'typescript',duration:2,fee:1500},
  ];
}

function createConfig():GridConfig{
   return {
      tableStyle:{
         striped:false,
         bordered:true,
      },
      columns:{
         rowNo:{show:false},
         props:[
            {name:'name',title:'Name',width:'10em'},
            {name:'duration',title:'Duration(weeks)',width:'8em'},
            {name:'fee',width:'5em'},
         ]
      },
      pagination:{
         enable:true,
         pageSize:3,
      }
   };
}

export function startSample2(gridContainerId:string){
   let gridContainer=document.getElementById(gridContainerId);
   if(!gridContainer){
       console.error('gridContainerId is invalid');
       return;
   }

   let persons=getInitialData();

   const config=createConfig();

   GridStarter.start(persons,gridContainer,config);
}
