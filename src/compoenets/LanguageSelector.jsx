import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  MenuList,
} from '@mui/material';
import { LANGUAGE_VERSIONS } from '../utils/constant';
//import { LANGUAGE_VERSIONS } from '../constants';

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = 'blue.400';

const LanguageSelector = ({ language, onSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml={2} mb={4}>
      <Typography mb={2} variant="h6">
        Language:
      </Typography>
      <Button onClick={handleClick} variant="contained">
        {language}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
       
      >
        {languages.map(([lang, version]) => (
          <MenuItem
            key={lang}
            selected={lang === language}
            onClick={() => {
              onSelect(lang);
              handleClose();
            }}
            style={{
              color: lang === language ? ACTIVE_COLOR : '',
              backgroundColor: lang === language ? 'gray' : 'transparent',
            }}
            sx={{
              '&:hover': {
                color: ACTIVE_COLOR,
                backgroundColor: 'gray',
              },
            }}
          >
            {lang}
            &nbsp;
            <Typography component="span" color="textSecondary" variant="body2">
              ({version})
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
