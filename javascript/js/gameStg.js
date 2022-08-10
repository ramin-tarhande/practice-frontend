const gameKey='game';

function loadGame(){
    return loadObject(gameKey,null);
}

function saveGame(game){
    saveObject(gameKey,game)
}

function clearGameStorage(){
    clearStorageFor(gameKey);
}