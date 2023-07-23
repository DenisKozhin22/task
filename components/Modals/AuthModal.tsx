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
	const { onCloseStateModal, onOpenStateModal } = useActions()
	const { isOpenModal, activeForm } = useAppSelector(state => state.modal)

	const [currentStep, setCurrentStep] = useState<number>(1)
	const [phoneNumber, setPhoneNumber] = useState<string>('')
	const [isConfirmCode, setIsConfirmCode] = useState<string>('1111')

	const { isOpen, onOpen, onClose } = useDisclosure()

	const handleNextStep = () => {
		setCurrentStep(prev => prev + 1)
	}

	const handlePrevStep = () => {
		setCurrentStep(prev => prev - 1)
	}

	const handlePhoneNumberChange = (phoneNumber: string) => {
		setPhoneNumber(phoneNumber)
	}

	const handleConfirmCode = (confirmCode: string) => {
		setIsConfirmCode(confirmCode)
	}

	const onCloseModal = () => {
		onCloseStateModal()
		onClose()
	}
	const onOpenModal = () => {
		onOpenStateModal()
		onOpen()
	}

	return (
		<>
			<Modal blockScrollOnMount={false} isOpen={isOpenModal} onClose={onCloseModal}>
				<ModalOverlay />
				<ModalContent w='381px' p='24px'>
					{currentStep < 4 && (
						<ModalHeader color='#32353D' display='flex' alignItems='center' p='0'>
							<Heading as='h3' fontSize='18px' fontWeight='semibold' mb='24px'>
								{currentStep < 3 ? 'Вход / Регистрация' : 'Основные данные'}

								<ModalCloseButton top='20px' />
							</Heading>
						</ModalHeader>
					)}

					<ModalBody p='0'>
						{currentStep === 1 && (
							<PhoneStep
								onNextStep={handleNextStep}
								onSetConfirmCode={handleConfirmCode}
								onPhoneNumberChange={handlePhoneNumberChange}
							/>
						)}

						{currentStep === 2 && (
							<ConfirmCodeStep
								phoneNumber={phoneNumber}
								onNextStep={handleNextStep}
								isConfirmCode={isConfirmCode}
							/>
						)}

						{currentStep === 3 && (
							<BasicDataStep onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
						)}

						{currentStep === 4 && <SuccessfulRegistrationStep />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default AuthModal
