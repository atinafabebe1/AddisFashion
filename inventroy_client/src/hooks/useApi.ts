import { useState } from 'react'

interface RequestOptions<T> {
  onSuccess?: (data?: T) => void
  onError?: (error: any) => void
}

interface UseApiReturn<T> {
  data: T | null
  error: any
  loading: boolean
  makeRequest: (requestFunction: () => Promise<T>) => void
}

const useApi = <T>(options: RequestOptions<T> = {}): UseApiReturn<T> => {
  const { onSuccess, onError } = options

  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const makeRequest = async (requestFunction: () => Promise<T>) => {
    setLoading(true)

    try {
      const response = await requestFunction()
      setData(response)

      if (onSuccess) {
        console.log(response)
        onSuccess(response)
      }
    } catch (error) {
      setError(error)
      console.log('error')
      console.log(error)

      if (onError) {
        onError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, makeRequest }
}

export default useApi
