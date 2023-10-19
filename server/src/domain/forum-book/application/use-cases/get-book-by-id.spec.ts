import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository'
import { GetBookByIdUseCase } from './get-book-by-id'
import { makeBook } from 'test/factories/make-book'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryBookRepository: InMemoryBookRepository
let sut: GetBookByIdUseCase

describe('Get Book', async () => {
  beforeEach(() => {
    inMemoryBookRepository = new InMemoryBookRepository()
    sut = new GetBookByIdUseCase(inMemoryBookRepository)
  })

  it('should be able to get a book', async () => {
    const book = makeBook()
    inMemoryBookRepository.create(book)

    const result = await sut.execute({ bookId: book.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.book.id.toString()).toEqual(expect.any(String))
    }
  })
  it('should not be able to get a book', async () => {
    const book = makeBook()
    const result = await sut.execute({ bookId: book.id.toString() })

    expect(result.isRight()).toBe(false)
    expect(result.value).instanceOf(ResourceNotFoundError)
  })
})
