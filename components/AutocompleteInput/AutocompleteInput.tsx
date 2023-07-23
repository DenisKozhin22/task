import { useQuery, QueryFunction, QueryKey } from 'react-query'
import { Input, Box, List, ListItem } from '@chakra-ui/react'
import { useState, useCallback, useEffect } from 'react'

// ...

interface AutocompleteProps<T, TQueryKey extends QueryKey = QueryKey> {
	data: T[] // Массив элементов для отображения в списке
	onSelect: (item: T) => void // Callback при выборе элемента
	renderItem: (item: T) => React.ReactNode // Функция для отображения элемента списка
	searchFunction: QueryFunction<T[], TQueryKey> // Используем QueryFunction для выполнения запроса данных
	queryKey: TQueryKey // Ключ запроса, чтобы различать различные запросы данных в других компонентах
}

const AutocompleteInput = <T extends {}, TQueryKey extends QueryKey = QueryKey>({
	data,
	onSelect,
	renderItem,
	searchFunction,
	queryKey
}: AutocompleteProps<T, TQueryKey>) => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

	const { data: searchResults = [], isLoading } = useQuery<T[], Error, T[], TQueryKey>(
		queryKey, // Используем переданный queryKey для идентификации запроса
		searchFunction, // Используем переданную searchFunction для выполнения запроса
		{
			enabled: false // Отключаем автоматический запуск запроса при монтировании компонента
		}
	)

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value
		setSearchQuery(searchValue)
		setShowSuggestions(true)
	}

	const handleInputClick = () => {
		setShowSuggestions(true)
	}

	const handleItemClick = (item: T) => {
		onSelect(item)
		setSearchQuery(String(item)) // Предполагаем, что item имеет строковое представление для отображения в поле поиска
		setShowSuggestions(false)
	}

	const handleOutsideClick = useCallback((event: MouseEvent) => {
		const target = event.target as HTMLElement
		const isOutside = !target.closest('.autocomplete')
		if (isOutside) {
			setShowSuggestions(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick)
		return () => {
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [handleOutsideClick])

	return (
		<Box className='autocomplete' position='relative'>
			<Input
				type='text'
				value={searchQuery}
				onChange={handleSearchChange}
				onClick={handleInputClick}
				placeholder='Поиск'
			/>
			{isLoading ? <p>Loading...</p> : null}
			{showSuggestions && searchResults.length > 0 && (
				<List
					position='absolute'
					top='100%'
					left={0}
					zIndex={1}
					bg='white'
					boxShadow='md'
					border='1px solid'
					borderColor='gray.200'
					borderRadius='md'>
					{searchResults.map((item, index) => (
						<ListItem
							key={index}
							onClick={() => handleItemClick(item)}
							cursor='pointer'
							_hover={{ bg: 'gray.100' }}
							px={4}
							py={2}>
							{renderItem(item)}
						</ListItem>
					))}
				</List>
			)}
		</Box>
	)
}

export default AutocompleteInput
