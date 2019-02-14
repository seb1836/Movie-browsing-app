import { combineReducers } from 'redux';
import searchTerm from './searchTermReducer'
import apiData from './apiDataReducer'

const rootReducer = combineReducers({ searchTerm, apiData });

export default rootReducer;
