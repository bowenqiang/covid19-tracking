import _ from 'lodash';
export const chartDataHelper = (dailyData, covid19Data, isGlobal) => {
    if (dailyData.length === 0 || _.isEmpty(covid19Data)) {
        return {};
    }
    if (isGlobal) {
        let data = {
            labels: dailyData.map(data => data.reportDate),
            datasets: [
                {
                    label: "Confirmed",
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: '#0b83e6',
                    borderColor: "#0b83e6",
                    borderWidth: 2,
                    spanGaps: true,
                    data: dailyData.map(data => data.confirmed.total),
                },
                {
                    label: "Recovered",
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: "#12e02d",
                    borderColor: "#12e02d",
                    borderWidth: 2,
                    spanGaps: true,
                    data: dailyData.map(data => data.recovered.total),
                },
                {
                    label: "Deaths",
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: "#e82b09",
                    borderColor: "#e82b09",
                    borderWidth: 2,
                    spanGaps: true,
                    data: dailyData.map(data => data.deaths.total),
                }
            ]
        }
        return data;
    } else {
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
                    data: [covid19Data.confirmed.value, covid19Data.recovered.value, covid19Data.deaths.value],
                }
            ]
        }
        return data;
    }
}