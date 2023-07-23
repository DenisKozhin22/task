import { axiosClassic, formDataAxiosInstance, instance } from '@/api'
import { AxiosResponse } from 'axios'
import { IAuthResponse, ILoginConfirm, ILoginRequest, IPatchUser, IUser } from './auth.types'

export const authService = {
	async getUser(): Promise<AxiosResponse<IUser>> {
		return instance.get<IUser>('user')
	},
	async loginRequest(phone: string): Promise<AxiosResponse<ILoginRequest>> {
		return axiosClassic.post<ILoginRequest>('login/request', { phone })
	},
	async loginConfirm({
		confirm_code,
		user_id
	}: ILoginConfirm): Promise<AxiosResponse<IAuthResponse>> {
		return axiosClassic.post<IAuthResponse>('login/confirm', { confirm_code, user_id })
	},
	async patchUser(data: IPatchUser): Promise<AxiosResponse<IUser>> {
		return instance.patch<IUser>('user', data)
	},
	async uploadAvatar(data: FormData): Promise<AxiosResponse<IUser>> {
		return formDataAxiosInstance.post<IUser>('user/photo', data)
	},
	async deleteAvatar(): Promise<AxiosResponse> {
		return instance.delete('user/photo')
	}
}
