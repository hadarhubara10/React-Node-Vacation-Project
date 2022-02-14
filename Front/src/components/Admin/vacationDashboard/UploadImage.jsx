import React, { useState } from 'react';
import { Alert, Box, Button, Slide, Snackbar, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const UploadImage = ({ setUrlImage }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'hubara',
        uploadPreset: 'upload',
        folder: 'vacation-project',
        cropping: true,
        showSkipCropButton: true,
      },
      (error, result) => {
        // if (error) console.log(error);
        if (!error && result && result.event === 'success') {
          setUrlImage(result.info.url);
          // console.log(result.info.url);
          handleClick();
        }
      }
    );
    widget.open();
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" onClick={showWidget}>
        Upload Image &nbsp;&nbsp;
        <AddPhotoAlternateIcon />
      </Button>
      <br />
      <br />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          &nbsp; התמונה הועלתה בהצלחה! &nbsp;
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadImage;
