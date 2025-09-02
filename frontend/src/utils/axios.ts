import axios from "axios";

const djangoAPI = axios.create({
	baseURL: process.env.DJANGO_API_URL || "http://127.0.0.1:8000/",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
});

djangoAPI.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

djangoAPI.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				if (!refreshToken) {
					// No refresh token, redirect to login
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					window.location.href = "/login";
					return Promise.reject(error);
				}

				const response = await axios.post(
					`${
						process.env.DJANGO_API_URL || "http://127.0.0.1:8000/"
					}auth/refresh/`,
					{ refresh: refreshToken }
				);

				const newAccessToken = response.data.access;
				localStorage.setItem("accessToken", newAccessToken);

				// Retry the original request with new token
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return djangoAPI(originalRequest);
			} catch (refreshError) {
				// Refresh failed, logout user
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default djangoAPI;
