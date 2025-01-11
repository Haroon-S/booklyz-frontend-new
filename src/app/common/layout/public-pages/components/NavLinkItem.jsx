/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { KeyboardArrowDown } from '@mui/icons-material';
import styles from '@/styles/containers/layout/navbar.module.scss';

function NavLinkItem({
  label,
  path = '/',
  navClassName = '',
  toggle = () => {},
  icon = null,
  external = false,
  menu,
}) {
  const currentPath = usePathname();
  const isActive = path === currentPath;

  const getNavLinkClassName = useCallback(() => {
    if (isActive) {
      return `${styles.activeNavLink}`;
    }
    return `${styles.navbarNavItem}`;
  }, [currentPath]);

  return (
    <Box
      onClick={menu && toggle}
      className={`${navClassName || getNavLinkClassName()} flex items-center gap-1 mx-2 cursor-pointer`}
    >
      <Typography variant="body3">
        {!menu ? (
          external ? (
            <a
              href={path}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className=" mr-1">{icon}</span>
              {label}
            </a>
          ) : (
            <Link href={path}>
              <span className=" mr-1">{icon}</span>
              {label}
            </Link>
          )
        ) : (
          label
        )}
      </Typography>
      {menu && <KeyboardArrowDown />}
    </Box>
  );
}

NavLinkItem.propTypes = {
  path: propTypes.string,
  label: propTypes.string.isRequired,
  icon: propTypes.element,
  navClassName: propTypes.string,
  menu: propTypes.bool,
  external: propTypes.bool,
  toggle: propTypes.func,
};

export default NavLinkItem;
