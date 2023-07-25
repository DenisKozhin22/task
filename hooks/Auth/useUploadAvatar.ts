import { authService } from "@/services/auth/auth.service"
import { useMutation } from "react-query"

export const useUploadAvatar = () => {
	// Функция обновления аватара пользователя
	return useMutation('upload avatar', (data: FormData) => authService.uploadAvatar(data))
}