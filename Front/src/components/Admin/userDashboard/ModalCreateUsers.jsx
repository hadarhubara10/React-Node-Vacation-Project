import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// Date picker
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { createUser } from '../../../services/usersAdmin.service';

const ModalCreateUser = ({ open, handleClose, getAllUsersFromServer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(state);
    // const startDate = state[0].startDate.toLocaleDateString('en-US');
    // const endDate = state[0].endDate.toLocaleDateString('en-US');
    // const date = `${startDate} - ${endDate}`;
    // console.log(data);
    createUser(data)
      .then((res) => {
        // console.log(res.data);
        handleClose();
        getAllUsersFromServer();
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  };
  // useEffect(() => {
  // }, [])
  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection',
  //   },
  // ]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Vacation Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name *"
                  fullWidth
                  variant="outlined"
                  {...register('firstName', { required: true })}
                />
                {errors.firstName?.type === 'required' && (
                  <Alert severity="error">* First Name is required</Alert>
                )}
              </Grid>
              {/* <Grid item xs={12} style={{ textAlign: 'center' }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name *"
                  fullWidth
                  variant="outlined"
                  {...register('lastName', { required: true })}
                />
                {errors.lastName?.type === 'required' && (
                  <Alert severity="error">* Last Name is required</Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email *"
                  fullWidth
                  variant="outlined"
                  {...register('email', {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  })}
                />
                {errors.email?.type === 'required' && (
                  <Alert severity="error">* Email is required</Alert>
                )}
                {errors.email?.type === 'pattern' && (
                  <Alert severity="error">* Email is invalid</Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password *"
                  fullWidth
                  type="password"
                  variant="outlined"
                  {...register('password', { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  Create Vacation
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          {/* </form> */}
        </Box>
      </Dialog>
    </div>
  );
};

export default ModalCreateUser;
