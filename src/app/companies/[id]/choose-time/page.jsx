'use client';

import React from 'react';
import { Container } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useGetPublicServiceByIdQuery } from '@/services/public/companyServices';
import ChooseTimeForm from './components/ChooseTimeForm';

function ChooseTime() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const { data: serviceData } = useGetPublicServiceByIdQuery(serviceId);

  return (
    <Container variant="portal" sx={{ marginTop: '70px' }}>
      <ChooseTimeForm serviceData={serviceData} serviceId={serviceId} companyId={serviceData?.company} />
    </Container>
  );
}

export default ChooseTime;
