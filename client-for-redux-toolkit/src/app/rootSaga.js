import { all } from "@redux-saga/core/effects";
import weatherSaga from "../features/weather/weatherSaga";

export default function* rootSaga() {
    console.log('Saga is running!');
    yield all([
        weatherSaga()
    ]);
}