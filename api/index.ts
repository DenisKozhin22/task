import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'

// Экземпляр объекта Axios для запросов без авторизации
export const axiosClassic = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Экземпляр объекта Axios для запросов с авторизацией
export const instance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Перехватчик экземпляра объекта Axios для запросов с авторизацией
instance.interceptors.request.use(config => {
	const { access_token } = parseCookies()
	config.headers.Authorization = `Bearer ${access_token}`
	return config
})

instance.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			(error.response.status === 401 || error.response.status === 422) &&
			!originalRequest._retry
		) {
			try {
				originalRequest._retry = true

				const { refresh_token } = parseCookies() /// Получаем только 'refresh_token' из cookies

				const { data } = await axiosClassic.post(
					`${process.env.BASE_URL}login/refresh`,
					{},
					{
						headers: {
							Authorization: `Bearer ${refresh_token}`
						}
					}
				)

				// Обновляем значение cookie с access_token
				setCookie(null, 'access_token', data.access_token, {
					maxAge: 24 * 60 * 60,
					path: '/'
				})

				originalRequest.headers.Authorization = `Bearer ${data.access_token}`

				// Повторяем оригинальный запрос с обновленным access token
				return instance.request(originalRequest)
			} catch (error) {
				console.log('Не авторизован')
				console.log(error)
			}
		}

		// Для остальных ошибок возвращаем исходный ответ с ошибкой
		return Promise.reject(error)
	}
)

// Экземпляр объекта Axios для запросов с данными формы
export const formDataAxiosInstance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'multipart/form-data'
	}
})

// Перехватчик экземпляра объекта Axios для запросов с данными формы
formDataAxiosInstance.interceptors.request.use(config => {
	const { access_token } = parseCookies()
	config.headers.Authorization = `Bearer ${access_token}`
	return config
})

formDataAxiosInstance.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			(error.response.status === 401 || error.response.status === 422) &&
			!originalRequest._retry
		) {
			try {
				originalRequest._retry = true

				const { refresh_token } = parseCookies() /// Получаем только 'refresh_token' из cookies

				const { data } = await axiosClassic.post(
					`${process.env.BASE_URL}login/refresh`,
					{},
					{
						headers: {
							Authorization: `Bearer ${refresh_token}`
						}
					}
				)

				// Обновляем значение cookie с access_token
				setCookie(null, 'access_token', data.access_token, {
					maxAge: 24 * 60 * 60,
					path: '/'
				})

				originalRequest.headers.Authorization = `Bearer ${data.access_token}`

				// Повторяем оригинальный запрос с обновленным access token
				return instance.request(originalRequest)
			} catch (error) {
				console.log('Не авторизован')
				console.log(error)
			}
		}

		// Для остальных ошибок возвращаем исходный ответ с ошибкой
		return Promise.reject(error)
	}
)
