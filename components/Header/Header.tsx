import { FC } from 'react'
import NextLink from 'next/link'
import { Avatar, Button, Container, Flex, Link, Text } from '@chakra-ui/react'
import { useActions } from '@/hooks/useActions'
import { useAppSelector } from '@/hooks/useAppSelector'

// Фейк список ссылок в header
const list = ['Пункт 1', 'Пункт 2', 'Пункт 3', 'Пункт 4']

const Header: FC = () => {
	// Функция открытия модального окна авторизации
	const { onOpenStateModal } = useActions()

	// Данные пользователя из глобального хранилища
	const { user } = useAppSelector(state => state.user)

	return (
		<>
			<Flex w='full' h='16' bgColor='#fff'>
				<Container
					maxW='1190px'
					px='10px'
					display='flex'
					justifyContent='space-between'
					alignItems='center'>
					<Flex gap='20px'>
						{/* Рендер фейк ссылок */}
						{list.map(item => (
							<Link
								key={item}
								as={NextLink}
								href='/'
								color='#32353D'
								fontSize='16px'
								fontWeight='semibold'>
								{item}
							</Link>
						))}
					</Flex>

					{/* Если пользователь авторизован, то будет рендерится компонет, который является ссылкой на личный кабинет. Иначе будет рендер компонента кнопки для открытия формы авторизации */}
					{user?.id ? (
						<Link as={NextLink} href='/user' display='flex' alignItems='center' gap='8px'>
							<Avatar
								w='40px'
								h='40px'
								src={
									user?.photo?.startsWith('/media')
										? `http://185.22.61.79:8000${user?.photo}`
										: user?.photo
								}
							/>
							<Text>
								{user.last_name} {user.first_name}
							</Text>
						</Link>
					) : (
						<Button
							color='#3579F3'
							border='1px solid #3579F3'
							rounded='sm'
							bg='transparent'
							_hover={{
								bg: 'transparent'
							}}
							onClick={() => onOpenStateModal()}>
							Войти / Зарегиистрироваться
						</Button>
					)}
				</Container>
			</Flex>
		</>
	)
}

export default Header
