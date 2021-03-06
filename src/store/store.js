import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
let sagaMiddleware = createSagaMiddleware();
let store = createStore(reducers,applyMiddleware(logger,sagaMiddleware))
sagaMiddleware.run(sagas);
export default store