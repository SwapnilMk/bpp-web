import {
  ProfileUpdateResponse,
  UpdateRequestsResponse,
  UpdateRequestDetailsResponse,
  ProfileUpdateRequestPayload,
  VerifyOtpPayload,
  CancelUpdateRequestResponse,
  ResendOtpResponse,
} from '@/types/profile'
import { postData, getData } from './api.service'

export const profileService = {
  requestUpdate: async (
    payload: ProfileUpdateRequestPayload
  ): Promise<{ data: ProfileUpdateResponse }> => {
    return postData<ProfileUpdateResponse>(
      '/users/profile-update/request-update',
      payload
    )
  },

  verifyOtp: async (
    payload: VerifyOtpPayload
  ): Promise<{ data: ProfileUpdateResponse }> => {
    return postData<ProfileUpdateResponse>(
      '/users/profile-update/verify-update',
      payload
    )
  },

  getUpdateRequests: async (
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: UpdateRequestsResponse }> => {
    return getData<UpdateRequestsResponse>(
      `/users/profile-update/requests?page=${page}&limit=${limit}`
    )
  },

  getUpdateRequestDetails: async (
    requestId: string
  ): Promise<{ data: UpdateRequestDetailsResponse }> => {
    return getData<UpdateRequestDetailsResponse>(
      `/users/profile-update/requests/${requestId}`
    )
  },

  cancelUpdateRequest: async (
    requestId: string
  ): Promise<{ data: CancelUpdateRequestResponse }> => {
    return postData<CancelUpdateRequestResponse>(
      `/users/profile-update/requests/${requestId}/cancel`,
      {}
    )
  },

  resendOtp: async (
    requestId: string
  ): Promise<{ data: ResendOtpResponse }> => {
    return postData<ResendOtpResponse>(
      `/users/profile-update/requests/${requestId}/resend-otp`,
      {}
    )
  },
}
