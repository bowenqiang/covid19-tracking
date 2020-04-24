import axios from 'axios';
import { parseDailyData } from './utils';

const ENDPOINT = 'https://api.covid19api.com';
const ENDPOINT2 = 'https://covid19.mathdro.id/api';

export const fetchCountries = async (callback) => {
    let url = `${ENDPOINT}/countries`;
    try {
        const { data : countries } = await axios(url);
        return countries.sort((a, b) => a.Country > b.Country ? 1 : -1);
    } catch (error) {
        if(callback) {
            callback(error);
        }
        return [];
    }
}

export const fetchCovid19Data = async (callback) => {
    let url = `${ENDPOINT}/summary`;
    try {
        const { data : covid19Data } = await axios(url);
        return covid19Data;
    } catch (error) {
        if(callback) {
            callback(error);
        }
        return {};
    }
}

export const fetchDailyData = async (country, callback) => {
    let url = '';
    if (country === 'Global') {
        url = `${ENDPOINT2}/daily`
    } else {
        url = `${ENDPOINT}/total/country/${country}`;
    }
    try {
        const { data } = await axios(url);
        return parseDailyData(country, data);
    } catch (error) {
        if(callback) {
            callback(error);
        }
        return [];
    }
}