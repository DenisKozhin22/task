import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'

export const axiosClassic = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const instance = axios.create({
	// withCredentials: true,
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(config => {
	const cookies = parseCookies()
	config.headers.Authorization = `Bearer ${cookies.access_token}`
	return config
})

instance.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (error.response.status === 403 && error.config && !error.config._isRetry) {
			try {
				originalRequest._isRetry = true
				const cookies = parseCookies()
				const { data } = await axiosClassic.post(`${process.env.BASE_URL}login/refresh`, {
					// withCredentials: true
				})
				setCookie(null, 'access_token', data.data.access_token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/'
				})
				setCookie(null, 'refresh_token', data.data.refresh_token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/'
				})
				originalRequest.headers.Authorization = `Bearer ${data.access_token}`

				return instance.request(originalRequest)
			} catch (error) {
				console.log('Не авторизован')
				console.log(error)
			}
		}
	}
)

export const formDataAxiosInstance = axios.create({
	// withCredentials: true,
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'multipart/form-data'
	}
})

formDataAxiosInstance.interceptors.request.use(config => {
	const cookies = parseCookies()
	config.headers.Authorization = `Bearer ${cookies.access_token}`
	return config
})
formDataAxiosInstance.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (error.response.status === 403 && error.config && !error.config._isRetry) {
			try {
				originalRequest._isRetry = true
				const { data } = await axiosClassic.post(`${process.env.BASE_URL}login/refresh`, {
					// withCredentials: true
				})
				setCookie(null, 'access_token', data.data.access_token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/'
				})
				setCookie(null, 'refresh_token', data.data.refresh_token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/'
				})
				originalRequest.headers.Authorization = `Bearer ${data.access_token}`

				return instance.request(originalRequest)
			} catch (error) {
				console.log('Не авторизован')
				console.log(error)
			}
		}
	}
)
