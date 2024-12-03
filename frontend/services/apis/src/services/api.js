import axios from 'axios'

const api = (appContext) => {

  const apiInstance = axios.create({
    baseURL: `${appContext.apiUrl}/api`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
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
      return Promise.reject(error);
    }
  );

  return apiInstance;
}

export default api;