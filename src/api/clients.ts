import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

const baseURL = `${import.meta.env.VITE_APP_API_URL}/api`

export interface BaseSuccessRespond<T extends {}> {
  success: boolean
  message: string
  data: T
}

export interface BaseErrorRespond {
  success: boolean
  message: string
  error: {
    [param: string]: string
  }
}

export enum ResponseStatusCode {
  MODEL_NOT_FOUND = 404,
}

const errorAlertHandler = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return Promise.reject(error)
      case 403:
        break
      case 500:
        break
    }
  }
  else {
  }
  return Promise.reject(error)
}

const tokenExpireErrorHandler
  = (client: AxiosInstance) => async (error: any) => {
    // try refresh token
    return Promise.reject(error)
  }

export const apiClient = () => {
  console.log('=== baseURL ===', baseURL)
  const client = axios.create({
    baseURL,
    responseType: 'json',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // "Accept-Language": process.env.VUE_APP_I18N_LOCALE || navigator.language,
    },
  })
  axios.defaults.withCredentials = true
  client.interceptors.request.use((value: AxiosRequestConfig) => {
    return value
  }, undefined)

  client.interceptors.response.use(value => value, errorAlertHandler)

  return client
}

export const authApiClient = () => {
  const client = apiClient()
  console.log('=== authApiClient ===', useUserStore().userToken.access_token)
  client.interceptors.request.use((value: AxiosRequestConfig) => {
    value.headers.Authorization = `Bearer ${
      useUserStore().userToken.access_token
    }`
    return value
  }, undefined)
  client.interceptors.response.use(undefined, tokenExpireErrorHandler(client))

  return client
}
