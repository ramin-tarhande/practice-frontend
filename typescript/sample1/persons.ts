import {GridConfig} from '../grids/GridConfig';
import {GridStarter} from '../grids/root/GridStarter';

interface Person{
    name:string,
    city:string,
    country:string,
    age:number
};

function getInitialData():Person[]{
   return [
      {name:'Niki',city:'Tehran',country:'Iran',age:6},
      {name:'Yashavant',city:'Delhi',country:'India',age:53},
      {name:'Elif',city:'Istanbul',country:'Turkey',age:38},
      {name:'Matsumoto',city:'Osaka',country:'Japan',age:57},
      {name:'Ramin',city:'Tehran',country:'Iran',age:47},
      {name:'James Hetfield',city:'Downey',country:'U.S',age:58},
      {name:'Fereydoun Farrokhzad',city:'Tehran',country:'Iran',age:42},
      {name:'Jon Bon Jovi',city:'New Jersey',country:'U.S',age:60},
      {name:'Nelly Furtado',city:'Victoria',country:'Canada',age:43},
  ];
}

function createConfig():GridConfig{
   return {
      tableStyle:{
         striped:true,
         bordered:false,
      },
      columns:{
         rowNo:{show:true, title:'#',width:'3em'},
         props:[
            {name:'name',title:'Name',width:'20em'},
            {name:'city',title:'City',width:'10em'},
            {name:'country',width:'10em'},
            {name:'age',width:'2em'}
         ],
         operations:{width:'5em'},
      },
      pagination:{
         enable:true,
         pageSize:5,
      }
   };
}

export function startSample1(gridContainerId:string){
   let gridContainer=document.getElementById(gridContainerId);
   if(!gridContainer){
       console.error('gridContainerId is invalid');
       return;
   }

   let persons=getInitialData();

   const config=createConfig();

   GridStarter.start(persons,gridContainer,config);
}
