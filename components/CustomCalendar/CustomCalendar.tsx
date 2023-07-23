import React, { useState } from 'react'
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Icon,
	Input,
	Select,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	useDisclosure,
	Heading,
	Flex,
	InputGroup,
	InputRightElement
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { IPersonalAccounFrom } from '../Main/PersonalAccountSection/PersonalAccounFrom/PersonalAccounFrom'
import { useAppSelector } from '@/hooks/useAppSelector'
import moment from 'moment'
interface Props {
	register: UseFormRegister<IPersonalAccounFrom>
	registerOptions?: RegisterOptions
}

const CustomCalendar: React.FC<Props> = ({ register, registerOptions }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [year, setYear] = useState<number>(new Date().getFullYear())
	const [month, setMonth] = useState<number>(new Date().getMonth())

	const { user } = useAppSelector(state => state.user)
	const handleDateClick = (date: Date) => {
		setSelectedDate(date)
		onClose()
	}

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setYear(parseInt(event.target.value))
	}

	const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setMonth(parseInt(event.target.value))
	}

	const handleOKClick = () => {
		if (selectedDate) {
			const formattedDate = selectedDate.toLocaleDateString('ru-RU', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})

			onClose()
		}
	}

	const renderWeekdays = () => {
		const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
		return (
			<Box display='grid' gridTemplateColumns='repeat(7, 1fr)' fontWeight='bold' mb={2}>
				{weekdays.map((weekday, index) => (
					<Box key={index} maxW='44px' height='17px' textAlign='center'>
						{weekday}
					</Box>
				))}
			</Box>
		)
	}

	const renderCalendarDays = () => {
		const firstDayOfMonth = new Date(year, month, 1)
		const lastDayOfMonth = new Date(year, month + 1, 0)
		const startDate = new Date(firstDayOfMonth)
		startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay())

		const endDate = new Date(lastDayOfMonth)
		endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()))

		const days: Date[] = []
		let currentDate = startDate

		while (currentDate <= endDate) {
			days.push(new Date(currentDate))
			currentDate.setDate(currentDate.getDate() + 1)
		}

		return (
			<Box display='grid' gridTemplateColumns='repeat(7, 1fr)' gridGap='2px'>
				{days.map((date, index) => (
					<Button
						key={index}
						border='none'
						size='sm'
						borderRadius='base'
						onClick={() => handleDateClick(date)}
						disabled={date < firstDayOfMonth || date > lastDayOfMonth}
						bg={
							date.getMonth() !== month
								? '#FFFFFF'
								: selectedDate && date.toDateString() === selectedDate.toDateString()
								? '#3579F3'
								: '#F4F6FB'
						}
						color={
							selectedDate && date.toDateString() === selectedDate.toDateString() ? 'white' : ''
						}>
						{date.getDate()}
					</Button>
				))}
			</Box>
		)
	}

	const currentYear = new Date().getFullYear()
	const minYear = 1900

	return (
		<Box>
			<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
				<PopoverTrigger>
					<InputGroup w='535px'>
						<Input
							id='birthday'
							type='text'
							placeholder='Выберите дату'
							fontSize='14px'
							color='#6D7589 !important'
							fontWeight='normal'
							bg='#F4F6FB'
							value={
								selectedDate
									? selectedDate.toLocaleDateString('ru-RU')
									: moment(user?.birthday).format('YYYY.MM.DD')
							}
							readOnly
							{...register('birthday')}
						/>
						<InputRightElement>
							<svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<mask id='path-1-inside-1_259_1748' fill='white'>
									<path d='M7.99992 12.6667C8.13177 12.6667 8.26067 12.6276 8.3703 12.5543C8.47993 12.481 8.56538 12.3769 8.61584 12.2551C8.6663 12.1333 8.6795 11.9992 8.65378 11.8699C8.62805 11.7406 8.56456 11.6218 8.47132 11.5286C8.37809 11.4353 8.2593 11.3719 8.12998 11.3461C8.00066 11.3204 7.86661 11.3336 7.7448 11.3841C7.62298 11.4345 7.51886 11.52 7.44561 11.6296C7.37235 11.7392 7.33325 11.8681 7.33325 12C7.33325 12.1768 7.40349 12.3464 7.52851 12.4714C7.65354 12.5964 7.82311 12.6667 7.99992 12.6667ZM11.3333 12.6667C11.4651 12.6667 11.594 12.6276 11.7036 12.5543C11.8133 12.481 11.8987 12.3769 11.9492 12.2551C11.9996 12.1333 12.0128 11.9992 11.9871 11.8699C11.9614 11.7406 11.8979 11.6218 11.8047 11.5286C11.7114 11.4353 11.5926 11.3719 11.4633 11.3461C11.334 11.3204 11.1999 11.3336 11.0781 11.3841C10.9563 11.4345 10.8522 11.52 10.7789 11.6296C10.7057 11.7392 10.6666 11.8681 10.6666 12C10.6666 12.1768 10.7368 12.3464 10.8618 12.4714C10.9869 12.5964 11.1564 12.6667 11.3333 12.6667ZM11.3333 9.99999C11.4651 9.99999 11.594 9.96089 11.7036 9.88764C11.8133 9.81438 11.8987 9.71026 11.9492 9.58844C11.9996 9.46663 12.0128 9.33258 11.9871 9.20326C11.9614 9.07394 11.8979 8.95515 11.8047 8.86192C11.7114 8.76868 11.5926 8.70519 11.4633 8.67947C11.334 8.65374 11.1999 8.66694 11.0781 8.7174C10.9563 8.76786 10.8522 8.85331 10.7789 8.96294C10.7057 9.07257 10.6666 9.20147 10.6666 9.33332C10.6666 9.51013 10.7368 9.6797 10.8618 9.80473C10.9869 9.92975 11.1564 9.99999 11.3333 9.99999ZM7.99992 9.99999C8.13177 9.99999 8.26067 9.96089 8.3703 9.88764C8.47993 9.81438 8.56538 9.71026 8.61584 9.58844C8.6663 9.46663 8.6795 9.33258 8.65378 9.20326C8.62805 9.07394 8.56456 8.95515 8.47132 8.86192C8.37809 8.76868 8.2593 8.70519 8.12998 8.67947C8.00066 8.65374 7.86661 8.66694 7.7448 8.7174C7.62298 8.76786 7.51886 8.85331 7.44561 8.96294C7.37235 9.07257 7.33325 9.20147 7.33325 9.33332C7.33325 9.51013 7.40349 9.6797 7.52851 9.80473C7.65354 9.92975 7.82311 9.99999 7.99992 9.99999ZM12.6666 1.99999H11.9999V1.33332C11.9999 1.15651 11.9297 0.986943 11.8047 0.861919C11.6796 0.736894 11.5101 0.666656 11.3333 0.666656C11.1564 0.666656 10.9869 0.736894 10.8618 0.861919C10.7368 0.986943 10.6666 1.15651 10.6666 1.33332V1.99999H5.33325V1.33332C5.33325 1.15651 5.26301 0.986943 5.13799 0.861919C5.01297 0.736894 4.8434 0.666656 4.66659 0.666656C4.48977 0.666656 4.32021 0.736894 4.19518 0.861919C4.07016 0.986943 3.99992 1.15651 3.99992 1.33332V1.99999H3.33325C2.80282 1.99999 2.29411 2.2107 1.91904 2.58578C1.54397 2.96085 1.33325 3.46956 1.33325 3.99999V13.3333C1.33325 13.8638 1.54397 14.3725 1.91904 14.7475C2.29411 15.1226 2.80282 15.3333 3.33325 15.3333H12.6666C13.197 15.3333 13.7057 15.1226 14.0808 14.7475C14.4559 14.3725 14.6666 13.8638 14.6666 13.3333V3.99999C14.6666 3.46956 14.4559 2.96085 14.0808 2.58578C13.7057 2.2107 13.197 1.99999 12.6666 1.99999ZM13.3333 13.3333C13.3333 13.5101 13.263 13.6797 13.138 13.8047C13.013 13.9298 12.8434 14 12.6666 14H3.33325C3.15644 14 2.98687 13.9298 2.86185 13.8047C2.73682 13.6797 2.66659 13.5101 2.66659 13.3333V7.33332H13.3333V13.3333ZM13.3333 5.99999H2.66659V3.99999C2.66659 3.82318 2.73682 3.65361 2.86185 3.52859C2.98687 3.40356 3.15644 3.33332 3.33325 3.33332H3.99992V3.99999C3.99992 4.1768 4.07016 4.34637 4.19518 4.47139C4.32021 4.59642 4.48977 4.66666 4.66659 4.66666C4.8434 4.66666 5.01297 4.59642 5.13799 4.47139C5.26301 4.34637 5.33325 4.1768 5.33325 3.99999V3.33332H10.6666V3.99999C10.6666 4.1768 10.7368 4.34637 10.8618 4.47139C10.9869 4.59642 11.1564 4.66666 11.3333 4.66666C11.5101 4.66666 11.6796 4.59642 11.8047 4.47139C11.9297 4.34637 11.9999 4.1768 11.9999 3.99999V3.33332H12.6666C12.8434 3.33332 13.013 3.40356 13.138 3.52859C13.263 3.65361 13.3333 3.82318 13.3333 3.99999V5.99999ZM4.66659 9.99999C4.79844 9.99999 4.92733 9.96089 5.03697 9.88764C5.1466 9.81438 5.23205 9.71026 5.28251 9.58844C5.33296 9.46663 5.34617 9.33258 5.32044 9.20326C5.29472 9.07394 5.23122 8.95515 5.13799 8.86192C5.04475 8.76868 4.92597 8.70519 4.79665 8.67947C4.66733 8.65374 4.53328 8.66694 4.41146 8.7174C4.28965 8.76786 4.18553 8.85331 4.11227 8.96294C4.03902 9.07257 3.99992 9.20147 3.99992 9.33332C3.99992 9.51013 4.07016 9.6797 4.19518 9.80473C4.32021 9.92975 4.48977 9.99999 4.66659 9.99999ZM4.66659 12.6667C4.79844 12.6667 4.92733 12.6276 5.03697 12.5543C5.1466 12.481 5.23205 12.3769 5.28251 12.2551C5.33296 12.1333 5.34617 11.9992 5.32044 11.8699C5.29472 11.7406 5.23122 11.6218 5.13799 11.5286C5.04475 11.4353 4.92597 11.3719 4.79665 11.3461C4.66733 11.3204 4.53328 11.3336 4.41146 11.3841C4.28965 11.4345 4.18553 11.52 4.11227 11.6296C4.03902 11.7392 3.99992 11.8681 3.99992 12C3.99992 12.1768 4.07016 12.3464 4.19518 12.4714C4.32021 12.5964 4.48977 12.6667 4.66659 12.6667Z' />
								</mask>
								<path
									d='M7.99992 12.6667C8.13177 12.6667 8.26067 12.6276 8.3703 12.5543C8.47993 12.481 8.56538 12.3769 8.61584 12.2551C8.6663 12.1333 8.6795 11.9992 8.65378 11.8699C8.62805 11.7406 8.56456 11.6218 8.47132 11.5286C8.37809 11.4353 8.2593 11.3719 8.12998 11.3461C8.00066 11.3204 7.86661 11.3336 7.7448 11.3841C7.62298 11.4345 7.51886 11.52 7.44561 11.6296C7.37235 11.7392 7.33325 11.8681 7.33325 12C7.33325 12.1768 7.40349 12.3464 7.52851 12.4714C7.65354 12.5964 7.82311 12.6667 7.99992 12.6667ZM11.3333 12.6667C11.4651 12.6667 11.594 12.6276 11.7036 12.5543C11.8133 12.481 11.8987 12.3769 11.9492 12.2551C11.9996 12.1333 12.0128 11.9992 11.9871 11.8699C11.9614 11.7406 11.8979 11.6218 11.8047 11.5286C11.7114 11.4353 11.5926 11.3719 11.4633 11.3461C11.334 11.3204 11.1999 11.3336 11.0781 11.3841C10.9563 11.4345 10.8522 11.52 10.7789 11.6296C10.7057 11.7392 10.6666 11.8681 10.6666 12C10.6666 12.1768 10.7368 12.3464 10.8618 12.4714C10.9869 12.5964 11.1564 12.6667 11.3333 12.6667ZM11.3333 9.99999C11.4651 9.99999 11.594 9.96089 11.7036 9.88764C11.8133 9.81438 11.8987 9.71026 11.9492 9.58844C11.9996 9.46663 12.0128 9.33258 11.9871 9.20326C11.9614 9.07394 11.8979 8.95515 11.8047 8.86192C11.7114 8.76868 11.5926 8.70519 11.4633 8.67947C11.334 8.65374 11.1999 8.66694 11.0781 8.7174C10.9563 8.76786 10.8522 8.85331 10.7789 8.96294C10.7057 9.07257 10.6666 9.20147 10.6666 9.33332C10.6666 9.51013 10.7368 9.6797 10.8618 9.80473C10.9869 9.92975 11.1564 9.99999 11.3333 9.99999ZM7.99992 9.99999C8.13177 9.99999 8.26067 9.96089 8.3703 9.88764C8.47993 9.81438 8.56538 9.71026 8.61584 9.58844C8.6663 9.46663 8.6795 9.33258 8.65378 9.20326C8.62805 9.07394 8.56456 8.95515 8.47132 8.86192C8.37809 8.76868 8.2593 8.70519 8.12998 8.67947C8.00066 8.65374 7.86661 8.66694 7.7448 8.7174C7.62298 8.76786 7.51886 8.85331 7.44561 8.96294C7.37235 9.07257 7.33325 9.20147 7.33325 9.33332C7.33325 9.51013 7.40349 9.6797 7.52851 9.80473C7.65354 9.92975 7.82311 9.99999 7.99992 9.99999ZM12.6666 1.99999H11.9999V1.33332C11.9999 1.15651 11.9297 0.986943 11.8047 0.861919C11.6796 0.736894 11.5101 0.666656 11.3333 0.666656C11.1564 0.666656 10.9869 0.736894 10.8618 0.861919C10.7368 0.986943 10.6666 1.15651 10.6666 1.33332V1.99999H5.33325V1.33332C5.33325 1.15651 5.26301 0.986943 5.13799 0.861919C5.01297 0.736894 4.8434 0.666656 4.66659 0.666656C4.48977 0.666656 4.32021 0.736894 4.19518 0.861919C4.07016 0.986943 3.99992 1.15651 3.99992 1.33332V1.99999H3.33325C2.80282 1.99999 2.29411 2.2107 1.91904 2.58578C1.54397 2.96085 1.33325 3.46956 1.33325 3.99999V13.3333C1.33325 13.8638 1.54397 14.3725 1.91904 14.7475C2.29411 15.1226 2.80282 15.3333 3.33325 15.3333H12.6666C13.197 15.3333 13.7057 15.1226 14.0808 14.7475C14.4559 14.3725 14.6666 13.8638 14.6666 13.3333V3.99999C14.6666 3.46956 14.4559 2.96085 14.0808 2.58578C13.7057 2.2107 13.197 1.99999 12.6666 1.99999ZM13.3333 13.3333C13.3333 13.5101 13.263 13.6797 13.138 13.8047C13.013 13.9298 12.8434 14 12.6666 14H3.33325C3.15644 14 2.98687 13.9298 2.86185 13.8047C2.73682 13.6797 2.66659 13.5101 2.66659 13.3333V7.33332H13.3333V13.3333ZM13.3333 5.99999H2.66659V3.99999C2.66659 3.82318 2.73682 3.65361 2.86185 3.52859C2.98687 3.40356 3.15644 3.33332 3.33325 3.33332H3.99992V3.99999C3.99992 4.1768 4.07016 4.34637 4.19518 4.47139C4.32021 4.59642 4.48977 4.66666 4.66659 4.66666C4.8434 4.66666 5.01297 4.59642 5.13799 4.47139C5.26301 4.34637 5.33325 4.1768 5.33325 3.99999V3.33332H10.6666V3.99999C10.6666 4.1768 10.7368 4.34637 10.8618 4.47139C10.9869 4.59642 11.1564 4.66666 11.3333 4.66666C11.5101 4.66666 11.6796 4.59642 11.8047 4.47139C11.9297 4.34637 11.9999 4.1768 11.9999 3.99999V3.33332H12.6666C12.8434 3.33332 13.013 3.40356 13.138 3.52859C13.263 3.65361 13.3333 3.82318 13.3333 3.99999V5.99999ZM4.66659 9.99999C4.79844 9.99999 4.92733 9.96089 5.03697 9.88764C5.1466 9.81438 5.23205 9.71026 5.28251 9.58844C5.33296 9.46663 5.34617 9.33258 5.32044 9.20326C5.29472 9.07394 5.23122 8.95515 5.13799 8.86192C5.04475 8.76868 4.92597 8.70519 4.79665 8.67947C4.66733 8.65374 4.53328 8.66694 4.41146 8.7174C4.28965 8.76786 4.18553 8.85331 4.11227 8.96294C4.03902 9.07257 3.99992 9.20147 3.99992 9.33332C3.99992 9.51013 4.07016 9.6797 4.19518 9.80473C4.32021 9.92975 4.48977 9.99999 4.66659 9.99999ZM4.66659 12.6667C4.79844 12.6667 4.92733 12.6276 5.03697 12.5543C5.1466 12.481 5.23205 12.3769 5.28251 12.2551C5.33296 12.1333 5.34617 11.9992 5.32044 11.8699C5.29472 11.7406 5.23122 11.6218 5.13799 11.5286C5.04475 11.4353 4.92597 11.3719 4.79665 11.3461C4.66733 11.3204 4.53328 11.3336 4.41146 11.3841C4.28965 11.4345 4.18553 11.52 4.11227 11.6296C4.03902 11.7392 3.99992 11.8681 3.99992 12C3.99992 12.1768 4.07016 12.3464 4.19518 12.4714C4.32021 12.5964 4.48977 12.6667 4.66659 12.6667Z'
									stroke='#3579F3'
									stroke-width='2'
									mask='url(#path-1-inside-1_259_1748)'
								/>
							</svg>
						</InputRightElement>
					</InputGroup>
				</PopoverTrigger>
				<PopoverContent p='15px' w='343px'>
					<PopoverHeader p='0' mb='8px' border='none'>
						<Box display='flex' justifyContent='space-between'>
							<Heading
								textAlign='center'
								fontSize='18px'
								lineHeight='26.1px'
								fontWeight='semibold'
								mx='auto'
								color='#32353D'>
								{selectedDate
									? selectedDate.toLocaleDateString('ru-RU', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
									  })
									: `${new Date(year, month).toLocaleDateString('ru-RU', {
											month: '2-digit'
									  })}.${year}`}
							</Heading>
						</Box>
					</PopoverHeader>
					<PopoverBody>
						<Flex gap='5px'>
							<FormControl mb={2}>
								<Select
									fontSize='14px'
									color='#32353D'
									fontWeight='normal'
									bg='#F4F6FB'
									value={month}
									onChange={handleMonthChange}
									icon={<ChevronDownIcon color='#3579F3 !important' />}>
									<option value={0}>Январь</option>
									<option value={1}>Февраль</option>
									<option value={2}>Март</option>
									<option value={3}>Апрель</option>
									<option value={4}>Май</option>
									<option value={5}>Июнь</option>
									<option value={6}>Июль</option>
									<option value={7}>Август</option>
									<option value={8}>Сентябрь</option>
									<option value={9}>Октябрь</option>
									<option value={10}>Ноябрь</option>
									<option value={11}>Декабрь</option>
								</Select>
							</FormControl>
							<FormControl>
								<Select
									fontSize='14px'
									color='#32353D'
									fontWeight='normal'
									bg='#F4F6FB'
									value={year}
									onChange={handleYearChange}
									icon={<ChevronDownIcon color='#3579F3 !important' />}>
									{Array.from({ length: currentYear - minYear + 1 }, (_, index) => (
										<option key={index} value={minYear + index}>
											{minYear + index}
										</option>
									))}
								</Select>
							</FormControl>
						</Flex>
						{renderWeekdays()}
						{renderCalendarDays()}
					</PopoverBody>
					<PopoverFooter border='none' py='none'>
						<Button
							w='full'
							mx='auto'
							bg='#3579F3'
							color='white'
							_hover={{ bg: '#3579F3' }}
							onClick={handleOKClick}
							disabled={!selectedDate}>
							Ок
						</Button>
					</PopoverFooter>
				</PopoverContent>
			</Popover>
		</Box>
	)
}

export default CustomCalendar