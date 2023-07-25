'use client'

import { FC, useState } from 'react'
import PhoneStep from '../Forms/Steps/PhoneStep'
import { useActions } from '@/hooks/useActions'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from '@chakra-ui/react'
import ConfirmCodeStep from '../Forms/Steps/СonfirmCodeStep'
import BasicDataStep from '../Forms/Steps/BasicDataStep'
import SuccessfulRegistrationStep from '../Forms/Steps/SuccessfulRegistrationStep'

const AuthModal: FC = () => {
	// Функции окрытия и закрытия модального окна
	const { onCloseStateModal, onOpenStateModal } = useActions()

	// Состояние модального окна из глобального хранилища
	const { isOpenModal, activeForm } = useAppSelector(state => state.modal)

	// Состояние номер шага формы
	const [currentStep, setCurrentStep] = useState<number>(1)

	// Состояние номера телефона
	const [phoneNumber, setPhoneNumber] = useState<string>('')

	// Состояние кода подтверждения
	const [isConfirmCode, setIsConfirmCode] = useState<string>('1111')

	// Функции открытия и закрытия модального окна из библиотеки chakra ui
	const { isOpen, onOpen, onClose } = useDisclosure()

	// Функция обработчик следующего шага формы
	const handleNextStep = () => {
		setCurrentStep(prev => prev + 1)
	}

	// Функция обработчик предыдущего шага формы
	const handlePrevStep = () => {
		setCurrentStep(prev => prev - 1)
	}

	// Функция обработчик ввода номера телефона
	const handlePhoneNumberChange = (phoneNumber: string) => {
		setPhoneNumber(phoneNumber)
	}

	// Функция обработчик ввода кода подтверждения
	const handleConfirmCode = (confirmCode: string) => {
		setIsConfirmCode(confirmCode)
	}

	// Функция закрытия модального окна
	const onCloseModal = () => {
		onCloseStateModal()
		onClose()
	}

	return (
		<>
			<Modal blockScrollOnMount={false} isOpen={isOpenModal} onClose={onCloseModal}>
				<ModalOverlay />
				<ModalContent w='381px' p='24px'>
					{/* Скрывается, если значение шага равно 4 */}
					{currentStep < 4 && (
						<ModalHeader color='#32353D' display='flex' alignItems='center' p='0'>
							<Heading as='h3' fontSize='18px' fontWeight='semibold' mb='24px'>

								{/* Заголовок модального окна. Содержимое зависит от активного шага */}
								{currentStep < 3 ? 'Вход / Регистрация' : 'Основные данные'}

								<ModalCloseButton top='20px' />
							</Heading>
						</ModalHeader>
					)}

					<ModalBody p='0'>
						{/* Первый шаг с вводом номера телефона */}
						{currentStep === 1 && (
							<PhoneStep
								onNextStep={handleNextStep}
								onSetConfirmCode={handleConfirmCode}
								onPhoneNumberChange={handlePhoneNumberChange}
							/>
						)}

						{/* Второй шаг с вводом кода подтверждения */}
						{currentStep === 2 && (
							<ConfirmCodeStep
								phoneNumber={phoneNumber}
								onNextStep={handleNextStep}
								isConfirmCode={isConfirmCode}
							/>
						)}

						{/* Третий шаг с вводом основных данных */}
						{currentStep === 3 && (
							<BasicDataStep onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
						)}

						{/* Четвертый шаг с успешной регистрацией */}
						{currentStep === 4 && <SuccessfulRegistrationStep />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default AuthModal
