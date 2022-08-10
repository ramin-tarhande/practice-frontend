const scoresKey='scores';
const initialScores=[0,0];

function loadScores(){
    return loadObject(scoresKey,initialScores);
}

function showScores(tableId){
    const scores=loadScores();
    const players=loadPlayers();
    console.log('scores: ', scores);
    let html='';

    for(let i=0;i<scores.length;i++){
        console.log(players[i],scores[i]);
        html+=`<tr>
        <th>${players[i]}</th>
        <td>${scores[i]}</td>
        </tr>`;
    }

    document.getElementById(tableId).innerHTML=html;
}

function saveScores(scores){

    console.log('save scores: ', scores);

    saveObject(scoresKey,scores)
}

function playerWins(playerId){
    
    
}

