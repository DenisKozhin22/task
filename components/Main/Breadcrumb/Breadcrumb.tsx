import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react'
import { FC } from 'react'

// Фейк массив с хлебными крошками
const list = ['Главная', 'Личный кабинет', 'Настройки аккаунта']

const MyBreadcrumb: FC = () => {
	return (
		<Flex py='37px'>
			<Breadcrumb
				spacing='8px'
				separator={
					<>
						<svg
							width='2'
							height='2'
							viewBox='0 0 2 2'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M0.44443 0.16853C0.608879 0.0586491 0.802219 0 1 0C1.26522 0 1.51957 0.105357 1.70711 0.292893C1.89464 0.48043 2 0.734784 2 1C2 1.19778 1.94135 1.39112 1.83147 1.55557C1.72159 1.72002 1.56541 1.84819 1.38268 1.92388C1.19996 1.99957 0.998891 2.01937 0.80491 1.98079C0.610929 1.9422 0.432746 1.84696 0.292894 1.70711C0.153041 1.56725 0.0578004 1.38907 0.0192152 1.19509C-0.0193701 1.00111 0.000433281 0.800042 0.0761209 0.617316C0.151809 0.43459 0.279981 0.278412 0.44443 0.16853Z'
								fill='#8D94A6'
							/>
						</svg>
					</>
				}>
				{/* Рендер хлебных крошек */}
				{list.map((item, i) => (
					<BreadcrumbItem key={i}>
						<BreadcrumbLink href='#' color='#8D94A6'>
							{item}
						</BreadcrumbLink>
					</BreadcrumbItem>
				))}
			</Breadcrumb>
		</Flex>
	)
}

export default MyBreadcrumb
