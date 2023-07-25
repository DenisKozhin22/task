'use client'
import { Heading } from '@chakra-ui/react'
import { FC } from 'react'

// Компонент основного заголовка страницы
const MainHeading: FC<{ title: string }> = ({ title }) => {
	return (
		<Heading as='h2' color='#32353D' fontSize='32px' mb='40px' fontWeight='semibold'>
			{title}
		</Heading>
	)
}

export default MainHeading
