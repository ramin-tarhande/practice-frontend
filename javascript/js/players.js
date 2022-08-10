const playersKey='players';
const initialPlayers=['PLAYER 1','PLAYER 2'];

function loadPlayers(){
    return loadObject(playersKey,initialPlayers);
}

function showPlayers(fieldIds){
    const players=loadPlayers();

    console.log('players: ', players);

    setInputValue(fieldIds[0],players[0]);
    setInputValue(fieldIds[1],players[1]);
}

function savePlayers(fieldIds){
    const players=[
        getInputValue(fieldIds[0]),
        getInputValue(fieldIds[1])];

    console.log('save players: ', players);

    saveObject(playersKey,players)
}