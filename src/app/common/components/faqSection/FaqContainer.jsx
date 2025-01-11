'use client';

import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@mui/icons-material';
import Faqs from './Faqs';

// COMPONENTS

function FaqContainer({ faqs = [] }) {
  return (
    <Box className=" shadow-xl p-10" sx={{ marginTop: '50px' }}>
      <Box className=" flex gap-3 mb-5 items-center">
        <SearchOutlined style={{ fontSize: '35px' }} />
        <Typography variant="h4" className=" font-semibold">
          FAQs
        </Typography>
      </Box>
      {faqs?.map(item => (
        <Faqs
          key={item?.id}
          question={item?.question}
          answer={item?.answer}
          questionTypoVariant="h6"
          answerTypoVariant="body1"
          questionColor="darkPurple"
          answerColor="darkPurple"
          questionClassName="px-3"
          answerClassName="px-3"
        />
      ))}
    </Box>
  );
}

FaqContainer.propTypes = {
  faqs: PropTypes.array,
};

export default memo(FaqContainer);
