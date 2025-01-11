/* eslint-disable no-unused-vars */

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Modal,
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
import { journalTableHeadCells } from '../utilities/data';
import JournalsTableHead from './JournalsTableHead';
import { useGetJournalsQuery } from '@/services/private/journals';
import ModalHeader from '@/app/common/components/ModalHeader';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import JournalDetail from './JournalDetail';
import AddEditJournalForm from './form/AddEditJournalForm';

function JournalsTable({
  pagination,
  sorting,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  isSelected,
  onSelectAllRows,
  journalId,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [selected, setSelected] = useState({});
  const { order, orderBy } = sorting;
  const { rowsPerPage, page } = pagination;
  const { data, isLoading, isFetching } = useGetJournalsQuery({
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
      <TableContainer>
        <Table>
          <JournalsTableHead
            headings={journalTableHeadCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            rowCount={data?.count || 0}
            numSelected={selected?.length}
            onSelectAllRows={e => onSelectAllRows(e, data?.results)}
          />

          {loading && <TableLoaders />}

          {!loading && data?.results?.length > 0 && (
            <TableBody>
              {data?.results?.map(item => {
                const isItemSelected = isSelected(item?.id);

                return (
                  <TableRow
                    hover
                    selected={isItemSelected}
                    className=" cursor-pointer"
                    onClick={() => {
                      toggleModal();
                      setSelected(item);
                    }}
                    key={item?.id}
                  >
                    <TableCell>
                      <Typography variant="body1">{item?.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.price}kr</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {moment(item?.created_at).format('DD MMM, YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item?.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={e => {
                          e.stopPropagation();
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
          {!loading && data?.results?.length === 0 && <EmptyRecordTable colSpan={7} />}
        </Table>

        <TablePagination
          component={Box}
          count={data?.results?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[10, 20, 30]}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      </TableContainer>

      <Modal open={isAddModalOpen} onClose={toggleAddModal}>
        <Box sx={{ ...formModalStyles, width: '900px' }}>
          <ModalHeader title="Journal instance" onClose={toggleAddModal} />
          <AddEditJournalForm journalData={selected} toggleAddModal={toggleAddModal} />
        </Box>
      </Modal>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={formModalStyles}>
          <ModalHeader title="Journal Detail" onClose={toggleModal} />
          <JournalDetail journalData={selected} toggleModal={toggleModal} />
        </Box>
      </Modal>
    </>
  );
}

JournalsTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  journalId: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
};

export default withTable(JournalsTable, { sortBy: 'id' });
