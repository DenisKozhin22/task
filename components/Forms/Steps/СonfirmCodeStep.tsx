'use client'
import { FC, useState, useEffect } from 'react'
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
import { ILoginConfirm } from '@/services/auth/auth.types'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useLoginConfirm } from '@/hooks/Auth/useLoginConfirm'
import { useAppSelector } from '@/hooks/useAppSelector'

// Интерфейс для пропсов компонента
interface IConfirmCodeStepProps {
	phoneNumber: string // Изначальное значение номера телефона, который был введен в прошлом шаге
	onNextStep: () => void // Функция перехода на следующий шаг
	isConfirmCode: string // Код подтверждения
}

const ConfirmCodeStep: FC<IConfirmCodeStepProps> = ({ phoneNumber, onNextStep, isConfirmCode }) => {
	// Форма ввода номера телефона
	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		formState: { errors, isValid },
		reset
	} = useForm<ILoginConfirm>({
		mode: 'onChange'
	})

	// Состояния кода подтверждения
	const [enteredCode, setEnteredCode] = useState('')
	const [confirmationCode, setConfirmationCode] = useState(isConfirmCode)

	// Состояния таймера
	const [remainingTime, setRemainingTime] = useState(60)
	const [isTimerActive, setIsTimerActive] = useState(true)

	// Данные пользователя из глобального хранилища
	const { user } = useAppSelector(state => state.user)

	// Хук для отправки запроса кода подтверждения на сервер
	const { mutateAsync } = useLoginConfirm()

	// Функция повторной отправки кода подтверждения
	const handleResendCode = () => {
		// Запрос звонка на номер телефона
		// setIsConfirmCode(newConfirmCode)

		setRemainingTime(60)
		setIsTimerActive(true)

		setValue('confirm_code', '')
	}

	// Функция обработки ввода кода подтверждения в input
	const handleChangeConfirmCode = (event: HTMLInputElement) => {
		setEnteredCode(event.value)

		// Если введенный код равен коду, пришедшему ранее с сервера и в глобальном хранилие есть данные пользователя, то отправляется запрос на сервер с подтверждением кода
		if (event.value === confirmationCode) {
			if (user?.id) {
				mutateAsync({
					confirm_code: '1111',
					user_id: user?.id
				})
			}

			// Остановка таймера и переход на следующий шаг
			setIsTimerActive(false)
			onNextStep()
		}
	}

	// Обработчик таймера
	useEffect(() => {
		let interval: NodeJS.Timer

		if (isTimerActive) {
			interval = setInterval(() => {
				setRemainingTime(prevTime => prevTime - 1)
			}, 1000)
		}

		if (remainingTime === 0) {
			setIsTimerActive(false)
		}

		return () => clearInterval(interval)
	}, [isTimerActive, remainingTime])

	// Функция submit
	const onSubmit = async () => {}

	return (
		<Box as='form' onSubmit={handleSubmit(onSubmit)}>
			<FormControl>
				<FormLabel
					htmlFor='phoneNumber'
					color='#8D94A6'
					fontSize='14px'
					ml='12px'
					fontWeight='normal'>
					Телефон
				</FormLabel>

				{/* Input номера телефона, в значение которого занесен номер телефона, введенный в прошлом шаге */}
				<Input
					id='phone'
					type='tel'
					placeholder='+7'
					fontSize='14px'
					color='#32353D'
					fontWeight='normal'
					value={phoneNumber}
					as={InputMask}
					mask='+7 (999) 999-99-99'
					maskChar='_'
					bg='#F4F6FB'
				/>
			</FormControl>

			<Text color='#8D94A6' fontSize='12px' fontWeight='normal' textAlign='center' mb='4px'>
				Последние 4 цифры номера входящего звонка
			</Text>

			<FormControl isInvalid={Boolean(errors.confirm_code || confirmationCode !== enteredCode)}>
				{/* Input кода подтверждения */}
				<Input
					{...register('confirm_code', {
						required: 'Поле должно быть обязательным.',
						pattern: {
							value: /^\d{4}$/,
							message: 'Код подтверждения некорректен или просрочен.'
						}
					})}
					color='#32353D'
					fontSize='14px'
					fontWeight='normal'
					type='text'
					maxLength={4}
					placeholder='****'
					autoFocus
					onChange={e => handleChangeConfirmCode(e.target)}
				/>

				{/* Ошибка валидации input с кодом подтверждения */}
				{errors.confirm_code && errors.confirm_code.type === 'required' && (
					<FormErrorMessage my='2' ml='12px' color='#FF0000' fontSize='12px' fontWeight='normal'>
						{errors.confirm_code.message}
					</FormErrorMessage>
				)}
				{((errors.confirm_code && errors.confirm_code.type === 'pattern') ||
					(!errors.confirm_code?.message && confirmationCode !== enteredCode)) && (
					<FormErrorMessage my='2' ml='12px' color='#FF0000' fontSize='12px' fontWeight='normal'>
						Код подтверждения некорректен или просрочен.
					</FormErrorMessage>
				)}
			</FormControl>

			{/* Таймер */}
			{isTimerActive ? (
				<Text fontSize='14px' fontWeight='normal' mt='16px' mb='24px'>
					Повторный звонок возможен через
					<span className='font-semibold'> {remainingTime} сек.</span>
				</Text>
			) : (
				<Button
					onClick={handleResendCode}
					w='full'
					mx='auto'
					my='2'
					bg='#3579F3'
					color='white'
					_hover={{ bg: '#3579F3' }}>
					Запросить звонок повторно
				</Button>
			)}

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

export default ConfirmCodeStep
