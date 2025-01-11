import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

function CommonSelectBtn({ title, actionFunc }) {
  return (
    <Button sx={{ width: '100%' }} variant="contained" size="small" onClick={actionFunc}>
      {title}
    </Button>
  );
}

CommonSelectBtn.propTypes = {
  title: PropTypes.string.isRequired,
  actionFunc: PropTypes.func.isRequired,
};

export default CommonSelectBtn;
