import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Book, BookProps } from '@/domain/forum-book/enterprise/entities/book'

export function makeBook(
  override: Partial<BookProps> = {},
  id?: UniqueEntityID,
) {
  const rating = Book.create(
    {
      author: faker.person.firstName(),
      ...override,
    },
    id,
  )
  return rating
}
