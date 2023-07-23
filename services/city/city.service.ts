import { axiosClassic } from '@/api'
import { ICityRespone, IAdress } from './city.types'
import { AxiosResponse } from 'axios'

export const cityService = {
	async getCities(city: string): Promise<AxiosResponse<ICityRespone>> {
		return axiosClassic.get<ICityRespone>(`city?limit=5&offset=0&title__icontains=${city}`)
	},

	async getAdress(adress: string): Promise<AxiosResponse<IAdress[]>> {
		return axiosClassic.get<IAdress[]>(`city/hints?query=${adress}&count=5`)
	}
}
