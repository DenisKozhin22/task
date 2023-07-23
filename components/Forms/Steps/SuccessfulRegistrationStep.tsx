import { useGetUser } from '@/hooks/Auth/useGetUser'
import { useActions } from '@/hooks/useActions'
import { Box, Button, Flex, Text, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

const SuccessfulRegistrationStep: FC = () => {
	const { onCloseStateModal } = useActions()
	useGetUser()
	return (
		<Box>
			<Flex justifyContent='center' mb='16px'>
				<svg
					width='67'
					height='66'
					viewBox='0 0 67 66'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g filter='url(#filter0_di_1_3012)'>
						<circle cx='33.5' cy='33' r='21.3333' fill='#4BDC3F' />
						<circle cx='33.5' cy='33' r='21.3333' stroke='#4BDC3F' stroke-width='3' />
					</g>
					<path
						d='M26.8334 32.5873L31.9947 37.6667L42.8334 27'
						stroke='white'
						stroke-width='3'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
					<defs>
						<filter
							id='filter0_di_1_3012'
							x='0.666626'
							y='0.166626'
							width='65.6666'
							height='65.6666'
							filterUnits='userSpaceOnUse'
							color-interpolation-filters='sRGB'>
							<feFlood flood-opacity='0' result='BackgroundImageFix' />
							<feColorMatrix
								in='SourceAlpha'
								type='matrix'
								values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
								result='hardAlpha'
							/>
							<feOffset />
							<feGaussianBlur stdDeviation='5' />
							<feComposite in2='hardAlpha' operator='out' />
							<feColorMatrix
								type='matrix'
								values='0 0 0 0 0.248073 0 0 0 0 0.762399 0 0 0 0 0.237577 0 0 0 0.5 0'
							/>
							<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1_3012' />
							<feBlend
								mode='normal'
								in='SourceGraphic'
								in2='effect1_dropShadow_1_3012'
								result='shape'
							/>
							<feColorMatrix
								in='SourceAlpha'
								type='matrix'
								values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
								result='hardAlpha'
							/>
							<feOffset />
							<feGaussianBlur stdDeviation='16.5' />
							<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
							<feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0' />
							<feBlend mode='normal' in2='shape' result='effect2_innerShadow_1_3012' />
						</filter>
					</defs>
				</svg>
			</Flex>
			<Text
				textAlign='center'
				fontWeight='semibold'
				fontSize='18px'
				lineHeight='27px'
				color='#32353D'
				mb='24px'>
				Вы успешно зарегистрировались
			</Text>
			<Text fontWeight='normal' fontSize='14px' lineHeight='22px' color='#32353D' mb='24px'>
				Для более эффективного использования ресурса, рекомендуем заполнить профиль.
			</Text>
			<Link
				as={NextLink}
				href='/user'
				display='block'
				py='13px'
				w='full'
				mx='auto'
				mb='16px'
				bg='#3579F3'
				color='white'
				rounded='md'
				lineHeight='16px'
				textAlign='center'
				_hover={{ bg: '#3579F3' }}>
				Заполнить профиль
			</Link>
			<Button
				w='full'
				mx='auto'
				mb='16px'
				bg='#fff'
				color='#3579F3'
				border='1px solid #3579F3'
				onClick={() => onCloseStateModal()}>
				Пропустить
			</Button>
		</Box>
	)
}

export default SuccessfulRegistrationStep
