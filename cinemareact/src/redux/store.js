import { createStore, applyMiddleware } from 'redux';
// this extension enables you to see current redux store in the browser (after installing redux-devtools in chrome or ff)
import { composeWithDevTools } from 'redux-devtools-extension';
// this extension logs in the console which redux action was executed
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;