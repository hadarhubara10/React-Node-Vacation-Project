import {
  Alert,
  Button,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Loader from './Loader';
import Carousel from 'react-bootstrap/Carousel';
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.4rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

const VacationDetailes = () => {
  const [vacation, setVacation] = useState('');
  let params = useParams();
  const vacationsFromRedux = useSelector((state) => state.vacations);

  useEffect(() => {
    if (vacationsFromRedux.length > 1) {
      setVacation(vacationsFromRedux.find((vac) => vac._id === params.id));
    }
  }, [vacationsFromRedux]);

  let navigate = useNavigate();
  return vacationsFromRedux.length > 0 ? (
    <div>
      {!vacation ? (
        <Alert severity="error">Vacation deleted</Alert>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <Typography variant="h2">{vacation?.location}</Typography>
            <Typography variant="h3">{vacation?.date}</Typography>
            <Typography variant="h4">
              <b>{vacation?.price?.toLocaleString()}$</b>
            </Typography>
          </ThemeProvider>
          <Grid container spacing={2}>
            {window.innerWidth > 600 && (
              <Grid item xs={12} md={6}>
                <Typography variant="body1" style={{ fontSize: '2rem' }}>
                  {vacation?.description} Lorem ipsum dolor sit, amet
                  consectetur explicabo aspernatur dicta nemo unde alias maiores
                  ratione laborum fugit reprehenderit repellat dolor, nisi qui.
                  Delectus deleniti tempora maiores quod dicta! Id laboriosam a
                  beatae? Doloribus nostrum asperiores voluptatem officia dolore
                  nesciunt quod minus natus facere? Aut harum, aliquam vel alias
                  debitis, cupiditate, ipsam quaerat nulla incidunt consequuntur
                  corporis sequi veritatis
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Carousel interval={2000}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="http://picsum.photos/300/200"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={vacation?.image}
                    alt="Slider"
                  />
                </Carousel.Item>
              </Carousel>
            </Grid>
            {window.innerWidth < 600 && (
              <Grid item xs={12} md={6}>
                <Typography variant="body1" style={{ fontSize: '2rem' }}>
                  {vacation.description} Lorem ipsum dolor sit, amet consectetur
                  explicabo aspernatur dicta nemo unde alias maiores ratione
                  laborum fugit reprehenderit repellat dolor, nisi qui. Delectus
                  deleniti tempora maiores quod dicta! Id laboriosam a beatae?
                  Doloribus nostrum asperiores voluptatem officia dolore
                  nesciunt quod minus natus facere? Aut harum, aliquam vel alias
                  debitis, cupiditate, ipsam quaerat nulla incidunt consequuntur
                  corporis sequi veritatis
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default VacationDetailes;
