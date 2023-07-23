import { ICity } from '../city/city.types'

export interface ILoginRequest {
	id: number | null
	first_name: string | null
	last_name: string | null
	has_required_data: boolean
}

export interface ILoginConfirm {
	user_id: number
	confirm_code: string
}

export interface IAuthResponse extends ILoginRequest {
	access_token: string
	refresh_token: string
	user: ILoginRequest
}

export interface IUser extends ILoginRequest {
	phone?: string 
	sex?: string 
	birthday?: string
	photo?: string
	middle_name?: string 
	city?: ICity
}

export interface IPatchUser {
	phone?: string
	sex?: string
	birthday?: string
	photo?: string
	middle_name?: string
	city_id?: number | null
}
