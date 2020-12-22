import { combineReducers } from 'redux';
import filmReducer from './film/filmReducer';

const rootReducer = combineReducers({
    filmsState: filmReducer,
});

export default rootReducer;