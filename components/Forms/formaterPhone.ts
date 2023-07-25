export const formatPhoneNumber = (phoneNumber: string) => {
	
	// Принимает номер телефона с input и возвращает отформатированное значение
	const digitsOnly = phoneNumber.replace(/\D/g, '')
	return `+7${digitsOnly.slice(1)}`
}
