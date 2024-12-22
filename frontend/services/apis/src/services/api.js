import axios from 'axios'

const api = (appContext, onAppContextChanged) => {

  const apiInstance = axios.create({
    baseURL: `${appContext.apiUrl}/api`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: false
  });

  // Add a request interceptor to include JWT and CSRF tokens
  apiInstance.interceptors.request.use(
    async (config) => {
      if (appContext.token) {
        config.headers.Authorization = `Bearer ${appContext.token}`;
      }

      if (appContext.csrfToken) {
        config.headers["X-XSRF-TOKEN"] = appContext.csrfToken;
      }
      return config;
    },
    (error) => {
      if (error.response?.status === 401) {
        onAppContextChanged({ toLogout: true });
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
}

export default api;