export interface ICity {
	title: string
	title_alternative: string
	district: string
	region: string
	id: number
	rating: number
	tz: string
	tz_delta: number
}

export interface ICityRespone {
	data: ICity[]
	total: number
	limit: number
	offset: number
}

export interface IAdress {
	result: string
	lat: number
	long: number
	data: {
		country: string
		region_with_type: string
		area_with_type: string | null
		area: string | null
		city: string
		city_district: string | null
		settlement_with_type: string | null
		settlement: string | null
		street_with_type: string
		house_type: string
		house: string
		block_type: string | null
		block: string | null
		entrance: string | null
		floor: string | null
		timezone: string | null
		metro: string | null
	}
}


