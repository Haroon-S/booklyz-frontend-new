'use client';

import ModalHeader from '@/app/common/components/ModalHeader';
import SectionLoader from '@/app/common/loaders/SectionLoader';
import { RenderContactInfo } from '@/app/companies/[id]/page';
import CompanyGallery from '@/app/companies/components/CompanyGallery';
import ServiceItemGrid from '@/app/companies/components/ServiceItemGrid';
import StaffItemGrid from '@/app/companies/components/StaffItemGrid';
import { useGetPublicCompanyByIdQuery, useGetPublicServiceQuery } from '@/services/public/companyServices';
import { border } from '@/styles/common/colors';
import { weekSlots } from '@/utilities/common';
import { Apartment, Edit, Email, MyLocation, Phone } from '@mui/icons-material';
import { Box, Button, Divider, Modal, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import AddEditCompanyForm from '../components/form/AddEditCompanyForm';
import { formModalStyles } from '@/styles/mui/common/modal-styles';

function CompanyDetail() {
  const { id: paramsId } = useParams();
  const { data: companyData, isLoading, isFetching } = useGetPublicCompanyByIdQuery(paramsId);
  const { data: serviceData } = useGetPublicServiceQuery({ company: paramsId });

  const [isAddModalOpen, setAddModalOpen] = useState(false);

    const toggleAddModal = () => {
      setAddModalOpen(!isAddModalOpen);
    };

  const loading = isLoading || isFetching;

  const formattedTimeSlots = `${moment(companyData?.mata_data?.availability_start_time, 'HH:mm:ss').format('hh:mm A')} - ${moment(companyData?.mata_data?.availability_end_time, 'HH:mm:ss').format('hh:mm A')}`;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="pageTitle">Store Detail</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<Edit />}
          onClick={toggleAddModal}
        >
          Edit
        </Button>
      </Stack>
      <Paper sx={{ borderRadius: '10px' }} className=" py-14 px-8">
        {loading && <SectionLoader />}
        {!loading && companyData && (
          <Box>
            <Typography variant="h4" className=" text-normal font-semibold text-themeSecondary">
              {companyData?.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: '5px', marginY: '4px' }}>
              <Typography variant="body1" className=" text-grey uppercase font-semibold">
                {companyData?.address}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold">
                {companyData?.company_description}
              </Typography>
            </Box>

            <Typography variant="h6" className=" font-bold mt-3">
              Details and contact information
            </Typography>
            <RenderContactInfo
              value={companyData?.name}
              icon={<Apartment fontSize="14px" />}
              classes=" font-bold mt-2"
            />
            <Divider sx={{ borderColor: border }} className="my-3" />
            <RenderContactInfo value={companyData?.email} icon={<Email fontSize="13px" />} />
            <Divider sx={{ borderColor: border }} className="my-3" />
            <RenderContactInfo value={companyData?.phone} icon={<Phone fontSize="13px" />} />
            <Divider sx={{ borderColor: border }} className="my-3" />
            <RenderContactInfo value={companyData?.address} icon={<MyLocation fontSize="13px" />} />
            <Divider sx={{ borderColor: border }} className="my-3" />
            <RenderContactInfo
              value={companyData?.mata_data?.website}
              icon={<MyLocation fontSize="13px" />}
            />

            <Divider sx={{ borderColor: border }} className="my-6" />

            <Box className="mt-7 overflow-hidden">
              <Typography variant="h6" className="font-medium mb-4 text-themeSecondary">
                Time Slots
              </Typography>
              <Stack direction="column" gap={2}>
                {weekSlots[companyData?.mata_data?.availability_days] &&
                  weekSlots[companyData?.mata_data?.availability_days].map(item => (
                    <Stack
                      sx={{ borderBottom: '1px solid', borderBottomColor: border }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography className="font-medium">{item}</Typography>
                      <Typography className="font-medium">{formattedTimeSlots}</Typography>
                    </Stack>
                  ))}
              </Stack>
            </Box>

            <Box mt={8}>
              <Typography variant="h3" className=" font-bold">
                Store Services
              </Typography>
              <Box className="mt-6">
                {serviceData?.map(item => (
                  <ServiceItemGrid
                    title={item?.service_name}
                    price={item?.price}
                    timing={item?.service_timing}
                    description={item?.service_description}
                    id={item?.id}
                    isPortal
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ borderColor: border }} className="my-6" />

            <Box mt={8}>
              <Typography variant="h3" className=" font-bold">
                Staff
              </Typography>
              <Box className="mt-6">
                {companyData?.company_staff?.map(item => (
                  <>
                    <StaffItemGrid
                      name={`${item?.first_name} ${item?.last_name}`}
                      rating={item?.staff_rating}
                      image={item?.image}
                    />
                    <Divider sx={{ borderColor: border }} className="my-3" />
                  </>
                ))}
              </Box>
            </Box>

            <Box mt={8}>
              <Typography variant="h3" className=" font-bold">
                Pictures
              </Typography>
              <Box className="mt-6">
                <CompanyGallery
                  images={companyData?.company_images?.length > 0 ? companyData?.company_images : []}
                />
              </Box>
            </Box>
          </Box>
        )}
        e.stopPropagation
        <Modal open={isAddModalOpen} onClose={toggleAddModal}>
          <Box sx={{ ...formModalStyles, width: '900px' }}>
            <ModalHeader title="Edit Store" onClose={toggleAddModal} />
            <AddEditCompanyForm companyData={companyData} toggleAddModal={toggleAddModal} />
          </Box>
        </Modal>
      </Paper>
    </>
  );
}

export default CompanyDetail;
