import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { DeleteRatingUseCase } from './delete-rating'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: DeleteRatingUseCase

describe('Create delete rating', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new DeleteRatingUseCase(inMemoryRatingRepository)
  })

  it('should be able to delete a rating', async () => {
    const rating = makeRating(
      { readerId: new UniqueEntityID('author-1') },
      new UniqueEntityID('rating-id-1'),
    )

    await inMemoryRatingRepository.create(rating)

    await sut.execute({ ratingId: 'rating-id-1', authorId: 'author-1' })

    expect(inMemoryRatingRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a rating from another user', async () => {
    const rating = makeRating(
      { readerId: new UniqueEntityID('author-1') },
      new UniqueEntityID('rating-id-1'),
    )

    await inMemoryRatingRepository.create(rating)

    expect(() => {
      return sut.execute({ ratingId: 'rating-id-1', authorId: 'author-2' })
    }).rejects.toBeInstanceOf(Error)
  })
})
