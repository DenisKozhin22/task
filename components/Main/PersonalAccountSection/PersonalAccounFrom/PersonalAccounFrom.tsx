'use client'

import { ChangeEvent, MouseEvent, FC, useRef, useState, useCallback } from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	Box,
	Flex,
	Heading,
	Input,
	Text,
	Image,
	Button,
	FormControl,
	FormLabel,
	Select,
	Divider,
	List,
	ListItem
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'
import { ChevronDownIcon } from '@chakra-ui/icons'
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar'
import debounce from 'lodash.debounce'
import { useGetCity } from '@/hooks/City/useGetCity'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IUser } from '@/services/auth/auth.types'
import { useGetAdress } from '@/hooks/City/useGetAdress'
import { useUploadAvatar } from '@/hooks/Auth/useUploadAvatar'
import { usePatchUser } from '@/hooks/Auth/usePatchUser'
import { formatPhoneNumber } from '@/components/Forms/formaterPhone'
import moment from 'moment'
import { useDeleteAvatar } from '@/hooks/Auth/useDeleteAvatar'
import { useActions } from '@/hooks/useActions'
export interface IPersonalAccounFrom extends Omit<IUser, 'photo'> {
	city_id: number | null
	city_name: string
}

const PersonalAccounFrom: FC = () => {
	const { user } = useAppSelector(state => state.user)
	const { setUserPhoto } = useActions()
	const { mutateAsync: patchUser } = usePatchUser()

	// Форма
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isValid }
	} = useForm<IPersonalAccounFrom>({
		mode: 'onSubmit',
		defaultValues: {
			id: user?.id,
			first_name: user?.first_name,
			last_name: user?.last_name,
			has_required_data: true,
			phone: user?.phone,
			sex: user?.sex,
			birthday: user?.birthday,
			middle_name: user?.middle_name,
			city_name: user?.city?.title
		}
	})

	// Состояния аватарки
	const imageInputRef = useRef<HTMLInputElement | null>(null)
	const [image, setImage] = useState<File | null>(null)
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const { mutateAsync: onUploadAvatar } = useUploadAvatar()
	const { mutateAsync: onDeleteAvatar } = useDeleteAvatar()

	// Состояния города
	const [city, setCity] = useState<string>('')
	const [selectedCityName, setSelectedCityName] = useState<string>('')
	const [selectedCityId, setSelectedCityId] = useState<number | null>(null)
	const [showCities, setShowCities] = useState<boolean>(false)

	const { data: cities } = useGetCity(city)

	// Состояния адреса
	const [adress, setAdress] = useState<string>('')
	const [selectedAdressName, setSelectedAdressName] = useState<string>('')
	const [showAddresses, setShowAddresses] = useState<boolean>(false)

	const { data: addresses } = useGetAdress(`г ${selectedCityName}, ${adress}`)

	// Действия над аватаркой
	const onClickImageInput = () => {
		if (imageInputRef.current !== null) {
			imageInputRef.current.click()
		}
	}

	const onSetImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			const previewURL = URL.createObjectURL(file)

			setImage(file)
			setPreviewImage(previewURL)
			console.log(previewURL)

			const formData = new FormData()
			formData.append('file', file)

			try {
				setUserPhoto(previewURL)
				onUploadAvatar(formData)
			} catch (error) {
				console.error('Error uploading image:', error)
			}
		}
	}

	const onDeleteImage = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setImage(null)
		onDeleteAvatar()
	}

	// Действия с выбором города
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearchCity = useCallback(
		debounce((searchValue: string) => {
			setCity(searchValue)
		}, 500),
		[]
	)

	const handleDebouncedSearchCity = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value
		debouncedSearchCity(searchValue)
		setShowCities(searchValue.trim() !== '')
	}

	const handleCitySelect = (cityTitle: string, cityId: number) => {
		setSelectedCityId(cityId)
		setSelectedCityName(cityTitle)
		setValue('city_id', cityId)
		setShowCities(false)
		setAdress('')
		setSelectedAdressName('')
	}

	// Действия с выбором адреса
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearchAdress = useCallback(
		debounce((searchValue: string) => {
			setAdress(searchValue)
		}, 500),
		[]
	)

	const handleDebouncedSearchAdress = (event: ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value
		debouncedSearchAdress(searchValue)
		setShowAddresses(searchValue.trim() !== '')
	}

	const handleAdressSelect = (adressTitle: string) => {
		setSelectedAdressName(adressTitle)
		setShowAddresses(false)
	}

	const onSubmit: SubmitHandler<IPersonalAccounFrom> = async data => {
		try {
			const { city_name, id, phone, birthday, ...submitdata } = data

			const updatePhone = phone ? formatPhoneNumber(phone) : ''
			const updateBirthday = birthday ? moment(birthday).format('YYYY-MM-DD') : ''

			const newSubmitData = {
				...submitdata,
				phone: updatePhone,
				birthday: updateBirthday
			}
			patchUser(newSubmitData)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Box bg='white' p='40px' rounded='base'>
			<Heading fontSize='24px' fontWeight='semibold'>
				Настройки аккаунта
			</Heading>
			<Box as='form' my='32px' onSubmit={handleSubmit(onSubmit)}>
				<Flex gap='20px' mb='40px'>
					<Box
						display='flex'
						position='relative'
						justifyContent='center'
						alignItems='center'
						cursor='pointer'
						minW='200px'
						h='200px'
						border={previewImage ? '' : '1px dashed #3579F3'}
						rounded='base'
						onClick={onClickImageInput}>
						{previewImage || user?.photo ? (
							<Image
								src={previewImage || `http://185.22.61.79:8000${user?.photo}`}
								width={200}
								height={200}
								rounded='base'
								alt='user avatar'
							/>
						) : (
							<Text color='#397BF2' fontSize='14px' fontWeight='semibold'>
								Загрузите фото
							</Text>
						)}

						<Flex position='absolute' zIndex={10000} bottom='-20px'>
							<Button
								bg='#3579F3'
								borderRadius='40px 0px 0px 40px'
								border='1px solid #fff'
								_hover={{ bg: '#3579F3' }}>
								<svg
									width='16'
									height='16'
									viewBox='0 0 16 16'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M14.0002 8C13.8234 8 13.6538 8.07024 13.5288 8.19526C13.4037 8.32029 13.3335 8.48986 13.3335 8.66667V12.6667C13.3335 12.8435 13.2633 13.013 13.1382 13.1381C13.0132 13.2631 12.8436 13.3333 12.6668 13.3333H3.3335C3.15669 13.3333 2.98712 13.2631 2.86209 13.1381C2.73707 13.013 2.66683 12.8435 2.66683 12.6667V3.33333C2.66683 3.15652 2.73707 2.98695 2.86209 2.86193C2.98712 2.7369 3.15669 2.66667 3.3335 2.66667H7.3335C7.51031 2.66667 7.67988 2.59643 7.8049 2.4714C7.92992 2.34638 8.00016 2.17681 8.00016 2C8.00016 1.82319 7.92992 1.65362 7.8049 1.5286C7.67988 1.40357 7.51031 1.33333 7.3335 1.33333H3.3335C2.80306 1.33333 2.29436 1.54405 1.91928 1.91912C1.54421 2.29419 1.3335 2.8029 1.3335 3.33333V12.6667C1.3335 13.1971 1.54421 13.7058 1.91928 14.0809C2.29436 14.456 2.80306 14.6667 3.3335 14.6667H12.6668C13.1973 14.6667 13.706 14.456 14.081 14.0809C14.4561 13.7058 14.6668 13.1971 14.6668 12.6667V8.66667C14.6668 8.48986 14.5966 8.32029 14.4716 8.19526C14.3465 8.07024 14.177 8 14.0002 8ZM4.00016 8.50667V11.3333C4.00016 11.5101 4.0704 11.6797 4.19543 11.8047C4.32045 11.9298 4.49002 12 4.66683 12H7.4935C7.58123 12.0005 7.66821 11.9837 7.74943 11.9505C7.83066 11.9173 7.90454 11.8685 7.96683 11.8067L12.5802 7.18667L14.4735 5.33333C14.536 5.27136 14.5856 5.19762 14.6194 5.11638C14.6533 5.03515 14.6707 4.94801 14.6707 4.86C14.6707 4.77199 14.6533 4.68485 14.6194 4.60362C14.5856 4.52238 14.536 4.44864 14.4735 4.38667L11.6468 1.52667C11.5849 1.46418 11.5111 1.41458 11.4299 1.38074C11.3486 1.34689 11.2615 1.32947 11.1735 1.32947C11.0855 1.32947 10.9984 1.34689 10.9171 1.38074C10.8359 1.41458 10.7621 1.46418 10.7002 1.52667L8.82016 3.41333L4.1935 8.03333C4.13171 8.09563 4.08283 8.1695 4.04965 8.25073C4.01647 8.33195 3.99966 8.41893 4.00016 8.50667ZM11.1735 2.94L13.0602 4.82667L12.1135 5.77333L10.2268 3.88667L11.1735 2.94ZM5.3335 8.78L9.28683 4.82667L11.1735 6.71333L7.22016 10.6667H5.3335V8.78Z'
										fill='white'
									/>
								</svg>
							</Button>
							<Button
								bg='#E30613'
								borderRadius='0px 40px 40px 0px'
								border='1px solid #fff'
								_hover={{ bg: '#E30613' }}
								onClick={e => onDeleteImage(e)}>
								<svg
									width='16'
									height='16'
									viewBox='0 0 16 16'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M13.3333 3.99998H10.6667V3.33331C10.6667 2.80288 10.456 2.29417 10.0809 1.9191C9.70581 1.54403 9.1971 1.33331 8.66667 1.33331H7.33333C6.8029 1.33331 6.29419 1.54403 5.91912 1.9191C5.54405 2.29417 5.33333 2.80288 5.33333 3.33331V3.99998H2.66667C2.48986 3.99998 2.32029 4.07022 2.19526 4.19524C2.07024 4.32027 2 4.48984 2 4.66665C2 4.84346 2.07024 5.01303 2.19526 5.13805C2.32029 5.26308 2.48986 5.33331 2.66667 5.33331H3.33333V12.6666C3.33333 13.1971 3.54405 13.7058 3.91912 14.0809C4.29419 14.4559 4.8029 14.6666 5.33333 14.6666H10.6667C11.1971 14.6666 11.7058 14.4559 12.0809 14.0809C12.456 13.7058 12.6667 13.1971 12.6667 12.6666V5.33331H13.3333C13.5101 5.33331 13.6797 5.26308 13.8047 5.13805C13.9298 5.01303 14 4.84346 14 4.66665C14 4.48984 13.9298 4.32027 13.8047 4.19524C13.6797 4.07022 13.5101 3.99998 13.3333 3.99998ZM6.66667 3.33331C6.66667 3.1565 6.7369 2.98693 6.86193 2.86191C6.98695 2.73688 7.15652 2.66665 7.33333 2.66665H8.66667C8.84348 2.66665 9.01305 2.73688 9.13807 2.86191C9.2631 2.98693 9.33333 3.1565 9.33333 3.33331V3.99998H6.66667V3.33331ZM11.3333 12.6666C11.3333 12.8435 11.2631 13.013 11.1381 13.1381C11.013 13.2631 10.8435 13.3333 10.6667 13.3333H5.33333C5.15652 13.3333 4.98695 13.2631 4.86193 13.1381C4.7369 13.013 4.66667 12.8435 4.66667 12.6666V5.33331H11.3333V12.6666Z'
										fill='white'
									/>
								</svg>
							</Button>
						</Flex>
						<Input
							type='file'
							name='file'
							accept='image/*'
							hidden
							ref={imageInputRef}
							onChange={e => onSetImage(e)}
						/>
					</Box>
					<Flex w='full' flexDirection='column'>
						<Divider color='#E8EAED' />
						<FormControl display='flex' justifyContent='space-between' gap='24px' my='15px'>
							<FormLabel
								htmlFor='last_name'
								color='#32353D'
								fontSize='14px'
								ml='12px'
								fontWeight='semibold'
								lineHeight='22.4px'>
								Фамилия
							</FormLabel>
							<Input
								id='last_name'
								placeholder='Введите фамилию'
								maxW='468px'
								type='text'
								fontSize='14px'
								color='#32353D'
								fontWeight='normal'
								bg='#F4F6FB'
								{...register('last_name')}
							/>
						</FormControl>
						<Divider color='#E8EAED' />
						<FormControl display='flex' justifyContent='space-between' gap='24px' my='15px'>
							<FormLabel
								htmlFor='first_name'
								color='#32353D'
								fontSize='14px'
								ml='12px'
								fontWeight='semibold'
								lineHeight='22.4px'>
								Имя
							</FormLabel>
							<Input
								id='first_name'
								placeholder='Введите имя'
								maxW='468px'
								type='text'
								fontSize='14px'
								color='#32353D'
								fontWeight='normal'
								bg='#F4F6FB'
								{...register('first_name')}
							/>
						</FormControl>
						<Divider color='#E8EAED' />
						<FormControl display='flex' justifyContent='space-between' gap='24px' my='15px'>
							<FormLabel
								htmlFor='middle_name'
								color='#32353D'
								fontSize='14px'
								ml='12px'
								fontWeight='semibold'
								lineHeight='22.4px'>
								Отчество
							</FormLabel>
							<Input
								id='middle_name'
								placeholder='Введите отчество'
								maxW='468px'
								type='text'
								fontSize='14px'
								color='#32353D'
								fontWeight='normal'
								bg='#F4F6FB'
								defaultValue={user?.middle_name}
								{...register('middle_name')}
							/>
						</FormControl>
					</Flex>
				</Flex>
				<Flex flexDirection='column'>
					<Divider color='#E8EAED' />
					<FormControl display='flex' justifyContent='space-between' gap='24px' my='15px'>
						<FormLabel
							htmlFor='sex'
							color='#32353D'
							fontSize='14px'
							ml='12px'
							fontWeight='semibold'
							lineHeight='22.4px'>
							Пол
						</FormLabel>

						<Select
							id='sex'
							defaultValue={user?.sex}
							placeholder='Выберете пол'
							maxW='535px'
							fontSize='14px'
							color='#6D7589'
							fontWeight='normal'
							bg='#F4F6FB'
							icon={<ChevronDownIcon color='#3579F3 !important' />}
							{...register('sex')}>
							<option value='male'>Мужчина</option>
							<option value='female'>Женщина</option>
						</Select>
					</FormControl>
					<Divider color='#E8EAED' />
					<FormControl display='flex' justifyContent='space-between' gap='24px' my='15px'>
						<FormLabel
							htmlFor='birthday'
							color='#32353D'
							fontSize='14px'
							ml='12px'
							fontWeight='semibold'
							lineHeight='22.4px'>
							Дата рождения
						</FormLabel>
						<CustomCalendar register={register} />
					</FormControl>
					<Divider color='#E8EAED' />
					<FormControl
						display='flex'
						justifyContent='space-between'
						gap='24px'
						my='15px'
						position='relative'>
						<FormLabel
							htmlFor='city'
							color='#32353D'
							fontSize='14px'
							ml='12px'
							fontWeight='semibold'
							lineHeight='22.4px'>
							Город
						</FormLabel>
						<Input
							id='city'
							type='text'
							defaultValue={user?.city?.title ? user?.city?.title : ''}
							placeholder='Выберете город'
							maxW='535px'
							fontSize='14px'
							color='#6D7589'
							fontWeight='normal'
							bg='#F4F6FB'
							onFocus={() => setShowCities(city.trim() !== '')}
							value={selectedCityName}
							{...register('city_name', {
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
								right={0}
								top='40px'
								zIndex={100}
								bg='white'
								boxShadow='md'
								border='1px solid'
								borderColor='gray.200'
								borderRadius='md'>
								{cities.data.data.map(city => (
									<ListItem
										w='535px'
										key={city.id}
										fontSize='14px'
										fontWeight='normal'
										cursor='pointer'
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
					</FormControl>
					<Divider color='#E8EAED' />
					<FormControl
						display='flex'
						justifyContent='space-between'
						gap='24px'
						my='15px'
						position='relative'>
						<FormLabel
							htmlFor='address'
							color='#32353D'
							fontSize='14px'
							ml='12px'
							fontWeight='semibold'
							lineHeight='22.4px'>
							Адресс
						</FormLabel>

						<Input
							id='address'
							type='text'
							placeholder='Выберете адресс'
							maxW='535px'
							fontSize='14px'
							color='#6D7589'
							fontWeight='normal'
							bg='#F4F6FB'
							onFocus={() => setShowAddresses(adress.trim() !== '')}
							value={selectedAdressName}
							onChange={e => {
								setSelectedAdressName(e.target.value)
								handleDebouncedSearchAdress(e)
							}}
						/>

						{/* Список адрессов */}
						{addresses && showAddresses && addresses.data.length > 0 && (
							<List
								position='absolute'
								right={0}
								top='40px'
								zIndex={100}
								bg='white'
								boxShadow='md'
								border='1px solid'
								borderColor='gray.200'
								borderRadius='md'>
								{addresses.data.map(item => (
									<ListItem
										key={item.result}
										w='535px'
										fontSize='14px'
										fontWeight='normal'
										cursor='pointer'
										color='#32353D'
										_hover={{ bg: '#E6EFFF' }}
										px={4}
										py={2}
										onClick={() => handleAdressSelect(item.result)}>
										{item.result}
									</ListItem>
								))}
							</List>
						)}
					</FormControl>
					<Divider color='#E8EAED' />
					<FormControl display='flex' justifyContent='space-between' gap='24px' my='15px'>
						<FormLabel
							htmlFor='phoneNumber'
							color='#32353D'
							fontSize='14px'
							ml='12px'
							fontWeight='semibold'
							lineHeight='22.4px'>
							Телефон
						</FormLabel>
						<Input
							id='phone'
							type='tel'
							placeholder='+7'
							maxW='535px'
							fontSize='14px'
							color='#6D7589'
							fontWeight='normal'
							bg='#F4F6FB'
							as={InputMask}
							mask='+7 (999) 999-99-99'
							maskChar='_'
							autoFocus
							{...register('phone')}
						/>
					</FormControl>
				</Flex>
				<Button
					type='submit'
					display='block'
					w='142px'
					h='52px'
					mx='auto'
					mt='32px'
					bg='#3579F3'
					color='white'
					fontSize='16px'
					fontWeight='semibold'
					_hover={{ bg: '#3579F3' }}>
					Сохранить
				</Button>
			</Box>
		</Box>
	)
}

export default PersonalAccounFrom
