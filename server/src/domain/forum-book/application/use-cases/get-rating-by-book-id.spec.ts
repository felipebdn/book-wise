import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { GetRatingByBookIdUseCase } from './get-rating-by-book-id'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: GetRatingByBookIdUseCase

describe('Get Rating', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new GetRatingByBookIdUseCase(inMemoryRatingRepository)
  })

  it('should be able to get rating by book id', async () => {
    for (let i = 0; i < 10; i++) {
      const rating = makeRating({ bookId: new UniqueEntityID('book-id-1') })
      inMemoryRatingRepository.create(rating)
    }

    const { ratings } = await sut.execute({
      bookId: 'book-id-1',
    })

    expect(ratings).toHaveLength(10)
  })
})
