
const axios = require('axios');

const baseURL = 'http://localhost:8080/';

const apiService = axios.create({
    baseURL,
});


const fetchData = async (endpoint, auth) => {
    try {
        const headers = {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
        const response = await apiService.get(endpoint, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error;
    }
};

const postData = async (endpoint, data) => {
    try {
        const response = await apiService.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error;
    }
};


module.exports = { fetchData, postData };

