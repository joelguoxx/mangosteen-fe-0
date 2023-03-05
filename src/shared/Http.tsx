import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { mockSession } from "../mock";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: 'get'
    })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: 'post'
    })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: 'patch'
    })
  }
  delete(url: string, query?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request({
      ...config,
      url,
      params: query,
      method: 'delete'
    })
  }
}
const mock = (response: AxiosResponse) => {
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && location.hostname !== '192.168.3.57') { return false }
  switch (response.config.params._mock) {
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true
  }
  return false
}


export const http = new Http('/api/v1')
http.instance.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
http.instance.interceptors.response.use(response => {
  mock(response)
  return response
}, (error) => {
  if (mock(error.response)) {
    return error.response
  } else {
    throw error
  }
})

http.instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 429) {
      alert('请求太频繁了')
    }
  }
  throw error
})