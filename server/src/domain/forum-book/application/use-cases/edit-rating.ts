import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface EditRatingUseCaseRequest {
  authorId: string
  ratingId: string
  comment: string
  assessment: number
}

interface EditRatingUseCaseResponse {
  rating: Rating
}

export class EditRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    ratingId,
    authorId,
    assessment,
    comment,
  }: EditRatingUseCaseRequest): Promise<EditRatingUseCaseResponse> {
    const rating = await this.ratingRepository.findById(ratingId)

    if (!rating) {
      throw new Error('Rating not found.')
    }

    if (authorId !== rating.readerId.toString()) {
      throw new Error('Not allowed.')
    }

    rating.assessment = assessment
    rating.comment = comment

    await this.ratingRepository.save(rating)

    return { rating }
  }
}
