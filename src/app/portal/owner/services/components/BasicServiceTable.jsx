/* eslint-disable no-unused-vars */

'use client';

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
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
import { ArrowForwardIos, Edit } from '@mui/icons-material';
import withTable from '@/HOC/withTable';
import useGetUserRoles from '@/customHooks/useGetUserRoles';
import { useGetServiceQuery } from '@/services/private/services';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import { basicServiceTableHeadCells, serviceTableHeadCells } from '../utilities/data';
import BasicServiceTableHead from './BasicServiceTableHead';
import ModalHeader from '@/app/common/components/ModalHeader';
import AddEditBasicServicesForm from './AddEditBasicServicesForm';
import { formModalStyles } from '@/styles/mui/common/modal-styles';

function BasicServiceTable({
  pagination,
  sorting,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  isSelected,
  onSelectAllRows,
}) {
  const router = useRouter();
  const { order, orderBy } = sorting;
  const { rowsPerPage, page } = pagination;
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const { data, isLoading, isFetching } = useGetServiceQuery({
    service_type: 'basic',
    offset: page * rowsPerPage,
    page: page + 1,
    limit: rowsPerPage,
  });

  const loading = isLoading || isFetching;

  return (
    <Paper sx={{ borderRadius: '10px' }} className=" p-3">
      <TableContainer>
        <Table>
          <BasicServiceTableHead
            headings={basicServiceTableHeadCells}
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
                  <TableRow hover selected={isItemSelected} className=" cursor-pointer" key={item?.id}>
                    <TableCell>
                      <Typography variant="body1">{item?.service_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.service_sku}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.service_timing} min</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.service_description}</Typography>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => {
                          toggleModal();
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
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={{ ...formModalStyles, width: '900px', height: '100vh' }}>
          <ModalHeader title="New basic service" onClose={toggleModal} />
          <AddEditBasicServicesForm serviceData={selected} toggleAddModal={toggleModal} />
        </Box>
      </Modal>
    </Paper>
  );
}

BasicServiceTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
};

export default withTable(BasicServiceTable, { sortBy: 'id' });
