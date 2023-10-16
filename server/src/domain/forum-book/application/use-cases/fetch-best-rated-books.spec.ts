import { InMemoryRatingRepository } from 'test/repositories/in-memeory-rating-repository'
import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository'
import { FetchBestRatedBooks } from './fetch-best-rated-books'
import { makeBook } from 'test/factories/make-book'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeRating } from 'test/factories/make-rating'

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

  it('should be able to fetch books with the best rated', async () => {
    for (let i = 0; i < 3; i++) {
      const book = makeBook({}, new UniqueEntityID(`book-${i + 1}`))
      inMemoryBookRepository.create(book)
    }

    // rates of book-1
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-1'), assessment: 2 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-1'), assessment: 3 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-1'), assessment: 1 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-1'), assessment: 5 }),
    )

    // rates of book-2
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-2'), assessment: 1 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-2'), assessment: 1 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-2'), assessment: 1 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-2'), assessment: 1 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-2'), assessment: 1 }),
    )

    // rates of book-3
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-3'), assessment: 3 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-3'), assessment: 5 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-3'), assessment: 5 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-3'), assessment: 4 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-3'), assessment: 3 }),
    )
    inMemoryRatingRepository.create(
      makeRating({ bookId: new UniqueEntityID('book-3'), assessment: 4 }),
    )

    const { books } = await sut.execute({ amount: 3, page: 1 })

    expect(books).toEqual([
      expect.objectContaining({ _id: new UniqueEntityID('book-3') }),
      expect.objectContaining({ _id: new UniqueEntityID('book-1') }),
      expect.objectContaining({ _id: new UniqueEntityID('book-2') }),
    ])
  })
})
