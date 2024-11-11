import React from 'react';
import { Router } from 'react-router-dom';
import {StylesProvider, createGenerateClassName, makeStyles} from '@material-ui/core/styles';

import AboutUs from './components/AboutUs';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ab',
});

const useStyles = makeStyles((theme) => ({
  ab_aboutus: {
    width: '100%',
    minWidth: '768px',
    padding: '2rem',
    minHeight: '100vh',
    display: 'block',
    unicodeBidi: 'isolate',
    twBgOpacity: 1,
    backgroundColor: 'rgb(255 255 255)',
    borderRadius: '0.5rem',
    maxWidth: '65rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  ab_h1: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    marginBottom: '1rem',
    display: 'block',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
    unicodeBidi: 'isolate',
  },
  ab_h2: {

  },
  ab_socialButtons: {
    display: 'flex',
    marginTop: '2.5rem',
    unicodeBidi: 'isolate',
  },
  ab_socialButton: {
    twTextOpacity: 1,
    color: 'white',
    padding: '0.5rem',
    backgroundColor: 'rgba(172, 30, 35, 1)',
    borderRadius: '9999px',
    cursor: 'pointer',
    display: 'block',
    verticalAlign: 'middle',
    marginLeft: '1rem',
  },
  ab_p: {
    marginBottom: '1rem',
    margin: '0px',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  }
}));

export default ({ appContext, onAppContextChanged, history }) => {
  const classes = useStyles();

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <AboutUs classes={classes} />
        </Router>
      </StylesProvider>
    </div>
  );
};
