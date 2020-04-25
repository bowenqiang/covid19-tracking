import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styles from './Chart.module.css';
import { chartDataHelper } from '../../utils/utils';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';

const Chart = ({dailyData, covid19Data}) => {
    const [lineOrPie, setLineOrPie] = useState(true);
    let chartData = chartDataHelper(dailyData, covid19Data, lineOrPie) || {};
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    const handleClick = () => {
        setLineOrPie(!lineOrPie);
    }

    return (
        <section className={styles.container}>
            <Grid container justify="center" spacing={2}>
                <Grid item xs={1} className={styles.arrowContainer}>
                    <ArrowBackIosIcon onClick={handleClick}/>
                </Grid>
                <Grid item xs={10}>
                {
                    lineOrPie ? (
                        <Line
                            data={chartData}
                            options={{
                                title:{
                                    display:true,
                                    text:'COVID-19 Cases',
                                    fontSize:20
                                },
                                legend:{
                                    display: isMd,
                                    position:'right'
                                },
                                maintainAspectRatio: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                           callback: function(value) {
                                              var ranges = [
                                                 { divider: 1e6, suffix: 'M' },
                                                 { divider: 1e3, suffix: 'k' }
                                              ];
                                              function formatNumber(n) {
                                                    for (var i = 0; i < ranges.length; i++) {
                                                        if (n >= ranges[i].divider) {
                                                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                                        }
                                                    }
                                                    return n;
                                              }
                                              return formatNumber(value);
                                           }
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                           callback: function(value) {
                                                function formatDate(n) {
                                                    return isMd ? n : moment(n).format("MM-DD");
                                                }
                                                return formatDate(value);
                                           }
                                        }
                                    }]
        
                                }
                            }}
                        />
                    ) : (
                        <Pie
                            data={chartData}
                            options={{
                            title:{
                                display:true,
                                text:'COVID-19 Cases',
                                fontSize:20
                            },
                            legend:{
                                display: true,
                                position:'right'
                            }
                            }}
                        />
                    )
                }
                </Grid>
                <Grid item xs={1} className={styles.arrowContainer}>
                    <ArrowForwardIosIcon onClick={handleClick}/>
                </Grid>
            </Grid>

        </section>
    );
}

export default Chart;