import { Rating } from '../../enterprise/entities/rating'

export interface RatingRepository {
  create(rating: Rating): Promise<void>
  findByBookId(bookId: string): Promise<Rating[]>
}
