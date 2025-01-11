/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Poppins } from 'next/font/google';
import './globals.css';
import '../index.scss';
import 'react-big-calendar/lib/sass/styles.scss';

// WRAPPERS
import LayoutWrapper from './common/components/wrappers/LayoutWrapper';
import Providers from './common/components/wrappers/Providers';
import { cn } from '@/lib/utils';

// const poppins = Poppins({
//   style: ['normal', 'italic'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-poppins',
// });

export const metadata = {
  title: 'Booklyz',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
