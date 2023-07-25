'use client'
import { useActions } from '@/hooks/useActions'
import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'

const AuthSection: FC = () => {
	// Функция открытия модального окна авторизации
	const { onOpenStateModal } = useActions()
	return (
		<Flex h='228px' w='full' bg='white' alignItems='center' justifyContent='center'>
			{/* Кнопка для открытия модального окна авторизации */}
			<Button
				bg='#3579F3'
				h='52px'
				w='165px'
				color='white'
				_hover={{ bg: '#3579F3' }}
				fontSize='16px'
				onClick={() => onOpenStateModal()}>
				Авторизация
			</Button>
		</Flex>
	)
}

export default AuthSection
