import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
import Avatar from 'react-avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { changeProfileNames } from '../services/profileService.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/authenticationAction';

export default function ProfileCard() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    changeProfileNames(data, userData._id).then((res) => {
      // console.log(res.data);
      dispatch(setUser(res.data));
    });
    setInputText(false);
  };

  const [inputText, setInputText] = useState(false);
  const userData = useSelector((state) => state.userData);
  let navigate = useNavigate();
  const handlerBackButton = () => {
    navigate(-1);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
      <CardHeader
        avatar={
          <IconButton sx={{ p: 0 }}>
            {userData.googleId ? (
              <Avatar round={true} size="50" googleId={userData.googleId} />
            ) : (
              <Avatar round={true} size="50" name={userData.firstName} />
            )}{' '}
          </IconButton>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <>
            {inputText ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    {...register('firstName', {
                      required: true,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                    size="small"
                    id="standard-basic"
                    label="First Name"
                    variant="standard"
                  />
                  <br />
                  {errors.firstName?.type === 'required' && (
                    <span style={{ color: 'red' }}>
                      * First Name is required
                    </span>
                  )}
                  {errors.firstName?.type === 'pattern' && (
                    <span style={{ color: 'red' }}>
                      * First Name is not valid
                    </span>
                  )}

                  <TextField
                    {...register('lastName', {
                      required: true,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                    size="small"
                    id="standard-basic"
                    label="Last Name"
                    variant="standard"
                  />

                  <br />
                  {errors.lastName?.type === 'required' && (
                    <span style={{ color: 'red' }}>
                      * Last Name is required
                    </span>
                  )}
                  {errors.lastName?.type === 'pattern' && (
                    <span style={{ color: 'red' }}>
                      * Last Name is not valid
                    </span>
                  )}
                  <br />
                  <Button type="submit" variant="outlined">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setInputText(false);
                    }}
                  >
                    Cancel
                  </Button>
                </form>
                &nbsp;
              </>
            ) : (
              <>
                {userData.firstName} {userData.lastName} &nbsp; &nbsp;
                <EditIcon
                  onClick={() => {
                    setInputText((prevState) => !prevState);
                  }}
                  fontSize="inherit"
                />
              </>
            )}
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          id: {userData._id}
          <br />
          email: {userData.email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
