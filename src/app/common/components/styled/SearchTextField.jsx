import { styled, TextField as MuiTextField } from '@mui/material';

const SearchTextField = styled(MuiTextField)({
  width: '100%',
  transition: 'all 0.3s',

  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    '& input': {
      color: '#232329',
      background: 'white',
      transition: 'all 0.3s',
    },
    outline: 'none',
    borderRadius: '0px',
    '@media (max-width: 768px)': {
      height: '38px',
      fontSize: '12px',
      borderTopRightRadius: '9999px',
      borderTopLeftRadius: '9999px',
      borderBottomRightRadius: '9999px',
      borderBottomLeftRadius: '9999px',
    },
    '& .Mui-focused': {
      borderColor: '#CCCCCC',
      borderWidth: '0px',
    }
  },
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#CCCCCC',
      borderWidth: '1px',
    },
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#CCCCCC',
  },

  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#CCCCCC',
      borderWidth: '1px',
    },
  },

  '& .MuiInputAdornment-root': {
    '& button': {
      borderRadius: '0',
    },

    '& svg': {
      width: '20px',
      height: '20px',
    },
  },
});

export default SearchTextField;
