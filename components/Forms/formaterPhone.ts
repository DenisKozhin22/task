export const formatPhoneNumber = (phoneNumber: string) => {
	const digitsOnly = phoneNumber.replace(/\D/g, '')
	return `+7${digitsOnly.slice(1)}`

}
