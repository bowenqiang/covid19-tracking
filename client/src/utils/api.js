import axios from 'axios';
const ENDPOINT = 'https://covid19.mathdro.id/api';

export const fetchCountries = async () => {
    let url = `${ENDPOINT}/countries`;
    try {
        const { data : countries } = await axios(url);
        return countries;
    } catch (error) {
        return error;
    }
}

export const fetchCovid19Data = async (country) => {
    let url = ENDPOINT;
    if (country && country !== 'Global') {
        url = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate }} = await axios(url);
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        return error;
    }
}

export const fetchDailyData = async () => {
    let url = `${ENDPOINT}/daily`;
    try {
        const { data } = await axios(url);
        return data;
    } catch (error) {
        return error;
    }
}