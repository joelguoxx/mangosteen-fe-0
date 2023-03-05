import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios';


type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

export const mockSession: Mock = () => {
  return [200, {
    jwt: faker.random.word()
  }]
}