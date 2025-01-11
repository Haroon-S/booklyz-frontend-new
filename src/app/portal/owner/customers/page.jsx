import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import CustomersTable from './components/CustomersTable';

function Customers() {
  return (
    <Paper sx={{ borderRadius: '10px' }} className=" py-14 px-8">
      <Stack alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4" className=" w-full">Customers</Typography>
        <Typography variant="subtitle1" className=" w-full">
          Here you can see all your customers who are in your portal. Click on a customer to make changes, or
          select multiple customers to manage multiple
        </Typography>
      </Stack>
      <CustomersTable />
    </Paper>
  );
}

export default Customers;
