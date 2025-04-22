import { useGetCompanyStaffQuery } from '@/services/private/company';
import PropTypes from 'prop-types';
import { useGetServiceQuery } from '@/services/private/services';
import FormikSelect from '@/shared/components/form/FormikSelect';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';

function CalenderFilterForm({ filterHandler = () => {} }) {
  // const { data } = useGetServiceQuery();
  const { data: userData } = useGetCompanyStaffQuery();

  // const basicServiceOptions = useMemo(() => {
  //   if (data) {
  //     return data?.map(item => ({
  //       label: item.service_name,
  //       value: item.id,
  //     }));
  //   }

  //   return [];
  // }, [data]);

  const userOptions = useMemo(() => {
    if (userData) {
      return userData?.map(item => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item.id,
      }));
    }

    return [];
  }, [userData]);

  return (
    <Box>
      <Formik enableReinitialize initialValues={{ profile: '' }} onSubmit={() => {}}>
        {({ isSubmitting }) => (
          <Form>
            <Grid2 spacing={2} container>
              <Grid2 xs={3}>
                <FormikSelect
                  name="profile"
                  options={userOptions}
                  onChange={newValue => filterHandler(newValue)}
                  placeholder="Select User"
                  isRequired
                  isStack
                  isPortal
                />
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

CalenderFilterForm.propTypes = {
  filterHandler: PropTypes.number,
};

export default CalenderFilterForm;
