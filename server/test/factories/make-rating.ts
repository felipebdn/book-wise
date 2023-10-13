import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Rating,
  RatingProps,
} from '@/domain/forum-book/enterprise/entities/rating'

export function makeRating(
  override: Partial<RatingProps> = {},
  id?: UniqueEntityID,
) {
  const rating = Rating.create(
    {
      bookId: new UniqueEntityID(),
      readerId: new UniqueEntityID(),
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
