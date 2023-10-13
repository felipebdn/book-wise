import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetRatingByBookIdUseCase } from './fetch-ratings-by-book-id'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: GetRatingByBookIdUseCase

describe('Fetch Ratings By Book Id', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new GetRatingByBookIdUseCase(inMemoryRatingRepository)
  })

  it('should be able to fetch ratings by book id', async () => {
    for (let i = 0; i < 22; i++) {
      const rating = makeRating({ bookId: new UniqueEntityID('book-id-1') })
      inMemoryRatingRepository.create(rating)
    }

    const { ratings } = await sut.execute({
      bookId: 'book-id-1',
      page: 2,
      amount: 20,
    })

    expect(ratings).toHaveLength(2)
  })
  it('should be able to fetch ordenate ratings by book id', async () => {
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

    const { ratings } = await sut.execute({
      bookId: 'book-id-1',
      page: 1,
      amount: 20,
    })

    expect(ratings).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })
})
