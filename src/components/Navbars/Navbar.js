/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Hidden, Button as MDButton } from '@material-ui/core';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
// import AdminNavbarLinks from './AdminNavbarLinks.js';
// import RTLNavbarLinks from './RTLNavbarLinks.js';
import Button from '../../components/CustomButtons/Button';

import styles from '../../assets/styles/adminHeaderStyles';
import { logoutAsync } from '../../utils';

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const onLogout = () => {
    logoutAsync();
    window.location.href = '/';
  };

  const makeBrand = () => {
    let name;
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  };

  const { color } = props;

  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {/* {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />} */}
        </Hidden>
        <MDButton onClick={onLogout}>Logout</MDButton>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
