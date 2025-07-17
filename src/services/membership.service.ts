import { ApiResponse } from '@/types/api'
import { postData } from '@/api/apiClient'

interface CertificateRequestResponse {
  success: boolean
  message: string
  data?: {
    certificateRequestId: string
    status: string
    message: string
  }
}

export const membershipService = {
  uploadCertificate: async (
    photo: File,
    membershipId: string
  ): Promise<ApiResponse<CertificateRequestResponse>> => {
    const formData = new FormData()
    formData.append('photoUrl', photo)
    formData.append('membershipId', membershipId)

    return postData(
      '/users/membership/certificate/request',
      formData as unknown as Record<string, unknown>,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  },
}
