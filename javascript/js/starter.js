const starterKey='starter';
const initialStarter=0;

function loadStarter(){
    return loadObject(starterKey,initialStarter);
}

function saveStarter(id){
    
    console.log('save stater: ', id);

    saveObject(starterKey,id)
}