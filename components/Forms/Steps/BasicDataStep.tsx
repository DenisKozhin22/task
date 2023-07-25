import { useGetCity } from '@/hooks/City/useGetCity'
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	List,
	ListItem
} from '@chakra-ui/react'
import { ChangeEvent, FC, useCallback, useState } from 'react'
import debounce from 'lodash.debounce'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePatchUser } from '@/hooks/Auth/usePatchUser'

// Интерфейс для пропсов компонента
interface IBasicDataStepProps {
	onNextStep: () => void // Функция перехода на следующий шаг
	onPrevStep: () => void //Функция перехода на предыдущий шаг
}

// Интерфейс для формы
interface IBasicDataForm {
	city_id: number | null
	city_name: string
	first_name: string
	last_name: string
}

const BasicDataStep: FC<IBasicDataStepProps> = ({ onNextStep, onPrevStep }) => {
	// Форма ввода основных данных
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isValid }
	} = useForm<IBasicDataForm>({
		mode: 'onSubmit'
	})

	// Состояния города
	const [city, setCity] = useState<string>('')
	const [selectedCity, setSelectedCity] = useState<string>('')
	const [selectedCityName, setSelectedCityName] = useState<string>('')
	const [selectedCityId, setSelectedCityId] = useState<number | null>(null)

	// Состояние показа списка городов
	const [showCities, setShowCities] = useState<boolean>(false)

	// Хук для отправки обновленных данных пользователя на сервер
	const { mutateAsync: patchUser } = usePatchUser()

	// Функция запроса городов
	const { data: cities } = useGetCity(city)

	// Debounce функция поиска города
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearchCity = useCallback(
		debounce((searchValue: string) => {
			setCity(searchValue)
		}, 500),
		[]
	)

	// Функция обработчик поиска города
	const handleDebouncedSearchCity = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value
		debouncedSearchCity(searchValue)
		setShowCities(searchValue.trim() !== '')
	}

	// Функция обработчик выбора города
	const handleCitySelect = (cityTitle: string, cityId: number) => {
		setSelectedCity(cityTitle)
		setSelectedCityId(cityId)
		setSelectedCityName(cityTitle)
		setValue('city_id', cityId)
		setShowCities(false)
	}

	// Функция сохранения основных данных
	const onSubmit: SubmitHandler<IBasicDataForm> = async data => {
		try {
			const { city_name, ...submitData } = data
			await patchUser(submitData).finally(() => onNextStep())
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Box as='form' onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!errors.first_name?.message}>
				<FormLabel htmlFor='name' color='#8D94A6' fontSize='14px' ml='12px' fontWeight='normal'>
					Имя
				</FormLabel>

				{/* Input ввода имени */}
				<Input
					id='name'
					type='text'
					fontSize='14px'
					color='#32353D'
					fontWeight='normal'
					mb='8px'
					bg='#F4F6FB'
					autoFocus
					{...register('first_name', {
						required: 'Обязательное поле'
					})}
				/>

				{/* Ошибка input имени */}
				<FormErrorMessage
					mb='2'
					mt='0'
					ml='12px'
					color='#FF0000'
					fontSize='12px'
					fontWeight='normal'>
					{errors.first_name?.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.last_name?.message}>
				<FormLabel htmlFor='surName' color='#8D94A6' fontSize='14px' ml='12px' fontWeight='normal'>
					Фамилия
				</FormLabel>

				{/* Input ввода фамилии */}
				<Input
					id='surName'
					type='text'
					fontSize='14px'
					color='#32353D'
					fontWeight='normal'
					mb='8px'
					bg='#F4F6FB'
					{...register('last_name', {
						required: 'Обязательное поле'
					})}
				/>

				{/* Input ввода фамилии */}
				<FormErrorMessage
					mb='2'
					mt='0'
					ml='12px'
					color='#FF0000'
					fontSize='12px'
					fontWeight='normal'>
					{errors.last_name?.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.city_name?.message} position='relative'>
				<FormLabel htmlFor='city' color='#8D94A6' fontSize='14px' ml='12px' fontWeight='normal'>
					Выберите ваш город
				</FormLabel>

				{/* Input ввода города */}
				<Input
					id='city'
					type='text'
					fontSize='14px'
					color='#32353D'
					fontWeight='normal'
					mb='8px'
					bg='#F4F6FB'
					onFocus={() => setShowCities(city.trim() !== '')}
					value={selectedCityName}
					{...register('city_name', {
						required: 'Обязательное поле',
						onChange: e => {
							setSelectedCityName(e.target.value)
							setSelectedCityId(null)
							setValue('city_id', null)
							handleDebouncedSearchCity(e)
						}
					})}
				/>

				{/* Список городов */}
				{cities && showCities && cities.data.data.length > 0 && !selectedCityId && (
					<List
						position='absolute'
						left={0}
						zIndex={100}
						w='full'
						bg='white'
						boxShadow='md'
						border='1px solid'
						borderColor='gray.200'
						borderRadius='md'>
						{cities.data.data.map(city => (
							<ListItem
								key={city.id}
								cursor='pointer'
								fontSize='14px'
								fontWeight='normal'
								color='#32353D'
								_hover={{ bg: '#E6EFFF' }}
								px={4}
								py={2}
								onClick={() => handleCitySelect(city.title, city.id)}>
								{city.title}
							</ListItem>
						))}
					</List>
				)}
				{/* Ошибка input города */}
				<FormErrorMessage
					mb='2'
					mt='0'
					ml='12px'
					color='#FF0000'
					fontSize='12px'
					fontWeight='normal'>
					{errors.city_name?.message}
				</FormErrorMessage>
			</FormControl>

			{/* Кнопка сохранения данных */}
			<Button
				type='submit'
				w='full'
				mx='auto'
				my='2'
				bg='#3579F3'
				color='white'
				_hover={{ bg: '#3579F3' }}
				isDisabled={!isValid}>
				Сохранить
			</Button>
		</Box>
	)
}

export default BasicDataStep
