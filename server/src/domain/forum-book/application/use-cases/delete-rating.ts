import { RatingRepository } from '../repositories/rating-repository'

interface DeleteRatingUseCaseRequest {
  authorId: string
  ratingId: string
}

interface DeleteRatingUseCaseResponse {}

export class DeleteRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    ratingId,
    authorId,
  }: DeleteRatingUseCaseRequest): Promise<DeleteRatingUseCaseResponse> {
    const rating = await this.ratingRepository.findById(ratingId)

    if (!rating) {
      throw new Error('Rating not found.')
    }

    if (authorId !== rating.readerId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.ratingRepository.delete(rating)

    return {}
  }
}
