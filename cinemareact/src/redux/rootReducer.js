import { combineReducers } from 'redux';
import filmReducer from './film/filmReducer';
import screeningReducer from './screening/screeningReducer';

const rootReducer = combineReducers({
    filmsState: filmReducer,
    screeningState:screeningReducer,
});

export default rootReducer;