import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

class PopularityChart extends React.Component {
    state = {
        popularity: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/film/popularity/${this.props.filmId}`)
            .then(resp => {
                const { data } = resp;
                const popularity = data.data;
                
                this.setState({
                    popularity,
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    prepareData = () => {
        const chartData = [];

        this.state.popularity.forEach(day => {
            const rawDate = new Date(day.date);
            const adjustedDate = `${rawDate.getDate() < 10 ? '0' : ''}${rawDate.getDate()}.${rawDate.getMonth() + 1 < 10 ? '0' : ''}${rawDate.getMonth() + 1}.${rawDate.getFullYear()}`;

            const bar = {
                name: adjustedDate,
                tickets: day.popularity,
            };
            chartData.push(bar);
        });

        return chartData;
    }

    render() {
        const data = this.prepareData();
    
        return (
            <BarChart width={550} height={300} data={data}
                margin={{top: 5, right: 30, left: 30, bottom: 5}}
            >
                <XAxis dataKey="name"/>
                <YAxis/>
                <Legend />
                <Bar dataKey="tickets" barSize={20} fill="#8884d8" />
            </BarChart>
        );
    }
}

PopularityChart.propTypes = {
    filmId: PropTypes.number.isRequired,
};

export default PopularityChart;