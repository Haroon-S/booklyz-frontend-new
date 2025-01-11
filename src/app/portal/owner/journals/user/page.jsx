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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UsersHead from './components/UsersHead';
import { userTableHeadCells } from './utilities/data';
import { useGetUserLogsHistoryQuery } from '@/services/private/users';
import { useAuthorizedQuery } from '@/services/private/auth';

function UserTable({
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

    const {data: meUserData} = useAuthorizedQuery();

    console.log('meUserData ==> ', meUserData)

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
                    <UsersHead
                        headings={userTableHeadCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={onRequestSort}
                        rowCount={1}
                        numSelected={selected?.length}
                        onSelectAllRows={e => onSelectAllRows(e, [meUserData])}
                    />

                    {loading && <TableLoaders />}

                    {!loading && [meUserData]?.length > 0 && (
                        <TableBody>
                            {[meUserData]?.map(item => {
                                const isItemSelected = isSelected(item?.profile?.id);

                                return (
                                    <TableRow
                                        hover
                                        selected={isItemSelected}
                                        className="cursor-pointer"
                                        key={item?.profile?.id}
                                    >
                                        <TableCell>
                                            <Typography variant="body1">{item?.profile?.id}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.profile?.first_name || "--"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.profile?.last_name || "--"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.profile?.email || "--"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.profile?.mobile || "--"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{item?.profile?.rights || "--"}</Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    )}
                    {!loading && [meUserData]?.length === 0 && <EmptyRecordTable colSpan={7} />}
                </Table>

                <TablePagination
                    component={Box}
                    count={1}
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

UserTable.propTypes = {
    pagination: PropTypes.object.isRequired,
    sorting: PropTypes.object.isRequired,
    journalId: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
    onSelectAllRows: PropTypes.func.isRequired,
};

export default withTable(UserTable, { sortBy: 'id' });
