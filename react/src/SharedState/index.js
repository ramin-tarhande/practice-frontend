import {isLogged,signIn,signOut} from './isLogged';
import {combineReducers} from 'redux'

const allReducers=combineReducers({
    isLogged
});

export default allReducers;

export {
    allReducers,signIn,signOut
};