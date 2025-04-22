/* eslint-disable no-unused-vars */
import { Dashboard } from '@mui/icons-material';
import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import { sidebarCommonItemsData, sidebarAdminItemsData } from '../../utilities/data';
import useGetUserRoles from '@/customHooks/useGetUserRoles';
import { ADMIN, CLIENT, SUPPLIER } from '@/utilities/constants';

function useGetSidebarItems() {
  // COMPONENTS STATE WITH HANDLER FUNCTIONS
  const { userType } = useGetUserRoles();

  const sidebarItems = useMemo(
    () => [
      {
        id: v4(),
        path: `/portal/${userType}/dashboard`,
        title: 'Dashboard',
        icon: <Dashboard />,
        order: 0,
        permissions: [SUPPLIER, CLIENT, ADMIN],
      },
      ...sidebarCommonItemsData,
      ...sidebarAdminItemsData,
    ],
    [userType]
  );



  return [sidebarItems];
}

export default useGetSidebarItems;
