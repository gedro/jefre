import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import PrivacyPolicy from './components/PrivacyPolicy';

const generateClassName = createGenerateClassName({
  productionPrefix: 'pp',
});

export default ({ appContext, onAppContextChanged, history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <PrivacyPolicy />
        </Router>
      </StylesProvider>
    </div>
  );
};
