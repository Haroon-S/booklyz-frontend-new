/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import {
  People,
  FormatListBulleted,
  Handyman,
  ManageAccounts,
  Groups,
  Engineering,
  Chat,
  Category,
  Diversity3,
  Article,
  Business,
  SearchOutlined,
  CalendarTodayOutlined,
  CalendarMonth,
  BusinessOutlined,
  MenuBook,
  SupervisedUserCircleOutlined,
  CorporateFareOutlined,
} from '@mui/icons-material';

import { v4 } from 'uuid';
import { CLIENT, ADMIN, SUPPLIER } from '@/utilities/constants';

export const sidebarCommonItemsData = [
  {
    id: v4(),
    path: '/portal/owner/calender',
    title: 'Calender',
    icon: <CalendarMonth />,
    order: 1,
    permissions: [CLIENT, SUPPLIER],
  },
  {
    id: v4(),
    path: '/portal/owner/bookings',
    title: 'Bookings',
    icon: <MenuBook />,
    order: 2,
    permissions: [CLIENT, SUPPLIER],
  },
  {
    id: v4(),
    path: '/portal/owner/company',
    title: 'Company',
    icon: <Business />,
    order: 2,
    permissions: [CLIENT, SUPPLIER],
  },
  {
    id: v4(),
    path: '/portal/owner/services',
    title: 'Services',
    icon: <Handyman />,
    order: 3,
    permissions: [CLIENT, SUPPLIER],
  },
  {
    id: v4(),
    path: '/portal/owner/users',
    title: 'Users',
    icon: <People />,
    order: 4,
    permissions: [CLIENT, SUPPLIER],
  },
  {
    id: v4(),
    path: '/portal/owner/customers',
    title: 'Customers',
    icon: <SupervisedUserCircleOutlined />,
    order: 5,
    permissions: [CLIENT, SUPPLIER],
  },
  {
    id: v4(),
    path: '/portal/owner/journals/overview',
    title: 'Journals',
    icon: <Article />,
    order: 6,
    permissions: [CLIENT, SUPPLIER],
  },
  // {
  //   id: v4(),
  //   path: '/portal/users',
  //   title: 'Users',
  //   icon: <People />,
  //   order: 2,
  //   permissions: [CLIENT],
  // },
  // {
  //   id: v4(),
  //   path: '/portal/orders',
  //   title: 'Orders',
  //   icon: <FormatListBulleted />,
  //   order: 3,
  //   permissions: [SUPPLIER, CLIENT],
  // },
  // {
  //   id: v4(),
  //   path: '/portal/chat',
  //   title: 'Chats',
  //   icon: <Chat />,
  //   order: 4,
  //   permissions: [SUPPLIER, CLIENT],
  // },
];

export const sidebarAdminItemsData = [
  {
    id: v4(),
    path: '/portal/admin/super-users',
    title: 'Super Users',
    icon: <ManageAccounts />,
    order: 1,
    permissions: [ADMIN],
  },
  {
    id: v4(),
    path: '/portal/admin/clients',
    title: 'Clients',
    icon: <Groups />,
    order: 2,
    permissions: [ADMIN],
  },
  {
    id: v4(),
    path: '/portal/admin/suppliers',
    title: 'Suppliers',
    icon: <Engineering />,
    order: 3,
    permissions: [ADMIN],
  },
  {
    id: v4(),
    path: '/portal/admin/categories',
    title: 'Categories',
    icon: <Category />,
    order: 4,
    permissions: [ADMIN],
  },
  {
    id: v4(),
    path: '/portal/admin/orders',
    title: 'Orders',
    icon: <FormatListBulleted />,
    order: 5,
    permissions: [ADMIN],
  },
  {
    id: v4(),
    path: '/portal/admin/services',
    title: 'Services',
    icon: <Handyman />,
    order: 6,
    permissions: [ADMIN],
  },
  {
    id: v4(),
    path: '/portal/admin/dispute',
    title: 'Dispute',
    icon: <Diversity3 />,
    order: 7,
    permissions: [ADMIN],
  },
  {
    id: v4(),
    path: '/portal/chat',
    title: 'Chats',
    icon: <Chat />,
    order: 8,
    permissions: [ADMIN],
  },
];

export const topbarItems = [
  {
    id: v4(),
    path: '/search',
    title: 'Search',
    icon: <SearchOutlined />,
    isPublic: true,
  },
  {
    id: v4(),
    path: '/appointments',
    title: 'Appointments',
    icon: <CalendarTodayOutlined />,
    isPublic: false,
  },
  {
    id: v4(),
    path: '/about',
    title: 'About Booklyz',
    icon: <CorporateFareOutlined />,
    isPublic: true,
  },
  {
    id: v4(),
    path: '/payments/payment-plans',
    title: 'List your business',
    icon: <BusinessOutlined />,
    isPublic: true,
    external: true,
    onlyPublic: true
  },
];

export const companyListItems = [
  {
    id: v4(),
    path: '/portal/pages/hr/company/profiles',
    title: 'Services',
  },
  {
    id: v4(),
    path: '/portal/pages/hr/company/files',
    title: 'Company Files',
  },
];
