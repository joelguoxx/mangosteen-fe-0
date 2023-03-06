import { faker } from '@faker-js/faker'

export const mockTagsIndex: Mock = (config) => {
  let id = 0
  const createId = () => {
    id += 1
    return id
  }
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      king: config.params.kind,
      ...attrs
    }))
  if (config.params.kind === 'expenses') {
    return [200, { resources: createTag(9) }]
  } else {
    return [200, { resources: createTag(24) }]
  }
}