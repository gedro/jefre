import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import PrivacyPolicy from './components/PrivacyPolicy';

const useStyles = makeStyles((theme) => ({
  pp_policy: {
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
  pp_h1: {
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
  pp_h2: {
  },
  pp_h3: {

  },
  pp_p: {
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
      <PrivacyPolicy classes={classes} />
    </Fragment>
  );
};
