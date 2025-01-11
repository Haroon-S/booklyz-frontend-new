'use client';

import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import withTable from '@/HOC/withTable';
import { useGetCustomersQuery } from '@/services/private/journals';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import CustomersTableHead from './CustomersTableHead';
import { avatarColors, customersTableHeadCells } from '../utilities/data';

function CustomersTable({
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
  const { data, isLoading, isFetching } = useGetCustomersQuery({
    offset: page * rowsPerPage,
    page: page + 1,
    limit: rowsPerPage,
  });
  const loading = isLoading || isFetching;
  return (
    <TableContainer>
      <Table className=" overflow-x-auto">
        <CustomersTableHead
          headings={customersTableHeadCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          rowCount={data?.count || 0}
          onSelectAllRows={e => onSelectAllRows(e, data?.results)}
        />

        {loading && <TableLoaders />}

        {!loading && data?.results?.length > 0 && (
          <TableBody>
            {data?.results?.map(item => {
              const isItemSelected = isSelected(item?.id);
              const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

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
                      <Avatar sx={{ bgcolor: randomColor }} src={item?.image} className=" h-12 w-12">
                        {`${item?.first_name[0]}${item?.last_name[0]}`}
                      </Avatar>
                      <Typography variant="body1">{item?.first_name || '_'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.last_name || '_'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.email || '_'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.phone || '_'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <IconButton
                        onClick={() => {
                          router.push(`/portal/owner/journals?journalId=${item?.id}`);
                        }}
                        title="Forward"
                        size="small"
                      >
                        <ArrowForwardIos />
                      </IconButton>
                    </Stack>
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
  );
}

CustomersTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
};

export default withTable(CustomersTable, { sortBy: 'id' });
