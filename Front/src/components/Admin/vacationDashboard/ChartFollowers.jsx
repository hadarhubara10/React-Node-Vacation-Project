import React, { useEffect, useState } from 'react';
import { getAllVacations } from '../../../services/vacationAdmin.service';
import Loader from '../../../components/Loader.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartFollowers = () => {
  const [vacations, setVacations] = useState([]);
  useEffect(() => {
    getAllVacationsFromServer();
  }, []);
  const getAllVacationsFromServer = () => {
    getAllVacations().then((res) => setVacations(res.data));
  };
  const getRandomColor = () => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Followers Chart By Vacation',
      },
    },
    scales: {
      y: {
        max: 50,
      },
    },
  };

  if (vacations.length > 0) {
    const labels = ['followers'];
    const dataSets = vacations.map((vacation) => ({
      label: vacation.location, //'Dataset 1',
      data: [vacation.followersID.length],
      backgroundColor: getRandomColor(),
    }));
    const data = { labels, datasets: [...dataSets] };

    return <Bar options={options} data={data} />;
  } else {
    return <Loader />;
  }
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: [100],
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: [1000],
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };
};
export default ChartFollowers;
