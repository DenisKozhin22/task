import { ILoginRequest, IUser } from '@/services/auth/auth.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUserState {
	user: IUser | null
}

const initialState: IUserState = {
	user: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | ILoginRequest>) => {
			state.user = action.payload
		},

		setUserPhoto: (state, action: PayloadAction<string>) => {
			if (state.user !== null) {
				state.user.photo = action.payload
			}
		},

		deleteUserPhoto: state => {
			if (state.user?.photo) state.user.photo = ''
		}
	}
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
