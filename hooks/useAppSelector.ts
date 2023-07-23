import { TypeRootState } from '@/redux/store'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector
