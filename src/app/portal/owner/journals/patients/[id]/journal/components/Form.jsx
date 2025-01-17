/* eslint-disable jsx-a11y/alt-text */

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

import { Box, Button, Divider, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import KvaCodeForm from './KvaCodeForm';
import { getCommonOptionsMaker } from '@/utilities/helpers';
import { useGetDaignosisQuery } from '@/services/private/daignosis';
import DaignosisForm from './DaignosisForm';
import ActionBtns from '@/app/common/components/ActionBtns';
import { initialValues } from './utilis/formUtilis';
import {
  useAddJournalMutation,
  useGetJournalsByIdQuery,
  useUpdateJournalMutation,
} from '@/services/private/journals';
import { useGetAssetsQuery } from '@/services/private/assets';
import FormikRichTextEditor from '@/shared/components/form/FormikRichTextEditor';
import { useParams, useSearchParams } from 'next/navigation';
import TemplateModal from './TemplateModal';
import MarkerComponent from './MarkerComponent';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';

// const FormikTextEditor = dynamic(
//     () => import('@/shared/components/form/FormikTextEditor'),
//     { ssr: false }
//   );

function JournalForm() {
  const { id: paramsId } = useParams();
  const searchParams = useSearchParams();
  const journalId = searchParams.get('journal');
  const bookingId = searchParams.get('booking');
  const [initValues, setInitValues] = useState(initialValues);
  const [kvaCodeModal, setKvaCodeModal] = useState(false);
  const [daignosisModal, setDaignosisModal] = useState(false);
  const [isTemplateModal, setTemplateModal] = useState(false);
  const [isMarkerModal, setMarkerModal] = useState(false);
  const [formOptions, setFormOptions] = useState({
    kvyCodeFinalOptions: [],
    daignosisFinalOptions: [],
    templateFinalOptions: [],
  });

  const { data: journalData } = useGetJournalsByIdQuery(journalId, { skip: !journalId });
  const { data: kvyCodeData } = useGetKvyCodesQuery();
  const { data: daignosisData } = useGetDaignosisQuery();
  const { data: assetTemplates } = useGetAssetsQuery({ template_type: 'text' });
  const [addJournal, { error, isSuccess }] = useAddJournalMutation();
  const [updateJournal, { error: editError, isSuccess: editSuccess }] = useUpdateJournalMutation();
  useHandleApiResponse(error, isSuccess, 'Journal added successfully!');
  useHandleApiResponse(editError, editSuccess, 'Journal updated successfully!');

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
  const handleToggleTemplateModal = () => setTemplateModal(prev => !prev);
  const handleToggleMarkerModal = () => setMarkerModal(prev => !prev);

  const handleSubmit = async values => {
    const formData = new FormData();

    // Append simple fields
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'journal_files' && key !== 'kvy_code' && key !== 'diagnosis') {
        formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
      }
    });

    // Append files
    // if (journalId) {
    //   formData.append('booking', Number(bookingId));
    // } else {
    //   formData.append('booking', Number(paramsId));
    // }
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
      if (journalId) {
        await updateJournal({ formData, id: journalId });
      } else {
        await addJournal(formData);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
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
        {({ values }) => (
          <Form style={{ width: '100%' }}>
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
                  {journalId && (
                    journalData?.journal_makers?.[0]?.id ? (<>
                      <Paper sx={{
                        padding: 4, display: 'flex', cursor: 'pointer',
                        justifyContent: 'center', alignItems: 'center'
                      }}
                        onClick={handleToggleMarkerModal}>
                        <img src={journalData?.journal_makers?.[0]?.marker_image} style={{ width: '100%' }} />
                      </Paper>
                    </>) : (<>
                      <Stack minHeight="400px" alignItems="center" justifyContent="center" spacing={1}>
                        <img src="/pain.svg" />
                        <Typography variant="h6">Anatomical map</Typography>
                        <Typography variant="body2" maxWidth="200px" textAlign="center" color="secondary">
                          Add a drawing to a body part and create markers with comments.
                        </Typography>
                        <Button variant="contained" size="small" onClick={handleToggleTemplateModal}>
                          Add
                        </Button>
                      </Stack>

                      <Divider sx={{ margin: '15px 0px' }} />
                    </>))
                  }


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
      <CommonModal isOpen={isTemplateModal} toggle={handleToggleTemplateModal}>
        <Box minWidth="600px">
          <TemplateModal toggle={handleToggleTemplateModal} openMarkerModal={handleToggleMarkerModal} />
        </Box>
      </CommonModal>
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
      <Modal
        open={isMarkerModal}
        onClose={handleToggleMarkerModal}
        className="flex justify-center items-center modal-scroll"
      >
        <Box minWidth="80%" maxWidth="90%" height="calc(100vh - 200px)" component={Paper}>
          <MarkerComponent id={journalData?.journal_makers?.[0]?.id} toggle={handleToggleMarkerModal} />
        </Box>
      </Modal>
    </>
  );
}

export default JournalForm;
