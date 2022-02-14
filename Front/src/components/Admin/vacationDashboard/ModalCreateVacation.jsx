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
import { DateRange, DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { createVacation } from '../../../services/vacationAdmin.service';
import UploadImage from './UploadImage';

const ModalCreateVacation = ({
  open,
  handleClose,
  getAllVacationsFromServer,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!urlImage) {
      setErrorMessage(true);
      return;
    }
    // console.log(state);
    const startDate = state[0].startDate.toLocaleDateString('en-US');
    const endDate = state[0].endDate.toLocaleDateString('en-US');
    const date = `${startDate} - ${endDate}`;
    // console.log(data);
    createVacation({ ...data, date })
      .then((res) => {
        // console.log(res.data);
        handleClose();
        getAllVacationsFromServer();
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
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
              <Grid item xs={12}>
                <TextField
                  label="Location *"
                  fullWidth
                  variant="outlined"
                  {...register('location', { required: true })}
                />
                {errors.location?.type === 'required' && (
                  <Alert severity="error">* Location is required</Alert>
                )}
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description *"
                  fullWidth
                  variant="outlined"
                  multiline
                  // minRows={3}
                  rows={3}
                  {...register('description', { required: true })}
                />
                {errors.description?.type === 'required' && (
                  <Alert severity="error">* Description is required</Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {!urlImage ? (
                  <UploadImage setUrlImage={setUrlImage} />
                ) : (
                  <TextField
                    label="image *"
                    value={urlImage}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    {...register('image', { required: true })}
                  />
                )}
                {errors.image?.type === 'required' && (
                  <Alert severity="error">* Image is required</Alert>
                )}
                {errorMessage && (
                  <Alert severity="error">* Image is required</Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price *"
                  fullWidth
                  variant="outlined"
                  // type="number"
                  {...register('price', { required: true, pattern: /[0-9]/ })}
                />
                {errors.price?.type === 'required' && (
                  <Alert severity="error">* Price is required</Alert>
                )}
                {errors.price?.type === 'pattern' && (
                  <Alert severity="error">* Only Numbers</Alert>
                )}
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

export default ModalCreateVacation;
