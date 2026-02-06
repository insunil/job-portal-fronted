import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '@seeker/store/actions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const navigate = useNavigate();            // ⭐ navigation hook
  const customization = useSelector((state) => state?.customization) || {};
  const dispatch = useDispatch();

  const Icon = item?.icon;
  const itemIcon = Icon ? (
    <Icon color="inherit" />
  ) : (
    <ArrowForwardIcon color="inherit" fontSize={level > 0 ? 'inherit' : 'default'} />
  );

  // ⭐ CLICK HANDLER WITH SWITCH NAVIGATION
  const handleClick = () => {
    // highlight menu in redux
    dispatch({ type: actionTypes.MENU_OPEN, isOpen: item?.id });

    // external link
    if (item?.external && item?.url) {
      window.open(item.url, '_blank');
      return;
    }

    // switch navigation
    switch (item?.id) {
      case 'dashboard':
        navigate('/dashboard/default');
        break;

      case 'all-job':
        console.log('navigating to all job');
        console.log(window.location.pathname);

          navigate('/seeker/all-job');
        break;
zqa
      case 'applied-job':
        navigate('/seeker/applied-job');
        break;

      case 'login-1':
        navigate('/application/login');
        break;

      case 'register':
        navigate('/application/register');
        break;

      default:
        // fallback if url exists
        if (item?.url) navigate(item.url);
    }
  };

  return (
    <ListItemButton
      disabled={item?.disabled}
      onClick={handleClick}        // ⭐ manual navigation here
      selected={customization?.isOpen === item?.id}
      sx={{
        ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
        borderRadius: '5px',
        mb: 0.5,
        pl: `${level * 16}px`
      }}
    >
      <ListItemIcon sx={{ minWidth: 28 }}>{itemIcon}</ListItemIcon>

      <ListItemText
        primary={
          <Typography
            variant={customization?.isOpen === item?.id ? 'subtitle1' : 'body1'}
            color="inherit"
          >
            {item?.title}
          </Typography>
        }
        secondary={
          item?.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
            >
              {item.caption}
            </Typography>
          )
        }
      />

      {item?.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
