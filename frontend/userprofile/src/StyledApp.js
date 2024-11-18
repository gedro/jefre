import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import UserProfile from './components/UserProfile';

const useStyles = makeStyles((theme) => ({
  up_userprofile: {
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Fragment>
      <UserProfile classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
    </Fragment>
  );
};
