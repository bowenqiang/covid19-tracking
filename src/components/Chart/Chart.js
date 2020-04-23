import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { chartDataHelper } from '../../utils/utils';

const Chart = ({country, dailyData, covid19Data}) => {
    const isGlobal = !country || country === "Global";
    let chartData = chartDataHelper(dailyData, covid19Data, isGlobal) || {};

    return (
        <section className={styles.container}>
            {
                isGlobal ? (
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
        </section>
    );
}

export default Chart;