import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import logo from '../../public/jefree-logo-transparent.png';

export default function HeaderBar({ appContext, onAppContextChanged, classes }) {

  const onClick = () => {
    if (appContext?.isSignedIn) {
      onAppContextChanged({ toLogout: true });
    }
  };

  return (
    <React.Fragment>
      <header className={classes.he_header} >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.he_appBar}
        >
          <Toolbar className={classes.he_toolbar}>
            <Link to='/'>
              <img src={logo} alt="logo" width={190} height={191} className={classes.he_logo} />
            </Link>
            {appContext?.user?.name &&
              <div className={classes.welcomeDiv}>Welcome<br /><strong>{appContext.user.name}</strong></div>
            }
            <div className={classes.he_menu}>
              {appContext?.isSignedIn && appContext?.isRecruiter &&
                <Link to='/recruiter' className={classes.he_link}>
                  Recruiter
                </Link>
              }
              {appContext?.isSignedIn && appContext?.isCandidate &&
                <Link to='/candidate' className={classes.he_link}>
                  Candidate
                </Link>
              }
              <Link to='/contact' className={classes.he_link}>
                Contact
              </Link>
              <Link to='/about' className={classes.he_link}>
                About
              </Link>
              {appContext?.isSignedIn &&
                <Link to='/profile' className={classes.he_link}>
                  <u>Profile</u>
                </Link>
              }
              {appContext?.isSignedIn && appContext?.isAdmin &&
                <Link to='/admin' className={classes.he_link}>
                  <strong>ADMIN</strong>
                </Link>
              }
              <Button
                color={appContext.isSignedIn ? 'secondary' : 'primary'}
                variant="contained"
                className={classes.he_link}
                component={Link}
                to='/auth/signin'
                onClick={onClick}
              >
                {appContext.isSignedIn ? 'Logout' : 'Login'}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </header>
    </React.Fragment>
  );
};