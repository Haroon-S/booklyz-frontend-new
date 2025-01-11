/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Box, Grid, Rating, Typography } from '@mui/material';
import { useField } from 'formik';

function FormikRating({
  name,
  disabled = false,
  className = '',
  onChange = () => {},
  label = null,
  isRequired = false,
  isStack = false,
}) {
  const [innerValue, setInnerValue] = useState(0);
  const [field, meta] = useField(name || '');
  const { touched, error } = meta;

  const { onChange: onValueChange, value } = field;

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInnerValue(value);
    } else {
      setInnerValue(0);
    }
  }, [value]);

  const handleChange = useCallback(
    e => {
      const newValue = e.target.value;
      onValueChange(e);
      setInnerValue(newValue);
      if (onChange) onChange(newValue, name);
    },
    [value]
  );

  return (
    <Grid container rowSpacing={label ? 1 : 0} display="flex" alignItems="center" width={1}>
      {label && (
        <Grid item xs={12} md={isStack ? 12 : 3}>
          <Typography variant="label" className={`${isRequired ? 'required' : ''} ${isStack ? 'mb-0' : ''}`}>
            {label}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={label ? (isStack ? 12 : 9) : 12}>
        <Box className=" flex items-center gap-5">
          <Rating
            name={name}
            value={innerValue}
            className={className}
            onChange={handleChange}
            disabled={disabled}
          />
          <Typography className=" font-medium" variant="h6">
            {innerValue != null ? innerValue || 0 : 0}
          </Typography>
        </Box>

        {error && touched && (
          <Typography variant="error" className="text-danger">
            {error}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

FormikRating.propTypes = {
  name: propTypes.string.isRequired,
  disabled: propTypes.bool,
  className: propTypes.string,
  onChange: propTypes.func,
  label: propTypes.string,
  isRequired: propTypes.bool,
  isStack: propTypes.bool,
};

export default FormikRating;
