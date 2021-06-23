import axios from 'axios';
import { API_PATHS } from '../common/constants';

export const uploadPhotos = async (data) => {
    const configHeader = {
        'Content-Type': 'multipart/form-data'
    }
    return axios.post(
        `${API_PATHS.uploadPhotos}?userId=${data.userId}&timelineId=${data.timelineId}&uploadTime=${data.uploadTime}`, 
        data.formData, 
        configHeader 
    );
}

export const uploadContents = async (formData) => {
    return axios.post(API_PATHS.uploadContents, formData)
}