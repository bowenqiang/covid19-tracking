import React from 'react';
import styles from './CountryPicker.module.css';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const CountryPicker = ({countries, handleCountryChange}) => {

    const countriesData = countries || [];
    return (
        <section className={styles.container}>
            <Grid container justify="center">
                <Grid item xs={6}>
                    <FormControl className={styles.form}>
                        <InputLabel>Country</InputLabel>
                        <Select defaultValue="Global" onChange={handleCountryChange}>
                            <MenuItem value="Global" key={0}>Global</MenuItem>
                            {   
                                countriesData.map((country, index) => (
                                <MenuItem value={country.Slug} key={index + 1}>{country.Country}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </section>
    );
}

export default CountryPicker;