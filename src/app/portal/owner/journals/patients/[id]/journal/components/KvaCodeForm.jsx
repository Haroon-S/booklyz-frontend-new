'use client'

import ActionBtns from '@/app/common/components/ActionBtns'
import { useAddKvyCodesMutation, useDeleteKvyCodeMutation, useEditKvyCodesMutation, useGetKvyCodesQuery, useGetSingleKvyCodeQuery } from '@/services/private/kvyCode'
import FormikField from '@/shared/components/form/FormikField'
import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';

const initialValues = {
    code: '', // Required string field
    description: '', // Optional string field
};

const validationSchema = Yup.object({
    code: Yup.string()
        .required('Code is required') // Marking `code` as required
        .max(255, 'Code must not exceed 255 characters'),
    description: Yup.string()
        .max(1000, 'Description must not exceed 1000 characters'), // Optional field with max length
});


function KvaCodeForm() {
    const [editId, setEditId] = useState(null);

    // Queries
    const { data: kvaCodeSingleData = {} } = useGetSingleKvyCodeQuery(editId, { skip: !editId });
    const [editKvaCode] = useEditKvyCodesMutation();
    const [addKvaCode] = useAddKvyCodesMutation();
    const [deleteKvaCode] = useDeleteKvyCodeMutation();
    const { data: kvyCodeData } = useGetKvyCodesQuery();

    return (
        <>
            <Formik
enableReinitialize
                initialValues={{ ...initialValues, ...(editId ? kvaCodeSingleData : {}) }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    if (editId) {
                        await editKvaCode({ ...values, id: editId });
                        setEditId(null);
                    } else {
                        await addKvaCode(values);
                    }

                    resetForm(initialValues);
                }}
            >
                {() => (
                    <Form>
                        <Stack spacing={2} mb={2}>
                            <FormikField
                                name="code"
                                label='Code'
                                isStack
                            />

                            <FormikField
                                name='description'
                                label='Description'
                                isStack
                                type="textarea"
                            />
                        </Stack>
                        <ActionBtns submitText={editId ? 'Update' : 'Save'} initialValues={initialValues} />
                    </Form>
                )}
            </Formik>

            <Table component={Paper} sx={{ marginTop: '2rem' }}>
                <TableHead>
                    <TableCell>
                        Code
                    </TableCell>
                    <TableCell>
                        Description
                    </TableCell>
                    <TableCell width="100px">
                        Actions
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        kvyCodeData?.results?.length > 0 ? (
                            kvyCodeData?.results?.map(item => (
                                <TableRow>
                                    <TableCell>
                                        {item?.code}
                                    </TableCell>
                                    <TableCell>
                                        {item?.description}
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={2}>
                                            <IconButton onClick={() => setEditId(item?.id)}>
                                                <Edit />
                                            </IconButton>

                                            <IconButton onClick={async () => deleteKvaCode(item?.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>No Data Found</TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
        </>
    )
}

export default KvaCodeForm
