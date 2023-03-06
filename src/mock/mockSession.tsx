import { faker } from '@faker-js/faker'

faker.setLocale('zh_CN')

export const mockSession: Mock = () => {
  return [200, {
    jwt: faker.random.word()
  }]
}