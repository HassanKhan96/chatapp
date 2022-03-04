import axios from 'axios';

const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const get = async (url, config = {}) => {
    const response = await axiosApi.get(url, config);
    return response;
}

export const post = async (url, data, config) => {
    const response = await axiosApi.post(url, data, config)
    return response;
}