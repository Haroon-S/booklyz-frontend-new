import { TodayOutlined } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { border } from '@/styles/common/colors';

function CommonQuestionCard() {
  return (
    <Box className=" relative shadow-xl p-5 min-h-96 rounded-3xl">
      <Box className=" flex gap-3 items-center">
        <TodayOutlined />
        <Typography variant="h5" className=" font-semibold">
          Common
        </Typography>
      </Box>
      <Divider sx={{ borderColor: border }} className="my-3" />
      <Box className=" flex flex-col gap-3">
        <Typography variant="body2" className=" font-medium">
          Common Question
        </Typography>
        <Typography variant="body2" className=" font-medium">
          Common Question
        </Typography>
        <Typography variant="body2" className=" font-medium">
          Common Question
        </Typography>
        <Typography variant="body2" className=" font-medium">
          Common Question
        </Typography>
      </Box>
      {/* <Box className=" absolute bottom-5 left-5">
        <Link href="/support">
          <Typography variant="h6" className="mt-3 font-semibold">
            View all
          </Typography>
        </Link>
      </Box> */}
    </Box>
  );
}

export default CommonQuestionCard;
