import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodo } from './TodoSlice';
import todoSaga from './TodoSaga';

const Todo = () => {
    // const todo = useSelector(selectTodo);
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch({ type: 'GET_TODO', payload: { userId: '123123' } })}>asdjaksdjas</button>
    )
};

export default Todo;