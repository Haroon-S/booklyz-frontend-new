import { createContext } from 'react';

export const ViewDocContext = createContext({
  selected: null,
  toggle: () => {},
  fileType: '',
  fileURI: '',
});

export const test = '';
