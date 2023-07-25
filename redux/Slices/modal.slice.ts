import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Интерфейс стейта модального окна
interface IModalState {
	isOpenModal: boolean
}

// Изначальное состояние модального окна
const initialState: IModalState = {
	isOpenModal: false
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		// Функция открытия модального окна
		onOpenStateModal: state => {
			state.isOpenModal = true
		},
		// Функция закрытия модального окна
		onCloseStateModal: state => {
			state.isOpenModal = false
		}
	}
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
