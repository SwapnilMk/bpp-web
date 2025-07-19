import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData, deleteData, getData } from '@/api/apiClient';
import {
  LoginCredentials,
  RegistrationData,
  LoginResponseData,
  User,
} from '@/types/auth';
import {
  LoginResponse,
  RegistrationResponse,
  asApiResponse,
  Session,
} from '@/types/api';
import {
  setCookie,
  removeCookie,
  COOKIE_KEYS,
  getErrorMessage,
  isFile,
} from '@/context/authUtils';
import { persistor } from './store';
import { setCredentials, clearCredentials } from './authSlice';
import { setUser, clearUser } from './userSlice';
import { toast } from 'sonner';
import { initWebSocket, disconnectWebSocket } from '@/lib/realtime';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      const response = await postData<LoginResponse>(
        '/auth/login',
        credentials as unknown as Record<string, unknown>,
        {
          withCredentials: true,
        }
      );
      const loginResponse = response.data.data as LoginResponseData;
      const userData = loginResponse.user as unknown as User;
      const sessionId = loginResponse.sessionId;
      const accessToken = loginResponse.accessToken;

      if (!accessToken || !sessionId) {
        throw new Error('No token or session ID received from server');
      }

      dispatch(setCredentials({ token: accessToken, sessionId }));
      dispatch(setUser(userData));
      setCookie(COOKIE_KEYS.AUTH_TOKEN, accessToken);
      setCookie(COOKIE_KEYS.SESSION_ID, sessionId);
      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem(COOKIE_KEYS.USER_DETAILS, JSON.stringify(userData));
      initWebSocket();

      toast.success('Login Successful!', {
        description: 'Redirecting to the dashboard page...',
      });
      return { token: accessToken, user: userData, sessionId };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (registrationData: RegistrationData, { dispatch }) => {
    try {
      const formData = new FormData();
      const {
        addressLine1,
        addressLine2,
        cityOrVillage,
        district,
        state,
        pincode,
        aadhaarFront,
        aadhaarBack,
        voterFront,
        voterBack,
        ...rest
      } = registrationData;

      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, isFile(value) ? value : String(value));
        }
      });

      const addressFields = {
        addressLine1,
        addressLine2,
        cityOrVillage,
        district,
        state,
        pincode,
      };
      Object.entries(addressFields).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const files = {
        aadhaarFront,
        aadhaarBack,
        voterFront,
        voterBack,
      };
      Object.entries(files).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await postData<RegistrationResponse>(
        '/auth/register',
        formData as unknown as Record<string, unknown>,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      const typedResponse = asApiResponse<RegistrationResponse>(response);

      if (typedResponse.data.success) {
        const userData = typedResponse.data as unknown as User;
        if (typedResponse.data.token) {
          dispatch(setCredentials({ token: typedResponse.data.token }));
          dispatch(setUser(userData));
          setCookie(COOKIE_KEYS.AUTH_TOKEN, typedResponse.data.token);
          localStorage.setItem(COOKIE_KEYS.USER_DETAILS, JSON.stringify(userData));
        }
        toast.success('Registration successful!');
        return;
      }
      throw new Error(typedResponse.data.message || 'Registration failed');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await postData(
        '/auth/sessions/logout',
        {},
        {
          headers: { 'x-session-id': localStorage.getItem('sessionId') },
          withCredentials: true,
        }
      );

      disconnectWebSocket();

      // Clear all authentication data
      removeCookie(COOKIE_KEYS.AUTH_TOKEN);
      removeCookie(COOKIE_KEYS.SESSION_ID);

      localStorage.removeItem('sessionId');
      localStorage.removeItem('authToken');
      localStorage.removeItem(COOKIE_KEYS.USER_DETAILS);

      // Clear Redux state
      dispatch(clearCredentials());
      dispatch(clearUser());

      // Purge persisted state
      await persistor.purge();

      toast.success('Logged out successfully');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { dispatch }) => {
    try {
      const response = await getData<{ data: User }>('/users/me');
      const typedResponse = asApiResponse<{ data: User }>(response);
      const userData = typedResponse.data as User;

      dispatch(setUser(userData));
      return userData;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
);

export const getActiveSessions = createAsyncThunk(
  'auth/getActiveSessions',
  async () => {
    try {
      const response = await getData<{ success: boolean; data: Session[] }>(
        '/auth/sessions/active'
      );
      return response.data;
    } catch (_error) {
      throw new Error('Failed to get active sessions');
    }
  }
);

export const revokeSession = createAsyncThunk(
  'auth/revokeSession',
  async (sessionId: string) => {
    try {
      await deleteData<{ success: boolean; message: string }>(
        `/auth/sessions/${sessionId}`
      );
    } catch (_error) {
      throw new Error('Failed to revoke session');
    }
  }
);

export const revokeAllOtherSessions = createAsyncThunk(
  'auth/revokeAllOtherSessions',
  async () => {
    try {
      await deleteData<{ success: boolean; message: string }>(
        '/auth/sessions/logout-others'
      );
    } catch (_error) {
      throw new Error('Failed to revoke other sessions');
    }
  }
);
