import { cityService } from '@/services/city/city.service'
import { useQuery } from 'react-query'

export const useGetCity = (city: string) => {
	return useQuery(['get city', city], () => cityService.getCities(city))
}
