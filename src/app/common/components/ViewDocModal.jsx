'use client';

import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { ViewDocContext } from '@/context/ViewDocContext';
import { Box } from '@mui/material';
import ModalHeader from './ModalHeader';
import { isFileViewSupported, isImageFile, isPdfDocFile, isWordExcelFile } from '@/utilities/helpers';
import PdfDocRenderer from './renderers/PdfDocRenderer';
import MsDocsRenderer from './renderers/MsDocsRenderer';
import ImageRenderer from './renderers/ImageRenderer';

function ViewDocModal({ selected = null, toggle }) {
  const fileType = selected?.type;
  const viewDocContextValue = useMemo(
    () => ({
      selected,
      toggle,
      fileType,
      fileURI: selected?.file,
    }),
    [selected, toggle]
  );
  return (
    <ViewDocContext.Provider value={viewDocContextValue}>
      <Box>
        <ModalHeader title="View File" onClose={toggle} />

        {isImageFile(fileType) && <ImageRenderer />}

        {isPdfDocFile(fileType) && <PdfDocRenderer />}

        {isWordExcelFile(fileType) && <MsDocsRenderer />}

        {!isFileViewSupported(fileType) && (
          <Box className="text-center" mb={5} mt={6}>
            Sorry No Previews Available!
          </Box>
        )}
      </Box>
    </ViewDocContext.Provider>
  );
}

ViewDocModal.propTypes = {
  selected: propTypes.shape({
    file: propTypes.string,
    type: propTypes.string,
  }),
  toggle: propTypes.func.isRequired,
};

export default ViewDocModal;
