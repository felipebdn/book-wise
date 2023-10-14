import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository'
import { FetchBestRatedBooks } from './fetch-best-rated-books'
import { makeBook } from 'test/factories/make-book'

let inMemoryRatingRepository: InMemoryRatingRepository
let inMemoryBookRepository: InMemoryBookRepository
let sut: FetchBestRatedBooks

describe('Edit rating', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    inMemoryBookRepository = new InMemoryBookRepository()
    sut = new FetchBestRatedBooks(
      inMemoryBookRepository,
      inMemoryRatingRepository,
    )
  })

  it('should be able to fetch books with the best rated', async () => {})
})
