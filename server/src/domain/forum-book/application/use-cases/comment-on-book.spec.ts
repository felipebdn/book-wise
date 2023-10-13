import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { CreateRatingUseCase } from './comment-on-book'
import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository'

let inMemoryRatingRepository: InMemoryRatingRepository
let inMemoryBookRepository: InMemoryBookRepository
let sut: CreateRatingUseCase

describe('Create rating book', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    inMemoryBookRepository = new InMemoryBookRepository()
    sut = new CreateRatingUseCase(
      inMemoryRatingRepository,
      inMemoryBookRepository,
    )
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
