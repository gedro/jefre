import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import FooterLine from './components/FooterLine';

const generateClassName = createGenerateClassName({
  productionPrefix: 'fo',
});

export default ({ appContext, onAppContextChanged, history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <FooterLine />
        </Router>
      </StylesProvider>
    </div>
  );
};
