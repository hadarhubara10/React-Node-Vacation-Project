import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
const Logout = ({ handleClickLogout }) => {
  return <LogoutIcon onClick={handleClickLogout} />;
};

export default Logout;
