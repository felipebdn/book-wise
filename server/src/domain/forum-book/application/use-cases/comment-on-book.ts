import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'
import { BookRepository } from '../repositories/book-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateRatingUseCaseRequest {
  bookId: string
  readerId: string
  comment: string
  assessment: number
}

type CreateRatingUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    rating: Rating
  }
>

export class CreateRatingUseCase {
  constructor(
    private ratingRepository: RatingRepository,
    private bookRepository: BookRepository,
  ) {}

  async execute({
    assessment,
    bookId,
    comment,
    readerId,
  }: CreateRatingUseCaseRequest): Promise<CreateRatingUseCaseResponse> {
    const book = await this.bookRepository.findById(bookId)

    if (!book) {
      return left(new ResourceNotFoundError())
    }

    const createRating = Rating.create({
      assessment,
      comment,
      bookId: new UniqueEntityID(book.id.toString()),
      readerId: new UniqueEntityID(readerId),
    })

    const rating = await this.ratingRepository.create(createRating)

    return right({ rating })
  }
}
