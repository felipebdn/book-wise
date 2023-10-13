import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Book, BookProps } from '@/domain/forum-book/enterprise/entities/book'

export function makeBook(
  override: Partial<BookProps> = {},
  id?: UniqueEntityID,
) {
  const rating = Book.create(
    {
      assessment: faker.number.int({
        min: 1,
        max: 5,
      }),
      comment: faker.lorem.text(),
      ...override,
    },
    id,
  )
  return rating
}
