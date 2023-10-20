import { Either, right } from '@/core/either'
import { Book } from '../../enterprise/entities/book'
import { BookRepository } from '../repositories/book-repository'
import { RatingRepository } from '../repositories/rating-repository'

interface FetchPetsOnApiRequest {
  page: number
  amount: number
}

type FetchPetsOnApiResponse = Either<
  null,
  {
    books: Book[] | null
  }
>

export class FetchPetsOnApi {
  constructor(
    private bookRepository: BookRepository,
    private ratingRepository: RatingRepository,
  ) {}

  async execute({
    amount,
    page,
  }: FetchPetsOnApiRequest): Promise<FetchPetsOnApiResponse> {
    const booksIds = await this.ratingRepository.getBestMediaRate()

    const getBooks = await this.bookRepository.findManyById(
      booksIds.map((item) => item.bookId),
    )

    const books = booksIds
      .map((item) => {
        const currentIndex = getBooks.findIndex(
          (i) => i.id.toString() === item.bookId,
        )
        return getBooks[currentIndex]
      })
      .slice((page - 1) * amount, page * amount)

    return right({ books })
  }
}
