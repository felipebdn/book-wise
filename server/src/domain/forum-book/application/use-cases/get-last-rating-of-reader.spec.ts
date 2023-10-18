import { InMemoryRatingRepository } from 'test/repositories/in-memory-rating-repository'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetLastRatingOfReaderUseCase } from './get-last-rating-of-reader'
import { InMemoryReaderRepository } from 'test/repositories/in-memory-reader-repository'
import { makeReader } from 'test/factories/make-reader'

let inMemoryRatingRepository: InMemoryRatingRepository
let inMemoryReaderRepository: InMemoryReaderRepository
let sut: GetLastRatingOfReaderUseCase

describe('Fetch Recent Rating', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    inMemoryReaderRepository = new InMemoryReaderRepository()
    sut = new GetLastRatingOfReaderUseCase(
      inMemoryRatingRepository,
      inMemoryReaderRepository,
    )
  })

  it('should be able to fetch rating by reader id', async () => {
    const reader = makeReader({}, new UniqueEntityID('reader-01'))
    inMemoryReaderRepository.create(reader)

    const rating1 = makeRating({
      assessment: 1,
      readerId: reader.id,
      createdAt: new Date(2022, 0, 20),
    })

    inMemoryRatingRepository.create(rating1)

    const rating2 = makeRating({
      assessment: 2,
      readerId: reader.id,
      createdAt: new Date(2022, 0, 19),
    })
    inMemoryRatingRepository.create(rating2)

    const result = await sut.execute({ readerId: 'reader-01' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.rating).toEqual(
        expect.objectContaining({
          assessment: 1,
        }),
      )
    }
  })
})
