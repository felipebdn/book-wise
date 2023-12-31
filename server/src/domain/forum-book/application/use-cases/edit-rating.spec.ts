import { InMemoryRatingRepository } from 'test/repositories/in-memory-rating-repository'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditRatingUseCase } from './edit-rating'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: EditRatingUseCase

describe('Edit rating', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new EditRatingUseCase(inMemoryRatingRepository)
  })

  it('should be able to edit a rating', async () => {
    const rating = makeRating(
      { readerId: new UniqueEntityID('authors-1') },
      new UniqueEntityID('rating-id-1'),
    )

    await inMemoryRatingRepository.create(rating)

    await sut.execute({
      ratingId: rating.id.toString(),
      authorId: 'authors-1',
      assessment: 1,
      comment: 'example comment 1',
    })

    expect(inMemoryRatingRepository.items).toHaveLength(1)
    expect(inMemoryRatingRepository.items[0]).toMatchObject({
      comment: 'example comment 1',
      assessment: 1,
    })
  })
  it('should not be able to edit a rating from another user', async () => {
    const rating = makeRating(
      { readerId: new UniqueEntityID('authors-1') },
      new UniqueEntityID('rating-id-1'),
    )

    await inMemoryRatingRepository.create(rating)

    const result = await sut.execute({
      authorId: 'authors-2',
      assessment: 1,
      comment: 'example comment 1',
      ratingId: 'rating-id-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
