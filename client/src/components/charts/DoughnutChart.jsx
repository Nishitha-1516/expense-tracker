import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d._id),
        datasets: [
            {
                label: 'Expenses',
                data: data.map(d => d.totalAmount),
                backgroundColor: [
                    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
                    '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;