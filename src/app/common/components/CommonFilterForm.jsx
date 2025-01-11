'use client';

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Button, CircularProgress, Collapse, Grid, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp, PlaceOutlined, Search } from '@mui/icons-material';
import SubmitBtn from './SubmitBtn';
// import { ratingOptions } from '../utilities/data';
import { searchFilterFormInitialValue } from '../utilities/formUtils';
import FormikSearchInput from '@/shared/components/form/FormikSearchInput';
import FormikSearchDatePicker from '@/shared/components/form/FormikSearchDatePicker';
// import { transformFilterOptions } from '@/utilities/transformers';
// import { useGetCitiesQuery } from '@/services/private/profile';
// import { useGetCategoriesQuery, useLazyGetSubCategoriesQuery } from '@/services/private/categories';

function CommonFilterForm({
  searchParams = {},
  onFormSubmit = () => {},
  isLoading = false,
  isAdmin = false,
  isAllServices = false,
  placeholderText = 'Search ...',
}) {
  const isSmallScreen = useMediaQuery('(max-width:788px)');
  const [initValues, setInitValues] = useState(searchFilterFormInitialValue);
  const [showFilter, setSetShowFilter] = useState(false);

  const path = usePathname();
  const isSearch = path === '/search';

  const params = useSearchParams();
  const paramsObject = Object.fromEntries(params.entries());

  const router = useRouter();
  // const { data: cities = [] } = useGetCitiesQuery({ country: 8 });
  // const { data: categoriesData } = useGetCategoriesQuery();
  // const [getSubcategoriesData, { data: subcategoriesData = [] }] = useLazyGetSubCategoriesQuery();
  // const citiesOptions = transformFilterOptions(cities?.results, 'name', 'id');

  useEffect(() => {
    if (paramsObject?.search || paramsObject?.city) {
      setInitValues({
        search: paramsObject?.search || '',
        company__address: paramsObject?.company__address || '',
        start_date: paramsObject?.start_date || '',
        end_date: paramsObject?.end_date || '',
        city: paramsObject?.city || '',
      });
    }
  }, [paramsObject?.search, paramsObject?.city]);

  //   TRANSFORMERS
  // const categoriesOptions = useMemo(() => {
  //   if (categoriesData) {
  //     return categoriesData?.results?.map(item => ({
  //       label: item.name,
  //       value: item.id,
  //     }));
  //   }

  //   return [];
  // }, [categoriesData]);

  // const subCategoriesOptions = useMemo(() => {
  //   if (subcategoriesData) {
  //     return subcategoriesData?.results?.map(item => ({
  //       label: item.name,
  //       value: item.id,
  //     }));
  //   }

  //   return [];
  // }, [subcategoriesData]);

  const isFilterApplied = (values = {}) => {
    let applied = false;

    Object.values(values).forEach(value => {
      if (value) {
        applied = true;
      }
    });

    return applied;
  };

  // const handleChange = async newValue => {
  //   if (newValue) {
  //     await getSubcategoriesData({ category: newValue });
  //   }
  // };

  // const handleSearch = (newValue, resetForm) => {
  //   if (isAdmin) {
  //     if (!newValue) {
  //       onFormSubmit(searchFilterFormInitialValue);
  //       resetForm({ values: searchFilterFormInitialValue });
  //     }
  //   }
  // };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={async values => {
        if (values?.search || values?.company__address || values?.start_date || values?.end_date) {
          const queryParams = {};

          Object.entries(values).forEach(([key, value]) => {
            if (value) {
              queryParams[key] = value;
            }
          });

          const searchQuery = new URLSearchParams(queryParams).toString();
          router.push(`/search?${searchQuery}`);
        }
      }}
      enableReinitialize
    >
      {() => (
        <Form className=" w-full">
          {(!isSearch || !isSmallScreen) && (
            <Grid
              className="w-full max-h-14 overflow-hidden"
              justifyContent={isSearch ? 'start' : 'center'}
              alignItems="center"
              container
            >
              {/* SEARCH  */}
              <Grid item xs={9} md={isSearch ? 3 : 9}>
                <FormikSearchInput
                  className="rounded-s-full h-14"
                  icon={<Search sx={{ fontSize: { xs: '20px', md: '24px' } }} />}
                  name="search"
                  placeholder={placeholderText}
                />
              </Grid>

              {/* CITY */}
              {isSearch && (
                <Grid item xs={9} md={3}>
                  <FormikSearchInput
                    icon={<PlaceOutlined sx={{ fontSize: { xs: '20px', md: '24px' } }} />}
                    className="h-14"
                    name="company__address"
                    placeholder="Address..."
                  />
                </Grid>
              )}

              {isSearch && (
                <Grid item xs={9} md={2}>
                  <FormikSearchDatePicker
                    // className="h-14"
                    name="start_date"
                    disablePast
                  />
                </Grid>
              )}

              {isSearch && (
                <Grid item xs={9} md={2}>
                  <FormikSearchDatePicker
                    // className=" h-14"
                    name="end_date"
                    disablePast
                  />
                </Grid>
              )}

              <Grid item xs={3} md={1.25}>
                <Button
                  className=" shadow-none h-12 md:h-14 w-full rounded-s-none rounded-e-full"
                  size="small"
                  startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
                  disabled={isLoading}
                  variant="contained"
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          )}
          <Collapse in={showFilter} orientation="vertical">
            {isSmallScreen && isSearch && showFilter && (
              <Grid
                className="w-full px-5"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
                container
              >
                {/* SEARCH  */}
                <Grid item xs={12}>
                  <FormikSearchInput
                    className="rounded-s-full rounded-r-full !h-[38px] !text-xs placeholder:!text-xs"
                    icon={<Search sx={{ fontSize: { xs: '20px', md: '24px' } }} />}
                    name="search"
                    placeholder={placeholderText}
                  />
                </Grid>

                {/* CITY */}
                <Grid item xs={12}>
                  <FormikSearchInput
                    icon={<PlaceOutlined sx={{ fontSize: { xs: '20px', md: '24px' } }} />}
                    className="rounded-s-full rounded-r-full !h-[38px] !text-xs placeholder:!text-xs"
                    name="company__address"
                    placeholder="Address..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormikSearchDatePicker
                    className="rounded-s-full rounded-r-full"
                    name="start_date"
                    disablePast
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormikSearchDatePicker
                    className=" rounded-s-full rounded-r-full"
                    name="end_date"
                    disablePast
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    className=" shadow-none w-full rounded-s-full rounded-r-full"
                    size="small"
                    startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
                    disabled={isLoading}
                    variant="contained"
                    type="submit"
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            )}
          </Collapse>
          {isSmallScreen && isSearch && (
            <Button
              className=" w-full mt-4 text-xs"
              size="small"
              variant="text"
              onClick={() => setSetShowFilter(prev => !prev)}
            >
              {showFilter ? 'Show Less' : 'Show More Search'}{' '}
              {showFilter ? <KeyboardDoubleArrowUp style={{ fontSize: '16px' }} /> : <KeyboardDoubleArrowDown style={{ fontSize: '16px' }} />}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

CommonFilterForm.propTypes = {
  searchParams: PropTypes.object,
  onFormSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isAllServices: PropTypes.bool,
  placeholderText: PropTypes.string,
};

export default CommonFilterForm;
