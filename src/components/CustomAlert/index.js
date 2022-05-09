import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomAlert(props) {
  const { message, severity, variant, open, setOpen } = props;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ vertical:"top", horizontal:"center" }}
    >
      <Alert onClose={handleClose} severity={severity} variant={variant} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
