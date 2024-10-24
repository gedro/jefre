import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import TermsOfService from './components/TermsOfService';

const generateClassName = createGenerateClassName({
  productionPrefix: 'tos',
});

export default ({ appContext, onAppContextChanged, history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <TermsOfService />
        </Router>
      </StylesProvider>
    </div>
  );
};
