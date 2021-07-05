import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { API } from '../../api/API';
import { getWeather, getWeatherSuccess, getWeatherFail } from './weatherSlice';


function* getWeatherList(action) {
    try {
        const fetchTodo = yield call(API.weathers.getWeatherByCityName, action.payload);

        if(fetchTodo.status === 200) {
            yield put({
                type: getWeatherSuccess().type, 
                payload: {
                    data: fetchTodo.data,
                    message: 'Done!!'
                }
            })
        } else {
            yield put({
                type: getWeatherFail().type,
                payload: 'Failed to fetch!!'
            })
        }
    }
    catch(error) {
        console.log(error);
        yield put({
            type: getWeatherFail().type,
            payload: 'Failed to fetch!!'
        })
    }
}


function* weatherSaga() {
    yield takeLatest(getWeather().type, getWeatherList)
}

export default weatherSaga