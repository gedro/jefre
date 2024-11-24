import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TermsOfService from './components/TermsOfService';

const useStyles = makeStyles((theme) => ({
  tos_terms: {
    width: '100%',
    minWidth: '976px',
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
  tos_h1: {
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
  tos_h2: {
  },
  tos_p: {
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

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Fragment>
      <TermsOfService classes={classes} />
    </Fragment>
  );
};
