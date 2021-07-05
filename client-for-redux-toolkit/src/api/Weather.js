import axios from 'axios';
import { API_ENDPOINT, API_KEY } from './API';

export class Weather {

    getWeatherByCityName = ({ lat, lon }) => {
        const options = {
            method: 'GET',
            url: `${API_ENDPOINT}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        };
        return axios.request(options);
    }
}