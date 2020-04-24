import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styles from './Chart.module.css';
import { chartDataHelper } from '../../utils/utils';

const Chart = ({dailyData, covid19Data}) => {
    const [lineOrPie, setLineOrPie] = useState(true);
    let chartData = chartDataHelper(dailyData, covid19Data, lineOrPie) || {};
    
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
                                display:true,
                                position:'right'
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
                                display:true,
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