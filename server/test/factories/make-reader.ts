import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Reader,
  ReaderProps,
} from '@/domain/forum-book/enterprise/entities/reader'

export function makeReader(
  override: Partial<ReaderProps> = {},
  id?: UniqueEntityID,
) {
  const reader = Reader.create(
    {
      coverUrlSmall: faker.lorem.sentence({ min: 10, max: 10 }),
      name: faker.person.firstName(),
      ...override,
    },
    id,
  )
  return reader
}
