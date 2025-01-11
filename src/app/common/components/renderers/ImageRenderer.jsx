'use client';

import { ViewDocContext } from '@/context/ViewDocContext';
import React, { useContext } from 'react'
import { ZoomOut, ZoomIn, ZoomOutMap } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

function ImageRenderer() {
    const { fileURI } = useContext(ViewDocContext);
  return (
    <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          <Box className="btn-toolbar justify-content-center my-2">
            <IconButton title="Zoom In" onClick={() => zoomIn()} className="rounded-0 border p-2">
              <ZoomIn />
            </IconButton>

            <IconButton title="Zoom Out" onClick={() => zoomOut()} className="rounded-0 border p-2">
              <ZoomOut />
            </IconButton>

            <IconButton title="Reset" onClick={() => resetTransform()} className="rounded-0 border p-2">
              <ZoomOutMap />
            </IconButton>
          </Box>

          <TransformComponent>
            <img className="w-100" src={fileURI} alt="document" />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  )
}

export default ImageRenderer