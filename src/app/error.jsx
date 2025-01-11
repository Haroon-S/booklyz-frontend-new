/* eslint-disable react/prop-types */

'use client';

import React, { useEffect } from 'react';
import GlobalLoader from './common/loaders/GlobalLoader';

function Error({ error }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, [5000]);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);
  return (
    <html lang="en">
      <body>
        <GlobalLoader />
      </body>
    </html>
  );
}

export default Error;
