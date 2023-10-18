import { Either, left, right } from '@/core/either'
import { RatingRepository } from '../repositories/rating-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteRatingUseCaseRequest {
  authorId: string
  ratingId: string
}

type DeleteRatingUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  object
>

export class DeleteRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    ratingId,
    authorId,
  }: DeleteRatingUseCaseRequest): Promise<DeleteRatingUseCaseResponse> {
    const rating = await this.ratingRepository.findById(ratingId)

    if (!rating) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== rating.readerId.toString()) {
      return left(new NotAllowedError())
    }

    await this.ratingRepository.delete(rating)

    return right({})
  }
}
