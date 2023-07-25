import { authService } from '@/services/auth/auth.service'
import { IPatchUser } from '@/services/auth/auth.types'
import { useMutation } from 'react-query'
import { useActions } from '../useActions'

export const usePatchUser = () => {
	// Функция сохранения данных пользователя в глобальное хранилище
	const { setUser } = useActions()

	// Функция запроса к серверу для обновления данных пользователя
	return useMutation('patch user', (data: IPatchUser) => authService.patchUser(data), {
		onSuccess(data) {
			// Сохранение данных пользователя в глобальное хранилище, если в ответе содержатся данные пользователя
			if (data.data.id) setUser(data.data)
		}
	})
}
