import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'
import { BookRepository } from '../repositories/book-repository'

interface CreateRatingUseCaseRequest {
  bookId: string
  readerId: string
  comment: string
  assessment: number
}

interface CreateRatingUseCaseResponse {
  rating: Rating
}

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
      throw new Error('Book not found.')
    }

    const createRating = Rating.create({
      assessment,
      comment,
      bookId: new UniqueEntityID(book.id.toString()),
      readerId: new UniqueEntityID(readerId),
    })

    const rating = await this.ratingRepository.create(createRating)

    return { rating }
  }
}
