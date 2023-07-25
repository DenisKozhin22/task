import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Box,
	FormControl,
	Button,
	FormLabel,
	Input,
	Text,
	FormErrorMessage,
	Link
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'
import { formatPhoneNumber } from '../formaterPhone'
import { useLoginRequest } from '@/hooks/Auth/useLoginRequest'

// Интерфейс для пропсов компонента
interface IPhoneStepProps {
	onNextStep: () => void // Функция перехода на следующий шаг
	onPhoneNumberChange: (phoneNumber: string) => void // Функция для состояния номера телефона
	onSetConfirmCode: (confirmCode: string) => void // Функция для состояние кода подтверждения
}

// Интерфейс для формы
interface IPhoneStepForm {
	phone: string
}

const PhoneStep: FC<IPhoneStepProps> = ({ onNextStep, onPhoneNumberChange }) => {
	// Форма ввода номера телефона
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<IPhoneStepForm>({
		mode: 'onChange'
	})

	// Хук для отправки номера телефона на сервер
	const { mutateAsync } = useLoginRequest()

	// Функция submit
	const onSubmit: SubmitHandler<IPhoneStepForm> = async data => {
		try {
			const phone = formatPhoneNumber(data.phone)
			await mutateAsync(phone)
			onPhoneNumberChange(phone)
			onNextStep()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Box as='form' onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={Boolean(errors.phone)}>
				<FormLabel
					htmlFor='phoneNumber'
					color='#8D94A6'
					fontSize='14px'
					ml='12px'
					fontWeight='normal'>
					Телефон
				</FormLabel>

				{/* Input номера телефона */}
				<Input
					id='phone'
					type='tel'
					placeholder='+7'
					fontSize='14px'
					color='#32353D'
					fontWeight='normal'
					mb='8px'
					bg='#F4F6FB'
					as={InputMask}
					mask='+7 (999) 999-99-99'
					maskChar='_'
					autoFocus
					{...register('phone', {
						required: 'Обязательное поле',
						pattern: {
							value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
							message: 'Номер должен содержать 11 цифр.'
						}
					})}
				/>

				{/* Сообщение об ошибке валидации input с номером телефона */}
				<FormErrorMessage
					mb='2'
					mt='0'
					ml='12px'
					color='#FF0000'
					fontSize='12px'
					fontWeight='normal'>
					{errors.phone?.message}
				</FormErrorMessage>
			</FormControl>

			{/* Кнопка подтверждения номера телефона */}
			<Button
				type='submit'
				w='full'
				mx='auto'
				my='2'
				bg='#3579F3'
				color='white'
				_hover={{ bg: '#3579F3' }}>
				Подтвердить номер телефона
			</Button>
			<Text
				color='#32353D'
				textAlign='center'
				fontSize='14px'
				fontWeight='normal'
				mt='8px'
				mb='24px'>
				Мы позвоним на указанный номер телефона
			</Text>
			<Text color='#32353D' fontSize='12px' fontWeight='normal' textAlign='justify'>
				Нажимая кнопку «Подтвердить номер телефона», я даю свое согласие на сбор и обработку моих
				<br />
				персональных данных в соответствии с
				<Link color='#3579F3' href='#' mx='1.5px'>
					Политикой
				</Link>
				и принимаю условия
				<Link color='#3579F3' href='#' mx='1.5px'>
					Пользовательского соглашения
				</Link>
			</Text>
		</Box>
	)
}

export default PhoneStep
