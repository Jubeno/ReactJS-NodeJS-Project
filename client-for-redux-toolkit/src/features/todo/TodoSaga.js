import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { API } from '../../api/API';
import { getTodosSuccess } from './TodoSlice';


function* getTodoList(action) {
    console.log('%c action: ', 'color: red' , action);
    try {
        const fetchTodo = yield call(API.todos.getList, action.payload.userId);
        console.log('%c fetchTodo: ', 'color: red' , fetchTodo.status);

        if(fetchTodo.status === 200) {
            console.log('%c 200: ', 'color: red');
            yield put(getTodosSuccess({ user: fetchTodo.data }))
        } else {
            yield put({ type: 'todos/GET_TODOS_FAIL', payload: 'Fail, Fetch is done!!'})
        }
        
        
    }
    catch(error) {
        console.log(error);
        yield put({ type: 'todos/GET_TODOS_FAIL', payload: 'Fail, Fetch is done!!'})
    }
    
}



function* todoSaga() {
    console.log('%c TODO is running!','color: red');
    yield takeLatest('GET_TODO', getTodoList)
}

export default todoSaga