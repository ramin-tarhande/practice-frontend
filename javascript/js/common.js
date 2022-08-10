
function redirectToHome(){
    redirectTo('../index.html');
}

function redirectTo(url){
    
    window.location.href = url;
}

function getInputValue(id){
    return document.getElementById(id).value;
}

function setInputValue(id,val){
    //console.log('val :>> ', val);
    document.getElementById(id).value=val;
}

function saveObject(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}

function loadObject(key,defaultValue){
    const json=localStorage.getItem(key);

    if(json){
        return JSON.parse(json);
    }
    else{
        return defaultValue;
    }
}

function clearStorageFor(key){
    localStorage.removeItem(key);
}
