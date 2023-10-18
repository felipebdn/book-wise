import { Either, left, right } from '@/core/either'
import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'
import { ReaderRepository } from '../repositories/reader-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetLastRatingOfReaderUseCaseRequest {
  readerId: string
}

type GetLastRatingOfReaderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    rating: Rating
  }
>

export class GetLastRatingOfReaderUseCase {
  constructor(
    private ratingRepository: RatingRepository,
    private readerRepository: ReaderRepository,
  ) {}

  async execute({
    readerId,
  }: GetLastRatingOfReaderUseCaseRequest): Promise<GetLastRatingOfReaderUseCaseResponse> {
    const reader = await this.readerRepository.findById(readerId)

    if (!reader) {
      return left(new ResourceNotFoundError())
    }

    const rating = await this.ratingRepository.getLastByReaderId(readerId)

    return right({ rating })
  }
}
