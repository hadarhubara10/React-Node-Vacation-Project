import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import dreamVacationImg from '../images/dreamVacation2.jpg';
import { useSelector } from 'react-redux';
import VacationCard from './VacationCard';
import { Paper, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const VacationList = ({ vacationScroll, vacationOnFollowScroll }) => {
  const onFollowSuccess = () => {
    toast.success('Follow Successfully!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };
  const onUnFollowSuccess = () => {
    toast.info('UnFollow Successfully!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const vacationsState = useSelector((state) => state.vacations);
  const userData = useSelector((state) => state.userData);
  const [viewFollow, setViewFollow] = useState(false);
  const [counterVacationUpdate, setCounterVacationUpdate] = useState(0);
  useEffect(() => {
    if (vacationsState.length > 0) {
      const vacationsFollowList = vacationsState?.find((vacation) =>
        vacation.followersID.includes(userData._id)
      );
      vacationsFollowList ? setViewFollow(true) : setViewFollow(false);
    }
    // Counter Update
  }, [vacationsState]);

  // const vacationsListOnFollow = vacationsState?.find((vacation) =>
  //   vacation.followersID.includes(userData._id)
  // );
  // console.log(vacationsListOnFollow);
  return (
    vacationsState.length > 0 && (
      <>
        <img width="100%" alt="dreamVacationImg" src={dreamVacationImg} />
        {/* Scroll To Vacations */}
        <span ref={vacationScroll}></span>
        <br />
        <br />
        <div style={{ width: '90%', margin: '0 auto' }}>
          <br />
          <br />
          <Paper elevation={3}>
            <Typography variant="h3">All Vacations</Typography>
            <Grid container spacing={2}>
              {vacationsState.map((vacation) => (
                <Grid key={vacation._id} item xs={12} md={3}>
                  <VacationCard
                    onUnFollowSuccess={onUnFollowSuccess}
                    onFollowSuccess={onFollowSuccess}
                    vacation={vacation}
                    userData={userData}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
          <span ref={vacationOnFollowScroll}></span>
          <br />
          <br />
          {viewFollow ? (
            <Paper elevation={3}>
              <Typography variant="h3">Vacations On Follow </Typography>

              {/* // )} */}
              <Grid container spacing={2}>
                {/* Dont have onFollow */}
                {vacationsState.map(
                  (vacation) =>
                    vacation.followersID.includes(userData._id) && (
                      <Grid key={vacation._id} item xs={12} md={3}>
                        <VacationCard
                          vacation={vacation}
                          userData={userData}
                          onUnFollowSuccess={onUnFollowSuccess}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </Paper>
          ) : (
            <Typography variant="h6">
              You can to follow on vacation here <ArrowUpwardIcon />{' '}
            </Typography>
          )}
        </div>
        {/* <ToastContainer /> */}
      </>
    )
  );
};

export default VacationList;
