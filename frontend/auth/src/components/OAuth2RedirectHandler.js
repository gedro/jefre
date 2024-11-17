import React, { useEffect } from 'react';
import toast from "react-hot-toast";

import { SuccessfulLoginHandler } from "../services/login-handler";

export default ({ appContext, onAppContextChanged, history }) => {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      SuccessfulLoginHandler(token, appContext, onAppContextChanged);
    } else {
      toast.error("Failed to login, please try again.");
      history.push('/auth/signin');
    }
  }, [location]);

  return <div>Redirecting...</div>;
};