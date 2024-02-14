import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

// const BASE_URL = 'http://localhost:3100/api/user';
const BASE_URL = 'https://user-service-ehgo.onrender.com/api/user'

interface ApiResponse<T> {
  data: T
}

interface ErrorResponse {
  errors: any
  message: string
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleSuccess = <T>(
  response: AxiosResponse<ApiResponse<T>>,
): ApiResponse<T> => response.data

const handleError = (error: AxiosError<ErrorResponse>): ErrorResponse => {
  if (error.response) {
    if (error.response.data && error.response.data.errors) {
      throw error.response.data.errors
    } else {
      throw {
        message: 'Unknown error occurred in the response data',
      }
    }
  } else if (error.request) {
    throw {
      message: 'No response received from the server',
    }
  } else {
    throw {
      message: `Error setting up the request: ${error.message}`,
    }
  }
}

type ApiResponseOrError<T> = AxiosResponse<ApiResponse<T>> | ErrorResponse

const isAxiosResponse = <T>(
  response: ApiResponseOrError<T>,
): response is AxiosResponse<ApiResponse<T>> =>
  (response as AxiosResponse<ApiResponse<T>>).data !== undefined

const handleApiResponse = <T>(
  response: ApiResponseOrError<T>,
): ApiResponse<T> | ErrorResponse => {
  if (isAxiosResponse(response)) {
    return handleSuccess(response)
  } else {
    return response
  }
}

export const registerUser = async (
  userData: any,
): Promise<ApiResponse<any> | ErrorResponse> =>
  handleApiResponse(
    await api
      .post('/register', userData, { withCredentials: true })
      .catch(handleError),
  )

// export const registerUser = async (userData: any): Promise<any> =>
//   handleSuccess(await api.post('/register', userData).catch(handleError));

export const banUser = async (userId: string): Promise<any> =>
  handleApiResponse(await api.post(`/ban/${userId}`).catch(handleError))

// Add explicit return type for each function
export const deleteUser = async (userId: string): Promise<any> =>
  handleApiResponse(await api.delete(`/delete/${userId}`).catch(handleError))

export const feedback = async (feedbackData: any): Promise<any> =>
  handleApiResponse(
    await api.post('/feedback', feedbackData).catch(handleError),
  )

export const notification = async (): Promise<any> =>
  handleApiResponse(await api.get('/notifications').catch(handleError))

export const passwordReset = async (resetData: any): Promise<any> =>
  handleApiResponse(
    await api.post('/password_reset', resetData).catch(handleError),
  )

export const profile = async (userId: string): Promise<any> =>
  handleApiResponse(await api.get(`/profile/${userId}`).catch(handleError))

export const review = async (reviewData: any): Promise<any> =>
  handleApiResponse(await api.post('/review', reviewData).catch(handleError))

export const login = async (
  loginData: any,
  config?: AxiosRequestConfig,
): Promise<any> =>
  handleApiResponse(
    await api
      .post('/login', loginData, { ...config, withCredentials: true })
      .catch(handleError),
  )

export const socialLogin = async (socialLoginData: any): Promise<any> =>
  handleApiResponse(
    await api.post('/social_login', socialLoginData).catch(handleError),
  )

export const wishlist = async (wishlistData: any): Promise<any> =>
  handleApiResponse(
    await api.post('/wishlist', wishlistData).catch(handleError),
  )

export const verifyUser = async (verificationData: any): Promise<any> =>
  handleApiResponse(
    await api.post('/verify_user', verificationData).catch(handleError),
  )

export const currentUser = async (): Promise<any> =>
  handleApiResponse(
    await api
      .get('/current_user', { withCredentials: true })
      .catch(handleError),
  )

export const logout = async (): Promise<any> =>
  handleApiResponse(
    await api.get('/logout', { withCredentials: true }).catch(handleError),
  )

export default {
  registerUser,
  banUser,
  deleteUser,
  feedback,
  notification,
  passwordReset,
  profile,
  review,
  login,
  socialLogin,
  wishlist,
  verifyUser,
  currentUser,
  logout,
}
