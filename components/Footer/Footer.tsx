'use client '

import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

const Footer: FC = () => {
	return (
		<Box bg='white' w='full'>
			<Container maxW='1000px' py='40px'>
				<Flex flexDirection='column' color='#8D94A6' fontSize='14px' fontWeight='normal' gap='15px'>
					<Text>© 2023</Text>
					<Text>Сделано в Лаконизм</Text>
				</Flex>
			</Container>
		</Box>
	)
}

export default Footer
