import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface GetRatesByReaderUseCaseRequest {
  readerId: string
}

interface GetRatesByReaderUseCaseResponse {
  ratings: Rating[]
}

export class GetRatesByReaderUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    readerId,
  }: GetRatesByReaderUseCaseRequest): Promise<GetRatesByReaderUseCaseResponse> {
    const ratings = await this.ratingRepository.findManyByReaderId(readerId)

    return { ratings }
  }
}
