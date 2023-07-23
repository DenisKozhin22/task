import { authService } from "@/services/auth/auth.service"
import { useMutation } from "react-query"

export const useUploadAvatar = () => {
	return useMutation('upload avatar', (data: FormData) => authService.uploadAvatar(data))
}