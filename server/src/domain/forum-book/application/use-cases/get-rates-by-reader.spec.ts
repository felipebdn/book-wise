import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetRatesByReaderUseCase } from './get-rates-by-reader'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: GetRatesByReaderUseCase

describe('Fetch Ratings By Reader Id', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new GetRatesByReaderUseCase(inMemoryRatingRepository)
  })

  it('should be able to fetch ratings by reader id', async () => {
    for (let i = 0; i < 10; i++) {
      const value = i % 2 === 0 ? 'reader-01' : 'reader-02'
      const rating = makeRating({
        readerId: new UniqueEntityID(value),
      })
      inMemoryRatingRepository.create(rating)
    }

    const { ratings } = await sut.execute({ readerId: 'reader-01' })

    expect(ratings).toHaveLength(5)

    expect(ratings[0]).toEqual(
      expect.objectContaining({
        readerId: new UniqueEntityID('reader-01'),
      }),
    )
  })
})
