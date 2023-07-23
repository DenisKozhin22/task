import { authService } from '@/services/auth/auth.service'
import { useMutation } from 'react-query'
import { useActions } from '../useActions'

export const useDeleteAvatar = () => {
	const { deleteUserPhoto } = useActions()
	return useMutation('delete avatar', () => authService.deleteAvatar(), {
		onSuccess: () => {
			deleteUserPhoto()
		}
	})
}
