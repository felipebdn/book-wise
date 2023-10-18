import { InMemoryRatingRepository } from 'test/repositories/in-memory-rating-repository'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchRecentRatingUseCase } from './fetch-recent-ratings'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: FetchRecentRatingUseCase

describe('Fetch Recent Ratings', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new FetchRecentRatingUseCase(inMemoryRatingRepository)
  })

  it('should be able to fetch recent ratings', async () => {
    for (let i = 0; i < 22; i++) {
      const rating = makeRating({ bookId: new UniqueEntityID('book-id-1') })
      inMemoryRatingRepository.create(rating)
    }

    const result = await sut.execute({
      page: 2,
      amount: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.ratings).toHaveLength(2)
  })
  it('should be able to fetch ordenate recent ratings', async () => {
    const rating1 = makeRating({
      bookId: new UniqueEntityID('book-id-1'),
      createdAt: new Date(2022, 0, 20),
    })
    const rating2 = makeRating({
      bookId: new UniqueEntityID('book-id-1'),
      createdAt: new Date(2022, 0, 18),
    })
    const rating3 = makeRating({
      bookId: new UniqueEntityID('book-id-1'),
      createdAt: new Date(2022, 0, 23),
    })
    inMemoryRatingRepository.create(rating1)
    inMemoryRatingRepository.create(rating2)
    inMemoryRatingRepository.create(rating3)

    const result = await sut.execute({
      page: 1,
      amount: 20,
    })

    expect(result.value?.ratings).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })
})
