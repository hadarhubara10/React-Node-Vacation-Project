import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function ShareModal({ vacation }) {
  const shareURL = 'https://vacation-node-react.herokuapp.com/home';
  // const shareURL = 'http://localhost:3000/home';

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="share" size="small">
        <ShareIcon size="small" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Share {vacation.location}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FacebookShareButton
              url={`${shareURL}/VacationDetailes/${vacation._id}`}
              children={<FacebookIcon size="36" round="true"></FacebookIcon>}
            />
            &nbsp;
            <EmailShareButton
              url={`${shareURL}/VacationDetailes/${vacation._id}`}
              children={<EmailIcon size="36" round="true"></EmailIcon>}
            />
            &nbsp;
            <WhatsappShareButton
              url={`${shareURL}/VacationDetailes/${vacation._id}`}
              children={<WhatsappIcon size="36" round="true"></WhatsappIcon>}
            />
            &nbsp;
            <TelegramShareButton
              url={`${shareURL}/VacationDetailes/${vacation._id}`}
              children={<TelegramIcon size="36" round="true"></TelegramIcon>}
            />
            &nbsp;
            <TwitterShareButton
              url={`${shareURL}/VacationDetailes/${vacation._id}`}
              children={<TwitterIcon size="36" round="true"></TwitterIcon>}
            />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
