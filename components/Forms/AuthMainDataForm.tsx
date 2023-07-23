import { Box, FormControl, FormLabel, Heading, Input, Select } from '@chakra-ui/react'
import { FC } from 'react'

const AuthMainDataForm: FC = () => {
	return (
		<Box as='form'>
			<FormControl>
				<FormLabel color='#8D94A6' fontSize='12px' fontWeight='normal'>
					Имя
				</FormLabel>
				<Input type='text' fontSize='14px' color='#32353D' fontWeight='normal' bg='#F4F6FB' />
			</FormControl>
			<FormControl>
				<FormLabel color='#8D94A6' fontSize='12px' fontWeight='normal'>
					Фамилия
				</FormLabel>
				<Input type='text' fontSize='14px' color='#32353D' fontWeight='normal' bg='#F4F6FB' />
			</FormControl>
			<FormControl>
				<FormLabel color='#8D94A6' fontSize='12px' fontWeight='normal'>
					Город
				</FormLabel>
				<Select placeholder='Выберите город'>
					<option value='option1'>Option 1</option>
					<option value='option2'>Option 2</option>
					<option value='option3'>Option 3</option>
				</Select>
			</FormControl>
		</Box>
	)
}

export default AuthMainDataForm
