import { ILoginRequest, IUser } from '@/services/auth/auth.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Интерфейс стейта пользователя
interface IUserState {
	user: IUser | null
}

// Изначальное состояние стейта пользователя
const initialState: IUserState = {
	user: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// Функция сохранения данных пользователя
		setUser: (state, action: PayloadAction<IUser | ILoginRequest>) => {
			state.user = action.payload
		},

		// Функция сохранение аватара
		setUserPhoto: (state, action: PayloadAction<string>) => {
			if (state.user !== null) {
				state.user.photo = action.payload
			}
		},

		// Функция удаления аватара
		deleteUserPhoto: state => {
			if (state.user?.photo) state.user.photo = ''
		}
	}
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
