import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',  //FIXME: replace with your prefix
});

export default ({ history, appConfig }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <!-- FIXME: replace examples -->
            <!-- !!! EXAMPLES !!! -->
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/auth/signup">
              <SignUp onSignIn={appConfig?.onSignIn} />
            </Route>
            <!-- !!! EXAMPLES !!! -->
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
