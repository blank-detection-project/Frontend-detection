import axios, {AxiosRequestConfig} from 'axios'

const baseConfig: AxiosRequestConfig = {
  baseURL: '/api'
}

export const instance = axios.create(baseConfig)