import axios from 'axios';

export class Todos {

    getList = userId => {
        console.log('%c userId: ', 'color: red' , userId);
        const options = {
            method: 'GET',
            url: 'https://api.publicapis.org/entries',
        };

        return axios.request(options);
    }
}