import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'
import { ReaderRepository } from '../repositories/reader-repository'

interface GetLastRatingOfReaderUseCaseRequest {
  readerId: string
}

interface GetLastRatingOfReaderUseCaseResponse {
  rating: Rating
}

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
      throw new Error('Reader not found.')
    }

    const rating = await this.ratingRepository.getLastByReaderId(readerId)

    return { rating }
  }
}
