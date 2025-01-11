import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

function GridItemCard({
  textAlign = 'center',
  alignItems = 'center',
  head = '',
  subHead = '',
  icon = null,
  image = '',
  boxed = false,
  isHome = false,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: { xs: 'center', md: alignItems },
        textAlign: { xs: 'center', md: textAlign },
        gap: '8px',
      }}
    >
      {boxed && !image ? <Box className=" p-2 bg-fuchsia-950 rounded-full text-white">{icon}</Box> : icon}
      {image && <Image src={image} alt="banner" width={24} height={24} />}
      {!isHome && (
        <Typography variant="h6" className=" font-semibold">
          {head}
        </Typography>
      )}
      {isHome && (
        <Typography variant="body1" className=" text-lg capitalize font-normal">
          {head}
        </Typography>
      )}
      <Typography variant="body2" className=" font-medium">{subHead}</Typography>
    </Box>
  );
}

GridItemCard.propTypes = {
  textAlign: PropTypes.string.isRequired,
  alignItems: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
  subHead: PropTypes.string.isRequired,
  icon: PropTypes.element,
  image: PropTypes.string,
  isHome: PropTypes.bool,
  boxed: PropTypes.bool,
};

export default GridItemCard;
