import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import AboutUs from './components/AboutUs';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ab',
});

export default ({ appContext, onAppContextChanged, history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <AboutUs />
        </Router>
      </StylesProvider>
    </div>
  );
};
