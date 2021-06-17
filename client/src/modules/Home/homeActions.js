import { SEND_GREETING, DECREMENT } from './homeConstants';
import axios from 'axios';

const handleResultAPI = ( type, data ) => {
    return { type, data }
}

export const sendGreeting = () => {
    return dispatch => {
        axios.get('/greeting/hello')
            .then(function (response) {
                dispatch(handleResultAPI( SEND_GREETING, response.data ));
            })
            .catch(error => console.log('%c  ERROR!!!!!!', 'color: #0e93e0;background: #aaefe5;', error))
            .then(() => console.log('%c  DONE!!!!!!', 'color: #0e93e0;background: #aaefe5;'));
    }
};


export function* helloSaga() {
    console.log('Hello Sagas!')
  }