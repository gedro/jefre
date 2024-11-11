import React, { Fragment } from 'react';
import { Router } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';

import StyledApp from './StyledApp';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ab',
});

export default ({ appContext, onAppContextChanged, history }) => {

  return (
    <Fragment>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <StyledApp appContext={appContext} onAppContextChanged={onAppContextChanged} history={history} />
        </Router>
      </StylesProvider>
    </Fragment>
  );
};
