import { authService } from '@/services/auth/auth.service'
import { useMutation } from 'react-query'
import { useActions } from '../useActions'

export const useDeleteAvatar = () => {
	// Функция удаления аватара из глобального хранилища
	const { deleteUserPhoto } = useActions()

	// Функция запроса к серверу на удаление аватара
	return useMutation('delete avatar', () => authService.deleteAvatar(), {
		onSuccess: () => {
			// Удаление аватара из глобального хранилища при успешном удалении аватара с сервера
			deleteUserPhoto()
		}
	})
}
