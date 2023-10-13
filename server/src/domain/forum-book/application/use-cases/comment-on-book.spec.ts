import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { CreateRatingUseCase } from './comment-on-book'
import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository'
import { makeBook } from 'test/factories/make-book'

let inMemoryRatingRepository: InMemoryRatingRepository
let inMemoryBookRepository: InMemoryBookRepository
let sut: CreateRatingUseCase

describe('Create rating on book', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    inMemoryBookRepository = new InMemoryBookRepository()
    sut = new CreateRatingUseCase(
      inMemoryRatingRepository,
      inMemoryBookRepository,
    )
  })

  it('should be able to create rating a book', async () => {
    const book = makeBook()

    const { rating } = await sut.execute({
      assessment: 5,
      bookId: book.id.toString(),
      comment: 'Rating of book',
      readerId: 'reader-id',
    })

    expect(rating.comment).toEqual('Rating of book')
  })
})
