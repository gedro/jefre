import axios from 'axios'

const api = (apiUrl) => {

  const getCsrfToken = async (apiUrl) => {
    let csrfToken = localStorage.getItem("CSRF_TOKEN");

    if (!csrfToken) {
      try {
        const response = await axios.get(
          `${apiUrl}/api/auth/csrf-token`,
          {withCredentials: true}
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    }

    return csrfToken;
  }

  const apiInstance = axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  // Add a request interceptor to include JWT and CSRF tokens
  apiInstance.interceptors.request.use(
    async (config) => {
      const token = null; // TODO: appContext.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      let csrfToken = await getCsrfToken(apiUrl);
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
      console.log("X-XSRF-TOKEN " + csrfToken);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return apiInstance;
}

export default api;