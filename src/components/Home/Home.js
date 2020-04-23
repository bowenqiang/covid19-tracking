import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import Chart from '../Chart/Chart';
import CountryPicker from '../CountryPicker/CountryPicker';
import { fetchCountries, fetchCovid19Data, fetchDailyData } from '../../utils/api';

import image from '../../assit/image.png'
import styles from './Home.module.css';

const Home = () => {
    const [covid19Data, setCovid19Data] = useState({});
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        async function fetchCountriesHelper() {
          setCountries(await fetchCountries(() => {
            alert("Sorry, We don't have any data for selected country/area yet");
            }));
        }
        fetchCountriesHelper(); 
      }, []);

    useEffect(() => {
        async function fetchCovid19DataHelper(country) {
            setCovid19Data(await fetchCovid19Data(country, () => {
                alert("Sorry, We don't have any data for selected country/area yet");
            }));
        }
        fetchCovid19DataHelper(country); 
    }, [country]);

    useEffect(() => {
        async function fetchDailyDataHelper() {
            setDailyData(await fetchDailyData(() => {
                alert("Sorry, We don't have any data for selected country/area yet");
            }))
        }
        fetchDailyDataHelper();
    }, []);

    const handleCountryChange = (event) => {
        const newCountry = event.target.value || "";
        setCountry(newCountry);
        setCovid19Data({});
        setDailyData([]);
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={image} alt="covid-19" />
            </div>
            <Cards covid19Data={covid19Data} />
            <CountryPicker countries={countries} handleCountryChange={handleCountryChange} />
            <Chart country={country} dailyData={dailyData} covid19Data={covid19Data}/>
            <footer className={styles.footer}>Created by bowenqiang@gmail, Data Source: mathdroid</footer>
        </div>
    );
}

export default Home;