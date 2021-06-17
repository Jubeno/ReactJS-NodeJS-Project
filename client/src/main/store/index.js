import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import mainReducer from './mainReducer';
import { helloSaga } from '../../modules/Home/homeActions';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    mainReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(helloSaga);

const action = type => store.dispatch({ type });

export default store;