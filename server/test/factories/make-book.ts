import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Book, BookProps } from '@/domain/forum-book/enterprise/entities/book'

export function makeBook(
  override: Partial<BookProps> = {},
  id?: UniqueEntityID,
) {
  const rating = Book.create(
    {
      authors: [faker.person.firstName()],
      categories: [faker.person.firstName()],
      coverUrlSmall: faker.lorem.slug({ max: 10, min: 10 }),
      pagesCount: faker.number.int({ max: 500 }),
      title: faker.person.jobTitle(),
      ...override,
    },
    id,
  )
  return rating
}
