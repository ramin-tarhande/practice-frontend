import { adjustPath } from '../paths';
import tokens from './tokens';

const userInfoKey='userInfo';

async function loadJson(relativePath){

  const fr=await fetch(adjustPath(relativePath),{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
  });

  return await fr.json();
}

async function findUser(pridicate){
  const users=await loadJson(`/local-data/users.json`);

  //console.log('users:',users);

  return users.find(pridicate);
  
}

const localApiService={

    getAll:async ()=> {

      const docs=await loadJson(`/local-data/courses.json`);
      docs.forEach(i=>i.image.url = adjustPath(`/local-data/images/${i.image.url}`));
      
      return docs;
    },

    login:async (p)=> {
      const found=await findUser(u=>u.name===p.userName && u.password===p.password);
      if(!found) {
        throw new Error('login failed');
      }
      const token=found.token;
      tokens.save(token);
      //return {data:{token}};
    },
    
    isAuthenticationDone:()=>tokens.isSaved(),

    saveUserInfo:async (v)=> {
      console.log('save userInfo:',v);
      localStorage.setItem(userInfoKey,JSON.stringify(v));
    },

    getUserInfo:async ()=> {
      let json=localStorage.getItem(userInfoKey);
      if(json){
          console.log('userInfo loaded from local storage');
          return JSON.parse(json);
      }
      else{
          console.log('userInfo not found in local storage');
          const token=tokens.load();
          if(!token){
            console.log('token not found in local storage');
            return null;
          }
          const user=await findUser(u=>u.token===token);
          if(!user){
            throw new Error('user expected to be found');
          }
          
          console.log('user loaded from file: ',user);
          return {userName:user.name, fullName:''};
      }
    },

    logOut:()=>{
      localStorage.removeItem(userInfoKey);
      tokens.deleteToken();
    }
};

export default localApiService;