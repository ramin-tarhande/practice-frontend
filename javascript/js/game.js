const symbols=['X','O'];

let game;
let players;

let boardEl;
let turnEl,winEl,drawEl;
let starterId=0;

const GameState={
    InProgress:0,Won:1,Draw:2
};

function createGame(){
    return { 
        currentPlayerIndex:0,
        hitCount:0,
        state:GameState.InProgress,
        winPath:null,
        matrix:createMatrix()
    };
}

function initPlay(board,turn,win,draw){
    boardEl=board;
    turnEl=turn;
    winEl=win;
    drawEl=draw;

    console.log('start to play');
    startPlay(true);
}

function startPlay(load){

    players=loadPlayers();

    if(load){
        game=loadGame();
    }
    else{
        game=null;
    }
    
    console.log('game :>> ', game);
    if(game==null){
        console.log('start new game');
        game=createGame();

        starterId=loadStarter();
        console.log('loaded  starterId:>> ', starterId);
        game.currentPlayerIndex=starterId;
    }
    else{ 
        console.log('continue loaded game');
    }

    
    createCells();

    updateStateDependentUi();
}

function createCells(){
    let html='';

    //console.log(game);
    forEachCell(game.matrix,(r,c,playerId)=>{
        const id=getCellId(r,c);
        const w=(playerId==null?'':symbols[playerId]);
        html+=`<div class="cell" id='${id}' onclick='cellClicked(${r},${c},${id})'>${w}</div>`;
    });

    boardEl.innerHTML=html;
}

function cellClicked(r,c,id){
    
    //console.log('clicked: ',r,c,id);
    const valid=updateGame(r,c,id);
    if(!valid){
        return;
    }

    saveGame(game);

    //console.log(game);
    
    updateStateDependentUi();
}

function updateGame(r,c,id){

    if(game.state!==GameState.InProgress){
        console.log('game is finished');
        return false;
    }

    let matrix=game.matrix;
    let currentPlayerIndex=game.currentPlayerIndex;
    
    if(matrix[r][c]!=null) {
        console.log('cell is already taken!');
        return false;
    }

    matrix[r][c]=currentPlayerIndex;
    //console.log('matrix :>> ', matrix);
    game.hitCount++;

    showSymbolAt(id);
    //console.log('updated');

    const wc=checkWin(r,c,matrix,currentPlayerIndex);
    if(wc.win){
        console.log(`${currentPlayerIndex} won!`);
        console.log('wc :>> ', wc);
        game.state=GameState.Won;
        game.winPath=wc.path;

        addWinnerScore(game.currentPlayerIndex);
        switchStarter();
        return true;
    }

    if(allCellsFilled()){
        game.state=GameState.Draw;
        console.log('all cells are filled -> Draw');
        switchStarter();
        return true;
    }

    changePlayer();
    
    return true;
}

function updateStateDependentUi(){
    switch(game.state){
        case GameState.Draw:
            setDrawText('DRAW!');
            setTurnText('');
            break;
        case GameState.Won:
            setWinText(`${getCurrentPlayerName()} WINS!`);
            setTurnText('');
            markWinPath();
            break;
        default:
            setWinText('');
            setDrawText('');
            showTurnText();
    }
}

function markWinPath(){
    const path=game.winPath;
    if(path){
        path.forEach(i=>document.getElementById(i).classList.add('cell--wp'));
    }
}

function resetGame(){
    startPlay(false);
    saveGame(game);
}

/*-------------------------------------------------------*/
function showSymbolAt(id){
    showSymbol(id,game.currentPlayerIndex);
}

function showSymbol(id,playerId){
    document.getElementById(id).innerHTML=symbols[playerId];
}

function getCurrentPlayerName(){
    return players[game.currentPlayerIndex];
}

function allCellsFilled(){
    return game.hitCount===cellCount();
}

function otherPlayer(id){
    return 1-id;
}

function changePlayer(){
    game.currentPlayerIndex=otherPlayer(game.currentPlayerIndex);
    //showTurnText();
}

function showTurnText(){
    setTurnText(`${getCurrentPlayerName()} to move`);
}

function setTurnText(s){
    turnEl.innerHTML=s;
}

function setWinText(s){
    winEl.innerHTML=s;
}

function setDrawText(s){
    drawEl.innerHTML=s;
}

function addWinnerScore(winnerId){
    let scores=loadScores();
    scores[winnerId]=scores[winnerId]+1;
    saveScores(scores);
}

function switchStarter(){
    saveStarter( 
        otherPlayer(starterId));
}
