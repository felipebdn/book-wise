import { Either, left, right } from '@/core/either'
import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditRatingUseCaseRequest {
  authorId: string
  ratingId: string
  comment: string
  assessment: number
}

type EditRatingUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    rating: Rating
  }
>

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
      return left(new ResourceNotFoundError())
    }

    if (authorId !== rating.readerId.toString()) {
      return left(new NotAllowedError())
    }

    rating.assessment = assessment
    rating.comment = comment

    await this.ratingRepository.save(rating)

    return right({ rating })
  }
}
