import {createStore, applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {createMiddleware} from 'redux-api-middleware';
import entitiesReducers from "./ducks/entities";


const initalState = {}

const middleware = [thunk,createMiddleware(),logger ]
const rootReducer = combineReducers({
    ...entitiesReducers
  });

const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;