/* eslint-disable no-unused-vars */

'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Delete, Edit } from '@mui/icons-material';
import CompanyTableHead from './CompanyTableHead';
import { companyTableHeadCells } from '../../utilities/data';
import withTable from '@/HOC/withTable';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import { useGetCompanyQuery } from '@/services/private/company';
import ModalHeader from '@/app/common/components/ModalHeader';
import AddEditCompanyForm from '../form/AddEditCompanyForm';
import { formModalStyles } from '@/styles/mui/common/modal-styles';

function CompanyTable({
  pagination,
  sorting,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  isSelected,
  onSelectAllRows,
}) {
  const router = useRouter();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };
  const { order, orderBy } = sorting;
  const { rowsPerPage, page } = pagination;
  const { data, isLoading, isFetching } = useGetCompanyQuery({
    offset: page * rowsPerPage,
    page: page + 1,
    limit: rowsPerPage,
  });

  const loading = isLoading || isFetching;
  return (
    <TableContainer>
      <Table className=" overflow-x-auto">
        <CompanyTableHead
          headings={companyTableHeadCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          rowCount={data?.count || 0}
          numSelected={selected?.length}
          onSelectAllRows={e => onSelectAllRows(e, data?.results)}
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
                    <Typography variant="body1">{item?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.address}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{`${item?.company_description?.slice(0, 20)}...`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" gap={1}>
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
                      {/* <IconButton
                        onClick={() => {}}
                        title="Delete"
                        size="small"
                      >
                        <Delete />
                      </IconButton> */}
                    </Stack>
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
      <Modal open={isAddModalOpen} onClose={toggleAddModal}>
        <Box sx={{ ...formModalStyles, width: '900px' }}>
          <ModalHeader title="Edit Company" onClose={toggleAddModal} />
          <AddEditCompanyForm companyData={selected} toggleAddModal={toggleAddModal} />
        </Box>
      </Modal>
    </TableContainer>
  );
}

CompanyTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
};

export default withTable(CompanyTable, { sortBy: 'id' });
