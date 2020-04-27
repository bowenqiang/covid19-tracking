import _ from 'lodash';
import moment from 'moment';
export const chartDataHelper = (dailyData, covid19Data, lineOrPie) => {
    if (lineOrPie) {
        let data = {
            labels: dailyData.map(data => data.date),
            datasets: [
                {
                    label: "Confirmed",
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: '#0b83e6',
                    borderColor: "#0b83e6",
                    borderWidth: 2,
                    spanGaps: true,
                    pointRadius: 2,
                    pointHoverRadius: 2,
                    data: dailyData.map(data => data.confirmed),
                },
                {
                    label: "Recovered",
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: "#12e02d",
                    borderColor: "#12e02d",
                    borderWidth: 2,
                    spanGaps: true,
                    pointRadius: 2,
                    pointHoverRadius: 2,
                    data: dailyData.map(data => data.recovered),
                },
                {
                    label: "Deaths",
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: "#e82b09",
                    borderColor: "#e82b09",
                    borderWidth: 2,
                    spanGaps: true,
                    pointRadius: 2,
                    pointHoverRadius: 2,
                    data: dailyData.map(data => data.deaths),
                }
            ]
        }
        return data;
    } else {
        if (_.isEmpty(covid19Data)) {
            return {};
        }
        let data = {
            labels: ['Confirmed', 'Recovered', 'Deaths'],
            datasets: [
                {
                    label: 'COVID-19',
                    backgroundColor: [
                        '#0b83e6',
                        '#12e02d',
                        '#e82b09',
                    ],
                    hoverBackgroundColor: [
                        '#0b83e6',
                        '#12e02d',
                        '#e82b09',
                    ],
                    data: [covid19Data.confirmed, covid19Data.recovered, covid19Data.deaths],
                }
            ]
        }
        return data;
    }
}

export const findCountryData = (country, covid19Data) => {
    if (_.isEmpty(covid19Data)) {
        return {};
    }
    if (!country || country === 'Global') {
        return {
            confirmed: covid19Data.Global.TotalConfirmed,
            recovered: covid19Data.Global.TotalRecovered,
            deaths: covid19Data.Global.TotalDeaths,
            lastUpdate: covid19Data.Date,
        }
    } else {
        const countryData = covid19Data.Countries.filter(data => data.Slug === country)[0];
        return {
            confirmed: countryData.TotalConfirmed,
            recovered: countryData.TotalRecovered,
            deaths: countryData.TotalDeaths,
            lastUpdate: countryData.Date,
        }
    }
}

export const parseDailyData = (country, data) => {
    if (country === 'Global') {
        return data.map(item => {
            return {
                confirmed: item.confirmed.total,
                recovered: item.recovered.total,
                deaths: item.deaths.total,
                date: moment(item.reportDate).format('YYYY-MM-DD'),
            }
        })
    } else {
        return data.map(item => {
            return {
                confirmed: item.Confirmed,
                recovered: item.Recovered,
                deaths: item.Deaths,
                date: moment(item.Date).format('YYYY-MM-DD'),                
            }
        })
    }
}