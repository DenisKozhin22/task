import { authService } from '@/services/auth/auth.service'
import { useMutation } from 'react-query'
import { useActions } from '../useActions'

export const useLoginRequest = () => {
	// Функция сохранения данных пользователя в глобальное хранилище
	const { setUser } = useActions()
	// Функция запроса к серверу для регистрации пользователя
	return useMutation('LoginRequest', (phone: string) => authService.loginRequest(phone), {
		onSuccess(data) {
			// Сохранение данных пользователя в глобальное хранилище, если в ответе содержатся данные пользователя
			if (data.data.id) setUser(data.data)
		}
	})
}
