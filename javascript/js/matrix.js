const dim=3;
const cellCount=()=>dim*dim;

function createMatrix(){
    let m=new Array(dim);

    for(let i=0;i<dim;i++){
        m[i]=new Array(dim);
    }

    return m;
}

function getCellId(r,c){
    return r*dim+c;
}

function forEachCell(matrix,callback){
    for(let i=0;i<dim;i++){
        for(let j=0;j<dim;j++){
            callback(i,j,matrix[i][j]);
        }
    }
}

/*-------------------------------------------------------*/
const noWin={win:false};
function createWin(path){
    return {win:true,path};
}

function addToPath(r,c,path){
    path.push(getCellId(r,c));
}

function checkWin(r,c,matrix,playerIndex){
    
    const rc=checkRow(r,c,matrix,playerIndex);
    if(rc.win){
        return rc;
    }

    const cc=checkColumn(r,c,matrix,playerIndex);
    if(cc.win){
        return cc;
    }

    const d1c=checkDiagonal1(r,c,matrix,playerIndex);
    if(d1c.win){
        return d1c;
    }

    const d2c=checkDiagonal2(r,c,matrix,playerIndex);
    
    return d2c;
}

function checkRow(r,c,matrix,playerIndex){
    let path=[];
    for(let i=0;i<dim;i++){
        if(matrix[r][i]===playerIndex){
            addToPath(r,i,path)
        }
        else{
            return noWin;
        }
    }
    return createWin(path);
}

function checkColumn(r,c,matrix,playerIndex){
    let path=[];
    for(let i=0;i<dim;i++){
        if(matrix[i][c]===playerIndex){
            addToPath(i,c,path)
        }
        else{
            return false;
        }
    }
    return createWin(path);
}

function checkDiagonal1(r,c,matrix,playerIndex){
    if(r!==c){
        return false;
    }

    let path=[];
    for(let i=0;i<dim;i++){
        if(matrix[i][i]===playerIndex){
            addToPath(i,i,path)
        }
        else{
            return false;
        }
    }
    return createWin(path);
}

function checkDiagonal2(r,c,matrix,playerIndex){
    if(r+c!==dim-1){
        return false;
    }

    let path=[];
    for(let i=0;i<dim;i++){
        const u=dim-i-1;
        if(matrix[u][i]===playerIndex){
            addToPath(u,i,path)
        }
        else{
            return false;
        }
    }
    return createWin(path);
}

