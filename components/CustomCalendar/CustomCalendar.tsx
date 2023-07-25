import { useState, useEffect, ChangeEvent, FC } from 'react'
import {
	Box,
	Button,
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
	InputGroup,
	InputRightElement,
	Text,
	Flex
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import moment from 'moment'

// Интерфейс для пропсов компонента
interface ICustomCalendarProps {
	initialValue?: string // Начальное значение даты в формате "YYYY-MM-DD"
	onChange: (date: string) => void // Callback функция, вызываемая при изменении даты
}

const CustomCalendar: FC<ICustomCalendarProps> = ({ initialValue, onChange }) => {
	// Hook для управления состоянием открытия и закрытия всплывающего окна
	const { isOpen, onOpen, onClose } = useDisclosure()

	// Функция форматирования даты в формате YYYY-MM-DD
	const formattedDate = (date: Date | string | undefined | null) => {
		if (date instanceof Date) {
			return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
				.getDate()
				.toString()
				.padStart(2, '0')}`
		} else if (typeof date === 'string') {
			// const [day, month, year] = date.split('.')
			// return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
			return moment(date).format('YYYY-MM-DD')
		} else {
			return ''
		}
	}

	// Состояние для хранения выбранной даты
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	// Состояния для хранения текущего года и месяца
	const [year, setYear] = useState<number>(
		initialValue ? new Date(initialValue).getFullYear() : new Date().getFullYear()
	)
	const [month, setMonth] = useState<number>(
		initialValue ? new Date(initialValue).getMonth() : new Date().getMonth()
	)

	// Обновляем состояния, если передано начальное значение
	useEffect(() => {
		if (initialValue) {
			setSelectedDate(new Date(initialValue))
			setYear(new Date(initialValue).getFullYear())
			setMonth(new Date(initialValue).getMonth())
			onChange(formattedDate(initialValue))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValue])

	// Обработчик клика по дате в календаре
	const handleDateClick = (date: Date) => {
		setSelectedDate(date)
		if (onChange && date) {
			onChange(formattedDate(date))
		}
	}

	// Обработчики изменения года и месяца в выпадающих списках
	const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setYear(parseInt(event.target.value))
	}

	const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setMonth(parseInt(event.target.value))
	}

	// Обработчик клика по кнопке "ОК" в всплывающем окне
	const handleOKClick = () => {
		if (selectedDate) {
			onClose()
			if (onChange) {
				onChange(formattedDate(selectedDate))
			}
		}
	}

	// Задание текущего и минимального года для выбора в выпадающем списке
	const currentYear = new Date().getFullYear()
	const minYear = 1900

	// Функция форматирования заголовка popup
	const getFormattedDate = (date: Date) => {
		if (date instanceof Date && !isNaN(date.getTime())) {
			const months = [
				'января',
				'февраля',
				'марта',
				'апреля',
				'мая',
				'июня',
				'июля',
				'августа',
				'сентября',
				'октября',
				'ноября',
				'декабря'
			]

			const day = date.getDate()
			const month = months[date.getMonth()]
			const year = date.getFullYear()

			return `${day} ${month} ${year}`
		}

		return ''
	}

	// Функция для отображения дней недели
	const renderWeekdays = () => {
		const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
		return (
			<Box
				display='grid'
				gridTemplateColumns='repeat(7, 1fr)'
				alignContent='center'
				h='27px'
				fontWeight='bold'>
				{weekdays.map((weekday, index) => (
					<Text
						key={index}
						fontSize='12px'
						fontWeight='semibold'
						lineHeight='16.8px'
						maxW='auto'
						height='17px'
						textAlign='center'>
						{weekday}
					</Text>
				))}
			</Box>
		)
	}

	// Функция для отображения дней календаря
	const renderCalendarDays = () => {
		const firstDayOfMonth = new Date(year, month, 1)
		const lastDayOfMonth = new Date(year, month + 1, 0)
		const startDate = new Date(firstDayOfMonth)
		startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay())

		const endDate = new Date(lastDayOfMonth)
		endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()))

		const days = []
		let currentDate = startDate

		while (currentDate <= endDate) {
			days.push(new Date(currentDate))
			currentDate.setDate(currentDate.getDate() + 1)
		}

		return (
			<Box display='grid' gridTemplateColumns='repeat(7, 1fr)' gridGap='4px' my='8px'>
				{days.map((date, index) => {
					const isCurrentMonth = date.getMonth() === month
					const isWeekend = date.getDay() === 5 || date.getDay() === 6
					const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

					if (!isCurrentMonth) {
						return (
							<Button key={index} border='none' size='sm' borderRadius='base' bg='transparent' />
						)
					}

					return (
						<Button
							key={index}
							border='none'
							size='sm'
							borderRadius='base'
							fontSize='14px'
							fontWeight='normal'
							lineHeight='22.4px'
							onClick={() => handleDateClick(date)}
							_hover={{ bg: '' }}
							disabled={!isCurrentMonth || date < firstDayOfMonth || date > lastDayOfMonth}
							bg={isSelected ? '#3579F3' : isWeekend ? 'white' : '#F4F6FB'}
							color={isSelected ? 'white' : isWeekend ? '#A4A9B8' : '#6D7589'}>
							{date.getDate()}
						</Button>
					)
				})}
			</Box>
		)
	}

	return (
		<Box>
			{/* Всплывающее окно для выбора даты */}
			<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
				<PopoverTrigger>
					{/* Поле ввода даты */}
					<InputGroup w='535px'>
						<Input
							id='birthday'
							type='text'
							placeholder='Выберите дату'
							fontSize='14px'
							color='#6D7589 !important'
							fontWeight='normal'
							value={
								selectedDate ? moment(selectedDate).format('DD.MM.YYYY') : '' // Отображение выбранной даты в поле ввода в формате "DD.MM.YYYY"
							}
							readOnly
						/>
						<InputRightElement>
							{/* Иконка для поля ввода */}
							<svg
								width='16'
								height='22'
								viewBox='0 0 16 22'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<mask id='path-1-inside-1_259_1747' fill='white'>
									<path d='M7.99992 15.6667C8.13177 15.6667 8.26067 15.6276 8.3703 15.5543C8.47993 15.481 8.56538 15.3769 8.61584 15.2551C8.6663 15.1333 8.6795 14.9992 8.65378 14.8699C8.62805 14.7406 8.56456 14.6218 8.47132 14.5286C8.37809 14.4353 8.2593 14.3719 8.12998 14.3461C8.00066 14.3204 7.86661 14.3336 7.7448 14.3841C7.62298 14.4345 7.51886 14.52 7.44561 14.6296C7.37235 14.7392 7.33325 14.8681 7.33325 15C7.33325 15.1768 7.40349 15.3464 7.52851 15.4714C7.65354 15.5964 7.82311 15.6667 7.99992 15.6667ZM11.3333 15.6667C11.4651 15.6667 11.594 15.6276 11.7036 15.5543C11.8133 15.481 11.8987 15.3769 11.9492 15.2551C11.9996 15.1333 12.0128 14.9992 11.9871 14.8699C11.9614 14.7406 11.8979 14.6218 11.8047 14.5286C11.7114 14.4353 11.5926 14.3719 11.4633 14.3461C11.334 14.3204 11.1999 14.3336 11.0781 14.3841C10.9563 14.4345 10.8522 14.52 10.7789 14.6296C10.7057 14.7392 10.6666 14.8681 10.6666 15C10.6666 15.1768 10.7368 15.3464 10.8618 15.4714C10.9869 15.5964 11.1564 15.6667 11.3333 15.6667ZM11.3333 13C11.4651 13 11.594 12.9609 11.7036 12.8876C11.8133 12.8144 11.8987 12.7103 11.9492 12.5884C11.9996 12.4666 12.0128 12.3326 11.9871 12.2033C11.9614 12.0739 11.8979 11.9552 11.8047 11.8619C11.7114 11.7687 11.5926 11.7052 11.4633 11.6795C11.334 11.6537 11.1999 11.6669 11.0781 11.7174C10.9563 11.7679 10.8522 11.8533 10.7789 11.9629C10.7057 12.0726 10.6666 12.2015 10.6666 12.3333C10.6666 12.5101 10.7368 12.6797 10.8618 12.8047C10.9869 12.9298 11.1564 13 11.3333 13ZM7.99992 13C8.13177 13 8.26067 12.9609 8.3703 12.8876C8.47993 12.8144 8.56538 12.7103 8.61584 12.5884C8.6663 12.4666 8.6795 12.3326 8.65378 12.2033C8.62805 12.0739 8.56456 11.9552 8.47132 11.8619C8.37809 11.7687 8.2593 11.7052 8.12998 11.6795C8.00066 11.6537 7.86661 11.6669 7.7448 11.7174C7.62298 11.7679 7.51886 11.8533 7.44561 11.9629C7.37235 12.0726 7.33325 12.2015 7.33325 12.3333C7.33325 12.5101 7.40349 12.6797 7.52851 12.8047C7.65354 12.9298 7.82311 13 7.99992 13ZM12.6666 4.99999H11.9999V4.33332C11.9999 4.15651 11.9297 3.98694 11.8047 3.86192C11.6796 3.73689 11.5101 3.66666 11.3333 3.66666C11.1564 3.66666 10.9869 3.73689 10.8618 3.86192C10.7368 3.98694 10.6666 4.15651 10.6666 4.33332V4.99999H5.33325V4.33332C5.33325 4.15651 5.26301 3.98694 5.13799 3.86192C5.01297 3.73689 4.8434 3.66666 4.66659 3.66666C4.48977 3.66666 4.32021 3.73689 4.19518 3.86192C4.07016 3.98694 3.99992 4.15651 3.99992 4.33332V4.99999H3.33325C2.80282 4.99999 2.29411 5.2107 1.91904 5.58578C1.54397 5.96085 1.33325 6.46956 1.33325 6.99999V16.3333C1.33325 16.8638 1.54397 17.3725 1.91904 17.7475C2.29411 18.1226 2.80282 18.3333 3.33325 18.3333H12.6666C13.197 18.3333 13.7057 18.1226 14.0808 17.7475C14.4559 17.3725 14.6666 16.8638 14.6666 16.3333V6.99999C14.6666 6.46956 14.4559 5.96085 14.0808 5.58578C13.7057 5.2107 13.197 4.99999 12.6666 4.99999ZM13.3333 16.3333C13.3333 16.5101 13.263 16.6797 13.138 16.8047C13.013 16.9298 12.8434 17 12.6666 17H3.33325C3.15644 17 2.98687 16.9298 2.86185 16.8047C2.73682 16.6797 2.66659 16.5101 2.66659 16.3333V10.3333H13.3333V16.3333ZM13.3333 8.99999H2.66659V6.99999C2.66659 6.82318 2.73682 6.65361 2.86185 6.52859C2.98687 6.40356 3.15644 6.33332 3.33325 6.33332H3.99992V6.99999C3.99992 7.1768 4.07016 7.34637 4.19518 7.47139C4.32021 7.59642 4.48977 7.66666 4.66659 7.66666C4.8434 7.66666 5.01297 7.59642 5.13799 7.47139C5.26301 7.34637 5.33325 7.1768 5.33325 6.99999V6.33332H10.6666V6.99999C10.6666 7.1768 10.7368 7.34637 10.8618 7.47139C10.9869 7.59642 11.1564 7.66666 11.3333 7.66666C11.5101 7.66666 11.6796 7.59642 11.8047 7.47139C11.9297 7.34637 11.9999 7.1768 11.9999 6.99999V6.33332H12.6666C12.8434 6.33332 13.013 6.40356 13.138 6.52859C13.263 6.65361 13.3333 6.82318 13.3333 6.99999V8.99999ZM4.66659 13C4.79844 13 4.92733 12.9609 5.03697 12.8876C5.1466 12.8144 5.23205 12.7103 5.28251 12.5884C5.33296 12.4666 5.34617 12.3326 5.32044 12.2033C5.29472 12.0739 5.23122 11.9552 5.13799 11.8619C5.04475 11.7687 4.92597 11.7052 4.79665 11.6795C4.66733 11.6537 4.53328 11.6669 4.41146 11.7174C4.28965 11.7679 4.18553 11.8533 4.11227 11.9629C4.03902 12.0726 3.99992 12.2015 3.99992 12.3333C3.99992 12.5101 4.07016 12.6797 4.19518 12.8047C4.32021 12.9298 4.48977 13 4.66659 13ZM4.66659 15.6667C4.79844 15.6667 4.92733 15.6276 5.03697 15.5543C5.1466 15.481 5.23205 15.3769 5.28251 15.2551C5.33296 15.1333 5.34617 14.9992 5.32044 14.8699C5.29472 14.7406 5.23122 14.6218 5.13799 14.5286C5.04475 14.4353 4.92597 14.3719 4.79665 14.3461C4.66733 14.3204 4.53328 14.3336 4.41146 14.3841C4.28965 14.4345 4.18553 14.52 4.11227 14.6296C4.03902 14.7392 3.99992 14.8681 3.99992 15C3.99992 15.1768 4.07016 15.3464 4.19518 15.4714C4.32021 15.5964 4.48977 15.6667 4.66659 15.6667Z' />
								</mask>
								<path
									d='M7.99992 15.6667C8.13177 15.6667 8.26067 15.6276 8.3703 15.5543C8.47993 15.481 8.56538 15.3769 8.61584 15.2551C8.6663 15.1333 8.6795 14.9992 8.65378 14.8699C8.62805 14.7406 8.56456 14.6218 8.47132 14.5286C8.37809 14.4353 8.2593 14.3719 8.12998 14.3461C8.00066 14.3204 7.86661 14.3336 7.7448 14.3841C7.62298 14.4345 7.51886 14.52 7.44561 14.6296C7.37235 14.7392 7.33325 14.8681 7.33325 15C7.33325 15.1768 7.40349 15.3464 7.52851 15.4714C7.65354 15.5964 7.82311 15.6667 7.99992 15.6667ZM11.3333 15.6667C11.4651 15.6667 11.594 15.6276 11.7036 15.5543C11.8133 15.481 11.8987 15.3769 11.9492 15.2551C11.9996 15.1333 12.0128 14.9992 11.9871 14.8699C11.9614 14.7406 11.8979 14.6218 11.8047 14.5286C11.7114 14.4353 11.5926 14.3719 11.4633 14.3461C11.334 14.3204 11.1999 14.3336 11.0781 14.3841C10.9563 14.4345 10.8522 14.52 10.7789 14.6296C10.7057 14.7392 10.6666 14.8681 10.6666 15C10.6666 15.1768 10.7368 15.3464 10.8618 15.4714C10.9869 15.5964 11.1564 15.6667 11.3333 15.6667ZM11.3333 13C11.4651 13 11.594 12.9609 11.7036 12.8876C11.8133 12.8144 11.8987 12.7103 11.9492 12.5884C11.9996 12.4666 12.0128 12.3326 11.9871 12.2033C11.9614 12.0739 11.8979 11.9552 11.8047 11.8619C11.7114 11.7687 11.5926 11.7052 11.4633 11.6795C11.334 11.6537 11.1999 11.6669 11.0781 11.7174C10.9563 11.7679 10.8522 11.8533 10.7789 11.9629C10.7057 12.0726 10.6666 12.2015 10.6666 12.3333C10.6666 12.5101 10.7368 12.6797 10.8618 12.8047C10.9869 12.9298 11.1564 13 11.3333 13ZM7.99992 13C8.13177 13 8.26067 12.9609 8.3703 12.8876C8.47993 12.8144 8.56538 12.7103 8.61584 12.5884C8.6663 12.4666 8.6795 12.3326 8.65378 12.2033C8.62805 12.0739 8.56456 11.9552 8.47132 11.8619C8.37809 11.7687 8.2593 11.7052 8.12998 11.6795C8.00066 11.6537 7.86661 11.6669 7.7448 11.7174C7.62298 11.7679 7.51886 11.8533 7.44561 11.9629C7.37235 12.0726 7.33325 12.2015 7.33325 12.3333C7.33325 12.5101 7.40349 12.6797 7.52851 12.8047C7.65354 12.9298 7.82311 13 7.99992 13ZM12.6666 4.99999H11.9999V4.33332C11.9999 4.15651 11.9297 3.98694 11.8047 3.86192C11.6796 3.73689 11.5101 3.66666 11.3333 3.66666C11.1564 3.66666 10.9869 3.73689 10.8618 3.86192C10.7368 3.98694 10.6666 4.15651 10.6666 4.33332V4.99999H5.33325V4.33332C5.33325 4.15651 5.26301 3.98694 5.13799 3.86192C5.01297 3.73689 4.8434 3.66666 4.66659 3.66666C4.48977 3.66666 4.32021 3.73689 4.19518 3.86192C4.07016 3.98694 3.99992 4.15651 3.99992 4.33332V4.99999H3.33325C2.80282 4.99999 2.29411 5.2107 1.91904 5.58578C1.54397 5.96085 1.33325 6.46956 1.33325 6.99999V16.3333C1.33325 16.8638 1.54397 17.3725 1.91904 17.7475C2.29411 18.1226 2.80282 18.3333 3.33325 18.3333H12.6666C13.197 18.3333 13.7057 18.1226 14.0808 17.7475C14.4559 17.3725 14.6666 16.8638 14.6666 16.3333V6.99999C14.6666 6.46956 14.4559 5.96085 14.0808 5.58578C13.7057 5.2107 13.197 4.99999 12.6666 4.99999ZM13.3333 16.3333C13.3333 16.5101 13.263 16.6797 13.138 16.8047C13.013 16.9298 12.8434 17 12.6666 17H3.33325C3.15644 17 2.98687 16.9298 2.86185 16.8047C2.73682 16.6797 2.66659 16.5101 2.66659 16.3333V10.3333H13.3333V16.3333ZM13.3333 8.99999H2.66659V6.99999C2.66659 6.82318 2.73682 6.65361 2.86185 6.52859C2.98687 6.40356 3.15644 6.33332 3.33325 6.33332H3.99992V6.99999C3.99992 7.1768 4.07016 7.34637 4.19518 7.47139C4.32021 7.59642 4.48977 7.66666 4.66659 7.66666C4.8434 7.66666 5.01297 7.59642 5.13799 7.47139C5.26301 7.34637 5.33325 7.1768 5.33325 6.99999V6.33332H10.6666V6.99999C10.6666 7.1768 10.7368 7.34637 10.8618 7.47139C10.9869 7.59642 11.1564 7.66666 11.3333 7.66666C11.5101 7.66666 11.6796 7.59642 11.8047 7.47139C11.9297 7.34637 11.9999 7.1768 11.9999 6.99999V6.33332H12.6666C12.8434 6.33332 13.013 6.40356 13.138 6.52859C13.263 6.65361 13.3333 6.82318 13.3333 6.99999V8.99999ZM4.66659 13C4.79844 13 4.92733 12.9609 5.03697 12.8876C5.1466 12.8144 5.23205 12.7103 5.28251 12.5884C5.33296 12.4666 5.34617 12.3326 5.32044 12.2033C5.29472 12.0739 5.23122 11.9552 5.13799 11.8619C5.04475 11.7687 4.92597 11.7052 4.79665 11.6795C4.66733 11.6537 4.53328 11.6669 4.41146 11.7174C4.28965 11.7679 4.18553 11.8533 4.11227 11.9629C4.03902 12.0726 3.99992 12.2015 3.99992 12.3333C3.99992 12.5101 4.07016 12.6797 4.19518 12.8047C4.32021 12.9298 4.48977 13 4.66659 13ZM4.66659 15.6667C4.79844 15.6667 4.92733 15.6276 5.03697 15.5543C5.1466 15.481 5.23205 15.3769 5.28251 15.2551C5.33296 15.1333 5.34617 14.9992 5.32044 14.8699C5.29472 14.7406 5.23122 14.6218 5.13799 14.5286C5.04475 14.4353 4.92597 14.3719 4.79665 14.3461C4.66733 14.3204 4.53328 14.3336 4.41146 14.3841C4.28965 14.4345 4.18553 14.52 4.11227 14.6296C4.03902 14.7392 3.99992 14.8681 3.99992 15C3.99992 15.1768 4.07016 15.3464 4.19518 15.4714C4.32021 15.5964 4.48977 15.6667 4.66659 15.6667Z'
									stroke='#3579F3'
									strokeWidth='2'
									mask='url(#path-1-inside-1_259_1747)'
								/>
							</svg>
						</InputRightElement>
					</InputGroup>
				</PopoverTrigger>
				<PopoverContent p='15px'>
					{/* Заголовок всплывающего окна */}
					<PopoverHeader textAlign='center' border='none' p='0'>
						<Heading
							fontSize='18px'
							fontWeight='semibold'
							color='#32353D'
							lineHeight='26px'
							my='5px'>
							{selectedDate ? getFormattedDate(selectedDate) : 'Выберете дату'}
						</Heading>
					</PopoverHeader>
					<PopoverBody p='0'>
						<Box>
							<Flex gap='5px' my='8px'>
								{/* Выбор года */}
								<Select
									mb='4px'
									onChange={handleYearChange}
									value={year}
									bg='#F4F6FB'
									color='#32353D'
									fontSize='14px'
									fontWeight='normal'
									_hover={{ bg: '#E9EBF0' }}
									icon={<ChevronDownIcon color='#3579F3 !important' />}>
									{Array.from({ length: currentYear - minYear + 1 }, (_, index) => {
										const yearOption = currentYear - index
										return (
											<option key={yearOption} value={yearOption}>
												{yearOption}
											</option>
										)
									})}
								</Select>
								{/* Выбор месяца */}
								<Select
									onChange={handleMonthChange}
									value={month}
									bg='#F4F6FB'
									color='#32353D'
									fontSize='14px'
									fontWeight='normal'
									_hover={{ bg: '#E9EBF0' }}
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
							</Flex>
							{/* Календарь с днями месяца */}
							{renderWeekdays()}
							{renderCalendarDays()}
						</Box>
					</PopoverBody>
					<PopoverFooter display='flex' justifyContent='center' border='none' p='0'>
						{/* Кнопка "ОК" для выбора даты */}
						<Button
							fontSize='14px'
							fontWeight='semibold'
							lineHeight='16.1px'
							onClick={handleOKClick}
							w='full'
							mx='auto'
							bg='#3579F3'
							color='white'
							_hover={{ bg: '#3579F3' }}>
							ОК
						</Button>
					</PopoverFooter>
				</PopoverContent>
			</Popover>
		</Box>
	)
}

export default CustomCalendar
