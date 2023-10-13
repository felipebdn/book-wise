import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { RatingBookUseCase } from './rating-book'

let inMemoryRatingRepository: InMemoryRatingRepository
let sut: RatingBookUseCase

describe('Create rating book', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    sut = new RatingBookUseCase(inMemoryRatingRepository)
  })

  it('should be able to create rating a book', async () => {
    const { rating } = await sut.execute({
      assessment: 5,
      bookId: 'book-id',
      comment: 'Rating of book',
      readerId: 'reader-id',
    })

    expect(rating.comment).toEqual('Rating of book')
  })
})
