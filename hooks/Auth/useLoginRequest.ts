import { authService } from '@/services/auth/auth.service'
import { useMutation } from 'react-query'
import { useActions } from '../useActions'

export const useLoginRequest = () => {
	const {setUser} = useActions()
	return useMutation('LoginRequest', (phone: string) => authService.loginRequest(phone), {
		onSuccess(data) {
			if (data.data.id) {
				setUser(data.data)
			}
		}
	})
}
