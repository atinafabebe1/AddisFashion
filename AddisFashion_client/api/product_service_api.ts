import axios, { AxiosResponse, AxiosError } from 'axios'

// const BASE_URL = 'https://product-service-9bog.onrender.com/api/product'
const BASE_URL = 'http://localhost:3101/api/product'

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

export const createProduct = async (productData: any): Promise<any> =>
  handleSuccess(
    await api
      .post('/create', productData, { withCredentials: true })
      .catch(handleError),
  )

export const updateProduct = async (
  productId: string,
  updatedData: any,
): Promise<any> =>
  handleSuccess(
    await api
      .put(`/update_product/${productId}`, updatedData)
      .catch(handleError),
  )

export const getProduct = async (productId: string): Promise<any> =>
  handleSuccess(await api.get(`/get_product/${productId}`).catch(handleError))

export const removeProduct = async (productId: string): Promise<any> =>
  handleSuccess(
    await api.delete(`/remove_product/${productId}`).catch(handleError),
  )

export const createCategory = async (categoryData: any): Promise<any> =>
  handleSuccess(
    await api.post('/create_category', categoryData).catch(handleError),
  )

export const getCategory = async (categoryId: string): Promise<any> =>
  handleSuccess(await api.get(`/get_category/${categoryId}`).catch(handleError))

export const updateCategory = async (
  categoryId: string,
  updatedData: any,
): Promise<any> =>
  handleSuccess(
    await api
      .put(`/update_category/${categoryId}`, updatedData)
      .catch(handleError),
  )

export const removeCategory = async (categoryId: string): Promise<any> =>
  handleSuccess(
    await api.delete(`/remove_category/${categoryId}`).catch(handleError),
  )

export default {
  createProduct,
  updateProduct,
  getProduct,
  removeProduct,
  createCategory,
  getCategory,
  updateCategory,
  removeCategory,
}
