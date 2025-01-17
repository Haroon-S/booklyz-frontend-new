import { Box, Typography } from '@mui/material';
import { useField } from 'formik';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react';

function FormikRichTextEditor({
  name,
  onChange,
  onBlur,
  disabled = false,
  placeholder = 'Start typing here...',
  config = {
    toolbarSticky: false,
    height: 400,
    buttons: [
      'bold',
      'italic',
      'underline',
      '|',
      'paragraph',
      'ul',
      'ol',
      '|',
      'table',
      'align',
      '|',
      '---',
      'undo',
      'redo',
    ],
    toolbarAdaptive: false,
  },
}) {
  const [{ value: fieldValue }, { touched, error }, { setValue }] = useField(name || '');
  

  const handleChange = data => {
    if (onChange) onChange(data);
  };

  const handleBlur = data => {
    setValue(data);
    if (onBlur) onBlur(name, data);
  };

  return (
    <Box className='min-h-[430px]'>
      <JoditEditor
        value={fieldValue || ''}
        config={{ ...config, buttons: config.buttons, readonly: disabled, placeholder }}
        onBlur={handleBlur}
        onChange={disabled ? undefined : handleChange}
      />
      {error && touched && (
        <Typography variant="caption" className="text-danger">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default FormikRichTextEditor;
