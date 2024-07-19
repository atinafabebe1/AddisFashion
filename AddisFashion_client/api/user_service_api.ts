import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

// export const BASE_URL = 'http://localhost:3100/api/user'
export const BASE_URL = 'https://user-service-ehgo.onrender.com/api/user'

interface ApiResponse<T = any> {
  data: T
}

interface ErrorResponse {
  message: string
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleSuccess = <T>(response: AxiosResponse<ApiResponse<T>>) =>
  response.data

const handleError = (error: AxiosError<ErrorResponse>): never => {
  if (error.response) {
    throw new Error(
      `Request failed with status ${error.response.status}: ${error.response.data.message}`,
    )
  } else if (error.request) {
    throw new Error('No response received from the server')
  } else {
    throw new Error(`Error setting up the request: ${error.message}`)
  }
}

export const registerUser = async (userData: any): Promise<any> =>
  handleSuccess(await api.post('/register', userData).catch(handleError))

export const banUser = async (userId: string): Promise<any> =>
  handleSuccess(await api.post(`/ban/${userId}`).catch(handleError))

export const deleteUser = async (userId: string): Promise<any> =>
  handleSuccess(await api.delete(`/delete/${userId}`).catch(handleError))

export const feedback = async (feedbackData: any): Promise<any> =>
  handleSuccess(await api.post('/feedback', feedbackData).catch(handleError))

export const notification = async (): Promise<any> =>
  handleSuccess(await api.get('/notifications').catch(handleError))

export const passwordReset = async (resetData: any): Promise<any> =>
  handleSuccess(await api.post('/password_reset', resetData).catch(handleError))

export const profile = async (userId: string): Promise<any> =>
  handleSuccess(await api.get(`/profile/${userId}`).catch(handleError))

export const review = async (reviewData: any): Promise<any> =>
  handleSuccess(await api.post('/review', reviewData).catch(handleError))

export const login = async (
  loginData: any,
  config?: AxiosRequestConfig,
): Promise<any> =>
  handleSuccess(
    await api
      .post('/login', loginData, { ...config, withCredentials: true })
      .catch(handleError),
  )

export const socialLogin = async (socialLoginData: any): Promise<any> =>
  handleSuccess(
    await api.post('/social_login', socialLoginData).catch(handleError),
  )

export const wishlist = async (wishlistData: any): Promise<any> =>
  handleSuccess(await api.post('/wishlist', wishlistData).catch(handleError))

export const verifyUser = async (verificationData: any): Promise<any> =>
  handleSuccess(
    await api.post('/verify_user', verificationData).catch(handleError),
  )

export const currentUser = async (): Promise<any> =>
  handleSuccess(
    await api
      .get('/current_user', { withCredentials: true })
      .catch(handleError),
  )

export const logout = async (): Promise<any> =>
  handleSuccess(await api.post('/logout').catch(handleError))

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
