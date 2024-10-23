import React, { useEffect } from 'react';
import api from './services/api';

export default ({ appContext, onAppContextChanged, history }) => {

  useEffect(() => {
    if(appContext.apiUrl != null && appContext.onApiSet) {
      appContext?.onApiSet(api(appContext.apiUrl));
    }
  }, [appContext.apiUrl]);

  return (
    <div />
  );
};
