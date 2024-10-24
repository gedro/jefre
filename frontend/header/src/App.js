import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import HeaderBar from './components/HeaderBar';

const generateClassName = createGenerateClassName({
  productionPrefix: 'he',
});

export default ({ appContext, onAppContextChanged, history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <HeaderBar />
        </Router>
      </StylesProvider>
    </div>
  );
};
