import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ incomes, expenses }) => {
  const data = {
    // We will create labels for the last 7 days for a cleaner look
    labels: Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString();
    }).reverse(),
    datasets: [
      {
        label: 'Income',
        data: Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return incomes
                .filter(inc => new Date(inc.date).toLocaleDateString() === d.toLocaleDateString())
                .reduce((acc, inc) => acc + inc.amount, 0);
        }).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Expense',
        data: Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return expenses
                .filter(exp => new Date(exp.date).toLocaleDateString() === d.toLocaleDateString())
                .reduce((acc, exp) => acc + exp.amount, 0);
        }).reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;