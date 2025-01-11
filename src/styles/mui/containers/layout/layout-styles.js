import { dark, primary } from '@/styles/common/colors';

const miniVariantWidth = '80px';
export const getListItemBtnStyles = (isActive = false) => ({
  mx: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  color: isActive ? dark : 'white',
  background: isActive ? '#ebebeb' : 'transparent',
  my: '10px',
  flexDirection: 'column',
  transition: '0.2s ease-in-out',
  // position: 'relative',
  borderRadius: '10px',

  '&:hover': {
    background: '#ebebeb',
    color: dark,
    '& svg': {
      color: primary,
      fill: primary,

      '& path': {
        fill: dark,
      },
    },
  },

  '& svg': {
    width: '22px',
    height: '22px',

    '& path': {
      fill: isActive ? dark : 'white',
    },
  },

  '@media screen and (max-width: 768px)': {
    minHeight: 50,
    px: 1,
    mx: '5px',

    '& .MuiTypography-root': {
      display: 'none',
      fontSize: '13px',
      transition: '0.2s ease-in-out',
    },
  },
});

export const listItemMenuArrowStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translateY(40%)',
  fontSize: '18px',
};

export const sidebarMenuStyles = {
  '& .MuiPaper-root': {
    borderRadius: '0',
    boxShadow: '3px 0px 10px lightgrey',
    width: '180px',
  },
};

export const getSidebarWrapperStyles = (isSidebarCollapsed, drawerWidth) => ({
  position: 'fixed',
  left: '0',
  top: '0',
  bottom: '0',
  background: '#001a33',
  overflowX: 'hidden',
  transition: '0.2s ease-in-out',
  whiteSpace: 'nowrap',
  boxShadow: '2px 0px 10px #b3b3b3',
  height: '100vh',
  // marginTop: '60px',
  // zIndex: 0,
  '::-webkit-scrollbar': { width: '3px' },
  '::-webkit-scrollbar-thumb': { background: primary },
  width: isSidebarCollapsed ? miniVariantWidth : drawerWidth,

  '@media screen and (max-width: 768px)': {
    width: isSidebarCollapsed ? miniVariantWidth : 0,
  },
});

export const getBoxWrapperStyles = (isSidebarCollapsed, drawerWidth) => ({
  background: 'linear-gradient(180deg,#f5eeec 0%,#fff min(53.65%,1000px),#fff 100%)',
  minHeight: 'calc(100vh - 60px)',
  padding: '65px 25px 35px 25px',
  marginTop: '60px',
  marginLeft: isSidebarCollapsed ? miniVariantWidth : drawerWidth,
  transition: '0.2s ease-in-out',

  '@media screen and (max-width: 768px)': {
    marginLeft: isSidebarCollapsed ? miniVariantWidth : 0,
  },
});

export const topbarMenuStyles = {
  '& .MuiPaper-root': {
    minWidth: '100px',
    marginTop: '10px',
    borderRadius: '0',
  },
};

export const subCategoryMenuMenuStyles = {
  '& .MuiBackdrop-root': {
    display: 'none',
    pointerEvents: 'none',
  },
};

export const notificationMenuStyles = {
  '& .MuiPaper-root': {
    minWidth: '400px',
    marginTop: '10px',
    borderRadius: '10px',
  },
};
