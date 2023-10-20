import { Either, right } from '@/core/either'
import { Book } from '../../enterprise/entities/book'
import { BookRepository } from '../repositories/book-repository'

interface FetchBooksOnCategoryUseCseRequest {
  category: string
  page: number
  amount: number
}

type FetchBooksOnCategoryUseCseResponse = Either<
  null,
  {
    books: Book[]
  }
>

export class FetchBooksOnCategoryUseCse {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    category,
    amount,
    page,
  }: FetchBooksOnCategoryUseCseRequest): Promise<FetchBooksOnCategoryUseCseResponse> {
    const books = await this.bookRepository.findManyByCategory(category, {
      amount,
      page,
    })

    return right({ books })
  }
}
