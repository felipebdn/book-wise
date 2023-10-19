import { Either, left, right } from '@/core/either'
import { Book } from '../../enterprise/entities/book'
import { BookRepository } from '../repositories/book-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetBookByIdUseCaseRequest {
  bookId: string
}

type GetBookByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    book: Book
  }
>

export class GetBookByIdUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    bookId,
  }: GetBookByIdUseCaseRequest): Promise<GetBookByIdUseCaseResponse> {
    const book = await this.bookRepository.findById(bookId)

    if (!book) {
      return left(new ResourceNotFoundError())
    }

    return right({ book })
  }
}
