import { cityService } from "@/services/city/city.service"
import { useQuery } from "react-query"

export const useGetAdress = (adress: string) => {
	return useQuery(['get afress', adress], () => cityService.getAdress(adress))
}