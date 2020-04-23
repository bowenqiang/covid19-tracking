import axios from 'axios';
const ENDPOINT = 'https://covid19.mathdro.id/api';

export const fetchCountries = async (callback) => {
    let url = `${ENDPOINT}/countries`;
    try {
        const { data : countries } = await axios(url);
        return countries;
    } catch (error) {
        if(callback) {
            callback(error);
        }
        return [];
    }
}

export const fetchCovid19Data = async (country, callback) => {
    let url = ENDPOINT;
    if (country && country !== 'Global') {
        url = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate }} = await axios(url);
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        // return error;
        if(callback) {
            callback(error);
        }
        return {};
    }
}

export const fetchDailyData = async (callback) => {
    let url = `${ENDPOINT}/daily`;
    try {
        const { data } = await axios(url);
        return data;
    } catch (error) {
        if(callback) {
            callback(error);
        }
        return [];
    }
}