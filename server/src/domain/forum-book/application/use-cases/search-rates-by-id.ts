import { Either, right } from '@/core/either'
import { Rating } from '../../enterprise/entities/rating'
import { BookRepository } from '../repositories/book-repository'
import { RatingRepository } from '../repositories/rating-repository'

interface SearchRatesByIdUseCaseRequest {
  readerId: string
  page: number
  amount: number
  query: string
}

type SearchRatesByIdUseCaseResponse = Either<
  null,
  {
    ratings: Rating[]
  }
>

export class SearchRatesByIdUseCase {
  constructor(
    private ratingRepository: RatingRepository,
    private bookRepository: BookRepository,
  ) {}

  async execute({
    query,
    readerId,
    amount,
    page,
  }: SearchRatesByIdUseCaseRequest): Promise<SearchRatesByIdUseCaseResponse> {
    const queryFormated = query.trim()

    const books = await this.bookRepository.findManyByQuery(queryFormated)
    const idsBooks = books.map((item) => item.id.toString())

    const ratings = await this.ratingRepository.findManyRatesById(
      idsBooks,
      readerId,
      { amount, page },
    )

    return right({ ratings })
  }
}
