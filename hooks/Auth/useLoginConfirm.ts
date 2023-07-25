import { authService } from '@/services/auth/auth.service'
import { ILoginConfirm } from '@/services/auth/auth.types'
import { useMutation } from 'react-query'
import { useActions } from '../useActions'

import {  setCookie } from 'nookies'
export const useLoginConfirm = () => {
	// Функция сохранения данных пользователя в глобальное хранилище
	const { setUser } = useActions()

	// Функция запроса к серверу для логина пользователя
	return useMutation(
		'LoginConfirm',
		({ confirm_code, user_id }: ILoginConfirm) =>
			authService.loginConfirm({ confirm_code, user_id }),
		{
			onSuccess(data) {
				// Сохранение cookies при успешном логине 
				if (data.data.access_token && data.data.refresh_token) {
					setUser(data.data.user)

					setCookie(null, 'access_token', data.data.access_token, {
						maxAge: 30 * 24 * 60 * 60,
						path: '/'
					})
					setCookie(null, 'refresh_token', data.data.refresh_token, {
						maxAge: 30 * 24 * 60 * 60,
						path: '/'
					})
				}
			}
		}
	)
}
