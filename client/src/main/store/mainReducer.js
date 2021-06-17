import { combineReducers } from 'redux';
import Home from '../../modules/Home/homeReducers.js'

const mainReducer = combineReducers({
    Home
});

export default mainReducer;