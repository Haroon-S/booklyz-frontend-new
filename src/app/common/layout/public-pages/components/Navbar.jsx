'use client';

/* eslint-disable no-unused-vars */

import { Avatar, Box, Button, IconButton, Stack } from '@mui/material';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { AccountCircleOutlined, Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Image from 'next/image';

// STYLES & ASSETS
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import styles from '@/styles/containers/layout/portal/topbar.module.scss';
import { statusOnline } from '@/styles/common/colors';
import logo from '@/assets/Booklyz.svg';

// CUSTOM HOOKS
import useGetMenuHandlers from '@/customHooks/useGetMenuHandlers';
import useGetUserRoles from '@/customHooks/useGetUserRoles';
import { AUTHENTICATED } from '@/utilities/constants';
import { topbarItems } from '../../utilities/data';
import NavLinkItem from './NavLinkItem';
import ProfileMenu from '../../common/ProfileMenu';
import Drawer from './Drawer';
import CommonFilterForm from '@/app/common/components/CommonFilterForm';
import GoogleTranslator from '@/app/common/components/GoogleTranslator';
import Error from '@/app/error';

function Navbar({ toggleSidebar = () => {}, isPortal = false }) {
  const pathname = usePathname();
  const isSearchPage = pathname.includes('/search');

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { userType } = useGetUserRoles();

  // STATE HOOKS
  const [showNavbar, setShowNavbar] = useState(false);
  const [type, setType] = useState('supplier');

  //   MENU HANDLERS
  const [topbarMenu, handleOpenMenu, handleCloseMenu] = useGetMenuHandlers();

  const [categoryMenu, handleOpenCategoryMenu, handleCloseCategoryMenu] = useGetMenuHandlers();

  const handleShowNavbar = () => setShowNavbar(!showNavbar);

  const modified = useMemo(() => {
    const filtered = topbarItems.filter(item => {
      if (isAuthenticated) {
        const isAllowed = !item?.onlyPublic;
        return isAllowed;
      }
      const isAllowed = item?.isPublic;
      return isAllowed;
    });
    return filtered;
  }, [userType, isAuthenticated]);

  return (
    <Box className={styles.navbarContainer}>
      <Box sx={{ height: isSearchPage ? 'fit-content' : '70px' }} className={styles.topbar}>
        <Box
          sx={{ paddingTop: isSearchPage ? '10px' : '0px' }}
          className="flex items-center justify-between h-full"
        >
          <Box className=" flex items-center gap-1 sm:gap-3">
            {isPortal && (
              <IconButton className=" flex md:hidden p-1" onClick={() => toggleSidebar()}>
                <Menu />
              </IconButton>
            )}

            <Stack direction="row" alignItems="center" gap={3}>
              <Box component={Link} href="/" className="overflow-hidden">
                <Image src={logo.src} alt="Logo" width={100} height={100} className="animate-slide-down" />
              </Box>
            </Stack>
          </Box>

          <Box className=" flex items-center gap-2">
            <Box className=" hidden xl:flex flex-grow items-center gap-3">
              {modified?.map(item => (
                <NavLinkItem
                  label={item.title}
                  icon={item.icon}
                  menu={item?.menu}
                  toggle={handleOpenCategoryMenu}
                  path={item.path}
                  external={item.external}
                  key={item.path}
                />
              ))}
            </Box>
            <ErrorBoundary errorComponent={<Error />}>
              <GoogleTranslator />
            </ErrorBoundary>
            {isAuthenticated ? (
              <Box className="flex items-center gap-3">
                <Box onClick={handleOpenMenu} className="flex items-center gap-2 cursor-pointer">
                  <span className=" relative">
                    <Avatar src={user?.profile?.image || ''} />
                    <span
                      className={styles.working_status_indicator}
                      style={{ backgroundColor: statusOnline }}
                    />
                  </span>
                </Box>
              </Box>
            ) : (
              <Box className=" hidden md:flex items-center gap-1">
                <NavLinkItem
                  label="Sign in"
                  icon={<AccountCircleOutlined />}
                  path="/auth/signin"
                  // navClassName={`no-underline hidden sm:block navbar-nav-item ${styles.navbarNavItem} `}
                />

                <Link href="/auth/signup" className=" no-underline hidden sm:block ">
                  <Button color="primary" variant="contained" className="normal-case px-2 py-1 ms-1">
                    Sign up
                  </Button>
                </Link>
              </Box>
            )}
            <Menu className="block xl:hidden cursor-pointer" onClick={handleShowNavbar} />
          </Box>
        </Box>

        {isSearchPage && (
          <Box className="flex items-center w-full md:w-2/3 mt-5 mb-0 md:mb-3">
            <CommonFilterForm />
          </Box>
        )}

        <ProfileMenu anchorEl={topbarMenu} handleClose={handleCloseMenu} />
        {/* <CategoryMenu anchor={categoryMenu} toggle={handleCloseCategoryMenu} /> */}
        <Drawer key={showNavbar} showNavbar={showNavbar} handleShowNavbar={handleShowNavbar} />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  toggleSidebar: propTypes.func,
  isPortal: propTypes.bool,
};

export default Navbar;
