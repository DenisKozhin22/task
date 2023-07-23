import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { modalActions } from '@/redux/Slices/modal.slice'
import { userActions } from '@/redux/Slices/user.slice'
const rootActions = {
	...modalActions,
	...userActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
