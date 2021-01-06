import { combineReducers } from 'redux';
import filmReducer from './film/filmReducer';
import screeningReducer from './screening/screeningReducer';
import hallsReducer from './halls/hallsReducer';

const rootReducer = combineReducers({
    filmsState: filmReducer,
    screeningState:screeningReducer,
    hallsState:hallsReducer,
});

export default rootReducer;