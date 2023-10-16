import { Book } from '../../enterprise/entities/book'
import { BookRepository } from '../repositories/book-repository'
import { RatingRepository } from '../repositories/rating-repository'

interface FetchBestRatedBooksRequest {
  page: number
  amount: number
}

interface FetchBestRatedBooksResponse {
  books: Book[] | null
}

export class FetchBestRatedBooks {
  constructor(
    private bookRepository: BookRepository,
    private ratingRepository: RatingRepository,
  ) {}

  async execute({
    amount,
    page,
  }: FetchBestRatedBooksRequest): Promise<FetchBestRatedBooksResponse> {
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

    return { books }
  }
}
