/* eslint-disable no-unused-vars */

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import moment from 'moment';
import { Edit } from '@mui/icons-material';
import withTable from '@/HOC/withTable';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import { useGetJournalsQuery } from '@/services/private/journals';
// import ModalHeader from '@/app/common/components/ModalHeader';
// import { formModalStyles } from '@/styles/mui/common/modal-styles';
// import AddEditJournalForm from './form/AddEditJournalForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetPatientsQuery } from '@/services/private/patients';
import LogHistoryHead from './components/LogHistoryHead';
import { patientsTableHeadCells } from './utilities/data';
import { useGetUserLogsHistoryQuery } from '@/services/private/users';

function PatientsTable({
    pagination,
    sorting,
    onPageChange,
    onRowsPerPageChange,
    onRequestSort,
    isSelected,
    onSelectAllRows,
    journalId,
}) {
 

    const router = useRouter();

    const [isModalOpen, setModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const [selected, setSelected] = useState({});
    const { order, orderBy } = sorting;
    const { rowsPerPage, page } = pagination;

    const { data: userLogHistory, isFetching, isLoading } = useGetUserLogsHistoryQuery({
        owner: journalId || undefined,
        offset: page * rowsPerPage,
        page: page + 1,
        limit: rowsPerPage,
    });


    const loading = isLoading || isFetching;

    const toggleAddModal = () => {
        setAddModalOpen(!isAddModalOpen);
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <>
            <TableContainer component={Paper} className='w-100'>
                <Table className='w-100'>
                    <LogHistoryHead
                        headings={patientsTableHeadCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={onRequestSort}
                        rowCount={userLogHistory?.count || 0}
                        numSelected={selected?.length}
                        onSelectAllRows={e => onSelectAllRows(e, userLogHistory?.results)}
                    />

                    {loading && <TableLoaders />}

                    {!loading && userLogHistory?.results?.length > 0 && (
                        <TableBody>
                            {userLogHistory?.results?.map(item => {
                                const isItemSelected = isSelected(item?.id);

                                return (
                                    <TableRow
                                        hover
                                        selected={isItemSelected}
                                        className="cursor-pointer"
                                        key={item?.id}
                                    >
                                        <TableCell>
                                            <Typography variant="body1">{moment(item?.created_at).format("DD MMM YYYY hh:mm A")}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.ip_address || "--"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.activity || "--"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.user || "--"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.person || "--"}</Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    )}
                    {!loading && userLogHistory?.results?.length === 0 && <EmptyRecordTable colSpan={7} />}
                </Table>

                <TablePagination
                    component={Box}
                    count={userLogHistory?.count || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[10, 20, 30]}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onPageChange={onPageChange}
                />
            </TableContainer>
        </>
    );
}

PatientsTable.propTypes = {
    pagination: PropTypes.object.isRequired,
    sorting: PropTypes.object.isRequired,
    journalId: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
    onSelectAllRows: PropTypes.func.isRequired,
};

export default withTable(PatientsTable, { sortBy: 'id' });
