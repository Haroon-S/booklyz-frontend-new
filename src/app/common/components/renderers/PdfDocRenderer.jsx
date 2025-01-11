import { ViewDocContext } from '@/context/ViewDocContext';
import { Box } from '@mui/material'
import React, { useContext } from 'react'

function PdfDocRenderer() {
    const { fileURI } = useContext(ViewDocContext);
  return (
    <Box className="px-0">
      <object data={fileURI} title="File Preview" className="h-100 w-100" style={{ minHeight: '450px', minWidth: '400px' }}>
        <iframe src={fileURI} title="File Preview" className="h-100 w-100" />
      </object>
    </Box>
  )
}

export default PdfDocRenderer