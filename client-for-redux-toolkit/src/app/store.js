import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware), // MOUNT SAGA MIDDLE WARE
});

// RUN SAGA MIDDLEWARE
sagaMiddleware.run(rootSaga);