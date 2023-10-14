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
    const ratings = await this.ratingRepository.findManyBestRate({
      amount,
      page,
    })

    const books = await this.bookRepository.findManyById(
      ratings.map((item) => item.bookId.toString()),
    )

    return { books }
  }
}
