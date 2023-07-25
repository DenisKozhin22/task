import { authService } from '@/services/auth/auth.service'
import { useQuery } from 'react-query'
import { useActions } from '../useActions'

export const useGetUser = () => {
	// Функция сохранения данных пользователя в глобальное хранилище
	const { setUser } = useActions()

	// Функция запроса к серверу для получения данных пользователя 
	return useQuery('get user', authService.getUser, {
		onSuccess(data) {
			// Сохранение данных пользователя в глобальное хранилище, если в ответе содержатся данные пользователя
			if (data?.data.id) setUser(data.data)
		}
	})
}
