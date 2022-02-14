import { Link } from '@mui/material';
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './css/footer.css';
const Footer = () => {
  return (
    <div className="footer_media_query"
      style={{
        backgroundColor: '#1976D2',
        color: 'white',
      }}
    >
      © Hadar Hubara &nbsp; &nbsp;
      <Link
        className="link_hover"
        color="inherit"
        href="https://www.linkedin.com/in/hadar-hubara"
      >
        <LinkedInIcon />
      </Link>
    </div>
  );
};

export default Footer;
