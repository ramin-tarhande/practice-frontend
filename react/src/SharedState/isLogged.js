const isLogged=(state=false,action)=>{
    switch(action.type){
        case 'SIGN_IN':
            return true;
        case 'SIGN_OUT':
                return false;
        default:
            return false;
    }
}

const signIn=()=>{
	return {
		type:"SIGN_IN"
	};
}

const signOut=()=>{
	return {
		type:"SIGN_OUT"
	};
}

export {
    isLogged,signIn,signOut
};