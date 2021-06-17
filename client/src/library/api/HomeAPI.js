import axios from 'axios';
import { API_PATHS } from '../common/constants';

export const uploadPhotos = async (data) => {
    const configHeader = {
        'Content-Type': 'multipart/form-data'
    }
    return axios.post(
        `${API_PATHS.uploadPhotos}?userId=${data.userId}&timelineId=${data.timelineId}`, 
        data.formData, 
        configHeader 
    );
}

export const uploadContents = async (formData) => {
    console.log('%c  formData:', 'color: #0e93e0;background: #aaefe5;', formData);
    return axios.post(API_PATHS.uploadContents, formData)
}