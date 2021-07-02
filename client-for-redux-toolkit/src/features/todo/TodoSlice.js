import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    status: 'idle',
    isLoaded: false
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getTodosSuccess: (state, action) => {
            console.log('%c action: SLICE ', 'color: red' , action);
            state.todos = action.payload;
            state.isLoaded = true;
        }
    }
})

export const { getTodosSuccess } = todoSlice.actions;
export const selectTodo = state => state.todos.todos;
export default todoSlice.reducer;