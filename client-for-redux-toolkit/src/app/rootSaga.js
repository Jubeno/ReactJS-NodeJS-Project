import { all } from "@redux-saga/core/effects";
import todoSaga from "../features/todo/TodoSaga";

export default function* rootSaga() {
    console.log('Saga is running!');
    yield all([
        todoSaga()
    ]);
}