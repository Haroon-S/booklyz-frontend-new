'use client';

import CommonModal from '@/app/common/components/CommonModal';
import CommonSelectBtn from '@/app/common/components/CommonSelectBtn';
import { useGetKvyCodesQuery } from '@/services/private/kvyCode';
import FormikDatePicker from '@/shared/components/form/FormikDatePicker';
import FormikDropZone from '@/shared/components/form/FormikDropZone';
import FormikField from '@/shared/components/form/FormikField';
import FormikMultiSelect from '@/shared/components/form/FormikMultiSelect';
import FormikSelect from '@/shared/components/form/FormikSelect';
// import FormikTextEditor from '@/shared/components/form/FormikTextEditor';
// import dynamic from 'next/dynamic';

import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import KvaCodeForm from './KvaCodeForm';
import { getCommonOptionsMaker } from '@/utilities/helpers';
import { useGetDaignosisQuery } from '@/services/private/daignosis';
import DaignosisForm from './DaignosisForm';
import ActionBtns from '@/app/common/components/ActionBtns';
import { initialValues } from './utilis/formUtilis';
import { useAddJournalMutation, useGetJournalsByIdQuery, useUpdateJournalMutation } from '@/services/private/journals';
import { useGetAssetsQuery } from '@/services/private/assets';
import FormikRichTextEditor from '@/shared/components/form/FormikRichTextEditor';
import { useParams, useSearchParams } from 'next/navigation';

// const FormikTextEditor = dynamic(
//     () => import('@/shared/components/form/FormikTextEditor'),
//     { ssr: false }
//   );

function JournalForm() {
  const searchParams = useSearchParams();
  const journalId = searchParams.get('journal');
  const bookingId = searchParams.get('booking');
  const [initValues, setInitValues] = useState(initialValues);
  const [kvaCodeModal, setKvaCodeModal] = useState(false);
  const [daignosisModal, setDaignosisModal] = useState(false);
  const [formOptions, setFormOptions] = useState({
    kvyCodeFinalOptions: [],
    daignosisFinalOptions: [],
    templateFinalOptions: [],
  });

  const { data: journalData } = useGetJournalsByIdQuery(journalId);
  const { data: kvyCodeData } = useGetKvyCodesQuery();
  const { data: daignosisData } = useGetDaignosisQuery();
  const { data: assetTemplates } = useGetAssetsQuery({ template_type: 'text' });
  const [updateJournal] = useUpdateJournalMutation();

  const kvaOptions = useMemo(() => getCommonOptionsMaker(kvyCodeData?.results, 'id', 'code'), [kvyCodeData]);
  const daignosisOptions = useMemo(
    () => getCommonOptionsMaker(daignosisData?.results, 'id', 'code'),
    [daignosisData]
  );

  const templateOptions = useMemo(
    () => getCommonOptionsMaker(assetTemplates?.results, 'id', 'title'),
    [assetTemplates]
  );

  const handleToggleKvaModal = () => setKvaCodeModal(prev => !prev);
  const handleToggleDaignosisModal = () => setDaignosisModal(prev => !prev);

  const handleSubmit = async values => {
    const formData = new FormData();

    // Append simple fields
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'journal_files' && key !== 'kvy_code' && key !== 'diagnosis') {
        formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
      }
    });

    // Append files
    formData.append('booking', bookingId); 
    if (values.kvy_code) {
      values.kvy_code.forEach((file, index) => {
        formData.append(`kvy_code[${index}]`, file);
      });
    }

    if (values.diagnosis) {
      values.diagnosis.forEach((file, index) => {
        formData.append(`diagnosis[${index}]`, file);
      });
    }
    if (values.journal_files) {
      values.journal_files.forEach((file, index) => {
        formData.append(`journal_files`, file);
      });
    }

    // Call API
    try {
      await updateJournal({formData, id: journalId});
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  console.log('Journal Values ==> ', journalData);
  

  useEffect(() => {
    if (journalId) {
      setInitValues({
        date: journalData?.date || '',
        kvy_code: journalData?.kvy_code || [],
        diagnosis: journalData?.diagnosis || [],
        contact_name: journalData?.phone || '',
        assessment: journalData?.assessment || '',
        action: journalData?.action || '',
        description: journalData?.description || '',
        price: journalData?.price || '',
        journal_files: journalData?.journal_files || [],
      });
    }
    setFormOptions(prevOptions => ({
      ...prevOptions,
      kvyCodeFinalOptions: [
        ...kvaOptions,
        {
          value: '',
          label: <CommonSelectBtn title="Manage KVA code" actionFunc={handleToggleKvaModal} />,
        },
      ],
      daignosisFinalOptions: [
        ...daignosisOptions,
        {
          value: '',
          label: <CommonSelectBtn title="Manage Daignosis" actionFunc={handleToggleDaignosisModal} />,
        },
      ],
      templateFinalOptions: [
        ...templateOptions,
        {
          value: '',
          label: <CommonSelectBtn title="Manage Template" actionFunc={handleToggleDaignosisModal} />,
        },
      ],
    }));
  }, [kvaOptions, daignosisOptions, journalId, journalData]);

  const { kvyCodeFinalOptions, daignosisFinalOptions } = formOptions;

  return (
    <>
      <Formik enableReinitialize initialValues={initValues} onSubmit={handleSubmit}>
        {({values}) => (
          <Form style={{ width: '100%' }}>
            {console.log('Values == >', values)}
            <Paper
              sx={{
                borderRadius: '20px',
                padding: '20px 30px',
                minHeight: 'calc(100vh - 160px)',
                width: '100%',
              }}
            >
              <Typography variant="h3" mb={2}>
                Journal
              </Typography>

              <Divider />

              <Grid container spacing={2} minWidth="100%" my={2}>
                <Grid item xl={6} lg={6} md={6}>
                  <Stack spacing={2}>
                    <FormikDatePicker name="date" label="Date" isStack />

                    <FormikSelect
                      name="template"
                      label="Template"
                      options={templateOptions}
                      placeholder="Select"
                      isStack
                    />

                    <FormikMultiSelect
                      name="diagnosis"
                      label="Daignose"
                      options={daignosisFinalOptions}
                      placeholder="Select"
                      isStack
                    />

                    <FormikMultiSelect
                      name="kvy_code"
                      label="KVA Code"
                      options={kvyCodeFinalOptions}
                      placeholder="Select"
                      isStack
                    />

                    <FormikField
                      name="contact_name"
                      label="Contact reason (used as title)"
                      placeholder="Reason"
                      isStack
                    />

                    <FormikField name="assessment" label="Assessment" isStack />

                    <FormikField name="action" label="Measure" isStack />

                    {/* <FormikField name="description" label="Write" type="textarea" isStack /> */}
                    <Box>
                      <Typography variant="label" mb={1}>
                        Description
                      </Typography>
                      <FormikRichTextEditor name="description" />
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xl={6} lg={6} md={6}>
                  <Typography variant="body1" mb={2}>
                    Filer
                  </Typography>

                  <FormikDropZone name="journal_files" multiple />
                </Grid>
              </Grid>

              <ActionBtns initialValues={initialValues} />
            </Paper>
          </Form>
        )}
      </Formik>
      <CommonModal isOpen={kvaCodeModal} toggle={handleToggleKvaModal}>
        <Box minWidth="600px">
          <KvaCodeForm />
        </Box>
      </CommonModal>
      <CommonModal isOpen={daignosisModal} toggle={handleToggleDaignosisModal}>
        <Box minWidth="600px">
          <DaignosisForm />
        </Box>
      </CommonModal>
    </>
  );
}

export default JournalForm;
