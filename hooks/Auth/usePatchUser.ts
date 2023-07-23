import { authService } from '@/services/auth/auth.service'
import { IPatchUser } from '@/services/auth/auth.types'
import { useMutation } from 'react-query'
import { useActions } from '../useActions'

export const usePatchUser = () => {
	const { setUser } = useActions()
	return useMutation('patch user', (data: IPatchUser) => authService.patchUser(data), {
		onSuccess(data) {
			if (data.data.id) {
				setUser(data.data)
			}
		}
	})
}
