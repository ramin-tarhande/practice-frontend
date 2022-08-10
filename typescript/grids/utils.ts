export function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
      throw new Error(msg);
    }
 }
 
 //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
 export function capitalizeFirstLetter(s:string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
 }

export class ObjectUtil{    
  static getPropValue(data:any,name:string):any{
      //type ObjectKey = keyof typeof data; //https://bobbyhadz.com/blog/typescript-access-object-property-dynamically 
      return data[name];
  }

  static  setPropValue(data:any,name:string,value:any):void{
      data[name]=value;
  }
}
 
export class DomUtil{

   static clear(element:HTMLElement){
      element.textContent='';
   }

   static addInput(parent:HTMLElement,value:string):HTMLElement{
      const r=this.addChild('input',parent);
      r.setAttribute('value',value);
      return r;
   }

   static getSingleChildInput(parent:HTMLElement):HTMLInputElement{
      return parent.childNodes[0] as HTMLInputElement;
   }

   static addSvg(html:string,parent:HTMLElement,className:string):HTMLElement{
     return this.addChild('span',parent,{html,className});
   }

   static addChild(tag:string,parent:HTMLElement,
         options?:{html?:string,className?:string,width?:string}):HTMLElement{

       const el=document.createElement(tag);

       if(options){
         if(options.html){
            el.innerHTML=options.html;
         }
         if(options.className){
            el.setAttribute('class',options.className)
         }
         
         if(options.width){
           el.style.width=options.width;
         }
       }
       
       parent.append(el);
       
       return el;
   }

   static setTdText(td:HTMLElement,text:string):void{
      td.innerHTML=text;
   }
 
 /* //https://stackoverflow.com/questions/3392493/adjust-width-of-input-field-to-its-input
    static setWidthBasedOnTextLength(input:HTMLInputElement,extraChars:number=0){
       
       input.style.width = (input.value.length+extraChars) + "ch";
    }*/
 }
 
 export class ClassNameBuilder{
    s:string;
    constructor(s:string) {
       this.s=s;
    }

    add(x:string):void{
       this.s+=' '+x;
    }

    get():string{
       return this.s;
    }
 }
 