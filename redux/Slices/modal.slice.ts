import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IModalState {
	isOpenModal: boolean
	activeForm: number
	phone: string
}

const initialState: IModalState = {
	isOpenModal: false,
	activeForm: 0,
	phone: ''
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		onOpenStateModal: state => {
			state.isOpenModal = true
		},
		onCloseStateModal: state => {
			state.isOpenModal = false
		},
		nextForm: state => {
			state.activeForm += 1
		},
		prevForm: state => {
			state.activeForm -= 1
		},
		setPhone: (state, action: PayloadAction<string>) => {
			state.phone = action.payload
		}
	}
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
