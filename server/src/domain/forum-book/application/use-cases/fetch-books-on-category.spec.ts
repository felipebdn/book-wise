import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository'
import { makeBook } from 'test/factories/make-book'
import { FetchBooksOnCategoryUseCse } from './fetch-books-on-category'

let inMemoryBookRepository: InMemoryBookRepository
let sut: FetchBooksOnCategoryUseCse

describe('Edit rating', async () => {
  beforeEach(() => {
    inMemoryBookRepository = new InMemoryBookRepository()
    sut = new FetchBooksOnCategoryUseCse(inMemoryBookRepository)
  })

  it('should be able to fetch books with the best rated', async () => {
    inMemoryBookRepository.create(
      makeBook({ categories: ['ficção', 'romance'] }),
    )
    inMemoryBookRepository.create(makeBook({ categories: ['ficção'] }))
    inMemoryBookRepository.create(makeBook({ categories: ['suspense'] }))

    const result1 = await sut.execute({
      amount: 2,
      page: 1,
      category: 'ficção',
    })

    const result2 = await sut.execute({
      amount: 2,
      page: 1,
      category: 'suspense',
    })

    expect(result1.isRight()).toBe(true)
    expect(result1.value?.books).toHaveLength(2)

    expect(result2.isRight()).toBe(true)
    expect(result2.value?.books).toHaveLength(1)
  })
})
