import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cx from 'classnames';
import _ from 'lodash';
import moment from 'moment';

const Cards = ({covid19Data}) => {
    if(_.isEmpty(covid19Data)) {
        return 'Loading...'
    }

    const {confirmed, recovered, deaths, lastUpdate} = covid19Data;

    return (
        <section className={styles.container}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={3} component={Card} className={styles.cardWrapper} >
                    <CardContent className={cx(styles.card, styles.infected)}>
                        <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                        <Typography>
                            <CountUp end={confirmed.value} duration={2} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{moment(lastUpdate).format('YYYY-MM-DD hh:mm a')}</Typography>
                        <Typography>Number of confirmed cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={styles.cardWrapper} >
                    <CardContent className={cx(styles.card, styles.recovered)}>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography>
                            <CountUp end={recovered.value} duration={2} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{moment(lastUpdate).format('YYYY-MM-DD hh:mm a')}</Typography>
                        <Typography>Number of recovered cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className={styles.cardWrapper} >
                    <CardContent className={cx(styles.card, styles.deaths)}>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography>
                            <CountUp end={deaths.value} duration={2} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{moment(lastUpdate).format('YYYY-MM-DD hh:mm a')}</Typography>
                        <Typography>Number of deaths cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </section>

    );
}

export default Cards;