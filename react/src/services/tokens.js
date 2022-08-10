const tokensKey='token';

function loadToken(){
    const token=localStorage.getItem(tokensKey);
    console.log('loaded token:',token);
    return token;
}

const tokens={
    load:loadToken,
    save:token=>{
        console.log('save token: ', token);
        localStorage.setItem(tokensKey,token);
    },
    deleteToken:()=>{
        localStorage.removeItem(tokensKey);
        console.log('token deleted');
    },
    isSaved:()=>loadToken()!=null

}

export default tokens;