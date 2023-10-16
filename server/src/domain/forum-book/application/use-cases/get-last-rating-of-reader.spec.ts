import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetLastRatingOfReader } from './get-last-rating-of-reader'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: GetLastRatingOfReader

describe('Fetch Recent Rating', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new GetLastRatingOfReader(inMemoryRatingRepository)
  })

  it('should be able to fetch rating by reader id', async () => {
    const rating1 = makeRating({
      assessment: 1,
      readerId: new UniqueEntityID('reader-01'),
      createdAt: new Date(2022, 0, 20),
    })

    inMemoryRatingRepository.create(rating1)

    const rating2 = makeRating({
      assessment: 2,
      readerId: new UniqueEntityID('reader-01'),
      createdAt: new Date(2022, 0, 19),
    })
    inMemoryRatingRepository.create(rating2)

    const { rating } = await sut.execute({ readerId: 'reader-01' })

    expect(rating).toEqual(
      expect.objectContaining({
        assessment: 1,
      }),
    )
  })
})
