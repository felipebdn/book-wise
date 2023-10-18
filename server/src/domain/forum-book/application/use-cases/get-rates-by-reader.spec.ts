import { InMemoryRatingRepository } from 'test/repositories/in-memory-rating-repository'
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

    const { ratings } = await sut.execute({
      readerId: 'reader-01',
      amount: 5,
      page: 1,
    })

    expect(ratings).toHaveLength(5)

    expect(ratings[0]).toEqual(
      expect.objectContaining({
        readerId: new UniqueEntityID('reader-01'),
      }),
    )
  })
  it('should be able to view per paginate fetch ratings by reader id', async () => {
    for (let i = 0; i < 12; i++) {
      const value = i % 2 === 0 ? 'reader-01' : 'reader-02'
      const rating = makeRating({
        readerId: new UniqueEntityID(value),
      })
      inMemoryRatingRepository.create(rating)
    }

    const { ratings } = await sut.execute({
      readerId: 'reader-01',
      amount: 5,
      page: 2,
    })

    expect(ratings).toHaveLength(1)

    expect(ratings[0]).toEqual(
      expect.objectContaining({
        readerId: new UniqueEntityID('reader-01'),
      }),
    )
  })
})
