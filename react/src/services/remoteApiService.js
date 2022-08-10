import axios from "axios";
import tokens from './tokens';

const remoteAddress='http://185.204.197.151:8000';

function createUri(s){
    return `${remoteAddress}${s}`;
}

// url:'https://gorest.co.in/public/v2/users',

const remoteApiService={

    getAll:async ()=> {
        const r=await axios({
            url:createUri('/api/v1/allshops'),
            method:'GET'
        });

        return r.data.docs;
    },

    login:async (v)=> {

        const r=await axios.post(createUri('/auth/login'),{
            username:v.userName,
            password:v.password
        });

        tokens.save(r.data.token)

        //return r;
    },

    isAuthenticationDone:()=>tokens.isSaved(),

    saveUserInfo:async (v)=> {
        const token=tokens.load();
    
        const r=await axios.put('/api/v1/updateuser',{
                    fullname:v.fullName,
                    username:v.userName
                },{ headers: {
                    token:token
                }}
        );

        console.log('updateuser result :>> ', r);

        //return r;
    },

    getUserInfo:async ()=> {
        const token=tokens.load();
            
        const r=await axios({
            method:'GET',
            url:'/api/v1/getuser',
            headers: {
                token:token
            }
        });

        return {userName:r.data.username,fullName:r.data.fullname};
    },

    logOut:()=>{
        tokens.deleteToken();
    }
};

export default remoteApiService;