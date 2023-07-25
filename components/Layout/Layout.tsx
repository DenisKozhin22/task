'use client'
import { FC, ReactNode } from 'react'
import HeaderTop from '../Header/HeaderTop/HeaderTop'
import Header from '../Header/Header'
import { Box, Container } from '@chakra-ui/react'
import MyBreadcrumb from '../Main/Breadcrumb/Breadcrumb'
import Footer from '../Footer/Footer'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<Box minH='100vh' display='flex' flexDirection='column'>
				<HeaderTop />
				<Header />
				<Container maxW='1190px' px='10px' flex='1'>
					{/* Хлебные крошки. Должны браться из URL */}
					<MyBreadcrumb />

					{/* Дочерний компонет в ayout*/}
					{children}
				</Container>
				<Footer />
			</Box>
		</>
	)
}

export default Layout
