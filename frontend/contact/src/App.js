import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import ContactForm from './components/ContactForm';

const generateClassName = createGenerateClassName({
  productionPrefix: 'con',
});

export default ({ appContext, onAppContextChanged, history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <ContactForm />
        </Router>
      </StylesProvider>
    </div>
  );
};
