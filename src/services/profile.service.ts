import { AxiosResponse } from 'axios'
import {
  ProfileUpdateResponse,
  UpdateRequestsResponse,
  UpdateRequestDetailsResponse,
  ProfileUpdateRequestPayload,
  VerifyOtpPayload,
  CancelUpdateRequestResponse,
  ResendOtpResponse,
} from '@/types/profile'
import { postData, getData } from './apiService'

export const profileService = {
  requestUpdate: async (
    payload: ProfileUpdateRequestPayload
  ): Promise<AxiosResponse<ProfileUpdateResponse>> => {
    return postData<ProfileUpdateResponse>(
      '/users/profile-update/request-update',
      payload
    )
  },

  verifyOtp: async (
    payload: VerifyOtpPayload
  ): Promise<AxiosResponse<ProfileUpdateResponse>> => {
    return postData<ProfileUpdateResponse>(
      '/users/profile-update/verify-update',
      payload
    )
  },

  getUpdateRequests: async (
    page: number = 1,
    limit: number = 10
  ): Promise<UpdateRequestsResponse> => {
    return getData<UpdateRequestsResponse>(
      `/users/profile-update/requests?page=${page}&limit=${limit}`
    )
  },

  getUpdateRequestDetails: async (
    requestId: string
  ): Promise<UpdateRequestDetailsResponse> => {
    return getData<UpdateRequestDetailsResponse>(
      `/users/profile-update/requests/${requestId}`
    )
  },

  cancelUpdateRequest: async (
    requestId: string
  ): Promise<AxiosResponse<CancelUpdateRequestResponse>> => {
    return postData<CancelUpdateRequestResponse>(
      `/users/profile-update/requests/${requestId}/cancel`,
      {}
    )
  },

  resendOtp: async (
    requestId: string
  ): Promise<AxiosResponse<ResendOtpResponse>> => {
    return postData<ResendOtpResponse>(
      `/users/profile-update/requests/${requestId}/resend-otp`,
      {}
    )
  },
}
