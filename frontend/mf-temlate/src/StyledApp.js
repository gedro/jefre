import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  xx_yyy: {
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Switch>
      <!-- FIXME: replace examples -->
      <!-- !!! EXAMPLES !!! -->
      <Route exact path="/pricing" component={Pricing} />
      <Route path="/auth/signup">
        <SignUp classes={classes} appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
      </Route>
      <!-- !!! EXAMPLES !!! -->
    </Switch>
  );
};
