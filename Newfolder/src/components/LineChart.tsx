import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import LatencyArr from './Latency.json';
import TimeArr from './Time.json'



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = [0.9982,0.9982,0.9984,0.9986,0.9988,0.9990,0.9992,0.9994];




export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data:LatencyArr.slice(100,200).map((val,ind) => val) ,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: TimeArr.slice(100,200).map((val,ind) => val),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


const LineChart = () => {
  return (
    <Line options={options} data={data} />
  )
}

export default LineChart


