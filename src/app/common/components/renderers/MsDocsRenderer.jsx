import { ViewDocContext } from '@/context/ViewDocContext';
import { Box } from '@mui/material'
import React, { useContext } from 'react'

function MsDocsRenderer() {
    const { fileURI } = useContext(ViewDocContext);
  return (
    <Box className="px-0 h-100 w-100">
      <iframe
        title="File Preview"
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileURI)}`}
        className="h-100 w-100"
        style={{ minHeight: '450px', minWidth: '400px' }}
      />
    </Box>
  )
}

export default MsDocsRenderer