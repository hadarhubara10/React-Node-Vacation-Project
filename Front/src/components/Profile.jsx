import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let navigate = useNavigate();
  const handlerBackButton = () => {
    navigate(-1);
  };
  const userData = useSelector((state) => state.userData);
  return (
    <div style={{ width: '100%' }}>
      Profile
      {JSON.stringify(userData)}
      <br />
      <Button onClick={handlerBackButton} variant="contained">
        Back
      </Button>
    </div>
  );
};

export default Profile;
