import { authService } from '@/services/auth/auth.service'
import { useQuery } from 'react-query'
import { useActions } from '../useActions'

export const useGetUser = () => {
	const { setUser } = useActions()
	return useQuery('get user', authService.getUser, {
		onSuccess(data) {
			console.log(data.data)
			if (data?.data.id) setUser(data.data)
		}
	})
}
