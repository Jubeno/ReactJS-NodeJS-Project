import axios from 'axios';
import { API_PATHS } from '../common/constants';
import md5 from 'md5';


export const signIn = async (params) => {
    const formData = {
        username: params.username,
        password: md5(params.password)
    }
    return axios.post( API_PATHS.signIn , formData);
}

export const signUp = async (params) => {
    const formData = {
        username: params.username,
        password: md5(params.password)
    }
    return axios.post( API_PATHS.signUp , formData);
}