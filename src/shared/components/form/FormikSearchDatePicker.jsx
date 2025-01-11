/* eslint-disable no-unused-vars */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useField } from 'formik';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import propTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import SearchTextField from '@/app/common/components/styled/SearchTextField';

function FormikSearchDatePicker({
  onChange,
  name,
  disabled,
  placeholder,
  disablePast,
  disableFuture,
  excludeDates,
}) {
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const [field, _, helpers] = useField(name || '');

  const { setValue, setTouched } = helpers;
  const { value } = field;

  const [innerValue, setInnerValue] = useState(null);

  useEffect(() => {
    if (value !== '' && value !== undefined && value !== null) {
      setInnerValue(moment(value, 'YYYY-MM-DD'));
    } else {
      setInnerValue(null);
    }
  }, [value]);

  const handleChange = useCallback(
    newMoment => {
      const formattedValue = newMoment?.format('YYYY-MM-DD') || '';

      if (newMoment !== null || newMoment !== undefined) {
        setValue(formattedValue);
        setInnerValue(newMoment);
      } else {
        setValue('');
        setInnerValue('');
      }

      if (onChange) onChange(formattedValue, name);
    },
    [value]
  );
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        name={name}
        value={innerValue}
        className="w-full"
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        onClose={() => {
          setTimeout(() => {
            // to avoid error before value being set.
            setTouched(true);
          }, 150);
        }}
        disablePast={disablePast}
        disableFuture={disableFuture}
        shouldDisableDate={date => {
          let newDate = '';

          excludeDates?.forEach(item => {
            if (date.format('YYYY-MM-DD') === item) {
              newDate = item;
            }
          });

          return !!newDate;
        }}
        desktopModeMediaQuery={isLargeScreen ? '@media (pointer: fine)' : '@media (pointer: coarse)'}
        renderInput={params => <SearchTextField sx={{ }} {...params} onBlur={() => setTouched(true)} />}
        slots={{
          textField: SearchTextField,
        }}
        slotProps={{
          onBlur: () => setTouched(true),
        }}
      />
    </LocalizationProvider>
  );
}

FormikSearchDatePicker.propTypes = {
  onChange: propTypes.func,
  name: propTypes.string.isRequired,
  disabled: propTypes.bool,
  placeholder: propTypes.string,
  disablePast: propTypes.bool,
  disableFuture: propTypes.bool,
  label: propTypes.string,
  isRequired: propTypes.bool,
  excludeDates: propTypes.arrayOf(propTypes.string),
  isStack: propTypes.bool,
};

FormikSearchDatePicker.defaultProps = {
  onChange: () => {},
  disabled: false,
  placeholder: '',
  disablePast: false,
  disableFuture: false,
  label: null,
  isRequired: false,
  excludeDates: [],
  isStack: false,
};

export default FormikSearchDatePicker;
