import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weather: {
        data: [],
        message: 'Click button to fetch!'
    },
    status: 'idle',
    isLoaded: false
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeather: (state, action) => {
            state.status = 'loading';
            state.weather.message = 'Fetching';
        },
        getWeatherSuccess: (state, action) => {
            state.weather.data = action.payload.data;
            state.weather.message = action.payload.message;
            state.status = 'success';
            state.isLoaded = true;
        },
        getWeatherFail: (state, action) => {
            state.weather.message = action.payload;
            state.status = 'failed';
            state.isLoaded = true;
        }
    }
})

export const { getWeather, getWeatherSuccess, getWeatherFail } = weatherSlice.actions;
export const selectorWeather = state => state.weather;
export default weatherSlice.reducer;