import { axiosClassic, formDataAxiosInstance, instance } from '@/api'
import { AxiosResponse } from 'axios'
import { IAuthResponse, ILoginConfirm, ILoginRequest, IPatchUser, IUser } from './auth.types'

// Сервис авторизации
export const authService = {
	// Функция получения данных пользователя
	async getUser(): Promise<AxiosResponse<IUser>> {
		return instance.get<IUser>('user')
	},

	// Функция отправки номера телефона и получения кода подтверждения
	async loginRequest(phone: string): Promise<AxiosResponse<ILoginRequest>> {
		return axiosClassic.post<ILoginRequest>('login/request', { phone })
	},

	// Функция отправки кода подтверждения и получения данных пользователя
	async loginConfirm({
		confirm_code,
		user_id
	}: ILoginConfirm): Promise<AxiosResponse<IAuthResponse>> {
		return axiosClassic.post<IAuthResponse>('login/confirm', { confirm_code, user_id })
	},

	// Функция обновления данных пользователя
	async patchUser(data: IPatchUser): Promise<AxiosResponse<IUser>> {
		return instance.patch<IUser>('user', data)
	},

	// Функция обновления аватара пользователя
	async uploadAvatar(data: FormData): Promise<AxiosResponse<IUser>> {
		return formDataAxiosInstance.post<IUser>('user/photo', data)
	},

	// Функция удаления аватара пользователя
	async deleteAvatar(): Promise<AxiosResponse> {
		return instance.delete('user/photo')
	}
}
