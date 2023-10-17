import { Rating } from '../../enterprise/entities/rating'
import { RatingRepository } from '../repositories/rating-repository'

interface GetRatesByReaderUseCaseRequest {
  readerId: string
  page: number
  amount: number
}

interface GetRatesByReaderUseCaseResponse {
  ratings: Rating[]
}

export class GetRatesByReaderUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    readerId,
    amount,
    page,
  }: GetRatesByReaderUseCaseRequest): Promise<GetRatesByReaderUseCaseResponse> {
    const ratings = await this.ratingRepository.findManyByReaderId(readerId, {
      amount,
      page,
    })

    return { ratings }
  }
}
