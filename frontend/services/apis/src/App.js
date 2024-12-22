import React, { useEffect } from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import axios from 'axios'

import api from './services/api';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ap',
});

export default ({ appContext, onAppContextChanged, history }) => {

  useEffect(() => {
    if(appContext.apiUrl && appContext.csrfToken) {
      onAppContextChanged({ api: api(appContext, onAppContextChanged) });
    }
  }, [appContext.apiUrl, appContext.csrfToken, appContext.token]);

  useEffect(() => {
    if (appContext.apiUrl && !appContext?.csrfToken) {
      axios.get(
        `${appContext.apiUrl}/api/auth/csrf-token`,
        {withCredentials: true}
      ).then((response) => {
        onAppContextChanged({csrfToken: response.data.token});
      }).catch((error) => {
        console.error("Failed to fetch CSRF token", error);
      });
    }
  }, [appContext.csrfToken]);

  return (
    <StylesProvider generateClassName={generateClassName}>
    <div />
    </StylesProvider>
  );
};
