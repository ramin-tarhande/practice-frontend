import localApiService from './localApiService';
import remoteApiService from './remoteApiService';

//const remote=true;
const remote=false;

function findService(){
    return remote?remoteApiService:localApiService;
}   

export default findService();
