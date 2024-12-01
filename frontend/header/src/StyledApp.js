import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HeaderBar from './components/HeaderBar';

const useStyles = makeStyles((theme) => ({
  he_header: {
    display: 'block',
    width: '100%',
  },
  he_appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  he_toolbar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },
  welcomeDiv: {
    color: 'rgb(255 255 255)',
    fontFamily: 'Montserrat',
    fontSize: '1.5rem',
    position: 'absolute',
    left: '42.5%',
    width: '12em',
    textAlign: 'center',
  },
  he_menu: {
    paddingLeft: '0px',
    paddingRight: '0px',
    backgroundColor: 'transparent',
    gap: '0.5rem',
    flexDirection: 'row',
    width: 'fit-content',
    height: 'auto',
    position: 'static',
    transitionDuration: '100ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'rgb(255 255 255)',
    fontFamily: 'Montserrat',
    overflow: 'hidden',
    display: 'flex',
    marginBlockStart: '0.6em',
    marginBlockEnd: '0.6em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    paddingInlineStart: '40px',
    unicodeBidi: 'isolate',
  },
  he_link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    marginRight: '1rem',
    cursor: 'pointer',
    unicodeBidi: 'isolate',
    fontFamily: 'Montserrat',
    fontSize: '1.2rem',
    textDecoration: 'none',
  },
  he_logo: {
    position: 'absolute',
    top: '100%',
    transform: 'translateY(-36%)',
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();

  return (
    <Fragment>
      <style> {`
          .he_mfe {
            display: block;
            width: 100%;
            z-index: 50;
            top: 8px;
            position: sticky;
          }
      `} </style>
      <HeaderBar
        appContext={appContext}
        onAppContextChanged={onAppContextChanged}
        classes={classes}
      />
    </Fragment>
  );
};
