import ActionBtns from '@/app/common/components/ActionBtns'
import { useAddAssetsMutation } from '@/services/private/assets';
import FormikField from '@/shared/components/form/FormikField'
import { Divider, Paper, Stack, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react';
import * as yup from 'yup';

function FormTemplate() {

    const [addAssetTemplate] = useAddAssetsMutation();

    return (
        <>
            <Formik
enableReinitialize
                initialValues={{ description: "" }}
                validationSchema={yup.object({
                    description: yup.string().required('Required'),
                })}
                onSubmit={async (values, { resetForm }) => {
                    await addAssetTemplate({
                        ...values,
                        template_type: 'text'
                    });

                    resetForm({ description: "" });
                }}
            >
                {() => (
                    <Form style={{ width: '100%' }}>
                        <Paper sx={{ borderRadius: '20px', padding: '20px 30px', width: "100%" }}>
                            <Typography variant='h5' mb={2}>
                                Manage Templates
                            </Typography>

                            <Divider />

                            <Stack spacing={2}>
                                <FormikField
                                    name='description'
                                    type='textarea'
                                    isStack
                                    label='  Write Template'
                                />

                                <ActionBtns initialValues={{ description: "" }} />
                            </Stack>
                        </Paper>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default FormTemplate
