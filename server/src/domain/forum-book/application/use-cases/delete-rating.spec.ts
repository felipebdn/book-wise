import { InMemoryRatingRepository } from 'test/repositories/in-memory-rating-repository'
import { DeleteRatingUseCase } from './delete-rating'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: DeleteRatingUseCase

describe('Create delete rating', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new DeleteRatingUseCase(inMemoryRatingRepository)
  })

  it('should be able to delete a rating', async () => {
    const rating = makeRating(
      { readerId: new UniqueEntityID('authors-1') },
      new UniqueEntityID('rating-id-1'),
    )

    await inMemoryRatingRepository.create(rating)

    await sut.execute({ ratingId: 'rating-id-1', authorId: 'authors-1' })

    expect(inMemoryRatingRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a rating from another user', async () => {
    const rating = makeRating(
      { readerId: new UniqueEntityID('authors-1') },
      new UniqueEntityID('rating-id-1'),
    )

    await inMemoryRatingRepository.create(rating)

    const result = await sut.execute({
      ratingId: 'rating-id-1',
      authorId: 'authors-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
