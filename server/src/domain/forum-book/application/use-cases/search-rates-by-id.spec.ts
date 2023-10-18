import { InMemoryRatingRepository } from 'test/repositories/in-memory-rating-repository'
import { makeRating } from 'test/factories/make-rating'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SearchRatesByIdUseCase } from './search-rates-by-id'
import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository'
import { makeBook } from 'test/factories/make-book'

let inMemoryRatingRepository: InMemoryRatingRepository
let inMemoryBookRepository: InMemoryBookRepository
let sut: SearchRatesByIdUseCase

describe('Search Ratins By Query', async () => {
  beforeEach(() => {
    inMemoryRatingRepository = new InMemoryRatingRepository()
    inMemoryBookRepository = new InMemoryBookRepository()
    sut = new SearchRatesByIdUseCase(
      inMemoryRatingRepository,
      inMemoryBookRepository,
    )
  })

  it('should be able to search by query', async () => {
    const book1 = makeBook({
      author: ['author example'],
      title: 'example-1',
    })
    const book2 = makeBook({
      author: ['author example'],
      title: 'example-1',
    })
    const book3 = makeBook({
      author: ['author example'],
      title: 'example-1',
    })
    const bookCreated1 = await inMemoryBookRepository.create(book1)
    const bookCreated2 = await inMemoryBookRepository.create(book2)
    await inMemoryBookRepository.create(book3)

    const rating1 = makeRating({
      readerId: new UniqueEntityID('reader-01'),
      bookId: bookCreated1.id,
    })
    await inMemoryRatingRepository.create(rating1)
    const rating2 = makeRating({
      readerId: new UniqueEntityID('reader-01'),
      bookId: bookCreated2.id,
    })
    await inMemoryRatingRepository.create(rating2)
    const rating3 = makeRating({
      readerId: new UniqueEntityID('reader-01'),
      bookId: new UniqueEntityID('example'),
    })
    await inMemoryRatingRepository.create(rating3)

    const { ratings } = await sut.execute({
      query: ' example-1 ',
      amount: 5,
      page: 1,
      readerId: 'reader-01',
    })

    expect(ratings).toHaveLength(2)
  })
})
