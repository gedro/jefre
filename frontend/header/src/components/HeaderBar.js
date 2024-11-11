import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import logo from '../../public/jefree-logo-transparent.png';

export default function HeaderBar({ appContext, onAppContextChanged, classes }) {
  console.log('appContext', appContext);

  const onClick = () => {
    if (appContext && appContext.isSignedIn && appContext.onSignOut) {
      appContext.onSignOut();
    }
  };

  const [isSignedIn, setIsSignedIn] = useState(appContext?.isSignedIn);

  useEffect(() => {
    setIsSignedIn(appContext.isSignedIn);
    console.log('appContext ------------ ', appContext);
  }, [appContext.isSignedIn]);

  return (
    <React.Fragment>
      <header>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.he_appBar}
        >
          <Toolbar className={classes.he_toolbar}>
            <Link to='/'>
              <img src={logo} alt="logo" width={260} height={262} className={classes.he_logo} />
            </Link>
            <div className={classes.he_menu}>
              <Link to='/contact' className={classes.he_link}>
                Contact
              </Link>
              <Link to='/about' className={classes.he_link}>
                About
              </Link>
              <Button
                color={isSignedIn ? 'secondary' : 'primary'}
                variant="contained"
                className={classes.he_link}
                component={Link}
                to={isSignedIn ? '/login?logout=true' : '/auth/signin'}
                onClick={onClick}
              >
                {isSignedIn ? 'Logout' : 'Login'}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </header>
    </React.Fragment>
  );
};