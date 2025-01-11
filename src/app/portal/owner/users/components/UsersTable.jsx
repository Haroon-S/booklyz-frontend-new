/* eslint-disable no-unused-vars */

'use client';

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Checkbox,
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
import { useRouter } from 'next/navigation';
import { Edit } from '@mui/icons-material';
import ServiceTableHead from './UsersTableHead';
import withTable from '@/HOC/withTable';
import useGetUserRoles from '@/customHooks/useGetUserRoles';
import { useGetServiceQuery } from '@/services/private/services';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import { usersTableHeadCells } from '../utilities/data';
import { useGetUserQuery } from '@/services/private/users';
import ModalHeader from '@/app/common/components/ModalHeader';
import AddEditUsersModal from './form/AddEditUsersModal';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import { useGetCompanyStaffQuery } from '@/services/private/company';

function UsersTable({
  pagination,
  sorting,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  isSelected,
  onSelectAllRows,
}) {
  const [selected, setSelected] = useState(null);
  const { order, orderBy } = sorting;
  const { rowsPerPage, page } = pagination;
  const { data, isLoading, isFetching } = useGetCompanyStaffQuery({
    offset: page * rowsPerPage,
    page: page + 1,
    limit: rowsPerPage,
  });

  const loading = isLoading || isFetching;

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  return (
    <Paper sx={{ borderRadius: '10px' }} className=" p-3">
      <TableContainer>
        <Table>
          <ServiceTableHead
            headings={usersTableHeadCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            rowCount={data?.count || 0}
            numSelected={selected?.length}
            onSelectAllRows={e => onSelectAllRows(e, data)}
          />

          {loading && <TableLoaders />}

          {!loading && data?.length > 0 && (
            <TableBody>
              {data?.map(item => {
                const isItemSelected = isSelected(item?.id);

                return (
                  <TableRow
                    hover
                    selected={isItemSelected}
                    className=" cursor-pointer"
                    // onClick={() => router.push(`/portal/orders/detail/${item?.order_number}`)}
                    key={item?.id}
                  >
                    <TableCell>
                      <Box className="flex items-center gap-2">
                        <Avatar src={item?.image} className=" h-12 w-12" />
                        <Typography variant="body1">{item?.first_name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.last_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.staff_contacts[0]?.phone || '_'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.designation || '_'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.company_name || '_'}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          toggleAddModal();
                          setSelected(item);
                        }}
                        title="Edit"
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
          {!loading && data?.length === 0 && <EmptyRecordTable colSpan={7} />}
        </Table>

        <TablePagination
          component={Box}
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[10, 20, 30]}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      </TableContainer>
      <Modal open={isAddModalOpen} onClose={toggleAddModal}>
        <Box sx={{ ...formModalStyles, width: '900px', height: '100vh' }}>
          <ModalHeader title="Add User" onClose={toggleAddModal} />
          <AddEditUsersModal selectedUserData={selected} toggleAddModal={toggleAddModal} />
        </Box>
      </Modal>
    </Paper>
  );
}

UsersTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
};

export default withTable(UsersTable, { sortBy: 'id' });
