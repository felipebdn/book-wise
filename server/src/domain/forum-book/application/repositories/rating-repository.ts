import { Rating } from '../../enterprise/entities/rating'

export interface RatingRepository {
  findById(ratingId: string): Promise<Rating | null>
  findByBookId(bookId: string): Promise<Rating[]>
  save(rating: Rating): Promise<Rating>
  create(rating: Rating): Promise<Rating>
  delete(rating: Rating): Promise<void>
}
